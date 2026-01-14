# Tabs Component

A flexible tabbed interface system for organizing content into multiple panes where only one pane is visible at a time.

## Overview

The Tabs component system provides three core components that work together to create tabbed interfaces:

- **TabController**: Manages state and coordinates between tabs and panes
- **Tab**: Renders tab headers/labels that users can select
- **Pane**: Displays content associated with the active tab

**Use Cases:**
- Navigation menus with multiple sections
- Wizard/stepper interfaces with sequential steps
- Settings panels with categorized options
- Dashboard views with different data visualizations
- Documentation with multiple topics

## Installation

```typescript
import { TabController, Tab, Pane } from '@zenobi-us/pi-ds';
import { Text } from '@mariozechner/pi-tui';
import { Theme } from '@mariozechner/pi-coding-agent';
```

## Quick Start

```typescript
import { TabController, Tab, Pane } from '@zenobi-us/pi-ds';
import { Text } from '@mariozechner/pi-tui';

// Create state manager
const controller = new TabController();

// Create tabs
const homeTab = new Tab('home', new Text(theme.fg('text', 'Home'), 0, 0));
const settingsTab = new Tab('settings', new Text(theme.fg('text', 'Settings'), 0, 0));
controller.addTabs(homeTab, settingsTab);

// Create content panes
const homePane = new Pane('home', new Text(theme.fg('text', 'Welcome Home'), 0, 0));
const settingsPane = new Pane('settings', new Text(theme.fg('text', 'Settings Panel'), 0, 0));
controller.addPanes(homePane, settingsPane);

// Render tabs
const homeOutput = homeTab.render(40);
const settingsOutput = settingsTab.render(40);

// Render active pane
const paneOutput = homePane.render(80); // Shows "Welcome Home"

// Switch tabs
controller.setActive('settings');
const newPaneOutput = settingsPane.render(80); // Shows "Settings Panel"
```

## API Reference

### TabController

The central state manager for the tabs system.

#### Constructor

```typescript
constructor()
```

Creates a new TabController with empty state.

#### Methods

**`addTab(tab: Tab): void`**

Registers a single tab with the controller. Sets up bidirectional linking and auto-activates if it's the first tab or marked as active.

```typescript
const tab = new Tab('home', labelComponent);
controller.addTab(tab);
```

**`addTabs(...tabs: Tab[]): void`**

Registers multiple tabs at once.

```typescript
controller.addTabs(homeTab, profileTab, settingsTab);
```

**`addPane(pane: Pane): void`**

Registers a single pane with the controller.

```typescript
const pane = new Pane('home', contentComponent);
controller.addPane(pane);
```

**`addPanes(...panes: Pane[]): void`**

Registers multiple panes at once.

```typescript
controller.addPanes(homePane, profilePane, settingsPane);
```

**`setActive(id: string): void`**

Sets the active tab by ID. Throws an error if the tab ID doesn't exist.

```typescript
controller.setActive('settings');
```

**`getActive(): string | null`**

Returns the currently active tab ID, or null if no tab is active.

```typescript
const activeId = controller.getActive(); // 'settings'
```

**`getTab(id: string): Tab | undefined`**

Retrieves a tab by its ID.

```typescript
const tab = controller.getTab('home');
```

**`getPane(id: string): Pane | undefined`**

Retrieves a pane by its ID.

```typescript
const pane = controller.getPane('home');
```

### Tab

Renders tab headers/labels with active/inactive states.

#### Constructor

```typescript
constructor(id: string, label: Component, options?: TabOptions)
```

- **id**: Unique identifier for the tab
- **label**: Component to render as the tab label (typically Text)
- **options**: Optional configuration

```typescript
interface TabOptions {
  active?: boolean;      // Mark as initially active
  onSelect?: () => void; // Callback when tab is selected (future use)
}
```

#### Methods

**`render(width: number): string[]`**

Renders the tab label at the specified width. Returns empty array for width < 1.

```typescript
const output = tab.render(40);
```

**`isActive(): boolean`**

Checks if this tab is currently active. Queries the controller if set, otherwise falls back to `options.active`.

```typescript
if (tab.isActive()) {
  // Apply active styling
}
```

**`getId(): string`**

Returns the tab's unique identifier.

```typescript
const id = tab.getId(); // 'home'
```

**`setController(controller: TabController): void`**

Sets the controller reference. Usually called by `TabController.addTab()`.

### Pane

Displays content only when its associated tab is active.

#### Constructor

```typescript
constructor(tabId: string, content: Component)
```

- **tabId**: ID of the associated tab
- **content**: Component to render when active

```typescript
const pane = new Pane('home', contentComponent);
```

#### Methods

**`render(width: number): string[]`**

Renders the content if active, otherwise returns an empty array. Returns empty array for width < 1.

```typescript
const output = pane.render(80);
```

**`isActive(): boolean`**

Checks if the associated tab is currently active.

```typescript
if (pane.isActive()) {
  // Pane is visible
}
```

**`getTabId(): string`**

Returns the associated tab ID.

```typescript
const tabId = pane.getTabId(); // 'home'
```

**`setController(controller: TabController): void`**

Sets the controller reference. Usually called by `TabController.addPane()`.

## Advanced Usage

### With Flex Layout

Arrange tabs side-by-side using Flex:

```typescript
import { Flex } from '@zenobi-us/pi-ds';
import { fixed } from '@zenobi-us/pi-ds';

const controller = new TabController();
const tabs = [
  new Tab('tab1', new Text(theme.fg('text', 'First'), 0, 0)),
  new Tab('tab2', new Text(theme.fg('text', 'Second'), 0, 0)),
  new Tab('tab3', new Text(theme.fg('text', 'Third'), 0, 0)),
];
controller.addTabs(...tabs);

const flex = new Flex({ mode: 'fill', spacing: 2 });
flex.addChild(fixed(tabs[0], 20));
flex.addChild(fixed(tabs[1], 20));
flex.addChild(fixed(tabs[2], 20));

const output = flex.render(100);
```

### Navigation Menu Pattern

```typescript
const controller = new TabController();

// Create navigation tabs
const navItems = ['Dashboard', 'Reports', 'Analytics', 'Settings'];
const navTabs = navItems.map((label, i) => 
  new Tab(`nav-${i}`, new Text(theme.fg('text', label), 0, 0))
);
controller.addTabs(...navTabs);

// Create content for each section
const navPanes = navItems.map((label, i) =>
  new Pane(`nav-${i}`, new Text(theme.fg('text', `${label} Content`), 0, 0))
);
controller.addPanes(...navPanes);

// Navigate
controller.setActive('nav-2'); // Show Analytics
```

### Wizard Steps Pattern

```typescript
const controller = new TabController();

// Create step tabs
const steps = [
  new Tab('step-1', new Text(theme.fg('text', 'Step 1: Info'), 0, 0)),
  new Tab('step-2', new Text(theme.fg('text', 'Step 2: Config'), 0, 0)),
  new Tab('step-3', new Text(theme.fg('text', 'Step 3: Review'), 0, 0)),
];
controller.addTabs(...steps);

// Create step content
const stepPanes = [
  new Pane('step-1', new Text(theme.fg('text', 'Enter information'), 0, 0)),
  new Pane('step-2', new Text(theme.fg('text', 'Configure settings'), 0, 0)),
  new Pane('step-3', new Text(theme.fg('text', 'Review and confirm'), 0, 0)),
];
controller.addPanes(...stepPanes);

// Progress through steps
controller.setActive('step-1'); // Start
controller.setActive('step-2'); // Next
controller.setActive('step-3'); // Finish
```

### Dynamic Tab Management

```typescript
const controller = new TabController();

// Start with initial tabs
controller.addTab(new Tab('home', new Text(theme.fg('text', 'Home'), 0, 0)));

// Add tabs dynamically later
function addNewTab(id: string, label: string) {
  const tab = new Tab(id, new Text(theme.fg('text', label), 0, 0));
  const pane = new Pane(id, new Text(theme.fg('text', `Content for ${label}`), 0, 0));
  
  controller.addTab(tab);
  controller.addPane(pane);
  
  return { tab, pane };
}

const { tab, pane } = addNewTab('custom', 'Custom Tab');
```

## Layout Integration

### Vertical Tab Stack

Render tabs vertically by rendering each separately:

```typescript
const tabs = [tab1, tab2, tab3];
const outputs = tabs.map(tab => tab.render(40));
const combined = outputs.flat();
// Each tab on its own line
```

### Horizontal Tab Bar

Use Flex with fixed widths:

```typescript
const flex = new Flex({ mode: 'fill', spacing: 1 });
tabs.forEach(tab => flex.addChild(fixed(tab, 20)));
const output = flex.render(100);
// Tabs side-by-side
```

## Responsive Design

Test your tabs at different widths:

```typescript
const widths = [80, 120, 160];
widths.forEach(width => {
  const output = tab.render(width);
  console.log(`At ${width}:`, output);
});
```

## Edge Cases

### Tab Without Matching Pane

Tabs work independently of panes. You can have tabs without panes:

```typescript
const tab = new Tab('orphan', labelComponent);
controller.addTab(tab);
// No pane needed if you only want tab navigation
```

### Pane Without Matching Tab

Panes without matching tabs won't be active and will always return empty:

```typescript
const pane = new Pane('orphan', contentComponent);
controller.addPane(pane);
pane.isActive(); // false
pane.render(80);  // []
```

### Invalid Tab ID

Attempting to activate a non-existent tab throws an error:

```typescript
try {
  controller.setActive('invalid-id');
} catch (error) {
  // Error: Tab with ID "invalid-id" not found
}
```

### Width Constraints

Components handle invalid widths gracefully:

```typescript
tab.render(0);   // [] (empty)
tab.render(-1);  // [] (empty)
pane.render(0);  // [] (empty)
```

### Duplicate Tab IDs

Adding a tab with an existing ID replaces the previous tab:

```typescript
controller.addTab(new Tab('home', label1));
controller.addTab(new Tab('home', label2)); // Replaces label1
```

## Testing

The tabs system includes comprehensive tests:

- **Unit Tests**: 70 tests covering TabController, Tab, and Pane
- **Integration Tests**: 18 tests for layout integration and workflows
- **Snapshot Tests**: 15 snapshots for visual regression

Run tests:

```bash
bun test src/tabs/
```

## Best Practices

1. **Always use a controller**: While tabs/panes can work standalone, using a controller ensures proper state management

2. **Match tab and pane IDs**: Ensure each tab has a corresponding pane with the same ID

3. **Handle errors**: Wrap `setActive()` in try-catch when IDs might be invalid

4. **Validate before activation**: Check if a tab exists before activating:
   ```typescript
   if (controller.getTab(id)) {
     controller.setActive(id);
   }
   ```

5. **Test at multiple widths**: TUI components must handle various terminal sizes

6. **Use fixed widths for tabs**: When using Flex, give tabs fixed widths for predictable layout

7. **Keep labels concise**: Tab labels should be short for better UX

## Examples Gallery

### Simple Two-Tab Interface

```typescript
const controller = new TabController();

const tab1 = new Tab('one', new Text(theme.fg('text', 'Tab 1'), 0, 0));
const tab2 = new Tab('two', new Text(theme.fg('text', 'Tab 2'), 0, 0));
controller.addTabs(tab1, tab2);

const pane1 = new Pane('one', new Text(theme.fg('text', 'First content'), 0, 0));
const pane2 = new Pane('two', new Text(theme.fg('text', 'Second content'), 0, 0));
controller.addPanes(pane1, pane2);

// Initial render
tab1.render(30);   // Active tab
tab2.render(30);   // Inactive tab
pane1.render(80);  // Shows content
pane2.render(80);  // Empty

// Switch
controller.setActive('two');
pane1.render(80);  // Empty
pane2.render(80);  // Shows content
```

### Five-Tab Dashboard

```typescript
const sections = ['Overview', 'Metrics', 'Logs', 'Settings', 'Help'];
const controller = new TabController();

const tabs = sections.map((label, i) =>
  new Tab(`section-${i}`, new Text(theme.fg('text', label), 0, 0))
);
controller.addTabs(...tabs);

const panes = sections.map((label, i) =>
  new Pane(`section-${i}`, new Text(theme.fg('text', `${label} Panel`), 0, 0))
);
controller.addPanes(...panes);

// Render tab bar with Flex
const flex = new Flex({ mode: 'fill', spacing: 1 });
tabs.forEach(tab => flex.addChild(fixed(tab, 18)));
const tabBar = flex.render(120);

// Render active content
const content = panes[0].render(120);
```

## Performance Considerations

- Tab and Pane rendering is lightweight (delegates to child components)
- State queries are O(1) Map lookups
- No performance concerns for typical use (< 100 tabs)
- For 100+ tabs, consider pagination or search

## Future Enhancements

Potential future features (not yet implemented):

- Keyboard navigation (arrow keys)
- Tab close buttons
- Tab reordering/drag-and-drop
- Tab overflow handling (scrolling)
- Icon support in tab labels
- Active tab styling/theming hooks
- Tab groups/categories

## Troubleshooting

**Q: My pane isn't rendering**
- Check if the tab ID matches the pane ID
- Verify the tab is active: `controller.getActive()`
- Ensure the controller is set: both tab and pane need `setController()` called

**Q: Tab switching doesn't work**
- Make sure you're calling `controller.setActive(id)`
- Verify the tab ID exists: `controller.getTab(id)`
- Check for typos in tab IDs

**Q: Tabs don't appear side-by-side**
- Use Flex layout with fixed widths
- Ensure terminal width is sufficient for all tabs

**Q: Content appears even when tab is inactive**
- Verify you're rendering the Pane component, not direct content
- Check `pane.isActive()` returns false
- Ensure the controller is properly linked

## Related Components

- **[Flex](./flex.md)**: For horizontal/vertical tab layouts
- **[Sized](./sized.md)**: For fixed-width tab constraints
- **[Grid](./grid.md)**: Alternative layout for tab grids
- **[Alert](./alert.md)**: For status messages within tab content

## Support

- **Issues**: [GitHub Issues](https://github.com/zenobi-us/pi-ds/issues)
- **Specification**: [Tabs Component Specification](../../.memory/research-e193044a-tabs-component-specification.md)
- **Tests**: `src/tabs/*.test.ts`

## License

MIT
