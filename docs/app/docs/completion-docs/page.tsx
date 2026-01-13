import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function CompletionDocsPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Completion & Documentation</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Make your script usable by others (or your future self) without reading source code.
          Here are the tools to generate bash completion and markdown documentation.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Bash Completion (completely)</h2>
        <p className="text-foreground">
          ParseArger uses <a href="https://github.com/DannyBen/completely" className="underline hover:text-primary">completely</a> to generate bash completion scripts.
          Usage: <code>parseArger completely command-name ./script-file [options]</code>
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Arguments & Options</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">command-name</strong>: The name of the command to generate completion for.
          </li>
          <li>
            <strong className="text-foreground">file</strong>: The executable file for the command.
          </li>
          <li>
            <strong className="text-foreground">--subcommand-directory / --subcmd-dir</strong>: If you have subcommands in a folder, point this to it to generate completion for them too.
            <CodeBlock>{`parseArger completely my-script ./my-script --subcommand-directory ./bin`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--completely-cmd / --cmpcmd</strong>: Specify how to run <code>completely</code> if it's not in your PATH (e.g., via Docker).
            <CodeBlock>{`parseArger completely my-script ./my-script --completely-cmd "docker run --rm -it completely"`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--extra-file</strong>: Append extra YAML definitions for custom completion. Repeatable.
          </li>
          <li>
            <strong className="text-foreground">--yaml-file</strong>: Custom name for the intermediate YAML file (default: <code>completely.yaml</code>).
          </li>
          <li>
            <strong className="text-foreground">--completion-file</strong>: Output file name (default: <code>completely.bash</code>).
          </li>
           <li>
            <strong className="text-foreground">--run-completely / --no-run-completely</strong>: Run <code>completely</code> to generate the bash script (default: on). Use <code>--no-run-completely</code> to only output the YAML to stdout.
            <CodeBlock>{`parseArger completely my-script ./my-script --no-run-completely > completely.yaml`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--discover-subcommand / --no-discover-subcommand</strong>: Auto-discover subcommands in the script (default: on).
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Markdown Documentation (document)</h2>
        <p className="text-foreground">
          Generate a <code>README.md</code> snippet directly from your argument definitions.
          Usage: <code>parseArger document [options]</code>
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Arguments & Options</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
           <li>
            <strong className="text-foreground">--file / -f</strong>: File to document. Repeatable. First in, first out.
            <CodeBlock>{`parseArger document --file ./script.sh --file ./other.sh`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--directory / --folder / -d</strong>: Document all scripts in a directory. Repeatable.
             <CodeBlock>{`parseArger document --directory ./bin`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--out / -o</strong>: Output file. If omitted, prints to stdout.
            <CodeBlock>{`parseArger document --file ./script.sh --out ./docs.md`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--tag</strong>: Markdown tag for titles (default: <code>##</code>).
          </li>
          <li>
            <strong className="text-foreground">--next-tag-prepend</strong>: String to prepend to the tag for subsequent levels (default: <code>#</code>).
          </li>
          <li>
            <strong className="text-foreground">--title</strong>: The main title of the documentation (default: <code>Usage</code>).
          </li>
          <li>
            <strong className="text-foreground">--title-tag</strong>: The tag for the main title (default: <code>#</code>).
          </li>
          <li>
            <strong className="text-foreground">--sub-directory / --no-sub-directory</strong>: Recursively document subdirectories (default: on).
          </li>
          <li>
            <strong className="text-foreground">--append-output / --no-append-output</strong>: Append to the output file instead of overwriting (default: on).
            <CodeBlock>{`parseArger document --file ./script.sh --out ./docs.md --no-append-output`}</CodeBlock>
          </li>
        </ul>

        <SarcasticAside variant="mild">
          It won't write Shakespeare, but it will list your flags so you don't have to.
        </SarcasticAside>
      </div>
    </div>
  );
}
