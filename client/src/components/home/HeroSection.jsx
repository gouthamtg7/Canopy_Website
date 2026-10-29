import { copyText } from '../common/clipboard';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Copy, Check, ArrowRight, Shield, Zap } from 'lucide-react';

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCmd = 'npm install -g canopy-engine';
  const [version, setVersion] = useState('0.1.x');

  useEffect(() => {
    fetch('/api/site')
      .then((response) => {
        if (!response.ok) throw new Error('Site metadata unavailable');
        return response.json();
      })
      .then((site) => {
        if (site.version) setVersion(site.version);
      })
      .catch(() => {});
  }, []);

  const copyToClipboard = async () => {
    try {
      if (!await copyText(installCmd)) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy install command:', err);
    }
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Technical Credibility Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark mb-8 shadow-subtle">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
          <span>v{version}</span>
          <span className="text-borderLight dark:text-borderDark">|</span>
          <span>public beta</span>
          <span className="text-borderLight dark:text-borderDark">|</span>
          <span className="text-accent-blue dark:text-blue-400">Node.js 18+</span>
        </div>

        {/* Hero Title: Plain sentence constraint */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink-light dark:text-ink-dark max-w-4xl mx-auto leading-[1.15]">
          See how your code actually works.
        </h1>

        {/* Honest Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-ink-mutedLight dark:text-ink-mutedDark max-w-2xl mx-auto font-normal leading-relaxed">
          Canopy turns a JavaScript or TypeScript repo into a clickable map of its workflows, built from the code itself, on your computer, with the gaps shown honestly.
        </p>

        {/* One-Click Install Terminal Command */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <div className="w-full flex items-center justify-between px-4 py-3 rounded-full border border-ink-light/20 dark:border-ink-dark/20 bg-paper-cardLight dark:bg-paper-cardDark shadow-elevated font-mono text-sm text-ink-light dark:text-ink-dark">
            <div className="flex items-center gap-2.5 truncate">
              <Terminal className="w-4 h-4 text-accent-blue shrink-0" />
              <span className="truncate">{installCmd}</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="ml-3 p-1.5 rounded-full hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark transition-colors"
              aria-label="Copy install command"
            >
              {copied ? (
                <Check className="w-4 h-4 text-accent-green" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Supporting Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
          <Link
            to="/docs/quickstart"
            className="inline-flex items-center gap-1.5 font-medium text-ink-light dark:text-ink-dark hover:text-accent-blue transition-colors"
          >
            <span>Read 2-minute Quickstart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-ink-mutedLight dark:text-ink-mutedDark">•</span>
          <Link
            to="/benchmarks"
            className="inline-flex items-center gap-1.5 font-medium text-ink-light dark:text-ink-dark hover:text-accent-blue transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>View 10 Speed Benchmarks</span>
          </Link>
          <span className="text-ink-mutedLight dark:text-ink-mutedDark">•</span>
          <Link
            to="/docs/known-limitations"
            className="inline-flex items-center gap-1.5 font-medium text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark transition-colors"
          >
            <span>Read limits</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
