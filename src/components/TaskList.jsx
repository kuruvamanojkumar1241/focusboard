import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, PlusCircle, FilterX } from 'lucide-react';

export default function TaskList({
  tasks,
  totalCount,
  filteredCount,
  isFiltered,
  onEdit,
  onDelete,
  onStatusChange,
  onAddTask,
  onResetFilters
}) {
  if (tasks.length === 0) {
    return (
      <div className="task-empty-state" role="status">
        <div className="empty-icon-wrap">
          {isFiltered ? <FilterX size={36} /> : <ClipboardList size={36} />}
        </div>
        <h3 className="empty-title">
          {isFiltered ? 'No matching tasks found' : 'No tasks created yet'}
        </h3>
        <p className="empty-description">
          {isFiltered
            ? 'Try adjusting your search keywords, status tabs, or priority filters.'
            : 'Your board is completely clear! Click the button below to add your first task.'}
        </p>
        <div className="empty-actions">
          {isFiltered ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onResetFilters}
            >
              Clear Filters
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAddTask}
            >
              <PlusCircle size={16} />
              <span>Add Your First Task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="task-list-section" aria-label="Task List">
      <div className="task-list-meta-bar">
        <span className="task-list-count-text">
          Showing <strong>{tasks.length}</strong> of <strong>{totalCount}</strong> tasks
          {isFiltered && <span className="filtered-indicator"> (Filtered)</span>}
        </span>
      </div>

      <div className="task-items-container">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </section>
  );
}
