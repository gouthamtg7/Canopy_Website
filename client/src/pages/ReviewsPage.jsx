import React, { useState, useEffect } from 'react';
import { MessageSquare, ExternalLink, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ReviewsPage() {
  const [reviewsData, setReviewsData] = useState({ quoteCards: [], emptyState: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Reviews & Early Feedback - Canopy';
    fetch('/api/reviews')
      .then((res) => { if (!res.ok) throw new Error('Content is temporarily unavailable. Please try again.'); return res.json(); })
      .then((data) => setReviewsData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const hasReviews = reviewsData.quoteCards && reviewsData.quoteCards.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {error && <p role="alert" className="mb-6 text-accent-red">{error}</p>}
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-subtleLight dark:bg-paper-subtleDark border border-borderLight dark:border-borderDark text-ink-mutedLight dark:text-ink-mutedDark text-xs font-mono mb-3">
          <MessageSquare className="w-3.5 h-3.5 text-accent-blue" />
          <span>Real Developer Quotes Only</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
          Reviews & Early Tester Feedback
        </h1>
        <p className="mt-3 text-sm sm:text-base text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed">
          We strictly follow a no-invented-testimonials policy. Quotes appear here only with explicit developer permission, verified public handles, and direct links to their feedback.
        </p>
      </div>

      {loading ? <p role="status">Loading…</p> : error ? null : !hasReviews ? (
        /* Empty state matching specification: "be the first" */
        <div className="max-w-2xl mx-auto my-12 p-10 rounded-2xl border border-dashed border-borderLight dark:border-borderDark bg-paper-cardLight/50 dark:bg-paper-cardDark/50 text-center">
          <div className="w-14 h-14 rounded-2xl bg-paper-subtleLight dark:bg-paper-subtleDark flex items-center justify-center text-accent-blue mx-auto mb-6 shadow-subtle">
            <Sparkles className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-bold text-ink-light dark:text-ink-dark tracking-tight mb-3">
            {reviewsData.emptyState?.title || 'Be the first.'}
          </h2>

          <p className="text-sm text-ink-mutedLight dark:text-ink-mutedDark leading-relaxed max-w-lg mx-auto mb-8">
            {reviewsData.emptyState?.description ||
              'We are onboarding early alpha testers who enjoy taking apart complex codebases. If you test Canopy on a non-trivial JS/TS project, share your honest technical feedback—warts, edge cases, and all.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/community"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-light text-paper-light hover:bg-neutral-800 dark:bg-ink-dark dark:text-ink-light dark:hover:bg-neutral-200 text-xs sm:text-sm font-semibold transition-colors shadow-elevated"
            >
              <span>{reviewsData.emptyState?.ctaText || 'Join the Early Alpha'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a
              href="https://github.com/canopy-engine/canopy/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-borderLight dark:border-borderDark text-xs font-semibold hover:border-ink-mutedLight transition-colors"
            >
              <span>Submit on GitHub Issues</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-borderLight dark:border-borderDark flex items-center justify-center gap-2 text-xs text-ink-mutedLight dark:text-ink-mutedDark">
            <ShieldCheck className="w-4 h-4 text-accent-green" />
            <span>Zero paid sponsorships • Zero fabricated blurbs</span>
          </div>
        </div>
      ) : (
        /* Render Quote Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.quoteCards.map((quote, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-borderLight dark:border-borderDark bg-paper-cardLight dark:bg-paper-cardDark flex flex-col justify-between shadow-subtle"
            >
              <div className="space-y-4">
                <p className="text-sm text-ink-light dark:text-ink-dark leading-relaxed italic">
                  "{quote.quote}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-borderLight dark:border-borderDark flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-ink-light dark:text-ink-dark">
                    {quote.name || quote.handle}
                  </div>
                  {quote.role && (
                    <div className="text-[11px] text-ink-mutedLight dark:text-ink-mutedDark">
                      {quote.role}
                    </div>
                  )}
                </div>

                {quote.sourceLink && (
                  <a
                    href={quote.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
