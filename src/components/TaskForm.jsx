import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  availableCategories = ['Design', 'Development', 'Testing', 'Research', 'Marketing', 'Operations']
}) {
  const isEditing = Boolean(initialData && initialData.id);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const titleInputRef = useRef(null);

  // Sync form state when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setCategory(initialData.category || 'Design');
        setStatus(initialData.status || 'To do');
        setPriority(initialData.priority || 'Medium');
        setDueDate(initialData.dueDate || '');
      } else {
        // Defaults for new task
        setTitle('');
        setDescription('');
        setCategory('Design');
        setStatus('To do');
        setPriority('Medium');
        // Default due date: tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDueDate(tomorrow.toISOString().split('T')[0]);
      }
      setErrors({});

      // Focus input after modal renders
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialData]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validation
  const validate = () => {
    const newErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Task title is required and cannot be empty.';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Task title must be at least 3 characters long.';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
      dueDate
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-content task-form-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 id="task-form-title" className="modal-title">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="modal-subtitle">
              {isEditing 
                ? `Update details for task ${initialData.id}` 
                : 'Fill in the information below to add a task to your FocusBoard.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close form modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label required-label">
              Task Title
            </label>
            <input
              ref={titleInputRef}
              type="text"
              id="task-title-input"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g., Finalize interactive prototypes for client review"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              required
              aria-required="true"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error-msg' : undefined}
            />
            {errors.title && (
              <div id="title-error-msg" className="form-error-msg">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="task-desc-input" className="form-label">
              Description <span className="label-optional">(Optional)</span>
            </label>
            <textarea
              id="task-desc-input"
              className="form-textarea"
              rows={3}
              placeholder="Add key deliverables, acceptance criteria, or relevant context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Grid row for Category, Priority, Status */}
          <div className="form-grid-3">
            {/* Category */}
            <div className="form-group">
              <label htmlFor="task-category-select" className="form-label">
                Category
              </label>
              <select
                id="task-category-select"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label htmlFor="task-priority-select" className="form-label required-label">
                Priority
              </label>
              <select
                id="task-priority-select"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="task-status-select" className="form-label required-label">
                Status
              </label>
              <select
                id="task-status-select"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Due Date Field */}
          <div className="form-group">
            <label htmlFor="task-duedate-input" className="form-label required-label">
              Due Date
            </label>
            <div className="input-with-icon">
              <Calendar size={18} className="field-icon" aria-hidden="true" />
              <input
                type="date"
                id="task-duedate-input"
                className={`form-input has-icon ${errors.dueDate ? 'input-error' : ''}`}
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
                }}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? 'date-error-msg' : undefined}
              />
            </div>
            {errors.dueDate && (
              <div id="date-error-msg" className="form-error-msg">
                <AlertCircle size={14} />
                <span>{errors.dueDate}</span>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
