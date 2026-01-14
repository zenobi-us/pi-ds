# Task: Unit Tests - TabController

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** planned
**Priority:** high
**Estimated Time:** 2 hours
**Dependencies:** [Wire Controller to Components](task-225722a7-wire-controller-to-components.md)

## Objective

Create comprehensive unit tests for TabController covering all methods, edge cases, and error handling scenarios.

## Steps to Take

1. Create test file `tests/unit/tabs/TabController.test.ts`
2. Set up test imports and helpers
3. Write test: Initialize with empty state
4. Write test: Add single tab and retrieve it
5. Write test: Add multiple tabs at once
6. Write test: Add single pane and retrieve it
7. Write test: Add multiple panes at once
8. Write test: Set active tab and verify state
9. Write test: Get active tab ID
10. Write test: Handle invalid tab ID in setActive
11. Write test: Handle duplicate tab IDs
12. Write test: getTab returns undefined for non-existent ID
13. Write test: getPane returns undefined for non-existent ID
14. Write test: Initial active state from tab options

## Test Structure

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

## Expected Outcome

- All TabController functionality thoroughly tested
- Edge cases covered (invalid IDs, duplicates, etc.)
- Error handling verified
- State management validated
- All tests passing

## Acceptance Criteria

- [ ] Test file `tests/unit/tabs/TabController.test.ts` created
- [ ] Test: Controller initializes with null activeId
- [ ] Test: addTab stores tab correctly
- [ ] Test: addTab calls setController on tab
- [ ] Test: addTabs adds multiple tabs
- [ ] Test: addPane stores pane correctly
- [ ] Test: addPane calls setController on pane
- [ ] Test: addPanes adds multiple panes
- [ ] Test: setActive updates activeId
- [ ] Test: setActive throws error for invalid tab ID
- [ ] Test: getActive returns current activeId
- [ ] Test: getActive returns null initially
- [ ] Test: getTab returns correct tab by ID
- [ ] Test: getTab returns undefined for non-existent ID
- [ ] Test: getPane returns correct pane by ID
- [ ] Test: getPane returns undefined for non-existent ID
- [ ] Test: First tab with active:true becomes active automatically
- [ ] Test: Adding duplicate tab IDs (define expected behavior)
- [ ] All tests pass: `bun test tests/unit/tabs/TabController.test.ts`
- [ ] Coverage for all public methods
- [ ] TypeScript strict mode compliance

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **Testing Guide:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Follow TDD principles: write tests that fail first, then implement
- Use descriptive test names that explain the scenario
- Group related tests using nested describe blocks
- Test both happy path and error cases
- Verify error messages are helpful
- Use test-theme helper for consistent theme in tests
