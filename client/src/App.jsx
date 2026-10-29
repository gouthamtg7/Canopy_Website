import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { DocsPage } from './pages/DocsPage';
import { BenchmarksPage } from './pages/BenchmarksPage';
import { GstPage } from './pages/GstPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { CommunityPage } from './pages/CommunityPage';
import { ContentPage, NotFoundPage } from './pages/ContentPage';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="docs" element={<Navigate to="/docs/quickstart" replace />} />
            <Route path="docs/:slug" element={<DocsPage />} />
            <Route path="benchmarks" element={<BenchmarksPage />} />
            <Route path="gst" element={<GstPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="community" element={<CommunityPage />} />
            {['claims', 'changelog', 'privacy', 'license', 'third-party-notices'].map(slug => <Route key={slug} path={slug} element={<ContentPage slug={slug} />} />)}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
