'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  decorative?: boolean;
}

export function Section({ children, className, id, decorative = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "",
        decorative && "bg-secondary/30",
        className
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3';
}

export function SectionHeader({ children, className, tag = 'h2' }: SectionHeaderProps) {
  const Tag = tag;

  return (
    <Tag className={cn(
      "text-4xl md:text-5xl font-bold mb-12 text-foreground",
      "font-mono tracking-tight",
      className
    )}>
      {children}
    </Tag>
  );
}
