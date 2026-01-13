# ParseArger - Medium Prompt

ParseArger is a bash tool that generates standalone bash scripts with argument parsing, help generation, documentation, bash completion, HTML forms, and project scaffolding.

## Installation

```bash
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O
chmod +x get_parseArger
./get_parseArger --install
source ~/.bashrc
```

## Core Commands

### generate - Create bash scripts

```bash
# Output to stdout by default
parseArger generate --pos 'arg "desc"' --opt 'opt "desc"' --flag 'flag "desc"'

# Output to file
parseArger generate \
  --pos 'my-arg "argument description"' \
  --opt 'my-opt "option description" --short m' \
  --flag 'my-flag "flag description"' \
  --output /path/to/script.sh
```

### parse - Modify existing scripts

```bash
# Update in place
parseArger parse /path/to/script.sh -i \
  --pos 'new-arg "new argument"' \
  --opt 'new-opt "new option"'

# Without -i outputs to stdout
parseArger parse /path/to/script.sh --opt 'another-opt "desc"'
```

Custom code added below generated section is preserved during updates.

### project - Generate complete project structure

```bash
parseArger project my-app \
  --description "My application" \
  --git-repo "user/my-app" \
  --project-subcommand build \
  --project-subcommand deploy \
  --project-subcommand test
```

Creates:
```
my-app/
├── my-app           # Main entry point
├── my-app.rc        # RC file for shell
├── completely.bash  # Bash completion
├── completely.yaml  # Completion definition
├── documentation.md # Generated docs
├── form.html        # HTML form
├── Makefile         # Build tasks
├── readme.md        # README
├── bin/             # Subcommands
│   ├── build
│   ├── deploy
│   └── test
└── utils/
    ├── get_my-app   # Installer
    ├── install
    └── webserver    # Bash web server
```

### document - Generate documentation

```bash
# Single file
parseArger document --file script.sh --out docs.md

# Multiple files and directories
parseArger document \
  --file main.sh \
  --directory ./bin \
  --out documentation.md
```

### completely - Generate bash completion

Requires Completely (ruby gem or docker).

```bash
# Basic
parseArger completely my-app ./my-app

# With subcommands
parseArger completely my-app ./my-app --subcmd-dir ./bin

# Workaround if completely fails
parseArger completely my-app ./my-app --no-run-completely > completely.yaml
completely preview > completely.bash
```

### html-form - Generate HTML form

```bash
parseArger html-form script.sh > form.html
```

## Argument Types

### Positional Arguments (--pos)

```bash
--pos 'name "description" [options]'
```

Options:
- `--repeat`: repeatable (creates array)
- `--repeat-min N`: minimum occurrences
- `--repeat-max N`: maximum occurrences
- `--optional`: not required
- `--one-of value`: restrict to accepted values (repeatable)
- `--complete func`: bash completion function
- `--complete-custom "cmd"`: custom completion
- `--match "regex"`: validate input against regex pattern
- `--subcommand`: is a subcommand
- `--subcommand-run`: execute subcommand
- `--subcommand-use-leftovers`: pass extra args to subcommand
- `--subcommand-directory dir`: auto-discover subcommands
- `--subcommand-variable var`: custom variable (default: __subcommand)

### Options (--opt)

```bash
--opt 'name "description" [options]'
```

Options:
- `--short c`: single letter alias
- `--alias name`: additional alias (repeatable)
- `--default-value val`: default value
- `--repeat`: repeatable (creates array)
- `--repeat-min N`: minimum occurrences
- `--repeat-max N`: maximum occurrences
- `--one-of value`: restrict to values (repeatable)
- `--empty`: can be used as flag (option/flag hybrid)
- `--empty-value val`: value when used as flag
- `--complete func`: bash completion
- `--complete-custom "cmd"`: custom completion
- `--env "VAR"`: fallback to environment variable
- `--required`: mandatory option (script fails if missing)
- `--match "regex"`: validate input against regex pattern

### Flags (--flag)

```bash
--flag 'name "description" [options]'
```

Options:
- `--short c`: single letter alias
- `--alias name`: additional alias (repeatable)
- `--no-name name`: negation flag name (default: no-<name>)
- `--no-alias name`: negation alias (repeatable)
- `--on`: on by default

### Nested Options (--nested)

Creates associative array for namespaced options.

```bash
parseArger generate --nested 'config "configuration options"'
# Usage: ./script --config-key value --config-db sqlite
# Access: echo ${_arg_config[key]}  # "value"
#        echo ${_arg_config[db]}    # "sqlite"
```

Options:
- `--one-of value`: restrict keys (repeatable)
- `--complete func`: bash completion
- `--complete-custom "cmd"`: custom completion

## Variable Access

Generated variables follow pattern `$_arg_<name>` (hyphens become underscores).

```bash
# --pos 'my-arg "desc"' → $_arg_my_arg
# --opt 'my-opt "desc"' → $_arg_my_opt
# --flag 'my-flag "desc"' → $_arg_my_flag (contains "on" or "off")
# --nested 'ns "desc"' → ${_arg_ns[key]} (associative array)

# Repeatable options create arrays
echo $_arg_my_option[0]
echo ${#_arg_my_option[@]}  # count
for val in "${_arg_my_option[@]}"; do
  echo "$val"
done
```

## Common Options (for generate/parse)

- `--output file`: write to file
- `--help-message "msg"`: help text
- `--help-option name`: custom help option
- `--leftovers|--no-leftovers`: capture extra args in `$_arg_leftovers`
- `--parse-leftovers`: parse leftover args for option syntax
- `--set-version ver`: script version
- `--use-shebang "#!/bin/bash"`: custom shebang
- `--set 'var="val"'`: declare variable (repeatable)
- `--source /path/to/file`: source file (repeatable)
- `--no-version-opt`: disable version option
- `--no-use-verbose`: disable verbose levels
- `--no-bang`: disable shebang

## Subcommands

```bash
# Main script with subcommand routing
parseArger generate \
  --pos 'command "subcommand" --subcommand --subcommand-run \
         --subcommand-directory ./bin --subcommand-use-leftovers'

# bin/command will be executed with leftover arguments
```

## Workflow Example

1. **Generate initial script**
   ```bash
   parseArger generate \
     --pos 'input "input file"' \
     --opt 'output "output file" --short o' \
     --flag 'verbose "verbose output"' \
     --output my-tool
   chmod +x my-tool
   ```

2. **Add your code**
   Edit my-tool below the generated section (this code is preserved)

3. **Update parsing when needed**
   ```bash
   parseArger parse my-tool -i --opt 'format "output format"'
   ```

4. **Generate documentation**
   ```bash
   parseArger document --file my-tool --out docs.md
   ```

5. **Generate completion**
   ```bash
   parseArger completely my-tool ./my-tool
   source completely.bash
   ```

## Resources

- GitHub: https://github.com/DimitriGilbert/parseArger
- Documentation: https://dimitrigilbert.github.io/parseArger/
