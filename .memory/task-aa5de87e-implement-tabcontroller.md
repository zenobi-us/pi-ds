# Task: Implement TabController

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** completed
**Priority:** high
**Estimated Time:** 2 hours
**Dependencies:** [Setup & Structure](task-cc5daf26-setup-and-structure.md)

## Objective

Implement the TabController class for managing tab state, including adding tabs/panes, tracking active state, and providing state query methods.

## Steps to Take

1. Define TabController class structure
2. Implement constructor with initial state
3. Implement `addTab(tab: Tab): void`
4. Implement `addTabs(...tabs: Tab[]): void`
5. Implement `addPane(pane: Pane): void`
6. Implement `addPanes(...panes: Pane[]): void`
7. Implement `setActive(id: string): void`
8. Implement `getActive(): string | null`
9. Implement `getTab(id: string): Tab | undefined`
10. Implement `getPane(id: string): Pane | undefined`
11. Add error handling for invalid IDs
12. Add TypeScript strict mode compliance

## Code Structure

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

## Expected Outcome

- TabController class fully implemented
- All methods working correctly
- State management functional
- TypeScript strict mode passing
- No duplicate ID handling implemented
- Error handling for invalid IDs

## Acceptance Criteria

- [x] TabController class defined in `src/tabs/TabController.ts`
- [x] Constructor initializes empty maps and null activeId
- [x] `addTab()` method stores tab and sets controller reference
- [x] `addTabs()` method adds multiple tabs
- [x] `addPane()` method stores pane and sets controller reference
- [x] `addPanes()` method adds multiple panes
- [x] `setActive()` method updates activeId
- [x] `setActive()` throws error for invalid tab ID
- [x] `getActive()` returns current activeId
- [x] `getTab()` returns tab by ID or undefined
- [x] `getPane()` returns pane by ID or undefined
- [x] TypeScript strict mode compliance verified
- [x] `mise run lint` passes (5 warnings only)
- [x] `mise run build` succeeds (32 modules bundled)

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- TabController is the central state manager for the tab system
- It maintains bidirectional links with Tab and Pane components
- Error handling should be explicit with type checking
- Follow error pattern: `error instanceof Error ? error.toString() : String(error)`
