import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function CaseStudyPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Case Study: Building 'mdd'</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          A real-world example: building a Markdown tool ("mdd") to manage blog posts.
          Because <code>hugo new</code> is great, but we want <em>more</em>.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Step 1: Initialize the Project</h2>
        <p className="text-foreground">
          We start by creating a full project structure with a subcommand <code>article</code>.
        </p>

        <CommandLine 
          command={`parseArger project mdd \\
  --description "markdown tools for my blog" \\
  --git-repo "DimitriGilbert/mdd" \\
  --project-subcommand article`} 
        />
        
        <p className="text-muted-foreground">
           This creates the <code>mdd</code> folder, <code>bin/article</code>, <code>utils/install</code>, and more.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Step 2: Define the Arguments</h2>
        <p className="text-foreground">
          We need a lot of metadata for our blog posts: title, categories, tags, series, date, etc.
        </p>
        
        <CommandLine 
          command={`parseArger parse bin/article \\
  --pos 'title "article title"' \\
  --opt 'folder "article folder name" --alias directory --alias dir' \\
  --opt 'categories "article parent categories" --short c --alias cat --alias parent --repeat' \\
  --opt 'tags "article tags" --repeat --short t --alias tag' \\
  --opt 'series "article belongs to this series" --alias group --short g' \\
  --opt 'date "publication date meta" --alias publication --alias publish-at --short d' \\
  --opt 'summary "summary meta" --short s --alias description --alias desc' \\
  --opt 'template "template file to use" --alias tpl' \\
  --opt 'headings "add headings to your file" --repeat --alias part --alias h2' \\
  --opt 'headings-level "heading level" --default-value 2 --alias hl' \\
  --flag 'draft "is it a draft" --on --no-alias publish' \\
  --nested-options 'meta "add any meta you want"' \\
  --in-place`} 
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Step 3: The Implementation</h2>
        <p className="text-foreground">
          Now we write the logic in <code>bin/article</code> using the variables ParseArger generated for us.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Handling Folders</h3>
        <CodeBlock>{`_container_dir="$_arg_title";

if [ "$_arg_folder" != "" ]; then
    _container_dir="$_arg_folder";
fi

# Handle categories as path
if [ "\${#_arg_categories[@]}" -gt 0 ]; then
    _cat_dir="";
    for _cat in "\${_arg_categories[@]}"; do
        _cat_dir+="$_cat/";
    done
    _container_dir="$_cat_dir$_container_dir";
fi

if [ ! -d "$_container_dir" ]; then
    mkdir -p "$_container_dir";
fi`}</CodeBlock>

        <h3 className="text-lg font-bold text-accent mt-4">Generating Frontmatter</h3>
        <CodeBlock>{`_metas_str="title: $_arg_title\\n";

if [ "$_arg_date" != "" ]; then
    _metas_str+="date: $_arg_date\\n";
fi

if [ "\${#_arg_tags[@]}" -gt 0  ]; then
    _metas_str+="tags: \\n";
    for _tg in "\${_arg_tags[@]}"; do
        _metas_str+="\\t- $_tg\\n";
    done
fi

if [ "$_arg_draft" == "on" ]; then
    _metas_str+="draft: true\\n";
fi

# Handle nested options
if [ "\${#_arg_ns_meta[@]}" -gt 0 ]; then
    for _tmp_k_meta in "\${!_arg_ns_meta[@]}"; do
        _metas_str+="$_tmp_k_meta: \${_arg_ns_meta[$_tmp_k_meta]}\\n";
    done
fi`}</CodeBlock>

        <h3 className="text-lg font-bold text-accent mt-4">Generating Headings</h3>
        <CodeBlock>{`if [ "\${#_arg_headings[@]}" -gt 0 ]; then
    _hd_level_str="";
    for (( i=0; i<_arg_headings_level; i++ )); do
        _hd_level_str+="#";
    done

    for _hd in "\${_arg_headings[@]}"; do
        _contents_str+="\\n$_hd_level_str $_hd\\n\\n\\n";
    done
fi`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Step 4: Refinement (The "Oops" moment)</h2>
        <p className="text-foreground">
          We forgot a way to overwrite existing files. Let's add a force flag.
        </p>

        <CommandLine 
          command={`parseArger parse bin/article -i --flag 'force "erase if exists"'`} 
        />
        
        <p className="text-muted-foreground mt-2">
            And update our logic:
        </p>
         <CodeBlock>{`if [ "$_arg_force" == "on" ] && [ -f "\${_container_dir}/index.md" ]; then 
  rm "\${_container_dir}/index.md" -f; 
fi`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Step 5: Polish</h2>
        <p className="text-foreground">
          Generate documentation and completion scripts so we don't hate ourselves later.
        </p>
        
        <CommandLine 
          command={`parseArger document --file ./mdd  --directory ./bin --title "MarkDown for Didi" > documentation.md`} 
        />
         <CommandLine 
          command={`parseArger completely "mdd" ./mdd --subcommand-directory ./bin --no-run-completely > completely.yaml
completely preview > completely.bash`} 
        />

        <h3 className="text-lg font-bold text-accent mt-4">Setting up the Environment</h3>
        <p className="text-foreground">
            Finally, we create an <code>mdd.rc</code> file to source our new tool and its completion into our shell.
        </p>
        <CodeBlock>{`if [ "\${MDD_DIR}" != "" ]; then
  alias mdd="\${MDD_DIR}/mdd";
  [ -f "\${MDD_DIR}/completely.bash" ] && source "\${MDD_DIR}/completely.bash";
fi`}</CodeBlock>
      </div>

      <SarcasticAside variant="mild">
        And just like that, you have a fully functional, documented, and auto-completable CLI tool. You're welcome.
      </SarcasticAside>
    </div>
  );
}
