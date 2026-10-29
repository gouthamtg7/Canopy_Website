import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarkdownRenderer } from '../components/docs/MarkdownRenderer';

export function ContentPage({ slug }) {
  const [state, setState] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    setState({});
    fetch(`/api/pages/${slug}`, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('This page is temporarily unavailable. Please try again.');
      return response.json();
    }).then(data => { setState(data); document.title = `${data.title} - Canopy`; })
      .catch(error => { if (error.name !== 'AbortError') setState({ error: error.message }); });
    return () => controller.abort();
  }, [slug]);
  return <article className="max-w-4xl mx-auto px-6 py-12">{state.error ? <p role="alert">{state.error}</p> : state.content ? <MarkdownRenderer content={state.content} /> : <p role="status">Loading…</p>}</article>;
}
export function NotFoundPage() {
  useEffect(() => { document.title = 'Page not found - Canopy'; }, []);
  return <section className="max-w-4xl mx-auto px-6 py-24"><h1 className="text-4xl font-bold">404 — Page not found</h1><p className="my-6">This page does not exist.</p><Link className="text-accent-blue underline" to="/">Return home</Link></section>;
}
