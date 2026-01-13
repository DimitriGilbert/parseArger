import { SectionHeader } from "@/components/ui/section";
import { CodeBlock } from "@/components/ui/code-block";
import { PromptActions } from "@/components/prompt-actions";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

const prompts: Record<string, { name: string; description: string }> = {
  tiny: {
    name: "Tiny Prompt",
    description: "~1.3 KB - Quick reference for the basics",
  },
  small: {
    name: "Small Prompt",
    description: "~2.5 KB - Core commands and argument types",
  },
  medium: {
    name: "Medium Prompt",
    description: "~6.8 KB - Detailed argument options and workflows",
  },
  large: {
    name: "Large Prompt",
    description: "~13.5 KB - Comprehensive documentation with examples",
  },
  extralarge: {
    name: "Extra Large Prompt",
    description: "~20 KB - Extended examples and edge cases",
  },
  complete: {
    name: "Complete Prompt",
    description: "~25 KB - The whole enchilada",
  },
};

export function generateStaticParams() {
  return Object.keys(prompts).map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;

  const prompt = prompts[slug];
  if (!prompt) {
    notFound();
  }

  const filePath = path.join(process.cwd(), `public/prompts/${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <SectionHeader>{prompt.name}</SectionHeader>
            <p className="text-muted-foreground mt-2">{prompt.description}</p>
          </div>
          <Link
            href="/docs/prompts"
            className="px-4 py-2 bg-card border border-border text-foreground text-sm font-bold rounded-sm rounded-br-lg hover:border-primary hover:text-primary transition-colors no-underline! w-fit"
          >
            ← BACK
          </Link>
        </div>

        <PromptActions content={content} slug={slug} />
      </div>

      <div className="border border-border rounded-sm rounded-br-2xl overflow-hidden">
        <div className="bg-card/50 px-4 py-2 border-b border-border text-xs text-muted-foreground font-mono">
          prompts/{slug}.md
        </div>
        <CodeBlock language="markdown" copyable>
          {content}
        </CodeBlock>
      </div>
    </div>
  );
}
