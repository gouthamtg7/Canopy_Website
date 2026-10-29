import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = createApp();

let server;

async function startServer() {
  await connectDB();

  server = app.listen(PORT, () => {
    console.log(`[Server] Canopy API server active on http://localhost:${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    const timeout = setTimeout(() => process.exit(1), 10000);
    timeout.unref();
    if (server) {
      server.close(async () => {
        console.log('[Server] HTTP server closed.');
        await disconnectDB();
        process.exit(0);
      });
    } else {
      await disconnectDB();
      process.exit(0);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup failure:', err);
  process.exit(1);
});
