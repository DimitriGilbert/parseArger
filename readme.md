# ParseArger

Generate standalone argument parsing in bash.

This code is heavilly inspired by [Argbash](https://github.com/matejak/argbash) and uses its generated code as a basis (also, most of the script here still uses it for now)

## TLDR

```bash
# install
git clone https://github.com/DimitriGilbert/parseArger
# add execution rigths
chmod +x parseArger/parseArger parseArger/bin -R
# echo parsing script for one argument and one option in a file
parseArger/parseArger generate --pos 'first-argument "my first argument description"' --opt 'my-option "my option description"' --output /path/to/my-script
# add execution rigths
chmod +x /path/to/my-script
# get help
/path/to/my-script --help
# add code to your script
echo -e '\necho "running my script with \"$_arg_first_argument\"";\ntest "$_arg_my_option" != "" && echo "my-option is \"$_arg_my_option\"" || echo "no option given"' >> my-script
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
```

* --pos: positional arguments declarations, repeated (empty by default)
* --opt: optionnal arguments declarations, repeated (empty by default)
* --flag: flags declarations, repeated (empty by default)
* --set: variable declarations, repeated (empty by default)
* --source: file to source, repeated (empty by default)
* --help-message: general help message for the script (default: 'I send an SOS to the world')
* --help-option: option to trigger for the script (no default)
* --help-short-option: option to trigger for the script (no default)
* --leftovers-name: extra arguments variable name (default: 'leftovers')
* --use-bang: shebang executable (default: '/bin/bash')
* --leftovers, --no-leftovers: accept extra arguments (off by default)
* --bang, --no-bang: include shebang (on by default)
* -h, --help: Prints help
* --output: path to file, prepend code if file exists

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
```

* arg-name: positional argument name
* description: positional argument description
* -d, --default-value: default value (no default)
* --repeat-min: minimum repeatition, forces --repeat (default: '1')
* --repeat-max: maximum repeatition, forces --repeat (no default)
* --one-of: list of accepted values (empty by default)
* -r, --repeat, --no-repeat: repeatable (off by default)
* --optional, --no-optional: optional (off by default)
* --subcommand, --no-subcommand: this is a subcommand (off by default)
* -h, --help: Prints help

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
bin/opt/* [-s|--short <arg>] [--template <arg>] [-d|--default-value <arg>] [--one-of <arg>] [-r|--(no-)repeat] [-h|--help] <arg-name> <description>
```

* arg-name: positional argument name
* description: positional argument description
* -s, --short: short option (no default)
* -d, --default-value: default value (empty by default)
* --one-of: list of accepted values (empty by default)
* -r, --repeat, --no-repeat: repeatable (off by default)
* -h, --help: Prints help

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
```

* arg-name: positional argument name
* description: flag description
* -s, --short: short option (no default)
* --on, --no-on: flag on by default (off by default)
* -h, --help: Prints help

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
  [--inplace|-i]
```
