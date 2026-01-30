/**
 * Build script to embed all parseArger bash scripts into a TypeScript file.
 *
 * Run with: bun run scripts/embed-scripts.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";

const PARSEARGER_ROOT = path.resolve(import.meta.dirname, "../../..");
const OUTPUT_FILE = path.resolve(import.meta.dirname, "../src/files/index.ts");

// Directories to skip
const SKIP_DIRS = new Set([
  ".git",
  ".github",
  ".claude",
  "node_modules",
  "coverage",
  "dist",
  "docs",
  "packages",
  "tests",
  "example",
  "prompts",
  "skills",
  "templates",
]);

// File extensions to skip
const SKIP_EXTENSIONS = new Set([
  ".md",
  ".html",
  ".yaml",
  ".yml",
  ".json",
  ".txt",
  ".simplecov",
]);

function shouldSkipFile(filename: string): boolean {
  // Skip hidden files
  if (filename.startsWith(".")) return true;

  // Skip by extension
  const ext = path.extname(filename).toLowerCase();
  if (SKIP_EXTENSIONS.has(ext)) return true;

  // Skip specific files
  const skipFiles = new Set(["makefile", "license", "completely.bash"]);
  if (skipFiles.has(filename.toLowerCase())) return true;

  return false;
}

/**
 * Transform bash script content to be compatible with just-bash.
 *
 * just-bash doesn't support direct script execution (returns 126 Permission denied).
 * We need to convert patterns like:
 *   "$SCRIPT_ROOT_DIR/path/script" args   ->   source "$SCRIPT_ROOT_DIR/path/script" args
 *   eval "$SCRIPT_ROOT_DIR/path/script args"   ->   eval "source $SCRIPT_ROOT_DIR/path/script args"
 *
 * Also need to handle:
 *   - trap commands (not supported in just-bash)
 *   - command -v checks
 *   - subcommand array execution
 *   - BASH_SOURCE[0] returns empty in just-bash (fixed by hardcoding paths)
 *
 * @param content - The script content
 * @param virtualPath - The virtual path where this script will live (e.g. /parseArger/bin/generate)
 */
function transformScript(content: string, virtualPath: string): string {
  let transformed = content;

  // Get the directory of this script for BASH_SOURCE fixes
  const scriptDir = path.dirname(virtualPath);

  // Pattern 0: Fix BASH_SOURCE[0] - it returns empty in just-bash
  // Replace patterns like: dirname "${BASH_SOURCE[0]}" with the known directory
  // Common pattern: SCRIPT_ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd -P);
  transformed = transformed.replace(
    /\$\(cd\s+"\$\(dirname\s+"\$\{BASH_SOURCE\[0\]\}"\)";\s*pwd\s+-P\)/g,
    `"${scriptDir}"`,
  );

  // Also fix _SCRIPT_DIR assignment pattern
  // _SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)";
  transformed = transformed.replace(
    /\$\(cd\s+"\$\(dirname\s+"\$\{BASH_SOURCE\[0\]\}"\)"\s+&&\s+pwd\s+-P\)/g,
    `"${scriptDir}"`,
  );

  // Pattern 0.5: Fix multi-line SCRIPT_ROOT_DIR assignment (found in bin/generate)
  // SCRIPT_ROOT_DIR=$(
  //   cd "$(dirname "${BASH_SOURCE[0]}")"
  //   pwd -P
  // );
  transformed = transformed.replace(
    /\$\(\s*cd\s+"\$\(dirname\s+"\$\{BASH_SOURCE\[0\]\}"\)"\s+pwd\s+-P\s*\)/g,
    `"${scriptDir}"`,
  );

  // Pattern 1: Direct execution with quotes at line start or after semicolon/then/do
  // "$SCRIPT_ROOT_DIR/..." -> source "$SCRIPT_ROOT_DIR/..."
  // Match: start of line (with optional whitespace), then "$SCRIPT_ROOT_DIR/ or "$_SCRIPT_DIR/
  transformed = transformed.replace(
    /^(\s*)"(\$SCRIPT_ROOT_DIR\/[^"]+)"\s+/gm,
    '$1source "$2" ',
  );

  // Pattern 2: Same but for $_SCRIPT_DIR
  transformed = transformed.replace(
    /^(\s*)"(\$_SCRIPT_DIR\/[^"]+)"\s+/gm,
    '$1source "$2" ',
  );

  // Pattern 3: eval "$SCRIPT_ROOT_DIR/..." -> eval "source $SCRIPT_ROOT_DIR/..."
  transformed = transformed.replace(
    /eval\s+"(\$SCRIPT_ROOT_DIR\/)/g,
    'eval "source $SCRIPT_ROOT_DIR/',
  );
  transformed = transformed.replace(
    /eval\s+"(\$_SCRIPT_DIR\/)/g,
    'eval "source $_SCRIPT_DIR/',
  );

  // Pattern 4: hasSubCmd=$(eval "$SCRIPT_ROOT_DIR/...") - command substitution with eval
  transformed = transformed.replace(
    /\$\(eval\s+"(\$SCRIPT_ROOT_DIR\/)/g,
    '$(eval "source $SCRIPT_ROOT_DIR/',
  );
  transformed = transformed.replace(
    /\$\(eval\s+"(\$_SCRIPT_DIR\/)/g,
    '$(eval "source $_SCRIPT_DIR/',
  );

  // Pattern 5: Command substitution without eval: $("$SCRIPT_ROOT_DIR/...")
  transformed = transformed.replace(
    /\$\("(\$SCRIPT_ROOT_DIR\/[^"]+)"/g,
    '$(source "$SCRIPT_ROOT_DIR/',
  );

  // Pattern 6: Subcommand execution "$(<array>[@])"
  // just-bash 'source' has a bug where it drops arguments > 9.
  // We workaround this by setting positional params (which works for > 9 args)
  // and then sourcing the script without arguments (inheriting params).
  // Replaces: cmdOutStr=$("${__subcommand[@]}")
  // With: cmdOutStr=$(set -- "${__subcommand[@]:1}"; source "${__subcommand[0]}")
  transformed = transformed.replace(
    /\$\("\$\{__subcommand\[@\]\}"\)/g,
    '$(set -- "${__subcommand[@]:1}"; source "${__subcommand[0]}")',
  );

  // Pattern 7: Comment out trap commands (not supported in just-bash)
  // But keep exit traps which are sometimes important
  transformed = transformed.replace(
    /^(\s*)trap\s+on_interrupt\s+INT;?\s*$/gm,
    "$1# trap on_interrupt INT; # Disabled for just-bash compatibility",
  );

  // Pattern 8: Handle "command -v" checks that reference script paths
  // These are used to check if a subcommand exists - in just-bash, command -v fails for scripts
  // We replace the whole condition with just the file existence check
  // Pattern: [ -f "path" ] && command -v "path" > /dev/null 2>&1
  // Replace: [ -f "path" ]
  transformed = transformed.replace(
    /\[ -f "([^"]+)" \] && command -v "\1" > \/dev\/null 2>&1/g,
    '[ -f "$1" ]',
  );
  // Also handle the similar pattern with $1, bin/${1}, etc.
  transformed = transformed.replace(
    /\[ -f "bin\/\$\{1\}" \] && command -v "bin\/\$\{1\}" > \/dev\/null 2>&1/g,
    '[ -f "bin/${1}" ]',
  );
  transformed = transformed.replace(
    /\[ -f "\$_SCRIPT_DIR\/bin\/\$\{1\}" \] && command -v "\$_SCRIPT_DIR\/bin\/\$\{1\}" > \/dev\/null 2>&1/g,
    '[ -f "$_SCRIPT_DIR/bin/${1}" ]',
  );

  return transformed;
}

function collectBashFiles(
  dir: string,
  prefix: string = "",
): Record<string, string> {
  const files: Record<string, string> = {};

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    console.warn(`Could not read directory: ${dir}`);
    return files;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const virtualPath = `/parseArger${prefix}/${entry.name}`;

    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name) && !entry.name.startsWith(".")) {
        Object.assign(
          files,
          collectBashFiles(fullPath, `${prefix}/${entry.name}`),
        );
      }
    } else if (entry.isFile()) {
      if (!shouldSkipFile(entry.name)) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          // Transform the script for just-bash compatibility
          files[virtualPath] = transformScript(content, virtualPath);
        } catch (err) {
          console.warn(`Could not read file: ${fullPath}`);
        }
      }
    }
  }

  return files;
}

console.log(`Collecting bash files from: ${PARSEARGER_ROOT}`);

// Collect files from bin directory
const binFiles = collectBashFiles(path.join(PARSEARGER_ROOT, "bin"), "/bin");

// Collect files from lib directory
const libFiles = collectBashFiles(path.join(PARSEARGER_ROOT, "lib"), "/lib");

// Collect files from utils directory
const utilsFiles = collectBashFiles(
  path.join(PARSEARGER_ROOT, "utils"),
  "/utils",
);

// Get main parseArger script and transform it
const mainScript = transformScript(
  fs.readFileSync(path.join(PARSEARGER_ROOT, "parseArger"), "utf-8"),
  "/parseArger/parseArger",
);

// Combine all files
const files: Record<string, string> = {
  "/parseArger/parseArger": mainScript,
  ...binFiles,
  ...libFiles,
  ...utilsFiles,
};

// Generate TypeScript file
const output = `// Auto-generated by embed-scripts.ts - do not edit manually
// Generated at: ${new Date().toISOString()}
// Total files: ${Object.keys(files).length}

/**
 * Embedded parseArger bash scripts as a virtual filesystem map.
 * Keys are virtual paths, values are file contents.
 */
export const parseArgerFiles: Record<string, string> = ${JSON.stringify(files, null, 2)};
`;

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

// Write the file
fs.writeFileSync(OUTPUT_FILE, output, "utf-8");

console.log(`✓ Generated ${OUTPUT_FILE}`);
console.log(`  - ${Object.keys(files).length} files embedded`);
console.log(`  - Total size: ${(output.length / 1024).toFixed(1)} KB`);

// List some of the included files
console.log("\nIncluded paths:");
const paths = Object.keys(files).sort();
for (const p of paths.slice(0, 10)) {
  console.log(`  ${p}`);
}
if (paths.length > 10) {
  console.log(`  ... and ${paths.length - 10} more`);
}
