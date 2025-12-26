'use client';

import { Section, SectionHeader } from '@/components/ui/section';
import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-background">
      {/* Hero Section - Brutalist & Aggressive */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-20 border-b-4 border-primary relative overflow-hidden">
        {/* Background Glitch Element */}
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none select-none">
          <pre className="text-xs text-primary leading-none">
            {`SYSTEM_STATUS: CRITICAL
PARSING_LOGIC: FAILED
HUMAN_PATIENCE: 0%
INITIATING_PROTOCOL: PARSE_ARGER`}
          </pre>
        </div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="mb-12">
            <h1 className="text-6xl md:text-9xl font-black mb-6 text-primary tracking-tighter uppercase leading-[0.8]">
              ARGUMENTS<br/>ARE HARD.<br/>WE ARE LAZY.
            </h1>
            <div className="h-2 w-32 bg-accent mb-8" />
            <p className="text-xl md:text-3xl text-foreground max-w-4xl font-bold border-l-4 border-primary pl-6 py-2">
              Stop writing <span className="text-destructive line-through decoration-2">garbage</span> boilerplate. 
              Generate standalone bash scripts because you have better things to do.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-0">
                <a
                  href="#install"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background font-black text-lg hover:bg-primary/80 transition-all uppercase tracking-widest border-2 border-transparent hover:border-foreground"
                >
                  INITIALIZE_INSTALL
                </a>
                <a
                  href="https://github.com/DimitriGilbert/parseArger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-primary font-bold text-lg border-2 border-primary hover:bg-primary hover:text-background transition-all uppercase tracking-widest"
                >
                  SOURCE_CODE
                </a>
              </div>
              
              <SarcasticAside variant="spicy">
                Look, we both know you're not going to write that `getopts` loop correctly. You're going to forget a case, or mess up the variable assignment, or cry. Just let the machine do it.
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

      {/* Manifesto Section */}
      <section className="px-6 py-24 border-b-2 border-dashed border-primary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader className="text-primary uppercase">SYSTEM_MANIFEST</SectionHeader>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <div className="space-y-8 text-lg font-medium">
              <p>
                <span className="bg-primary text-background px-2">QUERY:</span> What is this monstrosity?
              </p>
              <p>
                ParseArger is a bash library that generates standalone argument parsing, in bash. It eats its own dogfood to parse its own arguments. It is self-sustaining. It is inevitable.
              </p>
              <div className="border-2 border-primary p-6 bg-primary/5">
                <h3 className="text-xl font-bold mb-4 text-accent uppercase">// THE_PAYLOAD</h3>
                <ul className="space-y-4 font-mono text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">[01]</span>
                    <span>Standalone argument, option, and flag parsing (The bread and butter)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">[02]</span>
                    <span>Auto-generated Help Text (Because you won't write docs)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">[03]</span>
                    <span>Bash Completion Scripts (Tab-tab supremacy)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">[04]</span>
                    <span>HTML Forms? (Yes, for the GUI weaklings)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-accent/20 skew-y-2 pointer-events-none" />
              <div className="bg-card border-2 border-foreground p-8 relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs text-primary mb-4 font-mono border-b border-primary/20 pb-2">
                    /var/logs/motivation.log
                  </div>
                  <div className="space-y-4 font-mono text-sm">
                    <p className="text-muted-foreground">
                      [INFO] User attempted to maintain legacy bash script.
                    </p>
                    <p className="text-destructive">
                      [CRITICAL] MENTAL_STABILITY dropped below 15%.
                    </p>
                    <p className="text-foreground">
                      [LOG] "Why is getopts so terrible?"
                    </p>
                    <p className="text-foreground">
                      [LOG] "I just want a --verbose flag without writing 50 lines of case statements."
                    </p>
                    <p className="text-primary font-bold mt-4">
                      [SOLUTION] INITIATE PARSEARGER.
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-right">
                  <span className="text-xs bg-accent text-background px-2 py-1 uppercase font-bold">Status: DEPLOYED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Install Protocol */}
      <section id="install" className="px-6 py-24 border-b-4 border-primary bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader className="text-accent uppercase">INSTALLATION_PROTOCOL</SectionHeader>

          <p className="text-xl text-center mb-12 text-muted-foreground max-w-2xl mx-auto font-mono">
            Execute the following sequence. <span className="text-primary">DO NOT DEVIATE.</span>
          </p>

          <div className="space-y-12">
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-lg font-bold text-foreground mb-2">STEP 01: ACQUIRE ASSET</h3>
              <CodeBlock>{`curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O
chmod +x get_parseArger
./get_parseArger --install`}</CodeBlock>
            </div>

            <SarcasticAside variant="mild">
              <strong>SECURITY_NOTICE:</strong> Running scripts from the internet is "dangerous". But you're here, aren't you? You live on the edge. (Read the script first if you're scared).
            </SarcasticAside>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-lg font-bold text-foreground mb-2">STEP 02: GENERATE PROJECT</h3>
              <p className="text-sm text-muted-foreground mb-4">Scaffold an entire project structure. Why do it manually?</p>
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
      </section>

      {/* Comparison Matrix */}
      <section id="comparison" className="px-6 py-24 border-b-2 border-dashed border-primary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader className="text-primary uppercase">COMPETITOR_ANALYSIS</SectionHeader>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-card border-2 border-muted hover:border-primary transition-colors p-8">
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3 text-foreground">
                <span className="text-destructive">X</span>
                Argbash
              </h3>
              <p className="text-muted-foreground mb-6 font-mono text-sm">
                The ancestor. Respected, but I didn't understand the generated code. So I built my own. This is the way of the developer.
              </p>
              <div className="text-xs text-primary font-bold uppercase tracking-wider">
                STATUS: OBSOLETE_INSPIRATION
              </div>
            </div>

            <div className="bg-card border-2 border-muted hover:border-primary transition-colors p-8">
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3 text-foreground">
                <span className="text-accent">?</span>
                Bashly
              </h3>
              <p className="text-muted-foreground mb-6 font-mono text-sm">
                Ruby dependency? In my Bash environment? It's more likely than you think. Great tool, but ParseArger stays pure. Pure Bash. Pure Chaos.
              </p>
              <div className="text-xs text-primary font-bold uppercase tracking-wider">
                STATUS: HEAVYWEIGHT_CHAMPION
              </div>
            </div>
          </div>

          <SarcasticAside variant="medium" className="mt-12 max-w-4xl mx-auto border-accent">
            ParseArger has <span className="text-accent font-bold">ZERO</span> runtime dependencies. It generates plain bash. It runs on a potato. It runs on your server. It runs on your mom's laptop.
          </SarcasticAside>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-primary px-6 py-16 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-3xl font-black text-primary tracking-tighter mb-2">ParseArger</div>
            <p className="text-sm text-muted-foreground font-mono">
              Because life is too short for bad arguments.
            </p>
          </div>

          <div className="flex gap-8 font-mono text-sm font-bold">
            <a href="https://github.com/DimitriGilbert/parseArger" className="hover:text-primary">GITHUB</a>
            <a href="https://github.com/DimitriGilbert/parseArger/blob/main/readme.md" className="hover:text-primary">README</a>
            <a href="https://github.com/DimitriGilbert" className="text-accent hover:text-foreground">@DimitriGilbert</a>
          </div>
        </div>
        <div className="text-center mt-16 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] opacity-50">
          End of Line_
        </div>
      </footer>
    </main>
  );
}
