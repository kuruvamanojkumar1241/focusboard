import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckSquare, 
  Share2, 
  Plus, 
  Calendar as CalIcon, 
  LayoutList, 
  Kanban, 
  UserCheck, 
  Sparkles,
  Layers
} from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewDashboard from './components/OverviewDashboard';
import BoardView from './components/BoardView';
import CalendarView from './components/CalendarView';
import ProjectsView from './components/ProjectsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import MobileBottomNav from './components/MobileBottomNav';

import { sampleTasks } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  // Persistent task state
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);

  // Navigation Router state
  const [activeNav, setActiveNav] = useState('tasks'); // 'dashboard' | 'tasks' | 'calendar' | 'projects' | 'analytics' | 'settings'
  const [activeSubTab, setActiveSubTab] = useState('Overview'); // 'Overview' | 'Lists' | 'Board' | 'Calendar' | 'Task assigned to me'

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // UI Modals state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [projectFilter, setProjectFilter] = useState('All');

  // Dynamic Dashboard Statistics
  const totalTasks = tasks.length;
  const inProgressTasks = useMemo(
    () => tasks.filter((t) => t.status === 'In progress').length,
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === 'Completed').length,
    [tasks]
  );
  const todoTasks = useMemo(
    () => tasks.filter((t) => t.status === 'To do').length,
    [tasks]
  );

  const availableCategories = useMemo(() => {
    const defaultCats = ['Design', 'Development', 'Testing', 'Research'];
    const taskCats = tasks.map((t) => t.category).filter(Boolean);
    return Array.from(new Set([...defaultCats, ...taskCats]));
  }, [tasks]);

  // Combined filtered tasks for Lists & Board view
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      if (statusFilter !== 'All' && task.status !== statusFilter) return false;
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
      if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;

      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const isFiltered = Boolean(
    searchQuery.trim() ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    categoryFilter !== 'All'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  // Keyboard shortcut: N opens Create Task
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.key === 'n' || e.key === 'N') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) &&
        !isFormOpen &&
        !isDeleteModalOpen
      ) {
        e.preventDefault();
        openCreateModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormOpen, isDeleteModalOpen]);

  // CRUD Operations
  const openCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t))
      );
    } else {
      const newId = `TASK-${Date.now().toString().slice(-4)}`;
      const newTask = {
        id: newId,
        ...formData
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    closeFormModal();
  };

  const openDeleteModal = (task) => {
    setDeletingTask(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingTask(null);
  };

  const confirmDelete = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    closeDeleteModal();
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleResetSampleData = () => {
    setTasks(sampleTasks);
    window.localStorage.setItem('focusboard_tasks', JSON.stringify(sampleTasks));
  };

  // Sub tabs definition matching Image 1:
  // [✓ Overview] [Lists] [Board] [Calendar] [Task assigned to me]
  const subTabs = [
    { id: 'Overview', label: 'Overview', icon: CheckSquare },
    { id: 'Lists', label: 'Lists', icon: LayoutList },
    { id: 'Board', label: 'Board', icon: Kanban },
    { id: 'Calendar', label: 'Calendar', icon: CalIcon },
    { id: 'Task assigned to me', label: 'Task assigned to me', icon: UserCheck },
  ];

  return (
    <div className="taskbito-app-shell">
      {/* Dark Taskbito Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        taskCount={totalTasks}
        onProjectSelect={setProjectFilter}
      />

      {/* Main App Container */}
      <div className="taskbito-main-wrapper">
        {/* Top Header */}
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddTask={openCreateModal}
        />

        <main className="taskbito-content-area" role="main">
          {/* Mobile EnglishSathi Greeting Header (Visible on Mobile) */}
          <div className="mobile-englishsathi-header">
            <div className="mobile-greet-row">
              <div>
                <h1 className="mobile-greet-title">Hello, Daisy!</h1>
                <p className="mobile-greet-sub">Have a nice day !</p>
              </div>
              <div className="mobile-user-avatar">
                <span>D</span>
              </div>
            </div>

            <div className="mobile-pill-tabs">
              <button 
                type="button" 
                className={`mobile-pill-btn ${activeNav === 'tasks' ? 'active' : ''}`}
                onClick={() => setActiveNav('tasks')}
              >
                My tasks ·
              </button>
              <button 
                type="button" 
                className={`mobile-pill-btn ${activeNav === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveNav('projects')}
              >
                Project
              </button>
              <button 
                type="button" 
                className={`mobile-pill-btn ${activeNav === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveNav('analytics')}
              >
                Note / Insights
              </button>
            </div>
          </div>

          {/* Conditional Navigation Views */}
          {activeNav === 'calendar' ? (
            <CalendarView
              tasks={tasks}
              onAddTask={openCreateModal}
              onEditTask={openEditModal}
              onStatusChange={handleStatusChange}
            />
          ) : activeNav === 'projects' ? (
            <ProjectsView
              onAddTask={openCreateModal}
              initialFilter={projectFilter}
              onSelectProjectFilter={() => {
                setActiveNav('tasks');
                setActiveSubTab('Lists');
              }}
            />
          ) : activeNav === 'analytics' ? (
            <AnalyticsView tasks={tasks} />
          ) : activeNav === 'settings' ? (
            <SettingsView
              tasks={tasks}
              onResetSampleData={handleResetSampleData}
            />
          ) : (
            /* 'dashboard' or 'tasks' view */
            <>
              {/* Taskbito "My Tasks" Header Row (Image 1) */}
              <div className="mytasks-title-section">
                <div className="mytasks-title-left">
                  <h1 className="mytasks-main-title">My Tasks</h1>
                  <p className="mytasks-main-desc">Short description will be placed here</p>
                </div>

                <div className="mytasks-title-right">
                  <button 
                    type="button" 
                    className="btn-share-tasks"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Task board link copied to clipboard!');
                    }}
                  >
                    <Share2 size={15} />
                    <span>Share Tasks</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-new-task-purple"
                    onClick={openCreateModal}
                  >
                    <Plus size={16} />
                    <span>+ New Task</span>
                  </button>
                </div>
              </div>

              {/* Sub Navigation View Switcher (Image 1) */}
              <div className="mytasks-subtabs-row" role="tablist">
                {subTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeSubTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`mytasks-subtab-btn ${isActive ? 'active-subtab' : ''}`}
                      onClick={() => setActiveSubTab(tab.id)}
                    >
                      <Icon size={14} className="subtab-icon" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* View Content depending on activeSubTab */}
              {activeSubTab === 'Overview' && (
                <OverviewDashboard
                  tasks={tasks}
                  onAddTask={openCreateModal}
                  onEditTask={openEditModal}
                  activeSubTab={activeSubTab}
                  onSubTabChange={setActiveSubTab}
                />
              )}

              {activeSubTab === 'Lists' && (
                <div className="tasks-list-view-card">
                  {/* Filter Controls Bar */}
                  <FilterTabs
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    priorityFilter={priorityFilter}
                    onPriorityChange={setPriorityFilter}
                    categoryFilter={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                    categories={availableCategories}
                    counts={{
                      all: totalTasks,
                      todo: todoTasks,
                      inProgress: inProgressTasks,
                      completed: completedTasks
                    }}
                    onResetFilters={handleResetFilters}
                    isFiltered={isFiltered}
                  />

                  {/* Task List */}
                  <TaskList
                    tasks={filteredTasks}
                    totalCount={totalTasks}
                    filteredCount={filteredTasks.length}
                    isFiltered={isFiltered}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                    onStatusChange={handleStatusChange}
                    onAddTask={openCreateModal}
                    onResetFilters={handleResetFilters}
                  />
                </div>
              )}

              {activeSubTab === 'Board' && (
                <BoardView
                  tasks={filteredTasks}
                  onAddTask={openCreateModal}
                  onEditTask={openEditModal}
                  onDeleteTask={openDeleteModal}
                  onStatusChange={handleStatusChange}
                />
              )}

              {activeSubTab === 'Calendar' && (
                <CalendarView
                  tasks={tasks}
                  onAddTask={openCreateModal}
                  onEditTask={openEditModal}
                  onStatusChange={handleStatusChange}
                />
              )}

              {activeSubTab === 'Task assigned to me' && (
                <div className="tasks-list-view-card">
                  <div className="assigned-me-banner">
                    <UserCheck size={20} className="text-purple" />
                    <span>Tasks directly assigned to your current sprint profile (Alex / Daisy)</span>
                  </div>

                  <TaskList
                    tasks={tasks.filter((t) => t.priority === 'High' || t.status === 'In progress')}
                    totalCount={totalTasks}
                    filteredCount={tasks.filter((t) => t.priority === 'High' || t.status === 'In progress').length}
                    isFiltered={true}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                    onStatusChange={handleStatusChange}
                    onAddTask={openCreateModal}
                    onResetFilters={handleResetFilters}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Pixelstrap Create/Edit Modal (Image 3) */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
        availableCategories={availableCategories}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        task={deletingTask}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />

      {/* Mobile Bottom Navigation Bar (Image 2) */}
      <MobileBottomNav
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onAddTask={openCreateModal}
      />
    </div>
  );
}
