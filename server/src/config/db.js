import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY_MS = 2000;

export async function connectDB(uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/canopy_website') {
  let attempt = 1;

  while (attempt <= MAX_RETRIES) {
    try {
      mongoose.set('strictQuery', true);
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });

      console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

      mongoose.connection.on('error', (err) => {
        console.error('[Database] MongoDB runtime connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('[Database] MongoDB disconnected. Awaiting reconnection...');
      });

      return conn;
    } catch (error) {
      console.warn(`[Database] Connection attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`);
      if (attempt === MAX_RETRIES) {
        console.warn('[Database] Max retries reached. Server operating in graceful fallback mode.');
        return null;
      }
      const delay = INITIAL_RETRY_DELAY_MS * Math.pow(1.5, attempt - 1);
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
    }
  }
  return null;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('[Database] MongoDB connection closed cleanly.');
  }
}
