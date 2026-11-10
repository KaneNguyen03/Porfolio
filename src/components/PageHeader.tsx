"use client";

import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  /** Extra content rendered under the subtitle (stats line, filters, ...). */
  children?: ReactNode;
  className?: string;
}

/**
 * Shared page intro: gradient eyebrow label, large title and muted subtitle.
 * Keeps every route's header rhythm identical so the site reads as one system.
 */
export default function PageHeader({ eyebrow, title, subtitle, children, className = "" }: PageHeaderProps) {
  return (
    <header className={`mb-16 text-center ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 shadow-sm backdrop-blur dark:border-indigo-800/60 dark:bg-slate-900/60 dark:text-indigo-300 mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        <span className="gradient-text-animated">{title}</span>
      </h1>
      {subtitle && (
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
      {children}
    </header>
  );
}
