import { Schema, model } from 'mongoose';
import {
  DEFAULT_TASK_STATUS,
  DESCRIPTION_MAX_LENGTH,
  MESSAGES,
  TASK_STATUSES,
  TITLE_MAX_LENGTH,
} from '../constants';
import { ITask } from '../types/task';

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, MESSAGES.TITLE_REQUIRED],
      trim: true,
      maxlength: [TITLE_MAX_LENGTH, MESSAGES.TITLE_TOO_LONG],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [DESCRIPTION_MAX_LENGTH, MESSAGES.DESCRIPTION_TOO_LONG],
    },
    status: {
      type: String,
      enum: { values: TASK_STATUSES, message: MESSAGES.STATUS_INVALID },
      default: DEFAULT_TASK_STATUS,
    },
  },
  // Adds createdAt and updatedAt automatically.
  { timestamps: true }
);

export const Task = model<ITask>('Task', taskSchema);
