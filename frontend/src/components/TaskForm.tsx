import type { FormEvent } from 'react';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants';

interface TaskFormProps {
  title: string;
  description: string;
  isEditing: boolean;
  submitting: boolean;
  error: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

function TaskForm({
  title,
  description,
  isEditing,
  submitting,
  error,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const submitLabel = submitting ? 'Saving...' : isEditing ? 'Update Task' : 'Add Task';

  return (
    <form className="task-form" onSubmit={onSubmit} noValidate>
      <h2>{isEditing ? 'Edit Task' : 'New Task'}</h2>

      <label htmlFor="title">Title *</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="What needs to be done?"
        maxLength={TITLE_MAX_LENGTH}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Optional details"
        rows={3}
        maxLength={DESCRIPTION_MAX_LENGTH}
      />

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={submitting}>
          {submitLabel}
        </button>
        {isEditing && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
