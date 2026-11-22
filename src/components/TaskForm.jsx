import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Calendar, AlertCircle } from 'lucide-react';

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  availableCategories = ['Design', 'Development', 'Testing', 'Research']
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
        setTitle('');
        setDescription('');
        setCategory('Design');
        setStatus('To do');
        setPriority('Medium');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDueDate(tomorrow.toISOString().split('T')[0]);
      }
      setErrors({});

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialData]);

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
        className="modal-content pixelstrap-task-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        {/* Pixelstrap Figma Header: Back Arrow Button + Green Title */}
        <div className="pixelstrap-header">
          <button
            type="button"
            className="pixelstrap-back-btn"
            onClick={onClose}
            aria-label="Back to dashboard"
            title="Cancel and go back"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="pixelstrap-title-wrap">
            <h2 id="task-form-title" className="pixelstrap-heading">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="pixelstrap-subheading">
              Assign a clear objective and set expectations for your team.
            </p>
          </div>
        </div>

        {/* Form Card Container */}
        <form onSubmit={handleSubmit} className="pixelstrap-form-card" noValidate>
          {/* Task Title */}
          <div className="pixelstrap-form-group">
            <label htmlFor="task-title-input" className="pixelstrap-label">
              Task Title
            </label>
            <input
              ref={titleInputRef}
              type="text"
              id="task-title-input"
              className={`pixelstrap-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Follow up with Lead #402 regarding Q3 Promo"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              required
            />
            {errors.title && (
              <div className="form-error-msg">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pixelstrap-form-group">
            <label htmlFor="task-desc-input" className="pixelstrap-label">
              Description
            </label>
            <textarea
              id="task-desc-input"
              className="pixelstrap-textarea"
              rows={4}
              placeholder="Provide detailed instructions and context for this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Row: Priority Level & Initial Status */}
          <div className="pixelstrap-form-row">
            <div className="pixelstrap-form-group">
              <label htmlFor="task-priority-select" className="pixelstrap-label">
                Priority Level
              </label>
              <select
                id="task-priority-select"
                className="pixelstrap-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>

            <div className="pixelstrap-form-group">
              <label htmlFor="task-status-select" className="pixelstrap-label">
                Initial Status
              </label>
              <select
                id="task-status-select"
                className="pixelstrap-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To do">Pending / To do</option>
                <option value="In progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Category & Due Date Row */}
          <div className="pixelstrap-form-row">
            <div className="pixelstrap-form-group">
              <label htmlFor="task-category-select" className="pixelstrap-label">
                Category
              </label>
              <select
                id="task-category-select"
                className="pixelstrap-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="pixelstrap-form-group">
              <label htmlFor="task-duedate-input" className="pixelstrap-label">
                Due Date
              </label>
              <div className="pixelstrap-date-wrap">
                <Calendar size={18} className="pixelstrap-cal-icon" />
                <input
                  type="date"
                  id="task-duedate-input"
                  className={`pixelstrap-input has-icon ${errors.dueDate ? 'input-error' : ''}`}
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: null }));
                  }}
                  required
                />
              </div>
              {errors.dueDate && (
                <div className="form-error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions: Cancel (outline) + Create Task (green button) */}
          <div className="pixelstrap-footer-actions">
            <button
              type="button"
              className="pixelstrap-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="pixelstrap-create-btn"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
