# Usage

## parseArger

```
standalone bash argument parsing framework:
	target: what to do [one of 'bulk-parse' 'completely' 'document' 'generate' 'html-form' 'parse' 'project']
	--output <output>: create file with command output at value
	--prepend|--no-prepend: add output on top of file
Usage :
	parseArger <target> [--output <value>] [--[no-]prepend]
```

## parseArger bulk-parse

```
parse multiple file and directories:
	--bump <bump>: new version
	-f, --file <file>: file to document, repeatable
	-d, --directory|--folder <directory>: directory to document, repeatable
	--sub-directory|--no-sub-directory: document subdirectory, on by default (use --no-sub-directory to turn it off)
Usage :
	parseArger bulk-parse [--bump <value>] [--file <value>] [--directory <value>] [--[no-]sub-directory]
```

## parseArger completely

```
generate a completely yaml config and completion:
	command-name: command-name
	file: file, optional
	-p, --pos <pos>: positional argument declaration, repeatable
	-o, --opt <opt>: optional arg declaration, repeatable
	-f, --flag <flag>: flag declaration, repeatable
	-s, --set <set>: declare var, repeatable
	-l, --source <source>: file to source, repeatable
	-m, --help-message <help-message>: help message for the command [default: ' I send an SOS to the world ']
	--help-option <help-option>: help option trigger
	--help-short-option <help-short-option>: short help option
	--leftovers-name <leftovers-name>: extra arguments variable name [default: ' leftovers ']
	--version-opt-name <version-opt-name>: version option name [default: ' version ']
	--version-short-option <version-short-option>: version short option name [default: ' v ']
	--verbose-opt-name <verbose-opt-name>: verbose option name [default: ' verbose ']
	--subcommand-directory|--subcmd-dir <subcommand-directory>: directory for subcommand target
	--completely-cmd|--cmpcmd <completely-cmd>: completely command, repeatable
	--extra-file <extra-file>: extra yaml declaration, repeatable
	--yaml-file <yaml-file>: yaml file name [default: ' completely.yaml ']
	--completion-file <completion-file>: completion file name [default: ' completely.bash ']
	--version-opt|--no-version-opt: generate version opt handling, on by default (use --no-version-opt to turn it off)
	--use-verbose|--no-use-verbose: generate verbose level parser, on by default (use --no-use-verbose to turn it off)
	--run-completely|--no-run-completely: run completely, on by default (use --no-run-completely to turn it off)
		no-aliases: --no-run,
	--discover-subcommand|--no-discover-subcommand: auto run completely on found subcommand
Usage :
	parseArger completely <command-name> [file] [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--help-message <value>] [--help-option <value>] [--help-short-option <value>] [--leftovers-name <value>] [--version-opt-name <value>] [--version-short-option <value>] [--verbose-opt-name <value>] [--subcommand-directory <value>] [--completely-cmd <value>] [--extra-file <value>] [--yaml-file <value>] [--completion-file <value>] [--[no-]version-opt] [--[no-]use-verbose] [--[no-]run-completely] [--[no-]discover-subcommand]
```

## parseArger document

```
create documentation for parseArger script:
	-f, --file <file>: file to document, repeatable
	-d, --directory|--folder <directory>: directory to document, repeatable
	-o, --out <out>: output file
	--tag <tag>: markdown tag for title [default: ' ## ']
	--next-tag-prepend <next-tag-prepend>: prepend to next title tag level [default: ' # ']
	--title <title>: documentation title [default: ' Usage ']
	--title-tag <title-tag>: documentation title tag [default: ' # ']
	--sub-directory|--no-sub-directory: document subdirectory, on by default (use --no-sub-directory to turn it off)
	--append-output|--no-append-output: add to output file if it exists, on by default (use --no-append-output to turn it off)
Usage :
	parseArger document [--file <value>] [--directory <value>] [--out <value>] [--tag <value>] [--next-tag-prepend <value>] [--title <value>] [--title-tag <value>] [--[no-]sub-directory] [--[no-]append-output]
```

## parseArger generate

```
generate a parseArger script:
	-p, --pos <pos>: positional argument declaration, repeatable
	-o, --opt <opt>: optional arg declaration, repeatable
	-f, --flag <flag>: flag declaration, repeatable
	-s, --set <set>: declare var, repeatable
	-l, --source <source>: file to source, repeatable
	-m, --help-message <help-message>: help message for the command [default: ' I send an SOS to the world ']
	--help-option <help-option>: help option trigger
	--help-short-option <help-short-option>: short help option
	--leftovers-name <leftovers-name>: extra arguments variable name [default: ' leftovers ']
	--use-shebang <use-shebang>: shebang executable [default: ' /bin/bash ']
	--set-version <set-version>: set version number
	--version-opt-name <version-opt-name>: version option name [default: ' version ']
	--version-short-option <version-short-option>: version short option name [default: ' v ']
	--die-fn-name <die-fn-name>: die function name [default: ' die ']
	--log-fn-name <log-fn-name>: log function name [default: ' log ']
	--verbose-opt-name <verbose-opt-name>: verbose option name [default: ' verbose ']
	--verbose-level <verbose-level>: default verbose level [default: ' 0 ']
	--nested <nested>: nested option declaration, repeatable
 --history <history>: add n history lines at the end of the file
 --history-offset <history-offset>: offset --history value by value
 --history-file <history-file>: specify history file [default: ' $HOME/.bash_history ']
	--dependencies <dependencies>: script dependencies, repeatable
	--leftovers|--no-leftovers: accept extra arguments
	--bang|--no-bang: include shebang, on by default (use --no-bang to turn it off)
	--version-opt|--no-version-opt: generate version opt handling, on by default (use --no-version-opt to turn it off)
	--use-verbose|--no-use-verbose: generate verbose level parser, on by default (use --no-use-verbose to turn it off)
	--parse-leftovers|--no-parse-leftovers: parse leftovers, force leftovers
Usage :
  parseArger generate [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--help-message <value>] [--help-option <value>] [--help-short-option <value>] [--leftovers-name <value>] [--use-shebang <value>] [--set-version <value>] [--version-opt-name <value>] [--version-short-option <value>] [--die-fn-name <value>] [--log-fn-name <value>] [--verbose-opt-name <value>] [--verbose-level <value>] [--nested <value>] [--[no-]leftovers] [--[no-]bang] [--[no-]version-opt] [--[no-]use-verbose] [--[no-]parse-leftovers] 
```

## parseArger html-form

```
generate html form for a parsearger file:
	file: file to process
	--command <command>: command string, default to file 
	--action <action>: form action
	--form-class <form-class>: form html class
	--input-container-class <input-container-class>: input container class [default: ' form-group ']
	--input-class <input-class>: input class [default: ' form-control ']
	--label-class <label-class>: label class [default: ' form-label ']
	--select-class <select-class>: select class [default: ' form-select ']
	--checkbox-container-class|--radio-container-class <checkbox-container-class>: checkbox and radio class [default: ' form-check ']
	--checkbox-class|--radio-class <checkbox-class>: checkbox and radio class [default: ' form-check-input ']
	--checkbox-label-class|--radio-label-class <checkbox-label-class>: checkbox and radio label class [default: ' form-check-label ']
	--parent-form <parent-form>: parent form for result
	--form|--no-form: display form, on by default (use --no-form to turn it off)
	--button|--no-button: display button, on by default (use --no-button to turn it off)
	--js|--no-js: create javascript, --no-js forces --no-result, on by default (use --no-js to turn it off)
	--result|--no-result: display result, on by default (use --no-result to turn it off)
Usage :
	parseArger html-form <file> [--command <value>] [--action <value>] [--form-class <value>] [--input-container-class <value>] [--input-class <value>] [--label-class <value>] [--select-class <value>] [--checkbox-container-class <value>] [--checkbox-class <value>] [--checkbox-label-class <value>] [--parent-form <value>] [--[no-]form] [--[no-]button] [--[no-]js] [--[no-]result]
```

## parseArger parse

```
parse an existing parseArger file:
	file: file to parse
	-p, --pos <pos>: add positional argument declaration, repeatable
	-o, --opt <opt>: add optional arg declaration, repeatable
	-f, --flag <flag>: add flag declaration, repeatable
	--nested <nested>: nested option declaration, repeatable
	-s, --set <set>: add declare var, repeatable
	-l, --source <source>: add file to source, repeatable
	--set-version <set-version>: set version
	--dependencies <dependencies>: script dependencies, repeatable
	-i|--inplace|--no-inplace: replace parseArger generated content in place
Usage :
	parseArger parse <file> [--pos <value>] [--opt <value>] [--flag <value>] [--nested <value>] [--set <value>] [--source <value>] [--set-version <value>] [--[no-]inplace]
```

## parseArger project

```
generate or parse a project:
	name: project name
	target: specific stuff on a project, optional [one of 'git-init' 'installer' '' '' 'git-init' 'git-init']
	--description|--project-help <description>: project description
	-d, --directory|--dir <directory>: output directory, ./<project_name> by default
	--project-subcommand-dir|--subcommand-directory <project-subcommand-dir>: subcommand script directory [default: ' bin ']
	--project-subcommand <project-subcommand>: project subcommand, forces has-subcommand, repeatable
	--completely <completely>: generate bash completion, filenames (.yaml and .bash) if value is specified
	--document <document>: generate documentation, filename (.md) if value is specified [default: ' on ']
	--html-form <html-form>: generate html-form, filename (.html) if value is specified [default: ' on ']
	--cp <cp>: file or directory to copy to the project directory, repeatable
	--installer-git-service|--git-provider <installer-git-service>: git service [default: ' github.com ']
	--installer-git-repo|--git-repo <installer-git-repo>: git repo eg DimitriGilbert/parseArger
	--git-add <git-add>: stuff to add to git, repeatable
	--git-commit|--commit <git-commit>: commit, force --git-add
	--readme|--no-readme: create a basic readme, on by default (use --no-readme to turn it off)
	--git|--no-git: git init, on by default (use --no-git to turn it off)
Usage :
	parseArger project <name> [target] [--description <value>] [--directory <value>] [--project-subcommand-dir <value>] [--project-subcommand <value>] [--completely <value>] [--document <value>] [--html-form <value>] [--cp <value>] [--installer-git-service <value>] [--installer-git-repo <value>] [--git-add <value>] [--git-commit <value>] [--[no-]readme] [--[no-]git]

```

## ./bin

### [parseArger dir]/bin/bulk-parse

```
parse multiple file and directories:
	--bump <bump>: new version
	-f, --file <file>: file to document, repeatable
	-d, --directory|--folder <directory>: directory to document, repeatable
	--sub-directory|--no-sub-directory: document subdirectory, on by default (use --no-sub-directory to turn it off)
Usage :
	[parseArger dir]/bin/bulk-parse [--bump <value>] [--file <value>] [--directory <value>] [--[no-]sub-directory]
```

### [parseArger dir]/bin/completely

```
generate a completely yaml config and completion:
	command-name: command-name
	file: file, optional
	-p, --pos <pos>: positional argument declaration, repeatable
	-o, --opt <opt>: optional arg declaration, repeatable
	-f, --flag <flag>: flag declaration, repeatable
	-s, --set <set>: declare var, repeatable
	-l, --source <source>: file to source, repeatable
	-m, --help-message <help-message>: help message for the command [default: ' I send an SOS to the world ']
	--help-option <help-option>: help option trigger
	--help-short-option <help-short-option>: short help option
	--leftovers-name <leftovers-name>: extra arguments variable name [default: ' leftovers ']
	--version-opt-name <version-opt-name>: version option name [default: ' version ']
	--version-short-option <version-short-option>: version short option name [default: ' v ']
	--verbose-opt-name <verbose-opt-name>: verbose option name [default: ' verbose ']
	--subcommand-directory|--subcmd-dir <subcommand-directory>: directory for subcommand target
	--completely-cmd|--cmpcmd <completely-cmd>: completely command, repeatable
	--extra-file <extra-file>: extra yaml declaration, repeatable
	--yaml-file <yaml-file>: yaml file name [default: ' completely.yaml ']
	--completion-file <completion-file>: completion file name [default: ' completely.bash ']
	--version-opt|--no-version-opt: generate version opt handling, on by default (use --no-version-opt to turn it off)
	--use-verbose|--no-use-verbose: generate verbose level parser, on by default (use --no-use-verbose to turn it off)
	--run-completely|--no-run-completely: run completely, on by default (use --no-run-completely to turn it off)
		no-aliases: --no-run,
	--discover-subcommand|--no-discover-subcommand: auto run completely on found subcommand
Usage :
	[parseArger dir]/bin/completely <command-name> [file] [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--help-message <value>] [--help-option <value>] [--help-short-option <value>] [--leftovers-name <value>] [--version-opt-name <value>] [--version-short-option <value>] [--verbose-opt-name <value>] [--subcommand-directory <value>] [--completely-cmd <value>] [--extra-file <value>] [--yaml-file <value>] [--completion-file <value>] [--[no-]version-opt] [--[no-]use-verbose] [--[no-]run-completely] [--[no-]discover-subcommand]
```

### [parseArger dir]/bin/document

```
create documentation for parseArger script:
	-f, --file <file>: file to document, repeatable
	-d, --directory|--folder <directory>: directory to document, repeatable
	-o, --out <out>: output file
	--tag <tag>: markdown tag for title [default: ' ## ']
	--next-tag-prepend <next-tag-prepend>: prepend to next title tag level [default: ' # ']
	--title <title>: documentation title [default: ' Usage ']
	--title-tag <title-tag>: documentation title tag [default: ' # ']
	--sub-directory|--no-sub-directory: document subdirectory, on by default (use --no-sub-directory to turn it off)
	--append-output|--no-append-output: add to output file if it exists, on by default (use --no-append-output to turn it off)
Usage :
	[parseArger dir]/bin/document [--file <value>] [--directory <value>] [--out <value>] [--tag <value>] [--next-tag-prepend <value>] [--title <value>] [--title-tag <value>] [--[no-]sub-directory] [--[no-]append-output]
```

### [parseArger dir]/bin/generate

```
generate a parseArger script:
	-p, --pos <pos>: positional argument declaration, repeatable
	-o, --opt <opt>: optional arg declaration, repeatable
	-f, --flag <flag>: flag declaration, repeatable
	-s, --set <set>: declare var, repeatable
	-l, --source <source>: file to source, repeatable
	-m, --help-message <help-message>: help message for the command [default: ' I send an SOS to the world ']
	--help-option <help-option>: help option trigger
	--help-short-option <help-short-option>: short help option
	--leftovers-name <leftovers-name>: extra arguments variable name [default: ' leftovers ']
	--use-shebang <use-shebang>: shebang executable [default: ' /bin/bash ']
	--set-version <set-version>: set version number
	--version-opt-name <version-opt-name>: version option name [default: ' version ']
	--version-short-option <version-short-option>: version short option name [default: ' v ']
	--die-fn-name <die-fn-name>: die function name [default: ' die ']
	--log-fn-name <log-fn-name>: log function name [default: ' log ']
	--verbose-opt-name <verbose-opt-name>: verbose option name [default: ' verbose ']
	--verbose-level <verbose-level>: default verbose level [default: ' 0 ']
	--leftovers|--no-leftovers: accept extra arguments
	--bang|--no-bang: include shebang, on by default (use --no-bang to turn it off)
	--version-opt|--no-version-opt: generate version opt handling, on by default (use --no-version-opt to turn it off)
	--use-verbose|--no-use-verbose: generate verbose level parser, on by default (use --no-use-verbose to turn it off)
Usage :
	[parseArger dir]/bin/generate [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--help-message <value>] [--help-option <value>] [--help-short-option <value>] [--leftovers-name <value>] [--use-shebang <value>] [--set-version <value>] [--version-opt-name <value>] [--version-short-option <value>] [--die-fn-name <value>] [--log-fn-name <value>] [--verbose-opt-name <value>] [--verbose-level <value>] [--[no-]leftovers] [--[no-]bang] [--[no-]version-opt] [--[no-]use-verbose]
```

### [parseArger dir]/bin/html-form

```
generate html form for a parsearger file:
	file: file to process
	--command <command>: command string, default to file 
	--action <action>: form action
	--form-class <form-class>: form html class
	--input-container-class <input-container-class>: input container class [default: ' form-group ']
	--input-class <input-class>: input class [default: ' form-control ']
	--label-class <label-class>: label class [default: ' form-label ']
	--select-class <select-class>: select class [default: ' form-select ']
	--checkbox-container-class|--radio-container-class <checkbox-container-class>: checkbox and radio class [default: ' form-check ']
	--checkbox-class|--radio-class <checkbox-class>: checkbox and radio class [default: ' form-check-input ']
	--checkbox-label-class|--radio-label-class <checkbox-label-class>: checkbox and radio label class [default: ' form-check-label ']
	--parent-form <parent-form>: parent form for result
	--form|--no-form: display form, on by default (use --no-form to turn it off)
	--button|--no-button: display button, on by default (use --no-button to turn it off)
	--js|--no-js: create javascript, --no-js forces --no-result, on by default (use --no-js to turn it off)
	--result|--no-result: display result, on by default (use --no-result to turn it off)
Usage :
	[parseArger dir]/bin/html-form <file> [--command <value>] [--action <value>] [--form-class <value>] [--input-container-class <value>] [--input-class <value>] [--label-class <value>] [--select-class <value>] [--checkbox-container-class <value>] [--checkbox-class <value>] [--checkbox-label-class <value>] [--parent-form <value>] [--[no-]form] [--[no-]button] [--[no-]js] [--[no-]result]
```

### [parseArger dir]/bin/parse

```
parse an existing parseArger file:
	file: file to parse
	-p, --pos <pos>: add positional argument declaration, repeatable
	-o, --opt <opt>: add optional arg declaration, repeatable
	-f, --flag <flag>: add flag declaration, repeatable
	-s, --set <set>: add declare var, repeatable
	-l, --source <source>: add file to source, repeatable
	--set-version <set-version>: set version
	-i|--inplace|--no-inplace: replace parseArger generated content in place
Usage :
	[parseArger dir]/bin/parse <file> [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--set-version <value>] [--[no-]inplace]
```

### [parseArger dir]/bin/project

```
generate or parse a project:
	name: project name
	target: specific stuff on a project, optional [one of 'git-init' 'installer' '' '' 'git-init' 'git-init']
	--description|--project-help <description>: project description
	-d, --directory|--dir <directory>: output directory, ./<project_name> by default
	--project-subcommand-dir|--subcommand-directory <project-subcommand-dir>: subcommand script directory [default: ' bin ']
	--project-subcommand <project-subcommand>: project subcommand, forces has-subcommand, repeatable
	--completely <completely>: generate bash completion, filenames (.yaml and .bash) if value is specified
	--document <document>: generate documentation, filename (.md) if value is specified [default: ' on ']
	--html-form <html-form>: generate html-form, filename (.html) if value is specified [default: ' on ']
	--cp <cp>: file or directory to copy to the project directory, repeatable
	--installer-git-service|--git-provider <installer-git-service>: git service [default: ' github.com ']
	--installer-git-repo|--git-repo <installer-git-repo>: git repo eg DimitriGilbert/parseArger
	--git-add <git-add>: stuff to add to git, repeatable
	--git-commit|--commit <git-commit>: commit, force --git-add
	--readme|--no-readme: create a basic readme, on by default (use --no-readme to turn it off)
	--git|--no-git: git init, on by default (use --no-git to turn it off)
Usage :
	[parseArger dir]/bin/project <name> [target] [--description <value>] [--directory <value>] [--project-subcommand-dir <value>] [--project-subcommand <value>] [--completely <value>] [--document <value>] [--html-form <value>] [--cp <value>] [--installer-git-service <value>] [--installer-git-repo <value>] [--git-add <value>] [--git-commit <value>] [--[no-]readme] [--[no-]git]
```

### [parseArger dir]/bin/common

### [parseArger dir]/bin/flag

#### [parseArger dir]/bin/flag/completely

```
parseArger init string for flags:
	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--on|--no-on: on by default
Usage :
	[parseArger dir]/bin/flag/completely <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### [parseArger dir]/bin/flag/declaration

```
parseArger declaration string for flags:
	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--on|--no-on: on by default
Usage :
	[parseArger dir]/bin/flag/declaration <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### [parseArger dir]/bin/flag/docopt-help

```
parseArger docopt string for flags:
	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--on|--no-on: on by default
Usage :
	[parseArger dir]/bin/flag/docopt-help <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### [parseArger dir]/bin/flag/help

```
I send an SOS to the world:
	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--on|--no-on: on by default
Usage :
	[parseArger dir]/bin/flag/help <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### [parseArger dir]/bin/flag/html

```
parseArger init string for flags:
	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--checkbox-container-class|--radio-container-class <checkbox-container-class>: checkbox and radio class [default: ' form-check ']
	--checkbox-class|--radio-class <checkbox-class>: checkbox and radio class [default: ' form-check-input ']
	--checkbox-label-class|--radio-label-class <checkbox-label-class>: checkbox and radio label class [default: ' form-check-label ']
	--on|--no-on: on by default
Usage :
	[parseArger dir]/bin/flag/html <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--checkbox-container-class <value>] [--checkbox-class <value>] [--checkbox-label-class <value>] [--[no-]on]
```

#### [parseArger dir]/bin/flag/init

```
parseArger init string for flags:
	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--on|--no-on: on by default
Usage :
	[parseArger dir]/bin/flag/init <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### [parseArger dir]/bin/flag/parser

```
parseArger parsing string for flags:
	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--on|--no-on: on by default
Usage :
	[parseArger dir]/bin/flag/parser <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

### [parseArger dir]/bin/help

#### [parseArger dir]/bin/help/declaration

```
create common help stuff:
	message: your main help message
	--option <option>: help trigger option [default: ' help ']
	--short-option <short-option>: help trigger short option [default: ' h ']
Usage :
	[parseArger dir]/bin/help/declaration <message> [--option <value>] [--short-option <value>]
```

#### [parseArger dir]/bin/help/get-trigger

```
create common help stuff:
	message: your main help message
	--option <option>: help trigger option [default: ' help ']
	--short-option <short-option>: help trigger short option [default: ' h ']
Usage :
	[parseArger dir]/bin/help/get-trigger <message> [--option <value>] [--short-option <value>]
```

#### [parseArger dir]/bin/help/parser

```
create help parser:
	message: your main help message
	--option <option>: help trigger option [default: ' help ']
	--short-option <short-option>: help trigger short option [default: ' h ']
	--has-subcommand|--no-has-subcommand: do not exit after print_help
Usage :
	[parseArger dir]/bin/help/parser <message> [--option <value>] [--short-option <value>] [--[no-]has-subcommand]
```

### [parseArger dir]/bin/opt

#### [parseArger dir]/bin/opt/completely

```
parseArger declaration string for options:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/completely <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/declaration

```
parseArger declaration string for options:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/declaration <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/docopt-help

```
parseArger docOpt string for option:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/docopt-help <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/help

```
parseArger help string for options:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/help <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/html

```
option to html form:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--input-container-class <input-container-class>: input container class [default: ' form-group ']
	--input-class <input-class>: input class [default: ' form-control ']
	--label-class <label-class>: label class [default: ' form-label ']
	--select-class <select-class>: select class [default: ' form-select ']
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/html <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--input-container-class <value>] [--input-class <value>] [--label-class <value>] [--select-class <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/init

```
parseArger init string for options:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/init <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/is-repeating

```
is the option repeating:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/is-repeating <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/more-completely

```
parseArger declaration string for options:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--prefix <prefix>: completely prefix
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/more-completely <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--prefix <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/opt/parser

```
parseArger parsing string for options:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	[parseArger dir]/bin/opt/parser <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

### [parseArger dir]/bin/pos

#### [parseArger dir]/bin/pos/completely

```
parseArger string to declare a new option:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/completely <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-run] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/declaration

```
parseArger string to declare a new option:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/declaration <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-run] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/get-subcmd-directory

```
is the arg a sub command:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/get-subcmd-directory <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]subcommand-run] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/help

```
parseArger help string for arguments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/help <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]subcommand-run] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/html

```
positional argument to html input:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--command <command>: command string, default to file 
	--form-class <form-class>: form html class
	--input-container-class <input-container-class>: input container class [default: ' form-group ']
	--input-class <input-class>: input class [default: ' form-control ']
	--label-class <label-class>: label class [default: ' form-label ']
	--select-class <select-class>: select class [default: ' form-select ']
	--checkbox-container-class|--radio-container-class <checkbox-container-class>: checkbox and radio class [default: ' form-check ']
	--checkbox-class|--radio-class <checkbox-class>: checkbox and radio class [default: ' form-check-input ']
	--checkbox-label-class|--radio-label-class <checkbox-label-class>: checkbox and radio label class [default: ' form-check-label ']
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/html <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--command <value>] [--form-class <value>] [--input-container-class <value>] [--input-class <value>] [--label-class <value>] [--select-class <value>] [--checkbox-container-class <value>] [--checkbox-class <value>] [--checkbox-label-class <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-run] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/init

```
parseArger init string for agruments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/init <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]subcommand-run] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/is-subcmd

```
is the arg a sub command:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/is-subcmd <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]subcommand-run] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/parser

```
parseArger parsing string for arguments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/parser <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]subcommand-run] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/subcmd-assign

```
parseArger parsing string for arguments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/subcmd-assign <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]subcommand-run] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/subcmd-handle

```
parseArger parsing string for arguments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/subcmd-handle <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]subcommand-run] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-use-leftovers]
```

#### [parseArger dir]/bin/pos/subcmd-html

```
positional argument to html input:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	--command <command>: command string, default to file 
	--form-class <form-class>: form html class
	--input-container-class <input-container-class>: input container class [default: ' form-group ']
	--input-class <input-class>: input class [default: ' form-control ']
	--label-class <label-class>: label class [default: ' form-label ']
	--select-class <select-class>: select class [default: ' form-select ']
	--checkbox-container-class|--radio-container-class <checkbox-container-class>: checkbox and radio class [default: ' form-check ']
	--checkbox-class|--radio-class <checkbox-class>: checkbox and radio class [default: ' form-check-input ']
	--checkbox-label-class|--radio-label-class <checkbox-label-class>: checkbox and radio label class [default: ' form-check-label ']
	--parent-form <parent-form>: parent form for result
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
Usage :
	[parseArger dir]/bin/pos/subcmd-html <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--command <value>] [--form-class <value>] [--input-container-class <value>] [--input-class <value>] [--label-class <value>] [--select-class <value>] [--checkbox-container-class <value>] [--checkbox-class <value>] [--checkbox-label-class <value>] [--parent-form <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-run] [--[no-]subcommand-use-leftovers]
```

### [parseArger dir]/bin/nested

#### [parseArger dir]/bin/nested/completely

```
parseArger declaration string for nested options:
	arg-name: nested option namespace
	description: positional argument description
	--one-of <one-of>: accepted values for keys, repeatable
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
Usage :
	/completely <arg-name> <description> [--one-of <value>] [--complete <value>] [--complete-custom <value>]
```

#### [parseArger dir]/bin/nested/declaration

```
parseArger declaration string for options:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	/declaration <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]
```

#### [parseArger dir]/bin/nested/docopt-help

```
parseArger docOpt string for option:
	arg-name: nested option namespace
	description: positional argument description
	--one-of <one-of>: accepted values for keys, repeatable
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
Usage :
	/docopt-help <arg-name> <description> [--one-of <value>] [--complete <value>] [--complete-custom <value>]
```

#### [parseArger dir]/bin/nested/help

```
parseArger help string for options:
	arg-name: nested option namespace
	description: positional argument description
	--one-of <one-of>: accepted values for keys, repeatable
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
Usage :
	/help <arg-name> <description> [--one-of <value>] [--complete <value>] [--complete-custom <value>]
```

#### [parseArger dir]/bin/nested/html

```
option to html form:
	arg-name: nested option namespace
	description: positional argument description
	--one-of <one-of>: accepted values for keys, repeatable
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
Usage :
	/html <arg-name> <description> [--one-of <value>] [--complete <value>] [--complete-custom <value>]
```

#### [parseArger dir]/bin/nested/init

```
parseArger init string for options:
	arg-name: nested option namespace
	description: positional argument description
	--one-of <one-of>: accepted values for keys, repeatable
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
Usage :
	/init <arg-name> <description> [--one-of <value>] [--complete <value>] [--complete-custom <value>]
```

#### [parseArger dir]/bin/nested/more-completely

```
parseArger declaration string for options:
	arg-name: nested option namespace
	description: positional argument description
	--one-of <one-of>: accepted values for keys, repeatable
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
Usage :
	/more-completely <arg-name> <description> [--one-of <value>] [--complete <value>] [--complete-custom <value>]
```

#### [parseArger dir]/bin/nested/parser

```
parseArger parsing string for options:
	arg-name: nested option namespace
	description: positional argument description
	--one-of <one-of>: accepted values for keys, repeatable
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
Usage :
	/parser <arg-name> <description> [--one-of <value>] [--complete <value>] [--complete-custom <value>]
```

### [parseArger dir]/bin/_project

#### [parseArger dir]/bin/_project/git-init

```
initialize git, optionally add and commit:
	--add <add>: what to add, repeatable
	--commit <commit>: commit, default message if nothing specified, can be empty [empty value: 'parseArger project first commit']
Usage :
	[parseArger dir]/bin/_project/git-init [--add <value>] [--commit <value>]
```

#### [parseArger dir]/bin/_project/installer

```
generate the get_<myscript> docwloader and installer:
	name: project name
	--git-repo <git-repo>: git repository name
	--git-service <git-service>: git service [default: ' github ']
	--parsearger <parsearger>: parseArger path, repeatable
Usage :
	[parseArger dir]/bin/_project/installer <name> [--git-repo <value>] [--git-service <value>] [--parsearger <value>]
```

### [parseArger dir]/bin/verbose

#### [parseArger dir]/bin/verbose/declaration

```
create common verbose stuff:
	--option <option>: verbose trigger option [default: ' verbose ']
	--level <level>: verbose default level [default: ' 0 ']
	--log-fn-name <log-fn-name>: log function name [default: ' log ']
	--quiet-option <quiet-option>: trigger to tell script to shut up [default: ' quiet ']
Usage :
	[parseArger dir]/bin/verbose/declaration [--option <value>] [--level <value>] [--log-fn-name <value>] [--quiet-option <value>]
```

#### [parseArger dir]/bin/verbose/init

```
init verbose stuff:
	--option <option>: verbose trigger option [default: ' verbose ']
	--level <level>: verbose default level [default: ' 0 ']
	--log-fn-name <log-fn-name>: log function name [default: ' log ']
	--quiet-option <quiet-option>: trigger to tell script to shut up [default: ' quiet ']
Usage :
	[parseArger dir]/bin/verbose/init [--option <value>] [--level <value>] [--log-fn-name <value>] [--quiet-option <value>]
```

#### [parseArger dir]/bin/verbose/logger

```
init verbose stuff:
	--option <option>: verbose trigger option [default: ' verbose ']
	--level <level>: verbose default level [default: ' 0 ']
	--log-fn-name <log-fn-name>: log function name [default: ' log ']
	--quiet-option <quiet-option>: trigger to tell script to shut up [default: ' quiet ']
Usage :
	[parseArger dir]/bin/verbose/logger [--option <value>] [--level <value>] [--log-fn-name <value>] [--quiet-option <value>]
```

#### [parseArger dir]/bin/verbose/parser

```
create version parser:
	--option <option>: verbose trigger option [default: ' verbose ']
	--level <level>: verbose default level [default: ' 0 ']
	--log-fn-name <log-fn-name>: log function name [default: ' log ']
	--quiet-option <quiet-option>: trigger to tell script to shut up [default: ' quiet ']
Usage :
	[parseArger dir]/bin/verbose/parser [--option <value>] [--level <value>] [--log-fn-name <value>] [--quiet-option <value>]
```

### [parseArger dir]/bin/version

#### [parseArger dir]/bin/version/declaration

```
create common version stuff:
	vernum: your version number
	--option <option>: version trigger option [default: ' version ']
	--short-option <short-option>: version trigger short option [default: ' v ']
Usage :
	[parseArger dir]/bin/version/declaration <vernum> [--option <value>] [--short-option <value>]
```

#### [parseArger dir]/bin/version/parser

```
create version parser:
	vernum: your version number
	--option <option>: version trigger option [default: ' version ']
	--short-option <short-option>: version trigger short option [default: ' v ']
Usage :
	[parseArger dir]/bin/version/parser <vernum> [--option <value>] [--short-option <value>]
```


