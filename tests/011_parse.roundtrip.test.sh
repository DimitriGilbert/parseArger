#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
exp=("$pabin" parse)
exbp=("$pabin" bulk-parse)
tftmp_file="/tmp/gentsttmp";

function test_generate_keeps_complete_declarations() {
  local tfile="${tftmp_file}_roundtrip_gen";
  local ex_=("${ex[@]}" --output "$tfile"
    --opt 'proton "proton build" --short p --default-value "GE-Proton" --env REPACK_PROTON'
    --opt 'gameid "game id" --match "umu-[0-9]+"'
    --opt 'label "a label" --empty-value "none"'
    --opt 'lvl "level" --required'
    --opt 'force "as flag" --empty'
    --pos 'dst "the dest" --optional --match ".+"'
  );

  assert_exit_code "0" "$("${ex_[@]}")";
  local content="$(cat "$tfile")";
  assert_contains '# @parseArger opt proton "proton build" --short p --default-value "GE-Proton" --env REPACK_PROTON' "$content";
  assert_contains '# @parseArger opt gameid "game id" --match "umu-[0-9]+"' "$content";
  assert_contains '# @parseArger opt label "a label" --empty-value "none"' "$content";
  assert_contains '# @parseArger opt lvl "level" --required' "$content";
  assert_contains '# @parseArger opt force "as flag" --empty' "$content";
  assert_contains '# @parseArger pos dst "the dest" --optional --match ".+"' "$content";

  rm "$tfile";
}

function test_parse_roundtrip_keeps_declarations() {
  local tfile="${tftmp_file}_roundtrip_parse";
  local ex_=("${ex[@]}" --output "$tfile"
    --opt 'proton "proton build" --default-value "GE-Proton" --env REPACK_PROTON'
    --opt 'gameid "game id" --match "umu-[0-9]+"'
  );

  assert_exit_code "0" "$("${ex_[@]}")";
  assert_exit_code "0" "$("${exp[@]}" -i "$tfile")";
  local content="$(cat "$tfile")";
  assert_contains '--default-value "GE-Proton" --env REPACK_PROTON' "$content";
  assert_contains '--match "umu-[0-9]+"' "$content";
  assert_contains '${REPACK_PROTON:-GE-Proton}' "$content";

  rm "$tfile";
}

function test_parse_is_idempotent() {
  local tfile="${tftmp_file}_roundtrip_idem";
  local ex_=("${ex[@]}" --output "$tfile"
    --opt 'proton "proton build" --short p --default-value "GE-Proton" --env REPACK_PROTON'
    --opt 'gameid "game id" --env REPACK_GAMEID --match "umu-[0-9]+"'
    --opt 'label "a label" --empty-value "none"'
    --opt 'lvl "level" --required'
    --pos 'src "the source"'
  );

  assert_exit_code "0" "$("${ex_[@]}")";
  assert_exit_code "0" "$("${exp[@]}" -i "$tfile")";
  cp "$tfile" "${tfile}_pass1";
  assert_exit_code "0" "$("${exp[@]}" -i "$tfile")";
  assert_files_equals "${tfile}_pass1" "$tfile";

  rm "$tfile" "${tfile}_pass1";
}

function test_generated_die_is_set_u_safe() {
  local tfile="${tftmp_file}_roundtrip_die";
  local ex_=("${ex[@]}" --output "$tfile" --flag 'color "colors"');

  assert_exit_code "0" "$("${ex_[@]}")";
  printf '\nset -u\ndie "boom"\n' >> "$tfile";
  local out="$("$tfile" 2>&1)";
  assert_exit_code "1" "$("$tfile" 2>/dev/null)";
  assert_not_contains "unbound variable" "$out";

  rm "$tfile";
}

function test_parse_splices_first_marker_pair_only() {
  local dir="${tftmp_file}_roundtrip_markers";
  rm -rf "$dir";
  mkdir -p "$dir";
  local ex_=("${ex[@]}" --output "$dir/hasbody" --flag 'x "x flag"');

  assert_exit_code "0" "$("${ex_[@]}")";
  printf 'echo "docs say the marker # @parseArger-end goes after the body"\n' >> "$dir/hasbody";
  assert_exit_code "0" "$("${exbp[@]}" --file "$dir/hasbody")";
  assert_equals "1" "$(grep -c '^# @parseArger-begin$' "$dir/hasbody")";
  # second pass must be stable: no new block appended for the marker mention
  cp "$dir/hasbody" "${dir}/pass1";
  assert_exit_code "0" "$("${exbp[@]}" --file "$dir/hasbody")";
  assert_files_equals "${dir}/pass1" "$dir/hasbody";
  assert_equals "1" "$(grep -c '^# @parseArger-begin$' "$dir/hasbody")";

  # a file that only mentions parseArger inside strings is not a parseArger file
  printf '#!/bin/bash\necho "# @parseArger-end"\n' > "$dir/notpa";
  assert_exit_code "0" "$("${exbp[@]}" --file "$dir/notpa")";
  assert_equals '#!/bin/bash' "$(head -1 "$dir/notpa")";

  rm -rf "$dir";
}
