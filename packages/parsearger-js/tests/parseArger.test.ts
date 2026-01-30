import { describe, test, expect } from "bun:test";
import { ParseArger } from "../src";

describe("ParseArger", () => {
  describe("generate", () => {
    test("generates script with positional argument", async () => {
      const pa = new ParseArger();
      const result = await pa.generate({
        pos: [{ name: "input", description: "Input file to process" }],
        bang: true,
        setVersion: "1.0.0",
      });

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("#!/bin/bash");
      expect(result.stdout).toContain("input");
      expect(result.stdout).toContain("Input file to process");
    });

    test("generates script with optional argument", async () => {
      const pa = new ParseArger();
      const result = await pa.generate({
        opt: [
          { name: "output", description: "Output file", short: "o" },
          {
            name: "format",
            description: "Output format",
            defaultValue: "json",
          },
        ],
      });

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("--output");
      expect(result.stdout).toContain("-o");
      expect(result.stdout).toContain("--format");
      expect(result.stdout).toContain("json");
    });

    test("debugs generate arguments", async () => {
      const pa = new ParseArger({
        files: {
          "/parseArger/bin/generate": `#!/bin/bash
echo "DEBUG ARGS: $#"
for arg in "$@"; do
  echo "ARG: [$arg]"
done
`,
        },
      });

      const result = await pa.generate({
        pos: [{ name: "input", description: "Input file" }],
      });

      // console.log(result.stdout);
      expect(result.stdout).toContain("ARG: [--pos]");
      expect(result.stdout).toContain('ARG: [input "Input file"]');
    });

    test("generates script with flags", async () => {
      const pa = new ParseArger();
      const result = await pa.generate({
        flag: [
          { name: "verbose", description: "Enable verbose output", short: "v" },
          { name: "debug", description: "Enable debug mode", on: true },
        ],
      });

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("--verbose");
      expect(result.stdout).toContain("--no-verbose");
      expect(result.stdout).toContain("--debug");
      expect(result.stdout).toContain("--no-debug");
    });

    test("generates script with help message", async () => {
      const pa = new ParseArger();
      const result = await pa.generate({
        helpMessage: "My awesome CLI tool",
        pos: [{ name: "file", description: "File to process" }],
      });

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("My awesome CLI tool");
    });

    test("generates script with one-of constraints", async () => {
      const pa = new ParseArger();
      const result = await pa.generate({
        opt: [
          {
            name: "format",
            description: "Output format",
            oneOf: ["json", "yaml", "xml"],
          },
        ],
      });

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("json");
      expect(result.stdout).toContain("yaml");
      expect(result.stdout).toContain("xml");
    });
  });

  describe("exec", () => {
    test("executes raw generate command", async () => {
      const pa = new ParseArger();
      const result = await pa.exec(
        "generate --pos 'filename \"The file to process\"'",
      );

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("filename");
      expect(result.stdout).toContain("The file to process");
    });

    test("returns help with --help flag", async () => {
      const pa = new ParseArger();
      const result = await pa.exec("generate --help");

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain("generate");
      expect(result.stdout).toContain("--pos");
      expect(result.stdout).toContain("--opt");
      expect(result.stdout).toContain("--flag");
    });
  });

  describe.skip("document", () => {
    test("generates documentation for script", async () => {
      const pa = new ParseArger();

      // First generate a script
      const script = await pa.generate({
        pos: [{ name: "input", description: "Input file" }],
        opt: [{ name: "output", description: "Output file", short: "o" }],
        helpMessage: "Process files",
      });

      expect(script.exitCode).toBe(0);

      // Then document it
      const docs = await pa.document(script.stdout, {
        title: "My Tool",
        titleTag: "##",
      });

      expect(docs.exitCode).toBe(0);
      // Documentation should contain info about the arguments
      expect(docs.stdout).toContain("input");
    });
  });

  describe("file operations", () => {
    test("can write and read files", async () => {
      const pa = new ParseArger();

      await pa.writeFile("/tmp/test.txt", "Hello, world!");
      const content = await pa.readFile("/tmp/test.txt");

      expect(content).toBe("Hello, world!\n");
    });

    test("throws on reading non-existent file", async () => {
      const pa = new ParseArger();

      await expect(pa.readFile("/tmp/nonexistent.txt")).rejects.toThrow();
    });
  });

  describe("custom files", () => {
    test("accepts additional files in constructor", async () => {
      const pa = new ParseArger({
        files: {
          "/home/user/my-script.sh": "#!/bin/bash\necho hello",
        },
      });

      const content = await pa.readFile("/home/user/my-script.sh");
      expect(content).toContain("echo hello");
    });
  });
});
