import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Search, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Wordmark } from '../brand/Logo';
import { brand } from '../../lib/brand';

export function Header({ onOpenSearch }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  const isActive = (href) => (href.startsWith('/docs') ? location.pathname.startsWith('/docs') : location.pathname === href);
  const iconBtn = 'inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-sunk hover:text-fg';

  return (
    <header className={`sticky top-0 z-40 w-full safe-area-top transition-[background-color,border-color,backdrop-filter] duration-300 ${scrolled || open ? 'border-b border-line/70 bg-bg/80 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'}`}>
      <div className="page-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label={`${brand.name} home`} className="rounded-lg"><Wordmark /></Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {brand.nav.map((l) => (
              <Link key={l.href} to={l.href} aria-current={isActive(l.href) ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors ${isActive(l.href) ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onOpenSearch} className={`${iconBtn} sm:w-auto sm:gap-2 sm:px-3`} aria-label="Search docs (press /)">
            <Search className="h-4 w-4" />
            <kbd className="hidden rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-fg-3 sm:inline">/</kbd>
          </button>
          <button type="button" onClick={toggleTheme} className={iconBtn} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/#install" className="btn-primary ml-2 hidden h-9 min-h-0 px-4 sm:inline-flex">Install</Link>
          <button type="button" onClick={() => setOpen((o) => !o)} className={`${iconBtn} md:hidden`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="page-x pb-4 md:hidden">
          <ul className="flex flex-col gap-1 border-t border-line pt-3">
            {[...brand.nav, { label: 'Install', href: '/#install' }].map((l) => (
              <li key={l.href}><Link to={l.href} className="flex min-h-11 items-center rounded-xl px-3 text-[0.9375rem] text-fg hover:bg-sunk">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
