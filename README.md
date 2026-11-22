# FocusBoard – Modern Task Management Dashboard

FocusBoard is a responsive, accessible task management and productivity dashboard built with React.js, Vite, and modern CSS. Inspired by the clean aesthetics of modern productivity platforms (Figma & Dribbble Taskbito design references), FocusBoard equips teams and individuals with a powerful workspace to capture, prioritize, track, and complete daily tasks.

---

## 🚀 Live Demo & Repository
- **Application URL**: Ready for immediate one-click deployment to [Vercel](https://vercel.com) / [Netlify](https://netlify.com)
- **Repository**: [https://github.com/your-username/focusboard](https://github.com/your-username/focusboard)

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **React 18** | Reusable component-based UI, hooks architecture, and declarative rendering |
| **Vite 6** | Ultra-fast dev server and optimized production bundler |
| **JavaScript (ES6+)** | Core application logic, functional array transforms, and storage handlers |
| **CSS3 & Design Tokens** | Custom responsive design system, animations, elevation shadows, and color badges |
| **Lucide React** | Cohesive, accessible modern icons |
| **Browser LocalStorage** | Client-side offline-first persistence across reloads |

*No heavy external dependencies (Redux, backend servers, Firebase, or complex frameworks) were required, keeping the bundle lightweight (<60 kB gzipped) and fast.*

---

## ✨ Key Features Implemented

1. **Dynamic Overview Statistics**:
   - Real-time calculation of **Total Tasks**, **In Progress**, **Completed**, and **Completion Rate (%)**.
   - Includes dynamic progress bar and division-by-zero protection.
   - Automatically synchronizes on any task creation, edit, deletion, or status toggle.

2. **3-Slide Focus Notes Carousel**:
   - Three structured productivity slides: *Plan Your Day*, *Shield Your Flow*, and *Reflect & Celebrate*.
   - Manual Previous / Next circular navigation controls.
   - Clickable active dot indicators to jump directly between slides.
   - Responsive layout adapting from horizontal desktop banner to mobile card.

3. **Complete Task CRUD (Create, Read, Update, Delete)**:
   - **Create**: Modal dialog with title, description, category, status, priority, and due date. Form validation flags empty or whitespace-only inputs.
   - **Read**: Rich task cards displaying status indicators, priority badges, category tags, and relative due dates (with overdue warnings).
   - **Update**: Reusable `TaskForm` in edit mode pre-populates existing data and updates records without altering original IDs. Quick inline status switcher directly on cards.
   - **Delete**: Confirmation dialog (`alertdialog`) preventing accidental loss of tasks.

4. **Multi-Condition Search & Filters**:
   - **Live Search**: Instant, case-insensitive keyword search matching task titles and descriptions.
   - **Status Tabs**: Segmented tabs for *All*, *To do*, *In progress*, and *Completed* with dynamic task counts.
   - **Priority Filter**: Dropdown filtering by *Low*, *Medium*, or *High*.
   - **Category Filter**: Filter tasks by *Design*, *Development*, *Testing*, *Research*, etc.
   - **Combined Filtering**: Search keywords and dropdown filters operate seamlessly together.
   - **Reset Shortcut**: One-click reset button when filters are active.

5. **Fault-Tolerant Browser Persistence**:
   - Custom `useLocalStorage` hook synchronizes task state with `localStorage` (`focusboard_tasks`).
   - Automatically seeds the board with initial sample tasks on first launch.
   - Preserves user mutations (creations, edits, deletions) permanently across browser refreshes.

6. **Responsive Across All Viewports**:
   - **Desktop (1440px × 1000px)**: Side-by-side fixed navigation sidebar, 4-column statistics grid, full-width carousel banner, and task workspace.
   - **Tablet (768px)**: 2-column stats grid, wrapped filter bars, and compact layout.
   - **Mobile (390px × 1128px)**: Off-canvas navigation drawer with backdrop, hamburger toggle, stacked single-column cards, full-width search bar, and touch-friendly targets (min 44px).

7. **Accessibility (WCAG 2.1 AA Compliant)**:
   - Semantic HTML elements (`<header>`, `<aside>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`).
   - Explicit `htmlFor` and `id` form associations.
   - Visible keyboard focus indicators (`:focus-visible`).
   - Descriptive `aria-label` tags for icon buttons and pagination controls.
   - Keyboard navigation support (`Escape` closes modals, `N` hotkey triggers Add Task).

---

## 📁 Project Folder Structure

```
focusboard/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx # Destructive action confirmation dialog
│   │   ├── FilterTabs.jsx         # Status segmented tabs & priority dropdowns
│   │   ├── FocusNotes.jsx         # 3-slide productivity carousel with controls
│   │   ├── Header.jsx             # Top bar, breadcrumbs, search, user avatar
│   │   ├── SearchBar.jsx          # Live search input with clear trigger
│   │   ├── Sidebar.jsx            # Desktop sidebar and mobile navigation drawer
│   │   ├── StatCard.jsx           # Reusable metric card with progress fill
│   │   ├── TaskCard.jsx           # Task item card with badges and quick actions
│   │   ├── TaskForm.jsx           # Reusable Create/Edit task modal
│   │   └── TaskList.jsx           # Filtered tasks view with empty state
│   ├── data/
│   │   └── sampleTasks.js         # Initial 7 representative sample tasks
│   ├── hooks/
│   │   └── useLocalStorage.js    # Resilient localStorage sync custom hook
│   ├── App.jsx                    # Root container, state management & layout
│   ├── index.css                  # Modern CSS design system & media queries
│   └── main.jsx                   # React DOM root entry point
├── index.html                     # HTML5 shell with Google Fonts
├── package.json                   # Scripts and project dependencies
├── vite.config.js                 # Vite build configuration
├── README.md                      # Comprehensive project documentation
└── AI_USAGE.md                    # AI usage disclosure statement
```

---

## 🧠 State Management Explanation

The application follows idiomatic React state management principles using built-in React Hooks (`useState`, `useMemo`, `useEffect`, `useRef`):

1. **Single Source of Truth**:
   The entire task dataset is maintained as an array in `App.jsx` through the custom `useLocalStorage` hook.

2. **Immutability in CRUD Operations**:
   - **Create**: New task objects are created with unique IDs (`TASK-${Date.now()}`) and prepended via `setTasks(prev => [newTask, ...prev])`.
   - **Update**: Tasks are updated by mapping over the array and matching IDs (`prev.map(t => t.id === updated.id ? { ...t, ...updated } : t)`), preserving unchanged records.
   - **Delete**: Tasks are removed using functional array filtering (`prev.filter(t => t.id !== id)`).
   - **Status Toggle**: Quick status updates directly transform the task record and trigger state updates immediately.

3. **Derived State & Zero Redundancy**:
   Statistics (total, in-progress, completed, percentage) and filtered task arrays are calculated on-the-fly using `useMemo`. This avoids redundant state synchronization bugs—whenever `tasks` change, statistics and visible tasks automatically recompute.

4. **LocalStorage Synchronization**:
   The `useLocalStorage` hook encapsulates both reading initial data and writing subsequent changes via a reactive `useEffect`. This ensures persistence without manual `localStorage.setItem` calls scattered across UI components.

5. **Modal & Carousel Isolation**:
   Ephemeral UI states (active carousel slide index, modal open/close flags, validation errors, search string) are scoped locally to their respective components or top-level layout.

---

## 💾 LocalStorage Implementation Details

Storage operations use the storage key `'focusboard_tasks'`:

```javascript
// Initialization logic inside useLocalStorage:
const [storedValue, setStoredValue] = useState(() => {
  try {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    // First time visitor: seed initial sample tasks
    window.localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  } catch (error) {
    console.warn(`Error reading ${key}:`, error);
    return initialValue;
  }
});
```

- **Clean First-Run Seeding**: If the user has never visited the app, the 7 sample tasks from `sampleTasks.js` are loaded and saved.
- **Persistence Across Sessions**: When tasks are added, modified, or deleted, `localStorage` is immediately updated.
- **Corrupted State Protection**: If invalid JSON is encountered, it gracefully falls back to initial data rather than crashing the interface.

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js version 18.0.0 or higher
- npm 9.0.0 or higher

### Step-by-Step Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/focusboard.git
   cd focusboard
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment Guide (Vercel / Netlify)

### Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `focusboard` repository.
4. Set the build parameters:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**. Your live HTTPS URL will be ready within 30 seconds.

### Deploying to Netlify
1. Log in to [Netlify](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Select GitHub and choose `focusboard`.
3. Set **Publish directory** to `dist` and **Build command** to `npm run build`.
4. Click **"Deploy site"**.

---

## 🧪 Functional Verification Checklist

- [x] Initial load loads 7 sample tasks with complete details (ID, Title, Category, Status, Priority, Due Date).
- [x] Create task adds a new card instantly and increments the task counter.
- [x] Form validation enforces title and due date, rejecting empty or whitespace inputs.
- [x] Edit task pre-fills form data and saves changes while preserving the ID.
- [x] Delete task opens a confirmation modal before removing the task.
- [x] Status can be changed directly from task card dropdown or quick toggle.
- [x] Live search filters by title/description instantaneously.
- [x] Status tabs (*All*, *To do*, *In progress*, *Completed*) display dynamic counts and filter accurately.
- [x] Priority dropdown filters high, medium, and low priority tasks.
- [x] Reset button restores full task list.
- [x] Focus Notes carousel slides smoothly through all 3 slides with Prev/Next and dot indicators.
- [x] LocalStorage keeps changes across page refresh.
- [x] Responsive layout verified at 390px (Mobile), 768px (Tablet), and 1440px (Desktop).
- [x] Accessible with keyboard navigation and screen-reader considerations.
