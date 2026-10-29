import React from 'react';
import { Compass, GitFork, GitCompare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ThreePillarsSection() {
  const pillars = [
    {
      icon: Compass,
      title: '1. Understand',
      subtitle: 'Instant mental model of unfamiliar codebases',
      description:
        'Canopy turns supported JavaScript and TypeScript source into a clickable workflow map, showing routes, services, database calls, and external integrations from the code.',
      details: [
        'Workflow maps built from source',
        'Frontend-to-backend links with confidence tiers',
        'Codebase and predicted Runtime mental models',
      ],
      linkText: 'Explore Concepts',
      linkHref: '/docs/concepts',
    },
    {
      icon: GitFork,
      title: '2. Trace',
      subtitle: 'Follow control flow from HTTP route to database row',
      description:
        'Click a route or component to follow links through the code. Solid links are explicit; dashed links are inferred and visibly marked.',
      details: [
        'End-to-end execution workflows',
        'Solid and dashed confidence links',
        'Frontend-to-backend workflow tracing',
      ],
      linkText: 'View Views & Slices',
      linkHref: '/docs/views-and-changes',
    },
    {
      icon: GitCompare,
      title: '3. See what changed',
      subtitle: 'Visual architectural diffs before merging PRs',
      description:
        'The Changes view compares the current map with the last view so architectural movement is easier to inspect than raw line diffs.',
      details: [
        'Changes since you last looked',
        'Visual impact radius for refactoring reviews',
        'No AI code edits are shipped',
      ],
      linkText: 'Read Diff Guide',
      linkHref: '/docs/views-and-changes',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-accent-blue dark:text-blue-400 mb-3">
            Core Architectural Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
            Three pillars built for skeptical engineers
          </p>
          <p className="mt-4 text-base text-ink-mutedLight dark:text-ink-mutedDark">
            Designed for developers who refuse black-box magic. Every connection is backed by verifiable syntax analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex flex-col justify-between p-8 rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark shadow-subtle hover:shadow-elevated transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-paper-subtleLight dark:bg-paper-subtleDark flex items-center justify-center text-ink-light dark:text-ink-dark mb-6 border border-borderLight dark:border-borderDark">
                    <Icon className="w-6 h-6 text-accent-blue" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-ink-light dark:text-ink-dark tracking-tight">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-accent-blue dark:text-blue-400 mt-1 mb-4">
                    {pillar.subtitle}
                  </div>
                  
                  <p className="text-sm text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2 mb-8 border-t border-borderLight dark:border-borderDark pt-4">
                    {pillar.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-ink-light dark:text-ink-dark">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-1.5"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={pillar.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-blueHover transition-colors pt-2 border-t border-borderLight dark:border-borderDark"
                >
                  <span>{pillar.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
