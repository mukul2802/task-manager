export type TaskStatus = 'Pending' | 'Completed';

// Shape of a task document stored in MongoDB
export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Raw request body. Values are unknown until validated.
export interface TaskRequestBody {
  title?: unknown;
  description?: unknown;
  status?: unknown;
}

// Validated fields that are safe to save
export interface TaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskIdParams {
  id: string;
}

export type ValidationResult = { error: string } | { data: TaskInput };
