import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import data from '@content/reviews.json';
import { formHref, isExternal } from '../../lib/brand';

export function ReviewCard({ review }) {
  return (
    <figure className="card flex h-full flex-col justify-between p-6 sm:p-7">
      <blockquote className="text-[1.0625rem] leading-relaxed text-fg">“{review.quote}”</blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-medium text-fg">{review.name}</span>
        {review.role && <span className="text-fg-3"> · {review.role}</span>}
        {review.link && <a className="ml-2 text-fg-3 underline decoration-line underline-offset-4 hover:text-fg" href={review.link} target="_blank" rel="noreferrer">source</a>}
      </figcaption>
    </figure>
  );
}

export function NoReviewsYet({ className = '' }) {
  const href = formHref('feedback');
  return (
    <div className={`flex flex-col items-start gap-5 rounded-3xl border border-dashed border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10 ${className}`}>
      <div>
        <p className="text-xl font-semibold tracking-tight text-fg">No reviews yet.</p>
        <p className="mt-1.5 text-[0.9375rem] text-fg-2">We only publish real ones.</p>
      </div>
      <a href={href} {...(isExternal(href) ? { target: '_blank', rel: 'noreferrer' } : {})} className="btn border border-line bg-surface text-fg shadow-subtle hover:border-fg-3/40">
        Tried it? Tell us how it went <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export function Reviews() {
  const reviews = data.reviews || [];
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-line py-20 sm:py-28">
      <div className="page-x">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Reviews</p>
          <h2 id="reviews-title" className="h-section mt-3">From people who ran it on their own code.</h2>
        </div>
        {reviews.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{reviews.map((r) => <ReviewCard key={r.quote} review={r} />)}</div>
        ) : (
          <NoReviewsYet className="mt-10" />
        )}
      </div>
    </section>
  );
}
