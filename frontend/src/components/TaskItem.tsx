import { TASK_STATUS } from '../constants';
import type { Task } from '../types';
import { formatDate } from '../utils/helpers';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const isCompleted = task.status === TASK_STATUS.COMPLETED;
  const statusClass = isCompleted ? 'completed' : 'pending';

  return (
    <li className={`task ${statusClass}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
      />
      <div className="task-body">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className={`status ${statusClass}`}>{task.status}</span>
        </div>
        {task.description && <p className="description">{task.description}</p>}
        <small className="muted">Created {formatDate(task.createdAt)}</small>
      </div>
      <div className="task-actions">
        <button type="button" className="btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="btn danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
