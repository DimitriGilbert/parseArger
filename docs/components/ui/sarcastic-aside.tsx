'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SarcasticAsideProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'mild' | 'medium' | 'spicy';
}

export function SarcasticAside({ children, className, variant = 'medium' }: SarcasticAsideProps) {
  const variants: Record<string, string> = {
    mild: 'border-2 border-primary/50 bg-background text-primary',
    medium: 'border-2 border-primary bg-primary/5 text-primary',
    spicy: 'border-2 border-destructive bg-destructive/10 text-destructive',
  };

  const headers: Record<string, string> = {
    mild: '[NOTE]',
    medium: '[WARNING]',
    spicy: '[CRITICAL_RANT]',
  };

  return (
    <aside className={cn(
      "my-6 p-4 relative font-mono text-sm",
      variants[variant],
      className
    )}>
      <div className="absolute -top-3 left-4 bg-background px-2 font-bold tracking-widest text-xs uppercase border-2 border-inherit">
        {headers[variant]}
      </div>
      <div className="leading-relaxed">
        {children}
      </div>
    </aside>
  );
}
