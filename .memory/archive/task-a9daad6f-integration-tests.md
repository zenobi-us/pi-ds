# Task: Integration Tests

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** completed
**Priority:** high
**Estimated Time:** 3 hours
**Dependencies:**
- [Unit Tests - TabController](task-392b4567-unit-tests-tabcontroller.md)
- [Unit Tests - Tab Component](task-1ebf02fe-unit-tests-tab-component.md)
- [Unit Tests - Pane Component](task-a3abc41b-unit-tests-pane-component.md)

## Objective

Create comprehensive integration tests that verify the complete tabs system works correctly with real layout components (Flex, Container, Sized) and theme system.

## Steps to Take

1. Create test file `tests/integration/tabs/tabs-integration.test.ts`
2. Test: Full tab switching workflow
3. Test: Multiple tabs with multiple panes
4. Test: Integration with Flex layout component
5. Test: Integration with Container component
6. Test: Integration with Sized component
7. Test: Theme application to active tabs
8. Test: Theme application to inactive tabs
9. Test: Responsive rendering at 80, 120, 160 widths
10. Test: Horizontal tab layout
11. Test: Tab selection changes pane visibility
12. Test: Example usage from specification works

## Test Structure

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

  it('should switch active pane when tab changes', () => {
    const controller = new TabController();
    
    const tab1 = new Tab("tab1", new Text(theme, "Tab 1"), { active: true });
    const tab2 = new Tab("tab2", new Text(theme, "Tab 2"));
    controller.addTabs(tab1, tab2);
    
    const pane1 = new Pane("tab1", new Text(theme, "Content 1"));
    const pane2 = new Pane("tab2", new Text(theme, "Content 2"));
    controller.addPanes(pane1, pane2);
    
    const container = new Container();
    container.addChild(pane1);
    container.addChild(pane2);
    
    // Initially tab1 active
    let output = container.render(80);
    expect(output.join('\n')).toContain('Content 1');
    expect(output.join('\n')).not.toContain('Content 2');
    
    // Switch to tab2
    controller.setActive('tab2');
    output = container.render(80);
    expect(output.join('\n')).not.toContain('Content 1');
    expect(output.join('\n')).toContain('Content 2');
  });

  // ... more tests
});
```

## Expected Outcome

- Complete tab system works end-to-end
- Integration with layout components verified
- Real-world usage patterns tested
- Responsive behavior confirmed
- Theme integration validated
- All tests passing

## Acceptance Criteria

- [x] Test file `tests/integration/tabs/tabs-integration.test.ts` created
- [x] Test: Full tabbed interface renders correctly
- [x] Test: Tab switching changes visible pane
- [x] Test: Multiple tabs and panes work together
- [x] Test: Integration with Flex layout (side-by-side tabs/content)
- [x] Test: Integration with Container (stacked tabs/content)
- [x] Test: Integration with Sized (fixed-width sidebar)
- [x] Test: Theme colors applied to active tabs
- [x] Test: Theme colors applied to inactive tabs
- [x] Test: Rendering at 80 character width
- [x] Test: Rendering at 120 character width
- [x] Test: Rendering at 160 character width
- [x] Test: Horizontal tab layout pattern
- [x] Test: Example from specification document works
- [x] Test: Complex nested layouts with tabs
- [x] All tests pass: `bun test tests/integration/tabs/`
- [x] No integration issues between components

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **Testing Guide:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)
- **Layout Systems:** [Layout Systems](learning-96aa4357-layout-systems.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Integration tests verify components work together, not in isolation
- Use real components (not mocks) for authentic integration testing
- Test realistic usage patterns from specification
- Verify responsive behavior at different widths
- Theme integration is critical for visual consistency
- These tests catch issues unit tests miss (component interaction bugs)
