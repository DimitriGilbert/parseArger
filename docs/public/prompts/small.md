# ParseArger - Small Prompt

ParseArger generates standalone bash scripts with argument parsing, documentation, and completion.

## Installation

```bash
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O
chmod +x get_parseArger
./get_parseArger --install
source ~/.bashrc
```

## Core Commands

### generate - Create scripts

```bash
parseArger generate \
  --pos 'arg-name "argument description"' \
  --opt 'opt-name "option description"' \
  --flag 'flag-name "flag description"' \
  --output /path/to/script.sh
```

### parse - Update scripts

```bash
parseArger parse /path/to/script.sh -i \
  --pos 'new-arg "add argument"' \
  --opt 'new-opt "add option"'
```

### project - Create complete project

```bash
parseArger project my-project \
  --description "My cool project" \
  --git-repo "user/repo" \
  --project-subcommand command1 \
  --project-subcommand command2
```

Creates main script, bin/ directory, documentation, completion, installer.

### document - Generate documentation

```bash
parseArger document --file script.sh --out docs.md
parseArger document --directory ./bin --out all-docs.md
```

### completely - Generate bash completion

```bash
parseArger completely cmd-name ./script.sh --subcmd-dir ./bin
```

## Argument Types

### Positional Arguments (--pos)

```bash
--pos 'name "description" [options]'
```

Options: `--repeat`, `--optional`, `--one-of value`, `--subcommand`, `--subcommand-run`

### Options (--opt)

```bash
--opt 'name "description" [options]'
```

Options: `--short c`, `--alias name`, `--default-value val`, `--repeat`, `--empty`

### Flags (--flag)

```bash
--flag 'name "description" [options]'
```

Options: `--short c`, `--alias name`, `--no-name name`, `--on`

### Nested Options (--nested)

```bash
--nested 'namespace "description"'
# Usage: ./script --namespace-key value
# Access: ${_arg_namespace[key]}
```

## Variable Access

```bash
# --pos 'my-arg' → $_arg_my_arg
# --opt 'my-opt' → $_arg_my_opt
# --flag 'my-flag' → $_arg_my_flag ("on" or "off")
# --repeat creates arrays: $_arg_my_opt[0], ${#_arg_my_opt[@]}
```

## Common Options

- `--output file`: write to file
- `--leftovers|--no-leftovers`: capture extra args
- `--set-version ver`: set version
- `--help-message "msg"`: custom help text

## Workflow

1. Generate script: `parseArger generate --output script ...`
2. Add your code (preserved during updates)
3. Update parsing: `parseArger parse script -i --pos 'new'`
4. Generate docs: `parseArger document --file script --out docs.md`
