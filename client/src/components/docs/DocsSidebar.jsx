import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, ShieldAlert, Cpu, Terminal, Compass, Layers, Bot, HelpCircle, Shield } from 'lucide-react';

const DOC_ITEMS = [
  { slug: 'quickstart', title: 'Quickstart', icon: Terminal },
  { slug: 'concepts', title: 'Concepts & Confidence', icon: Compass },
  { slug: 'views-and-changes', title: 'Views and Changes', icon: Layers },
  { slug: 'ask-ai', title: 'Ask AI & Providers', icon: Bot },
  { slug: 'mcp', title: 'MCP Server Integration', icon: Cpu },
  { slug: 'cli-reference', title: 'CLI & Environment', icon: Terminal },
  { slug: 'troubleshooting', title: 'Store & Troubleshooting', icon: HelpCircle },
  { slug: 'privacy-telemetry', title: 'Privacy & Telemetry', icon: Shield },
  { slug: 'known-limitations', title: 'Known Limitations', icon: ShieldAlert, highlight: true },
];

export function DocsSidebar({ activeSlug, onCloseMobile }) {
  return (
    <aside className="w-full md:w-64 shrink-0 py-6 pr-6 border-b md:border-b-0 md:border-r border-borderLight dark:border-borderDark">
      <div className="sticky top-24 space-y-6">
        
        <div>
          <div className="flex items-center gap-2 px-3 mb-3 text-xs font-mono uppercase tracking-wider text-ink-mutedLight dark:text-ink-mutedDark">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </div>

          <nav className="space-y-1" aria-label="Documentation navigation">
            {DOC_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSlug === item.slug;

              return (
                <NavLink
                  key={item.slug}
                  to={`/docs/${item.slug}`}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-blueSoft text-accent-blue dark:bg-accent-blueSoftDark dark:text-blue-400 font-semibold'
                      : item.highlight
                      ? 'text-amber-600 dark:text-amber-400 hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark'
                      : 'text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 opacity-80" />
                  <span className="truncate">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 rounded-xl border border-borderLight dark:border-borderDark bg-paper-subtleLight/60 dark:bg-paper-subtleDark/40 text-xs">
          <div className="font-semibold text-ink-light dark:text-ink-dark mb-1">
            Need Live Help?
          </div>
          <p className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark mb-3">
            Join the developer Discord to discuss AST rules or report unexpected edge cases.
          </p>
          <a
            href="https://discord.gg/canopy-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-blue hover:underline"
          >
            <span>Canopy Discord →</span>
          </a>
        </div>

      </div>
    </aside>
  );
}
