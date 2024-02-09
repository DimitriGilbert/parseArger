#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
exp=("$pabin" completely --no-run-completely "testScript")
spos=("my-arg" "'An argument'")
sopt=("my-opt" "'An opt'" -r -s o --alias opt-pt -d "aValue")
sflg=("my-flag" "'A flag'" -s f --no-name nope --alias flg --no-alias noflg --on)
snst=("my-nst" "'A nested opt'")
tftmp_file="/tmp/gentsttmp";

function test_complete() {
  local tfile="${tftmp_file}_complete";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile")
  local pex_1=("${exp[@]}" "$tfile" --yaml-file "$tfile.yaml")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";

  assert_exit_code "0" "$("${pex_1[@]}")";
  assert_is_file "$tfile.yaml";

  assert_exit_code "0" "$("${exp[@]}" --help 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -h 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" --version 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -v 2>&1)";

  rm "$tfile";
  rm "$tfile.yaml";
}

function test_complete_subcommand_directory() {
  local tdir="${tftmp_file}_complete_subcommand_directory.d";
  local tmf="${tftmp_file}_complete_subcommand_directory";
  local tfile="${tdir}/to_cpt";
  local ex_=("${ex[@]}" --output "$tmf" --pos 'tgt "target" --subcommand-directory "'"$tdir"'" ')
  local ex_1=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" --subcommand-directory "$tdir")
  mkdir -p "$tdir";
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tmf";
  assert_exit_code "0" "$("${ex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  assert_exit_code "0" "$("${pex_[@]}")";

  rm -rf "$tdir";
  rm "$tmf";
}

function test_complete_with_args() {
  local tdir="${tftmp_file}_complete_subcommand_directory.d";
  local tmf="${tftmp_file}_complete_subcommand_directory";
  local tfile="${tdir}/to_cpt";
  local ex_=("${ex[@]}" --output "$tmf" --leftovers --pos 'tgt "target" --subcommand-directory "'"$tdir"'" --subcommand-run --subcommand-use-leftovers')
  local ex_1=("${ex[@]}" --output "$tfile" --pos "${spos[*]}" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}")
  local pex_=("${exp[@]}" --subcommand-directory "$tdir")
  mkdir -p "$tdir";
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tmf";
  assert_exit_code "0" "$("${ex_1[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tmf" "to_cpt" "test_arg")";
  assert_exit_code "0" "$("$tfile" "test_arg")";

  assert_exit_code "0" "$("${pex_[@]}")";

  rm -rf "$tdir";
  rm "$tmf";
}