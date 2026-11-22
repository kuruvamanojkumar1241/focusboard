import React from 'react';
import { 
  Calendar, 
  Tag, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Circle,
  AlertCircle 
} from 'lucide-react';

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) {
  const { id, title, description, category, status, priority, dueDate } = task;

  // Format date readable
  const formattedDate = dueDate ? new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dueDate + 'T00:00:00')) : 'No date';

  // Check if overdue
  const isOverdue = dueDate && status !== 'Completed' && new Date(dueDate + 'T23:59:59') < new Date();

  // Status icon helper
  const renderStatusIcon = () => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 size={15} className="status-svg completed-svg" />;
      case 'In progress':
        return <Clock size={15} className="status-svg in-progress-svg" />;
      case 'To do':
      default:
        return <Circle size={15} className="status-svg todo-svg" />;
    }
  };

  const getStatusClass = (st) => {
    switch (st) {
      case 'Completed': return 'status-completed';
      case 'In progress': return 'status-in-progress';
      case 'To do': 
      default: return 'status-todo';
    }
  };

  const getPriorityClass = (pr) => {
    switch (pr) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': 
      default: return 'priority-low';
    }
  };

  return (
    <article className={`task-card ${status === 'Completed' ? 'is-completed' : ''}`} aria-labelledby={`task-title-${id}`}>
      <div className="task-card-main">
        {/* Quick status toggle button / indicator */}
        <button
          type="button"
          className={`task-quick-toggle ${status === 'Completed' ? 'checked' : ''}`}
          onClick={() => {
            const nextStatus = status === 'Completed' ? 'To do' : status === 'To do' ? 'In progress' : 'Completed';
            onStatusChange(id, nextStatus);
          }}
          aria-label={`Mark task status (currently ${status})`}
          title={`Click to cycle status from ${status}`}
        >
          {renderStatusIcon()}
        </button>

        {/* Task info block */}
        <div className="task-content-block">
          <div className="task-top-meta">
            <span className="task-id">{id}</span>
            {category && (
              <span className="task-category-badge">
                <Tag size={12} />
                <span>{category}</span>
              </span>
            )}
            <span className={`task-priority-badge ${getPriorityClass(priority)}`}>
              {priority}
            </span>
          </div>

          <h3 id={`task-title-${id}`} className="task-title">
            {title}
          </h3>

          {description && (
            <p className="task-description">{description}</p>
          )}

          <div className="task-bottom-meta">
            {/* Due date */}
            <div className={`task-date-pill ${isOverdue ? 'date-overdue' : ''}`}>
              <Calendar size={13} />
              <span>{formattedDate}</span>
              {isOverdue && <span className="overdue-tag">Overdue</span>}
            </div>

            {/* Status Selector Dropdown */}
            <div className="task-status-selector-wrap">
              <label htmlFor={`status-select-${id}`} className="visually-hidden">Change status for {title}</label>
              <select
                id={`status-select-${id}`}
                className={`task-status-select ${getStatusClass(status)}`}
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value)}
                aria-label={`Status for task: ${title}`}
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons (Edit & Delete) */}
      <div className="task-actions" role="group" aria-label={`Actions for ${title}`}>
        <button
          type="button"
          className="task-action-btn edit-btn"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${title}`}
          title="Edit Task"
        >
          <Edit3 size={16} />
        </button>
        <button
          type="button"
          className="task-action-btn delete-btn"
          onClick={() => onDelete(task)}
          aria-label={`Delete task: ${title}`}
          title="Delete Task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
