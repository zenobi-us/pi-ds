# Task: Wire Controller to Components

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** planned
**Priority:** high
**Estimated Time:** 1 hour
**Dependencies:** 
- [Implement TabController](task-aa5de87e-implement-tabcontroller.md)
- [Implement Tab Component](task-51febb21-implement-tab-component.md)
- [Implement Pane Component](task-a7be368b-implement-pane-component.md)

## Objective

Establish bidirectional communication between TabController and Tab/Pane components by ensuring the controller calls `setController(this)` when components are added.

## Steps to Take

1. Update TabController.addTab to call `tab.setController(this)`
2. Update TabController.addTabs to call setController for each tab
3. Update TabController.addPane to call `pane.setController(this)`
4. Update TabController.addPanes to call setController for each pane
5. Ensure bidirectional communication works
6. Test state synchronization between controller and components
7. Verify active state propagates correctly

## Expected Outcome

- Controller and components are properly linked
- State changes in controller reflect immediately in components
- Components can query controller for active state
- No circular dependency issues
- State synchronization verified

## Acceptance Criteria

- [ ] `TabController.addTab()` calls `tab.setController(this)`
- [ ] `TabController.addTabs()` calls setController for each tab
- [ ] `TabController.addPane()` calls `pane.setController(this)`
- [ ] `TabController.addPanes()` calls setController for each pane
- [ ] Tab.isActive() correctly queries controller state
- [ ] Pane.isActive() correctly queries controller state
- [ ] Changing active tab via `setActive()` updates component state
- [ ] Manual test: create controller, add tab, verify isActive() works
- [ ] Manual test: create controller, add pane, verify isActive() works
- [ ] Manual test: change active tab, verify both old and new tabs update
- [ ] No circular reference errors in TypeScript
- [ ] TypeScript strict mode compliance
- [ ] `mise run lint` passes
- [ ] `mise run build` succeeds

## Manual Testing

```typescript
// Test script to verify wiring
import { TabController, Tab, Pane } from './src/tabs';
import { Text } from './src/text';
import { theme } from './tests/helpers/test-theme';

const controller = new TabController();

const tab1 = new Tab('tab1', new Text(theme, 'Tab 1'), { active: true });
const tab2 = new Tab('tab2', new Text(theme, 'Tab 2'));

controller.addTabs(tab1, tab2);

console.log('Tab 1 active?', tab1.isActive()); // Should be true
console.log('Tab 2 active?', tab2.isActive()); // Should be false

controller.setActive('tab2');

console.log('Tab 1 active?', tab1.isActive()); // Should be false
console.log('Tab 2 active?', tab2.isActive()); // Should be true
```

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- This wiring creates the "magic" of state synchronization
- Controller is the single source of truth for active state
- Components query controller rather than maintaining duplicate state
- Bidirectional reference is safe because controller owns the lifecycle
- setController pattern avoids constructor coupling
