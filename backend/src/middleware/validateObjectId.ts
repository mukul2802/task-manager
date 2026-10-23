import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { MESSAGES } from '../constants';
import { TaskIdParams } from '../types/task';

// Rejects malformed IDs with 400 before any database query runs.
export function validateObjectId(req: Request<TaskIdParams>, res: Response, next: NextFunction): void {
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({ message: MESSAGES.INVALID_ID });
    return;
  }
  next();
}
