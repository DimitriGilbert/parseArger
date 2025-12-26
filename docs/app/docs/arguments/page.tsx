import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function ArgumentsPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Arguments, Options & Flags</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          The holy trinity of CLI inputs. Here is how you define them without losing your mind.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Positional Arguments (--pos)</h2>
        <p className="text-foreground">
          Arguments that depend on their position. <code>script.sh arg1 arg2</code>.
        </p>
        <CodeBlock>{`parseArger generate --pos 'filename "description"'`}</CodeBlock>
        
        <h3 className="text-lg font-bold text-accent mt-4">Advanced Config</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><code>--one-of</code>: Restrict values to a list. <code>--one-of "json" --one-of "xml"</code></li>
          <li><code>--repeat</code>: Capture multiple values into an array.</li>
          <li><code>--subcommand</code>: Turn this argument into a subcommand dispatcher.</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Options (--opt)</h2>
        <p className="text-foreground">
          Named arguments that take a value. <code>--output file.txt</code>.
        </p>
        <CodeBlock>{`parseArger generate --opt 'output "output file" --short o'`}</CodeBlock>

        <h3 className="text-lg font-bold text-accent mt-4">Advanced Config</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><code>--default-value</code>: What to use if the user is lazy.</li>
          <li><code>--alias</code>: Synonyms. <code>--alias "out" --alias "target"</code>.</li>
          <li><code>--empty</code>: Allow the option to be used as a flag (no value).</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Flags (--flag)</h2>
        <p className="text-foreground">
          Booleans. True or False. On or Off. <code>--verbose</code>.
        </p>
        <CodeBlock>{`parseArger generate --flag 'verbose "enable logging" --short v'`}</CodeBlock>

        <h3 className="text-lg font-bold text-accent mt-4">Advanced Config</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><code>--on</code>: Default to true. (Why would you do this? I don't know, but you can).</li>
          <li><code>--no-name</code>: Name for the negation. <code>--no-name "quiet"</code>.</li>
        </ul>
      </div>

      <SarcasticAside variant="mild">
        All generated variables follow the pattern <code>$_arg_name</code>. Hyphens are replaced by underscores. So <code>--my-opt</code> becomes <code>$_arg_my_opt</code>. Simple.
      </SarcasticAside>
    </div>
  );
}
