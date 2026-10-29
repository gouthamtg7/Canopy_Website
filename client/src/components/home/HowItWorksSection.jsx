import React from 'react';
import { Terminal, Cpu, Network, CheckCircle, Monitor } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      icon: Cpu,
      title: 'Local Tree-sitter Parsing',
      description:
        'Canopy scans your local working tree for JavaScript and TypeScript files, including .js, .jsx, .mjs, .cjs, .ts, .mts, .cts, and .tsx. Vue and Svelte files are skipped.',
      techBadge: 'Local Node.js workers',
    },
    {
      step: '02',
      icon: Network,
      title: 'Symbol Resolution & Edge Linking',
      description:
        'Canopy resolves imports, exports, routes, middleware, and calls per service, then stores the project cache outside the repository.',
      techBadge: 'SQLite & In-Memory Graph',
    },
    {
      step: '03',
      icon: CheckCircle,
      title: 'Confidence Tier Tagging',
      description:
        'Edges use exact, resolved, or inferred confidence. Solid edges are explicit; dashed edges are inferred and not guessed as facts.',
      techBadge: 'Explicit Confidence Scoring',
    },
    {
      step: '04',
      icon: Monitor,
      title: 'Local Canvas & MCP Server',
      description:
        'Canopy opens a local canvas for visual navigation. Claude Code is the supported AI provider, and the MCP server lets your own AI tool query the indexed graph.',
      techBadge: 'Ephemeral Web Canvas + MCP',
    },
  ];

  return (
    <section className="py-20 bg-paper-subtleLight/40 dark:bg-paper-subtleDark/20 border-t border-borderLight dark:border-borderDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-accent-blue dark:text-blue-400 mb-2">
            Static Analysis Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
            How Canopy works under the hood
          </h2>
          <p className="mt-3 text-base text-ink-mutedLight dark:text-ink-mutedDark">
            Four sequential stages executed entirely on your hardware with no network roundtrips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark flex flex-col justify-between shadow-subtle"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-ink-mutedLight dark:text-ink-mutedDark">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-lg bg-paper-subtleLight dark:bg-paper-subtleDark text-accent-blue">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-base text-ink-light dark:text-ink-dark mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-borderLight dark:border-borderDark">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-paper-subtleLight dark:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark">
                    {item.techBadge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
