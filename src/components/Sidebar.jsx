import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Inbox, 
  Calendar, 
  BarChart3, 
  Briefcase, 
  Plus, 
  ChevronDown, 
  UserPlus, 
  HelpCircle, 
  Settings, 
  Sparkles,
  X
} from 'lucide-react';

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeNav, 
  onNavChange, 
  taskCount 
}) {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: taskCount },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const projects = [
    { id: 'proj-1', name: 'Product Management', color: '#06B6D4' },
    { id: 'proj-2', name: 'Project Management', color: '#8B5CF6' },
    { id: 'proj-3', name: 'Netlify Real Estate', color: '#F97316' },
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

      <aside className={`dark-taskbito-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-row">
          <div className="sidebar-brand-left">
            <div className="taskbito-logo-icon">
              <Sparkles size={18} />
            </div>
            <span className="taskbito-brand-name">Taskbito</span>
            <ChevronDown size={14} className="brand-chevron" />
          </div>

          <button 
            type="button" 
            className="sidebar-mobile-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Nav Section */}
        <nav className="dark-nav-menu">
          <ul className="dark-nav-list">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <li key={item.id} className="dark-nav-item">
                  <button
                    type="button"
                    className={`dark-nav-btn ${isActive ? 'active-nav' : ''}`}
                    onClick={() => {
                      onNavChange(item.id);
                      onClose();
                    }}
                  >
                    <Icon size={18} className="dark-nav-icon" />
                    <span className="dark-nav-text">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="dark-nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Project Section */}
          <div className="sidebar-section-group">
            <div className="sidebar-section-header">
              <span className="sidebar-section-title">Project</span>
              <button 
                type="button" 
                className="sidebar-section-add" 
                title="Add Project"
                onClick={() => {
                  onNavChange('projects');
                  onClose();
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            <ul className="project-dots-list">
              {projects.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className="project-dot-btn"
                    onClick={() => {
                      onNavChange('projects');
                      onClose();
                    }}
                  >
                    <span className="project-dot" style={{ backgroundColor: p.color }} />
                    <span className="project-dot-name">{p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Section */}
          <div className="sidebar-section-group">
            <div className="sidebar-section-header">
              <span className="sidebar-section-title">Team</span>
              <button type="button" className="sidebar-section-add" title="Invite Team">
                <Plus size={14} />
              </button>
            </div>

            <ul className="project-dots-list">
              <li>
                <button type="button" className="project-dot-btn">
                  <span className="team-bullet" />
                  <span className="project-dot-name">All Team</span>
                </button>
              </li>
              <li>
                <button type="button" className="project-dot-btn">
                  <span className="team-bullet bullet-purple" />
                  <span className="project-dot-name">Product Team</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Utility Links */}
        <div className="sidebar-bottom-utils">
          <button type="button" className="bottom-util-link">
            <UserPlus size={16} />
            <span>Invite Team</span>
          </button>
          <button type="button" className="bottom-util-link">
            <HelpCircle size={16} />
            <span>Supports</span>
          </button>
          <button 
            type="button" 
            className={`bottom-util-link ${activeNav === 'settings' ? 'active-util' : ''}`}
            onClick={() => {
              onNavChange('settings');
              onClose();
            }}
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
