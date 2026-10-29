import express from 'express';
import mongoose from 'mongoose';
import {
  getPage,
  getClaims,
  getBenchmarks,
  getGstResults,
  getReviews,
  getSiteMetadata,
  getDocsList,
  getDocBySlug,
} from '../controllers/contentController.js';
import {
  submitEarlyTester,
  submitTeamsWaitlist,
  submitFeedback,
} from '../controllers/submissionController.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';

export const router = express.Router();

// Content endpoints (Cached & Sanitized)
router.get('/claims', getClaims);
router.get('/pages/:slug', getPage);
router.get('/benchmarks', getBenchmarks);
router.get('/gst-results', getGstResults);
router.get('/reviews', getReviews);
router.get('/site', getSiteMetadata);
router.get('/docs', getDocsList);
router.get('/docs/:slug', getDocBySlug);

// Submission endpoints (Rate-limited & Zod-validated)
router.post('/waitlist/early-testers', submissionLimiter, submitEarlyTester);
router.post('/waitlist/teams', submissionLimiter, submitTeamsWaitlist);
router.post('/feedback', submissionLimiter, submitFeedback);

// System Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    submissionsAvailable: mongoose.connection.readyState === 1,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'canopy-website-api',
  });
});
