import React from 'react';
import data from '@content/reviews.json';
import { ReviewCard, NoReviewsYet } from '../components/home/Reviews';

export function ReviewsPage() {
  const reviews = data.reviews || [];
  return (
    <section className="page-x py-16 sm:py-24">
      <p className="eyebrow">Reviews</p>
      <h1 className="h-section mt-3 max-w-2xl">From people who ran it on their own code.</h1>
      <p className="lede mt-4 max-w-2xl">Every review here is real and posted with permission. No invented quotes, ratings or numbers.</p>
      {reviews.length > 0
        ? <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{reviews.map((r) => <ReviewCard key={r.quote} review={r} />)}</div>
        : <NoReviewsYet className="mt-12" />}
    </section>
  );
}
