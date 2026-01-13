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
    mild: 'border-primary/30 bg-primary/5 text-primary/90',
    medium: 'border-accent/30 bg-accent/5 text-accent/90',
    spicy: 'border-destructive/30 bg-destructive/5 text-destructive/90',
  };

  const headers: Record<string, string> = {
    mild: 'NOTE:',
    medium: 'WARNING:',
    spicy: 'CRITICAL_RANT:',
  };

  return (
    <aside className={cn(
      "my-8 p-6 relative font-mono text-sm border-l-2 border-t border-b border-r rounded-sm rounded-br-2xl",
      variants[variant],
      className
    )}>
      <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-bold tracking-widest uppercase text-foreground/80">
        <span className={cn("mr-2", {
          'text-primary': variant === 'mild',
          'text-accent': variant === 'medium',
          'text-destructive': variant === 'spicy'
        })}>
          {headers[variant]}
        </span>
      </div>
      <div className="leading-relaxed opacity-90">
        {children}
      </div>
    </aside>
  );
}
