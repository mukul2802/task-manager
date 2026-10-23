import { DESCRIPTION_MAX_LENGTH, MESSAGES, TITLE_MAX_LENGTH } from '../constants';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : MESSAGES.UNKNOWN_ERROR;
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString();
}

// Returns an error message, or an empty string when the form is valid.
export function validateTaskForm(title: string, description: string): string {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) return MESSAGES.TITLE_REQUIRED;
  if (trimmedTitle.length > TITLE_MAX_LENGTH) return MESSAGES.TITLE_TOO_LONG;
  if (description.trim().length > DESCRIPTION_MAX_LENGTH) return MESSAGES.DESCRIPTION_TOO_LONG;
  return '';
}
