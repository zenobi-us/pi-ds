# Task: Unit Tests - Tab Component

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** planned
**Priority:** high
**Estimated Time:** 2 hours
**Dependencies:** [Wire Controller to Components](task-225722a7-wire-controller-to-components.md)

## Objective

Create comprehensive unit tests for the Tab component covering rendering, active/inactive states, styling, callbacks, and edge cases.

## Steps to Take

1. Create test file `tests/unit/tabs/Tab.test.ts`
2. Set up test imports and helpers
3. Write test: Render in active state with highlighting
4. Write test: Render in inactive state without highlighting
5. Write test: Trigger onSelect callback when selected
6. Write test: Return correct ID from getId()
7. Write test: isActive returns true when controller reports active
8. Write test: isActive returns false when controller reports inactive
9. Write test: isActive uses options.active when no controller
10. Write test: Label component renders correctly
11. Write test: Handle narrow width constraints
12. Write test: Handle very long labels with truncation

## Test Structure

```typescript
import { describe, it, expect, vi } from 'vitest';
import { Tab } from '../../../src/tabs/Tab';
import { TabController } from '../../../src/tabs/TabController';
import { Text } from '../../../src/text';
import { theme } from '../../helpers/test-theme';
import { stripAnsi } from '../../helpers/output-matchers';

describe('Tab', () => {
  it('should render in active state with highlighting', () => {
    const controller = new TabController();
    const tab = new Tab('tab1', new Text(theme, 'Active Tab'));
    
    controller.addTab(tab);
    controller.setActive('tab1');
    
    const output = tab.render(40);
    
    expect(output.length).toBeGreaterThan(0);
    // Verify highlight colors present
  });

  it('should render in inactive state without highlighting', () => {
    const controller = new TabController();
    const tab = new Tab('tab1', new Text(theme, 'Inactive Tab'));
    
    controller.addTab(tab);
    controller.setActive('other-tab');
    
    const output = tab.render(40);
    
    expect(output.length).toBeGreaterThan(0);
    // Verify normal colors, no highlight
  });

  // ... more tests
});
```

## Expected Outcome

- All Tab rendering scenarios tested
- Active/inactive state styling verified
- Callback behavior confirmed
- Width handling tested
- Edge cases covered
- All tests passing

## Acceptance Criteria

- [ ] Test file `tests/unit/tabs/Tab.test.ts` created
- [ ] Test: Active tab renders with theme highlight colors
- [ ] Test: Inactive tab renders with theme normal colors
- [ ] Test: onSelect callback invoked when tab selected
- [ ] Test: onSelect callback not invoked when already active
- [ ] Test: getId() returns correct tab ID
- [ ] Test: isActive() returns true when controller reports active
- [ ] Test: isActive() returns false when controller reports inactive
- [ ] Test: isActive() uses options.active when no controller set
- [ ] Test: isActive() defaults to false when no controller or options
- [ ] Test: Label component renders within tab boundaries
- [ ] Test: Narrow width (e.g., 20 chars) handled gracefully
- [ ] Test: Very long label truncated or wrapped appropriately
- [ ] Test: Tab renders without controller (standalone mode)
- [ ] All tests pass: `bun test tests/unit/tabs/Tab.test.ts`
- [ ] Coverage for render() method at multiple widths
- [ ] Snapshot tests for visual verification (optional in unit tests)

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **Testing Guide:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)
- **Architecture:** [Component Architecture Patterns](learning-62c593ff-component-architecture-patterns.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Use stripAnsi helper to verify content independent of ANSI codes
- Test both with and without controller to verify fallback behavior
- Verify theme colors are applied correctly
- Test callbacks using vitest mock functions (vi.fn())
- Width constraints are critical for TUI - test edge cases
- Consider adding snapshot tests for visual verification
