import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MoreVertical,
  ExternalLink,
  Layers
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Product Management',
    category: 'Management',
    color: '#06B6D4', // Cyan dot
    description: 'Core product roadmap planning, user stories, sprint cycles, and Q4 feature releases.',
    totalTasks: 14,
    completedTasks: 10,
    dueDate: '2026-12-15',
    members: ['AM', 'JA', 'NR'],
    status: 'In progress'
  },
  {
    id: 'proj-2',
    name: 'Project Management',
    category: 'Operations',
    color: '#8B5CF6', // Purple dot
    description: 'Cross-functional engineering sync, QA tracking, and deployment pipeline automation.',
    totalTasks: 18,
    completedTasks: 9,
    dueDate: '2026-12-20',
    members: ['NR', 'RH', 'AM'],
    status: 'In progress'
  },
  {
    id: 'proj-3',
    name: 'Netlify Real Estate Website',
    category: 'Design & Dev',
    color: '#F97316', // Orange dot
    description: 'High-conversion SaaS real estate portal with modern property search and interactive virtual tours.',
    totalTasks: 12,
    completedTasks: 11,
    dueDate: '2026-11-30',
    members: ['JA', 'AM'],
    status: 'Due soon'
  },
  {
    id: 'proj-4',
    name: 'MatexAI Meeting Assistance',
    category: 'AI Research',
    color: '#10B981', // Emerald dot
    description: 'Intelligent real-time meeting transcription, key takeaways summarizer, and automated action item routing.',
    totalTasks: 8,
    completedTasks: 3,
    dueDate: '2027-01-10',
    members: ['AM', 'RH'],
    status: 'In progress'
  }
];

export default function ProjectsView({ onSelectProjectFilter, onAddTask }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectCat, setNewProjectCat] = useState('Design & Dev');
  const [newProjectColor, setNewProjectColor] = useState('#06B6D4');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProj = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      category: newProjectCat,
      color: newProjectColor,
      description: newProjectDesc.trim() || 'Active workspace project objectives and deliverables.',
      totalTasks: 0,
      completedTasks: 0,
      dueDate: '2026-12-31',
      members: ['AM'],
      status: 'In progress'
    };

    setProjects([newProj, ...projects]);
    setIsModalOpen(false);
    setNewProjectName('');
    setNewProjectDesc('');
  };

  return (
    <div className="projects-view-root">
      {/* Header */}
      <div className="projects-header-bar">
        <div>
          <h2 className="projects-main-title">Workspace Projects</h2>
          <p className="projects-main-subtitle">
            Manage your high-level project initiatives, track milestones, and view cross-team execution.
          </p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project) => {
          const progressPercent = project.totalTasks === 0 ? 0 : Math.round((project.completedTasks / project.totalTasks) * 100);

          return (
            <div key={project.id} className="project-card">
              <div className="project-card-top">
                <div className="project-title-row">
                  <span className="project-color-dot" style={{ backgroundColor: project.color }} />
                  <h3 className="project-card-title">{project.name}</h3>
                </div>
                <button type="button" className="project-menu-btn" aria-label="Project options">
                  <MoreVertical size={16} />
                </button>
              </div>

              <span className="project-cat-pill">{project.category}</span>

              <p className="project-card-desc">{project.description}</p>

              {/* Progress bar */}
              <div className="project-progress-wrap">
                <div className="project-progress-meta">
                  <span className="progress-label">Progress</span>
                  <span className="progress-value">{progressPercent}%</span>
                </div>
                <div className="project-progress-track">
                  <div 
                    className="project-progress-bar"
                    style={{ 
                      width: `${progressPercent}%`,
                      backgroundColor: project.color 
                    }}
                  />
                </div>
              </div>

              {/* Footer info */}
              <div className="project-card-footer">
                <div className="project-tasks-stat">
                  <CheckCircle2 size={14} className="text-muted" />
                  <span>{project.completedTasks}/{project.totalTasks} Tasks</span>
                </div>

                <div className="project-due-stat">
                  <Calendar size={14} className="text-muted" />
                  <span>{project.dueDate}</span>
                </div>

                <div className="project-members-group">
                  {project.members.map((m, idx) => (
                    <span key={idx} className="member-avatar-pill" title={`Assignee ${m}`}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content project-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Create New Project</h3>
            <p className="modal-subtitle">Define project scope, color tag, and workspace category.</p>

            <form onSubmit={handleCreateProject} className="task-form">
              <div className="form-group">
                <label className="form-label required-label">Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. NextGen Mobile Design System"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Summarize project objectives..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newProjectCat}
                    onChange={(e) => setNewProjectCat(e.target.value)}
                  >
                    <option value="Product Management">Product Management</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Design & Dev">Design & Dev</option>
                    <option value="AI Research">AI Research</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Color Theme</label>
                  <div className="color-picker-row">
                    {['#06B6D4', '#8B5CF6', '#F97316', '#10B981', '#EC4899', '#6366F1'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`color-choice-circle ${newProjectColor === c ? 'selected' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setNewProjectColor(c)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
