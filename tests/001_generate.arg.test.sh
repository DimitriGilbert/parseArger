#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
spos=("my-arg" "'An argument'")
tftmp_file="/tmp/gentsttmp";

function test_generate_pos() {
  local tfile="${tftmp_file}_generate_pos";
  local ex_=("${ex[@]}" --output "$tfile" --pos "${spos[*]}")
  local tex_=("$tfile" "arg_value")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "0" "$("${tex_[@]}")";

  rm "$tfile";
}

function test_generate_pos_oneof() {
  local tfile="${tftmp_file}_generate_pos_oneof";
  local npos=("${spos[@]}" --one-of valu1 --one-of val2)
  local ex_=("${ex[@]}" --output "$tfile" --pos "${npos[*]}")
  local tex_=("$tfile" "valu1")
  local tex_1=("$tfile" "val2")
  local tex_2=("$tfile" "valnope")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_exit_code "1" "$("${tex_2[@]}" 2>&1)";

  rm "$tfile";
}
