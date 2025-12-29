"use client";

import { useState } from "react";

const basePath = "/parseArger";

interface PromptActionsProps {
  content: string;
  slug: string;
}

export function PromptActions({ content, slug }: PromptActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-primary text-primary-foreground! text-sm font-bold rounded-sm rounded-br-lg hover:bg-primary/90 transition-colors cursor-pointer"
      >
        {copied ? "COPIED!" : "COPY"}
      </button>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-accent text-accent-foreground! text-sm font-bold rounded-sm rounded-br-lg hover:bg-accent/90 transition-colors cursor-pointer"
      >
        DOWNLOAD
      </button>
      <a
        href={`${basePath}/prompts/${slug}.md`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-card border border-border text-foreground text-sm font-bold rounded-sm rounded-br-lg hover:border-primary hover:text-primary transition-colors no-underline!"
      >
        RAW
      </a>
    </div>
  );
}
