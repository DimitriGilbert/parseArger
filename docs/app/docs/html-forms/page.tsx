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
          This command generates an HTML file with a form that maps to your arguments.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Usage</h2>
        <CommandLine 
          command={`parseArger html-form ./script.sh --out ./form.html`} 
        />
        
        <p className="text-foreground mt-4">
            The first argument is the <strong>file</strong> to process.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Configuration</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--command</strong>: The command string to execute (defaults to filename).
            <CodeBlock>{`parseArger html-form ./script.sh --command "my-script-alias"`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--action</strong>: Form action URL (default is empty).
            <CodeBlock>{`parseArger html-form ./script.sh --action "/submit"`}</CodeBlock>
          </li>
           <li>
            <strong className="text-foreground">--parent-form</strong>: ID of the parent form for nested command structures.
          </li>
           <li>
            <strong className="text-foreground">--form / --no-form</strong>: ID of the generated form (or disable form generation).
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Styling (Classes)</h3>
        <p className="text-muted-foreground">
          The generator uses Bootstrap classes by default, but you can override them.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><code>--form-class</code>: Form HTML class.</li>
          <li><code>--input-container-class</code>: Input container class (default: <code>form-group</code>).</li>
          <li><code>--input-class</code>: Input class (default: <code>form-control</code>).</li>
          <li><code>--label-class</code>: Label class (default: <code>form-label</code>).</li>
          <li><code>--select-class</code>: Select class (default: <code>form-select</code>).</li>
          <li><code>--checkbox-container-class</code> / <code>--radio-container-class</code>: Container for checkboxes/radios (default: <code>form-check</code>).</li>
          <li><code>--checkbox-class</code> / <code>--radio-class</code>: Checkbox/radio input class (default: <code>form-check-input</code>).</li>
          <li><code>--checkbox-label-class</code> / <code>--radio-label-class</code>: Checkbox/radio label class (default: <code>form-check-label</code>).</li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Features</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--button / --no-button</strong>: Display (or hide) the submit button (default: on).
          </li>
          <li>
            <strong className="text-foreground">--js / --no-js</strong>: Create (or skip) the JavaScript for command building (default: on). Note: <code>--no-js</code> forces <code>--no-result</code>.
          </li>
          <li>
            <strong className="text-foreground">--result / --no-result</strong>: Display (or hide) the result container (default: on).
          </li>
        </ul>

        <SarcasticAside variant="medium">
          Is it a modern React SPA? No. It's a static HTML form. It does the job. Style it yourself if you care about aesthetics.
        </SarcasticAside>
      </div>
    </div>
  );
}
