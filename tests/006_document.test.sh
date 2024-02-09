#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
exp=("$pabin" document)
spos=("my-arg" "'An argument'")
sopt=("my-opt" "'An opt'" -r -s o --alias opt-pt -d "aValue")
sflg=("my-flag" "'A flag'" -s f --no-name nope --alias flg --no-alias noflg --on)
snst=("my-nst" "'A nested opt'")
tftmp_file="/tmp/gentsttmp";

function test_document() {
  local tfile="${tftmp_file}_document";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" -f "$tfile")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  local pexout="$("${pex_[@]}")"
  assert_exit_code "0" "$?";
  assert_exit_code "0" "$("${exp[@]}" -f "$tfile" --out "${tfile}.md")";
  assert_is_file "${tfile}.md";
  local fout="$(cat "${tfile}.md")"
  assert_equals "$pexout" "$fout";

  assert_exit_code "0" "$("${exp[@]}" --help 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -h 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" --version 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -v 2>&1)";

  rm "$tfile";
  rm "${tfile}.md";
}

function test_document_dir() {
  local tdir="${tftmp_file}_document_dir";
  local tfile="${tdir}/to_doc";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" -d "$tdir")
  mkdir -p "$tdir";
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  local pexout="$("${pex_[@]}")"
  assert_exit_code "0" "$?";
  assert_exit_code "0" "$("${exp[@]}" -d "$tdir" -o "${tfile}.md")";
  assert_is_file "${tfile}.md";
  assert_equals "$pexout" "$(cat "${tfile}.md")";

  rm "${tfile}.md";
  local pexout="$("${pex_[@]}")"
  assert_exit_code "0" "$?";
  assert_exit_code "0" "$("${exp[@]}" -d "$tdir" -o "${tfile}.md" --no-sub-directory)";
  assert_is_file "${tfile}.md";
  assert_equals "$pexout" "$(cat "${tfile}.md")";

  rm -rf "$tdir";
}

function test_document_tag() {
  local tfile="${tftmp_file}_document_tag";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" -f "$tfile" --tag "###")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  local pexout="$("${pex_[@]}")"
  assert_exit_code "0" "$?";
  assert_contains "### $tfile" "$pexout";

  rm "$tfile";
}

function test_document_title() {
  local tfile="${tftmp_file}_document_title";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" -f "$tfile" --title "doc title")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  local pexout="$("${pex_[@]}")"
  assert_exit_code "0" "$?";
  assert_contains "# doc title" "$pexout";

  rm "$tfile";
}

function test_document_title_tag() {
  local tfile="${tftmp_file}_document_title_tag";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" -f "$tfile" --title-tag "###")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  local pexout="$("${pex_[@]}")"
  assert_exit_code "0" "$?";
  assert_contains "### Usage" "$pexout";

  rm "$tfile";
}
