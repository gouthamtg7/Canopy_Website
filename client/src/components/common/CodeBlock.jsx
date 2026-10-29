import { copyText } from './clipboard';
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CodeBlock({ code, language = 'bash', title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (!await copyText(code)) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-4 rounded-xl border border-borderLight dark:border-borderDark bg-paper-subtleLight/80 dark:bg-paper-cardDark overflow-hidden shadow-subtle group">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-borderLight dark:border-borderDark bg-paper-cardLight/50 dark:bg-paper-subtleDark/40 text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark">
          <span>{title || language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] hover:text-ink-light dark:hover:text-ink-dark transition-colors"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent-green" />
                <span className="text-accent-green">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative p-4 overflow-x-auto text-xs font-mono leading-relaxed text-ink-light dark:text-ink-dark">
        <pre>{code}</pre>
        {!title && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-lg border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent-green" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}
