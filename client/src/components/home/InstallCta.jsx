import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { InstallCommand } from '../common/InstallCommand';
import { brand } from '../../lib/brand';

export function InstallCta() {
  return (
    <section id="install" aria-labelledby="install-title" className="scroll-mt-16 border-t border-line">
      <div className="page-x py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-4 py-14 text-center shadow-elevated sm:px-12 sm:py-20" data-reveal>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(var(--accent)/0.12),transparent_70%)]" />
          <h2 id="install-title" className="relative font-display text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-[3.5rem]">Run it on your repo.</h2>
          <p className="relative mx-auto mt-4 max-w-md text-lg text-fg-2">Install once, then run <code className="rounded-md bg-sunk px-1.5 py-0.5 text-[0.9375rem]">{brand.runCommand}</code> inside any JavaScript or TypeScript repo.</p>
          <div className="relative mt-9 flex flex-col items-center gap-3">
            <InstallCommand iconOnlyOnMobile />
            <InstallCommand command={brand.runCommand} size="sm" />
          </div>
          <p className="relative mx-auto mt-6 max-w-lg text-sm text-fg-3">{brand.renameNote}</p>
          <p className="relative mx-auto mt-8 flex max-w-xl items-start justify-center gap-2 text-left text-sm text-fg-2 sm:items-center sm:text-center">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-sage sm:mt-0" aria-hidden="true" />{brand.privacyLine}
          </p>
          <p className="relative mt-3 text-xs text-fg-3">Coming soon: security review hints.</p>
          <Link to="/docs/quickstart" className="btn-ghost relative mt-6">Read the quickstart <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
