export interface ParseArgerResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export interface PositionalArg {
  /** Argument name (will be converted to variable name) */
  name: string;
  /** Description shown in help */
  description: string;
  /** Make this argument optional */
  optional?: boolean;
  /** Allow multiple values */
  repeat?: boolean;
  /** Minimum repetitions (forces repeat) */
  repeatMin?: number;
  /** Maximum repetitions (forces repeat) */
  repeatMax?: number;
  /** Restrict to specific values */
  oneOf?: string[];
  /** Is this a subcommand dispatcher */
  subcommand?: boolean;
  /** Directory containing subcommand scripts */
  subcommandDirectory?: string;
}

export interface OptionalArg {
  /** Option name (--name) */
  name: string;
  /** Description shown in help */
  description: string;
  /** Short option (-n) */
  short?: string;
  /** Default value */
  defaultValue?: string;
  /** Allow multiple values */
  repeat?: boolean;
  /** Minimum repetitions */
  repeatMin?: number;
  /** Maximum repetitions */
  repeatMax?: number;
  /** Restrict to specific values */
  oneOf?: string[];
  /** Option aliases */
  alias?: string[];
  /** Value when option is used without argument */
  emptyValue?: string;
  /** Use option as flag (no value required) */
  empty?: boolean;
}

export interface FlagArg {
  /** Flag name (--name/--no-name) */
  name: string;
  /** Description shown in help */
  description: string;
  /** Short option (-n) */
  short?: string;
  /** Default state: on or off */
  on?: boolean;
  /** Custom negation name */
  noName?: string;
  /** Flag aliases */
  alias?: string[];
  /** Negation aliases */
  noAlias?: string[];
}

export interface GenerateOptions {
  /** Positional arguments */
  pos?: PositionalArg[];
  /** Optional arguments */
  opt?: OptionalArg[];
  /** Flag arguments */
  flag?: FlagArg[];
  /** Variable declarations */
  set?: string[];
  /** Files to source */
  source?: string[];
  /** Help message for the command */
  helpMessage?: string;
  /** Help option name */
  helpOption?: string;
  /** Short help option */
  helpShortOption?: string;
  /** Extra arguments variable name */
  leftoversName?: string;
  /** Accept extra arguments */
  leftovers?: boolean;
  /** Shebang executable */
  useShebang?: string;
  /** Include shebang */
  bang?: boolean;
  /** Version number */
  setVersion?: string;
  /** Version option name */
  versionOptName?: string;
  /** Short version option */
  versionShortOption?: string;
  /** Generate version option handling */
  versionOpt?: boolean;
  /** Die function name */
  dieFnName?: string;
  /** Log function name */
  logFnName?: string;
  /** Verbose option name */
  verboseOptName?: string;
  /** Default verbose level */
  verboseLevel?: string;
  /** Generate verbose level parser */
  useVerbose?: boolean;
  /** Script dependencies */
  dependencies?: string[];
}

export interface ParseOptions {
  /** Add positional arguments */
  pos?: PositionalArg[];
  /** Add optional arguments */
  opt?: OptionalArg[];
  /** Add flag arguments */
  flag?: FlagArg[];
  /** Add variable declarations */
  set?: string[];
  /** Add files to source */
  source?: string[];
  /** Update version */
  setVersion?: string;
  /** Add dependencies */
  dependencies?: string[];
  /** Replace content in place */
  inplace?: boolean;
}

export interface DocumentOptions {
  /** Files to document */
  file?: string[];
  /** Directories to document */
  directory?: string[];
  /** Output file */
  out?: string;
  /** Markdown tag for title */
  tag?: string;
  /** Prepend to next title tag level */
  nextTagPrepend?: string;
  /** Documentation title */
  title?: string;
  /** Documentation title tag */
  titleTag?: string;
  /** Document subdirectories */
  subDirectory?: boolean;
  /** Append to output file */
  appendOutput?: boolean;
}

export interface HtmlFormOptions {
  /** Files to generate forms for */
  file?: string[];
  /** Directories to process */
  directory?: string[];
  /** Output file */
  out?: string;
  /** Form title */
  title?: string;
}
