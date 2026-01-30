import { CodeBlock } from "@/components/ui/code-block";
import { SarcasticAside } from "@/components/ui/sarcastic-aside";
import { CommandLine } from "@/components/ui/command-line";
import { SectionHeader } from "@/components/ui/section";

export default function AiImprovePage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>AI Power: Improve & Create</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Too lazy to write bash? Too lazy to look up arguments? Good. Let the
          AI do it. parseArger now includes AI-powered commands to standardise
          and improve your scripts.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Improve
        </h2>
        <p className="text-foreground">
          <code>parseArger improve</code> is your intelligent assistant for
          existing scripts. It can add arguments, refactor code, or both, while
          keeping your sanity intact.
        </p>

        <CommandLine
          command={`parseArger improve ./script.sh "add a debug flag and refactor the main loop"`}
        />

        <h3 className="text-lg font-bold text-accent mt-4">How it works</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">
              Intelligent Classification
            </strong>
            : It figures out if you want to change arguments (`parse` mode),
            implementation (`script` mode), or both.
          </li>
          <li>
            <strong className="text-foreground">Safe Execution</strong>: AI
            generates the command, but YOU validate it. We check for dangerous
            characters, correct targets, and format before running anything.
          </li>
          <li>
            <strong className="text-foreground">Context Aware</strong>: It reads
            your script (with your permission) to understand what's already
            there so it doesn't hallucinate non-existent variables.
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Options</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">--dry-run</strong>: See what the
            AI <em>would</em> do without actually touching your precious code.
          </li>
          <li>
            <strong className="text-foreground">--model</strong>: Specify the AI
            model (default: moonshotai/kimi-k2.5).
          </li>
          <li>
            <strong className="text-foreground">--api-key</strong>: Pass your
            API key explicitly if not in env.
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Create
        </h2>
        <p className="text-foreground">
          <code>parseArger create</code> generates a brand new script from a
          natural language description.
        </p>

        <CommandLine
          command={`parseArger create --output my-tool "a cli tool that optimizes png images using ffmpeg"`}
        />

        <p className="text-muted-foreground">
          It handles the boilerplate, the argument parsing setup, and even
          writes a first pass at the implementation logic.
        </p>
      </div>

      <SarcasticAside variant="medium">
        <strong>NOTE:</strong> We default to <code>openrouter</code> and{" "}
        <code>moonshotai/kimi-k2.5</code> because we have standards (and
        budgets). usage requires an API key in <code>OPENROUTER_API_KEY</code>{" "}
        or passed via flag.
      </SarcasticAside>
    </div>
  );
}
