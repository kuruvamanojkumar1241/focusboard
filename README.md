# FocusBoard / Taskbito – Modern Productivity Dashboard

FocusBoard (Taskbito) is a verified pixel-perfect task management and productivity dashboard built with React.js, Vite, and modern CSS. The application faithfully implements the visual hierarchy, color palette, responsive behaviors, and functional workflows from the official Figma and Dribbble design frames:

1. **Taskbito Desktop Dashboard (1440 × 1000)**: [Dribbble / Figma Reference](https://dribbble.com/shots/26066657-Taskbito-My-Tasks-Overview-Dashboard-UI-Design)
2. **EnglishSathi Mobile Experience (390 × 1128)**: [Mobile View Reference](https://englishsathi.com)
3. **Pixelstrap Create Task Modal (760 × 822)**: [Agent Task Reference](https://docs.pixelstrap.net/wapi/agent-task.html)

---

## 🎨 Visual Details & Figma Frames Implemented

### 1. Taskbito Desktop Dashboard (1440 × 1000)
- **Deep Midnight Purple Sidebar (`#1B1736`)**:
  - Sparkle icon logo with dropdown header (`Taskbito`).
  - Active navigation pill highlighted in vibrant purple (`#5D38DE`) with white typography.
  - Interactive **Project** workspace section with colored status indicators (Cyan, Purple, Orange).
  - **Team** section with expandable list (`All Team`, `Product Team`).
  - Bottom utility links: `Invite Team`, `Supports`, and `Settings`.
- **Top Header**:
  - `Q Search` input with keyboard shortcut pill (`⌘ 1`).
  - Action buttons: Pin / Favorites, Video / Tutorial, `Integrate` button with user avatar badges, and user profile dropdown.
- **My Tasks View Header**:
  - Page title `My Tasks` + `Short description will be placed here`.
  - Action buttons: `Share Tasks` (outline pill) and `+ New Task` (vibrant purple `#5D38DE`).
  - Sub-navigation tabs:
    - **`[✓ Overview]`**: Active analytics and metrics dashboard.
    - **`[Lists]`**: Complete interactive task table with multi-filters and search.
    - **`[Board]`**: Kanban columns (`To Do`, `In Progress`, `Completed`) with move selectors.
    - **`[Calendar]`**: Interactive monthly calendar with daily agenda view.
    - **`[Task assigned to me]`**: Filtered sprint tasks assigned to current user.
- **4 Stat Metric Cards**:
  - `Completed` (12, ↗ 20% in purple badge)
  - `Updated` (12, ↗ 20% in purple badge)
  - `Created` (12, ↗ 20% in cyan badge)
  - `Due soon` (12, ↗ 20% in orange badge)
  - All cards feature top 3-dot action menus and dynamically reflect real-time task state.
- **Middle Section**:
  - **Priority Breakdown Card**:
    - Counters: `⚑ 721 High Priority` (blue), `⚑ 125 Medium Priority` (amber), `⚑ 110 Low Priority` (orange).
    - Multi-line SVG chart with smooth curves for Jan–Dec and shaded area gradients.
  - **Status Overview Card**:
    - Dynamic radial circular gauges:
      - `To Do: 4 Work` (Blue ring: 60%)
      - `In Progress: 2 Work` (Purple ring: 30%)
      - `Done: 3 Work` (Orange ring: 40%)
- **Bottom Section**:
  - **Total Time Worked**: `13h 32m 09s` (+1.5%) with SVG weekly wave graph (Fri–Wed).
  - **Task Completed by Assignee**: Donut chart with `78% work done by Assignee` and colored legend (`Juyed`, `Nahid`, `Rahi`).
  - **Recent Activity**: Activity feed (`Juyed Ahmed's List`, `Pixem's Project`, `Clinsey Task Management`).

### 2. Complete Workspace Pages (No Empty Tabs!)
- **Calendar (`CalendarView.jsx`)**: Full monthly interactive calendar with previous/next month navigation, current day highlighting, event pills on calendar cells, and selected date agenda panel.
- **Projects (`ProjectsView.jsx`)**: Dedicated project portfolio showing `Product Management`, `Project Management`, `Netlify Real Estate Website`, and `MatexAI Meeting Assistance` with progress percentage bars, team members, and a `+ New Project` modal.
- **Analytics (`AnalyticsView.jsx`)**: Deep productivity insights with sprint velocity rates, category completion progress bars, and priority weight distribution.
- **Settings (`SettingsView.jsx`)**: Profile customization (`Daisy Morgan`), task notification preferences, JSON backup download, and a one-click reset to original sample tasks.

### 3. Pixelstrap Create Task Modal (Image 3)
- `<` Back arrow navigation button.
- Bold dark green heading: `Create New Task` (`#065F46`).
- Subtitle: `Assign a clear objective and set expectations for your team.`
- Exact form layout:
  - `Task Title` with placeholder `e.g. Follow up with Lead #402 regarding Q3 Promo`.
  - `Description` with placeholder `Provide detailed instructions and context for this task...`.
  - Side-by-side dropdowns for `Priority Level` and `Initial Status`.
  - `Due Date` input with calendar icon.
  - Action buttons: `Cancel` (white with border) and `Create Task` (emerald green `#00875A`).

### 4. EnglishSathi Mobile Layout (Image 2)
- Mobile greeting: `Hello, Daisy! Have a nice day !`
- Rounded pill switcher: `My tasks ·`, `Project`, `Note / Insights`.
- Responsive carousel cards with purple gradients.
- Fixed mobile bottom navigation bar (`Home`, `Tasks`, `+ Floating Action Button`, `Calendar`, `Notifications`).

---

## 🚀 Running the Project Locally

```bash
cd focusboard
npm install
npm run dev
```

To build for production:
```bash
npm run build
```
The optimized bundle will be generated in `dist/`.
