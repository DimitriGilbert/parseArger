import { CodeBlock } from "@/components/ui/code-block";
import { SarcasticAside } from "@/components/ui/sarcastic-aside";
import { CommandLine } from "@/components/ui/command-line";
import { SectionHeader } from "@/components/ui/section";

export default function TutorialPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Tutorial: Building log-miner</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          A step-by-step guide to building a forensic log analysis tool. Stop
          grepping until your eyes bleed. Let's build something professional.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          What We&apos;re Building
        </h2>
        <p className="text-foreground">
          <code>log-miner</code> will be able to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong>Analyze</strong> logs with filters (levels, time, services)
          </li>
          <li>
            <strong>Extract</strong> patterns (IPs, emails)
          </li>
          <li>
            <strong>Watch</strong> logs in real-time
          </li>
          <li>
            <strong>Generate</strong> HTML reports
          </li>
          <li>
            <strong>Stats</strong> mode for overviews
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Part 1: Setting Up
        </h2>
        <p className="text-foreground">We start with a simple log reader.</p>

        <CommandLine
          command={`parseArger generate \\
  --help-message "Analyze and filter log files like a boss" \\
  --set-version "1.0.0" \\
  --pos 'log-file "log file to analyze"' \\
  --opt 'output-format "output format" --short o --default-value table --one-of table --one-of json --one-of yaml' \\
  --flag 'verbose "verbose output"' \\
  --output log-miner`}
        />

        <p className="text-muted-foreground mt-2">Make it executable:</p>
        <CommandLine command="chmod +x log-miner" />

        <p className="text-foreground mt-4">
          Now add the logic to the bottom of the file:
        </p>
        <CodeBlock>{`# Check if file exists
if [ ! -f "$_arg_log_file" ]; then
  die "Log file not found: $_arg_log_file" 1
fi

log "Reading log file: $_arg_log_file" 4

# Output based on format
case "$_arg_output_format" in
  json)
    echo "["
    first=true
    while IFS= read -r line; do
      if [ "$first" = true ]; then first=false; else echo ","; fi
      printf '  "%s"' "$(echo "$line" | sed 's/"/\\"/g')"
    done < "$_arg_log_file"
    echo ""
    echo "]"
    ;;
  yaml)
    while IFS= read -r line; do
      printf '- "%s"\n' "$(echo "$line" | sed 's/"/\\"/g')"
    done < "$_arg_log_file"
    ;;
  table|*)
    echo "┌─────────────────────────────────────────────────────────────┐"
    echo "│ Log File: $_arg_log_file                                     │"
    echo "├─────────────────────────────────────────────────────────────┤"
    while IFS= read -r line; do
      printf "│ %-60s │\n" "$line"
    done < "$_arg_log_file"
    echo "└─────────────────────────────────────────────────────────────┘"
    ;;
esac`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Part 2: Adding Filters
        </h2>
        <p className="text-foreground">
          Let's use <code>parseArger parse</code> to inject new options without
          touching our custom code.
        </p>

        <CommandLine
          command={`parseArger parse log-miner -i \\
  --opt 'filter-level "filter by log level" --one-of debug --one-of info --one-of warn --one-of error --one-of critical --repeat' \\
  --opt 'filter-service "filter by service name"' \\
  --opt 'filter-time "filter by time range (format: start..end)"' \\
  --flag 'ignore-case "case insensitive matching"' \\
  --flag 'invert-match "show non-matching lines"'`}
        />

        <SarcasticAside variant="mild">
          The <code>-i</code> flag updates the file in-place. It respects the{" "}
          <code>YOUR CODE BELOW</code> boundary. Magic.
        </SarcasticAside>

        <p className="text-foreground mt-4">
          Update your logic to handle filters:
        </p>
        <CodeBlock>{`# Build grep pattern from filters
grep_pattern=""
grep_opts=""

if [ "$_arg_ignore_case" = "on" ]; then grep_opts="-i"; fi

if [ \${#_arg_filter_level[@]} -gt 0 ]; then
  level_pattern=$(IFS="|"; echo "\${_arg_filter_level[*]}")
  grep_pattern="$level_pattern"
fi

if [ "$_arg_filter_service" != "" ]; then
  if [ "$grep_pattern" != "" ]; then
    grep_pattern="$grep_pattern.*$_arg_filter_service|$_arg_filter_service.*$grep_pattern"
  else
    grep_pattern="$_arg_filter_service"
  fi
fi

if [ "$grep_pattern" != "" ]; then
  if [ "$_arg_invert_match" = "on" ]; then
    grep_cmd="grep -vE $grep_opts '$grep_pattern'"
  else
    grep_cmd="grep -E $grep_opts '$grep_pattern'"
  fi
else
  grep_cmd="cat"
fi

# Execute with eval (carefully!)
eval "$grep_cmd '$_arg_log_file'" | while ...`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Part 3: Multiple Sources & Patterns
        </h2>
        <p className="text-foreground">
          We change <code>--pos log-file</code> to{" "}
          <code>--pos log-files --repeat</code> to accept multiple files.
        </p>

        <CommandLine
          command={`parseArger parse log-miner -i \\
  --pos 'log-files "log files to analyze (supports glob)" --repeat' \\
  --opt 'extract-ip "extract IP addresses"' \\
  --opt 'extract-email "extract email addresses"' \\
  --opt 'extract-custom "custom regex pattern"' \\
  --flag 'unique "show only unique values"' \\
  --flag 'count "count occurrences"'`}
        />

        <p className="text-foreground mt-4">
          And add pattern extraction logic:
        </p>
        <CodeBlock>{`extract_patterns() {
  local input="$1"
  if [ "$_arg_extract_ip" != "" ]; then
    grep -oE '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' <<< "$input"
  fi
  # ... other extractions ...
}

for log_file in "\${_arg_log_files[@]}"; do
  # Process each file
done`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Part 4: Project Mode
        </h2>
        <p className="text-foreground">
          The script is getting too big. Let's convert it to a project with
          subcommands: <code>analyze</code>, <code>extract</code>,{" "}
          <code>stats</code>, <code>watch</code>.
        </p>

        <CommandLine
          command={`parseArger project log-miner \\
  --description "Forensic log analysis tool" \\
  --project-subcommand analyze \\
  --project-subcommand extract \\
  --project-subcommand stats \\
  --project-subcommand watch`}
        />

        <p className="text-muted-foreground mt-2">
          This creates a full directory structure. You can now configure each
          subcommand independently.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">
          Configure Subcommands
        </h3>
        <CommandLine
          command={`parseArger parse bin/analyze -i \\
  --pos 'files "log files" --repeat' \\
  --opt 'filter-level "levels" --repeat' ...

parseArger parse bin/stats -i \\
--pos 'files "log files" --repeat' \\
  --opt 'group-by "level, service, hour"' ...`}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Part 5: HTML Reports
        </h2>
        <p className="text-foreground">
          Generate a web interface for your tool. Yes, really.
        </p>

        <CommandLine
          command={`parseArger html-form bin/analyze > analyze-form.html`}
        />

        <SarcasticAside variant="medium">
          It generates a static HTML form that builds the CLI command for you.
          Great for people who are allergic to the terminal.
        </SarcasticAside>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Part 6: Completion & Docs
        </h2>
        <p className="text-foreground">Make it professional.</p>

        <h3 className="text-lg font-bold text-accent mt-4">Bash Completion</h3>
        <CommandLine
          command={`parseArger completely log-miner ./log-miner --subcmd-dir ./bin`}
        />

        <h3 className="text-lg font-bold text-accent mt-4">Documentation</h3>
        <CommandLine
          command={`parseArger document \\
  --file ./log-miner \\
  --directory ./bin \\
  --out documentation.md`}
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Part 7: Final Logic
        </h2>
        <p className="text-foreground">
          Implement the specific logic for each subcommand in `bin/`.
        </p>
        <p className="text-muted-foreground">
          For <code>stats</code>:
        </p>
        <CodeBlock>{`# Count by level
if [ "$_arg_group_by" = "level" ]; then
  for level in debug info warn error critical; do
    count=$(grep -ic "$level" "\${_arg_files[@]}" 2>/dev/null | awk '{s+=$1} END {print s}')
    printf "  %-10s: %d\n" "$level" "\${count:-0}"
  done
fi`}</CodeBlock>

        <p className="text-muted-foreground">
          For <code>watch</code>:
        </p>
        <CodeBlock>{`eval "tail -f '$_arg_file' | $filter"`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          TL;DR: The "I&apos;m Lazy" Script
        </h2>
        <p className="text-foreground">
          Too many steps? Just run this. It does literally everything we just talked about.
        </p>

        <CodeBlock>{`#!/bin/bash
# fast-forward.sh - Because life is too short for manual labor.

echo ">> INITIATING DOPAMINE_SAVING_PROTOCOL..."

# 1. Initialize Project
echo ">> [1/5] Scaffolding project structure (making it look professional)..."
parseArger project log-miner \\
  --description "Forensic log analysis tool" \\
  --project-subcommand analyze \\
  --project-subcommand extract \\
  --project-subcommand stats \\
  --project-subcommand watch

cd log-miner || exit 1

# 2. Configure Subcommands & Inject Logic
echo ">> [2/5] Injecting logic (fixing your future bugs)..."

# --- Analyze ---
echo "   -> Configuring 'analyze'..."
parseArger parse bin/analyze -i \\
  --pos 'files "log files" --repeat' \\
  --opt 'filter-level "filter by log level" --one-of debug --one-of info --one-of warn --one-of error --one-of critical --repeat' \\
  --opt 'filter-service "filter by service name"' \\
  --flag 'ignore-case "case insensitive matching"' \\
  --flag 'invert-match "show non-matching lines"'

cat >> bin/analyze << 'EOF'
grep_opts=""
[ "$_arg_ignore_case" = "on" ] && grep_opts="-i"
pattern=""

if [ \${#_arg_filter_level[@]} -gt 0 ]; then
  pattern=$(IFS="|"; echo "\${_arg_filter_level[*]}")
fi

if [ -n "$_arg_filter_service" ]; then
  [ -n "$pattern" ] && pattern="$pattern.*$_arg_filter_service|$_arg_filter_service.*$pattern" || pattern="$_arg_filter_service"
fi

cmd="cat"
if [ -n "$pattern" ]; then
  flag="-E"
  [ "$_arg_invert_match" = "on" ] && flag="-vE"
  cmd="grep $flag $grep_opts '$pattern'"
fi

for f in "\${_arg_files[@]}"; do
  echo "--- $f ---"
  eval "$cmd" "$f"
done
EOF

# --- Extract ---
echo "   -> Configuring 'extract'..."
parseArger parse bin/extract -i \\
  --pos 'files "log files" --repeat' \\
  --opt 'pattern "custom regex"' \\
  --flag 'ip "extract IPs"' \\
  --flag 'email "extract emails"'

cat >> bin/extract << 'EOF'
for f in "\${_arg_files[@]}"; do
  if [ "$_arg_ip" = "on" ]; then grep -oE '[0-9]{1,3}(\.[0-9]{1,3}){3}' "$f"; fi
  if [ "$_arg_email" = "on" ]; then grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' "$f"; fi
  if [ -n "$_arg_pattern" ]; then grep -oE "$_arg_pattern" "$f"; fi
done
EOF

# --- Stats ---
echo "   -> Configuring 'stats'..."
parseArger parse bin/stats -i \\
  --pos 'files "log files" --repeat' \\
  --opt 'group-by "level"'

cat >> bin/stats << 'EOF'
if [ "$_arg_group_by" = "level" ]; then
  for level in debug info warn error critical; do
    count=$(grep -ic "$level" "\${_arg_files[@]}" 2>/dev/null || echo 0)
    printf "  %-10s: %d\\n" "$level" "$count"
  done
fi
EOF

# --- Watch ---
echo "   -> Configuring 'watch'..."
parseArger parse bin/watch -i \\
  --pos 'file "log file to watch"' \\
  --opt 'filter "grep filter"'

cat >> bin/watch << 'EOF'
cmd="tail -f '$_arg_file'"
[ -n "$_arg_filter" ] && cmd="$cmd | grep --line-buffered '$_arg_filter'"
eval "$cmd"
EOF

# 3. Generate Bash Completion
echo ">> [3/5] Generating tab-completion (saving your keystrokes)..."
parseArger completely log-miner ./log-miner --subcmd-dir ./bin

# 4. Generate Documentation
echo ">> [4/5] Writing documentation (so you don't have to)..."
parseArger document --file ./log-miner --directory ./bin --out documentation.md

# 5. Generate HTML Form
echo ">> [5/5] Generating HTML forms (for the GUI weaklings)..."
parseArger html-form bin/analyze > analyze-form.html

echo ">> PARSEARGER_PROTOCOL: COMPLETE. SYSTEM_READY."
echo ">> You have saved approximately 4 hours of life. Go touch grass."`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Wrapping Up
        </h2>
        <p className="text-foreground">You now have a tool with:</p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>Multiple subcommands</li>
          <li>Argument validation</li>
          <li>Bash completion</li>
          <li>Auto-generated docs</li>
          <li>HTML forms</li>
        </ul>
        <p className="text-xl text-muted-foreground mt-4">
          And you didn't have to write a single line of argument parsing code.
          You're welcome.
        </p>
      </div>
    </div>
  );
}
