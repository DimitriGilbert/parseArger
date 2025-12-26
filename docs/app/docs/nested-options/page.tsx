import { CodeBlock } from '@/components/ui/code-block';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function NestedOptionsPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>Nested Options</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          For when flat arguments aren't enough and you want to pretend you're writing JSON in terminal arguments.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">The Concept</h2>
        <p className="text-foreground">
          Nested options allow you to group arguments under a namespace.
        </p>
        
        <CommandLine 
          command={`parseArger generate --nested 'database "DB Config"' --output ./db-tool.sh`} 
        />

        <p className="mt-4 text-foreground">
          This generates a parser that accepts:
        </p>
        <CodeBlock>{`./db-tool.sh --database-host "localhost" --database-port "5432" --database-user "admin"`}</CodeBlock>

        <p className="text-muted-foreground">
          Inside bash, you get an associative array (if your bash version isn't from the stone age).
        </p>
      </div>
    </div>
  );
}
