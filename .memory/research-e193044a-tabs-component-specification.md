# Specification: Tabs Component

**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Phase:** [Phase 3: Interactive Components](epic-62d4d25c-pi-ds-tui-design-system.md#phase-3-interactive-components-)
**GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)
**Status:** Draft
**Created:** 2026-01-14

## Overview

The Tabs component provides a tabbed interface pattern for organizing content into multiple panes where only one pane is visible at a time. This specification defines the architecture, API, and behavior for implementing tabs in the pi-ds TUI design system.

## Goals

- Enable creation of tabbed interfaces with multiple content panes
- Support both explicit and implicit tab activation control
- Leverage existing layout components (Flex/Grid) for tab orientation
- Provide clean separation between controller logic and rendering
- Follow pi-ds component architecture patterns

## Architecture

### Component Hierarchy

```
TabController (state management)
  ├─ Tabs (collection of Tab components)
  └─ Panes (collection of Pane components)

Rendering Structure:
  Flex({ mode: 'fill' })
    ├─ Sized(Container, width)
    │   └─ Tab components (renders only active tabs)
    └─ Container
        └─ Pane components (renders only active pane)
```

### Core Components

#### 1. **TabController**
**Responsibility:** State management and coordination

**API:**
- `constructor()` - Initialize controller with empty state
- `addTab(tab: Tab): void` - Register a tab with the controller
- `addTabs(...tabs: Tab[]): void` - Register multiple tabs
- `addPane(pane: Pane): void` - Register a pane with the controller
- `addPanes(...panes: Pane[]): void` - Register multiple panes
- `setActive(id: string): void` - Set the active tab/pane by ID
- `getActive(): string | null` - Get current active tab ID
- `getTab(id: string): Tab | undefined` - Get tab by ID
- `getPane(id: string): Pane | undefined` - Get pane by ID

**State:**
- `tabs: Map<string, Tab>` - Registered tabs
- `panes: Map<string, Pane>` - Registered panes
- `activeId: string | null` - Currently active tab ID

#### 2. **Tab**
**Responsibility:** Render individual tab labels/headers

**API:**
- `constructor(id: string, label: Component, options?: TabOptions)`
- `render(width: number): string[]` - Render tab with active/inactive styling
- `isActive(): boolean` - Check if this tab is currently active
- `getId(): string` - Get tab identifier

**Options:**
```typescript
interface TabOptions {
  active?: boolean;           // Initial active state
  onSelect?: () => void;      // Callback when tab is selected
}
```

**Rendering:**
- Active tabs: highlighted/styled to indicate selection
- Inactive tabs: normal/dimmed styling
- Tab content: rendered from label Component

#### 3. **Pane**
**Responsibility:** Render content associated with a tab

**API:**
- `constructor(tabId: string, content: Component)`
- `render(width: number): string[]` - Render pane content if active
- `isActive(): boolean` - Check if associated tab is active
- `getTabId(): string` - Get associated tab ID

**Rendering:**
- Only renders when associated tab is active
- Returns empty array when inactive
- Full-width rendering of content component

## Component Interface Compliance

All components (Tab, Pane) implement the core `Component` interface:

```typescript
interface Component {
  render(width: number): string[];
}
```

TabController is NOT a component - it's a state management utility.

## Usage Example

Based on the GitHub issue example:

```typescript
import { TabController, Tab, Pane } from './tabs';
import { Flex, Container, Sized, Text } from './layout';
import { theme } from './theme';

// 1. Setup state management
const controller = new TabController();

// 2. Create tabs with explicit and implicit control
const tab1 = new Tab("tab1", new Text(theme, "Home"), {
  active: true,
  onSelect: () => controller.setActive("tab1")  // explicit control
});

const tab2 = new Tab("tab2", new Text(theme, "Settings"));  // implicit control

controller.addTabs(tab1, tab2);

// 3. Create panes with content
const pane1 = new Pane("tab1", new Text(theme, "Home Content"));
const pane2 = new Pane("tab2", new Text(theme, "Settings Content"));

controller.addPanes(pane1, pane2);

// 4. Setup rendering structure
const frame = new Flex({ mode: "fill" });

// Sidebar with tabs
const sidebar = new Container();
sidebar.addChild(tab1);
sidebar.addChild(tab2);

// Content area with panes
const page = new Container();
page.addChild(pane1);
page.addChild(pane2);

// Compose layout
frame.addChild(new Sized(sidebar, 64));  // Fixed width sidebar
frame.addChild(page);                    // Fill remaining space

// 5. Render
const output = frame.render(120);  // Render at 120 chars width
console.log(output.join('\n'));
```

## Behavioral Requirements

### Tab Selection

1. **Initial State:** First tab marked `active: true` or none active
2. **Activation:** Only one tab can be active at a time
3. **Explicit Control:** Tab's `onSelect` callback controls activation
4. **Implicit Control:** Controller manages activation automatically

### Pane Visibility

1. **Active Display:** Only the pane matching the active tab ID renders content
2. **Inactive State:** Inactive panes return empty array from `render()`
3. **No Match:** If no tab is active, no panes render

### Layout Control

1. **Orientation:** Controlled by parent Flex/Grid components
   - Horizontal tabs: Flex with `direction: 'row'`
   - Vertical tabs: Flex with `direction: 'column'`
2. **Sizing:** Tab container uses `Sized` for fixed dimensions
3. **Responsive:** Pane content fills available space

## Styling Requirements

### Active Tab Styling
- Use theme highlight color
- Bold or underline text
- Visual indicator (border, background)

### Inactive Tab Styling  
- Use theme normal/dimmed color
- Regular text weight
- Subtle appearance

### Pane Styling
- No special styling (delegates to content component)
- Full-width rendering within container

## Testing Requirements

### Unit Tests

**TabController:**
- ✅ Initialize with empty state
- ✅ Add single tab and retrieve it
- ✅ Add multiple tabs
- ✅ Add panes and associate with tabs
- ✅ Set active tab and verify state
- ✅ Get active tab ID
- ✅ Handle invalid tab IDs gracefully

**Tab:**
- ✅ Render with active state
- ✅ Render with inactive state  
- ✅ Trigger onSelect callback
- ✅ Return correct ID
- ✅ Render label component correctly

**Pane:**
- ✅ Render content when active
- ✅ Return empty when inactive
- ✅ Check active state correctly
- ✅ Return correct tab ID

### Integration Tests

- ✅ Full tab switching workflow
- ✅ Multiple tabs with multiple panes
- ✅ Layout integration (Flex + Sized + Container)
- ✅ Theme application to tabs
- ✅ Responsive rendering at different widths

### Snapshot Tests

- ✅ Horizontal tab layout at 80, 120, 160 width
- ✅ Vertical tab layout at 80, 120, 160 width
- ✅ Active tab styling
- ✅ Inactive tab styling
- ✅ Tab switching transitions

## Edge Cases

1. **No Active Tab:** All panes should return empty arrays
2. **Invalid Tab ID:** `setActive()` with non-existent ID should no-op or error
3. **Orphan Pane:** Pane with no matching tab should never render
4. **Duplicate IDs:** Controller should reject or overwrite duplicate tab IDs
5. **Empty Content:** Tab/Pane with empty content should render empty gracefully
6. **Minimum Width:** Tabs should handle very narrow widths (< 20 chars)

## Implementation Phases

### Phase 1: Core Components
1. Implement `TabController` class
2. Implement `Tab` component
3. Implement `Pane` component
4. Write unit tests for all three

### Phase 2: Integration
1. Test with existing layout components (Flex, Container, Sized)
2. Verify theme integration
3. Create integration test suite

### Phase 3: Polish
1. Implement active/inactive styling
2. Add keyboard navigation (future enhancement)
3. Performance optimization
4. Snapshot tests

## Dependencies

- **Required Components:** Flex, Container, Sized, Text
- **Required Systems:** Theme system
- **Testing:** Vitest, strip-ansi
- **TypeScript:** Strict mode compliance

## Open Questions

1. **Keyboard Navigation:** Should tabs support arrow key navigation? (Deferred to future)
2. **Tab Overflow:** How to handle too many tabs for available width? (Scrolling? Ellipsis?)
3. **Close Buttons:** Should tabs support close/remove functionality?
4. **Tab Reordering:** Support drag-to-reorder or programmatic reordering?
5. **Icons:** Support icons alongside labels?

## Success Metrics

- ✅ All unit tests passing
- ✅ All integration tests passing
- ✅ TypeScript strict mode compliance
- ✅ Example usage documented
- ✅ Renders correctly at multiple widths
- ✅ Clean separation of concerns (controller vs rendering)

## Related Documents

- **Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
- **Architecture:** [Component Architecture Patterns](learning-62c593ff-component-architecture-patterns.md)
- **Layout:** [Layout Systems](learning-96aa4357-layout-systems.md)
- **Testing:** [Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md)

## References

- GitHub Issue: https://github.com/zenobi-us/pi-ds/issues/4
- Example architecture and usage provided by @airtonix
