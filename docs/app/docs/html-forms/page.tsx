import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function HtmlFormsPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>HTML Forms</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Because sometimes you have to give your powerful CLI tool to people who are afraid of the terminal.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">The Generator</h2>
        <p className="text-foreground">
          This command reads your script and generates an HTML file with a form that maps to your arguments.
        </p>

        <CommandLine 
          command={`parseArger html-form ./script.sh --out ./form.html`} 
        />

        <SarcasticAside variant="medium">
          Is it a modern React SPA? No. It's a static HTML form. It does the job. Style it yourself with the <code>--*-class</code> options if you care about aesthetics.
        </SarcasticAside>
      </div>
    </div>
  );
}
