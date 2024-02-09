#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
exp=("$pabin" html-form)
spos=("my-arg" "'An argument'" --one-of val --one-of val1 --one-of val2)
sopt=("my-opt" "'An opt'" -r -s o --alias opt-pt --default-value "'aValue'")
sflg=("my-flag" "'A flag'" -s f --no-name nope --alias flg --no-alias noflg --on)
snst=("my-nst" "'A nested opt'")
tftmp_file="/tmp/gentsttmp";

function test_html() {
  local tfile="${tftmp_file}_html";
  local ex_=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";
  assert_exit_code "0" "$("$tfile")";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_exit_code "0" "$("${pex_[@]}" --output "$tfile.html")";
  assert_is_file "$tfile.html";
  assert_equals "$pexout" "$(cat "$tfile.html")";

  assert_exit_code "0" "$("${exp[@]}" --help 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -h 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" --version 2>&1)";
  assert_exit_code "0" "$("${exp[@]}" -v 2>&1)";

  rm "$tfile";
  rm "$tfile.html";
}

function test_html_command() {
  local tdir="${tftmp_file}_html_command.d";
  local tmf="${tftmp_file}_html_command";
  local tfile="${tdir}/to_hteumeulify";
  local ex_=("${ex[@]}" --output "$tmf" --pos 'tgt "target" --subcommand-directory "'"$tdir"'" ')
  local ex_1=("${ex[@]}" --output "$tfile")
  local pex_=("${exp[@]}" "$tfile" --command "$tfile")
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

function test_html_form_class() {
  local tfile="${tftmp_file}_html_form_class";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --form-class "my-form-class")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "my-form-class" "$pexout";

  rm "$tfile";
}

function test_html_input_class() {
  local tfile="${tftmp_file}_html_input_class";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --input-class "my-input-class")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "my-input-class" "$pexout";

  rm "$tfile";
}

function test_html_input_container_class() {
  local tfile="${tftmp_file}_html_input_container_class";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --input-container-class "my-input-class")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "my-input-class" "$pexout";

  rm "$tfile";
}

function test_html_label_class() {
  local tfile="${tftmp_file}_html_label_class";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --label-class "my-label-class")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "my-label-class" "$pexout";

  rm "$tfile";
}

function test_html_select_class() {
  local tfile="${tftmp_file}_html_select_class";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --select-class "my-select-class")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "my-select-class" "$pexout";

  rm "$tfile";
}

function test_html_checkbox_label_class() {
  local tfile="${tftmp_file}_html_checkbox_label_class";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --checkbox-label-class "my-checkbox-label-class")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "my-checkbox-label-class" "$pexout";

  rm "$tfile";
}

function test_html_checkbox_class() {
  local tfile="${tftmp_file}_html_checkbox_class";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --checkbox-class "my-checkbox-class")
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_contains "my-checkbox-class" "$pexout";

  rm "$tfile";
}

function test_html_no_form() {
  local tfile="${tftmp_file}_html_no_form";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --no-form)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_not_contains "<form" "$pexout";

  rm "$tfile";
}

function test_html_no_button() {
  local tfile="${tftmp_file}_html_no_button";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --no-button)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_not_contains "<button" "$pexout";

  rm "$tfile";
}

function test_html_no_js() {
  local tfile="${tftmp_file}_html_no_js";
  local ex_=("${ex[@]}" --output "$tfile" --opt "${sopt[*]}" --flag "${sflg[*]}" --nested "${snst[*]}" --pos "${spos[*]}")
  local pex_=("${exp[@]}" "$tfile" --no-js)
  
  assert_exit_code "0" "$("${ex_[@]}")";
  assert_is_file "$tfile";

  local pexout="$("${pex_[@]}")";
  assert_exit_code "0" "$?";
  assert_not_contains "<script" "$pexout";

  rm "$tfile";
}