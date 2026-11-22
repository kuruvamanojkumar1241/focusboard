# AI Usage Disclosure Statement

This document discloses the use of AI development tools during the planning, architecture, and implementation of the **FocusBoard** task management dashboard, in accordance with the assignment guidelines.

---

## 🛠️ Tools Used
- **Google Antigravity / Gemini Model**: Used for architecture structuring, code scaffold generation, and responsive CSS token guidance.

---

## 💬 Representative Prompts

The following prompts illustrate how AI assistance was leveraged during the development workflow:

1. **State & Architecture**:
   > *"How should we design a clean custom `useLocalStorage` hook in React that safely seeds 7 initial sample tasks on first launch without re-overwriting user changes on browser refresh?"*

2. **Responsive CSS Layout**:
   > *"Provide clean CSS media query breakpoints for desktop 1440px, tablet 768px, and mobile 390px adhering to a modern Dribbble/Figma productivity dashboard aesthetic with zero horizontal overflow."*

3. **Carousel Logic & Circular Navigation**:
   > *"Implement a lightweight 3-slide React carousel with manual Previous/Next navigation, circular boundaries, active dot indicators, and keyboard accessibility without importing third-party carousel libraries."*

4. **Form Validation & Modal Accessibility**:
   > *"What is the best pattern for a dual-mode (Create and Edit) accessible modal form in React that supports keyboard Escape closing, focus management, and trim-based title validation?"*

---

## 🧩 AI-Assisted Areas

- **Component Architecture**: Designing clean separation of concerns across `Sidebar`, `Header`, `StatCard`, `FocusNotes`, `TaskList`, `TaskCard`, `TaskForm`, and `FilterTabs`.
- **CSS Design System**: Formulating color schemes (indigo, amber, emerald, violet, slate), status pill badge styling, and elevation shadows matching modern dashboard UI benchmarks.
- **Form Validation & Edge Cases**: Handling whitespace-only task titles, division-by-zero prevention when total tasks reach zero, and resilient JSON parsing for `localStorage`.
- **Documentation**: Drafting comprehensive explanations for state management, localStorage persistence, and deployment instructions.

---

## 🔍 Verified, Corrected, or Rejected AI Suggestions

- **Correction 1: Filter state vs Persistent task state**:
  An initial AI suggestion proposed filtering tasks directly inside the `tasks` state setter. This was rejected because filtering is a derived view concern; modifying the source state would permanently erase unfiltered tasks from `localStorage`. The implementation was corrected to maintain the raw task dataset in state and calculate `filteredTasks` dynamically via `useMemo`.

- **Correction 2: Carousel circular boundary handling**:
  An early draft suggested disabling the `Previous` button on slide 1 and disabling `Next` on slide 3. This was modified to provide smooth circular navigation (`(prev === 0 ? totalSlides - 1 : prev - 1)`), which offers a superior user experience as recommended in Step 7.

- **Correction 3: Division-by-zero in completion statistics**:
  The initial completion rate snippet computed `(completedTasks / totalTasks) * 100` without checking for empty task lists, resulting in `NaN%`. A guard was added to default to `0%` whenever `totalTasks === 0`.
