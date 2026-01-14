/**
 * TabController - State management for tabs and panes
 *
 * Coordinates the relationship between Tab components (headers) and Pane
 * components (content areas), managing which tab is currently active.
 */

import type { Tab } from './Tab.ts';
import type { Pane } from './Pane.ts';

export class TabController {
  private tabs: Map<string, Tab>;
  private panes: Map<string, Pane>;
  private activeId: string | null;

  constructor() {
    this.tabs = new Map();
    this.panes = new Map();
    this.activeId = null;
  }

  /**
   * Register a tab with the controller
   * Sets up bidirectional link between controller and tab
   */
  addTab(tab: Tab): void {
    const id = tab.getId();

    // Check if tab was marked as active BEFORE setting controller
    const shouldActivate = tab.wasMarkedActive();

    this.tabs.set(id, tab);
    tab.setController(this);

    // If this is the first tab or marked as active, activate it
    if (this.activeId === null || shouldActivate) {
      this.activeId = id;
    }
  }

  /**
   * Register multiple tabs with the controller
   */
  addTabs(...tabs: Tab[]): void {
    for (const tab of tabs) {
      this.addTab(tab);
    }
  }

  /**
   * Register a pane with the controller
   * Sets up bidirectional link between controller and pane
   */
  addPane(pane: Pane): void {
    const id = pane.getTabId();
    this.panes.set(id, pane);
    pane.setController(this);
  }

  /**
   * Register multiple panes with the controller
   */
  addPanes(...panes: Pane[]): void {
    for (const pane of panes) {
      this.addPane(pane);
    }
  }

  /**
   * Set the active tab by ID
   * Throws error if tab ID doesn't exist
   */
  setActive(id: string): void {
    if (!this.tabs.has(id)) {
      throw new Error(`Tab with ID "${id}" not found`);
    }
    this.activeId = id;
  }

  /**
   * Get the currently active tab ID
   */
  getActive(): string | null {
    return this.activeId;
  }

  /**
   * Retrieve a tab by its ID
   */
  getTab(id: string): Tab | undefined {
    return this.tabs.get(id);
  }

  /**
   * Retrieve a pane by its ID
   */
  getPane(id: string): Pane | undefined {
    return this.panes.get(id);
  }
}
