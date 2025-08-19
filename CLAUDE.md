# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MESA Academy is a documentation site built with Astro and Starlight, focused on teaching MESA (Modules for Experiments in Stellar Astrophysics) computational astrophysics. The site uses versioned documentation with interactive tutorial tasks.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run astro -- --help` | Get Astro CLI help |

## Architecture

- **Framework**: Astro with Starlight documentation theme
- **Styling**: TailwindCSS v4 with custom global styles
- **Versioning**: Uses `starlight-versions` plugin for documentation versioning
- **Content**: MDX files in `src/content/docs/` with versioned content in subdirectories (e.g., `1.0/`)

### Key Components

- **Task Component** (`src/components/Task.astro`): Interactive task boxes for tutorials with numbered tasks per guide
- **Content Collections**: Configured in `src/content.config.ts` with docs and versions collections
- **Version Structure**: Version-specific content in `src/content/docs/[version]/` with corresponding sidebar config in `src/content/versions/[version].json`

### Content Organization

- Guides contain educational content with numbered tasks
- Examples demonstrate specific implementations
- Reference materials provide technical documentation
- Tasks use a custom Astro component with guide-specific numbering (e.g., Task 1.1, Task 2.3)

### Sidebar Configuration

Sidebar structure is defined both in `astro.config.mjs` (main) and version-specific JSON files in `src/content/versions/` for versioned content.

## Interactive Features Implementation Plan

### Phase 1: Learning Objectives Component
**Goal**: Create new component with checkbox and localStorage persistence

**Tasks**:
1. Create `src/components/LearningObjective.astro`
   - Blue color scheme following existing Task/Answer patterns
   - Checkbox with "I can..." statement structure
   - Unique ID generation: `learning-objective-{guide-number}-{objective-number}`
2. Add client-side JavaScript foundation
   - Version detection system (multiple fallback approaches)
   - localStorage management with version-specific keys
   - Checkbox interaction handling
3. Version Detection Strategy:
   - **URL-based**: Parse `window.location.pathname` for version prefix
   - **Examples**: `/1.0/guides/...` → "1.0", `/2024.08.1/guides/...` → "2024.08.1"  
   - **Default**: Use current version (e.g., "2024.08.1") if no version prefix found
   - **Critical**: Update default version in `getCurrentVersion()` function when releasing new versions
4. localStorage Data Structure:
   ```javascript
   {
     "mesa-academy-progress": {
       "2024.08.1": {
         "learning-objectives": {
           "1-1": true,
           "2-3": false
         },
         "tasks": {},
         "answers": {}
       },
       "latest": { ... }
     }
   }
   ```

### Phase 2: Task/Answer Checkbox Enhancement
**Goal**: Add checkboxes to existing components with state synchronization

**Tasks**:
1. Modify `src/components/Task.astro`
   - Add checkbox with ID: `task-{guide-number}-{task-number}`
   - Maintain existing styling and layout
2. Modify `src/components/Answer.astro`
   - Add checkbox with `data-task="{guide-number}-{task-number}"`
   - Sync state with corresponding task checkbox
3. Expand JavaScript system
   - Task-answer pairing logic
   - Bidirectional checkbox synchronization
   - localStorage integration for both task and answer states

### Phase 3: Sidebar Enhancement
**Goal**: Add dynamic task/objective tracking to sidebar

**Tasks**:
1. Research Starlight sidebar override system
   - Create custom sidebar component override
   - Maintain existing TOC functionality
2. Create sidebar sections:
   - "Learning Objectives" section with checkboxes
   - "Tasks" section with progress indicators
   - Real-time updates as checkboxes change
3. Page scanning and population
   - DOM scan for all tasks/objectives on page load
   - Dynamic sidebar population
   - Mobile-responsive design considerations

### Implementation Approach

**Convention-Based System**:
- Task IDs: `task-{guide}-{number}` (e.g., `task-1-2`)
- Answer linking: `data-task="{guide}-{number}"`
- Learning Objective IDs: `learning-objective-{guide}-{number}`

**JavaScript Architecture**:
- Single script handles all interactions
- Page load scan builds complete state map
- Event delegation for efficient checkbox handling
- Centralized localStorage management

**Version Support**:
- All progress data segmented by version
- Version detection via URL analysis + fallbacks
- Future-proof for new MESA releases (2024.08.1+)

### File Structure
```
src/
├── components/
│   ├── Task.astro (modified)
│   ├── Answer.astro (modified)
│   ├── LearningObjective.astro (new)
│   └── Hint.astro (existing)
├── scripts/
│   └── progress-tracker.js (new)
└── layouts/
    └── custom-sidebar.astro (new, if needed)
```

### Testing Strategy
- Test localStorage persistence across browser sessions
- Verify checkbox synchronization between tasks/answers
- Ensure version isolation works correctly
- Mobile responsiveness testing
- Accessibility compliance (keyboard navigation, screen readers)

### Current Status (Session End 2025-08-04)

**✅ Phase 1 FULLY COMPLETED:**
- ✅ LearningObjective.astro component with orange→green color transitions and green checkboxes
- ✅ progress-tracker.js with version-specific localStorage and proper version detection
- ✅ LearningObjectivesSummary.astro with auto-population and proper styling
- ✅ Fixed CSS specificity issues using `:global()` directive for dynamic content
- ✅ Custom color palette integrated into Tailwind theme
- ✅ All text styling working correctly with proper light/dark mode support

**✅ Phase 2 FULLY COMPLETED:**
- ✅ Task.astro component with gray checkboxes and proper ID format (`task-{guide}-{number}`)
- ✅ Answer.astro component with checkboxes at bottom of expanded content with separator
- ✅ DOM-based task-answer pairing system (next answer after task in DOM)
- ✅ Bidirectional checkbox synchronization between tasks and answers
- ✅ Graceful handling of orphan tasks (tasks without answers)
- ✅ Dynamic task titles in answer checkbox text ("Completed Task X.Y: Title")
- ✅ localStorage persistence for both tasks and answers with version isolation

**✅ Phase 3 MOSTLY COMPLETED (Session 2025-08-04):**
- ✅ PageSidebar.astro override component created
- ✅ TasksSummary.astro component with emoji status indicators (✓ green, ⭕️ red)
- ✅ Navigation functionality (click to scroll to tasks/objectives)
- ✅ Sidebar styling to match left sidebar appearance
- ✅ Height distribution system implemented (1/6 objectives, 1/3 tasks, 1/2+ TOC)
- ✅ Individual section scrolling with custom scrollbars
- ✅ Progress tracking integration with existing localStorage system

**❌ Phase 3 Outstanding Issues:**
1. **Right sidebar positioning**: Not flush against right viewport edge despite `right: 0` and `position: sticky`
2. **Height distribution needs adjustment**: Should be 1/3, 1/3, 1/3+ instead of current 1/6, 1/3, 1/2+
3. **Sidebar scrolling bug**: Entire sidebar can scroll (shows blank space below) instead of only individual components scrolling

**Key Technical Solutions Implemented:**
- **CSS Specificity**: Used `:global()` directive to prevent Astro CSS tree-shaking of dynamic content
- **High Specificity Selectors**: ID-based selectors (`#objectives-summary-list`) for reliable overrides  
- **Version Isolation**: localStorage structured by version with proper default handling
- **DOM Traversal Logic**: Stops at next task to prevent incorrect pairing
- **Automatic Pairing**: No manual props needed - content authors just place Answer after Task
- **Emoji Status System**: Replaced checkboxes with clickable green ✓ / red ⭕️ emojis
- **Starlight Component Override**: Successfully overrode PageSidebar while preserving TOC functionality
- **Responsive Height Management**: Flexbox-based height distribution with individual section scrolling

### Phase 4: Sidebar Reorganization (Session 2025-08-12)
**Goal**: Move "On This Page" ToC to left sidebar, simplify right sidebar to objectives + tasks only

**Tasks**:
1. Override `Sidebar` component to add ToC below existing navigation
   - Keep cross-page navigation at top (Guides, Reference, Examples)
   - Add visual separator between navigation and ToC
   - Maintain mobile responsive behavior
2. Simplify `PageSidebar.astro` to remove ToC
   - Show only Learning Objectives and Tasks
   - Redistribute height 50/50 between objectives and tasks
   - Fix positioning and scrolling issues from Phase 3
3. Update component configuration in `astro.config.mjs`

**Benefits**:
- ✅ Logical separation: navigation/structure (left) vs progress tracking (right)
- ✅ Solves right sidebar height distribution issues (50/50 vs cramped 1/6, 1/3, 1/2+)
- ✅ Fixes positioning and scrolling conflicts
- ✅ More breathing room for objectives and tasks

**Current Session TODO:**
1. Create new Sidebar.astro component override
2. Add TableOfContents to left sidebar below navigation  
3. Simplify PageSidebar.astro to only show objectives and tasks
4. Test and refine the new layout

### Future Enhancements (Phase 4+)
- **Dynamic Summary Colors**: Make the LearningObjectivesSummary component change from orange (incomplete) to green (complete) based on completion status of all objectives on the page. This requires:
  - Real-time monitoring of checkbox states
  - Completion percentage calculation
  - Dynamic CSS class/style updates
  - State persistence across page loads