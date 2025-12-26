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
    <div className="group relative my-6 border-2 border-muted bg-card">
      <div className="absolute right-0 top-0 z-10">
        {copyable && (
          <button
            onClick={handleCopy}
            className="opacity-50 group-hover:opacity-100 transition-opacity px-3 py-1 text-xs font-mono bg-muted text-primary hover:bg-primary hover:text-background border-l-2 border-b-2 border-muted uppercase font-bold tracking-wider"
          >
            {copied ? '[_COPIED_]' : '[_COPY_]'}
          </button>
        )}
      </div>
      <pre className="overflow-x-auto p-6 scrollbar-hide">
        <code className={`text-sm font-mono language-${language} block text-foreground bg-transparent border-0 p-0`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
