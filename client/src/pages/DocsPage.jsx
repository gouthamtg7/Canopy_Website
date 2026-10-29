import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DocsSidebar } from '../components/docs/DocsSidebar';
import { MarkdownRenderer } from '../components/docs/MarkdownRenderer';
import { ChevronRight, ArrowLeft, ArrowRight, Menu, X, ShieldAlert } from 'lucide-react';

const DOC_ORDER = [
  'quickstart',
  'concepts',
  'views-and-changes',
  'ask-ai',
  'mcp',
  'cli-reference',
  'troubleshooting',
  'privacy-telemetry',
  'known-limitations',
];

export function DocsPage() {
  const { slug = 'quickstart' } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`/api/docs/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Documentation page '${slug}' not found.`);
        }
        return res.json();
      })
      .then((data) => {
        setDoc(data);
        document.title = `${data.title || slug} - Canopy Documentation`;
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setLoading(false);
        window.scrollTo(0, 0);
      });
    return () => controller.abort();
  }, [slug]);

  // Determine Prev / Next docs
  const currentIndex = DOC_ORDER.indexOf(slug);
  const prevSlug = currentIndex > 0 ? DOC_ORDER[currentIndex - 1] : null;
  const nextSlug = currentIndex < DOC_ORDER.length - 1 ? DOC_ORDER[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Mobile Drawer Toggle */}
      <div className="md:hidden flex items-center justify-between pb-4 mb-6 border-b border-borderLight dark:border-borderDark">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="inline-flex items-center gap-2 text-xs font-medium text-ink-light dark:text-ink-dark px-3 py-1.5 rounded-lg border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Documentation Menu</span>
        </button>

        <span className="text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark">
          {slug}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <div className={`w-full md:w-64 ${mobileSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <DocsSidebar
            activeSlug={slug}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
        </div>

        {/* Main Content Area */}
        <article className="flex-1 w-full min-w-0 max-w-4xl py-2">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-ink-mutedLight dark:text-ink-mutedDark mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
              Canopy
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/docs/quickstart" className="hover:text-ink-light dark:hover:text-ink-dark transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-ink-light dark:text-ink-dark font-medium capitalize">
              {slug.replace(/-/g, ' ')}
            </span>
          </nav>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-6 h-6 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs font-mono text-ink-mutedLight dark:text-ink-mutedDark">
                Parsing markdown documentation...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-xl border border-accent-redSoft dark:border-accent-redSoftDark bg-accent-redSoft/30 dark:bg-accent-redSoftDark/30 text-center">
              <ShieldAlert className="w-8 h-8 text-accent-red mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-ink-light dark:text-ink-dark mb-1">
                Document Not Found
              </h2>
              <p className="text-xs text-ink-mutedLight dark:text-ink-mutedDark mb-4">{error}</p>
              <Link
                to="/docs/quickstart"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ink-light text-paper-light dark:bg-ink-dark dark:text-ink-light text-xs font-medium"
              >
                Return to Quickstart
              </Link>
            </div>
          ) : (
            <div>
              {/* Description summary */}
              {doc.description && (
                <div className="text-base text-ink-mutedLight dark:text-ink-mutedDark mb-6 font-normal">
                  {doc.description}
                </div>
              )}

              {/* Rendered Markdown Body */}
              <MarkdownRenderer content={doc.content} />

              {/* Bottom Pagination Links */}
              <div className="mt-16 pt-8 border-t border-borderLight dark:border-borderDark grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevSlug ? (
                  <Link
                    to={`/docs/${prevSlug}`}
                    className="p-4 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark hover:border-ink-mutedLight transition-colors flex items-center gap-3 text-left"
                  >
                    <ArrowLeft className="w-4 h-4 text-accent-blue shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark">
                        Previous Document
                      </div>
                      <div className="text-sm font-semibold capitalize text-ink-light dark:text-ink-dark">
                        {prevSlug.replace(/-/g, ' ')}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextSlug && (
                  <Link
                    to={`/docs/${nextSlug}`}
                    className="p-4 rounded-xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark hover:border-ink-mutedLight transition-colors flex items-center justify-between text-right ml-auto w-full"
                  >
                    <div>
                      <div className="text-[10px] uppercase font-mono text-ink-mutedLight dark:text-ink-mutedDark">
                        Next Document
                      </div>
                      <div className="text-sm font-semibold capitalize text-ink-light dark:text-ink-dark">
                        {nextSlug.replace(/-/g, ' ')}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-accent-blue shrink-0" />
                  </Link>
                )}
              </div>
            </div>
          )}

        </article>

      </div>
    </div>
  );
}
