import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function DocsIndexPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Getting Started</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Welcome to ParseArger. If you're here, you're probably tired of writing <code>while getopts</code> loops and case statements that look like they were written by a drunk cat walking on a keyboard.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Installation</h2>
        <p className="text-foreground">
          The easiest way to install is via the installer script. It downloads the source, sets permissions, and sets up your environment variables.
        </p>
        
        <CodeBlock>{`# download the script
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O

# make it executable
chmod +x get_parseArger

# install (this modifies your bashrc/zshrc)
./get_parseArger --install

# source your rc file (only needed once right now)
source "$HOME/.bashrc"`}</CodeBlock>

        <SarcasticAside variant="mild">
          If you prefer the "hard way", you can clone the repo manually. But why would you do that? The script works. Mostly.
        </SarcasticAside>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Quick Start: The Project Way</h2>
        <p className="text-foreground">
          Don't just create a script. Create a <em>project</em>. ParseArger can scaffold an entire directory structure for you, complete with subcommands, documentation, and installers.
        </p>

        <CommandLine 
          command={`parseArger project my-awesome-tool \\
  --description "Tools for world domination" \\
  --git-repo "user/domination-tools" \\
  --project-subcommand ignite \\
  --project-subcommand destroy`}
        />

        <p className="mt-4 text-muted-foreground">
          This creates a folder <code>my-awesome-tool</code> with everything you need. Cd into it and look around. It's beautiful.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Quick Start: The Script Way</h2>
        <p className="text-foreground">
          Just want a single script? Fine. Be that way.
        </p>

        <CommandLine 
          command={`parseArger generate \\
  --pos 'filename "the file to process"' \\
  --opt 'output "where to put the result"' \\
  --flag 'verbose "yell at me"' \\
  --output ./process-file.sh`}
        />

        <p className="mt-4 text-foreground">
          Now run it:
        </p>
        <CommandLine command="./process-file.sh --help" output={`USAGE: process-file.sh [options] <filename>

ARGUMENTS:
  <filename>                the file to process

OPTIONS:
  --output <output>         where to put the result

FLAGS:
  --verbose                 yell at me
  --help                    show this help message
  --version                 show version`} />
      </div>
    </div>
  );
}
