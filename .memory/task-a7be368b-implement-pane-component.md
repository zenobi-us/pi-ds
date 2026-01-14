# Task: Implement Pane Component

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** planned
**Priority:** high
**Estimated Time:** 1 hour
**Dependencies:** [Implement TabController](task-aa5de87e-implement-tabcontroller.md)

## Objective

Implement the Pane component class that conditionally renders content based on which tab is active, showing content only when its associated tab is selected.

## Steps to Take

1. Define Pane class implementing Component interface
2. Implement constructor accepting tabId, content
3. Store TabController reference for state queries
4. Implement `render(width: number): string[]`
5. Return content when active, empty array when inactive
6. Implement `isActive(): boolean` helper
7. Implement `getTabId(): string` helper
8. Handle full-width content rendering

## Code Structure

```typescript
// src/tabs/Pane.ts
import type { Component } from '../types';
import type { TabController } from './TabController';

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

## Expected Outcome

- Pane component renders content when its tab is active
- Pane component returns empty array when its tab is inactive
- Content component renders at full available width
- Component interface compliance verified
- State queries work correctly through controller

## Acceptance Criteria

- [ ] Pane class defined in `src/tabs/Pane.ts`
- [ ] Implements Component interface with `render(width: number): string[]`
- [ ] Constructor stores tabId and content
- [ ] `setController()` method stores controller reference
- [ ] `render()` returns empty array when inactive
- [ ] `render()` returns content.render(width) when active
- [ ] `isActive()` checks if controller.getActive() matches tabId
- [ ] `isActive()` returns false when no controller
- [ ] `getTabId()` returns the associated tab ID
- [ ] Content renders at full width (no padding reduction)
- [ ] TypeScript strict mode compliance
- [ ] `mise run lint` passes
- [ ] `mise run build` succeeds

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **Architecture:** [Component Architecture Patterns](learning-62c593ff-component-architecture-patterns.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Pane is simpler than Tab - it's a visibility controller for content
- Only one pane should be visible at a time (matching active tab)
- Content is any Component, allowing maximum flexibility
- Empty array return is how TUI components indicate "no output"
- Full width rendering means pane doesn't add padding/borders
