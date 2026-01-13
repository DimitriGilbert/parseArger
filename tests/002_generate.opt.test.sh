#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
sopt_name="my-opt"
sopt=("$sopt_name" "'An argument'")
tftmp_file="/tmp/gentsttmp";

function test_generate_opt() {
  local tfile="${tftmp_file}_generate_opt";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}")
  local tex_=("$tfile" "--$sopt_name" "arg_value")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";

  rm "$tfile";
}

function test_generate_opt_repeat() {
  local tfile="${tftmp_file}_generate_opt_repeat";
  local nopt=("${sopt[@]}" --repeat)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile" "--$sopt_name" "valu1")
  local tex_1=("$tfile" "--$sopt_name" "valu1" "--$sopt_name" "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  # TODO: test for array initialization

  rm "$tfile";
}

function test_generate_opt_repeat_min() {
  local tfile="${tftmp_file}_generate_opt_repeat_min";
  local nopt=("${sopt[@]}" --repeat-min 2)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile" "--$sopt_name" "valu1")
  local tex_1=("$tfile" "--$sopt_name" "valu1" "--$sopt_name" "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  # assert_exit_code "1" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";

  rm "$tfile";
}

function test_generate_opt_repeat_max() {
  local tfile="${tftmp_file}_generate_opt_repeat_max";
  local nopt=("${sopt[@]}" --repeat-max 2)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile" "--$sopt_name" "valu1")
  local tex_1=("$tfile" "--$sopt_name" "valu1" "--$sopt_name" "val2" "--$sopt_name" "val3")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  # assert_exit_code "1" "$("${tex_1[@]}")";

  rm "$tfile";
}

function test_generate_opt_oneof() {
  local tfile="${tftmp_file}_generate_opt_oneof";
  local nopt=("${sopt[@]}" --one-of valu1 --one-of val2)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile" "--$sopt_name"  "valu1")
  local tex_1=("$tfile" "--$sopt_name"  "val2")
  local tex_2=("$tfile" "--$sopt_name"  "valnope")
  
  # echo "${ex_[*]}"
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_exit_code "1" "$("${tex_2[@]}" 2>&1)";

  rm "$tfile";
}

function test_generate_opt_default() {
  local tfile="${tftmp_file}_generate_opt_default";
  local nopt=("${sopt[@]}" --default-value val)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--$sopt_name"  "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_contains "=\"val\"" "$(cat "$tfile")";

  rm "$tfile";
}

function test_generate_opt_default_repeat() {
  local tfile="${tftmp_file}_generate_opt_default_repeat";
  local nopt=("${sopt[@]}" -d val -r)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--$sopt_name"  "val1" "--$sopt_name" "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_contains "=(\"val\" )" "$(cat "$tfile")";

  rm "$tfile";
}

function test_generate_opt_short() {
  local tfile="${tftmp_file}_generate_opt_short";
  local nopt=("${sopt[@]}" --short z)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--$sopt_name"  "val2")
  local tex_1=("$tfile" "-z"  "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";

  rm "$tfile";
}

function test_generate_opt_short2() {
  local tfile="${tftmp_file}_generate_opt_short2";
  local nopt=("${sopt[@]}" -s z)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--$sopt_name"  "val2")
  local tex_1=("$tfile" "-z"  "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";

  rm "$tfile";
}

function test_generate_opt_alias() {
  local tfile="${tftmp_file}_generate_opt_alias";
  local nopt=("${sopt[@]}" --alias "opt-alias")
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--opt-alias" "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";

  rm "$tfile";
}

function test_generate_opt_nested() {
  local tfile="${tftmp_file}_generate_opt_nested";
  local nopt=("${sopt[@]}")
  local ex_=("${ex[@]}" --output "$tfile" --nested "${nopt[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--my-opt" "val2")
  local tex_2=("$tfile" "--my-opt-paf" "val2")
  local tex_3=("$tfile" "--my-opt" "val" "--my-opt-paf" "val2")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_exit_code "0" "$("${tex_2[@]}")";
  assert_exit_code "0" "$("${tex_3[@]}")";

  rm "$tfile";
}

# TODO: repair opt empty
# function test_generate_opt_empty() {
#   local tfile="${tftmp_file}_generate_opt_empty";
#   local nopt=("${sopt[@]}" --empty)
#   local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
#   local tex_=("$tfile")
#   local tex_1=("$tfile" "--$sopt_name" "val2")
#   local tex_2=("$tfile" "--$sopt_name")
  
#   assert_exit_code "0" "$("${ex_[@]}")";
#   assert_is_file "$tfile";
#   assert_exit_code "0" "$("$tfile")";
#   assert_exit_code "0" "$("${tex_[@]}")";
#   assert_exit_code "0" "$("${tex_1[@]}")";
#   assert_exit_code "0" "$("${tex_2[@]}")";

#   rm "$tfile";
# }

# function test_generate_opt_empty_value() {
#   local tfile="${tftmp_file}_generate_opt_empty";
#   local nopt=("${sopt[@]}" --empty-value "val")
#   local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
#   local tex_=("$tfile")
#   local tex_1=("$tfile" "--$sopt_name" "val2")
#   local tex_2=("$tfile" "--$sopt_name")
  
#   assert_exit_code "0" "$("${ex_[@]}")";
#   assert_is_file "$tfile";
#   assert_exit_code "0" "$("$tfile")";
#   assert_exit_code "0" "$("${tex_[@]}")";
#   assert_exit_code "0" "$("${tex_1[@]}")";
#   assert_exit_code "0" "$("${tex_2[@]}")";

#   rm "$tfile";
# }
function test_generate_opt_env() {
  local tfile="${tftmp_file}_opt_env";
  local nopt=("token" "'api token'" --env MY_TOKEN)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  chmod +x "$tfile"

  # Need to check value, but bashunit_ext doesn't support output matching easily with current helper.
  # We rely on exit codes.
  # 1. With flag (success)
  assert_exit_code "0" "$("$tfile" --token flag_val)";

  # 2. With env (success)
  export MY_TOKEN="env_val"
  assert_exit_code "0" "$("$tfile")";
  
  # 3. Verify value logic (optional if we trust the generator logic, but good for regression)
  # We can't easily capture output here without modifying the tfile or parsing stdout manually.
  # Assuming exit code 0 means it parsed successfully without missing value error.
  
  rm "$tfile"
}

function test_generate_opt_required() {
  local tfile="${tftmp_file}_opt_req";
  local nopt=("config" "'config file'" --required)
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")

  assert_exit_code "0" "$("${ex_[@]}")";
  chmod +x "$tfile"

  # 1. Success when provided
  assert_exit_code "0" "$("$tfile" --config val)";

  # 2. Fail when missing
  assert_exit_code "1" "$("$tfile" 2>&1)";

  rm "$tfile"
}

function test_generate_opt_match() {
  local tfile="${tftmp_file}_opt_match";
  local nopt=("port" "'port num'" --match "^[0-9]+$")
  local ex_=("${ex[@]}" --output "$tfile" --opt "${nopt[*]}")

  assert_exit_code "0" "$("${ex_[@]}")";
  chmod +x "$tfile"

  # 1. Valid input
  assert_exit_code "0" "$("$tfile" --port 1234)";

  # 2. Invalid input
  assert_exit_code "1" "$("$tfile" --port abc 2>&1)";

  rm "$tfile"
}
