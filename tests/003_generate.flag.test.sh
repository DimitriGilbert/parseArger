#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
flag_name="my-flag"
flag=("$flag_name" "'An argument'")
tftmp_file="/tmp/gentsttmp";

function test_generate_flag() {
  local tfile="${tftmp_file}_generate_flag";
  local ex_=("${ex[@]}" --output "$tfile" --flag "${flag[*]}")
  local tex_=("$tfile" "--$flag_name")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";

  rm "$tfile";
}

function test_generate_flag_short() {
  local tfile="${tftmp_file}_generate_flag_short";
  local nflag=("${flag[@]}" --short z)
  local ex_=("${ex[@]}" --output "$tfile" --flag "${nflag[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--$flag_name")
  local tex_2=("$tfile" "-z")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_exit_code "0" "$("${tex_2[@]}")";

  rm "$tfile";
}

function test_generate_flag_short2() {
  local tfile="${tftmp_file}_generate_flag_short2";
  local nflag=("${flag[@]}" -s z)
  local ex_=("${ex[@]}" --output "$tfile" --flag "${nflag[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--$flag_name")
  local tex_2=("$tfile" "-z")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_exit_code "0" "$("${tex_2[@]}")";

  rm "$tfile";
}

function test_generate_flag_alias() {
  local tfile="${tftmp_file}_generate_flag_alias";
  local nflag=("${flag[@]}" --alias "flag-alias")
  local ex_=("${ex[@]}" --output "$tfile" --flag "${nflag[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--my-flag")
  local tex_2=("$tfile" "--flag-alias")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_exit_code "0" "$("${tex_2[@]}")";

  rm "$tfile";
}

function test_generate_flag_no_name() {
  local tfile="${tftmp_file}_generate_flag_no_name";
  local nflag=("${flag[@]}" --no-name "nope")
  local ex_=("${ex[@]}" --output "$tfile" --flag "${nflag[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--nope")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";

  rm "$tfile";
}

function test_generate_flag_no_alias() {
  local tfile="${tftmp_file}_generate_flag_no_alias";
  local nflag=("${flag[@]}" --no-alias "nope")
  local ex_=("${ex[@]}" --output "$tfile" --flag "${nflag[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--no-my-flag")
  local tex_1=("$tfile" "--nope")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";

  rm "$tfile";
}

function test_generate_flag_on() {
  local tfile="${tftmp_file}_generate_flag_on";
  local nflag=("${flag[@]}" --on)
  local ex_=("${ex[@]}" --output "$tfile" --flag "${nflag[*]}")
  local tex_=("$tfile")
  local tex_1=("$tfile" "--no-my-flag")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";
  assert_exit_code "0" "$("${tex_[@]}")";
  assert_exit_code "0" "$("${tex_1[@]}")";

  rm "$tfile";
}