import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function GenerateParsePage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Generate & Parse</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          These are the two commands you'll use the most. One creates chaos (scripts), the other organizes it.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Generate</h2>
        <p className="text-foreground">
          <code>parseArger generate</code> is the main entry point for creating new scripts. It takes definitions for arguments, options, and flags and spits out a bash script that handles all the parsing logic for you.
        </p>

        <div className="bg-card border border-primary/20 p-6 rounded-sm rounded-br-2xl">
          <h3 className="font-bold text-accent mb-4">Common Options</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-primary font-bold">--pos</span> Define a positional argument.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">--opt</span> Define an optional argument (takes a value).</li>
            <li className="flex gap-2"><span className="text-primary font-bold">--flag</span> Define a boolean flag (true/false).</li>
            <li className="flex gap-2"><span className="text-primary font-bold">--output</span> Where to write the script.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">--set</span> Declare global variables at the top of the script.</li>
          </ul>
        </div>

        <CommandLine 
          command={`parseArger generate \\
  --pos 'target "IP or Hostname"' \\
  --opt 'port "Target Port" --default-value 80' \\
  --flag 'silent "Shhh..."' \\
  --set 'API_KEY "12345"' \\
  --output ./scan.sh`}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Parse (The "Oops" Command)</h2>
        <p className="text-foreground">
          You generated a script. It works. Then your boss (or your own hubris) decided you needed <em>one more option</em>. 
          Do not rewrite the script manually. Use <code>parseArger parse</code>.
        </p>

        <p className="text-muted-foreground">
          It reads an existing ParseArger-generated script and injects new arguments into it without destroying your custom logic (mostly).
        </p>

        <CommandLine 
          command={`parseArger parse ./scan.sh -i \\
  --opt 'timeout "Connection timeout" --default-value 5' \\
  --flag 'aggressive "Enable aggressive mode"'}`}
        />

        <SarcasticAside variant="medium">
          <strong>WARNING:</strong> The <code>-i</code> (in-place) flag modifies your file directly. If you don't trust me (and you shouldn't), maybe backup your script first. Or use git. You use git, right?
        </SarcasticAside>
      </div>
    </div>
  );
}
