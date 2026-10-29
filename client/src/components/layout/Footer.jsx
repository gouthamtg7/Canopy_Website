import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Terminal, Cpu } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-borderLight dark:border-borderDark bg-paper-subtleLight/40 dark:bg-paper-subtleDark/20 text-ink-mutedLight dark:text-ink-mutedDark text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Manifesto Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-ink-light text-paper-light dark:bg-ink-dark dark:text-ink-light flex items-center justify-center font-mono font-bold text-xs">
                C
              </div>
              <span className="font-semibold text-ink-light dark:text-ink-dark tracking-tight">Canopy</span>
            </div>
            <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
              See how your code actually works. Local-first workflow maps for JavaScript and TypeScript.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-greenSoft dark:bg-accent-greenSoftDark text-accent-green text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Source stays on your computer</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-ink-light dark:text-ink-dark">
              Engine & Docs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/docs/quickstart" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Quickstart Guide
                </Link>
              </li>
              <li>
                <Link to="/docs/concepts" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Concepts & Tiers
                </Link>
              </li>
              <li>
                <Link to="/docs/mcp" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  MCP Server Integration
                </Link>
              </li>
              <li>
                <Link to="/docs/cli-reference" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  CLI & Environment Vars
                </Link>
              </li>
              <li>
                <Link to="/docs/known-limitations" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors text-amber-600 dark:text-amber-400">
                  Known Limitations
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Proof */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-ink-light dark:text-ink-dark">
              Proof & Transparency
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/benchmarks" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Speed Benchmarks
                </Link>
              </li>
              <li>
                <Link to="/gst" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Golden Standard Test (GST)
                </Link>
              </li>
              <li>
                <Link to="/claims" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Verified Claims Spec
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Reviews & Quotes
                </Link>
              </li>
              <li>
                <Link to="/docs/troubleshooting" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Troubleshooting & Cache
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-ink-light dark:text-ink-dark">
              Ecosystem & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/community" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Early Testers & Teams Waitlist
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Changelog & Releases
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Privacy Policy (Local-First)
                </Link>
              </li>
              <li>
                <Link to="/license" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  License
                </Link>
              </li>
              <li>
                <Link to="/third-party-notices" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
                  Third-Party Notices
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-borderLight dark:border-borderDark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-accent-blue" />
            <span>Public beta 0.1.x • Mainly tested on Windows</span>
          </div>
          <div className="text-ink-mutedLight dark:text-ink-mutedDark text-center sm:text-right">
            Copyright 2026 Canopy Engine.
          </div>
        </div>
      </div>
    </footer>
  );
}
