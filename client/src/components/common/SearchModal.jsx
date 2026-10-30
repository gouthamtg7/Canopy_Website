import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText, CornerDownLeft } from 'lucide-react';
import { copyText } from './clipboard';

export function SearchModal({ isOpen, onClose }) {
  const [error, setError] = useState(null);
  const dialogRef = useRef(null);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const commands = [
    { label: 'Open quickstart', description: 'Read the installation guide', href: '/docs/quickstart', shortcut: 'G then Q' },
    { label: 'View benchmarks', description: 'Inspect measured repository performance', href: '/benchmarks', shortcut: 'G then B' },
    { label: 'Join the community', description: 'Apply for early testing or submit feedback', href: '/community', shortcut: 'G then C' },
  ];
  const installCommand = 'npm install -g canopy-engine';

  // Fetch docs index on open
  useEffect(() => {
    if (isOpen) {
      setError(null);
      const previousFocus = document.activeElement;
      const controller = new AbortController();
      fetch('/api/docs', { signal: controller.signal })
        .then((res) => { if (!res.ok) throw new Error('Search is temporarily unavailable. Please try again.'); return res.json(); })
        .then((data) => {
          if (data && data.docs) setDocs(data.docs);
        })
        .catch((err) => { if (!controller.signal.aborted) setError(err.message); });

      inputRef.current?.focus();
      return () => { controller.abort(); previousFocus?.focus(); };
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredDocs = docs.filter((doc) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.description.toLowerCase().includes(q) ||
      doc.slug.toLowerCase().includes(q) || (doc.searchText || '').toLowerCase().includes(q)
    );
  });
  const filteredCommands = commands.filter((command) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return `${command.label} ${command.description}`.toLowerCase().includes(q);
  });
  const installAvailable = installCommand.includes(query.trim());
  const resultCount = filteredCommands.length + filteredDocs.length + (installAvailable ? 1 : 0);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      const focusable = [...dialogRef.current.querySelectorAll('input, button')];
      const first = focusable[0]; const last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < resultCount ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedCommand = filteredCommands[selectedIndex];
      const docIndex = selectedIndex - filteredCommands.length - (installAvailable ? 1 : 0);
      if (selectedCommand) {
        navigate(selectedCommand.href);
        onClose();
      } else if (selectedIndex === filteredCommands.length && installCommand.includes(query.trim())) {
        copyText(installCommand).then((success) => {
          if (success) {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          }
        });
      } else if (filteredDocs[docIndex]) {
        navigate(`/docs/${filteredDocs[docIndex].slug}`);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ink-light/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        ref={dialogRef} onKeyDown={handleKeyDown} role="dialog" aria-modal="true" aria-label="Command menu and documentation search" className="w-full max-w-xl squircle bg-paper-cardLight dark:bg-paper-cardDark border border-borderLight dark:border-borderDark rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-borderLight dark:border-borderDark">
          <Search className="w-5 h-5 text-ink-mutedLight dark:text-ink-mutedDark" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search commands and documentation..."
            className="w-full bg-transparent text-sm text-ink-light dark:text-ink-dark placeholder-ink-mutedLight dark:placeholder-ink-mutedDark focus:outline-none"
          />
          <button
            onClick={onClose}
            className="min-w-11 min-h-11 flex items-center justify-center p-1 rounded text-ink-mutedLight hover:text-ink-light dark:hover:text-ink-dark"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          <>
            {error && <p role="alert" className="p-4">{error}</p>}
            {resultCount === 0 ? (
              <div className="py-8 text-center text-sm text-ink-mutedLight dark:text-ink-mutedDark">
                No matching commands or documentation found for "{query}".
              </div>
            ) : (
              <>
              {(filteredCommands.length > 0 || installAvailable) && (
                <div className="mb-2">
                  <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-mono text-ink-mutedLight dark:text-ink-mutedDark">Commands</div>
                  {filteredCommands.map((command, idx) => (
                    <button
                      key={command.href}
                      onClick={() => { navigate(command.href); onClose(); }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left text-sm transition-colors ${
                        idx === selectedIndex
                          ? 'bg-paper-subtleLight dark:bg-paper-subtleDark text-accent-blue dark:text-blue-400 font-medium'
                          : 'text-ink-light dark:text-ink-dark hover:bg-paper-subtleLight/60 dark:hover:bg-paper-subtleDark/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <ArrowRight className="w-4 h-4 shrink-0 text-accent-blue" />
                        <div className="truncate">
                          <div className="font-medium truncate">{command.label}</div>
                          <div className="text-xs text-ink-mutedLight dark:text-ink-mutedDark truncate">{command.description}</div>
                        </div>
                      </div>
                      <kbd className="shrink-0 px-1.5 py-0.5 text-[10px] font-mono rounded border border-borderLight dark:border-borderDark text-ink-mutedLight dark:text-ink-mutedDark">{command.shortcut}</kbd>
                    </button>
                  ))}
                  {installAvailable && (
                    <button
                      onClick={async () => {
                        if (await copyText(installCommand)) {
                          setCopied(true);
                          window.setTimeout(() => setCopied(false), 2000);
                        }
                      }}
                      onMouseEnter={() => setSelectedIndex(filteredCommands.length)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left text-sm transition-colors ${
                        selectedIndex === filteredCommands.length
                          ? 'bg-paper-subtleLight dark:bg-paper-subtleDark text-accent-blue dark:text-blue-400 font-medium'
                          : 'text-ink-light dark:text-ink-dark hover:bg-paper-subtleLight/60 dark:hover:bg-paper-subtleDark/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 shrink-0 text-accent-blue" />
                        <div>
                          <div className="font-medium">Copy install command</div>
                          <div className="text-xs text-ink-mutedLight dark:text-ink-mutedDark font-mono">{installCommand}</div>
                        </div>
                      </div>
                      <span className="text-xs text-accent-green">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              )}
              {filteredDocs.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-mono text-ink-mutedLight dark:text-ink-mutedDark">Documentation</div>
                  {filteredDocs.map((doc, idx) => (
              <button
                key={doc.slug}
                onClick={() => {
                  navigate(`/docs/${doc.slug}`);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(filteredCommands.length + 1 + idx)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left text-sm transition-colors ${
                  filteredCommands.length + 1 + idx === selectedIndex
                    ? 'bg-paper-subtleLight dark:bg-paper-subtleDark text-accent-blue dark:text-blue-400 font-medium'
                    : 'text-ink-light dark:text-ink-dark hover:bg-paper-subtleLight/60 dark:hover:bg-paper-subtleDark/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <FileText className="w-4 h-4 shrink-0 text-ink-mutedLight dark:text-ink-mutedDark" />
                  <div className="truncate">
                    <div className="font-medium truncate">{doc.title}</div>
                    <div className="text-xs text-ink-mutedLight dark:text-ink-mutedDark truncate">
                      {doc.description || `Read documentation for ${doc.slug}`}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 opacity-60" />
              </button>
                  ))}
                </div>
              )}
              </>
            )}
          </>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-paper-subtleLight/50 dark:bg-paper-subtleDark/50 border-t border-borderLight dark:border-borderDark flex items-center justify-between text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">
          <div className="flex items-center gap-2">
            <span>Navigate: <kbd className="font-mono bg-paper-cardLight dark:bg-paper-cardDark px-1 py-0.5 rounded border border-borderLight dark:border-borderDark">↑</kbd> <kbd className="font-mono bg-paper-cardLight dark:bg-paper-cardDark px-1 py-0.5 rounded border border-borderLight dark:border-borderDark">↓</kbd></span>
            <span>Select: <kbd className="font-mono bg-paper-cardLight dark:bg-paper-cardDark px-1 py-0.5 rounded border border-borderLight dark:border-borderDark">↵</kbd></span>
          </div>
          <span>Close: <kbd className="font-mono bg-paper-cardLight dark:bg-paper-cardDark px-1 py-0.5 rounded border border-borderLight dark:border-borderDark">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
