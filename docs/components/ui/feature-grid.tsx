'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  icon?: string;
  code?: string;
}

interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

export function FeatureGrid({ features, className }: FeatureGridProps) {
  return (
    <div className={cn(
      "grid md:grid-cols-2 gap-6 my-8",
      className
    )}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
        >
          {feature.icon && (
            <div className="text-4xl mb-4">{feature.icon}</div>
          )}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground mb-4">{feature.description}</p>
          {feature.code && (
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
              {feature.code}
            </code>
          )}
          <div className="absolute top-4 right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
