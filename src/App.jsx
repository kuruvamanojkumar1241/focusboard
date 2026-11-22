import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  Sparkles,
  Layers
} from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';

import { sampleTasks } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  // Persistent task state
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // UI / Modal state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);

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
  const completionPercentage = useMemo(() => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  }, [totalTasks, completedTasks]);

  // Unique categories in data
  const availableCategories = useMemo(() => {
    const defaultCats = ['Design', 'Development', 'Testing', 'Research'];
    const taskCats = tasks.map((t) => t.category).filter(Boolean);
    return Array.from(new Set([...defaultCats, ...taskCats]));
  }, [tasks]);

  // Combined filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Title search (case-insensitive substring)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) {
          return false;
        }
      }

      // 2. Status filter
      if (statusFilter !== 'All' && task.status !== statusFilter) {
        return false;
      }

      // 3. Priority filter
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
        return false;
      }

      // 4. Category filter
      if (categoryFilter !== 'All' && task.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const isFiltered = Boolean(
    searchQuery.trim() ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    categoryFilter !== 'All'
  );

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
  };

  // Quick keyboard shortcut (N key opens Add Task modal)
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
      // UPDATE existing task, preserving ID
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t))
      );
    } else {
      // CREATE new task with unique ID
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

  return (
    <div className="focusboard-app-root">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAddTask={openCreateModal}
        taskCount={totalTasks}
      />

      {/* Main Content Area */}
      <div className="main-content-layout">
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onAddTask={openCreateModal}
        />

        <main className="dashboard-main" role="main">
          {/* Section 1: Dynamic Statistics Cards */}
          <section className="stats-grid-section" aria-label="Task Statistics">
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              subtitle="All registered backlog items"
              icon={CheckSquare}
              variant="indigo"
            />
            <StatCard
              title="In Progress"
              value={inProgressTasks}
              subtitle="Actively underway"
              icon={Clock}
              variant="amber"
            />
            <StatCard
              title="Completed"
              value={completedTasks}
              subtitle="Milestones achieved"
              icon={CheckCircle2}
              variant="emerald"
            />
            <StatCard
              title="Completion Rate"
              value={`${completionPercentage}%`}
              subtitle={`${completedTasks} of ${totalTasks} completed`}
              icon={TrendingUp}
              variant="violet"
              progress={completionPercentage}
            />
          </section>

          {/* Section 2: Focus Notes Carousel */}
          <FocusNotes />

          {/* Section 3: Task Management Section */}
          <section className="tasks-management-section" aria-label="Task Management">
            <div className="tasks-section-header">
              <div className="section-title-wrap">
                <h2 className="section-title">Tasks Overview</h2>
                <p className="section-subtitle">Track, organize, and prioritize your active workspace tickets.</p>
              </div>

              <div className="tasks-header-actions">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery('')}
                />
                <button
                  type="button"
                  className="btn btn-primary create-task-trigger-btn"
                  onClick={openCreateModal}
                >
                  <Plus size={16} />
                  <span>New Task</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs and Priority Controls */}
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

            {/* Task List / Cards Container */}
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
          </section>
        </main>
      </div>

      {/* Task Create/Edit Modal */}
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
    </div>
  );
}
