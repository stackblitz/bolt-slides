# UI/UX Pro Max System Enhancements for Bolt Slides - Design Specification

## Overview
This specification details the comprehensive integration of UI/UX Pro Max design intelligence into **Bolt Slides** (`stackblitz/bolt-slides`). The goal is to elevate Bolt Slides' accessibility, mobile responsiveness, keyboard interaction ergonomics, and agent slide-authoring guidelines to enterprise-grade open-source standards.

## Scope of Enhancements

### 1. Design Tokens & Focus System (`src/styles/tokens.css` & `src/styles/base.css`)
- **Focus Tokens**:
  - Introduce `--focus-ring: 0 0 0 2px var(--bg), 0 0 0 4px var(--primary);` to provide high-visibility, brand-tinted focus rings for keyboard navigators.
  - Introduce `--touch-target-min: 44px;` in accordance with WCAG 2.5.5 / UI/UX Pro Max criteria.
- **Universal Keyboard Accessibility**:
  - Apply `:focus-visible` styling to `.noir-icon-btn`, `.tab`, `.acc-head`, `.noir-thumb`, `.ann-btn`, `.ann-color`, and `.ann-size`.
  - Ensure outline/rings only display on keyboard navigation (`:focus-visible`), avoiding unwanted outlines on mouse clicks.
- **Mobile Touch Targets**:
  - Ensure `.noir-icon-btn` and navigation hitboxes maintain at least a 44×44px hit-area on mobile viewports ($\le 640\text{px}$) via touch target expansion or sizing adjustments.
- **Tactile Feedback**:
  - Introduce physical active states (`:active { transform: scale(0.96); }`) with quick easing transitions for crisp button responsiveness.

### 2. Component Accessibility & ARIA Standardization (`src/components/`)
- **Tabs (`src/components/Tabs.tsx`)**:
  - Ensure each tab button has a unique `id={`tab-${pillId}-${i}`}` and `aria-controls={`tabpanel-${pillId}-${i}`}`.
  - Wrap the content panel in `role="tabpanel"`, `id={`tabpanel-${pillId}-${active}`}`, and `aria-labelledby={`tab-${pillId}-${active}`}` with `tabIndex={0}`.
- **Accordion (`src/components/Accordion.tsx`)**:
  - Connect each trigger button (`acc-head`) with `aria-controls={`acc-body-${id}-${i}`}` and `id={`acc-head-${id}-${i}`}`.
  - Mark each accordion body with `role="region"`, `id={`acc-body-${id}-${i}`}`, and `aria-labelledby={`acc-head-${id}-${i}`}`.
- **Charts (`src/components/Charts.tsx`)**:
  - Add `role="img"` and descriptive `aria-label` to `BarChart`, `LineChart`, and `DonutChart` so screen readers announce data trends and values rather than silently skipping SVG elements.
- **Table (`src/components/Table.tsx`)**:
  - Link the caption using standard `<caption>` or `aria-describedby` semantics to comply with accessible table standards.

### 3. Agent Authoring Intelligence (`.bolt/skills/slides/SKILL.md`)
- **Enrich the Skill Guide with UI/UX Pro Max Intelligence**:
  - Add **UI/UX Pro Max Design Principles**:
    1. **WCAG Contrast Minimums (4.5:1 / 7:1)** for slide text and data visualizations.
    2. **Typography Pairings & Hierarchy**: Curated pairings, body line height (1.5-1.75), line lengths (65-75ch max-width), and tabular figures.
    3. **Touch Targets & Responsive Layout**: 44px minimum target sizes, mobile safe zones, prevention of horizontal overflow.
    4. **SVG vs. Emoji Rule**: Strict prohibition of raw emoji glyphs for functional UI controls.
    5. **Micro-interaction Guidelines**: Restrained 150-300ms transitions, easing curves, zero layout shifting on hover.
  - Update **Definition of Done** in `SKILL.md` to include UI/UX Pro Max accessibility and contrast checks.

## Verification & Acceptance Criteria
- `npx tsc --noEmit` runs with 0 errors.
- `npm run build` runs with 0 errors.
- Mobile viewport styles maintain $\ge 44\text{px}$ touch target compliance.
- Keyboard navigation (Tab key) renders visible focus outlines across all interactive controls.
- WAI-ARIA tab, accordion, chart, and table semantics validate cleanly.
