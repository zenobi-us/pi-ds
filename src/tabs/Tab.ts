/**
 * Tab - Individual tab header/label component
 *
 * Renders a tab label that can be in active or inactive state.
 * Integrates with TabController to determine active state and
 * notify of selection events.
 */

import type { Component } from '../types.ts';
import type { TabController } from './TabController.ts';
import type { TabOptions } from './types.ts';

export class Tab implements Component {
  private id: string;
  private label: Component;
  private options: TabOptions;
  private controller: TabController | null;

  constructor(id: string, label: Component, options: TabOptions = {}) {
    this.id = id;
    this.label = label;
    this.options = options;
    this.controller = null;
  }

  /**
   * Set the controller for this tab
   * Called by TabController.addTab()
   */
  setController(_controller: TabController): void {
    // TODO: Implement in Task 3
    throw new Error('Not implemented');
  }

  /**
   * Render the tab with appropriate styling based on active state
   */
  render(_width: number): string[] {
    // TODO: Implement in Task 3
    throw new Error('Not implemented');
  }

  /**
   * Check if this tab is currently active
   */
  isActive(): boolean {
    // TODO: Implement in Task 3
    return false;
  }

  /**
   * Get the tab identifier
   */
  getId(): string {
    return this.id;
  }
}
