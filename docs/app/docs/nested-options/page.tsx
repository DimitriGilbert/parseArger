import { CodeBlock } from '@/components/ui/code-block';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function NestedOptionsPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Nested Options</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          For when flat arguments aren't enough and you want to pretend you're writing JSON in terminal arguments.
          This feature creates an associative array with passed keys and values.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Usage</h2>
        <p className="text-foreground">
           Use <code>--nested</code> with <code>generate</code> or <code>parse</code>.
           <br />
           Syntax: <code>--nested 'arg-name "description" [options]'</code>
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Arguments & Options</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
           <li>
            <strong className="text-foreground">arg-name</strong>: The namespace name.
          </li>
          <li>
            <strong className="text-foreground">description</strong>: Description for the help message.
          </li>
           <li>
            <strong className="text-foreground">--one-of</strong>: Restrict accepted keys to a specific list. Repeatable.
          </li>
          <li>
            <strong className="text-foreground">--complete</strong>: Bash built-in completion for keys. Repeatable.
          </li>
           <li>
            <strong className="text-foreground">--complete-custom</strong>: Custom dynamic suggestion for keys. Repeatable.
          </li>
        </ul>
        
        <CommandLine 
          command={`parseArger generate --output my-script --nested 'opt-ns "a nested option"'`} 
        />

        <p className="mt-4 text-foreground">
          This generates a parser that accepts arguments in the format <code>--namespace-key value</code>.
        </p>
        <CodeBlock>{`./my-script --opt-ns-a "value" --opt-ns-b "b value" --opt-ns-option "my opt"`}</CodeBlock>

        <h3 className="text-lg font-bold text-accent mt-4">Accessing Values</h3>
        <p className="text-muted-foreground">
          Inside bash, you get an associative array.
        </p>
        <CodeBlock>{`echo \$_arg_opt_ns["a"]
# Output: value

echo \$_arg_opt_ns["b"]
# Output: b value`}</CodeBlock>

        <h3 className="text-lg font-bold text-accent mt-4">Use Cases</h3>
        <p className="text-foreground">
            Passing options to wrapped commands. If your script wraps another CLI tool, you can collect specific options for that tool in a namespace and pass them along.
        </p>
      </div>
    </div>
  );
}
