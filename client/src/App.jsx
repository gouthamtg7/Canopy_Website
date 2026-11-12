import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';

// Home is eager (it is the landing page); everything else loads on demand to keep the first load small.
const named = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })));
const DocsPage = named(() => import('./pages/DocsPage'), 'DocsPage');
const BenchmarksPage = named(() => import('./pages/BenchmarksPage'), 'BenchmarksPage');
const GstPage = named(() => import('./pages/GstPage'), 'GstPage');
const ReviewsPage = named(() => import('./pages/ReviewsPage'), 'ReviewsPage');
const CommunityPage = named(() => import('./pages/CommunityPage'), 'CommunityPage');
const ContentPage = named(() => import('./pages/ContentPage'), 'ContentPage');
const NotFoundPage = named(() => import('./pages/ContentPage'), 'NotFoundPage');

const page = (el) => <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>{el}</Suspense>;

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="docs" element={<Navigate to="/docs/quickstart" replace />} />
            <Route path="docs/:slug" element={page(<DocsPage />)} />
            <Route path="benchmarks" element={page(<BenchmarksPage />)} />
            <Route path="gst" element={page(<GstPage />)} />
            <Route path="reviews" element={page(<ReviewsPage />)} />
            <Route path="community" element={page(<CommunityPage />)} />
            {['claims', 'changelog', 'privacy', 'license', 'third-party-notices'].map((slug) => <Route key={slug} path={slug} element={page(<ContentPage slug={slug} />)} />)}
            <Route path="*" element={page(<NotFoundPage />)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
