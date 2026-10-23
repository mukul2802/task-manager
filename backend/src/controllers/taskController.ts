import { Request, Response } from "express";
import { MESSAGES } from "../constants";
import { Task } from "../models/Task";
import { TaskIdParams, TaskRequestBody } from "../types/task";
import { validateTaskBody } from "../utils/validateTask";

// GET /api/tasks - get all tasks (newest first)
export async function getTasks(_req: Request, res: Response): Promise<void> {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json(tasks);
}

// GET /api/tasks/:id - get one task
export async function getTaskById(
  req: Request<TaskIdParams>,
  res: Response,
): Promise<void> {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404).json({ message: MESSAGES.TASK_NOT_FOUND });
    return;
  }
  res.status(200).json(task);
}

// POST /api/tasks - create a task
export async function createTask(
  req: Request<object, unknown, TaskRequestBody>,
  res: Response,
): Promise<void> {
  const result = validateTaskBody(req.body, false);
  if ("error" in result) {
    res.status(400).json({ message: result.error });
    return;
  }

  const task = await Task.create(result.data);
  res.status(201).json(task);
}

// PUT /api/tasks/:id - update a task
export async function updateTask(
  req: Request<TaskIdParams, unknown, TaskRequestBody>,
  res: Response,
): Promise<void> {
  const result = validateTaskBody(req.body, true);
  if ("error" in result) {
    res.status(400).json({ message: result.error });
    return;
  }

  const task = await Task.findByIdAndUpdate(req.params.id, result.data, {
    returnDocument: "after", // return the updated document
    runValidators: true, // apply schema rules on update too
  });
  if (!task) {
    res.status(404).json({ message: MESSAGES.TASK_NOT_FOUND });
    return;
  }
  res.status(200).json(task);
}

// DELETE /api/tasks/:id - delete a task
export async function deleteTask(
  req: Request<TaskIdParams>,
  res: Response,
): Promise<void> {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    res.status(404).json({ message: MESSAGES.TASK_NOT_FOUND });
    return;
  }
  res.status(200).json({ message: MESSAGES.TASK_DELETED, id: req.params.id });
}
