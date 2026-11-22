import React from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  PieChart, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Award
} from 'lucide-react';

export default function AnalyticsView({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In progress').length;
  const todo = tasks.filter((t) => t.status === 'To do').length;
  const highPriority = tasks.filter((t) => t.priority === 'High').length;
  const mediumPriority = tasks.filter((t) => t.priority === 'Medium').length;
  const lowPriority = tasks.filter((t) => t.priority === 'Low').length;

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Group by category
  const categories = ['Design', 'Development', 'Testing', 'Research'];
  const catStats = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.category === cat);
    const catCompleted = catTasks.filter((t) => t.status === 'Completed').length;
    return {
      name: cat,
      total: catTasks.length,
      completed: catCompleted,
      pct: catTasks.length === 0 ? 0 : Math.round((catCompleted / catTasks.length) * 100)
    };
  });

  return (
    <div className="analytics-view-root">
      {/* Top Banner */}
      <div className="analytics-banner">
        <div>
          <span className="analytics-tag">PERFORMANCE METRICS</span>
          <h2 className="analytics-title">Productivity & Velocity Intelligence</h2>
          <p className="analytics-desc">
            Deep insights into sprint velocity, backlog health, and turnaround completion efficiency.
          </p>
        </div>
        <div className="analytics-rate-pill">
          <Award size={24} className="text-emerald" />
          <div>
            <span className="rate-num">{completionRate}%</span>
            <span className="rate-label">Completion Velocity</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <div className="kpi-icon-wrap bg-indigo-light">
            <CheckCircle2 size={20} className="text-indigo" />
          </div>
          <div>
            <span className="kpi-label">Completed Milestones</span>
            <h3 className="kpi-value">{completed}</h3>
            <span className="kpi-subtext text-emerald">↗ +18% vs last sprint</span>
          </div>
        </div>

        <div className="analytics-kpi-card">
          <div className="kpi-icon-wrap bg-amber-light">
            <Clock size={20} className="text-amber" />
          </div>
          <div>
            <span className="kpi-label">Avg. Task Cycle Time</span>
            <h3 className="kpi-value">1.8 Days</h3>
            <span className="kpi-subtext text-emerald">↘ -12% turnaround faster</span>
          </div>
        </div>

        <div className="analytics-kpi-card">
          <div className="kpi-icon-wrap bg-rose-light">
            <AlertCircle size={20} className="text-rose" />
          </div>
          <div>
            <span className="kpi-label">High Priority Load</span>
            <h3 className="kpi-value">{highPriority}</h3>
            <span className="kpi-subtext text-muted">Out of {total} total tickets</span>
          </div>
        </div>

        <div className="analytics-kpi-card">
          <div className="kpi-icon-wrap bg-violet-light">
            <TrendingUp size={20} className="text-violet" />
          </div>
          <div>
            <span className="kpi-label">Work in Progress</span>
            <h3 className="kpi-value">{inProgress}</h3>
            <span className="kpi-subtext text-indigo">Balanced throughput</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="analytics-charts-row">
        {/* Category Breakdown */}
        <div className="analytics-chart-card">
          <div className="card-header-clean">
            <h3 className="card-heading">Category Execution Progress</h3>
            <span className="card-subheading">Completed vs Backlog</span>
          </div>

          <div className="category-bars-list">
            {catStats.map((item) => (
              <div key={item.name} className="cat-bar-item">
                <div className="cat-bar-meta">
                  <span className="cat-name">{item.name}</span>
                  <span className="cat-count">
                    {item.completed} / {item.total} ({item.pct}%)
                  </span>
                </div>
                <div className="cat-bar-track">
                  <div 
                    className="cat-bar-fill" 
                    style={{ width: `${item.pct}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-chart-card">
          <div className="card-header-clean">
            <h3 className="card-heading">Priority Distribution</h3>
            <span className="card-subheading">Active Ticket Weight</span>
          </div>

          <div className="priority-distribution-list">
            <div className="priority-stat-row">
              <div className="priority-bullet bg-rose" />
              <span className="priority-name">High Priority</span>
              <span className="priority-qty">{highPriority} Tasks</span>
              <span className="priority-share">
                {total > 0 ? Math.round((highPriority / total) * 100) : 0}%
              </span>
            </div>

            <div className="priority-stat-row">
              <div className="priority-bullet bg-amber" />
              <span className="priority-name">Medium Priority</span>
              <span className="priority-qty">{mediumPriority} Tasks</span>
              <span className="priority-share">
                {total > 0 ? Math.round((mediumPriority / total) * 100) : 0}%
              </span>
            </div>

            <div className="priority-stat-row">
              <div className="priority-bullet bg-sky" />
              <span className="priority-name">Low Priority</span>
              <span className="priority-qty">{lowPriority} Tasks</span>
              <span className="priority-share">
                {total > 0 ? Math.round((lowPriority / total) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
