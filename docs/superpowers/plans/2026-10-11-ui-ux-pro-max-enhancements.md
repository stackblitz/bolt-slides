# UI/UX Pro Max Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate UI/UX Pro Max design intelligence into Bolt Slides, improving tokens, focus/touch ergonomics, ARIA component accessibility, and agent slide-authoring guidelines for open source contribution.

**Architecture:** 
1. Layer 1: Token & CSS Foundations (`tokens.css`, `base.css`) - Focus rings, touch target safety, active feedback.
2. Layer 2: Component ARIA Standards (`Tabs.tsx`, `Accordion.tsx`, `Charts.tsx`, `Table.tsx`) - WAI-ARIA roles, attributes, and relationship bindings.
3. Layer 3: Agent Intelligence (`.bolt/skills/slides/SKILL.md`) - UI/UX Pro Max design system rules and accessibility criteria.

**Tech Stack:** React 18, Vite, TypeScript, Framer Motion, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-10-11-ui-ux-pro-max-enhancements-design.md`

## Global Constraints
- Engine integrity: Keep `src/deck/` core layout intact and preserve existing shortcuts and sync protocol.
- Theme tokens: All component styling must reference `var(--...)` tokens in `src/styles/tokens.css`.
- Zero new dependencies: Plain React + CSS + SVG only.
- Build safety: `npx tsc --noEmit` and `npm run build` must pass cleanly without warnings or errors.

## Review Focus
- Keyboard tab order and visible `:focus-visible` styling on all interactive controls.
- Mobile touch target hit areas $\ge 44\text{px}$ on viewports $\le 640\text{px}$.
- WAI-ARIA tab and accordion panel linking (`aria-controls`, `aria-labelledby`, `role="tabpanel"`, `role="region"`).
- Screen-reader accessibility for SVG charts (`role="img"`, `aria-label`).
- Preservation of `prefers-reduced-motion` across all components.

---

### Task 1: Design Tokens & CSS Foundations
**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/base.css`

- [ ] Add `--focus-ring` and `--touch-target-min` variables to `:root` in `src/styles/tokens.css`.
- [ ] Add `:focus-visible` styling for interactive buttons, tabs, accordions, and controls in `src/styles/base.css`.
- [ ] Ensure mobile touch target dimensions ($\ge 44\text{px}$) for `.noir-icon-btn` and dock elements in `@media (max-width: 640px)`.
- [ ] Add tactile `:active` state scaling and transitions for interactive buttons.
- [ ] Run `npx tsc --noEmit && npm run build` to verify CSS compilation and types.

---

### Task 2: Component Accessibility & ARIA Standardization
**Files:**
- Modify: `src/components/Tabs.tsx`
- Modify: `src/components/Accordion.tsx`
- Modify: `src/components/Charts.tsx`
- Modify: `src/components/Table.tsx`

- [ ] Update `Tabs.tsx` to link each tab with its panel using `id`, `aria-controls`, `role="tabpanel"`, and `aria-labelledby`.
- [ ] Update `Accordion.tsx` to link each accordion trigger with its body using `id`, `aria-controls`, `role="region"`, and `aria-labelledby`.
- [ ] Update `Charts.tsx` (`BarChart`, `LineChart`, `DonutChart`) to include `role="img"` and descriptive `aria-label`s.
- [ ] Update `Table.tsx` to render table caption semantics with `<caption>` inside `<table>` or `aria-describedby`.
- [ ] Run `npx tsc --noEmit && npm run build` to verify TypeScript types and bundle.

---

### Task 3: Enrich Agent Authoring Intelligence with UI/UX Pro Max
**Files:**
- Modify: `.bolt/skills/slides/SKILL.md`

- [ ] Add a dedicated "UI/UX Pro Max Design Principles" section in `.bolt/skills/slides/SKILL.md`.
- [ ] Document WCAG contrast minimums, typography pairing guidelines, touch targets, and SVG icon rules.
- [ ] Update the "Definition of Done (self-check)" checklist with accessibility and contrast items.
- [ ] Run `npx tsc --noEmit && npm run build` to ensure everything remains green.

---

### Task 4: Git Setup & Open Source Contribution Preparation
**Files:**
- Workspace root preparation
- Git branch & commit creation for PR readiness

- [ ] Verify clean git tracking or initialize repository branch if needed.
- [ ] Commit all changes with a descriptive open source contribution message (`feat(ui-ux): integrate UI/UX Pro Max design intelligence, accessibility, and focus systems`).
- [ ] Provide the user with exact GitHub fork and PR instructions.
