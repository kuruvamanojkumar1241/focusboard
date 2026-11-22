import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Calendar, 
  BarChart3, 
  Settings, 
  Sparkles,
  X,
  Plus
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, onAddTask, taskCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: taskCount },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Main Navigation">
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-wrap">
            <div className="brand-logo-icon">
              <Sparkles size={20} className="brand-icon-svg" />
            </div>
            <div className="brand-text">
              <span className="brand-name">FocusBoard</span>
              <span className="brand-tag">Workspace</span>
            </div>
          </div>
          <button 
            type="button" 
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="sidebar-action-wrap">
          <button 
            type="button" 
            className="btn btn-primary sidebar-create-btn"
            onClick={() => {
              onAddTask();
              onClose();
            }}
          >
            <Plus size={18} />
            <span>Create Task</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">MENU</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="nav-item">
                  <a 
                    href={`#${item.id}`} 
                    className={`nav-link ${item.active ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                    aria-current={item.active ? 'page' : undefined}
                  >
                    <Icon size={18} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / User Pro Tip Card */}
        <div className="sidebar-footer">
          <div className="pro-tip-card">
            <div className="pro-tip-badge">Pro Tip</div>
            <p className="pro-tip-text">Press <strong>N</strong> anywhere or click <strong>+ Add Task</strong> to capture ideas quickly.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
