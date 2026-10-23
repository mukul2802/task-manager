import { API_URL, MESSAGES } from '../constants';
import type { ApiError } from '../types';

// Small fetch wrapper: sends JSON and throws a readable error for non-2xx responses.
export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw new Error(MESSAGES.SERVER_UNREACHABLE);
  }

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = (data as ApiError | null)?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data as T;
}
