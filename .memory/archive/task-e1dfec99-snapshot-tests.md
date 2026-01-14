# Task: Snapshot Tests

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** completed
**Priority:** medium
**Estimated Time:** 2 hours
**Dependencies:** [Integration Tests](task-a9daad6f-integration-tests.md)

## Objective

Create vitest snapshot tests to capture and verify visual output of the Tabs component system at various states and widths, providing regression protection for visual rendering.

## Steps to Take

1. Create test file `tests/integration/tabs/tabs-snapshots.test.ts`
2. Set up snapshot normalization (ANSI codes, timestamps, etc.)
3. Create snapshot: Horizontal tabs at 80 width
4. Create snapshot: Horizontal tabs at 120 width
5. Create snapshot: Horizontal tabs at 160 width
6. Create snapshot: Active tab styling
7. Create snapshot: Inactive tab styling
8. Create snapshot: Multiple tabs side-by-side
9. Create snapshot: Tab with long label (truncation)
10. Create snapshot: Complete tabbed interface
11. Review snapshots manually for correctness
12. Commit snapshots to repository

## Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { TabController, Tab, Pane } from '../../../src/tabs';
import { Flex, Container, Sized, Text } from '../../../src';
import { theme } from '../../helpers/test-theme';
import { normalizeOutput } from '../../helpers/output-matchers';

describe('Tabs Snapshots', () => {
  it('should match snapshot for horizontal tabs at 80 width', () => {
    const controller = new TabController();
    
    const tab1 = new Tab("tab1", new Text(theme, "Home"), { active: true });
    const tab2 = new Tab("tab2", new Text(theme, "Profile"));
    const tab3 = new Tab("tab3", new Text(theme, "Settings"));
    
    controller.addTabs(tab1, tab2, tab3);
    
    const container = new Container();
    container.addChild(tab1);
    container.addChild(tab2);
    container.addChild(tab3);
    
    const output = container.render(80);
    const normalized = normalizeOutput(output);
    
    expect(normalized).toMatchSnapshot();
  });

  it('should match snapshot for complete tabbed interface', () => {
    const controller = new TabController();
    
    const tab1 = new Tab("tab1", new Text(theme, "Home"), { active: true });
    const tab2 = new Tab("tab2", new Text(theme, "Settings"));
    controller.addTabs(tab1, tab2);
    
    const pane1 = new Pane("tab1", new Text(theme, "Welcome to Home"));
    const pane2 = new Pane("tab2", new Text(theme, "Settings Panel"));
    controller.addPanes(pane1, pane2);
    
    const frame = new Flex({ mode: "fill" });
    const sidebar = new Container();
    sidebar.addChild(tab1);
    sidebar.addChild(tab2);
    
    const content = new Container();
    content.addChild(pane1);
    content.addChild(pane2);
    
    frame.addChild(new Sized(sidebar, 64));
    frame.addChild(content);
    
    const output = frame.render(120);
    const normalized = normalizeOutput(output);
    
    expect(normalized).toMatchSnapshot();
  });

  // ... more snapshot tests
});
```

## Expected Outcome

- Snapshot files created in `tests/integration/tabs/__snapshots__/`
- Visual regression protection for tab rendering
- Documentation of expected visual output
- All snapshots reviewed and committed
- Baseline established for future changes

## Acceptance Criteria

- [x] Test file `tests/integration/tabs/tabs-snapshots.test.ts` created
- [x] Snapshot: Horizontal tabs at 80 character width
- [x] Snapshot: Horizontal tabs at 120 character width
- [x] Snapshot: Horizontal tabs at 160 character width
- [x] Snapshot: Active tab with highlight styling
- [x] Snapshot: Inactive tab with normal styling
- [x] Snapshot: Multiple tabs side-by-side in container
- [x] Snapshot: Tab with long label showing truncation/wrapping
- [x] Snapshot: Complete tabbed interface (tabs + panes + layout)
- [x] Snapshot: Tab switching (before and after state)
- [x] All snapshots generated: `bun test -u tests/integration/tabs/tabs-snapshots.test.ts`
- [x] Snapshots manually reviewed for correctness
- [x] Snapshots committed to git repository
- [x] normalizeOutput helper used for consistent snapshots
- [x] Snapshots pass on subsequent runs: `bun test tests/integration/tabs/tabs-snapshots.test.ts`

## Snapshot Normalization

```typescript
// Ensure ANSI codes are handled consistently
// Ensure no timestamps or random values in output
// Use test-theme for predictable colors
// Strip or normalize any dynamic content
```

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **Testing Guide:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Snapshot tests provide visual regression protection
- Review snapshots carefully before committing
- Update snapshots intentionally with `bun test -u` when changing design
- Snapshots document expected visual appearance
- Use normalizeOutput to ensure consistent, reproducible snapshots
- Test multiple widths to verify responsive behavior
- Commit snapshots to git for team collaboration
