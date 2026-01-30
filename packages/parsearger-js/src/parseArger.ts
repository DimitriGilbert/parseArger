import { Bash } from "just-bash";
import { parseArgerFiles } from "./files";
import type {
  ParseArgerResult,
  GenerateOptions,
  ParseOptions,
  DocumentOptions,
  HtmlFormOptions,
  PositionalArg,
  OptionalArg,
  FlagArg,
} from "./types";

export interface ParseArgerOptions {
  /** Additional files to include in the virtual filesystem */
  files?: Record<string, string>;
  /** Working directory for script execution */
  cwd?: string;
}

/**
 * ParseArger - Run parseArger commands in JavaScript environments
 *
 * @example
 * ```typescript
 * import { ParseArger } from 'parsearger-js';
 *
 * const pa = new ParseArger();
 * const result = await pa.generate({
 *   pos: [{ name: 'input', description: 'Input file' }],
 *   opt: [{ name: 'output', description: 'Output file', short: 'o' }],
 *   flag: [{ name: 'verbose', description: 'Verbose output', short: 'v' }],
 * });
 * console.log(result.stdout); // Generated bash script
 * ```
 */
export class ParseArger {
  private bash: Bash;

  constructor(options: ParseArgerOptions = {}) {
    this.bash = new Bash({
      files: {
        ...parseArgerFiles,
        ...options.files,
      },
      cwd: options.cwd ?? "/home/user",
      env: {
        PARSEARGER_ROOT_DIR: "/parseArger",
        HOME: "/home/user",
        PATH: "/bin:/usr/bin:/parseArger",
      },
    });
  }

  /**
   * Execute a raw parseArger command
   *
   * @example
   * ```typescript
   * const result = await pa.exec('generate --pos "name \\"description\\""');
   * ```
   */
  async exec(command: string): Promise<ParseArgerResult> {
    // just-bash has issues with many quoted arguments on source lines.
    // Using `eval set --` to properly parse quoted args, then pass via `$@`.
    // The eval ensures that single-quoted strings in `command` are parsed correctly.
    const wrapperScript = `
cd /parseArger
export PARSEARGER_ROOT_DIR=/parseArger
export _SCRIPT_DIR=/parseArger
eval "ARGS=(${command.replace(/\\/g, "\\\\").replace(/"/g, '\\"')})"
source /parseArger/parseArger "\${ARGS[@]}"
`;
    const result = await this.bash.exec(wrapperScript);
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
    };
  }

  /**
   * Generate a new parseArger script
   */
  async generate(options: GenerateOptions = {}): Promise<ParseArgerResult> {
    const args = this.buildGenerateArgs(options);
    return this.exec(`generate ${args}`);
  }

  /**
   * Parse an existing parseArger script and add arguments
   *
   * @param scriptContent - The bash script content to parse
   * @param options - Arguments to add
   */
  async parse(
    scriptContent: string,
    options: ParseOptions = {},
  ): Promise<ParseArgerResult> {
    // Write the script to a temp file in the virtual fs
    const tempPath = "/tmp/script-to-parse.sh";
    await this.bash.exec(`cat > ${tempPath} << 'PARSEARGER_EOF'
${scriptContent}
PARSEARGER_EOF`);

    const args = this.buildParseArgs(options);
    const inplaceFlag = options.inplace ? "--inplace" : "";
    return this.exec(`parse ${tempPath} ${args} ${inplaceFlag}`);
  }

  /**
   * Generate documentation for a script
   */
  async document(
    scriptContent: string,
    options: DocumentOptions = {},
  ): Promise<ParseArgerResult> {
    const tempPath = "/tmp/script-to-document.sh";
    await this.bash.exec(`cat > ${tempPath} << 'PARSEARGER_EOF'
${scriptContent}
PARSEARGER_EOF`);

    const args: string[] = [`--file "${tempPath}"`];

    if (options.tag) args.push(`--tag "${options.tag}"`);
    if (options.nextTagPrepend)
      args.push(`--next-tag-prepend "${options.nextTagPrepend}"`);
    if (options.title) args.push(`--title "${options.title}"`);
    if (options.titleTag) args.push(`--title-tag "${options.titleTag}"`);
    if (options.subDirectory === false) args.push("--no-sub-directory");
    if (options.appendOutput === false) args.push("--no-append-output");

    return this.exec(`document ${args.join(" ")}`);
  }

  /**
   * Generate HTML form for a script
   */
  async htmlForm(
    scriptContent: string,
    options: HtmlFormOptions = {},
  ): Promise<ParseArgerResult> {
    const tempPath = "/tmp/script-for-form.sh";
    await this.bash.exec(`cat > ${tempPath} << 'PARSEARGER_EOF'
${scriptContent}
PARSEARGER_EOF`);
    await this.bash.exec(`chmod +x ${tempPath}`);

    const args: string[] = [`--file "${tempPath}"`];
    if (options.title) args.push(`--title "${options.title}"`);

    return this.exec(`html-form ${args.join(" ")}`);
  }

  /**
   * Get the underlying Bash instance for advanced usage
   */
  getBash(): Bash {
    return this.bash;
  }

  /**
   * Write a file to the virtual filesystem
   */
  async writeFile(path: string, content: string): Promise<void> {
    await this.bash.exec(`cat > "${path}" << 'PARSEARGER_EOF'
${content}
PARSEARGER_EOF`);
  }

  /**
   * Read a file from the virtual filesystem
   */
  async readFile(path: string): Promise<string> {
    const result = await this.bash.exec(`cat "${path}"`);
    if (result.exitCode !== 0) {
      throw new Error(`Failed to read file ${path}: ${result.stderr}`);
    }
    return result.stdout;
  }

  private buildGenerateArgs(options: GenerateOptions): string {
    const args: string[] = [];

    // Positional arguments
    if (options.pos) {
      for (const pos of options.pos) {
        args.push(`--pos '${this.buildPosArg(pos)}'`);
      }
    }

    // Optional arguments
    if (options.opt) {
      for (const opt of options.opt) {
        args.push(`--opt '${this.buildOptArg(opt)}'`);
      }
    }

    // Flag arguments
    if (options.flag) {
      for (const flag of options.flag) {
        args.push(`--flag '${this.buildFlagArg(flag)}'`);
      }
    }

    // Set declarations
    if (options.set) {
      for (const s of options.set) {
        args.push(`--set '${s}'`);
      }
    }

    // Source files
    if (options.source) {
      for (const src of options.source) {
        args.push(`--source '${src}'`);
      }
    }

    // Simple string options
    if (options.helpMessage)
      args.push(`--help-message '${options.helpMessage}'`);
    if (options.helpOption) args.push(`--help-option '${options.helpOption}'`);
    if (options.helpShortOption)
      args.push(`--help-short-option '${options.helpShortOption}'`);
    if (options.leftoversName)
      args.push(`--leftovers-name '${options.leftoversName}'`);
    if (options.useShebang) args.push(`--use-shebang '${options.useShebang}'`);
    if (options.setVersion) args.push(`--set-version '${options.setVersion}'`);
    if (options.versionOptName)
      args.push(`--version-opt-name '${options.versionOptName}'`);
    if (options.versionShortOption)
      args.push(`--version-short-option '${options.versionShortOption}'`);
    if (options.dieFnName) args.push(`--die-fn-name '${options.dieFnName}'`);
    if (options.logFnName) args.push(`--log-fn-name '${options.logFnName}'`);
    if (options.verboseOptName)
      args.push(`--verbose-opt-name '${options.verboseOptName}'`);
    if (options.verboseLevel)
      args.push(`--verbose-level '${options.verboseLevel}'`);

    // Dependencies
    if (options.dependencies) {
      for (const dep of options.dependencies) {
        args.push(`--dependencies '${dep}'`);
      }
    }

    // Boolean flags
    if (options.leftovers === true) args.push("--leftovers");
    if (options.leftovers === false) args.push("--no-leftovers");
    if (options.bang === true) args.push("--bang");
    if (options.bang === false) args.push("--no-bang");
    if (options.versionOpt === true) args.push("--version-opt");
    if (options.versionOpt === false) args.push("--no-version-opt");
    if (options.useVerbose === true) args.push("--use-verbose");
    if (options.useVerbose === false) args.push("--no-use-verbose");

    return args.join(" ");
  }

  private buildParseArgs(options: ParseOptions): string {
    const args: string[] = [];

    if (options.pos) {
      for (const pos of options.pos) {
        args.push(`--pos '${this.buildPosArg(pos)}'`);
      }
    }

    if (options.opt) {
      for (const opt of options.opt) {
        args.push(`--opt '${this.buildOptArg(opt)}'`);
      }
    }

    if (options.flag) {
      for (const flag of options.flag) {
        args.push(`--flag '${this.buildFlagArg(flag)}'`);
      }
    }

    if (options.set) {
      for (const s of options.set) {
        args.push(`--set '${s}'`);
      }
    }

    if (options.source) {
      for (const src of options.source) {
        args.push(`--source '${src}'`);
      }
    }

    if (options.setVersion) args.push(`--set-version '${options.setVersion}'`);

    if (options.dependencies) {
      for (const dep of options.dependencies) {
        args.push(`--dependencies '${dep}'`);
      }
    }

    return args.join(" ");
  }

  private buildPosArg(pos: PositionalArg): string {
    let arg = `${pos.name} "${pos.description}"`;
    if (pos.optional) arg += " --optional";
    if (pos.repeat) arg += " --repeat";
    if (pos.repeatMin !== undefined) arg += ` --repeat-min ${pos.repeatMin}`;
    if (pos.repeatMax !== undefined) arg += ` --repeat-max ${pos.repeatMax}`;
    if (pos.oneOf) {
      for (const val of pos.oneOf) {
        arg += ` --one-of "${val}"`;
      }
    }
    if (pos.subcommand) arg += " --subcommand";
    if (pos.subcommandDirectory)
      arg += ` --subcommand-directory "${pos.subcommandDirectory}"`;
    return arg;
  }

  private buildOptArg(opt: OptionalArg): string {
    let arg = `${opt.name} "${opt.description}"`;
    if (opt.short) arg += ` --short ${opt.short}`;
    if (opt.defaultValue !== undefined)
      arg += ` --default-value "${opt.defaultValue}"`;
    if (opt.repeat) arg += " --repeat";
    if (opt.repeatMin !== undefined) arg += ` --repeat-min ${opt.repeatMin}`;
    if (opt.repeatMax !== undefined) arg += ` --repeat-max ${opt.repeatMax}`;
    if (opt.oneOf) {
      for (const val of opt.oneOf) {
        arg += ` --one-of "${val}"`;
      }
    }
    if (opt.alias) {
      for (const a of opt.alias) {
        arg += ` --alias "${a}"`;
      }
    }
    if (opt.emptyValue !== undefined)
      arg += ` --empty-value "${opt.emptyValue}"`;
    if (opt.empty) arg += " --empty";
    return arg;
  }

  private buildFlagArg(flag: FlagArg): string {
    let arg = `${flag.name} "${flag.description}"`;
    if (flag.short) arg += ` --short ${flag.short}`;
    if (flag.on) arg += " --on";
    if (flag.noName) arg += ` --no-name "${flag.noName}"`;
    if (flag.alias) {
      for (const a of flag.alias) {
        arg += ` --alias "${a}"`;
      }
    }
    if (flag.noAlias) {
      for (const a of flag.noAlias) {
        arg += ` --no-alias "${a}"`;
      }
    }
    return arg;
  }
}
