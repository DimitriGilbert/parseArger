# ParseArger

Generate standalone argument parsing in bash.

Have you ever dealt with the nightmare of bash option parsing ? Or maybe you wanted to clean-up some cool script you created by adding option (or, God(s) have mercy on us all, sub commands) just to burn your computer at the idea of so much boilerplate ?
Yeah, me too, and because the neighbor's wheel is not round enough to my taste, I create this, ParseArger !

This code is heavilly inspired by [Argbash](https://github.com/matejak/argbash) and uses its generated code as a basis.
Why not stick with it ? I did not understand how it was working and wanted to add a few things. Also, ParseArger do not have dependencies other than bash ;)

Ehhm, as long as you don't need completion generation, then you'll need [Completely](https://github.com/DannyBen/completely), it's a ruby gem, but theres a docker way to install it :)

## TLDR

```bash
# download the install script
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O;
# make it executable
chmod +x get_parseArger;
# install
./get_parseArger --install;
# source bashrc, only needed once, modify according to your shell (if you don't know, it's the good one :D)
source "$HOME/.bashrc"

# TLDR is too long ?! here is the lazy way (this is the way !)
# create a project "my-awesome-project" with two sub commands, completion, readme, documentation, html forms and installer scripts created ! BOOM
parseArger project my-awesome-project \
  --description "this is a cool project !" \
  --git-repo "myRandomDevName/my_awesome_project" \
  --project-subcommand my-script \
  --project-subcommand another-script \
  [--directory /path/to/project]

# want to get dirty ? you can do all by yourself !
# generates and echo parsing script for one argument and one option in a file, add execution rigths to the file
parseArger generate --pos 'first-argument "my first argument description"' --opt 'my-option "my option description"' --output /path/to/my-script
# get help
/path/to/my-script --help
# add code to your script
echo -e '\necho "running my script with \"$_arg_first_argument\"";\ntest "$_arg_my_option" != "" && echo "my-option is \"$_arg_my_option\"" || echo "no option given"' >> /path/to/my-script
# run your script
/path/to/my-script "parse away" --my-option "but not too far"

# generate documentation
parseArger document --file /path/to/my-script --out /path/to/documentation.md

# generate bash completion with completely
parseArger completely /path/to/my-script --completion-file /path/to/completion.bash
source /path/to/completion.bash
```

## Installation

An installation script is provided if you are feeling lazy, it will :
* clone (or download) parseArger,
* set execution permission,
* define a shell variable for parseArger directory and source parseArger.rc (alias and completion)

```bash
# download the script
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O;
# make it executable
chmod +x get_parseArger;
# display the help
./get_parseArger --help;
#	-b, --branch|--tag|--install-version <branch>: version to install
#	--install-directory <install-directory>: where to install
#	--install-file <install-file>: rc files to install to, forces install, repeatable
#	-i|--install|--no-install: install in bashrc
#	--remove-installer|--no-remove-installer: remove install script itself
#	aliases: --rm,
#	--ssh|--no-ssh: clone using ssh
#	--zip|--no-zip: install using zip archive, not recommended

# generic install
./get_parseArger --install;
```

### git

```bash
git clone https://github.com/DimitriGilbert/parseArger
```

### zip

```bash
parseargerTmp="$(mktemp)";
wget https://github.com/DimitriGilbert/parseArger/archive/refs/heads/main.zip -O "${parseargerTmp}.zip";
unzip "${parseargerTmp}.zip" -d ./;
rm "$parseargerTmp";
```

### Installing bash completion and alias

add this to your Xsh_rc (tested for bash and zsh) (or just run the commands for a one time load)

```bash
# Completion for parserArger
source /path/to/parseArger/completely.bash
alias parseArger=/path/to/parseArger/parseArger
```

## Usage

### Common options

* `--output <output>`: create file with command output at value
* `--prepend`: add output on top of file

### generate

generate the bash argument parsing code.

```bash
# one argument, one option, one flag
parseArger generate \
  --pos 'my-argument "my argument description"' \
  --opt 'my-option "my option description"' \
  --flag 'my-flag "my flag description"'
```

generic usage:

```bash
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

parseArger generate [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--help-message <value>] [--help-option <value>] [--help-short-option <value>] [--leftovers-name <value>] [--use-shebang <value>] [--set-version <value>] [--version-opt-name <value>] [--version-short-option <value>] [--die-fn-name <value>] [--log-fn-name <value>] [--verbose-opt-name <value>] [--verbose-level <value>] [--[no-]leftovers] [--[no-]bang] [--[no-]version-opt] [--[no-]use-verbose]

```
Variables are created containing passed value so you can easily access it.

created variables follow this pattern `$_arg_<argument|option|flag name>`. note that `-` are replaced with `_`.

```bash
# --pos 'my-argument "my argument description"'
echo "$_arg_my_argument";
# --opt 'foo-bar "baz"' --pos 'stuff "just that"'
echo "$_arg_foo_bar";
echo "$_arg_stuff";
```

#### pos

Repeated option. String representing arguments for [bin/pos/*](bin/pos/) scripts.

```bash
bin/pos/* <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--subcommand-directory <value>] [--subcommand-variable <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand] [--[no-]subcommand-run] [--[no-]subcommand-use-leftovers]

	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand
	--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
	--complete <complete>: bash built-in completely function, repeatable
	--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
	--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
	--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
```

**Examples**

```bash
# one argument
parseArger generate --pos 'my-argument "my argument description"'
# two arguments
parseArger generate --pos 'my-argument "my argument description"' --pos 'my-other-argument "another argument description"'
# ...
```

#### opt

Repeated option. String representing arguments for [bin/opt/*](bin/opt/) scripts.

```bash
bin/opt/* <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--complete <value>] [--complete-custom <value>] [--[no-]repeat] [--[no-]empty]

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
```

**Examples**

```bash
# one option
parseArger generate --opt 'my-option "my option description"'
# short option
parseArger generate --opt 'my-option "my option description" --short m'
# repeated option
parseArger generate --opt 'my-option "my option description" --repeat'
# two options
parseArger generate --opt 'my-option "my option description"' --opt 'my-other-option "another option description"'
# ...
```

#### flag

Repeated option. String representing arguments for [bin/flag/*](bin/flag/) scripts.

```bash
bin/flag/* <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]

	arg-name: positional argument name
	description: positional argument description
	-s, --short <short>: short form
	--no-name <no-name>: value for the negation
	--alias <alias>: flag alias, repeatable
	--no-alias <no-alias>: flag negation alias, repeatable
	--on|--no-on: on by default
```

**Examples**

```bash
# one flag
parseArger generate --flag 'my-flag "my flag description"'
# short flag
parseArger generate --flag 'my-flag "my flag description" --short m'
# flag on by default
parseArger generate --flag 'my-flag "my flag description" --on'
# two flags
parseArger generate --flag 'my-flag "my flag description"' --flag 'my-other-flag "another flag description"'
# ...
```

### parse

parse an existing parseArger script and add arguments, options, flag, etc...

```bash

parseArger parse \
	file: file to parse
	-p, --pos <pos>: add positional argument declaration, repeatable
	-o, --opt <opt>: add optional arg declaration, repeatable
	-f, --flag <flag>: add flag declaration, repeatable
	-s, --set <set>: add declare var, repeatable
	-l, --source <source>: add file to source, repeatable
	--set-version <set-version>: set version
	-i|--inplace|--no-inplace: replace parseArger generated content in place
```

### document

create documentation for parseArger script:

```bash
	-f, --file <file>: file to document, repeatable
	-d, --directory|--folder <directory>: directory to document, repeatable
	-o, --out <out>: output file
	--tag <tag>: markdown tag for title [default: ' ## ']
	--next-tag-prepend <next-tag-prepend>: prepend to next title tag level [default: ' # ']
	--title <title>: documentation title [default: ' Usage ']
	--title-tag <title-tag>: documentation title tag [default: ' # ']
	--sub-directory|--no-sub-directory: document subdirectory, on by default (use --no-sub-directory to turn it off)
	--append-output|--no-append-output: add to output file if it exists, on by default (use --no-append-output to turn it off)
```
Usage :
	parseArger document [--file <value>] [--directory <value>] [--out <value>] [--tag <value>] [--next-tag-prepend <value>] [--title <value>] [--title-tag <value>] [--[no-]sub-directory] [--[no-]append-output]

### completely

generate a completely yaml config and completion file:

```bash
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
Usage :
	parseArger completely <command-name> [file] [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--help-message <value>] [--help-option <value>] [--help-short-option <value>] [--leftovers-name <value>] [--version-opt-name <value>] [--version-short-option <value>] [--verbose-opt-name <value>] [--subcommand-directory <value>] [--completely-cmd <value>] [--extra-file <value>] [--yaml-file <value>] [--completion-file <value>] [--[no-]version-opt] [--[no-]use-verbose] [--[no-]run-completely]
```

### project

generate a project:

```bash
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

