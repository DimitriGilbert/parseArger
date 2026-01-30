"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl tracking-tighter text-primary">
              ParseArger
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link
              href="/docs"
              className="text-foreground hover:text-primary transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/playground"
              className="text-foreground hover:text-primary transition-colors"
            >
              Playground
            </Link>
            <a
              href="https://github.com/DimitriGilbert/parseArger"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
