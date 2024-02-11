#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" project)
spos=("my-arg" "'An argument'" --one-of val --one-of val1 --one-of val2)
sopt=("my-opt" "'An opt'" -r -s o --alias opt-pt --default-value "'aValue'")
sflg=("my-flag" "'A flag'" -s f --no-name nope --alias flg --no-alias noflg --on)
snst=("my-nst" "'A nested opt'")
tftmp_file="/tmp/gentsttmp";

function test_project() {
  local tfile="${tftmp_file}_project";
  local pjn=gentsttmp_project

  assert_exit_code "0" "$("${ex[@]}" --help 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" -h 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" --version 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" -v 2>&1)";

  assert_exit_code "0" "$("${ex[@]}" git-init --help 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" git-init -h 2>&1)";

  assert_exit_code "0" "$("${ex[@]}" installer --help 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" installer -h 2>&1)";

  assert_exit_code "0" "$("${ex[@]}" mkfile --help 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" mkfile -h 2>&1)";

  assert_exit_code "0" "$("${ex[@]}" webserver --help 2>&1)";
  assert_exit_code "0" "$("${ex[@]}" webserver -h 2>&1)";

  assert_exit_code "0" "$("${ex[@]}" "$pjn" -d "$tfile" --description "testing purpose")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/.git";
  assert_directory_exists "$tfile/utils";
  assert_file_exists "$tfile/utils/webserver";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";

  rm -rf "$tfile";
}

function test_project_subcommand() {
  local tfile="${tftmp_file}_project_subcommand";
  local pjn="gentsttmp_project_subcommand"
  local pex_=("${ex[@]}" "$pjn" -d "$tfile" --project-subcommand "sba" --project-subcommand "sbb")

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/bin";
  assert_directory_exists "$tfile/.git";
  assert_directory_exists "$tfile/utils";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";
  assert_file_exists "$tfile/bin/sba";
  assert_file_exists "$tfile/bin/sbb";

  assert_exit_code "0" "$("$tfile/$pjn" --help 2>&1)";
  assert_exit_code "0" "$("$tfile/$pjn" sba --help 2>&1)";
  assert_exit_code "0" "$("$tfile/$pjn" sbb --help 2>&1)";

  rm -rf "$tfile";
}

function test_project_subcommand_dir() {
  local tfile="${tftmp_file}_project_subcommand_dir";
  local pjn="gentsttmp_project_subcommand_dir"
  local pex_=("${ex[@]}" "$pjn" -d "$tfile" --project-subcommand "sba" --project-subcommand "sbb" --project-subcommand-dir lib)

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/lib";
  assert_directory_exists "$tfile/.git";
  assert_directory_exists "$tfile/utils";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";
  assert_file_exists "$tfile/lib/sba";
  assert_file_exists "$tfile/lib/sbb";

  assert_exit_code "0" "$("$tfile/$pjn" --help 2>&1)";
  assert_exit_code "0" "$("$tfile/$pjn" sba --help 2>&1)";
  assert_exit_code "0" "$("$tfile/$pjn" sbb --help 2>&1)";

  rm -rf "$tfile";
}

function test_project_git() {
  local tfile="${tftmp_file}_project_git";
  local pjn="gentsttmp_project_git"
  local pex_=("${ex[@]}" "$pjn"
    -d "$tfile"
    --no-git
  )

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_not_exists "$tfile/.git";
  assert_directory_exists "$tfile/utils";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";

  rm -rf "$tfile";
}

function test_project_git_add() {
  local tfile="${tftmp_file}_project_git_add";
  local pjn="gentsttmp_project_git_add"
  local pex_=("${ex[@]}" "$pjn"
    -d "$tfile"
    --git-add .
  )

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/utils";
  assert_directory_exists "$tfile/.git";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";

  pexout="$(cd "$tfile" && git ls-files --others --exclude-standard)";
  assert_exit_code "0" "$?";
  assert_equals "" "$pexout";

  rm -rf "$tfile";
}

function test_project_git_commit() {
  local tfile="${tftmp_file}_project_git_commit";
  local pjn="gentsttmp_project_git_commit"
  local pex_=("${ex[@]}" "$pjn"
    -d "$tfile"
    --git-add .
    --git-commit "test commit"
  )

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/utils";
  assert_directory_exists "$tfile/.git";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";

  local pexout="$(cd "$tfile" && git ls-files --others --exclude-standard)";
  assert_exit_code "0" "$?";
  assert_equals "" "$pexout";

  pexout="$(cd "$tfile" && git log -1 --pretty=%B | cat | tr -d '\n')";
  assert_exit_code "0" "$?";
  assert_equals "'test commit'" "$pexout";

  rm -rf "$tfile";
}

function test_project_makefile() {
  local tfile="${tftmp_file}_project_makefile";
  local pjn="gentsttmp_project_makefile"
  local pex_=("${ex[@]}" "$pjn"
    -d "$tfile"
    --no-makefile
  )

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/.git";
  assert_directory_exists "$tfile/utils";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_not_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";

  rm -rf "$tfile";
}

function test_project_web_server() {
  local tfile="${tftmp_file}_project_web_server";
  local pjn="gentsttmp_project_web_server"
  local pex_=("${ex[@]}" "$pjn"
    -d "$tfile"
    --no-web-server
  )

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/.git";
  assert_directory_not_exists "$tfile/utils";
  assert_file_not_exists "$tfile/utils/webserver";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";

  rm -rf "$tfile";
}

function test_project_installer() {
  local tfile="${tftmp_file}_project_installer";
  local pjn="gentsttmp_project_installer"
  local pex_=("${ex[@]}" "$pjn"
    -d "$tfile"
    --installer-git-repo "randoDev/randoRepo"
  )

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/.git";
  assert_directory_exists "$tfile/utils";
  assert_file_exists "$tfile/utils/install";
  assert_file_exists "$tfile/utils/get_$pjn";
  assert_file_exists "$tfile/utils/install";
  assert_file_exists "$tfile/utils/get_$pjn";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_exists "$tfile/readme.md";

  rm -rf "$tfile";
}

function test_project_readme() {
  local tfile="${tftmp_file}_project_readme";
  local pjn="gentsttmp_project_readme"
  local pex_=("${ex[@]}" "$pjn"
    -d "$tfile"
    --no-readme
  )

  assert_exit_code "0" "$("${pex_[@]}")";
  assert_directory_exists "$tfile";
  assert_directory_exists "$tfile/.git";
  assert_directory_exists "$tfile/utils";
  assert_file_exists "$tfile/utils/webserver";
  assert_file_exists "$tfile/documentation.md";
  assert_file_exists "$tfile/form.html";
  assert_file_exists "$tfile/Makefile";
  assert_file_exists "$tfile/$pjn";
  assert_file_not_exists "$tfile/readme.md";

  rm -rf "$tfile";
}