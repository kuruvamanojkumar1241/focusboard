import React from 'react';
import { 
  Menu, 
  Search, 
  Pin, 
  PlayCircle, 
  Layers, 
  ChevronDown, 
  Plus 
} from 'lucide-react';

export default function Header({ 
  onOpenSidebar, 
  searchQuery, 
  onSearchChange, 
  onAddTask 
}) {
  return (
    <header className="taskbito-header" role="banner">
      <div className="header-left-group">
        <button 
          type="button" 
          className="menu-toggle-btn"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Taskbito Search Bar with ⌘ 1 shortcut badge */}
        <div className="taskbito-search-box">
          <Search size={16} className="taskbito-search-icon" />
          <input
            type="text"
            className="taskbito-search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <kbd className="search-shortcut-badge">⌘ 1</kbd>
        </div>
      </div>

      <div className="header-right-group">
        {/* Quick action icons */}
        <button type="button" className="header-round-btn" title="Pin / Favorites">
          <Pin size={17} />
        </button>

        <button type="button" className="header-round-btn" title="Tutorial / Video">
          <PlayCircle size={18} />
        </button>

        {/* Integrate pill button */}
        <button type="button" className="integrate-pill-btn">
          <Layers size={14} className="text-muted" />
          <span>Integrate</span>
          <div className="integrate-mini-avatars">
            <span className="mini-av av-green" />
            <span className="mini-av av-orange" />
          </div>
        </button>

        {/* User profile with dropdown */}
        <div className="taskbito-user-btn" title="Daisy / Alex Morgan">
          <div className="taskbito-avatar-circle">
            <span>DM</span>
          </div>
          <ChevronDown size={14} className="user-chevron" />
        </div>
      </div>
    </header>
  );
}
