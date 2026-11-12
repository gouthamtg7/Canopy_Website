import React from 'react';
import { Link } from 'react-router-dom';
import { Wordmark } from '../brand/Logo';
import { brand, isExternal } from '../../lib/brand';

function FooterLink({ href, children }) {
  const cls = 'inline-flex min-h-9 items-center text-sm text-fg-2 transition-colors hover:text-fg';
  return isExternal(href) ? <a className={cls} href={href} target="_blank" rel="noreferrer">{children}</a> : <Link className={cls} to={href}>{children}</Link>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="page-x grid grid-cols-2 gap-x-6 gap-y-10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-12">
        <div className="col-span-2 max-w-xs space-y-4 md:col-span-1">
          <Wordmark />
          <p className="text-sm leading-relaxed text-fg-2">{brand.tagline}</p>
          <p className="text-xs leading-relaxed text-fg-3">{brand.scopeLine}</p>
        </div>
        {brand.footer.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow mb-3">{col.title}</h2>
            <ul>{col.links.map((l) => <li key={l.href}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="page-x flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {brand.name}. Source-available. Public beta.</p>
        <p>
          <a className="inline-flex min-h-9 items-center hover:text-fg" href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
          <span className="mx-2" aria-hidden="true">·</span>
          <a className="inline-flex min-h-9 items-center hover:text-fg" href={brand.links.npm} target="_blank" rel="noreferrer">npm</a>
        </p>
      </div>
    </footer>
  );
}
