/**
 * Types and interfaces for the Tabs component system
 */

import type { Tab } from './Tab.ts';
import type { Pane } from './Pane.ts';

/**
 * Configuration options for Tab component
 */
export interface TabOptions {
  /** Initial active state when no controller is present */
  active?: boolean;
  /** Callback invoked when tab is selected */
  onSelect?: () => void;
}

/**
 * Internal state managed by TabController
 */
export interface TabControllerState {
  tabs: Map<string, Tab>;
  panes: Map<string, Pane>;
  activeId: string | null;
}
