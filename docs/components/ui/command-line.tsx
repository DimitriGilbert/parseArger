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
  return (
    <div className={cn(
      "bg-card overflow-hidden border-2 border-primary/20 shadow-[4px_4px_0px_0px_var(--color-primary)]",
      className
    )}>
      <div className="bg-primary/10 px-4 py-1 flex items-center justify-between border-b border-primary/20">
        <div className="text-xs text-primary font-mono font-bold tracking-wider">
          root@parseArger:~
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          [BASH]
        </div>
      </div>
      <div className="p-6 font-mono text-sm bg-card/50">
        <div className="flex items-start gap-2">
          <span className="text-primary font-bold">{'>'}</span>
          <pre className="flex-1 whitespace-pre-wrap text-foreground bg-transparent border-0 p-0 shadow-none overflow-visible">{command}</pre>
        </div>
        {output && (
          <div className="mt-4 text-muted-foreground whitespace-pre-wrap border-l-2 border-muted pl-4">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
