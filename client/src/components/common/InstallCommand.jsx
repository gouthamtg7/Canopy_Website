import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyText } from './clipboard';
import { brand } from '../../lib/brand';

/** The primary action: a command you can copy with one click. */
export function InstallCommand({ command = brand.installCommand, size = "lg", className = "", iconOnlyOnMobile = false }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const onCopy = async () => {
    if (!(await copyText(command))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };
  const lg = size === 'lg';
  return (
    <button
      type="button"
      onClick={onCopy}
      className={`group relative inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-surface text-left font-mono shadow-subtle transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-fg-3/40 hover:shadow-elevated active:scale-[0.99] ${lg ? 'min-h-[3.25rem] pl-5 pr-2 text-[0.8125rem] sm:text-sm' : 'min-h-11 pl-4 pr-1.5 text-[0.8125rem]'} ${className}`}
    >
      <span aria-hidden="true" className="select-none text-fg-3">$</span>
      <span className="truncate text-fg">{command}</span>
      <span
        className={`ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 font-sans text-xs font-medium transition-colors duration-200 ${lg ? 'h-9' : 'h-8'} ${copied ? 'bg-sage text-bg' : 'bg-fg text-bg group-hover:bg-fg/90'}`}
      >
        <span className="relative h-3.5 w-3.5">
          <Copy className={`absolute inset-0 h-3.5 w-3.5 transition-all duration-200 ${copied ? 'scale-50 opacity-0' : 'opacity-100'}`} />
          <Check className={`absolute inset-0 h-3.5 w-3.5 transition-all duration-200 ${copied ? 'opacity-100' : 'scale-50 opacity-0'}`} />
        </span>
        <span className={`${iconOnlyOnMobile ? "sr-only sm:not-sr-only sm:inline-block" : "inline-block"} w-[3.25rem] text-center`}>{copied ? "Copied" : "Copy"}</span>
      </span>
      <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
    </button>
  );
}
