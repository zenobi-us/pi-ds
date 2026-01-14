# TODO List

**Last Updated:** 2026-01-14

## Active Tasks - Phase 4: Input Components (Definition & Planning)

### 1. Define Input Requirements (TextInput, Select, Checkbox, Radio)
**Status:** In Progress
**Priority:** High
**Dependencies:** Completed component infrastructure and Tabs implementation

Capture the expected API surface, interaction patterns, and theming behavior for each input control. Identify shared props, focus/validation states, keyboard behaviors, and accessibility requirements so downstream implementation has a clear set of acceptance criteria.

---

### 2. Draft Phase 4 Implementation Plan
**Status:** Planned
**Priority:** High
**Dependencies:** Input requirements

Break Phase 4 into discrete MDTM tasks mirroring the Phase 3 structure (setup, implement each component, wiring, tests, docs, polish). Estimate duration, define dependencies, and choose owner for each task. Document the plan for future execution tracking.

---

### 3. Research Validation & Accessibility Patterns for TUI Inputs
**Status:** Planned
**Priority:** Medium
**Dependencies:** Input requirements

Investigate best practices for validating terminal-input components, handling focus rings, error/feedback states, and ensuring assistive compatibility. Reference existing research (e.g., `research-5d437659-unit-testing-tui-components.md`) and capture findings in a dedicated research note if new insights are uncovered.

---

### 4. Document Input Theming & Interaction Guidelines
**Status:** Planned
**Priority:** Medium
**Dependencies:** Input requirements, research

Outline how inputs will inherit theme tokens, respond to active/disabled states, and play with layout helpers. Include quick examples of expected renderings, spacing rules, and how inputs should compose inside forms or panels.

---

## Completed Tasks

### Phase 3: Tabs Component Implementation ✅
**Status:** Archived 2026-01-14
**Details:** All 12 MDTM tasks (setup, implementation, tests, docs, polish) completed and archived under `archive/phase-f89b39da-tabs-component-implementation.md`. Learning captured in `learning-tabs-component.md` and research plan closed.

### Phase 2: Testing Infrastructure Setup ✅
**Status:** Completed 2026-01-14
**Details:** Test helpers, vitest configuration, and 121 passing tests across core layout/display components documented in the summary and research note `research-5d437659-unit-testing-tui-components.md`.

### Phase 1: Foundation & Testing Infrastructure ✅
**Status:** Completed 2026-01-12
**Details:** Component interface, layout primitives, theme system, and initial research artifacts established.

## Deferred Tasks

- Keyboard navigation for tabs
- Tab overflow handling (scrolling/ellipsis)
- Close buttons on tabs
- Tab reordering support
- Icon support in tab labels

## Task Execution Order (Planning)
1. Finish defining requirements for TextInput, Select, Checkbox, and Radio
2. Draft Phase 4 MDTM plan with dependencies and estimates
3. Research validation, accessibility, and theming expectations
4. Document guidelines and examples for future implementation
