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
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Bash Completion</h2>
        <p className="text-foreground">
          ParseArger uses <code>completely</code> to generate bash completion scripts.
        </p>

        <CommandLine 
          command={`parseArger completely my-script ./path/to/script.sh --completion-file ./completions.bash`} 
        />

        <p className="text-muted-foreground mt-2">
          Then, in your shell:
        </p>
        <CodeBlock>{`source ./completions.bash`}</CodeBlock>
        <p className="text-sm text-muted-foreground">Now hit TAB. Feel the power.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Markdown Documentation</h2>
        <p className="text-foreground">
          Generate a <code>README.md</code> snippet directly from your argument definitions.
        </p>

        <CommandLine 
          command={`parseArger document --file ./script.sh --out ./docs.md`} 
        />

        <SarcasticAside variant="mild">
          It's not perfect documentation. It won't explain <em>why</em> your script destroys the database, but it will list the flag <code>--destroy-db</code> clearly.
        </SarcasticAside>
      </div>
    </div>
  );
}
