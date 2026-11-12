import React from 'react';

/** The Zupra mark: a traced route (a Z) from a start node to an end node. */
export function Mark({ className = 'h-7 w-7', title }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <rect width="32" height="32" rx="9" className="fill-fg" />
      <path d="M9.5 10.5h12.5L10 21.5h12.5" fill="none" className="stroke-bg" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="10.5" r="2.6" className="fill-[#9DB4CE] dark:fill-[#4A6480]" />
      <circle cx="22.5" cy="21.5" r="2.6" className="fill-[#9DB4CE] dark:fill-[#4A6480]" />
    </svg>
  );
}

export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-7 w-7" />
      <span className="font-display text-[1.1875rem] font-semibold tracking-[-0.035em] text-fg">zupra</span>
    </span>
  );
}
