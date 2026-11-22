import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  categories = [],
  counts = { all: 0, todo: 0, inProgress: 0, completed: 0 },
  onResetFilters,
  isFiltered
}) {
  const tabs = [
    { id: 'All', label: 'All', count: counts.all },
    { id: 'To do', label: 'To Do', count: counts.todo },
    { id: 'In progress', label: 'In Progress', count: counts.inProgress },
    { id: 'Completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="filter-controls-bar">
      {/* Status Segmented Tabs */}
      <div className="status-tabs-group" role="tablist" aria-label="Filter tasks by status">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onStatusChange(tab.id)}
            >
              <span>{tab.label}</span>
              <span className={`tab-count-pill ${isActive ? 'pill-active' : ''}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dropdown Filters and Reset */}
      <div className="filter-dropdowns-group">
        {/* Priority Filter */}
        <div className="filter-select-wrap">
          <label htmlFor="priority-filter-select" className="visually-hidden">Filter by priority</label>
          <select
            id="priority-filter-select"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter tasks by priority"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="filter-select-wrap">
            <label htmlFor="category-filter-select" className="visually-hidden">Filter by category</label>
            <select
              id="category-filter-select"
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter tasks by category"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Reset button shown if active filters exist */}
        {isFiltered && (
          <button
            type="button"
            className="btn btn-ghost reset-filter-btn"
            onClick={onResetFilters}
            title="Reset all filters"
            aria-label="Reset all filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
