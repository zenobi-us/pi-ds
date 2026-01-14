/**
 * Pane - Content area component associated with a tab
 *
 * Renders content only when its associated tab is active.
 * Queries TabController to determine visibility state.
 */

import type { Component } from '@mariozechner/pi-tui';
import type { TabController } from './TabController.ts';

export class Pane implements Component {
  private tabId: string;
  private content: Component;
  private controller: TabController | null;

  constructor(tabId: string, content: Component) {
    this.tabId = tabId;
    this.content = content;
    this.controller = null;
  }

  /**
   * Set the controller for this pane
   * Called by TabController.addPane()
   */
  setController(controller: TabController): void {
    this.controller = controller;
  }

  /**
   * Render the pane content if active, otherwise return empty
   *
   * Only visible when the associated tab is the active tab.
   * Content is rendered at full available width.
   */
  render(width: number): string[] {
    // Exit early if not active - return empty array
    if (!this.isActive()) {
      return [];
    }

    // Render content at full width
    return this.content.render(width);
  }

  /**
   * Check if this pane's tab is currently active
   *
   * Returns false if no controller is set (disconnected state).
   * Otherwise, queries controller for active tab ID.
   */
  isActive(): boolean {
    if (!this.controller) {
      return false;
    }
    return this.controller.getActive() === this.tabId;
  }

  /**
   * Get the associated tab identifier
   */
  getTabId(): string {
    return this.tabId;
  }
}
