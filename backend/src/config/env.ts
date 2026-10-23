import 'dotenv/config';

// All environment configuration lives here (see .env.example).
export const env = {
  PORT: Number(process.env.PORT) || 4000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task_manager',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
