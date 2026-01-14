# Task: Implement Tab Component

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** planned
**Priority:** high
**Estimated Time:** 2 hours
**Dependencies:** [Implement TabController](task-aa5de87e-implement-tabcontroller.md)

## Objective

Implement the Tab component class that renders tab labels/headers with active/inactive state styling and handles selection callbacks.

## Steps to Take

1. Define Tab class implementing Component interface
2. Implement constructor accepting id, label, options
3. Store TabController reference for state queries
4. Implement `render(width: number): string[]`
5. Implement active state styling (theme highlight)
6. Implement inactive state styling (theme normal)
7. Implement `isActive(): boolean` helper
8. Implement `getId(): string` helper
9. Handle onSelect callback invocation
10. Add width constraints and overflow handling

## Code Structure

```typescript
// src/tabs/Tab.ts
import type { Component } from '../types';
import type { Theme } from '../theme/types';
import type { TabOptions } from './types';
import type { TabController } from './TabController';

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

## Expected Outcome

- Tab component renders correctly in active state
- Tab component renders correctly in inactive state
- Label component renders properly within tab
- Width constraints handled gracefully
- Component interface compliance verified
- Active/inactive styling uses theme colors appropriately

## Acceptance Criteria

- [ ] Tab class defined in `src/tabs/Tab.ts`
- [ ] Implements Component interface with `render(width: number): string[]`
- [ ] Constructor stores id, label, and options
- [ ] `setController()` method stores controller reference
- [ ] `render()` method returns formatted tab output
- [ ] Active tabs use theme highlight colors
- [ ] Inactive tabs use theme normal colors
- [ ] `isActive()` method checks controller state
- [ ] `isActive()` falls back to options.active when no controller
- [ ] `getId()` method returns tab ID
- [ ] Width constraints handle padding (e.g., width - 4 for borders)
- [ ] Label overflow handled gracefully
- [ ] TypeScript strict mode compliance
- [ ] `mise run lint` passes
- [ ] `mise run build` succeeds

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **Architecture:** [Component Architecture Patterns](learning-62c593ff-component-architecture-patterns.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Tab renders the visible tab label/header portion of the interface
- Active state should be visually distinct (e.g., highlighted, different color)
- Label is itself a Component, allowing rich tab labels
- Width handling must account for padding and borders
- Follow theme system for consistent styling
