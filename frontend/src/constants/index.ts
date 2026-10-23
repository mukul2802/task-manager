import type { TaskStatus } from '../types';

// Base URL of the backend API (override with VITE_API_URL in .env)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const TASK_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
} as const satisfies Record<string, TaskStatus>;

export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

export const MESSAGES = {
  TITLE_REQUIRED: 'Title is required.',
  TITLE_TOO_LONG: `Title cannot exceed ${TITLE_MAX_LENGTH} characters.`,
  DESCRIPTION_TOO_LONG: `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`,
  CONFIRM_DELETE: 'Delete this task?',
  SERVER_UNREACHABLE: 'Cannot reach the server. Is the backend running?',
  UNKNOWN_ERROR: 'Something went wrong',
} as const;
