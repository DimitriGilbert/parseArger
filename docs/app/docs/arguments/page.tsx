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
          The holy trinity of CLI inputs. Here is the <strong>complete</strong> reference for how to define them.
          Generated variables follow the pattern <code>$_arg_name</code>. Hyphens are replaced by underscores.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Positional Arguments (--pos)</h2>
        <p className="text-foreground">
          Arguments that depend on their position. <code>script.sh arg1 arg2</code>.
          Usage: <code>--pos 'arg-name "description" [options]'</code>
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Validation & Completion</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--one-of</strong>: Restrict values to a specific list. Repeatable.
            <CodeBlock>{`parseArger generate --pos 'my-arg "description" --one-of value1 --one-of value2'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--complete</strong>: Use <a href="https://github.com/DannyBen/completely#suggesting-files-directories-and-other-bash-built-ins" className="underline hover:text-primary">Completely built-ins</a> for completion (file, directory, user, etc.).
            <CodeBlock>{`parseArger generate --pos 'filename "file path" --complete file'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--complete-custom</strong>: Custom dynamic suggestions using a command or script.
            <CodeBlock>{`parseArger generate --pos 'arg "desc" --complete-custom "\$(echo \"val1 val2\")"'`}</CodeBlock>
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Subcommands</h3>
        <p className="text-muted-foreground mb-2">
          Turn an argument into a dispatcher for subcommands.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--subcommand-directory</strong>: Automatically populate <code>--one-of</code> with scripts found in the specified directory. Forces <code>--subcommand</code>.
            <CodeBlock>{`parseArger generate --pos 'cmd "subcommand" --subcommand-directory bin'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--subcommand-variable</strong>: Change the variable name for the subcommand (default: <code>__subcommand</code>). Forces <code>--subcommand</code>.
             <CodeBlock>{`parseArger generate --pos 'arg "desc" --subcommand-variable notAsubCommand'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--subcommand</strong>: Mark this argument as a subcommand.
             <CodeBlock>{`parseArger generate --pos 'arg "desc" --subcommand'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--subcommand-run</strong>: Run the subcommand immediately before handing control back (or exiting). Forces <code>--subcommand</code>.
             <CodeBlock>{`parseArger generate --pos 'arg "desc" --subcommand-run'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--subcommand-use-leftovers</strong>: Pass leftover arguments to the subcommand. Forces <code>--subcommand</code>.
             <CodeBlock>{`parseArger generate --pos 'arg "desc" --subcommand-use-leftovers'`}</CodeBlock>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Options (--opt)</h2>
        <p className="text-foreground">
          Named arguments that take a value. <code>--output file.txt</code>.
          Usage: <code>--opt 'arg-name "description" [options]'</code>
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Repetition</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--repeat</strong>: Allow multiple values. The variable becomes an array.
            <CodeBlock>{`parseArger generate --opt 'header "headers" --repeat'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--repeat-min</strong>: Enforce a minimum number of repetitions. Forces <code>--repeat</code>.
            <CodeBlock>{`parseArger generate --opt 'item "items" --repeat-min 1'`}</CodeBlock>
          </li>
           <li>
            <strong className="text-foreground">--repeat-max</strong>: Enforce a maximum number of repetitions. Forces <code>--repeat</code>.
            <CodeBlock>{`parseArger generate --opt 'item "items" --repeat-max 10'`}</CodeBlock>
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Aliases & Shortcuts</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--short</strong>: Single letter shortcut.
            <CodeBlock>{`parseArger generate --opt 'output "output file" --short o'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--alias</strong>: Full word synonyms. Repeatable.
            <CodeBlock>{`parseArger generate --opt 'user "username" --alias login --alias u'`}</CodeBlock>
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Values & Defaults</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--default-value</strong>: Value to use if not provided.
            <CodeBlock>{`parseArger generate --opt 'mode "run mode" --default-value "production"'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--empty</strong>: Allow the option to be used without a value (acts like a flag in that case).
            <CodeBlock>{`parseArger generate --opt 'optional-val "val" --empty'`}</CodeBlock>
          </li>
           <li>
            <strong className="text-foreground">--empty-value</strong>: Specific value to use when the option is present but empty (requires <code>--empty</code>).
            <CodeBlock>{`parseArger generate --opt 'optional-val "val" --empty --empty-value "is-present"'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--one-of</strong>: Restrict values to a list. Repeatable.
          </li>
           <li>
            <strong className="text-foreground">--complete</strong>: Bash built-in completion.
          </li>
           <li>
            <strong className="text-foreground">--complete-custom</strong>: Custom completion.
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Flags (--flag)</h2>
        <p className="text-foreground">
          Booleans. True or False. On or Off. <code>--verbose</code>.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Configuration</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--short</strong>: Single letter shortcut (e.g., <code>-v</code>).
          </li>
          <li>
            <strong className="text-foreground">--on</strong>: Default to true (flag turns it off).
            <CodeBlock>{`parseArger generate --flag 'enable "enabled by default" --on'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--no-name</strong>: Custom name for the negation (e.g., <code>--dont-do-that</code>).
            <CodeBlock>{`parseArger generate --flag 'do-it "do it" --no-name dont-do-it'`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--alias</strong>: Alias for the flag. Repeatable.
            <CodeBlock>{`parseArger generate --flag 'verbose "verbose" --alias loud'`}</CodeBlock>
          </li>
           <li>
            <strong className="text-foreground">--no-alias</strong>: Alias for the flag negation. Repeatable.
            <CodeBlock>{`parseArger generate --flag 'verbose "verbose" --no-alias quiet --no-alias silent'`}</CodeBlock>
          </li>
        </ul>
      </div>

      <SarcasticAside variant="mild">
        All generated variables follow the pattern <code>$_arg_name</code>. Hyphens are replaced by underscores. So <code>--my-opt</code> becomes <code>$_arg_my_opt</code>. Simple.
      </SarcasticAside>
    </div>
  );
}
