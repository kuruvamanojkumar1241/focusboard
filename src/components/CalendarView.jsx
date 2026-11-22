import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Circle 
} from 'lucide-react';

export default function CalendarView({ tasks, onAddTask, onEditTask, onStatusChange }) {
  // Calendar state: current displayed month/year
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1)); // Nov 2026 default
  const [selectedDay, setSelectedDay] = useState(22);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in month calculation
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Map tasks to dates
  const getTasksForDate = (d) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return tasks.filter((t) => t.dueDate === formattedDate);
  };

  const selectedDateTasks = getTasksForDate(selectedDay);

  return (
    <div className="calendar-view-root">
      {/* Calendar Header Controls */}
      <div className="calendar-top-bar">
        <div className="calendar-month-selector">
          <CalendarIcon size={20} className="cal-icon" />
          <h2 className="calendar-month-heading">
            {monthNames[month]} {year}
          </h2>
          <div className="calendar-month-nav">
            <button 
              type="button" 
              className="cal-nav-btn" 
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button" 
              className="cal-nav-btn" 
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="calendar-actions">
          <button 
            type="button" 
            className="btn btn-secondary cal-today-btn"
            onClick={() => {
              setCurrentDate(new Date());
              setSelectedDay(new Date().getDate());
            }}
          >
            Today
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onAddTask}
          >
            <Plus size={16} />
            <span>Add Event / Task</span>
          </button>
        </div>
      </div>

      <div className="calendar-content-grid">
        {/* Month Grid */}
        <div className="calendar-matrix-card">
          {/* Day of Week Headers */}
          <div className="calendar-weekdays-header">
            {daysOfWeek.map((day) => (
              <div key={day} className="cal-weekday-name">
                {day}
              </div>
            ))}
          </div>

          {/* Day Cells Grid */}
          <div className="calendar-days-grid">
            {/* Days from previous month */}
            {Array.from({ length: firstDayIndex }).map((_, i) => {
              const dayNum = prevMonthDays - firstDayIndex + i + 1;
              return (
                <div key={`prev-${i}`} className="cal-day-cell cal-day-outside">
                  <span className="cal-day-num">{dayNum}</span>
                </div>
              );
            })}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const dayTasks = getTasksForDate(d);
              const isSelected = selectedDay === d;
              const isToday = d === 22 && month === 10 && year === 2026;

              return (
                <div
                  key={`day-${d}`}
                  className={`cal-day-cell ${isSelected ? 'cal-day-selected' : ''} ${isToday ? 'cal-day-today' : ''}`}
                  onClick={() => setSelectedDay(d)}
                >
                  <div className="cal-day-header">
                    <span className="cal-day-num">{d}</span>
                    {dayTasks.length > 0 && (
                      <span className="cal-task-count-pill">{dayTasks.length}</span>
                    )}
                  </div>

                  <div className="cal-day-task-indicators">
                    {dayTasks.slice(0, 2).map((t) => (
                      <div 
                        key={t.id} 
                        className={`cal-task-pill status-${t.status.toLowerCase().replace(' ', '-')}`}
                        title={t.title}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditTask(t);
                        }}
                      >
                        <span className="cal-pill-dot" />
                        <span className="cal-pill-title">{t.title}</span>
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <span className="cal-more-tag">+{dayTasks.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda Sidebar */}
        <div className="calendar-agenda-card">
          <div className="agenda-header">
            <div>
              <span className="agenda-subtitle">Schedule For</span>
              <h3 className="agenda-title">
                {monthNames[month]} {selectedDay}, {year}
              </h3>
            </div>
            <span className="agenda-badge">{selectedDateTasks.length} Tasks</span>
          </div>

          <div className="agenda-tasks-list">
            {selectedDateTasks.length === 0 ? (
              <div className="agenda-empty">
                <Clock size={28} className="agenda-empty-icon" />
                <p>No tasks scheduled for this day.</p>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={onAddTask}
                >
                  Schedule a Task
                </button>
              </div>
            ) : (
              selectedDateTasks.map((task) => (
                <div key={task.id} className="agenda-task-item">
                  <div className="agenda-task-main">
                    <button
                      type="button"
                      className="agenda-status-toggle"
                      onClick={() => {
                        const next = task.status === 'Completed' ? 'To do' : task.status === 'To do' ? 'In progress' : 'Completed';
                        onStatusChange(task.id, next);
                      }}
                      title="Toggle status"
                    >
                      {task.status === 'Completed' ? (
                        <CheckCircle2 size={16} className="text-emerald" />
                      ) : (
                        <Circle size={16} className="text-muted" />
                      )}
                    </button>
                    <div>
                      <h4 
                        className={`agenda-task-title ${task.status === 'Completed' ? 'done' : ''}`}
                        onClick={() => onEditTask(task)}
                      >
                        {task.title}
                      </h4>
                      <div className="agenda-task-tags">
                        <span className="agenda-cat-tag">{task.category}</span>
                        <span className={`agenda-priority-tag priority-${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
