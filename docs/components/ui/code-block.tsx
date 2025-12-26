'use client';

import React from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
  copyable?: boolean;
}

export function CodeBlock({ children, language = 'bash', copyable = true }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 border border-primary/20 bg-card/50 rounded-sm rounded-br-2xl overflow-hidden shadow-none">
      <div className="absolute right-0 top-0 z-10">
        {copyable && (
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 text-xs font-mono bg-primary/10 text-primary hover:bg-primary hover:text-background border-b border-l border-primary/20 rounded-bl-xl font-bold tracking-wider transition-colors"
          >
            {copied ? 'COPIED' : 'COPY'}
          </button>
        )}
      </div>
      <pre className="overflow-x-auto p-6 scrollbar-hide text-sm">
        <code className={`font-mono language-${language} inline-block min-w-full text-foreground/90 bg-transparent border-0 p-0 whitespace-pre`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
