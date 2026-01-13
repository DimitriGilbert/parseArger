---
name: parsearger-core
description: Core functionality for parseArger. Use this skill to GENERATE new bash argument parsers or PARSE/MODIFY existing ones. Handles definition of positional arguments, flags, and options.
license: MIT
compatibility: Requires parseArger executable in the working directory or PATH.
---

# ParseArger Core Skills

This skill handles the core generation and parsing logic of the `parseArger` framework.

## Usage

Run the `parseArger` executable (often located at `./parseArger` in the project root).

### 1. Generate a New Parser (`generate`)

Use `generate` to create the initial bash script code for argument parsing.

```bash
./parseArger generate [OPTIONS]
```

#### Core Definitions
Define arguments using specific flags. The value is a **quoted string** containing the name, description, and specific settings for that argument.

**Positional Arguments (`--pos`)**
Syntax: `--pos 'NAME "DESCRIPTION" [SETTINGS]'`

Settings:
- `--optional`: Make the argument optional.
- `--repeat`: Allow multiple values (creates an array `_arg_name`).
- `--repeat-min N`: Min repetitions (implies --repeat).
- `--repeat-max N`: Max repetitions.
- `--one-of "VAL"`: Restrict to specific values (repeatable).
- `--complete "FUNC"`: Bash built-in completion (e.g., `file`, `directory`).
- `--complete-custom "CMD"`: Custom dynamic completion command.
- `--match "REGEX"`: Validate input against a regex pattern (e.g. `^[0-9]+$`).
- `--subcommand`: Mark as a subcommand (see Subcommands below).

**Options (`--opt`)**
Syntax: `--opt 'NAME "DESCRIPTION" [SETTINGS]'`

Settings:
- `--short "C"`: Short flag character (e.g., `o`).
- `--default-value "VAL"`: Default value if not provided.
- `--repeat`: Allow multiple occurrences.
- `--alias "NAME"`: Alternative long name.
- `--empty`: Allow usage without value (acts like flag).
- `--empty-value "VAL"`: Value to set if used without value (requires `--empty`).
- `--env "VAR"`: Fallback to environment variable if option not provided.
- `--required`: Mark option as mandatory (script fails if missing).
- `--match "REGEX"`: Validate input against a regex pattern (e.g. `^[0-9]+$`).

**Flags (`--flag`)**
Syntax: `--flag 'NAME "DESCRIPTION" [SETTINGS]'`

Settings:
- `--short "C"`: Short flag character (e.g., `f`).
- `--on`: Flag is on by default (passing it turns it off).
- `--alias "NAME"`: Alias.
- `--no-name "NAME"`: Custom name for negation (e.g., `--dont-do-it`).

**Nested Options (`--nested`)**
Syntax: `--nested 'NAME "DESCRIPTION" [SETTINGS]'`
Creates an associative array for namespaced options (e.g., `--config-db value`).
Settings:
- `--one-of "KEY"`: Restrict accepted keys.
- `--complete "FUNC"`, `--complete-custom "CMD"`.

#### Global Settings
- `--help-message "MSG"`: Main help text.
- `--help-option "OPT"`: Custom help flag (default `help`).
- `--version-opt`: Enable `--version`.
- `--set-version "VER"`: Set version number.
- `--leftovers`: Enable collecting extra arguments (into `_arg_leftovers`).
- `--verbose-level N`: Default verbose level (default 0).
- `--die-fn-name "NAME"`: Rename internal die function.
- `--log-fn-name "NAME"`: Rename internal log function.

#### Example

```bash
./parseArger generate \
  --pos 'filename "Input file" --complete file' \
  --opt 'output "Output file" --short o --default-value "out.txt"' \
  --flag 'force "Overwrite existing" --short f' \
  --nested 'config "Configuration namespace"' \
  --leftovers
```

**Using Generated Variables:**
```bash
# Variables follow pattern $_arg_<name> (hyphens -> underscores)
echo "File: $_arg_filename"
echo "Output: $_arg_output"
if [ "$_arg_force" == "on" ]; then echo "Forcing..."; fi

# Nested options are associative arrays
# CLI: --config-db sqlite
echo "DB: ${_arg_config[db]}"
```

---

### 2. Parse/Modify Existing File (`parse`)

Use `parse` to update an existing script that was created with `parseArger`. It reads the special `# @parseArger` comments.

```bash
./parseArger parse FILE [OPTIONS]
```

**Common Options:**
- `-i` or `--inplace`: Modify the file directly (RECOMMENDED).
- `--pos`, `--opt`, `--flag`: Add *new* arguments to the existing ones.
- `--set-version "VER"`: Update the version.

#### Example

```bash
# Add a new verbose flag to an existing script
./parseArger parse my-script.sh --inplace \
  --flag 'verbose "Enable verbose logging" --short v'
```

### 3. Subcommands

To create a subcommand structure:
1. Define a positional argument with `--subcommand`.
2. Use `--subcommand-directory "DIR"` to point to a directory of scripts.
3. `parseArger` will treat files in that directory as subcommands.

Example:
```bash
./parseArger generate \
  --pos 'action "What to do" --subcommand --subcommand-directory ./bin'
```

Specific Subcommand Settings:
- `--subcommand-directory "DIR"`: Auto-populate valid values from scripts in DIR.
- `--subcommand-run`: Immediately execute the subcommand script found.
- `--subcommand-use-leftovers`: Pass any leftover arguments to the subcommand.
- `--subcommand-variable "VAR"`: Store subcommand parts in a specific variable (default `__subcommand`).
