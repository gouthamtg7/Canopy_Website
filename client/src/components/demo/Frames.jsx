import React from 'react';
import { Files, Search, GitBranch, Bug, Blocks, Lock, RotateCw, ChevronLeft, ChevronRight, ChevronDown, ChevronRight as Caret, FileCode2, Folder, Sparkles, Terminal as TermIcon } from 'lucide-react';
import { REPO, AGENT, TERMINAL, LIVE_FEED } from './script';

export function BrowserFrame({ children }) {
  return (
    <div className="zf-browser">
      <div className="zf-bar">
        <span className="zf-lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="zf-nav" aria-hidden="true"><ChevronLeft size={14} /><ChevronRight size={14} /><RotateCw size={12} /></span>
        <span className="zf-url"><Lock size={10} aria-hidden="true" />127.0.0.1:4000</span>
        <span className="zf-spacer" />
      </div>
      <div className="zf-viewport">{children}</div>
    </div>
  );
}

const TREE = [
  { d: 0, n: REPO.name, folder: true, open: true },
  { d: 1, n: 'client', folder: true },
  { d: 1, n: 'server', folder: true, open: true },
  { d: 2, n: 'src', folder: true, open: true },
  { d: 3, n: 'lib', folder: true },
  { d: 3, n: 'routes', folder: true, open: true },
  { d: 4, n: 'auth.js' },
  { d: 4, n: 'cart.js' },
  { d: 4, n: 'orders.js', active: true },
  { d: 3, n: 'app.js' },
  { d: 1, n: 'package.json' },
];

function AgentPanel({ stepId, liveN }) {
  const msgs = AGENT[stepId] || [];
  return (
    <aside className="zf-agent zf-dim" aria-hidden="true">
      <div className="zf-ph"><Sparkles size={12} />CLAUDE CODE</div>
      <div className="zf-agent-b">
        {msgs.length === 0 && <p className="zf-faint">No conversation yet.</p>}
        {msgs.map((m, i) => {
          if (m.at && (liveN ?? 99) < m.at) return null;
          return <div key={i} className={`zf-msg ${m.role}`}>{m.role === 'tool' ? <><i>●</i>{m.text}</> : m.text}</div>;
        })}
        {stepId === 'live' && (liveN ?? 0) < LIVE_FEED.length && <div className="zf-msg tool zf-thinking"><i>●</i>Working…</div>}
      </div>
      <div className="zf-agent-in">Ask Claude Code…</div>
    </aside>
  );
}

export function VSCodeFrame({ children, stepId, liveN }) {
  return (
    <div className="zf-ide">
      <div className="zf-title zf-dim">
        <span className="zf-lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="zf-title-t">{REPO.name}</span>
      </div>
      <div className="zf-main">
        <nav className="zf-act zf-dim" aria-hidden="true">
          <Files size={18} className="on" /><Search size={18} /><GitBranch size={18} /><Bug size={18} /><Blocks size={18} />
        </nav>
        <aside className="zf-explorer zf-dim" aria-hidden="true">
          <div className="zf-ph">EXPLORER</div>
          {TREE.map((t) => (
            <div key={t.n + t.d} className={`zf-tree ${t.active ? 'on' : ''}`} style={{ paddingLeft: 8 + t.d * 10 }}>
              {t.folder ? (t.open ? <ChevronDown size={12} /> : <Caret size={12} />) : <span style={{ width: 12 }} />}
              {t.folder ? <Folder size={12} /> : <FileCode2 size={12} />}
              <span>{t.n}</span>
            </div>
          ))}
        </aside>
        <section className="zf-editor">
          <div className="zf-tabs">
            <span className="zf-tab zf-dim">orders.js</span>
            <span className="zf-tab on">Simple Browser · 127.0.0.1:4000</span>
          </div>
          <div className="zf-app">{children}</div>
          <div className="zf-term zf-dim" aria-hidden="true">
            <div className="zf-ph"><TermIcon size={11} />TERMINAL</div>
            <div className="zf-term-b">
              {TERMINAL.map((l, i) => (
                <div key={i} className={`zf-tl ${l.k}`}>{l.k === 'cmd' ? <><span className="p">~/{REPO.name} $</span> {l.t}</> : l.t}</div>
              ))}
            </div>
          </div>
        </section>
        <AgentPanel stepId={stepId} liveN={liveN} />
      </div>
    </div>
  );
}
