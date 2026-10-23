export type TaskStatus = 'Pending' | 'Completed';

// A task as returned by the API
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

// Body sent when creating a task
export interface CreateTaskInput {
  title: string;
  description: string;
}

// Body sent when updating a task (all fields optional)
export type UpdateTaskInput = Partial<CreateTaskInput & { status: TaskStatus }>;

// Error shape returned by the API
export interface ApiError {
  message: string;
}

// Response returned after deleting a task
export interface DeleteTaskResponse {
  message: string;
  id: string;
}
