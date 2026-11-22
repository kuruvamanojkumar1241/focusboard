import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  task,
  onClose,
  onConfirm
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div 
        className="modal-content delete-modal" 
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="delete-modal-icon-wrap" aria-hidden="true">
          <AlertTriangle size={28} />
        </div>

        <h2 id="delete-dialog-title" className="delete-modal-title">
          Delete Task?
        </h2>

        <p id="delete-dialog-desc" className="delete-modal-desc">
          Are you sure you want to permanently remove <strong>"{task.title}"</strong> (ID: {task.id})? This action cannot be undone.
        </p>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(task.id)}
          >
            Yes, Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
