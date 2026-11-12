import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pause, Play, ChevronLeft, ChevronRight, Globe, Code2 } from 'lucide-react';
import { ProductApp } from './ProductApp';
import { BrowserFrame, VSCodeFrame } from './Frames';
import { STEPS, CHAPTERS } from './script';
import { demoBus } from './bus';
import './demo.css';

export const STAGE_SIZE = 'h-[640px] sm:h-auto sm:aspect-[4/3] lg:aspect-[16/10]';

const merge = (s, patch) => {
  const out = { ...s };
  for (const [k, v] of Object.entries(patch)) out[k] = v && typeof v === 'object' && !Array.isArray(v) && s[k] && typeof s[k] === 'object' && k !== 'glow' ? { ...s[k], ...v } : v;
  return out;
};
const finalScene = (step) => step.beats.reduce((s, b) => (b.set ? merge(s, b.set) : b.type ? merge(s, { [b.type.key]: { typed: b.type.text } }) : s), step.base);
const useReducedMotion = () => {
  const [r, setR] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const m = matchMedia('(prefers-reduced-motion: reduce)'); const f = () => setR(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  return r;
};

function Cursor({ pos, clickKey }) {
  return (
    <div className={`zd-cursor ${clickKey % 2 ? 'zd-press' : ''}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, opacity: pos.visible ? 1 : 0 }} aria-hidden="true">
      {clickKey > 0 && <span key={clickKey} className="zd-ring" />}
      <svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 2.5v17.2l4.6-4.3 2.9 6.6 2.9-1.3-2.9-6.5h6.3z" fill="#1c1b16" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
    </div>
  );
}

export default function Demo() {
  const reduced = useReducedMotion();
  const [view, setView] = useState('browser');
  const [idx, setIdx] = useState(0);
  const [run, setRun] = useState(0); // restarts the current step's beats
  const [scene, setScene] = useState(STEPS[0].base);
  const [playing, setPlaying] = useState(!reduced);
  const [inView, setInView] = useState(false);
  const [cursor, setCursor] = useState({ x: 120, y: 120, visible: false });
  const [clickKey, setClickKey] = useState(0);
  const [spot, setSpot] = useState(null);
  const [announce, setAnnounce] = useState(false);
  const [manual, setManual] = useState(false); // the user took over: always animate the chosen step
  const stageRef = useRef(null), rootRef = useRef(null), cursorKey = useRef(null);
  const step = STEPS[idx];

  useEffect(() => { if (reduced) setPlaying(false); }, [reduced]);

  // Visible → play; hidden → hold.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((i, { takeOver = true } = {}) => {
    setIdx(((i % STEPS.length) + STEPS.length) % STEPS.length);
    setRun((r) => r + 1);
    if (takeOver) { setPlaying(false); setAnnounce(true); setManual(true); }
  }, []);

  // Hero loop and other links can jump to a chapter.
  useEffect(() => demoBus.listen(({ chapter }) => {
    const i = STEPS.findIndex((s) => s.chapter === chapter);
    if (i >= 0) { go(i, { takeOver: false }); if (!reduced) setPlaying(true); }
  }), [go, reduced]);

  const locate = useCallback((keys) => {
    const stage = stageRef.current;
    if (!stage) return null;
    const sr = stage.getBoundingClientRect();
    for (const k of [].concat(keys)) {
      const el = stage.querySelector(`[data-t="${k}"]`);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2 || r.right < sr.left || r.left > sr.right) continue;
      return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
    }
    return null;
  }, []);

  const placeCursor = useCallback((keys) => {
    cursorKey.current = keys;
    const r = locate(keys);
    if (r) setCursor({ x: r.x + Math.min(r.w * 0.5, r.w - 8), y: r.y + Math.min(r.h * 0.5, 22), visible: true });
  }, [locate]);

  // The beat engine for the current step.
  useEffect(() => {
    if (reduced) { setScene(finalScene(step)); setCursor((c) => ({ ...c, visible: false })); return undefined; }
    setScene(step.base);
    if (!inView && !manual) return undefined;
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    for (const b of step.beats) {
      if (b.cursor) at(b.at, () => placeCursor(b.cursor));
      if (b.click) at(b.at, () => setClickKey((k) => k + 1));
      if (b.set) at(b.at, () => setScene((s) => merge(s, b.set)));
      if (b.type) {
        const { key, text } = b.type;
        for (let i = 1; i <= text.length; i++) at(b.at + i * 34, () => setScene((s) => merge(s, { [key]: { typed: text.slice(0, i) } })));
      }
    }
    if (playing && inView) at(step.duration, () => { setIdx((i) => (i + 1) % STEPS.length); setRun((r) => r + 1); });
    return () => timers.forEach(clearTimeout);
  }, [idx, run, inView, manual, playing, reduced, step, placeCursor]);

  // Keep spotlight and cursor glued to their targets as panels open and the camera moves.
  useLayoutEffect(() => {
    const update = () => {
      setSpot(locate(step.spot));
      if (cursorKey.current) { const r = locate(cursorKey.current); if (r) setCursor((c) => ({ ...c, x: r.x + Math.min(r.w * 0.5, r.w - 8), y: r.y + Math.min(r.h * 0.5, 22) })); }
    };
    update();
    const t1 = setTimeout(update, 120), t2 = setTimeout(update, 1200);
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => { clearTimeout(t1); clearTimeout(t2); ro.disconnect(); };
  }, [scene, idx, view, locate, step.spot]);

  // Keyboard and swipe.
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
  };
  const touch = useRef(null);
  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  const app = <ProductApp scene={scene} reduced={reduced} />;
  const chapterIdx = CHAPTERS.findIndex((c) => c.id === step.chapter);

  return (
    <div ref={rootRef} onKeyDown={onKeyDown} className="relative">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Where to watch the walkthrough" className="inline-flex rounded-full border border-line bg-surface p-1 shadow-subtle">
          {[['browser', 'In your browser', Globe], ['vscode', 'Inside VS Code', Code2]].map(([v, label, Icon]) => (
            <button key={v} type="button" role="radio" aria-checked={view === v} onClick={() => setView(v)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium transition-colors duration-200 ${view === v ? 'bg-fg text-bg' : 'text-fg-2 hover:text-fg'}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />{label}
            </button>
          ))}
        </div>
        <p className="text-xs text-fg-3">Illustrative walkthrough on a sample repo</p>
      </div>

      <div ref={stageRef} className={`zd-stage shadow-float ${STAGE_SIZE}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-hidden="true">
        {view === 'browser' ? <BrowserFrame>{app}</BrowserFrame> : <VSCodeFrame stepId={step.id} liveN={scene.live?.n}>{app}</VSCodeFrame>}
        <div className="zd-spot" style={spot ? { transform: `translate(${spot.x - 6}px, ${spot.y - 6}px)`, width: spot.w + 12, height: spot.h + 12, opacity: 1 } : { opacity: 0, width: 0, height: 0 }} />
        {!reduced && <Cursor pos={cursor} clickKey={clickKey} />}
      </div>

      {/* chapters + progress */}
      <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3" role="group" aria-label="Walkthrough chapters">
        {CHAPTERS.map((c, ci) => {
          const steps = STEPS.map((s, i) => ({ s, i })).filter(({ s }) => s.chapter === c.id);
          const active = ci === chapterIdx;
          return (
            <button key={c.id} type="button" onClick={() => go(steps[0].i)} aria-current={active ? 'step' : undefined}
              className={`group min-h-11 rounded-xl px-1 pb-1 text-left transition-colors ${active ? 'text-fg' : 'text-fg-3 hover:text-fg-2'}`}>
              <span className="flex gap-1">
                {steps.map(({ i }) => (
                  <span key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
                    {i < idx && <span className="absolute inset-0 rounded-full bg-fg/70" />}
                    {i === idx && (
                      <span key={`${run}-${playing}-${inView}`} className={`absolute inset-0 rounded-full bg-fg ${playing && inView && !reduced ? 'zd-fill' : ''}`}
                        style={playing && inView && !reduced ? { animationDuration: `${step.duration}ms` } : undefined} />
                    )}
                  </span>
                ))}
              </span>
              <span className="mt-2.5 block text-[0.8125rem] font-medium sm:text-sm"><span className="mr-1.5 hidden font-mono text-[11px] text-fg-3 sm:inline">0{ci + 1}</span>{c.label}</span>
              <span className="hidden text-xs text-fg-3 md:block">{c.hint}</span>
            </button>
          );
        })}
      </div>

      {/* caption + controls */}
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-h-[5.5rem] max-w-xl" aria-live={announce ? 'polite' : 'off'} aria-atomic="true">
          <h3 key={step.id} className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl" style={{ animation: reduced ? undefined : 'zp-in .5s cubic-bezier(.2,.8,.2,1) both' }}>{step.title}</h3>
          <p key={`${step.id}-b`} className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2" style={{ animation: reduced ? undefined : 'zp-in .5s .06s cubic-bezier(.2,.8,.2,1) both' }}>{step.body}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="mr-2 font-mono text-xs tabular-nums text-fg-3" aria-label={`Step ${idx + 1} of ${STEPS.length}`}>{idx + 1} / {STEPS.length}</span>
          <button type="button" onClick={() => go(idx - 1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg-2 transition-colors hover:text-fg" aria-label="Previous step"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => { if (playing) setPlaying(false); else { setPlaying(true); setRun((r) => r + 1); setAnnounce(false); } }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-fg text-bg transition-transform active:scale-95" aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
          <button type="button" onClick={() => go(idx + 1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg-2 transition-colors hover:text-fg" aria-label="Next step"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
