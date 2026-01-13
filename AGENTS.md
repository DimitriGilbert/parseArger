# AGENTS.md

## Project Overview
`parseArger` is a standalone Bash argument parsing framework. It is self-hosted: the `parseArger` script itself uses the framework to parse its own arguments.

## Build & Generation
The project uses scripts in `bin/` for build tasks.

- **Regenerate Parser:** `bin/generate`
  - **CRITICAL:** The argument parsing logic in `parseArger` and scripts in `bin/` is **GENERATED**.
  - **DO NOT** manually edit code between `# @parseArger-parsing` and `# @parseArger-parsing-end`.
  - To change arguments:
    1. Edit the `# @parseArger` declarations at the top of the file.
    2. Run `bin/generate`.
- **Documentation:** `bin/document`
- **Completion:** `bin/completely` (generates shell completions)
- **Full Build:** `bin/generate && bin/document && bin/completely`

## Testing
Tests are located in `tests/` and end with `.test.sh`. They use a vendored `bashunit` library.

### Run a Single Test
Execute the test script directly from the project root:
```bash
./tests/005_parse.test.sh
```

### Run All Tests
Execute all scripts in the `tests/` directory:
```bash
for t in tests/*.test.sh; do
  echo "Running $t..."
  "$t" || exit 1
done
```

## Code Style & Conventions

### Formatting
- **Language:** Bash
- **Indentation:** **Tabs** (Use tabs for indentation, not spaces).
- **Line Endings:** Unix (`\n`).

### Naming
- **Variables:** `snake_case` (e.g., `my_variable`, `file_path`).
  - Internal/Generated variables often start with `_` (e.g., `_arg_target`).
- **Functions:** `snake_case` (e.g., `parse_commandline`, `print_help`).

### Coding Practices
- **Variables:**
  - **Always** use `local` for variables declared inside functions.
  - **Always** quote variable expansions to prevent word splitting (e.g., `"$var"` instead of `$var`).
- **Error Handling:**
  - Use the `die` function to exit with an error.
  - Usage: `die "Error message" [exit_code]` (default exit code is 1).
- **Imports:**
  - Use `source` to import libraries.
  - Resolve paths relative to the script location or `PARSEARGER_ROOT_DIR`.
  - Example: `source "$SCRIPT_ROOT_DIR/utils"`

### Project Structure
- `parseArger`: Main executable entry point.
- `bin/`: Subcommands (e.g., `bin/parse`, `bin/generate`).
  - Each file here corresponds to a subcommand (e.g., `parseArger parse`).
- `lib/`: Helper libraries (e.g., `bashunit`).
- `tests/`: Test scripts (`*.test.sh`).
- `utils/`: Utility scripts included by subcommands.

## Workflow Rules
1. **Check for Generated Code:** Before editing a file, check for `# @parseArger` annotations. If they exist, ensure you are editing the declarations and regenerating, rather than editing the parsing logic directly.
2. **Paths:** Always use absolute paths in tool calls, but write code that uses relative paths or dynamic path resolution (like `$(dirname ...)`).
