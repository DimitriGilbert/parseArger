# Usage

## ./parseArger

```
standalone bash argument parsing framework:
	target: what to do [one of 'parse' 'generate']
	--output <output>: create file with command output at value
	--prepend|--no-prepend: add output on top of file
Usage :
	./parseArger <target> [--output <value>] [--[no-]prepend]
```

## ./bin

### ./bin/document

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
	./bin/document [--file <value>] [--directory <value>] [--out <value>] [--tag <value>] [--next-tag-prepend <value>] [--title <value>] [--title-tag <value>] [--[no-]sub-directory] [--[no-]append-output]
```

### ./bin/generate

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
	--leftovers|--no-leftovers: accept extra arguments
	--bang|--no-bang: include shebang, on by default (use --no-bang to turn it off)
	--version-opt|--no-version-opt: generate version opt handling, on by default (use --no-version-opt to turn it off)
Usage :
	./bin/generate [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--help-message <value>] [--help-option <value>] [--help-short-option <value>] [--leftovers-name <value>] [--use-shebang <value>] [--set-version <value>] [--version-opt-name <value>] [--version-short-option <value>] [--[no-]leftovers] [--[no-]bang] [--[no-]version-opt]
```

### ./bin/parse

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
	./bin/parse <file> [--pos <value>] [--opt <value>] [--flag <value>] [--set <value>] [--source <value>] [--set-version <value>] [--[no-]inplace]
```

### ./bin/common

### ./bin/flag

#### ./bin/flag/declaration

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
	./bin/flag/declaration <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### ./bin/flag/docopt-help

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
	./bin/flag/docopt-help <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### ./bin/flag/help

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
	./bin/flag/help <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### ./bin/flag/init

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
	./bin/flag/init <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

#### ./bin/flag/parser

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
	./bin/flag/parser <arg-name> <description> [--short <value>] [--no-name <value>] [--alias <value>] [--no-alias <value>] [--[no-]on]
```

### ./bin/help

#### ./bin/help/declaration

```
create common help stuff:
	message: your main help message
	--option <option>: help trigger option [default: ' help ']
	--short-option <short-option>: help trigger short option [default: ' h ']
Usage :
	./bin/help/declaration <message> [--option <value>] [--short-option <value>]
```

#### ./bin/help/parser

```
create help parser:
	message: your main help message
	--option <option>: help trigger option [default: ' help ']
	--short-option <short-option>: help trigger short option [default: ' h ']
	--has-subcommand|--no-has-subcommand: do not exit after print_help
Usage :
	./bin/help/parser <message> [--option <value>] [--short-option <value>] [--[no-]has-subcommand]
```

### ./bin/opt

#### ./bin/opt/declaration

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
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	./bin/opt/declaration <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--[no-]repeat] [--[no-]empty]
```

#### ./bin/opt/docopt-help

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
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	./bin/opt/docopt-help <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--[no-]repeat] [--[no-]empty]
```

#### ./bin/opt/help

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
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	./bin/opt/help <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--[no-]repeat] [--[no-]empty]
```

#### ./bin/opt/init

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
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	./bin/opt/init <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--[no-]repeat] [--[no-]empty]
```

#### ./bin/opt/is-repeating

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
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	./bin/opt/is-repeating <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--[no-]repeat] [--[no-]empty]
```

#### ./bin/opt/parser

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
	-r|--repeat|--no-repeat: repeatable
	--empty|--no-empty: use option as flag
Usage :
	./bin/opt/parser <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--default-value <value>] [--short <value>] [--alias <value>] [--empty-value <value>] [--[no-]repeat] [--[no-]empty]
```

### ./bin/pos

#### ./bin/pos/declaration

```
parseArger string to declare a new option:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
Usage :
	./bin/pos/declaration <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand]
```

#### ./bin/pos/help

```
parseArger help string for arguments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
Usage :
	./bin/pos/help <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand]
```

#### ./bin/pos/init

```
parseArger init string for agruments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
Usage :
	./bin/pos/init <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand]
```

#### ./bin/pos/is-subcmd

```
is the arg a sub command:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
Usage :
	./bin/pos/is-subcmd <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand]
```

#### ./bin/pos/parser

```
parseArger parsing string for arguments:
	arg-name: positional argument name
	description: positional argument description
	--repeat-min <repeat-min>: minimum repeatition forces --repeat [default: ' 1 ']
	--repeat-max <repeat-max>: maximum repeatition forces --repeat
	--one-of <one-of>: accepted values, repeatable
	-r|--repeat|--no-repeat: repeatable
	--optional|--no-optional: optional
	--subcommand|--no-subcommand: is a subcommand
Usage :
	./bin/pos/parser <arg-name> <description> [--repeat-min <value>] [--repeat-max <value>] [--one-of <value>] [--[no-]repeat] [--[no-]optional] [--[no-]subcommand]
```

### ./bin/version

#### ./bin/version/declaration

```
create common version stuff:
	vernum: your version number
	--option <option>: version trigger option [default: ' version ']
	--short-option <short-option>: version trigger short option [default: ' v ']
Usage :
	./bin/version/declaration <vernum> [--option <value>] [--short-option <value>]
```

#### ./bin/version/parser

```
create version parser:
	vernum: your version number
	--option <option>: version trigger option [default: ' version ']
	--short-option <short-option>: version trigger short option [default: ' v ']
Usage :
	./bin/version/parser <vernum> [--option <value>] [--short-option <value>]
```


