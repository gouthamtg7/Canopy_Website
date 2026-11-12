import React from 'react';
import { ArrowDown, RotateCw } from 'lucide-react';
import { InstallCommand } from '../common/InstallCommand';
import { brand } from '../../lib/brand';
import { demoBus } from '../demo/bus';
import './hero.css';

const LOOP = [
  { id: 'understand', label: 'Understand', hint: 'Mental model, and what breaks if I touch this' },
  { id: 'change', label: 'Change', hint: 'Ask AI or Edit, through your own Claude Code' },
  { id: 'watch', label: 'Watch', hint: 'Live: what the agent is doing right now' },
  { id: 'review', label: 'Review', hint: 'Every change, shown on the map' },
];

function jump(chapter) {
  demoBus.go(chapter);
  document.getElementById('demo')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden="true" className="hero-glow" />
      <div className="page-x relative flex flex-col items-center pb-16 pt-14 text-center sm:pb-24 sm:pt-24">
        <p className="hero-in inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-fg-2 shadow-subtle" style={{ '--d': '0ms' }}>
          <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
          Public beta · for JavaScript &amp; TypeScript
        </p>
        <h1 id="hero-title" className="mt-7 font-display text-[clamp(2rem,9.2vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg sm:text-[4.25rem] lg:text-[5.25rem]">
          <span className="hero-line sm:block" style={{ "--d": "60ms" }}>Understand it.</span>{" "}
          <span className="hero-line" style={{ "--d": "160ms" }}>Change it.</span>{' '}
          <span className="hero-line text-fg-2 sm:block" style={{ "--d": "260ms" }}>Know what changed.</span>
        </h1>
        <p className="hero-in mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl" style={{ '--d': '380ms' }}>
          A map of your codebase, built on your machine, for you and your AI agent.
        </p>
        <div className="hero-in mt-9 flex flex-col items-center gap-3 sm:flex-row" style={{ '--d': '480ms' }}>
          <InstallCommand />
          <a href="#demo" className="btn-ghost">
            Watch the walkthrough <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <p className="hero-in mt-4 text-sm text-fg-3" style={{ '--d': '540ms' }}>
          Then run <code className="rounded-md bg-sunk px-1.5 py-0.5 text-[0.8125rem] text-fg-2">{brand.runCommand}</code> in your repo. {brand.nodeRequirement}.
        </p>

        {/* The loop the product is built around. Each stage jumps the walkthrough to that chapter. */}
        <nav aria-label="The loop" className="hero-in mt-16 w-full text-left sm:mt-20" style={{ '--d': '640ms' }}>
          <ol className="loop relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {LOOP.map((s, i) => (
              <li key={s.id} className="bg-bg">
                <button type="button" onClick={() => jump(s.id)} className="loop-cell group relative flex h-full w-full flex-col items-start gap-1.5 px-5 py-5 text-left transition-colors hover:bg-surface sm:px-6 sm:py-6" style={{ '--i': i }}>
                  <span className="flex w-full items-center justify-between">
                    <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                    {i === LOOP.length - 1
                      ? <RotateCw className="h-3.5 w-3.5 text-fg-3 transition-transform duration-500 group-hover:rotate-180" aria-label="then repeat" />
                      : <span aria-hidden="true" className="text-fg-3 transition-transform duration-300 group-hover:translate-x-0.5">→</span>}
                  </span>
                  <span className="loop-label text-base font-semibold tracking-tight text-fg sm:text-[1.0625rem]">{s.label}</span>
                  <span className="text-[0.8125rem] leading-snug text-fg-2">{s.hint}</span>
                  <span aria-hidden="true" className="loop-bar" />
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

