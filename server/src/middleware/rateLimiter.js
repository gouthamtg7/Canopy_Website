import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // max 300 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests',
    message: 'Too many requests from this IP address. Please try again after 15 minutes.',
  },
});

export const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // max 20 submissions per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many submissions',
    message: 'Submission rate limit reached. Please wait before submitting another request.',
  },
});
