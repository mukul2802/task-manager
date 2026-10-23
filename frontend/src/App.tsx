import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import * as taskApi from "./api/taskApi";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { MESSAGES, TASK_STATUS } from "./constants";
import type { Task } from "./types";
import { getErrorMessage, validateTaskForm } from "./utils/helpers";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");

  // Load all tasks once when the page opens.
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setTasks(await taskApi.getTasks());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const replaceTask = (updated: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updated._id ? updated : task)),
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setFormError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateTaskForm(title, description);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const input = { title: title.trim(), description: description.trim() };
    setSubmitting(true);
    setError("");
    try {
      if (editingId) {
        replaceTask(await taskApi.updateTask(editingId, input));
      } else {
        const created = await taskApi.createTask(input);
        setTasks((prev) => [created, ...prev]);
      }
      resetForm();
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setFormError("");
  };

  const handleToggle = async (task: Task) => {
    const status =
      task.status === TASK_STATUS.COMPLETED
        ? TASK_STATUS.PENDING
        : TASK_STATUS.COMPLETED;
    setError("");
    try {
      replaceTask(await taskApi.updateTask(task._id, { status }));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(MESSAGES.CONFIRM_DELETE)) return;
    setError("");
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <main className="container">
      <h1>Task Manager</h1>

      <TaskForm
        title={title}
        description={description}
        isEditing={editingId !== null}
        submitting={submitting}
        error={formError}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {error && <p className="error banner">{error}</p>}

      <TaskList
        tasks={tasks}
        loading={loading}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;
