import React, { useState } from 'react';
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
  X,
  Mail,
  Send,
  MessageCircle,
  BookOpen,
  ExternalLink,
  Users
} from 'lucide-react';

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeNav, 
  onNavChange, 
  taskCount,
  onProjectSelect
}) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('All Team');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [inviteSent, setInviteSent] = useState(false);

  const openInvite = () => {
    setInviteSent(false);
    setInviteEmail('');
    setInviteOpen(true);
  };

  const handleInvite = (event) => {
    event.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
  };

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
                  onProjectSelect?.('All');
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
                      onProjectSelect?.(p.name);
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
              <button type="button" className="sidebar-section-add" title="Invite Team" onClick={openInvite}>
                <Plus size={14} />
              </button>
            </div>

            <ul className="project-dots-list">
              <li>
                <button type="button" className="project-dot-btn" onClick={() => { setSelectedTeam('All Team'); setTeamOpen(true); }}>
                  <span className="team-bullet" />
                  <span className="project-dot-name">All Team</span>
                </button>
              </li>
              <li>
                <button type="button" className="project-dot-btn" onClick={() => { setSelectedTeam('Product Team'); setTeamOpen(true); }}>
                  <span className="team-bullet bullet-purple" />
                  <span className="project-dot-name">Product Team</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Utility Links */}
        <div className="sidebar-bottom-utils">
          <button type="button" className="bottom-util-link" onClick={openInvite}>
            <UserPlus size={16} />
            <span>Invite Team</span>
          </button>
          <button type="button" className="bottom-util-link" onClick={() => setSupportOpen(true)}>
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

      {inviteOpen && (
        <div className="utility-modal-backdrop" role="presentation" onClick={() => setInviteOpen(false)}>
          <div
            className="utility-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-team-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="utility-modal-header">
              <div className="utility-modal-heading">
                <div className="utility-modal-icon invite-icon"><UserPlus size={20} /></div>
                <div>
                  <h2 id="invite-team-title">Invite team members</h2>
                  <p>Add people to your FocusBoard workspace.</p>
                </div>
              </div>
              <button type="button" className="utility-modal-close" onClick={() => setInviteOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {inviteSent ? (
              <div className="invite-success">
                <div className="invite-success-icon"><Send size={22} /></div>
                <h3>Invitation ready</h3>
                <p>An invitation for <strong>{inviteEmail}</strong> has been prepared with the <strong>{inviteRole}</strong> role.</p>
                <button type="button" className="btn btn-primary" onClick={() => setInviteOpen(false)}>Done</button>
              </div>
            ) : (
              <form className="utility-modal-form" onSubmit={handleInvite}>
                <label htmlFor="invite-email">Email address</label>
                <div className="utility-input-wrap">
                  <Mail size={16} />
                  <input
                    id="invite-email"
                    type="email"
                    value={inviteEmail}
                    onChange={(event) => setInviteEmail(event.target.value)}
                    placeholder="teammate@company.com"
                    required
                    autoFocus
                  />
                </div>

                <label htmlFor="invite-role">Workspace role</label>
                <select id="invite-role" value={inviteRole} onChange={(event) => setInviteRole(event.target.value)}>
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Viewer">Viewer</option>
                </select>

                <div className="utility-modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setInviteOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary"><Send size={15} />Send invitation</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {supportOpen && (
        <div className="utility-modal-backdrop" role="presentation" onClick={() => setSupportOpen(false)}>
          <div
            className="utility-modal support-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="utility-modal-header">
              <div className="utility-modal-heading">
                <div className="utility-modal-icon support-icon"><HelpCircle size={20} /></div>
                <div>
                  <h2 id="support-title">Help & support</h2>
                  <p>Find answers or get in touch with the team.</p>
                </div>
              </div>
              <button type="button" className="utility-modal-close" onClick={() => setSupportOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="support-options">
              <a className="support-option" href="mailto:support@taskbito.io">
                <div className="support-option-icon"><MessageCircle size={18} /></div>
                <div>
                  <h3>Contact support</h3>
                  <p>Send us a message about an issue or question.</p>
                </div>
                <ExternalLink size={16} />
              </a>
              <button type="button" className="support-option" onClick={() => { setSupportOpen(false); onNavChange('settings'); onClose(); }}>
                <div className="support-option-icon"><BookOpen size={18} /></div>
                <div>
                  <h3>Workspace settings</h3>
                  <p>Manage profile, notifications, and data backups.</p>
                </div>
                <ExternalLink size={16} />
              </button>
            </div>

            <div className="support-faq">
              <h3>Popular help topics</h3>
              <details>
                <summary>How do I add a task?</summary>
                <p>Use the “New Task” button, complete the task form, and click Create Task.</p>
              </details>
              <details>
                <summary>Where are my tasks saved?</summary>
                <p>Tasks are saved automatically in your browser's local storage.</p>
              </details>
            </div>
          </div>
        </div>
      )}

      {teamOpen && (
        <div className="utility-modal-backdrop" role="presentation" onClick={() => setTeamOpen(false)}>
          <div
            className="utility-modal team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="utility-modal-header">
              <div className="utility-modal-heading">
                <div className="utility-modal-icon support-icon"><Users size={20} /></div>
                <div>
                  <h2 id="team-title">{selectedTeam}</h2>
                  <p>{selectedTeam === 'All Team' ? 'Everyone in the workspace' : 'Members assigned to product delivery'}</p>
                </div>
              </div>
              <button type="button" className="utility-modal-close" onClick={() => setTeamOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="team-member-list">
              {(selectedTeam === 'All Team'
                ? [
                    ['DM', 'Daisy Morgan', 'Workspace Owner'],
                    ['AM', 'Alex Morgan', 'Product Lead'],
                    ['JA', 'Juyed Ahmed', 'Designer'],
                    ['NR', 'Nahid Rahman', 'Developer']
                  ]
                : [
                    ['DM', 'Daisy Morgan', 'Product Lead'],
                    ['AM', 'Alex Morgan', 'Project Manager'],
                    ['JA', 'Juyed Ahmed', 'Designer']
                  ]
              ).map(([initials, name, role]) => (
                <div className="team-member-row" key={initials}>
                  <div className="team-member-avatar">{initials}</div>
                  <div>
                    <h3>{name}</h3>
                    <p>{role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="utility-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setTeamOpen(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { setTeamOpen(false); openInvite(); }}>
                <UserPlus size={15} />Invite member
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
