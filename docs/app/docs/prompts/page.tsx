import { SectionHeader } from "@/components/ui/section";
import { SarcasticAside } from "@/components/ui/sarcastic-aside";
import Link from "next/link";

const prompts = [
  {
    name: "Tiny",
    slug: "tiny",
    size: "~1.3 KB",
    description:
      "Bare minimum. Quick reference for when you just need the basics.",
  },
  {
    name: "Small",
    slug: "small",
    size: "~2.5 KB",
    description:
      "Core commands and argument types. Good for limited context windows.",
  },
  {
    name: "Medium",
    slug: "medium",
    size: "~6.8 KB",
    description: "Detailed argument options and workflows. Balanced coverage.",
  },
  {
    name: "Large",
    slug: "large",
    size: "~13.5 KB",
    description:
      "Comprehensive documentation with examples. For thorough AI assistance.",
  },
  {
    name: "Extra Large",
    slug: "extralarge",
    size: "~20 KB",
    description: "Extended examples and edge cases. When you need everything.",
  },
  {
    name: "Complete",
    slug: "complete",
    size: "~25 KB",
    description:
      "The whole enchilada. Every feature, every option, every example.",
  },
];

export default function PromptsPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>AI Prompts</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Pre-built context prompts for AI assistants. Pick the size that fits
          your context window.
        </p>
      </div>

      <SarcasticAside variant="mild">
        These prompts are designed to be copy-pasted into your favorite AI
        assistant. The raw <code>.md</code> files are also served directly for
        programmatic access.
      </SarcasticAside>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Available Prompts
        </h2>

        <div className="grid gap-4">
          {prompts.map((prompt) => (
            <div
              key={prompt.slug}
              className="border border-border p-6 rounded-sm rounded-br-2xl bg-card/30 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {prompt.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {prompt.description}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Size: {prompt.size}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link
                    href={`/docs/prompts/${prompt.slug}`}
                    className="px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-sm rounded-br-lg hover:bg-primary hover:!text-primary-foreground transition-colors !no-underline"
                  >
                    VIEW
                  </Link>
                  <a
                    href={`/prompts/${prompt.slug}.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-card border border-border text-foreground text-sm font-bold rounded-sm rounded-br-lg hover:border-primary hover:text-primary transition-colors !no-underline"
                  >
                    RAW
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          Direct Access
        </h2>
        <p className="text-foreground">
          For AI assistants and programmatic access, the raw files are available
          at:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <code>/llms.txt</code> - Standard LLMs.txt format
          </li>
          <li>
            <code>/prompts/tiny.md</code> through{" "}
            <code>/prompts/complete.md</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
