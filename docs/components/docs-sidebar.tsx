'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Getting Started',
    href: '/docs',
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Generate & Parse', href: '/docs/generate-parse' },
      { title: 'Arguments & Options', href: '/docs/arguments' },
      { title: 'Nested Options', href: '/docs/nested-options' },
    ],
  },
  {
    title: 'Advanced Features',
    items: [
      { title: 'Completion & Docs', href: '/docs/completion-docs' },
      { title: 'HTML Forms', href: '/docs/html-forms' },
    ],
  },
  {
    title: 'Case Study',
    items: [
      { title: 'Markdown Tool', href: '/docs/case-study' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-primary/10 bg-background/50 backdrop-blur-sm h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-8 pr-4">
      <div className="flex flex-col gap-8">
        {sidebarItems.map((section, i) => (
          <div key={i} className="px-2">
            <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider border-b border-primary/10 pb-1">
              {section.title}
            </h4>
            {section.items ? (
              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm px-3 py-2 rounded-sm rounded-br-lg transition-all border border-transparent",
                      pathname === item.href
                        ? "bg-primary/10 text-primary border-primary/20 font-medium translate-x-1"
                        : "text-muted-foreground hover:text-foreground hover:bg-card hover:border-border"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href={section.href}
                className={cn(
                  "text-sm px-3 py-2 rounded-sm rounded-br-lg transition-all border border-transparent block",
                  pathname === section.href
                    ? "bg-primary/10 text-primary border-primary/20 font-medium translate-x-1"
                    : "text-muted-foreground hover:text-foreground hover:bg-card hover:border-border"
                )}
              >
                Overview
              </Link>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
