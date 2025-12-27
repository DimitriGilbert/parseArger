# ParseArger - Quick Reference

ParseArger generates bash scripts with argument parsing.

## Install

```bash
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O
chmod +x get_parseArger
./get_parseArger --install
source ~/.bashrc
```

## Basic Usage

```bash
# Generate script with argument, option, flag
parseArger generate \
  --pos 'my-arg "description"' \
  --opt 'my-opt "description"' \
  --flag 'my-flag "description"' \
  --output script.sh

# Update existing script
parseArger parse script.sh -i --pos 'new-arg "desc"'

# Generate project
parseArger project my-app --project-subcommand cmd1 --project-subcommand cmd2

# Generate documentation
parseArger document --file script.sh --out docs.md

# Generate completion
parseArger completely my-app ./my-app --subcmd-dir ./bin
```

## Argument Types

- `--pos 'name "desc"'`: positional argument
- `--opt 'name "desc"'`: option (use --short c for short form)
- `--flag 'name "desc"'`: boolean flag
- `--nested 'ns "desc"'`: namespace for `--ns-key value`

## Variables

Access with `$_arg_name` (hyphens → underscores)
- Arrays: `$_arg_name[0]`, `${#_arg_name[@]}`

## Common Modifiers

- `--repeat`: repeatable (creates array)
- `--optional`: not required
- `--one-of val`: restrict values
- `--default-value val`: default for options
- `--on`: flag is on by default
