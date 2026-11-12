import { useEffect } from 'react';
import { brand } from './brand';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

export function applySeo({ path, title, description } = {}) {
  const page = brand.pages[path] || {};
  const t = title ? `${title} · ${brand.name}` : page.title || brand.pages["/"].title;
  const d = description || page.description || brand.description;
  const url = `${brand.url}${path === "/" ? "/" : path}`;
  document.title = t;
  setMeta("name", "description", d);
  setMeta("property", "og:title", t);
  setMeta("property", "og:description", d);
  setMeta("property", "og:url", url);
  setMeta("name", "twitter:title", t);
  setMeta("name", "twitter:description", d);
  let link = document.head.querySelector("link[rel=canonical]");
  if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
  link.href = url;
}

/** Per-page title, description, canonical and social tags. Falls back to brand.pages[path]. */
export function useSeo({ path, title, description } = {}) {
  useEffect(() => { applySeo({ path, title, description }); }, [path, title, description]);
}
