# Task: Unit Tests - Pane Component

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** completed
**Priority:** high
**Estimated Time:** 1.5 hours
**Dependencies:** [Wire Controller to Components](task-225722a7-wire-controller-to-components.md)

## Objective

Create comprehensive unit tests for the Pane component covering conditional rendering, active/inactive states, and content forwarding.

## Steps to Take

1. Create test file `tests/unit/tabs/Pane.test.ts`
2. Set up test imports and helpers
3. Write test: Render content when active
4. Write test: Return empty array when inactive
5. Write test: isActive returns true when tab is active
6. Write test: isActive returns false when tab is inactive
7. Write test: isActive returns false when no controller
8. Write test: getTabId returns correct tab ID
9. Write test: Content renders at full width
10. Write test: Handle empty content gracefully

## Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { Pane } from '../../../src/tabs/Pane';
import { TabController } from '../../../src/tabs/TabController';
import { Tab } from '../../../src/tabs/Tab';
import { Text } from '../../../src/text';
import { Container } from '../../../src/container';
import { theme } from '../../helpers/test-theme';

describe('Pane', () => {
  it('should render content when active', () => {
    const controller = new TabController();
    const tab = new Tab('tab1', new Text(theme, 'Tab 1'));
    const content = new Text(theme, 'Pane Content');
    const pane = new Pane('tab1', content);
    
    controller.addTab(tab);
    controller.addPane(pane);
    controller.setActive('tab1');
    
    const output = pane.render(80);
    
    expect(output.length).toBeGreaterThan(0);
    expect(output.join('\n')).toContain('Pane Content');
  });

  it('should return empty array when inactive', () => {
    const controller = new TabController();
    const tab1 = new Tab('tab1', new Text(theme, 'Tab 1'));
    const tab2 = new Tab('tab2', new Text(theme, 'Tab 2'));
    const content = new Text(theme, 'Pane Content');
    const pane = new Pane('tab1', content);
    
    controller.addTabs(tab1, tab2);
    controller.addPane(pane);
    controller.setActive('tab2'); // Different tab active
    
    const output = pane.render(80);
    
    expect(output).toEqual([]);
  });

  // ... more tests
});
```

## Expected Outcome

- All Pane visibility logic tested
- Active/inactive behavior verified
- Content forwarding validated
- Edge cases covered
- All tests passing

## Acceptance Criteria

- [x] Test file `tests/unit/tabs/Pane.test.ts` created
- [x] Test: Pane renders content.render() when active
- [x] Test: Pane returns empty array when inactive
- [x] Test: Content rendered at full width (no padding reduction)
- [x] Test: isActive() returns true when controller.getActive() matches tabId
- [x] Test: isActive() returns false when controller.getActive() differs
- [x] Test: isActive() returns false when no controller set
- [x] Test: getTabId() returns correct tab ID
- [x] Test: Complex content (Container with children) renders correctly
- [x] Test: Empty/minimal content handled gracefully
- [x] Test: Content width matches pane width
- [x] Test: Multiple panes with same controller, only one active
- [x] All tests pass: `bun test tests/unit/tabs/Pane.test.ts`
- [x] Coverage for render() method in both active/inactive states

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **Testing Guide:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)
- **Architecture:** [Component Architecture Patterns](learning-62c593ff-component-architecture-patterns.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Pane tests are simpler than Tab tests (less styling logic)
- Focus on conditional rendering: active vs inactive
- Verify content is passed through unchanged when active
- Test that multiple panes can share a controller
- Verify width is forwarded to content without modification
- Empty array is the TUI convention for "render nothing"
