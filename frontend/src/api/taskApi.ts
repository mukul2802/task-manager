import type { CreateTaskInput, DeleteTaskResponse, Task, UpdateTaskInput } from '../types';
import { request } from '../utils/request';

// One function per backend endpoint
export function getTasks(): Promise<Task[]> {
  return request<Task[]>('/tasks');
}

export function createTask(input: CreateTaskInput): Promise<Task> {
  return request<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  return request<Task>(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteTask(id: string): Promise<DeleteTaskResponse> {
  return request<DeleteTaskResponse>(`/tasks/${id}`, { method: 'DELETE' });
}
