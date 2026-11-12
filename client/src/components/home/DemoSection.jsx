import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

const Demo = lazy(() => import('../demo/Demo'));
const STAGE_SIZE = 'h-[640px] sm:h-auto sm:aspect-[4/3] lg:aspect-[16/10]';

/** Same footprint as the demo, so loading it never shifts the page. */
function DemoPlaceholder() {
  return (
    <div aria-hidden="true">
      <div className="mb-4 flex h-12 items-center"><div className="h-12 w-[19rem] rounded-full border border-line bg-surface" /></div>
      <div className={`${STAGE_SIZE} rounded-[18px] border border-line bg-surface shadow-float`} />
      <div className="mt-6 h-[4.25rem] sm:h-[5.25rem]" />
      <div className="mt-6 min-h-[5.5rem]" />
    </div>
  );
}

export function DemoSection() {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    // Load only as it approaches the viewport (or when linked to directly): no cost for people who never scroll.
    // It always starts below the first screen, so waiting for a real scroll or interaction costs nobody anything.
    if (location.hash === '#demo') { setLoad(true); return undefined; }
    let near = false, engaged = window.scrollY > 0;
    const check = () => { if (near && engaged) { setLoad(true); cleanup(); } };
    const engage = () => { engaged = true; check(); };
    const io = new IntersectionObserver(([e]) => { near = e.isIntersecting; check(); }, { rootMargin: '500px 0px' });
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'];
    function cleanup() { io.disconnect(); events.forEach((ev) => window.removeEventListener(ev, engage)); }
    events.forEach((ev) => window.addEventListener(ev, engage, { passive: true, once: true }));
    if (ref.current) io.observe(ref.current);
    return cleanup;
  }, []);

  return (
    <section id="demo" ref={ref} aria-labelledby="demo-title" className="scroll-mt-16 py-16 sm:py-24">
      <div className="page-x">
        <div className="mb-10 max-w-2xl sm:mb-12" data-reveal>
          <p className="eyebrow">Walkthrough</p>
          <h2 id="demo-title" className="h-section mt-3">The whole loop, in one window.</h2>
          <p className="lede mt-4">It plays on its own. Take over any time: pick a chapter, step through, or swipe.</p>
        </div>
        {load ? <Suspense fallback={<DemoPlaceholder />}><Demo /></Suspense> : <DemoPlaceholder />}
      </div>
    </section>
  );
}
