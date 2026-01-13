# Phase: Tabs Component Implementation

**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Parent Phase:** Phase 3: Interactive Components
**Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
**GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)
**Status:** Planning
**Priority:** High
**Estimated Duration:** 3-5 days

## Overview

Implement the Tabs component system as specified in issue #4, including TabController, Tab, and Pane components. This enables tabbed interfaces in the pi-ds TUI design system.

## Prerequisites

- ✅ Core component interface defined
- ✅ Layout components implemented (Flex, Container, Sized)
- ✅ Theme system available
- ⏳ Testing infrastructure setup (Phase 2)
- ⏳ Test helpers implemented

## Goals

1. Implement TabController for state management
2. Implement Tab component for tab headers/labels
3. Implement Pane component for content panels
4. Create comprehensive test suite (unit + integration + snapshots)
5. Document usage patterns and examples
6. Verify integration with existing layout components

## Tasks

### Task 1: Setup & Structure
**Estimated Time:** 30 minutes

- [ ] Create `src/tabs/` directory
- [ ] Create `src/tabs/index.ts` (barrel exports)
- [ ] Create `src/tabs/TabController.ts` (state management)
- [ ] Create `src/tabs/Tab.ts` (tab component)
- [ ] Create `src/tabs/Pane.ts` (pane component)
- [ ] Create `src/tabs/types.ts` (TypeScript interfaces)
- [ ] Update main `src/index.ts` to export tabs

**Files to Create:**
```
src/tabs/
├── index.ts
├── TabController.ts
├── Tab.ts
├── Pane.ts
└── types.ts
```

**Acceptance Criteria:**
- All files created with proper TypeScript structure
- Barrel exports configured correctly
- No lint errors

### Task 2: Implement TabController
**Estimated Time:** 2 hours
**Dependencies:** Task 1

- [ ] Define TabController class structure
- [ ] Implement constructor with initial state
- [ ] Implement `addTab(tab: Tab): void`
- [ ] Implement `addTabs(...tabs: Tab[]): void`
- [ ] Implement `addPane(pane: Pane): void`
- [ ] Implement `addPanes(...panes: Pane[]): void`
- [ ] Implement `setActive(id: string): void`
- [ ] Implement `getActive(): string | null`
- [ ] Implement `getTab(id: string): Tab | undefined`
- [ ] Implement `getPane(id: string): Pane | undefined`
- [ ] Add error handling for invalid IDs
- [ ] Add TypeScript strict mode compliance

**Code Structure:**
```typescript
// src/tabs/types.ts
export interface TabOptions {
  active?: boolean;
  onSelect?: () => void;
}

// src/tabs/TabController.ts
export class TabController {
  private tabs: Map<string, Tab>;
  private panes: Map<string, Pane>;
  private activeId: string | null;

  constructor() {
    this.tabs = new Map();
    this.panes = new Map();
    this.activeId = null;
  }

  addTab(tab: Tab): void { /* ... */ }
  addTabs(...tabs: Tab[]): void { /* ... */ }
  addPane(pane: Pane): void { /* ... */ }
  addPanes(...panes: Pane[]): void { /* ... */ }
  setActive(id: string): void { /* ... */ }
  getActive(): string | null { /* ... */ }
  getTab(id: string): Tab | undefined { /* ... */ }
  getPane(id: string): Pane | undefined { /* ... */ }
}
```

**Acceptance Criteria:**
- All methods implemented and working
- TypeScript strict mode passing
- No duplicate ID handling implemented
- State management working correctly

### Task 3: Implement Tab Component
**Estimated Time:** 2 hours
**Dependencies:** Task 2

- [ ] Define Tab class implementing Component interface
- [ ] Implement constructor accepting id, label, options
- [ ] Store TabController reference for state queries
- [ ] Implement `render(width: number): string[]`
- [ ] Implement active state styling (theme highlight)
- [ ] Implement inactive state styling (theme normal)
- [ ] Implement `isActive(): boolean` helper
- [ ] Implement `getId(): string` helper
- [ ] Handle onSelect callback invocation
- [ ] Add width constraints and overflow handling

**Code Structure:**
```typescript
// src/tabs/Tab.ts
import type { Component } from '../types';
import type { Theme } from '../theme/types';
import type { TabOptions } from './types';

export class Tab implements Component {
  private id: string;
  private label: Component;
  private options: TabOptions;
  private controller: TabController | null;

  constructor(
    id: string,
    label: Component,
    options: TabOptions = {}
  ) {
    this.id = id;
    this.label = label;
    this.options = options;
    this.controller = null;
  }

  setController(controller: TabController): void {
    this.controller = controller;
  }

  render(width: number): string[] {
    const isActive = this.isActive();
    const labelLines = this.label.render(width - 4); // Account for padding
    
    // Apply active/inactive styling
    // Return formatted lines
  }

  isActive(): boolean {
    if (!this.controller) return this.options.active ?? false;
    return this.controller.getActive() === this.id;
  }

  getId(): string {
    return this.id;
  }
}
```

**Acceptance Criteria:**
- Tab renders correctly in active state
- Tab renders correctly in inactive state
- Label component renders properly within tab
- Width constraints handled gracefully
- Component interface compliance verified

### Task 4: Implement Pane Component
**Estimated Time:** 1 hour
**Dependencies:** Task 2

- [ ] Define Pane class implementing Component interface
- [ ] Implement constructor accepting tabId, content
- [ ] Store TabController reference for state queries
- [ ] Implement `render(width: number): string[]`
- [ ] Return content when active, empty array when inactive
- [ ] Implement `isActive(): boolean` helper
- [ ] Implement `getTabId(): string` helper
- [ ] Handle full-width content rendering

**Code Structure:**
```typescript
// src/tabs/Pane.ts
import type { Component } from '../types';

export class Pane implements Component {
  private tabId: string;
  private content: Component;
  private controller: TabController | null;

  constructor(tabId: string, content: Component) {
    this.tabId = tabId;
    this.content = content;
    this.controller = null;
  }

  setController(controller: TabController): void {
    this.controller = controller;
  }

  render(width: number): string[] {
    if (!this.isActive()) {
      return [];
    }
    return this.content.render(width);
  }

  isActive(): boolean {
    if (!this.controller) return false;
    return this.controller.getActive() === this.tabId;
  }

  getTabId(): string {
    return this.tabId;
  }
}
```

**Acceptance Criteria:**
- Pane renders content when active
- Pane returns empty when inactive
- Content component renders at full width
- Component interface compliance verified

### Task 5: Wire Controller to Components
**Estimated Time:** 1 hour
**Dependencies:** Tasks 2, 3, 4

- [ ] Update TabController.addTab to call tab.setController(this)
- [ ] Update TabController.addPane to call pane.setController(this)
- [ ] Ensure bidirectional communication works
- [ ] Test state synchronization between controller and components
- [ ] Verify active state propagates correctly

**Acceptance Criteria:**
- Controller and components properly linked
- State changes in controller reflect in components
- No circular dependency issues

### Task 6: Unit Tests - TabController
**Estimated Time:** 2 hours
**Dependencies:** Task 5

Create `tests/unit/tabs/TabController.test.ts`:

- [ ] Test: Initialize with empty state
- [ ] Test: Add single tab and retrieve it
- [ ] Test: Add multiple tabs at once
- [ ] Test: Add single pane and retrieve it
- [ ] Test: Add multiple panes at once
- [ ] Test: Set active tab and verify state
- [ ] Test: Get active tab ID
- [ ] Test: Handle invalid tab ID in setActive
- [ ] Test: Handle duplicate tab IDs
- [ ] Test: getTab returns undefined for non-existent ID
- [ ] Test: getPane returns undefined for non-existent ID
- [ ] Test: Initial active state from tab options

**Example Test:**
```typescript
import { describe, it, expect } from 'vitest';
import { TabController } from '../../../src/tabs/TabController';
import { Tab } from '../../../src/tabs/Tab';
import { Pane } from '../../../src/tabs/Pane';
import { Text } from '../../../src/text';
import { theme } from '../../helpers/test-theme';

describe('TabController', () => {
  it('should initialize with empty state', () => {
    const controller = new TabController();
    expect(controller.getActive()).toBeNull();
  });

  it('should add and retrieve a tab', () => {
    const controller = new TabController();
    const tab = new Tab('tab1', new Text(theme, 'Label'));
    
    controller.addTab(tab);
    
    expect(controller.getTab('tab1')).toBe(tab);
  });

  // ... more tests
});
```

**Acceptance Criteria:**
- All tests passing
- Edge cases covered
- Error handling verified

### Task 7: Unit Tests - Tab Component
**Estimated Time:** 2 hours
**Dependencies:** Task 5

Create `tests/unit/tabs/Tab.test.ts`:

- [ ] Test: Render in active state with highlighting
- [ ] Test: Render in inactive state without highlighting
- [ ] Test: Trigger onSelect callback when selected
- [ ] Test: Return correct ID from getId()
- [ ] Test: isActive returns true when controller reports active
- [ ] Test: isActive returns false when controller reports inactive
- [ ] Test: isActive uses options.active when no controller
- [ ] Test: Label component renders correctly
- [ ] Test: Handle narrow width constraints
- [ ] Test: Handle very long labels with truncation

**Acceptance Criteria:**
- All tests passing
- Active/inactive styling verified
- Callback behavior confirmed
- Width handling tested

### Task 8: Unit Tests - Pane Component
**Estimated Time:** 1.5 hours
**Dependencies:** Task 5

Create `tests/unit/tabs/Pane.test.ts`:

- [ ] Test: Render content when active
- [ ] Test: Return empty array when inactive
- [ ] Test: isActive returns true when tab is active
- [ ] Test: isActive returns false when tab is inactive
- [ ] Test: isActive returns false when no controller
- [ ] Test: getTabId returns correct tab ID
- [ ] Test: Content renders at full width
- [ ] Test: Handle empty content gracefully

**Acceptance Criteria:**
- All tests passing
- Active/inactive behavior verified
- Content rendering confirmed

### Task 9: Integration Tests
**Estimated Time:** 3 hours
**Dependencies:** Tasks 6, 7, 8

Create `tests/integration/tabs/tabs-integration.test.ts`:

- [ ] Test: Full tab switching workflow
- [ ] Test: Multiple tabs with multiple panes
- [ ] Test: Integration with Flex layout component
- [ ] Test: Integration with Container component
- [ ] Test: Integration with Sized component
- [ ] Test: Theme application to active tabs
- [ ] Test: Theme application to inactive tabs
- [ ] Test: Responsive rendering at 80, 120, 160 widths
- [ ] Test: Horizontal tab layout
- [ ] Test: Vertical tab layout (future)
- [ ] Test: Tab selection changes pane visibility
- [ ] Test: Example usage from specification works

**Example Test:**
```typescript
import { describe, it, expect } from 'vitest';
import { TabController, Tab, Pane } from '../../../src/tabs';
import { Flex, Container, Sized, Text } from '../../../src';
import { theme } from '../../helpers/test-theme';

describe('Tabs Integration', () => {
  it('should render complete tabbed interface', () => {
    const controller = new TabController();
    
    const tab1 = new Tab("tab1", new Text(theme, "Home"), { active: true });
    const tab2 = new Tab("tab2", new Text(theme, "Settings"));
    controller.addTabs(tab1, tab2);
    
    const pane1 = new Pane("tab1", new Text(theme, "Home Content"));
    const pane2 = new Pane("tab2", new Text(theme, "Settings Content"));
    controller.addPanes(pane1, pane2);
    
    const frame = new Flex({ mode: "fill" });
    const sidebar = new Container();
    sidebar.addChild(tab1);
    sidebar.addChild(tab2);
    
    const page = new Container();
    page.addChild(pane1);
    page.addChild(pane2);
    
    frame.addChild(new Sized(sidebar, 64));
    frame.addChild(page);
    
    const output = frame.render(120);
    
    expect(output.length).toBeGreaterThan(0);
    expect(output.join('\n')).toContain('Home');
    expect(output.join('\n')).toContain('Home Content');
    expect(output.join('\n')).not.toContain('Settings Content');
  });

  // ... more integration tests
});
```

**Acceptance Criteria:**
- All integration tests passing
- Real-world usage patterns verified
- Layout integration confirmed

### Task 10: Snapshot Tests
**Estimated Time:** 2 hours
**Dependencies:** Task 9

Create `tests/integration/tabs/tabs-snapshots.test.ts`:

- [ ] Snapshot: Horizontal tabs at 80 width
- [ ] Snapshot: Horizontal tabs at 120 width
- [ ] Snapshot: Horizontal tabs at 160 width
- [ ] Snapshot: Active tab styling
- [ ] Snapshot: Inactive tab styling
- [ ] Snapshot: Multiple tabs side-by-side
- [ ] Snapshot: Tab with long label (truncation)
- [ ] Snapshot: Complete tabbed interface

**Acceptance Criteria:**
- All snapshots generated
- Visual output verified manually
- Snapshots committed to repo

### Task 11: Documentation
**Estimated Time:** 2 hours
**Dependencies:** Task 10

- [ ] Create `docs/components/tabs.md` with usage guide
- [ ] Add API documentation for TabController
- [ ] Add API documentation for Tab component
- [ ] Add API documentation for Pane component
- [ ] Include complete usage example
- [ ] Document styling customization
- [ ] Add edge case handling notes
- [ ] Include screenshots/examples of output

**Documentation Structure:**
```markdown
# Tabs Component

## Overview
Brief description and use cases

## Installation
Import statements

## Basic Usage
Simple example

## API Reference
### TabController
### Tab
### Pane

## Advanced Usage
- Multiple tabs
- Custom styling
- Responsive layouts

## Examples
Complete working examples

## Edge Cases
How to handle common issues
```

**Acceptance Criteria:**
- Documentation complete and clear
- All APIs documented
- Examples tested and working

### Task 12: Code Review & Polish
**Estimated Time:** 1 hour
**Dependencies:** Task 11

- [ ] Run full test suite and verify all passing
- [ ] Run lint and fix any issues
- [ ] Run format and ensure consistency
- [ ] Review TypeScript strict mode compliance
- [ ] Check for NeverNesters principle violations
- [ ] Verify error handling follows project patterns
- [ ] Review code comments and documentation
- [ ] Verify all files have proper exports

**Commands to Run:**
```bash
bun test
mise run lint
mise run format
mise run build
```

**Acceptance Criteria:**
- All tests passing (100%)
- No lint errors
- Code formatted correctly
- Build succeeds
- TypeScript strict mode compliance

## Timeline

**Total Estimated Time:** 18-22 hours (3-5 business days)

- **Day 1:** Tasks 1-3 (Setup, TabController, Tab)
- **Day 2:** Tasks 4-5 (Pane, Wiring)
- **Day 3:** Tasks 6-8 (Unit Tests)
- **Day 4:** Tasks 9-10 (Integration & Snapshot Tests)
- **Day 5:** Tasks 11-12 (Documentation & Polish)

## Dependencies

### Required Components
- ✅ Component interface
- ✅ Flex layout
- ✅ Container layout
- ✅ Sized layout
- ✅ Text component
- ✅ Theme system

### Testing Infrastructure
- ⏳ Test helpers (test-theme, output-matchers, width-tester)
- ⏳ strip-ansi package installed
- ✅ Vitest configured

## Risks & Mitigation

### Risk 1: Testing Infrastructure Not Ready
**Impact:** Cannot write comprehensive tests
**Mitigation:** Complete Phase 2 (Testing Infrastructure) first, or implement minimal test helpers inline

### Risk 2: Theme Integration Complexity
**Impact:** Active/inactive styling may be complex
**Mitigation:** Start with simple styling, iterate based on visual review

### Risk 3: Layout Integration Issues
**Impact:** Tabs may not compose well with Flex/Container
**Mitigation:** Write integration tests early to catch issues

### Risk 4: Performance with Many Tabs
**Impact:** Rendering many tabs may be slow
**Mitigation:** Add performance benchmarks, optimize if needed

## Success Criteria

- ✅ All 12 tasks completed
- ✅ 100% test coverage for TabController, Tab, Pane
- ✅ Integration tests passing with real layout components
- ✅ Snapshot tests generated and verified
- ✅ Documentation complete with working examples
- ✅ TypeScript strict mode compliance
- ✅ No lint errors
- ✅ Build succeeds
- ✅ GitHub issue #4 can be closed

## Next Steps After Completion

1. Update `.memory/summary.md` with completion status
2. Distill learnings to `.memory/learning-tabs-component.md`
3. Close GitHub issue #4
4. Update epic status
5. Plan next interactive component (Modal or Table)

## Related Documents

- **Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Architecture:** [Component Architecture Patterns](learning-62c593ff-component-architecture-patterns.md)
- **Layout:** [Layout Systems](learning-96aa4357-layout-systems.md)
- **Testing:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)

## GitHub References

- **Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)
- **Epic Label:** (to be created)
- **Milestone:** (to be created)
