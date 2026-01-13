'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CommandLineProps {
  command: string;
  output?: string;
  className?: string;
  animated?: boolean;
}

export function CommandLine({ command, output, className, animated = true }: CommandLineProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "relative my-6 border-2 border-primary/20 bg-card/50 text-foreground rounded-sm rounded-br-2xl shadow-none overflow-hidden",
      className
    )}>
      <div className="absolute right-0 top-0 z-10">
        <button
          onClick={handleCopy}
          className="px-4 py-1.5 text-xs font-mono bg-primary/10 text-primary hover:bg-primary hover:text-background border-b border-l border-primary/20 rounded-bl-xl font-bold tracking-wider transition-colors cursor-pointer"
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      
      <div className="p-6 overflow-x-auto">
        <div className="flex gap-3 min-w-full font-mono text-sm">
          <span className="text-primary font-bold select-none shrink-0 leading-relaxed py-[1px]">{'>'}</span>
          <pre className="flex-1 !bg-transparent !border-0 !border-none !shadow-none !ring-0 !outline-none !p-0 !m-0 font-medium whitespace-pre leading-relaxed text-foreground/90 font-mono !rounded-none">
            {command}
          </pre>
        </div>
        
        {output && (
          <div className="mt-6 pt-4 border-t border-primary/10">
            <pre className="!bg-transparent !border-0 !border-none !shadow-none !ring-0 !outline-none !p-0 !m-0 text-muted-foreground whitespace-pre overflow-x-auto font-mono text-sm leading-relaxed !rounded-none">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
