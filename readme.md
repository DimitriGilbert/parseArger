# ParseArger

Generate standalone argument parsing in bash.

Have you ever dealt with the nightmare of bash option parsing ? Or maybe you wanted to clean-up some cool script you created by adding option just to burn your computer at the idea of so much boilerplate ?
Yeah, me too, and because the neighbor's wheel is not round enough to my taste, I create this, ParseArger !

This code is heavilly inspired by [Argbash](https://github.com/matejak/argbash) and uses its generated code as a basis.
Why not stick with it ? I did not understand how it was working and wanted to add a few things. Also, ParseArger do not have dependencies other than bash ;)

## TLDR

```bash
# install
git clone https://github.com/DimitriGilbert/parseArger
# add execution rigths
chmod +x parseArger/parseArger parseArger/bin -R
# echo parsing script for one argument and one option in a file, add execution rigths to the file
parseArger/parseArger generate --pos 'first-argument "my first argument description"' --opt 'my-option "my option description"' --output /path/to/my-script
# get help
/path/to/my-script --help
# add code to your script
echo -e '\necho "running my script with \"$_arg_first_argument\"";\ntest "$_arg_my_option" != "" && echo "my-option is \"$_arg_my_option\"" || echo "no option given"' >> /path/to/my-script
# run your script
/path/to/my-script "parse away" --my-option "but not too far"
```

## Installation

### git (recommended)

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
parseArger generate [--pos <arg>] [--opt <arg>] [--flag <arg>] [--set <arg>] [--source <arg>] [--help-message <arg>] [--help-option <arg>] [--help-short-option <arg>] [--leftovers-name <arg>] [--use-bang <arg>] [--(no-)leftovers] [--(no-)bang] [-h|--help]

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
--leftovers|--no-leftovers: accept extra arguments
--bang|--no-bang: include shebang, on by default (use --no-bang to turn it off)
--version-opt|--no-version-opt: generate version opt handling, on by default (use --no-version-opt to turn it off)

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
bin/pos/* [-d|--default-value <arg>] [--repeat-min <arg>] [--repeat-max <arg>] [--one-of <arg>] [-r|--(no-)repeat] [--(no-)optional] [--(no-)subcommand] [-h|--help] <arg-name> <description>

	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
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
bin/opt/* [-s|--short <arg>] [--template <arg>] [-d|--default-value <arg>] [--one-of <arg>] [-r|--(no-)repeat] [-h|--help] [--alias <alias>] <arg-name> <description>

	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces repeat
	--one-of <one-of>: accepted values, repeatable
	-d, --default-value <default-value>: value, repeatable
	-s, --short <short>: short form
	--alias <alias>: option alias, repeatable
	--empty-value <empty-value>: value for empty option
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
bin/flag/* [-s|--short <arg>] [--template <arg>] [-d|--default-value <arg>] [--one-of <arg>] [-r|--(no-)repeat] [-h|--help] <arg-name> <description>

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
  <file to parse> \
	-p, --pos <pos>: add positional argument declaration, repeatable
	-o, --opt <opt>: add optional arg declaration, repeatable
	-f, --flag <flag>: add flag declaration, repeatable
	-s, --set <set>: add declare var, repeatable
	-l, --source <source>: add file to source, repeatable
	--set-version <set-version>: set version
	-i|--inplace|--no-inplace: replace parseArger generated content in place
```

### ./bin/document

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
	./bin/document [--file <value>] [--directory <value>] [--out <value>] [--tag <value>] [--next-tag-prepend <value>] [--title <value>] [--title-tag <value>] [--[no-]sub-directory] [--[no-]append-output]
