import React from 'react';
import { AlertCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LimitationsStrip() {
  const limitations = [
    {
      title: 'JavaScript & TypeScript Only',
      badge: 'Language Scope',
      description:
        'Parses .js, .ts, .jsx, and .tsx files only. Python, Go, Rust, Java, and C# are completely out of scope. Multi-language repos will only have their JS/TS modules indexed.',
    },
    {
      title: 'Partial Vue & Svelte Coverage',
      badge: 'Framework Limits',
      description:
        'Script blocks in .vue and .svelte are parsed, but dynamic runtime component tags (<component :is="active" />) and complex slot prop distribution have incomplete edge resolution.',
    },
    {
      title: 'Dynamic Dispatch & Event Emitters',
      badge: 'Static Analysis Ceiling',
      description:
        'String-interpolated event emitters (emitter.emit(`user_${id}`)) and runtime dynamic imports (import(dynamicPath)) cannot be statically guaranteed. These edges are flagged or marked inferred.',
    },
    {
      title: 'Large Monorepo Memory Caps',
      badge: 'Resource Ceiling',
      description:
        'Repositories exceeding 50,000 files can exhaust default Node V8 heap. Users must manually set NODE_OPTIONS="--max-old-space-size=8192" for mega-monorepos.',
    },
    {
      title: 'Unmeasured Precision & Recall on Arbitrary Code',
      badge: 'Scientific Honesty',
      description:
        'While our 10 pinned Golden Standard Test repos are actively measured, statistical precision and recall across every arbitrary proprietary framework have not been peer-reviewed.',
    },
  ];

  return (
    <section className="py-20 border-t border-borderLight dark:border-borderDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-amberSoft dark:bg-accent-amberSoftDark text-accent-amber text-xs font-mono mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Honest Technical Boundaries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
            What Canopy cannot do (yet)
          </h2>
          <p className="mt-2 text-sm text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
            Every static analysis engine encounters hard theoretical boundaries. We prefer disclosing ours upfront rather than letting you discover them in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {limitations.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-paper-subtleLight dark:bg-paper-subtleDark text-ink-mutedLight dark:text-ink-mutedDark font-semibold">
                    {item.badge}
                  </span>
                  <AlertCircle className="w-4 h-4 text-amber-500 opacity-80" />
                </div>
                <h3 className="font-semibold text-sm text-ink-light dark:text-ink-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Full specification card */}
          <div className="p-6 rounded-xl border border-dashed border-borderLight dark:border-borderDark bg-paper-subtleLight/40 dark:bg-paper-subtleDark/20 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark mb-3">
                Full Technical Disclosures
              </div>
              <h3 className="font-semibold text-sm text-ink-light dark:text-ink-dark mb-2">
                Have an edge case or reproduction?
              </h3>
              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
                If Canopy misattributes a function or misses a call site in your open-source repository, file a reproduction so we can refine our Tree-sitter query rules.
              </p>
            </div>
            <Link
              to="/docs/known-limitations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-blueHover pt-4 mt-4 border-t border-borderLight dark:border-borderDark"
            >
              <span>Read complete limitations doc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
