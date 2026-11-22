import React from 'react';
import { LayoutDashboard, Calendar, Bell, Search, Plus, CheckSquare } from 'lucide-react';

export default function MobileBottomNav({ activeNav, onNavChange, onAddTask }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button
        type="button"
        className={`mobile-nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
        onClick={() => onNavChange('dashboard')}
        aria-label="Dashboard"
      >
        <LayoutDashboard size={20} />
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${activeNav === 'tasks' ? 'active' : ''}`}
        onClick={() => onNavChange('tasks')}
        aria-label="Tasks"
      >
        <CheckSquare size={20} />
      </button>

      {/* Floating Center Add Button */}
      <button
        type="button"
        className="mobile-fab-center"
        onClick={onAddTask}
        aria-label="Add new task"
      >
        <Plus size={22} />
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${activeNav === 'calendar' ? 'active' : ''}`}
        onClick={() => onNavChange('calendar')}
        aria-label="Calendar"
      >
        <Calendar size={20} />
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${activeNav === 'settings' ? 'active' : ''}`}
        onClick={() => onNavChange('settings')}
        aria-label="Settings"
      >
        <Bell size={20} />
      </button>
    </nav>
  );
}
