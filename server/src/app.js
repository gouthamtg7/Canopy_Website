import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { router as apiRouter } from './routes/api.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { renderShell } from './seo.js';

export function createApp() {
  const app = express();

  // Secure HTTP Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: { directives: { scriptSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'"], imgSrc: ["'self'", 'data:', 'https://i.ytimg.com'], frameSrc: ['https://www.youtube-nocookie.com'], connectSrc: ["'self'"], upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null } },
    })
  );

  // CORS Configuration
  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000').split(',').map(value => value.trim()).filter(Boolean);
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        callback(Object.assign(new Error('Blocked by CORS policy'), { status: 403 }));
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key'],
      credentials: false,
    })
  );

  // Compression & Logging
  app.use(compression());
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  // Body Parsing & Global Rate Limiting
  app.use(express.json({ limit: '500kb' }));
  app.use(express.urlencoded({ extended: true, limit: '500kb' }));
  app.use('/api', globalLimiter);

  // Mount API Router
  app.use('/api', apiRouter);

  if (process.env.NODE_ENV === 'production') {
    const dist = fileURLToPath(new URL('../../client/dist/', import.meta.url));
    app.use(express.static(dist, { index: false }));
    app.get('*', async (req, res, next) => {
      if (req.path === '/api' || req.path.startsWith('/api/')) return next();
      if (/\.[a-z0-9]+$/i.test(req.path)) return next(); // a missing file is a 404, never the HTML shell
      try { res.type('html').send(await renderShell(path.join(dist, 'index.html'), req.path)); } catch (error) { next(error); }
    });
  }

  // 404 & Centralized Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
