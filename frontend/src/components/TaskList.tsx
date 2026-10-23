import { TASK_STATUS } from '../constants';
import type { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, loading, onToggle, onEdit, onDelete }: TaskListProps) {
  const completedCount = tasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;

  return (
    <section>
      <h2>
        Tasks <span className="count">({completedCount}/{tasks.length} completed)</span>
      </h2>

      {loading ? (
        <p className="muted">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks yet. Add one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
