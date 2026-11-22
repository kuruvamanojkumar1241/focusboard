import React from 'react';
import { 
  MoreVertical, 
  ArrowUpRight, 
  Flag, 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Share2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import FocusNotes from './FocusNotes';

export default function OverviewDashboard({ 
  tasks, 
  onAddTask, 
  onEditTask,
  activeSubTab,
  onSubTabChange 
}) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In progress').length;
  const todo = tasks.filter((t) => t.status === 'To do').length;

  const highPriority = tasks.filter((t) => t.priority === 'High').length;
  const mediumPriority = tasks.filter((t) => t.priority === 'Medium').length;
  const lowPriority = tasks.filter((t) => t.priority === 'Low').length;

  // Percentage calculations
  const todoPct = total === 0 ? 0 : Math.round((todo / total) * 100);
  const inProgressPct = total === 0 ? 0 : Math.round((inProgress / total) * 100);
  const completedPct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="overview-dashboard-root">
      {/* 3-Slide Focus Notes Carousel */}
      <FocusNotes />

      {/* 4 Stat Metric Cards (Taskbito Row) */}
      <div className="taskbito-stats-row">
        {/* Completed */}
        <div className="taskbito-stat-card">
          <div className="t-stat-top">
            <div className="t-stat-icon-wrap icon-purple">
              <CheckSquare size={16} />
            </div>
            <span className="t-stat-title">Completed</span>
            <button type="button" className="t-stat-menu" aria-label="Card options">
              <MoreVertical size={15} />
            </button>
          </div>
          <div className="t-stat-bottom">
            <span className="t-stat-number">{completed > 0 ? completed : 12}</span>
            <div className="t-stat-meta">
              <span className="t-stat-badge badge-purple">
                <ArrowUpRight size={13} /> 20%
              </span>
              <span className="t-stat-time">In the last 7 days</span>
            </div>
          </div>
        </div>

        {/* Updated */}
        <div className="taskbito-stat-card">
          <div className="t-stat-top">
            <div className="t-stat-icon-wrap icon-purple">
              <Clock size={16} />
            </div>
            <span className="t-stat-title">Updated</span>
            <button type="button" className="t-stat-menu" aria-label="Card options">
              <MoreVertical size={15} />
            </button>
          </div>
          <div className="t-stat-bottom">
            <span className="t-stat-number">{inProgress > 0 ? inProgress : 12}</span>
            <div className="t-stat-meta">
              <span className="t-stat-badge badge-purple">
                <ArrowUpRight size={13} /> 20%
              </span>
              <span className="t-stat-time">In the last 7 days</span>
            </div>
          </div>
        </div>

        {/* Created */}
        <div className="taskbito-stat-card">
          <div className="t-stat-top">
            <div className="t-stat-icon-wrap icon-cyan">
              <Plus size={16} />
            </div>
            <span className="t-stat-title">Created</span>
            <button type="button" className="t-stat-menu" aria-label="Card options">
              <MoreVertical size={15} />
            </button>
          </div>
          <div className="t-stat-bottom">
            <span className="t-stat-number">{total > 0 ? total : 12}</span>
            <div className="t-stat-meta">
              <span className="t-stat-badge badge-cyan">
                <ArrowUpRight size={13} /> 20%
              </span>
              <span className="t-stat-time">In the last 7 days</span>
            </div>
          </div>
        </div>

        {/* Due Soon */}
        <div className="taskbito-stat-card">
          <div className="t-stat-top">
            <div className="t-stat-icon-wrap icon-orange">
              <Calendar size={16} />
            </div>
            <span className="t-stat-title">Due soon</span>
            <button type="button" className="t-stat-menu" aria-label="Card options">
              <MoreVertical size={15} />
            </button>
          </div>
          <div className="t-stat-bottom">
            <span className="t-stat-number">{todo > 0 ? todo : 12}</span>
            <div className="t-stat-meta">
              <span className="t-stat-badge badge-orange">
                <ArrowUpRight size={13} /> 20%
              </span>
              <span className="t-stat-time">In the last 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Priority Breakdown & Status Overview */}
      <div className="dashboard-middle-grid">
        {/* Left: Priority Breakdown Chart */}
        <div className="dashboard-card priority-breakdown-card">
          <div className="d-card-header">
            <h3 className="d-card-title">Priority Breakdown</h3>
            <button type="button" className="t-stat-menu" aria-label="Options">
              <MoreVertical size={15} />
            </button>
          </div>

          <div className="priority-flags-row">
            <div className="priority-flag-item">
              <Flag size={14} className="flag-blue" />
              <div className="flag-info">
                <span className="flag-count">{highPriority > 0 ? highPriority * 72 : 721}</span>
                <span className="flag-label">High Priority</span>
              </div>
            </div>

            <div className="priority-flag-item">
              <Flag size={14} className="flag-amber" />
              <div className="flag-info">
                <span className="flag-count">{mediumPriority > 0 ? mediumPriority * 25 : 125}</span>
                <span className="flag-label">Medium Priority</span>
              </div>
            </div>

            <div className="priority-flag-item">
              <Flag size={14} className="flag-orange" />
              <div className="flag-info">
                <span className="flag-count">{lowPriority > 0 ? lowPriority * 22 : 110}</span>
                <span className="flag-label">Low Priority</span>
              </div>
            </div>
          </div>

          {/* Smooth Multi-Line Trend Chart (SVG) */}
          <div className="trend-chart-container">
            <svg viewBox="0 0 700 180" className="trend-chart-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#635BFF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#635BFF" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="30" x2="700" y2="30" stroke="#F1F5F9" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="700" y2="80" stroke="#F1F5F9" strokeDasharray="4 4" />
              <line x1="0" y1="130" x2="700" y2="130" stroke="#F1F5F9" strokeDasharray="4 4" />

              {/* Area Fills */}
              <path
                d="M 10 120 Q 70 115, 130 90 T 250 80 T 370 70 T 490 60 T 610 65 T 690 55 L 690 160 L 10 160 Z"
                fill="url(#purpleGrad)"
              />
              <path
                d="M 10 135 Q 70 130, 130 110 T 250 100 T 370 95 T 490 85 T 610 90 T 690 80 L 690 160 L 10 160 Z"
                fill="url(#cyanGrad)"
              />
              <path
                d="M 10 148 Q 70 145, 130 130 T 250 120 T 370 115 T 490 105 T 610 110 T 690 100 L 690 160 L 10 160 Z"
                fill="url(#orangeGrad)"
              />

              {/* Curved Stroke Lines */}
              <path
                d="M 10 120 Q 70 115, 130 90 T 250 80 T 370 70 T 490 60 T 610 65 T 690 55"
                fill="none"
                stroke="#635BFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 135 Q 70 130, 130 110 T 250 100 T 370 95 T 490 85 T 610 90 T 690 80"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 148 Q 70 145, 130 130 T 250 120 T 370 115 T 490 105 T 610 110 T 690 100"
                fill="none"
                stroke="#F97316"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="130" cy="90" r="3.5" fill="#635BFF" />
              <circle cx="370" cy="70" r="3.5" fill="#635BFF" />
              <circle cx="610" cy="65" r="3.5" fill="#635BFF" />
            </svg>

            {/* Months Row */}
            <div className="chart-months-labels">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                <span key={m} className="chart-month-name">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Status Overview with Radial Gauges */}
        <div className="dashboard-card status-overview-card">
          <div className="d-card-header">
            <h3 className="d-card-title">Status overview</h3>
            <button type="button" className="t-stat-menu" aria-label="Options">
              <MoreVertical size={15} />
            </button>
          </div>

          <div className="status-gauges-container">
            {/* To Do Row */}
            <div className="gauge-item">
              <div className="gauge-label-wrap">
                <span className="gauge-bullet bullet-blue" />
                <span className="gauge-name">To Do: <strong>{todo} Work</strong></span>
              </div>
              <div className="gauge-circle-wrap">
                <svg viewBox="0 0 36 36" className="circular-chart blue-ring">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle-stroke"
                    strokeDasharray={`${todoPct || 60}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage-text">{todoPct || 60}%</text>
                </svg>
              </div>
            </div>

            {/* In Progress Row */}
            <div className="gauge-item">
              <div className="gauge-label-wrap">
                <span className="gauge-bullet bullet-purple" />
                <span className="gauge-name">In Progress: <strong>{inProgress} Work</strong></span>
              </div>
              <div className="gauge-circle-wrap">
                <svg viewBox="0 0 36 36" className="circular-chart purple-ring">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle-stroke"
                    strokeDasharray={`${inProgressPct || 30}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage-text">{inProgressPct || 30}%</text>
                </svg>
              </div>
            </div>

            {/* Done Row */}
            <div className="gauge-item">
              <div className="gauge-label-wrap">
                <span className="gauge-bullet bullet-orange" />
                <span className="gauge-name">Done: <strong>{completed} Work</strong></span>
              </div>
              <div className="gauge-circle-wrap">
                <svg viewBox="0 0 36 36" className="circular-chart orange-ring">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle-stroke"
                    strokeDasharray={`${completedPct || 40}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage-text">{completedPct || 40}%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Total Time Worked, Assignee Donut, Recent Activity */}
      <div className="dashboard-bottom-grid">
        {/* Total Time Worked */}
        <div className="dashboard-card time-worked-card">
          <div className="d-card-header">
            <h3 className="d-card-title">Total Time worked</h3>
            <button type="button" className="t-stat-menu" aria-label="Options">
              <MoreVertical size={15} />
            </button>
          </div>

          <div className="time-worked-stat">
            <span className="time-val">13h 32m 09s</span>
            <span className="time-badge">+1.5%</span>
          </div>

          {/* Wave chart */}
          <div className="time-wave-chart">
            <svg viewBox="0 0 240 70" className="time-wave-svg" preserveAspectRatio="none">
              <path
                d="M 10 50 Q 40 40, 70 55 T 130 35 T 190 45 T 235 20"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="130" cy="35" r="4" fill="white" stroke="#8B5CF6" strokeWidth="2" />
            </svg>
            <div className="time-days-row">
              {['Fri', 'Sun', 'Mon', 'Tue', 'Wed'].map((d) => (
                <span key={d} className="time-day-label">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Task completed by Assignee */}
        <div className="dashboard-card assignee-card">
          <div className="d-card-header">
            <h3 className="d-card-title">Task completed by assignee</h3>
            <button type="button" className="t-stat-menu" aria-label="Options">
              <MoreVertical size={15} />
            </button>
          </div>

          <div className="donut-chart-container">
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r="45" fill="none" stroke="#F1F5F9" strokeWidth="12" />
              {/* Blue segment */}
              <circle
                cx="60" cy="60" r="45"
                fill="none"
                stroke="#635BFF"
                strokeWidth="12"
                strokeDasharray="96 188"
                strokeDashoffset="0"
              />
              {/* Purple segment */}
              <circle
                cx="60" cy="60" r="45"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="12"
                strokeDasharray="62 222"
                strokeDashoffset="-96"
              />
              {/* Orange segment */}
              <circle
                cx="60" cy="60" r="45"
                fill="none"
                stroke="#F97316"
                strokeWidth="12"
                strokeDasharray="79 205"
                strokeDashoffset="-158"
              />
            </svg>
            <div className="donut-center-info">
              <span className="donut-center-pct">78%</span>
              <span className="donut-center-label">work done by Assignee</span>
            </div>
          </div>

          <div className="donut-legend-row">
            <span className="legend-item"><span className="legend-dot dot-blue" /> Juyed</span>
            <span className="legend-item"><span className="legend-dot dot-purple" /> Nahid</span>
            <span className="legend-item"><span className="legend-dot dot-orange" /> Rahi</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card recent-activity-card">
          <div className="d-card-header">
            <h3 className="d-card-title">Recent activity</h3>
            <button type="button" className="t-stat-menu" aria-label="Options">
              <MoreVertical size={15} />
            </button>
          </div>

          <div className="activity-items-list">
            <div className="activity-item">
              <div className="activity-icon-bullet bg-orange" />
              <div>
                <h4 className="activity-name">Juyed Ahmed's List</h4>
                <p className="activity-sub">Netlify SaaS Real estate · In Juyed's List</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-bullet bg-purple" />
              <div>
                <h4 className="activity-name">Pixem's Project</h4>
                <p className="activity-sub">MatexAI Meeting Assistance · In Project 11</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-bullet bg-blue" />
              <div>
                <h4 className="activity-name">Clinsey Task Management</h4>
                <p className="activity-sub">Clinsey Mobile Redesign · In Project 11</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
