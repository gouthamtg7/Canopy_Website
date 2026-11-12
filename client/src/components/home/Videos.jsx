import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import data from '@content/videos.json';
import { brand } from '../../lib/brand';

/** Loads YouTube only after a click (privacy-enhanced domain, no cookies before play). */
function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="w-[82vw] max-w-[26rem] shrink-0 snap-start sm:w-[24rem]">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-sunk shadow-subtle">
        {playing ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.id)}?autoplay=1&rel=0`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play video: ${video.title}`}>
            <img src={`https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" width="480" height="360" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent" />
            <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#22211B] shadow-elevated backdrop-blur transition-transform duration-300 group-hover:scale-105"><Play className="ml-0.5 h-5 w-5" fill="currentColor" /></span>
            {video.duration && <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-1.5 py-0.5 font-mono text-[11px] text-white">{video.duration}</span>}
          </button>
        )}
      </div>
      <figcaption className="mt-3 px-1">
        <span className="block text-[0.9375rem] font-medium leading-snug text-fg">{video.question || video.title}</span>
      </figcaption>
    </figure>
  );
}

export function Videos() {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const videos = data.videos || [];
  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const f = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    f();
    el.addEventListener('scroll', f, { passive: true });
    return () => el.removeEventListener('scroll', f);
  }, []);
  const scrollBy = (dir) => track.current?.scrollBy({ left: dir * Math.min(track.current.clientWidth * 0.8, 420), behavior: 'smooth' });
  const arrow = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg-2 transition-[color,opacity] hover:text-fg disabled:opacity-35';

  return (
    <section id="videos" aria-labelledby="videos-title" className="border-t border-line py-20 sm:py-28">
      <div className="page-x">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Videos</p>
            <h2 id="videos-title" className="h-section mt-3">Common questions, answered in a minute or two.</h2>
          </div>
          {videos.length > 0 && (
            <div className="flex gap-2">
              <button type="button" className={arrow} onClick={() => scrollBy(-1)} disabled={edge.start} aria-label="Previous videos"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" className={arrow} onClick={() => scrollBy(1)} disabled={edge.end} aria-label="Next videos"><ChevronRight className="h-4 w-4" /></button>
            </div>
          )}
        </div>

        {videos.length > 0 ? (
          <div ref={track} className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8" role="list">
            {videos.map((v) => <div role="listitem" key={v.id}><VideoCard video={v} /></div>)}
          </div>
        ) : (
          <div ref={track} className="mt-10 grid gap-6 rounded-3xl border border-dashed border-line p-6 sm:p-10 md:grid-cols-[1fr_1.3fr] md:gap-12" data-reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sunk px-3 py-1 text-xs text-fg-2"><span className="rec-dot h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />Recording</span>
              <p className="mt-5 text-xl font-semibold tracking-tight text-fg">The first videos are being recorded.</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2">They will answer these questions{brand.links.youtubeChannel ? <>, on <a className="underline decoration-line underline-offset-4 hover:text-fg" href={brand.links.youtubeChannel} target="_blank" rel="noreferrer">our channel</a></> : null}. Until then, the walkthrough above shows the whole loop.</p>
            </div>
            <ol className="divide-y divide-line">
              {(data.planned || []).map((q, i) => (
                <li key={q} className="flex items-baseline gap-4 py-3 text-[0.9375rem] text-fg-2"><span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>{q}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
