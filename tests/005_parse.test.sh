#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
exp=("$pabin" parse)
spos=("my-arg" "'An argument'")
sopt=("my-opt" "'An argument'")
tftmp_file="/tmp/gentsttmp";

function test_parse() {
  local tfile="${tftmp_file}_parse";
  local ex_=("${ex[@]}" --output "$tfile")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  local pexout="$("${exp[@]}" "$tfile")"
  local tfct="$(cat "$tfile")"

  assert_exit_code "0" "$?";
  assert_equals "$tfct" "$pexout";

  assert_exit_code "0" "$("${exp[@]}" --help 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -h 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" --version 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -v 2>&1)";


  rm "$tfile";
}

function test_parse_inplace() {
  local tfile="${tftmp_file}_parse_inplace";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" --inplace)
  local pex_1=("${exp[@]}" "$tfile" -i)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  rm "$tfile";
}

function test_parse_pos() {
  local tfile="${tftmp_file}_parse_pos";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --pos "${spos[*]}")
  local pex_1=("${exp[@]}" "$tfile" -i -p "${sopt[*]}")
  local tpex=("$tfile" "test_arg")
  local tpex1=("$tfile" "test_arg" "test_arg")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "0" "$("${tpex[@]}")";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "1" "$("${tpex[@]}" 2>&1)";
  assert_exit_code "0" "$("${tpex1[@]}")";

  rm "$tfile";
}

function test_parse_opt() {
  local tfile="${tftmp_file}_parse_opt";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --opt "${spos[*]}")
  local pex_1=("${exp[@]}" "$tfile" -i -o "${sopt[*]}")
  local tpex=("$tfile" --my-arg "test_arg")
  local tpex1=("$tfile" --my-opt "test_arg")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tpex[@]}")";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tpex[@]}")";
  assert_exit_code "0" "$("${tpex1[@]}")";

  rm "$tfile";
}

function test_parse_flag() {
  local tfile="${tftmp_file}_parse_flag";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --flag "${spos[*]}")
  local pex_1=("${exp[@]}" "$tfile" -i -f "${sopt[*]}")
  local tpex=("$tfile" --my-arg)
  local tpex1=("$tfile" --my-opt)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tpex[@]}")";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tpex[@]}")";
  assert_exit_code "0" "$("${tpex1[@]}")";

  rm "$tfile";
}

function test_parse_set_version() {
  local tfile="${tftmp_file}_parse_set_version";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --set-version 0.1)
  local pex_1=("${exp[@]}" "$tfile" -i --set-version 0.2)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_not_contains "0.1" "$(cat "$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_equals "0.1" "$("$tfile" --version)";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_equals "0.2" "$("$tfile" --version)";

  rm "$tfile";
}

function test_parse_leftovers() {
  local tfile="${tftmp_file}_parse_leftovers";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --leftovers)
  local tpex=("$tfile" "leftover1" "leftover2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "1" "$("${tpex[@]}" 2>&1)";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tpex[@]}")";

  rm "$tfile";
}

function test_parse_parse_leftovers() {
  local tfile="${tftmp_file}_parse_parse_leftovers";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --parse-leftovers)
  local tpex=("$tfile" "leftover1" "leftover2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "1" "$("${tpex[@]}" 2>&1)";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tpex[@]}")";

  rm "$tfile";
}

function test_parse_set() {
  local tfile="${tftmp_file}_parse_set";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --set "a_set_var=with_a_value")
  local pex_1=("${exp[@]}" "$tfile" -i --set "another_var=with_a_value" --set "yet_a_var=with_a_value")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_not_contains "a_set_var=with_a_value" "$(cat "$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_contains "a_set_var=with_a_value" "$(cat "$tfile")";
  echo -e "\necho \"\$a_set_var\";\n" >> "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_equals "with_a_value" "$("$tfile")";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_contains "a_set_var=with_a_value" "$(cat "$tfile")";
  assert_contains "yet_a_var=with_a_value" "$(cat "$tfile")";

  rm "$tfile";
}

function test_parse_source() {
  local tfile="${tftmp_file}_parse_source";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --source "/tmp/parse.source.test")
  local pex_1=("${exp[@]}" "$tfile" -i --source "/tmp/parse.source.test" -l "/tmp/parse.source.test" -l "/tmp/parse.source.test")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_not_contains "source /tmp/parse.source.test" "$(cat "$tfile")";

  touch /tmp/parse.source.test;
  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_contains "source /tmp/parse.source.test" "$(cat "$tfile")";
  echo -e "\necho \"\$a_set_var\";\n" >> "/tmp/parse.source.test";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_contains "source /tmp/parse.source.test" "$(cat "$tfile")";

  rm "$tfile";
  rm /tmp/parse.source.test;
}

function test_parse_nested() {
  local tfile="${tftmp_file}_parse_nested";
  local nopt=("${sopt[@]}")
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" -i --nested "${nopt[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--my-opt" "val2")
  local tex_2=("$tfile" "--my-opt-paf" "val2")
  local tex_3=("$tfile" "--my-opt" "val" "--my-opt-paf" "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_exit_code "0" "$("${tex_2[@]}")";
  assert_exit_code "0" "$("${tex_3[@]}")";

  rm "$tfile";
}

function test_parse_duplicate_opt_error() {
  local tfile="${tftmp_file}_parse_dup_opt";
  local ex_=("${ex[@]}" --output "$tfile" --opt "existing-opt 'Original description'")
  local pex_=("${exp[@]}" "$tfile" --opt "existing-opt 'New description'")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  
  # Should error when trying to add duplicate option without --replace
  local output="$("${pex_[@]}" 2>&1)"
  assert_contains "already exists" "$output";
  assert_contains "existing-opt" "$output";
  assert_contains "--replace" "$output";

  rm "$tfile";
}

function test_parse_duplicate_opt_replace() {
  local tfile="${tftmp_file}_parse_dup_opt_replace";
  local ex_=("${ex[@]}" --output "$tfile" --opt "existing-opt 'Original description'")
  local pex_=("${exp[@]}" "$tfile" -i --opt "existing-opt 'UPDATED description'" --replace)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_contains "Original description" "$(cat "$tfile")";
  
  # Should succeed with --replace
  assert_exit_code "0" "$("${pex_[@]}")";
  assert_is_file "$tfile";
  assert_contains "UPDATED description" "$(cat "$tfile")";
  # Should NOT have duplicate
  local count=$(grep -c "@parseArger opt existing-opt" "$tfile" || echo "0")
  assert_equals "1" "$count";

  rm "$tfile";
}

function test_parse_duplicate_flag_error() {
  local tfile="${tftmp_file}_parse_dup_flag";
  local ex_=("${ex[@]}" --output "$tfile" --flag "existing-flag 'Original'")
  local pex_=("${exp[@]}" "$tfile" --flag "existing-flag 'New'")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  
  local output="$("${pex_[@]}" 2>&1)"
  assert_contains "already exists" "$output";
  assert_contains "existing-flag" "$output";

  rm "$tfile";
}

function test_parse_duplicate_flag_replace() {
  local tfile="${tftmp_file}_parse_dup_flag_replace";
  local ex_=("${ex[@]}" --output "$tfile" --flag "existing-flag 'Original'")
  local pex_=("${exp[@]}" "$tfile" -i --flag "existing-flag 'REPLACED'" -r)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  
  assert_exit_code "0" "$("${pex_[@]}")";
  assert_contains "REPLACED" "$(cat "$tfile")";
  local count=$(grep -c "@parseArger flag existing-flag" "$tfile" || echo "0")
  assert_equals "1" "$count";

  rm "$tfile";
}

function test_parse_duplicate_pos_error() {
  local tfile="${tftmp_file}_parse_dup_pos";
  local ex_=("${ex[@]}" --output "$tfile" --pos "existing-pos 'Original'")
  local pex_=("${exp[@]}" "$tfile" --pos "existing-pos 'New'")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  
  local output="$("${pex_[@]}" 2>&1)"
  assert_contains "already exists" "$output";
  assert_contains "existing-pos" "$output";

  rm "$tfile";
}

function test_parse_new_opt_no_error() {
  local tfile="${tftmp_file}_parse_new_opt";
  local ex_=("${ex[@]}" --output "$tfile" --opt "first-opt 'First'")
  local pex_=("${exp[@]}" "$tfile" -i --opt "second-opt 'Second'")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  
  # Adding a NEW option should work without --replace
  assert_exit_code "0" "$("${pex_[@]}")";
  assert_contains "first-opt" "$(cat "$tfile")";
  assert_contains "second-opt" "$(cat "$tfile")";

  rm "$tfile";
}

# function test_parse_() {
#   local tfile="${tftmp_file}_parse_";
#   local ex_=("${ex[@]}" --output "$tfile")
#   local pex_=("${exp[@]}" "$tfile" -i --)
#   local pex_1=("${exp[@]}" "$tfile" -i)
  
#   assert_exit_code "0" "$("${ex_[@]}")";
#   assert_is_file "$tfile";
#   assert_exit_code "0" "$("$tfile")";

#   assert_exit_code "0" "$("${pex_[@]}")";
#   assert_is_file "$tfile";
#   assert_exit_code "0" "$("$tfile")";

#   assert_exit_code "0" "$("${pex_1[@]}")";
#   assert_is_file "$tfile";
#   assert_exit_code "0" "$("$tfile")";

#   rm "$tfile";
# }

