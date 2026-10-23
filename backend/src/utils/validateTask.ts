import {
  DESCRIPTION_MAX_LENGTH,
  MESSAGES,
  TASK_STATUSES,
  TITLE_MAX_LENGTH,
} from "../constants";
import {
  TaskInput,
  TaskRequestBody,
  TaskStatus,
  ValidationResult,
} from "../types/task";

function isTaskStatus(value: unknown): value is TaskStatus {
  return TASK_STATUSES.includes(value as TaskStatus);
}

export function validateTaskBody(
  body: TaskRequestBody | undefined,
  partial: boolean,
): ValidationResult {
  const { title, description, status } = body ?? {};
  const data: TaskInput = {};

  if (title !== undefined || !partial) {
    if (typeof title !== "string" || title.trim() === "") {
      return { error: MESSAGES.TITLE_REQUIRED };
    }
    if (title.trim().length > TITLE_MAX_LENGTH) {
      return { error: MESSAGES.TITLE_TOO_LONG };
    }
    data.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      return { error: MESSAGES.DESCRIPTION_INVALID };
    }
    if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
      return { error: MESSAGES.DESCRIPTION_TOO_LONG };
    }
    data.description = description.trim();
  }

  if (status !== undefined) {
    if (!isTaskStatus(status)) {
      return { error: MESSAGES.STATUS_INVALID };
    }
    data.status = status;
  }

  if (partial && Object.keys(data).length === 0) {
    return { error: MESSAGES.UPDATE_EMPTY };
  }

  return { data };
}
