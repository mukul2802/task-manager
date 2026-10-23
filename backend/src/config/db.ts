import mongoose from 'mongoose';
import { DB_NAME } from '../constants';
import { env } from './env';

export async function connectDB(): Promise<void> {
  // dbName makes sure the "task_manager" database is used even if the URI omits it.
  await mongoose.connect(env.MONGODB_URI, { dbName: DB_NAME });
  console.log(`Connected to MongoDB (database: ${DB_NAME})`);
}
