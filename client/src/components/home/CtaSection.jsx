import { copyText } from '../common/clipboard';
import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CtaSection() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npm install -g canopy-engine';

  const handleCopy = async () => {
    if (!await copyText(cmd)) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-paper-subtleLight/60 dark:bg-paper-subtleDark/40 border-t border-borderLight dark:border-borderDark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
          Ready to map your codebase?
        </h2>
        
        <p className="mt-4 text-base text-ink-mutedLight dark:text-ink-mutedDark max-w-xl mx-auto">
          Install the CLI globally in seconds. No cloud signup, no telemetry lock-in, and zero code uploads.
        </p>

        {/* Action cluster */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <div className="flex items-center justify-between px-4 py-3 rounded-full border border-ink-light/20 dark:border-ink-dark/20 bg-paper-cardLight dark:bg-paper-cardDark shadow-elevated font-mono text-xs sm:text-sm text-ink-light dark:text-ink-dark w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent-blue" />
              <span>{cmd}</span>
            </div>
            <button
              onClick={handleCopy}
              className="ml-4 p-1.5 rounded-full hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark transition-colors"
              aria-label="Copy install command"
            >
              {copied ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <Link
            to="/community"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ink-light text-paper-light hover:bg-neutral-800 dark:bg-ink-dark dark:text-ink-light dark:hover:bg-neutral-200 text-xs sm:text-sm font-semibold transition-colors shadow-elevated"
          >
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span>Join public beta</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

        <div className="mt-6 text-xs text-ink-mutedLight dark:text-ink-mutedDark">
          Public beta 0.1.x • Free for personal, educational, and evaluation use
        </div>

      </div>
    </section>
  );
}
