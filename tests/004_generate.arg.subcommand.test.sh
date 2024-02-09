#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
spos=("my-arg" "'An argument'")
tftmp_file="/tmp/gentsttmp";

function test_generate_pos_subcommand() {
  local tfile="${tftmp_file}_generate_pos_subcommand";
  local npos=("${spos[@]}" --subcommand)
  local ex_=("${ex[@]}" --output "$tfile" --pos "${npos[*]}")
  local tex_=("$tfile" "arg_value")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "0" "$("${tex_[@]}")";

  rm "$tfile";
}

function test_generate_pos_subcommand_var() {
  local tfile="${tftmp_file}_generate_pos_subcommand_var";
  local scmdv="subcmdvar"
  local npos=("${spos[@]}" --subcommand-variable "$scmdv")
  local ex_=("${ex[@]}" --output "$tfile" --pos "${npos[*]}")
  local tex_=("$tfile" "arg_value")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "0" "$("${tex_[@]}")";
  local scmcat="$(cat "$tfile")";
  assert_contains "$scmdv=();" "$scmcat";
  assert_not_contains "__subcommand=();" "$scmcat";

  rm "$tfile";
}

function test_generate_pos_subcommand_run() {
  local tfile="${tftmp_file}_generate_pos_subcommand_run";
  local tfile1="${tftmp_file}_generate_pos_subcommand_run_";
  local npos=("${spos[@]}" --subcommand-run)
  local ex_=("${ex[@]}" --output "$tfile" --pos "${npos[*]}")
  local tex_=("$tfile" "arg_value")
  local tex_1=("$tfile" "gentsttmp_generate_pos_subcommand_run_")
  
  "${ex[@]}" --output "$tfile1";
  assert_exit_code "0" "$("${ex_[@]}")";
  
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "127" "$("${tex_[@]}" 2>&1)";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_contains "{__subcommand[@]}" "$(cat "$tfile")";

  rm "$tfile";
  rm "$tfile1";
}

function test_generate_pos_subcommand_use_lftovr() {
  local tfile="${tftmp_file}_generate_pos_subcommand_use_lftovr";
  local tfile1="${tftmp_file}_generate_pos_subcommand_use_lftovr_";
  local npos=("${spos[@]}" --subcommand-run --subcommand-use-leftovers)
  local ex_=("${ex[@]}" --output "$tfile" --leftovers --pos "${npos[*]}")
  local tex_=("$tfile" "arg_value")
  local tex_1=("$tfile" "gentsttmp_generate_pos_subcommand_use_lftovr_" "anarg")
  
  "${ex[@]}" --output "$tfile1" --pos 'plop "an arg"';
  assert_exit_code "0" "$("${ex_[@]}")";
  
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  assert_exit_code "127" "$("${tex_[@]}" 2>&1)";
  assert_exit_code "0" "$("${tex_1[@]}")";
  assert_contains "__subcommand+=(\"\${_arg_leftovers[@]}\");" "$(cat "$tfile")";

  rm "$tfile";
  rm "$tfile1";
}

function test_generate_pos_subcommand_directory() {
  local tfile="${tftmp_file}_generate_pos_subcommand_directory";
  local tfile1="subcmd";
  local scmdv="subcmddir"
  local npos=("${spos[@]}" --subcommand-directory "/tmp/$scmdv")
  local ex_=("${ex[@]}" --output "$tfile" --pos "${npos[*]}")
  local tex_=("$tfile" "subcmd")
  mkdir "/tmp/$scmdv" 2>/dev/null;
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "1" "$("$tfile" 2>&1)";
  # TODO: fix this should fail
  # assert_exit_code "1" "$("${tex_[@]}" 2>&1)";

  "${ex[@]}" --output "/tmp/$scmdv/$tfile1";
  assert_exit_code "0" "$("${tex_[@]}")";

  rm "$tfile";
  rm -rf "/tmp/$scmdv";
}
