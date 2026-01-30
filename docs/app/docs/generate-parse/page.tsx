import { CodeBlock } from "@/components/ui/code-block";
import { SarcasticAside } from "@/components/ui/sarcastic-aside";
import { CommandLine } from "@/components/ui/command-line";
import { SectionHeader } from "@/components/ui/section";

export default function GenerateParsePage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Generate & Parse</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          These are the two commands you'll use the most. One creates chaos
          (scripts), the other organizes it. Here is the{" "}
          <strong>exhaustive</strong> list of options for both.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Generate
        </h2>
        <p className="text-foreground">
          <code>parseArger generate</code> is the main entry point. It creates
          the script.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">
          General Configuration
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--set</strong>: Declare a
            variable at the top of the script. Repeatable.
            <CodeBlock>{`parseArger generate --set 'my_var="value"' --set 'dynamic="\$(cat file)"'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--source</strong>: Source a file
            at the top of the script. Repeatable.
            <CodeBlock>{`parseArger generate --source "/path/to/lib.sh"`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--help-message</strong>: The
            description shown in the generated help.
          </li>
          <li>
            <strong className="text-foreground">--help-option</strong>: Custom
            long flag to trigger help (default: <code>--help</code>).
          </li>
          <li>
            <strong className="text-foreground">--help-short-option</strong>:
            Custom short flag to trigger help (default: <code>-h</code>).
          </li>
          <li>
            <strong className="text-foreground">
              --use-shebang / --no-bang
            </strong>
            : Specify the shebang (default: <code>#!/bin/bash</code>) or remove
            it.
            <CodeBlock>{`parseArger generate --use-shebang "#!/bin/zsh"`}</CodeBlock>
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">
          Leftovers (Extra Arguments)
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--leftovers</strong>: Collect
            all undefined arguments into an array.
          </li>
          <li>
            <strong className="text-foreground">--leftovers-name</strong>: Name
            of the variable for leftovers (default: <code>leftovers</code>).
            Forces <code>--leftovers</code>.
          </li>
          <li>
            <strong className="text-foreground">--parse-leftovers</strong>: Try
            to parse leftovers as key-value pairs into an associative array.
            Forces <code>--leftovers</code>.
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Version Control</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--set-version</strong>: Hardcode
            a version string.
          </li>
          <li>
            <strong className="text-foreground">--version-opt-name</strong>:
            Customize the version long flag (default: <code>--version</code>).
          </li>
          <li>
            <strong className="text-foreground">--version-short-option</strong>:
            Customize the version short flag (default: <code>-v</code>).
          </li>
          <li>
            <strong className="text-foreground">
              --version-opt / --no-version-opt
            </strong>
            : Enable or disable the version option entirely.
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">
          Verbosity & Logging
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--verbose-level</strong>: Set
            the default verbosity level (default: 0).
          </li>
          <li>
            <strong className="text-foreground">--verbose-opt-name</strong>:
            Customize the verbose option name (default: <code>verbose</code>).
          </li>
          <li>
            <strong className="text-foreground">
              --use-verbose / --no-use-verbose
            </strong>
            : Enable or disable the verbosity parser.
          </li>
          <li>
            <strong className="text-foreground">--die-fn-name</strong>: Rename
            the internal <code>die</code> function.
          </li>
          <li>
            <strong className="text-foreground">--log-fn-name</strong>: Rename
            the internal <code>log</code> function.
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Parse (The "Oops" Command)
        </h2>
        <p className="text-foreground">
          Use <code>parseArger parse</code> to update an existing script. It
          accepts most of the same arguments as <code>generate</code>, plus:
        </p>

        <CommandLine
          command={`parseArger parse ./script.sh -i \\
  --opt 'new-option "I forgot this"'`}
        />

        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-4">
          <li>
            <strong className="text-foreground">file</strong>: The first
            positional argument must be the script file to parse.
          </li>
          <li>
            <strong className="text-foreground">--inplace (-i)</strong>: Update
            the file directly instead of printing to stdout.
          </li>
        </ul>

        <SarcasticAside variant="medium">
          <strong>WARNING:</strong> The <code>-i</code> (in-place) flag modifies
          your file directly. If you don't trust me (and you shouldn't), maybe
          backup your script first. Or use git. You use git, right?
        </SarcasticAside>
      </div>
    </div>
  );
}
