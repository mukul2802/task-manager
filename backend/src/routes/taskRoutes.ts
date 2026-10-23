import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '../controllers/taskController';
import { validateObjectId } from '../middleware/validateObjectId';

const router = Router();

router.get('/', getTasks);
router.get('/:id', validateObjectId, getTaskById);
router.post('/', createTask);
router.put('/:id', validateObjectId, updateTask);
router.delete('/:id', validateObjectId, deleteTask);

export default router;
