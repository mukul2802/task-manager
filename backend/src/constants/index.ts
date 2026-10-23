import { TaskStatus } from "../types/task";

export const DB_NAME = "task_manager";

export const TASK_STATUSES: readonly TaskStatus[] = ["Pending", "Completed"];
export const DEFAULT_TASK_STATUS: TaskStatus = "Pending";

export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

export const MESSAGES = {
  TITLE_REQUIRED: "Title is required and must be a non-empty string",
  TITLE_TOO_LONG: `Title cannot exceed ${TITLE_MAX_LENGTH} characters`,
  DESCRIPTION_INVALID: "Description must be a string",
  DESCRIPTION_TOO_LONG: `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters`,
  STATUS_INVALID: "Status must be Pending or Completed",
  UPDATE_EMPTY:
    "Provide at least one field to update: title, description or status",
  INVALID_ID: "Invalid task ID",
  TASK_NOT_FOUND: "Task not found",
  TASK_DELETED: "Task deleted successfully",
  ROUTE_NOT_FOUND: "Route not found",
  INVALID_JSON: "Invalid JSON in request body",
  SERVER_ERROR: "Internal server error",
} as const;
