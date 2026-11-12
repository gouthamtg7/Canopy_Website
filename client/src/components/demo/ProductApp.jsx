import React, { useLayoutEffect, useRef, useState } from 'react';
import { Home, ChevronLeft, ChevronRight, Code, Workflow, Search, History, Network, Sparkles, Ellipsis, X, ArrowUp, Plus, Maximize2, FileCode2 } from 'lucide-react';
import { brand } from '../../lib/brand';
import { REPO, CAMERAS, LIVE_FEED, LIVE_TASKS, ASK_Q, EDIT_Q } from './script';

/* A recreation of the product viewer, driven entirely by `scene`. Illustrative sample repo. */

const SCENE_W = 960, SCENE_H = 600;

function useCamera(scene, canvasRef, appRef) {
  const [tf, setTf] = useState('translate(0px,0px) scale(0.8)');
  useLayoutEffect(() => {
    const canvas = canvasRef.current, app = appRef.current;
    if (!canvas || !app) return undefined;
    const compute = () => {
      const cw = canvas.clientWidth, ch = canvas.clientHeight, aw = app.clientWidth;
      if (!cw || !ch) return;
      const mode = aw < 560 ? 'compact' : aw < 860 ? 'medium' : 'wide';
      let vx = 0, vy = 0, vw = cw, vh = ch;
      const panelOpen = !!scene.panel;
      if (panelOpen) {
        if (mode === 'compact') vh = ch * 0.3 - 6;
        else vw = cw - (mode === 'wide' ? 380 : 320);
      }
      if (scene.live) {
        if (mode === 'compact') vh = ch - 236;
        else { vx = mode === 'wide' ? 350 : 310; vw = cw - vx; }
      }
      const cam = CAMERAS[mode === 'compact' && scene.camera === 'flow' && !scene.live ? 'flowFn' : scene.camera] || CAMERAS.system;
      const pad = mode === 'compact' ? 0.96 : 0.9;
      const s = Math.min((vw / cam.w) * pad, (vh / cam.h) * pad, 1.15);
      const tx = vx + vw / 2 - (cam.x + cam.w / 2) * s;
      const ty = vy + vh / 2 - (cam.y + cam.h / 2) * s;
      setTf(`translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${s.toFixed(4)})`);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [scene.camera, scene.panel, !!scene.live, scene.sideCollapsed, canvasRef, appRef]);
  return tf;
}

function TopBar({ scene }) {
  const p = scene.panel;
  return (
    <div className="zp-top">
      <span className="zp-ib"><Home size={15} /></span>
      <span className="zp-ib zp-hide-m"><ChevronLeft size={15} /></span>
      <span className="zp-ib zp-hide-m" style={{ opacity: 0.5 }}><ChevronRight size={15} /></span>
      <span className="zp-crumb">{REPO.name}</span>
      <div className="zp-top-r">
        <span className="zp-seg view zp-hide-m"><span className="on"><Code size={13} /><span className="t">Codebase</span></span><span><Workflow size={13} /><span className="t">Runtime</span></span></span>
        <span className="zp-seg dims"><span className="on">2D</span><span>3D</span></span>
        <span className="zp-ib zp-hide-m"><Search size={15} /></span>
        <span className={`zp-tb ${p === 'changes' ? 'on' : ''}`} data-t="btn-changes"><History /><span className="t">Changes</span>{scene.changed && <span className="zp-badge">1</span>}</span>
        <span className={`zp-tb ${scene.live ? 'live-on' : ''}`} data-t="btn-live"><span className="zp-live-dot" /><span className="t">Live</span></span>
        <span className={`zp-tb ${p === 'mental' ? 'on' : ''}`} data-t="btn-mental"><Network /><span className="t">Mental Model</span></span>
        <span className={`zp-tb ${p === 'ask' ? 'on' : ''}`} data-t="btn-ask"><Sparkles /><span className="t">Ask AI</span></span>
        <span className="zp-ib zp-hide-m"><Ellipsis size={15} /></span>
      </div>
    </div>
  );
}

function Sidebar({ scene }) {
  return (
    <aside className="zp-side" aria-hidden="true">
      <h6>Workflows</h6>
      <div className="zp-stories">Stories <span className="zp-count">{REPO.stories}</span></div>
      <div className="zp-filter">Filter entry points</div>
      <div className="zp-grp"><span className="zp-sq" style={{ background: 'var(--p-server)' }} />{REPO.server} <span className="zp-count" style={{ marginLeft: 'auto' }}>{REPO.serverStories}</span></div>
      <div className="zp-list">
        {REPO.sidebar.map((g) => (
          <div key={g.folder}>
            <div className="zp-fold"><span>▾ {g.folder}</span><span className="zp-mono">{g.items.length}</span></div>
            {g.items.map((it) => (
              <div key={it.route} className={`zp-item ${scene.sel === it.id ? 'on' : ''}`} data-t={`side-${it.id}`}><b>{it.route}</b><i>{it.fn}</i></div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

function SystemScene({ scene }) {
  const on = scene.view === 'system';
  return (
    <div style={{ opacity: on ? 1 : 0, transition: 'opacity .6s', pointerEvents: 'none' }} aria-hidden={!on}>
      <svg width={SCENE_W} height={SCENE_H} style={{ position: 'absolute', inset: 0 }}><path d="M480 212 V 338" stroke="#4a6480" strokeWidth="2.5" strokeDasharray="7 6" fill="none" /><path d="M472 332 l8 8 l8 -8" stroke="#4a6480" strokeWidth="2.5" fill="none" /></svg>
      <div className="zp-svc" style={{ left: 355, top: 100 }} data-t="node-web"><span className="zp-tag" style={{ background: 'var(--p-plum-bg)', color: 'var(--p-plum)' }}>CLIENT</span><h5>{REPO.client}</h5><p>14 workflows · 52 functions</p></div>
      <span className="zp-edge-lbl" style={{ left: 437, top: 264 }}>4 · crossLayer</span>
      <div className="zp-svc" style={{ left: 355, top: 340 }} data-t="node-api"><span className="zp-tag" style={{ background: '#f3e3ec', color: '#8a3f68' }}>SERVER</span><h5>{REPO.server}</h5><p>{REPO.serverStories} workflows · 41 functions</p><span className="zp-tag" style={{ marginTop: 10, background: 'var(--p-cross-bg)', color: 'var(--p-cross)', fontWeight: 500 }}>PostgreSQL</span></div>
    </div>
  );
}

function FlowScene({ scene }) {
  const on = scene.view === 'flow';
  const blast = scene.blast;
  const lv = scene.live?.glow || {};
  const fnCls = ['zp-fn', blast ? 'zp-hit' : '', lv.createOrder === 'edit' ? 'zp-edit' : '', scene.changed && !scene.live ? 'zp-changed' : ''].join(' ');
  const calcCls = ['zp-fn', blast ? 'zp-dim' : '', lv.calculateTotal === 'read' ? 'zp-read' : ''].join(' ');
  return (
    <div style={{ opacity: on ? 1 : 0, transition: 'opacity .6s .15s', pointerEvents: 'none' }} aria-hidden={!on}>
      <svg width={SCENE_W} height={SCENE_H} style={{ position: 'absolute', inset: 0 }}>
        <path d="M235 70 V 104" stroke="#c8892e" strokeWidth="2.5" fill="none" /><path d="M228 98 l7 8 l7 -8" stroke="#c8892e" strokeWidth="2.5" fill="none" />
        <path d={`M560 ${scene.added ? 278 : 256} C 610 ${scene.added ? 278 : 256}, 612 232, 668 232`} stroke="#4a6480" strokeWidth="2" strokeDasharray="5 5" fill="none" style={{ transition: 'd .6s' }} />
      </svg>
      <div className={`zp-route ${blast ? 'zp-hit' : ''}`} style={{ left: 120, top: 30, outline: '2px solid transparent', outlineOffset: 4, transition: 'box-shadow .5s, outline-color .5s' }} data-t="node-route"><span className="zp-tag">ROUTE</span>POST /api/orders</div>
      <div className={fnCls} style={{ left: 30, top: 110, width: 540 }} data-t="node-fn">
        {scene.changed && !scene.live && <span className="zp-chg-chip">changed</span>}
        <div className="zp-fn-h"><span className="zp-num">#1</span>createOrder<span className="zp-tag" style={{ marginLeft: 'auto', background: 'var(--p-server-bg)', color: 'var(--p-server)', fontSize: 8.5 }}>BACKEND</span></div>
        <div className="zp-fn-path">server/src/routes/orders.js</div>
        <span className="zp-from">Called from {REPO.client}: pages/Checkout.jsx</span>
        <div className="zp-bk">
          <div className="zp-bk-h"><span className="zp-tag">TRY / CATCH</span>try / catch</div>
          <div className="zp-ln"><span className="zp-lbl">TRY →</span>orderSchema.parse(req.body)</div>
          {scene.added && <div className="zp-ln add">if (!items.length) return res.status(400).json(…)</div>}
          <div className="zp-ln">const total = calculateTotal(items, req.user)</div>
          <div className="zp-ln">await Order.create({'{'} ...data, total {'}'})</div>
          <div className="zp-ln">res.status(201).json(order)</div>
          <div className="zp-ln"><span className="zp-lbl">CATCH →</span>next(error)</div>
        </div>
      </div>
      <div className={calcCls} style={{ left: 668, top: 196, width: 262, borderWidth: 2 }} data-t="node-calc">
        <div className="zp-fn-h"><span className="zp-num">#2</span>calculateTotal</div>
        <div className="zp-fn-path">server/src/lib/pricing.js</div>
        <div className="zp-ln">items.reduce(sumLine, 0)</div>
        <div className="zp-ln">applyDiscount(sum, user)</div>
        <div className="zp-ln">return Math.round(total)</div>
      </div>
    </div>
  );
}

function Composer({ placeholder, typed, ready }) {
  return (
    <div className="zp-input" data-t="composer">
      {typed ? <span>{typed}<span className="zp-caret" /></span> : <span className="ph">{placeholder}</span>}
      <span className={`zp-send ${ready ? 'ready' : ''}`} data-t="send"><ArrowUp size={13} /></span>
    </div>
  );
}

function NodePanel({ scene }) {
  return (
    <div className="zp-panel" data-t="panel">
      <div className="zp-ph">createOrder<X size={15} className="zp-x" /></div>
      <div className="zp-sub">server/src/routes/orders.js:24</div>
      <div className="zp-pb">
        <span className="zp-pill">Explain with your AI</span>
        <span className={`zp-pill ${scene.blast ? 'on' : ''}`} data-t="btn-blast">What breaks if I change this?</span>
        {scene.blast && (
          <>
            <div className="zp-small">3 affected: 2 direct, 1 indirect, 1 in other services (2 services). At least these; runtime or dynamic calls may be missed.</div>
            <div className="zp-h">Direct callers <span className="zp-count">2</span></div>
            <div className="zp-row"><div className="zp-row-t">submitCheckout<span className="zp-chip svc">OTHER SERVICE</span><span className="zp-chip inf">INFERRED</span></div><div className="zp-row-p">client/src/pages/Checkout.jsx:41 · {REPO.client}</div></div>
            <div className="zp-row" style={{ animationDelay: '.08s' }}><div className="zp-row-t">(file top level)<span className="zp-chip">RESOLVED</span></div><div className="zp-row-p">server/src/routes/index.js · {REPO.server}</div></div>
            <div className="zp-h">Indirect callers <span className="zp-count">1</span></div>
            <div className="zp-row" style={{ animationDelay: '.16s' }}><div className="zp-row-t">retryPayment<span className="zp-chip ex">EXACT</span></div><div className="zp-row-p">server/src/jobs/retry.js:12 · {REPO.server}</div></div>
            <div className="zp-h">May be missed <span className="zp-count">0</span></div>
          </>
        )}
      </div>
    </div>
  );
}

function MentalPanel({ scene }) {
  const chain = REPO.chain.slice(0, scene.mmChain ?? REPO.chain.length);
  const ai = scene.mmMode === 'ai';
  return (
    <div className="zp-panel" data-t="panel">
      <div className="zp-ph">Mental Model
        <span className="zp-tabs" style={{ marginLeft: 6, fontWeight: 400 }}><span className={ai ? '' : 'on'}>Deterministic</span><span className={ai ? 'on' : ''} data-t="mm-ai">AI</span></span>
        <Maximize2 size={14} className="zp-x" style={{ color: 'var(--p-dim)' }} /><X size={15} style={{ color: 'var(--p-dim)' }} />
      </div>
      <div className="zp-pb">
        <div className="zp-chain">
          {chain.map((c, i) => (
            <React.Fragment key={c.t}>
              {i > 0 && <span className={`zp-link ${ai && c.ai ? 'ai' : ''}`} style={{ opacity: !ai && c.ai ? 0.25 : 1 }} />}
              <div className={`zp-mm ${i === 0 || i === REPO.chain.length - 1 ? 'end' : ''}`} style={{ animationDelay: `${i * 0.05}s` }}>{c.t}<small>{c.s}</small></div>
            </React.Fragment>
          ))}
        </div>
        <div className="zp-legend"><span><i />Found in your code</span><span><i className="ai" />Connected by AI, checked in code</span></div>
        <div className="zp-se"><span className="set">Start: Checkout button</span><span className="set">End: Order.create</span></div>
      </div>
    </div>
  );
}

function AskPanel({ scene }) {
  const a = scene.ask || {};
  const edit = a.mode === 'edit';
  return (
    <div className="zp-panel" data-t="panel">
      <div className="zp-ph"><Sparkles size={15} style={{ color: 'var(--p-cross)' }} />Ask AI<span className="zp-x" style={{ display: 'flex', gap: 12 }}><History size={14} /><Plus size={14} /><X size={15} /></span></div>
      <div className="zp-pb">
        {!a.sent && (
          <div className="zp-empty">
            <b>{edit ? 'What should change?' : 'What would you like to know?'}</b>
            <span className="zp-small">{edit ? 'Describe a small change. You see what depends on it before anything is written.' : 'Ask about your code in plain words. You get a short answer and a list of places in the map you can click.'}</span>
          </div>
        )}
        {a.sent && !edit && (
          <>
            <div className="zp-q">{ASK_Q}</div>
            {a.answered && (
              <>
                <div className="zp-a">The total is worked out in <code>calculateTotal</code>, which <code>createOrder</code> calls right before <code>Order.create</code>. Discounts are applied there too.</div>
                <div className="zp-place" style={{ animationDelay: '.1s' }} data-t="place-calc"><FileCode2 size={13} />calculateTotal<span>lib/pricing.js:8</span></div>
                <div className="zp-place" style={{ animationDelay: '.18s' }}><FileCode2 size={13} />createOrder<span>routes/orders.js:24</span></div>
              </>
            )}
          </>
        )}
        {a.sent && edit && (
          <>
            <div className="zp-q">{EDIT_Q}</div>
            {a.answered && (
              <>
                <div className="zp-h" style={{ animation: 'zp-in .4s both' }}>Change part of createOrder</div>
                <div className="zp-diff" style={{ animation: 'zp-in .4s .05s both' }}>
                  <div className="c">  const data = orderSchema.parse(req.body);</div>
                  <div className="a">+ if (!data.items.length) return res.status(400)…</div>
                  <div className="c">  const total = calculateTotal(items, req.user);</div>
                </div>
                <div className="zp-small" style={{ animation: 'zp-in .4s .1s both' }}><b style={{ color: 'var(--p-ink)' }}>Before you allow this: what depends on it.</b> 3 affected, 1 in another service ({REPO.client}).</div>
                <div className="zp-btns" style={{ animation: 'zp-in .4s .15s both' }}>
                  <span className={`zp-btn pri ${a.allowed ? 'done' : ''}`} data-t="allow">{a.allowed ? 'Allowed ✓' : 'Allow once'}</span>
                  <span className="zp-btn">Allow for this session</span>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="zp-composer">
        <div className="zp-tabs" style={{ width: 120, marginBottom: 8 }}><span className={edit ? '' : 'on'}>Ask</span><span className={edit ? 'on' : ''} data-t="tab-edit">Edit</span></div>
        <Composer placeholder={edit ? 'Describe a small change, e.g. rename count to total' : 'What do you want to find or understand?'} typed={a.sent ? '' : a.typed} ready={!!a.typed && !a.sent} />
        <div className="zp-foot">Uses your own Ask AI login. {brand.productUiName} never sees your credentials.</div>
      </div>
    </div>
  );
}

function ChangesPanel() {
  return (
    <div className="zp-panel" data-t="panel">
      <div className="zp-ph"><History size={15} />Changes<span className="zp-x"><X size={15} /></span></div>
      <div className="zp-pb">
        <div className="zp-tabs"><span className="on">Working <span className="zp-badge" style={{ position: 'static', display: 'inline-block', marginLeft: 4 }}>1</span></span><span>Since visit</span><span>Commits</span></div>
        <div className="zp-small">1 file · 1 function</div>
        <div className="zp-row-p" style={{ marginTop: -4 }}>server/src/routes/orders.js</div>
        <div className="zp-row" data-t="chg-fn" style={{ alignSelf: 'flex-start', borderColor: '#c4332a' }}><div className="zp-row-t">createOrder <span className="zp-count">+1</span></div></div>
        <div className="zp-h">Could be affected <span className="zp-count">2</span></div>
        <div className="zp-row" style={{ animationDelay: '.08s' }}><div className="zp-row-t">submitCheckout</div><div className="zp-row-p">client/src/pages/Checkout.jsx · {REPO.client}</div></div>
        <div className="zp-row" style={{ animationDelay: '.16s' }}><div className="zp-row-t">(file top level)</div><div className="zp-row-p">server/src/routes/index.js · {REPO.server}</div></div>
      </div>
    </div>
  );
}

function LiveHud({ scene }) {
  const l = scene.live;
  const n = l.n || 0;
  const done = Math.min(LIVE_TASKS.length, l.tasksDone || 0);
  const feed = LIVE_FEED.slice(0, n);
  const now = feed[feed.length - 1];
  return (
    <div className="zp-hud" data-t="hud">
      <div className="zp-hud-h"><span className={`zp-hud-dot ${l.ended ? 'ended' : ''}`} /><b>Claude Code</b><span style={{ color: '#7fa38d' }}>· {l.ended ? 'turn ended' : 'working'}</span><X size={14} style={{ marginLeft: 'auto', color: '#9cc1aa' }} /></div>
      <div className="zp-hud-b">
        <div><span className="zp-now-k">NOW</span><span className="zp-now-t">{now ? now.now : 'Starting…'}</span><div className="zp-intent">{EDIT_Q}</div></div>
        <div>
          <div className="zp-bar" role="presentation"><i style={{ width: `${(done / LIVE_TASKS.length) * 100}%` }} /></div>
          <div className="zp-cnt" style={{ marginTop: 4 }}><span>{done} of {LIVE_TASKS.length}</span><span>{LIVE_TASKS[Math.min(done, LIVE_TASKS.length - 1)]}</span></div>
        </div>
        <div className="zp-feed">{feed.map((f, i) => <div key={i}><em className={f.kind === 'edit' ? 'e' : ''}>{f.kind}</em>{f.text}</div>)}</div>
      </div>
    </div>
  );
}

export function ProductApp({ scene, reduced }) {
  const canvasRef = useRef(null), appRef = useRef(null);
  const tf = useCamera(scene, canvasRef, appRef);
  return (
    <div ref={appRef} className={`zp-app ${reduced ? 'zp-reduced' : ''}`}>
      <TopBar scene={scene} />
      <div className={`zp-body ${scene.sideCollapsed ? 'collapsed' : ''}`}>
        <Sidebar scene={scene} />
        <div ref={canvasRef} className="zp-canvas" data-t="canvas">
          <div className="zp-scene" style={{ transform: tf }}>
            <SystemScene scene={scene} />
            <FlowScene scene={scene} />
          </div>
          <div className="zp-zoom" aria-hidden="true"><span>+</span><span>−</span><span>⛶</span></div>
          <div className={`zp-toast ${scene.toast ? 'on' : ''} ${scene.panel ? 'shift' : ''}`}>{scene.toast || ' '}</div>
          {scene.panel === 'node' && <NodePanel scene={scene} />}
          {scene.panel === 'mental' && <MentalPanel scene={scene} />}
          {scene.panel === 'ask' && <AskPanel scene={scene} />}
          {scene.panel === 'changes' && <ChangesPanel />}
          {scene.live && <LiveHud scene={scene} />}
        </div>
      </div>
    </div>
  );
}
