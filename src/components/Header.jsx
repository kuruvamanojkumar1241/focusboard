import React from 'react';
import { Menu, Plus, Bell, Sparkles } from 'lucide-react';

export default function Header({ onOpenSidebar, onAddTask }) {
  // Current date formatted nicely
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="dashboard-header" role="banner">
      <div className="header-left">
        <button 
          type="button" 
          className="menu-toggle-btn"
          onClick={onOpenSidebar}
          aria-label="Open sidebar navigation"
        >
          <Menu size={22} />
        </button>

        <div className="header-title-block">
          <div className="header-breadcrumb">
            <span className="breadcrumb-root">Overview</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">My Tasks</span>
          </div>
          <h1 className="header-title">My Tasks Dashboard</h1>
          <p className="header-subtitle">Stay aligned, manage priorities, and track daily execution.</p>
        </div>
      </div>

      <div className="header-right">
        {/* Date pill */}
        <div className="date-badge" title="Today's Date">
          <span className="date-dot"></span>
          <span>{today}</span>
        </div>

        {/* Notifications mock button */}
        <button 
          type="button" 
          className="header-icon-btn" 
          aria-label="View notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="notification-dot" aria-hidden="true" />
        </button>

        {/* Primary CTA button */}
        <button 
          type="button" 
          className="btn btn-primary header-add-btn"
          onClick={onAddTask}
          aria-label="Add new task"
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>

        {/* User avatar */}
        <div className="user-profile-badge" title="Alex Morgan (alex.morgan@focusboard.io)">
          <div className="user-avatar">
            <span>AM</span>
          </div>
          <div className="user-info">
            <span className="user-name">Alex Morgan</span>
            <span className="user-role">Product Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
