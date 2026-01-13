import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function SkillsPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Agent Skills</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Because actually learning the CLI flags is for mere mortals. 
          These skills teach your AI agents (Claude, OpenCode, etc.) how to use parseArger so you don&apos;t have to.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">What are Skills?</h2>
        <p className="text-foreground">
          Think of them as "The Matrix" style training programs for your AI. We provide two distinct flavors, 
          depending on how much control you want to relinquish to the machine.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">parsearger-core</strong>: The heavy lifter. Teaches the agent how to generate scripts, parse arguments, and generally be useful.
          </li>
          <li>
            <strong className="text-foreground">parsearger-utils</strong>: The project manager. Handles scaffolding, documentation, and the boring stuff you definitely don&apos;t want to do.
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Installation (The "Red Pill")</h2>
        <p className="text-foreground">
          We wrote a script to install the scripts that install the scripts. It&apos;s scripts all the way down.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">1. Fetch the installer</h3>
        <p className="text-muted-foreground mb-2">
          Don&apos;t worry, it mostly just copies files. Mostly.
        </p>
        <CommandLine
          command={`curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_skills -O
chmod +x get_skills`}
        />

        <h3 className="text-lg font-bold text-accent mt-4">2. Inject the Skills</h3>
        <p className="text-muted-foreground mb-2">
          Tell us where your AI lives. We support Claude Desktop and OpenCode out of the box. 
          If you use something else, well, there&apos;s a flag for that.
        </p>
        <CommandLine
          command={`./get_skills --install claude --install opencode`}
        />

        <SarcasticAside variant="medium">
            Pro tip: You can install to multiple targets at once because we respect your time. 
            Or rather, we respect the time you spend not writing argument parsers.
        </SarcasticAside>

        <h3 className="text-lg font-bold text-accent mt-4">Advanced Options</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--repo</strong>: Use a different repo? If you think you can do it better, be my guest.
          </li>
          <li>
            <strong className="text-foreground">--branch</strong>: For when you like living on the bleeding edge (or broke main).
          </li>
          <li>
            <strong className="text-foreground">--force</strong>: Overwrite everything. Use this when you realized you made a mistake (we&apos;ve all been there).
          </li>
        </ul>
      </div>
    </div>
  );
}
