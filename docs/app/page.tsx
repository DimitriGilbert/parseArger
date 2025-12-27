"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { CodeBlock } from "@/components/ui/code-block";
import { SarcasticAside } from "@/components/ui/sarcastic-aside";
import { CommandLine } from "@/components/ui/command-line";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-mono selection:bg-primary/20 selection:text-primary">
      {/* Hero Section - Soft Brutalist */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-20 border-b border-primary/10 relative overflow-hidden">
        {/* Background Glitch Element - Subtle */}
        <div className="absolute top-10 right-10 p-4 opacity-10 pointer-events-none select-none text-right">
          <pre className="text-[10px] text-primary leading-tight">
            {`>> INIT_SEQUENCE
>> LOAD_MODULE: SARCASM
>> LOAD_MODULE: BASH_PARSER
>> STATUS: OPTIMAL`}
          </pre>
        </div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="mb-16">
            <h1 className="text-5xl md:text-8xl font-bold mb-6 text-foreground tracking-tight leading-[0.9]">
              BASH OPTIONS
              <br />
              <span className="text-primary/50">ARE HARD.</span>
              <br />
              <span className="text-primary">WE ARE LAZY.</span>
            </h1>
            <div className="h-1 w-24 bg-accent mb-8 rounded-full" />
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl border-l-2 border-primary/30 pl-6 py-1">
              Stop writing{" "}
              <span className="text-destructive line-through decoration-2">
                garbage
              </span>{" "}
              boilerplate. Generate standalone bash scripts because you have
              better things to do.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4">
                <a
                  href="#install"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary !text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all tracking-wider rounded-sm rounded-br-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 !no-underline"
                >
                  INSTALL
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground font-bold text-sm border border-border hover:border-primary hover:text-primary transition-all tracking-wider rounded-sm rounded-br-xl"
                >
                  READ_THE_DOCS
                </a>
              </div>

              <SarcasticAside variant="spicy">
                Look, we both know you're not going to write that `getopts` loop
                correctly. You're going to forget a case, or mess up the
                variable assignment, or cry. Just let the machine do it.
              </SarcasticAside>
            </div>

            <div className="w-full">
              <CommandLine
                command={`parseArger generate \\
  --pos 'target "TARGET_SYSTEM"' \\
  --opt 'payload "PAYLOAD_TYPE"' \\
  --flag 'force "OVERRIDE_PROTOCOLS"' \\
  --output ./deploy_virus.sh`}
                output={`[+] PARSING_DEFINITIONS... OK
[+] GENERATING_PARSER... OK
[+] INJECTING_HELP_TEXT... OK
[+] COMPILING_SCRIPT... DONE

Script generated at ./deploy_virus.sh
(Don't actually deploy viruses, please.)`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR Section */}
      <section className="px-6 py-24 border-b border-primary/10">
        <div className="max-w-5xl mx-auto">
          <SectionHeader className="text-accent/80">
            TLDR_PROTOCOL
          </SectionHeader>

          <p className="text-center text-lg text-muted-foreground mt-8 mb-12 max-w-2xl mx-auto">
            <span className="text-foreground font-bold">30 seconds.</span>{" "}
            That's all it takes. Watch the magic happen.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-sm font-bold text-primary tracking-widest mb-4">
                STEP 01: GENERATE
              </h3>
              <CommandLine
                command={`parseArger generate \\
  --pos 'commit "the offending commit"' \\
  --opt 'blame "who to blame" --default-value "the intern"' \\
  --flag 'dramatic "add theatrics"' \\
  --output ./git-excuser.sh`}
              />
            </div>

            <div>
              <h3 className="text-sm font-bold text-primary tracking-widest mb-4">
                STEP 02: ADD YOUR GENIUS
              </h3>
              <CodeBlock>{`# Your code goes after the generated parser
excuses=(
  "I inherited this mess."
  "It worked on my machine."
  "The tests passed. Blame QA."
  "Past me was a different person."
  "This was a 'temporary' fix from 2019."
)

echo "🔍 Investigating commit: $_arg_commit"
echo "📋 Blame assigned to: $_arg_blame"

if [ "$_arg_dramatic" = "on" ]; then
  echo "🎭 *dramatic pause*"
  sleep 1
fi

echo "💬 \\"\${excuses[$RANDOM % \${#excuses[@]}]}\\""`}</CodeBlock>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-primary tracking-widest mb-4">
              STEP 03: PROFIT
            </h3>
            <CommandLine
              command="./git-excuser.sh abc123 --blame 'past me' --dramatic"
              output={`🔍 Investigating commit: abc123
📋 Blame assigned to: past me
🎭 *dramatic pause*
💬 "It worked on my machine."`}
            />
          </div>

          <SarcasticAside variant="mild" className="mt-12 max-w-3xl mx-auto">
            That's it. You now have a fully functional CLI with help text,
            validation, and type checking. Want the{" "}
            <span className="text-primary font-bold">full tutorial</span>? We
            built an entire forensic log analysis tool.
          </SarcasticAside>

          <div className="flex justify-center mt-10">
            <a
              href="/docs/tutorial"
              className="inline-flex items-center px-8 py-4 bg-primary !text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all tracking-wider rounded-sm rounded-br-xl !no-underline"
            >
              READ_FULL_TUTORIAL →
            </a>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="px-6 py-32 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader className="text-primary/80">
            SYSTEM_MANIFEST
          </SectionHeader>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <div className="space-y-10 text-lg">
              <p>
                <span className="text-accent text-sm font-bold tracking-widest block mb-2">
                  [QUERY]
                </span>
                What is this monstrosity?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ParseArger is a bash library that generates standalone argument
                parsing, in bash. It eats its own dogfood to parse its own
                arguments. It is self-sustaining. It is inevitable.
              </p>

              <div className="border border-primary/20 p-8 bg-card/30 rounded-sm rounded-br-3xl">
                <h3 className="text-sm font-bold mb-6 text-accent tracking-widest border-b border-accent/20 pb-2 inline-block">
                  PAYLOAD_CONTENTS
                </h3>
                <ul className="space-y-4 text-sm text-foreground/80">
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold">01.</span>
                    <span>Standalone argument, option, and flag parsing</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold">02.</span>
                    <span>
                      Auto-generated Help Text (Because you won't write docs)
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold">03.</span>
                    <span>Bash Completion Scripts (Tab-tab supremacy)</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold">04.</span>
                    <span>HTML Forms? (Yes, for the GUI weaklings)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative pt-8 pl-8">
              <div className="absolute top-0 left-0 w-full h-full border border-primary/10 rounded-sm rounded-br-3xl -z-10" />
              <div className="bg-card border border-border p-8 rounded-sm rounded-br-3xl h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-[10px] text-muted-foreground mb-6 font-mono uppercase tracking-widest">
                    /var/logs/motivation.log
                  </div>
                  <div className="space-y-4 text-sm font-medium">
                    <p className="text-muted-foreground/60">
                      [INFO] User attempted to maintain legacy bash script.
                    </p>
                    <p className="text-destructive/80">
                      [CRITICAL] MENTAL_STABILITY dropped below 15%.
                    </p>
                    <p className="text-foreground/80">
                      [LOG] "Why is getopts so terrible?"
                    </p>
                    <p className="text-foreground/80">
                      [LOG] "I just want a --verbose flag without writing 50
                      lines of case statements."
                    </p>
                    <p className="text-primary font-bold mt-6">
                      [SOLUTION] INITIATE PARSEARGER.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <span className="text-[10px] border border-accent/30 text-accent px-3 py-1 rounded-sm rounded-br-lg uppercase tracking-widest">
                    Status: DEPLOYED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Install Protocol */}
      <section
        id="install"
        className="px-6 py-32 border-b border-primary/10 bg-secondary/5"
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeader className="text-accent/80">
            INSTALLATION_PROTOCOL
          </SectionHeader>

          <p className="text-lg text-center mb-16 text-muted-foreground max-w-2xl mx-auto">
            Execute the following sequence.{" "}
            <span className="text-foreground font-bold border-b border-primary">
              DO NOT DEVIATE.
            </span>
          </p>

          <div className="space-y-16">
            <div className="relative">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-accent/20 rounded-full" />
              <div className="pl-8">
                <h3 className="text-sm font-bold text-accent tracking-widest mb-4">
                  STEP 01: ACQUIRE ASSET
                </h3>
                <CodeBlock>{`curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O
chmod +x get_parseArger
./get_parseArger --install`}</CodeBlock>
              </div>
            </div>

            <SarcasticAside variant="mild">
              <strong>SECURITY_NOTICE:</strong> Running scripts from the
              internet is "dangerous". But you're here, aren't you? You live on
              the edge. (Read the script first if you're scared).
            </SarcasticAside>

            <div className="relative">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
              <div className="pl-8">
                <h3 className="text-sm font-bold text-primary tracking-widest mb-4">
                  STEP 02: GENERATE PROJECT
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Scaffold an entire project structure. Why do it manually?
                </p>
                <CommandLine
                  command={`parseArger project my-awesome-tool \\
  --description "Tools for world domination" \\
  --git-repo "user/domination-tools" \\
  --project-subcommand ignite \\
  --project-subcommand destroy`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section
        id="comparison"
        className="px-6 py-32 border-b border-primary/10"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader className="text-foreground/80">
            COMPETITOR_ANALYSIS
          </SectionHeader>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-card border border-border p-10 rounded-sm rounded-br-3xl hover:border-destructive/50 transition-colors group">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-foreground group-hover:text-destructive transition-colors">
                <span className="text-destructive/50">X</span>
                Argbash
              </h3>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                The ancestor. Respected, but I didn't understand the generated
                code. So I built my own. This is the way of the developer.
              </p>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                STATUS: OBSOLETE_INSPIRATION
              </div>
            </div>

            <div className="bg-card border border-border p-10 rounded-sm rounded-br-3xl hover:border-accent/50 transition-colors group">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-foreground group-hover:text-accent transition-colors">
                <span className="text-accent/50">?</span>
                Bashly
              </h3>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                Ruby dependency? In my Bash environment? It's more likely than
                you think. Great tool, but ParseArger stays pure. Pure Bash.
                Pure Chaos.
              </p>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                STATUS: HEAVYWEIGHT_CHAMPION
              </div>
            </div>
          </div>

          <SarcasticAside
            variant="medium"
            className="mt-16 max-w-4xl mx-auto border-accent/30"
          >
            ParseArger has <span className="text-accent font-bold">ZERO</span>{" "}
            runtime dependencies. It generates plain bash. It runs on a potato.
            It runs on your server. It runs on your mom's laptop.
          </SarcasticAside>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 px-6 py-20 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-2xl font-bold text-foreground tracking-tight mb-2">
              ParseArger
            </div>
            <p className="text-xs text-muted-foreground/60">
              Because life is too short for bad arguments.
            </p>
          </div>

          <div className="flex gap-8 text-xs font-bold tracking-widest">
            <a
              href="https://github.com/DimitriGilbert/parseArger"
              className="hover:text-primary transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://github.com/DimitriGilbert/parseArger/blob/main/readme.md"
              className="hover:text-primary transition-colors"
            >
              README
            </a>
            <a
              href="https://github.com/DimitriGilbert"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              @DimitriGilbert
            </a>
          </div>
        </div>
        <div className="text-center mt-20">
          <span className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.3em]">
            End of Line_
          </span>
        </div>
      </footer>
    </main>
  );
}
