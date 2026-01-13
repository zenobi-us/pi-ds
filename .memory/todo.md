# TODO List

**Last Updated:** 2026-01-14

## Critical Tasks

### [NEEDS-HUMAN] Review Epic Definition
**Priority:** Critical
**Created:** 2026-01-14

The project epic has been defined with vision, phases, and timeline. Please review and approve:
- Overall vision and goals
- 5 implementation phases
- Component roadmap (10+ components)
- Timeline (Q1 2026)
- Success criteria

**Epic Document:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)

**Action Required:** Human approval to proceed with Phase 2

---

### [NEEDS-HUMAN] Review Tabs Component Specification
**Priority:** High
**Created:** 2026-01-14
**Related Issue:** [GitHub #4](https://github.com/zenobi-us/pi-ds/issues/4)

Comprehensive specification created for Tabs component including:
- Component architecture (TabController, Tab, Pane)
- API design and usage patterns
- Behavioral requirements
- Testing requirements
- Edge cases and open questions

**Specification Document:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)

**Action Required:** Human review and approval of specification

---

### [NEEDS-HUMAN] Review Tabs Implementation Plan
**Priority:** High
**Created:** 2026-01-14
**Dependencies:** Tabs Specification Approval

Detailed implementation plan created with:
- 12 specific tasks
- Time estimates (18-22 hours, 3-5 days)
- Unit, integration, and snapshot test plans
- Documentation requirements
- Risk mitigation strategies

**Plan Document:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)

**Action Required:** Human approval to begin implementation

---

### [NEEDS-HUMAN] Review Unit Testing Research
**Priority:** High
**Created:** 2026-01-13
**Blocking:** Test implementation

The research on unit testing TUI components is complete. Please review:
- Testing strategy (snapshot vs assertions)
- Helper utilities to implement
- Example test patterns
- Directory structure recommendations

**Research Document:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)

**Action Required:** Human approval before implementing tests

---

## Planning Complete - Ready for Execution

Once human reviews are complete, the following work is ready to begin:

### Phase 2: Testing Infrastructure Setup

1. **Install Dependencies**
   - `bun add -d strip-ansi @types/strip-ansi`

2. **Create Test Directory Structure**
   ```
   tests/
   ├── unit/
   │   └── tabs/
   ├── integration/
   │   └── tabs/
   ├── helpers/
   │   ├── test-theme.ts
   │   ├── output-matchers.ts
   │   └── width-tester.ts
   └── snapshots/
   ```

3. **Implement Test Helpers**
   - Test theme factory
   - Output matcher helpers
   - Width testing utilities
   - Snapshot normalizer

### Phase 3: Tabs Component Implementation

All 12 tasks documented in [Tabs Implementation Plan](phase-f89b39da-tabs-component-implementation.md):

1. ✅ Setup & Structure (30 min)
2. ✅ Implement TabController (2 hours)
3. ✅ Implement Tab Component (2 hours)
4. ✅ Implement Pane Component (1 hour)
5. ✅ Wire Controller to Components (1 hour)
6. ✅ Unit Tests - TabController (2 hours)
7. ✅ Unit Tests - Tab Component (2 hours)
8. ✅ Unit Tests - Pane Component (1.5 hours)
9. ✅ Integration Tests (3 hours)
10. ✅ Snapshot Tests (2 hours)
11. ✅ Documentation (2 hours)
12. ✅ Code Review & Polish (1 hour)

**Total Time:** 18-22 hours over 3-5 days

---

## GitHub Integration Tasks

### Associate Issue #4 with Epic
**Priority:** Medium
**Status:** Pending

- [ ] Add "epic: tui-design-system" label to repository
- [ ] Label issue #4 with epic label
- [ ] Consider creating GitHub milestone for Phase 3
- [ ] Link issue #4 in epic documentation (already done in memory)

---

## Completed Tasks

- [x] Read .memory/summary.md to understand project status
- [x] Fetch GitHub issue #4 details
- [x] Check for existing epics/milestones
- [x] Create project epic definition
- [x] Create Tabs component specification
- [x] Create Tabs implementation plan
- [x] Update .memory/summary.md with epic and planning
- [x] Research unit testing for TUI components
- [x] Document testing patterns and best practices
- [x] Identify vitest snapshot testing strategy
- [x] Create testing examples for Alert and Flex

---

## Blocked Tasks

- Test implementation (blocked by: [NEEDS-HUMAN] Review Research Findings)
- Tabs implementation (blocked by: [NEEDS-HUMAN] Review Specification & Plan)
- Phase 2 start (blocked by: [NEEDS-HUMAN] Review Epic Definition)

---

## Deferred Tasks

### Future Enhancements (Post-MVP)
- Keyboard navigation for tabs
- Tab overflow handling (scrolling/ellipsis)
- Close buttons on tabs
- Tab reordering support
- Icon support in tab labels
