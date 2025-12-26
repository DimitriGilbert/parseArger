import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function CaseStudyPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Case Study: mdd</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          A real-world example of using ParseArger to build a Markdown management tool.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">The Goal</h2>
        <p className="text-foreground">
          I needed a tool to manage my blog posts. Creating folders, frontmatter, etc. Manually doing it was annoying.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Step 1: Init Project</h3>
        <CommandLine 
          command={`parseArger project mdd \\
  --description "markdown tools" \\
  --git-repo "DimitriGilbert/mdd" \\
  --project-subcommand article`} 
        />

        <h3 className="text-lg font-bold text-accent mt-8">Step 2: Define the 'Article' Subcommand</h3>
        <p className="text-muted-foreground">
          I needed a lot of metadata.
        </p>
        <CommandLine 
          command={`parseArger parse bin/article \\
  --pos 'title "Article Title"' \\
  --opt 'folder "Folder Name" --alias dir' \\
  --opt 'categories "Categories" --repeat' \\
  --flag 'draft "Is Draft?" --on' \\
  --nested-options 'meta "Extra Metadata"' \\
  --in-place`} 
        />

        <h3 className="text-lg font-bold text-accent mt-8">Step 3: The Logic</h3>
        <p className="text-muted-foreground">
          Then I just wrote the logic using the generated variables.
        </p>
        <CodeBlock>{`_container_dir="$_arg_title"
if [ "$_arg_folder" != "" ]; then
  _container_dir="$_arg_folder"
fi

if [ ! -d "$_container_dir" ]; then
  mkdir -p "$_container_dir"
fi

# ... magic happens here ...`}</CodeBlock>
      </div>
    </div>
  );
}
