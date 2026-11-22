import React from 'react';
import { Plus, MoreHorizontal, Calendar, Tag, Edit3, Trash2, Clock, CheckCircle2 } from 'lucide-react';

export default function BoardView({ tasks, onAddTask, onEditTask, onDeleteTask, onStatusChange }) {
  const columns = [
    { id: 'To do', title: 'To Do', color: 'indigo', border: '#6366F1' },
    { id: 'In progress', title: 'In Progress', color: 'amber', border: '#F59E0B' },
    { id: 'Completed', title: 'Done / Completed', color: 'emerald', border: '#10B981' },
  ];

  const getPriorityClass = (pr) => {
    switch (pr) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': 
      default: return 'priority-low';
    }
  };

  return (
    <div className="board-view-root">
      <div className="board-columns-container">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);

          return (
            <div key={col.id} className="board-column">
              {/* Column Header */}
              <div className="board-column-header">
                <div className="column-header-title-wrap">
                  <span className="column-indicator-dot" style={{ backgroundColor: col.border }} />
                  <h3 className="column-title">{col.title}</h3>
                  <span className="column-count-badge">{colTasks.length}</span>
                </div>
                <button
                  type="button"
                  className="board-add-col-btn"
                  onClick={onAddTask}
                  title={`Add task to ${col.title}`}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Column Cards */}
              <div className="board-column-cards">
                {colTasks.length === 0 ? (
                  <div className="board-empty-col">
                    <p>No tasks in {col.title}</p>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={onAddTask}
                    >
                      + Add a card
                    </button>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <article key={task.id} className="board-task-card">
                      <div className="board-card-top">
                        <span className="board-card-id">{task.id}</span>
                        <span className={`task-priority-badge ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="board-card-title" onClick={() => onEditTask(task)}>
                        {task.title}
                      </h4>

                      {task.description && (
                        <p className="board-card-desc">{task.description}</p>
                      )}

                      <div className="board-card-meta">
                        {task.category && (
                          <span className="board-card-cat">
                            <Tag size={11} />
                            <span>{task.category}</span>
                          </span>
                        )}
                        <span className="board-card-date">
                          <Calendar size={11} />
                          <span>{task.dueDate}</span>
                        </span>
                      </div>

                      {/* Card Actions & Move dropdown */}
                      <div className="board-card-actions">
                        <select
                          className="board-status-select"
                          value={task.status}
                          onChange={(e) => onStatusChange(task.id, e.target.value)}
                          aria-label="Move task status"
                        >
                          <option value="To do">Move: To do</option>
                          <option value="In progress">Move: In progress</option>
                          <option value="Completed">Move: Completed</option>
                        </select>

                        <div className="board-mini-btn-group">
                          <button
                            type="button"
                            className="board-mini-btn"
                            onClick={() => onEditTask(task)}
                            title="Edit task"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            className="board-mini-btn delete-mini-btn"
                            onClick={() => onDeleteTask(task)}
                            title="Delete task"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
