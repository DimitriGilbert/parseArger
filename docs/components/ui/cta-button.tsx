'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function CTAButton({ href, children, variant = 'primary', className }: CTAButtonProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'bg-transparent border border-border hover:bg-muted',
  };

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all",
        "hover:scale-105 active:scale-95",
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  );
}
