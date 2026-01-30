# parsearger-js

Run [parseArger](https://github.com/DimitriGilbert/parseArger) commands in JavaScript/browser environments using [just-bash](https://github.com/vercel-labs/just-bash).

## Installation

```bash
bun add parsearger-js just-bash
# or
npm install parsearger-js just-bash
```

> **Important**: `just-bash` is a peer dependency and must be installed alongside this package.

## Usage

### Basic Usage

```typescript
import { ParseArger } from "parsearger-js";

const pa = new ParseArger();

// Generate a bash script with argument parsing
const result = await pa.generate({
  pos: [{ name: "input", description: "Input file to process" }],
  opt: [{ name: "output", description: "Output file", short: "o" }],
  flag: [{ name: "verbose", description: "Enable verbose output", short: "v" }],
  helpMessage: "Process files with style",
  setVersion: "1.0.0",
});

console.log(result.stdout); // Generated bash script
console.log(result.exitCode); // 0 on success
```

### Raw Command Execution

```typescript
const pa = new ParseArger();

// Execute any parseArger command directly
const result = await pa.exec(
  'generate --pos "file \\"input file\\"" --flag "debug \\"enable debug\\""',
);
console.log(result.stdout);
```

### Browser Usage

```typescript
// Import from browser entry point
import { ParseArger } from "parsearger-js/browser";

const pa = new ParseArger();
const result = await pa.generate({
  pos: [{ name: "name", description: "Your name" }],
});
```

### Parse an Existing Script

Add new arguments to an existing parseArger script:

```typescript
const pa = new ParseArger();

const existingScript = `#!/bin/bash
# @parseArger-begin
# @parseArger-help "My script"
# ... existing parseArger content
`;

const result = await pa.parse(existingScript, {
  opt: [{ name: "config", description: "Config file", short: "c" }],
  inplace: false,
});
```

### Generate Documentation

```typescript
const pa = new ParseArger();

const script = `#!/bin/bash
# @parseArger-begin
# ...parseArger script content
`;

const docs = await pa.document(script, {
  title: "My Tool Documentation",
  titleTag: "##",
});
console.log(docs.stdout); // Markdown documentation
```

### Generate HTML Form

```typescript
const pa = new ParseArger();

const form = await pa.htmlForm(scriptContent, {
  title: "Script Configuration",
});
console.log(form.stdout); // HTML form
```

## API Reference

### `new ParseArger(options?)`

Create a new ParseArger instance.

- `options.files` - Additional files to include in the virtual filesystem
- `options.cwd` - Working directory (default: `/home/user`)

### `pa.generate(options)`

Generate a new parseArger script.

**Options:**

- `pos` - Positional arguments
- `opt` - Optional arguments
- `flag` - Flag arguments
- `helpMessage` - Help message
- `setVersion` - Version string
- `bang` - Include shebang (default: true)
- `useVerbose` - Include verbose handling (default: true)
- ... and more (see types)

### `pa.parse(scriptContent, options)`

Parse an existing script and add arguments.

### `pa.document(scriptContent, options)`

Generate markdown documentation for a script.

### `pa.htmlForm(scriptContent, options)`

Generate an HTML form for a script.

### `pa.exec(command)`

Execute a raw parseArger command.

### `pa.getBash()`

Get the underlying just-bash instance for advanced usage.

### `pa.writeFile(path, content)`

Write a file to the virtual filesystem.

### `pa.readFile(path)`

Read a file from the virtual filesystem.

## Types

```typescript
interface PositionalArg {
  name: string;
  description: string;
  optional?: boolean;
  repeat?: boolean;
  oneOf?: string[];
  subcommand?: boolean;
  subcommandDirectory?: string;
}

interface OptionalArg {
  name: string;
  description: string;
  short?: string;
  defaultValue?: string;
  repeat?: boolean;
  oneOf?: string[];
  alias?: string[];
  empty?: boolean;
}

interface FlagArg {
  name: string;
  description: string;
  short?: string;
  on?: boolean;
  noName?: string;
  alias?: string[];
}

interface ParseArgerResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}
```

## Use Cases

- **Teaching Sandbox**: Create interactive bash scripting tutorials
- **AI Agents**: Generate bash scripts programmatically
- **Web Tools**: Build online parseArger script generators
- **Testing**: Test parseArger behavior in isolation

## Development

```bash
# Install dependencies
bun install

# Embed parseArger scripts
bun run embed-scripts

# Build
bun run build

# Run tests
bun test

# Type check
bun run typecheck
```

## License

MIT
