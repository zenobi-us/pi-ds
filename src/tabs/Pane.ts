/**
 * Pane - Content area component associated with a tab
 *
 * Renders content only when its associated tab is active.
 * Queries TabController to determine visibility state.
 */

import type { Component } from '../types.ts';
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
  setController(_controller: TabController): void {
    // TODO: Implement in Task 4
    throw new Error('Not implemented');
  }

  /**
   * Render the pane content if active, otherwise return empty
   */
  render(_width: number): string[] {
    // TODO: Implement in Task 4
    throw new Error('Not implemented');
  }

  /**
   * Check if this pane's tab is currently active
   */
  isActive(): boolean {
    // TODO: Implement in Task 4
    return false;
  }

  /**
   * Get the associated tab identifier
   */
  getTabId(): string {
    return this.tabId;
  }
}
