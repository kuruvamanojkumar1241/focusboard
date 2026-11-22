import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Database, 
  ShieldCheck, 
  Download, 
  RotateCcw, 
  Check, 
  Smartphone,
  Save
} from 'lucide-react';

export default function SettingsView({ tasks, onResetSampleData, onImportTasks }) {
  const [userName, setUserName] = useState('Daisy Morgan');
  const [userRole, setUserRole] = useState('Product Lead & Designer');
  const [userEmail, setUserEmail] = useState('daisy.morgan@taskbito.io');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `focusboard_tasks_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="settings-view-root">
      <div className="settings-header">
        <h2 className="settings-title">Workspace Settings</h2>
        <p className="settings-subtitle">Manage your personal profile, notification alerts, and data persistence.</p>
      </div>

      {savedAlert && (
        <div className="settings-success-toast">
          <Check size={18} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <div className="settings-grid">
        {/* Profile Card */}
        <div className="settings-card">
          <div className="settings-card-head">
            <User size={20} className="text-indigo" />
            <h3 className="settings-card-title">User Profile</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="settings-avatar-row">
              <div className="settings-avatar-circle">
                <span>DM</span>
              </div>
              <div>
                <h4 className="avatar-name">{userName}</h4>
                <p className="avatar-desc">Figma Lead Workspace Owner</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-input"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
              <Save size={15} />
              <span>Save Changes</span>
            </button>
          </form>
        </div>

        {/* Notifications & Preferences */}
        <div className="settings-card">
          <div className="settings-card-head">
            <Bell size={20} className="text-amber" />
            <h3 className="settings-card-title">Notifications & Preferences</h3>
          </div>

          <div className="toggle-list">
            <div className="toggle-item">
              <div>
                <h4 className="toggle-title">Task Due Reminders</h4>
                <p className="toggle-desc">Receive notifications when tasks approach deadline.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="toggle-checkbox"
              />
            </div>

            <div className="toggle-item">
              <div>
                <h4 className="toggle-title">Sound Effects</h4>
                <p className="toggle-desc">Play a subtle chime upon marking a task completed.</p>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="toggle-checkbox"
              />
            </div>
          </div>
        </div>

        {/* Data Persistence & LocalStorage */}
        <div className="settings-card settings-card-wide">
          <div className="settings-card-head">
            <Database size={20} className="text-emerald" />
            <h3 className="settings-card-title">LocalStorage & Data Backups</h3>
          </div>

          <p className="settings-card-desc">
            Your tasks are persistently saved in your browser's local storage under key <code>focusboard_tasks</code>. Currently tracking <strong>{tasks.length} tasks</strong>.
          </p>

          <div className="settings-data-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleExportJSON}
            >
              <Download size={16} />
              <span>Export Tasks as JSON</span>
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all tasks to the original 7 sample tasks? Any custom tasks will be overwritten.")) {
                  onResetSampleData();
                }
              }}
            >
              <RotateCcw size={16} />
              <span>Reset to Sample Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
