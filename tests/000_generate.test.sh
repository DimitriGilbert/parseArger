#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
tftmp_file="/tmp/gentsttmp";

function test_generate() {
  local out=$("${ex[@]}");
  local tfile="${tftmp_file}_generate";
  
  assert_exit_code "0" "$?";
  assert_not_empty "$out";
  
  echo "$out" > "$tfile";
  chmod +x "$tfile";

  assert_exit_code "0" "$("$tfile")";
  
  assert_exit_code "0" "$("${ex[@]}" --help 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" -h 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" --version 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" -v 2>&1)";

  rm "$tfile";
}

# TODO: fix test with args should fail gracefully
function test_generate_file() {
  local tfile="${tftmp_file}_generate_file";
  local ex_=("${ex[@]}" --output "$tfile")
  local tf_ex_=("$tfile" arg1);
  local out=$("${ex[@]}");
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  
  genout="$(cat $tfile)";
  assert_equals "$out" "$genout";
  
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "1" "$("${tf_ex_[@]}" 2>&1)";
  rm "$tfile";
}

function test_generate_help() {
  local tfile="${tftmp_file}_generate_help";
  local tfile1="${tftmp_file}_generate_help0";
  local hlpmsg="This is a test message"
  local ex_=("${ex[@]}" --output "$tfile" --help-message "$hlpmsg")
  local ex_s=("${ex[@]}" --output "$tfile1" -m "$hlpmsg")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_exit_code "0" "$("${ex_s[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_is_file "$tfile1";
  assert_exit_code "0" "$tfile1";
  assert_files_equals "$tfile" "$tfile1";
  
  hlpex=("$tfile" --help);
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "$hlpmsg" "$hlpout";
  
  hlpex=("$tfile" -h);
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "$hlpmsg" "$hlpout";
  
  rm "$tfile";
  rm $tfile1;
}

function test_generate_help_opt() {
  local tfile="${tftmp_file}_generate_help_opt";
  local hlpmsg="This is a test message"
  local hlpopt="opt4help"
  local ex_=("${ex[@]}" --output "$tfile" --help-message "$hlpmsg" --help-option "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  hlpex=("$tfile" "--$hlpopt");
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "$hlpmsg" "$hlpout";
  
  rm "$tfile";
}

function test_generate_help_opt_short() {
  local tfile="${tftmp_file}_generate_help_opt_short";
  local hlpmsg="This is a test message"
  local hlpopt="o"
  local ex_=("${ex[@]}" --output "$tfile" --help-message "$hlpmsg" --help-short-option "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  hlpex=("$tfile" "-$hlpopt");
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "$hlpmsg" "$hlpout";
  
  rm "$tfile";
}

function test_generate_set() {
  local tfile="${tftmp_file}_generate_set";
  local ex_=("${ex[@]}" --output "$tfile" --set "a_set_var=with_a_value" -s "another_set_var=with_another_value")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_contains "a_set_var=with_a_value" "$(cat "$tfile")";

  echo -e "\necho \"\$a_set_var\";\n" >> "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_equals "with_a_value" "$("$tfile")";

  rm "$tfile";
}

function test_generate_source() {
  local tfile="${tftmp_file}_generate_source";
  local ex_=("${ex[@]}" --output "$tfile" --source "/tmp/generate.source.test" -l "/tmp/generate.source.test")
  echo -e "\necho \"\$a_set_var\";\n" > "/tmp/generate.source.test";
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_contains "source /tmp/generate.source.test" "$(cat "$tfile")";
  assert_exit_code "0" "$("$tfile")";

  rm "$tfile";
  rm /tmp/generate.source.test;
}

function test_generate_version() {
  local tfile="${tftmp_file}_generate_version";
  local ver="0.0.1"
  local ex_=("${ex[@]}" --output "$tfile" --set-version "$ver")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  verpex=("$tfile" --version);
  verpout="$("${verpex[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "$ver" "$verpout";
  
  rm "$tfile";
}

function test_generate_version_opt() {
  local tfile="${tftmp_file}_generate_version_opt";
  local hlpopt="opt4version"
  local ver="0.0.1"
  local ex_=("${ex[@]}" --output "$tfile" --set-version "$ver" --version-opt-name "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  hlpex=("$tfile" "--$hlpopt");
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "$hlpmsg" "$hlpout";
  
  rm "$tfile";
}

function test_generate_no_version_opt() {
  local tfile="${tftmp_file}_generate_version_opt";
  local ex_=("${ex[@]}" --output "$tfile" --no-version-opt)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_not_contains "print_version" "$(cat "$tfile")";
  
  rm "$tfile";
}

function test_generate_version_opt_short() {
  local tfile="${tftmp_file}_generate_version_opt_short";
  local hlpopt="o"
  local ver="0.0.1"
  local ex_=("${ex[@]}" --output "$tfile" --set-version "$ver" --version-short-option "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  hlpex=("$tfile" "-$hlpopt");
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "$hlpmsg" "$hlpout";
  
  rm "$tfile";
}

# fixed missing !!
function test_generate_die_fn() {
  local tfile="${tftmp_file}_generate_die_fn";
  local hlpopt="wasted"
  local ex_=("${ex[@]}" --output "$tfile" --die-fn-name "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  assert_contains "$hlpopt()" "$(cat "$tfile")";
  
  rm "$tfile";
}

function test_generate_log_fn() {
  local tfile="${tftmp_file}_generate_log_fn";
  local hlpopt="wasted"
  local ex_=("${ex[@]}" --output "$tfile" --log-fn-name "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  assert_contains "$hlpopt()" "$(cat "$tfile")";
  
  rm "$tfile";
}

function test_generate_verbose_opt() {
  local tfile="${tftmp_file}_generate_verbose_opt";
  local hlpopt="talky"
  local ex_=("${ex[@]}" --output "$tfile" --verbose-opt-name "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  hlpex=("$tfile" "--$hlpopt");
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  
  hlpex=("$tfile" "--$hlpopt" 3);
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  
  hlpex=("$tfile" "--$hlpopt" -7);
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  
  rm "$tfile";
}

function test_generate_verbose_level() {
  local tfile="${tftmp_file}_generate_verbose_level";
  local hlpopt="3"
  local ex_=("${ex[@]}" --output "$tfile" --verbose-level "$hlpopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  hlpex=("$tfile");
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  
  hlpex=("$tfile" "--verbose" "$hlpopt");
  hlpout="$("${hlpex[@]}")";
  assert_exit_code "0" "$?";
  
  rm "$tfile";
}

function test_generate_no_verbose_opt() {
  local tfile="${tftmp_file}_generate_verbose_opt";
  local ex_=("${ex[@]}" --output "$tfile" --no-use-verbose)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_not_contains "_verbose_level" "$(cat "$tfile")";
  
  rm "$tfile";
}

function test_generate_leftovers() {
  local tfile="${tftmp_file}_generate_leftovers";
  local ex_=("${ex[@]}" --output "$tfile" --leftovers)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  assert_contains "_arg_leftovers=()" "$(cat "$tfile")";

  local tex_=("$tfile" arg1 arg2 arg3);
  assert_exit_code "0" "$("${tex_[@]}")";
  
  rm "$tfile";
}

function test_generate_leftovers_name() {
  local tfile="${tftmp_file}_generate_leftovers_name";
  local lftopt="iwantmore"
  local ex_=("${ex[@]}" --output "$tfile" --leftovers-name "$lftopt")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  local loc_="$(cat "$tfile")";
  assert_not_contains "_arg_leftovers=()" "$loc_";
  assert_contains "_arg_${lftopt}=()" "$loc_";
  
  rm "$tfile";
}

function test_generate_leftovers_parse() {
  local tfile="${tftmp_file}_generate_leftovers_parse";
  local ex_=("${ex[@]}" --output "$tfile" --parse-leftovers)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  
  local loc_="$(cat "$tfile")";
  assert_contains "_arg_leftovers=()" "$loc_";
  
  rm "$tfile";
}

function test_generate_bang () {
  local tfile="${tftmp_file}_generate_bang";
  local tfile1="${tftmp_file}_generate_bang1";
  local ex_=("${ex[@]}" --output "$tfile" --no-bang)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";  
  assert_not_contains "#!/bin/bash" "$(cat "$tfile")";

  rm "$tfile";
}

function test_generate_use_shebang () {
  local tfile="${tftmp_file}_generate_bang";
  local ex_=("${ex[@]}" --output "$tfile" --use-shebang "/usr/bin/bash")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  local t1o="$(cat "$tfile")";

  assert_not_contains "#!/bin/bash" "$t1o";
  assert_contains "#!/usr/bin/bash" "$t1o";

  rm "$tfile";
}

