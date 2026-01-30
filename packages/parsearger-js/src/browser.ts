/**
 * Browser-compatible entry point for parsearger-js.
 *
 * Uses just-bash browser bundle for in-browser execution.
 *
 * @example
 * ```typescript
 * import { ParseArger } from 'parsearger-js/browser';
 *
 * const pa = new ParseArger();
 * const result = await pa.generate({
 *   pos: [{ name: 'file', description: 'Input file' }],
 * });
 * ```
 */
export { ParseArger, type ParseArgerOptions } from "./parseArger";
export type {
  ParseArgerResult,
  GenerateOptions,
  ParseOptions,
  DocumentOptions,
  HtmlFormOptions,
  PositionalArg,
  OptionalArg,
  FlagArg,
} from "./types";
