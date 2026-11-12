import React from 'react';
import { ArrowUpRight, MessageSquare, FlaskConical, Users } from 'lucide-react';
import { brand, formHref } from '../lib/brand';

const CARDS = [
  { kind: 'feedback', icon: MessageSquare, title: 'Share feedback', body: 'Tell us how it did on your repo: what was right, what was missing, what was confusing. Short or long, both help.', cta: 'Open the feedback form' },
  { kind: 'tester', icon: FlaskConical, title: 'Become an early tester', body: 'Try new builds before they ship and tell us what breaks. Best if you work on a non-trivial JS/TS codebase.', cta: 'Ask to join' },
  { kind: 'teams', icon: Users, title: 'Teams waitlist', body: 'Shared maps and PR checks for teams are on a waitlist. They are not available yet.', cta: 'Join the waitlist' },
];

export function CommunityPage() {
  return (
    <section className="page-x py-16 sm:py-24">
      <p className="eyebrow">Feedback & testing</p>
      <h1 className="h-section mt-3 max-w-2xl">Help shape {brand.name}.</h1>
      <p className="lede mt-4 max-w-2xl">{brand.name} is in public beta and built with direct feedback from developers. Pick whichever fits.</p>
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {CARDS.map(({ kind, icon: Icon, title, body, cta }) => {
          const href = formHref(kind);
          const isForm = !!brand.forms[kind];
          return (
            <li key={kind} className="card flex flex-col p-6 sm:p-7">
              <Icon className="h-5 w-5 text-fg-2" aria-hidden="true" />
              <h2 className="mt-5 text-lg font-semibold tracking-tight">{title}</h2>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-fg-2">{body}</p>
              <a href={href} target={isForm ? '_blank' : undefined} rel={isForm ? 'noreferrer' : undefined} className="btn mt-6 self-start border border-line bg-bg text-fg hover:border-fg-3/40">
                {isForm ? cta : `Email us: ${title.toLowerCase()}`} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-10 text-sm text-fg-3">Prefer email? Write to <a className="underline decoration-line underline-offset-4 hover:text-fg" href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>.</p>
    </section>
  );
}
