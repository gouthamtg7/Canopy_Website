import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Search, Menu, X, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Header({ onOpenSearch }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Docs', href: '/docs/quickstart' },
    { label: 'Benchmarks', href: '/benchmarks' },
    { label: 'GST', href: '/gst' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Community', href: '/community' },
    { label: 'Changelog', href: '/changelog' },
  ];

  const isActive = (href) => {
    if (href.startsWith('/docs') && location.pathname.startsWith('/docs')) return true;
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-paper-light/90 dark:bg-paper-dark/90 border-b border-borderLight dark:border-borderDark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-ink-light text-paper-light dark:bg-ink-dark dark:text-ink-light flex items-center justify-center font-mono font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              C
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base tracking-tight text-ink-light dark:text-ink-dark">
                Canopy
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-ink-mutedLight dark:text-ink-mutedDark leading-none">
                canopy-engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 pl-4" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-accent-blue bg-accent-blueSoft dark:bg-accent-blueSoftDark dark:text-blue-400'
                    : 'text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark text-xs text-ink-mutedLight dark:text-ink-mutedDark hover:border-ink-mutedLight dark:hover:border-ink-mutedDark transition-colors shadow-subtle"
            aria-label="Search documentation (Press /)"
          >
            <Search className="w-3.5 h-3.5 text-ink-mutedLight dark:text-ink-mutedDark" />
            <span className="hidden sm:inline">Search docs</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-paper-subtleLight dark:bg-paper-subtleDark border border-borderLight dark:border-borderDark text-ink-mutedLight dark:text-ink-mutedDark">
              /
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick CLI Pill */}
          <Link
            to="/docs/quickstart"
            className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink-light text-paper-light dark:bg-ink-dark dark:text-ink-light text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
          >
            <Terminal className="w-3 h-3 text-accent-blue" />
            <span>npm install -g canopy-engine</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg md:hidden text-ink-mutedLight dark:text-ink-mutedDark hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.href)
                  ? 'text-accent-blue bg-accent-blueSoft dark:bg-accent-blueSoftDark font-semibold'
                  : 'text-ink-mutedLight dark:text-ink-mutedDark hover:text-ink-light dark:hover:text-ink-dark hover:bg-paper-subtleLight dark:hover:bg-paper-subtleDark'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-borderLight dark:border-borderDark flex flex-col gap-2">
            <Link
              to="/docs/quickstart"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-ink-light text-paper-light dark:bg-ink-dark dark:text-ink-light text-xs font-mono font-medium"
            >
              <Terminal className="w-3.5 h-3.5 text-accent-blue" />
              <span>npm i -g canopy-engine</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
