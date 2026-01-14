/**
 * Tab - Individual tab header/label component
 *
 * Renders a tab label that can be in active or inactive state.
 * Integrates with TabController to determine active state and
 * notify of selection events.
 */

import type { Component } from '@mariozechner/pi-tui';
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
  setController(controller: TabController): void {
    this.controller = controller;
  }

  /**
   * Render the tab with appropriate styling based on active state
   *
   * Active tabs are rendered with more visual prominence.
   * The label component is rendered at the full available width.
   */
  render(width: number): string[] {
    // Exit early if width is too small
    if (width < 1) {
      return [];
    }

    // Render the label component at full width
    const labelLines = this.label.render(width);

    // Active tabs get visual prominence
    // For now, we return the label as-is
    // Theme styling will be added when theme integration is implemented
    const isActive = this.isActive();

    // If there's an onSelect callback and this tab becomes active, invoke it
    if (isActive && this.options.onSelect) {
      // Note: callback should be invoked by external click handler
      // Not automatically on render, but we store the callback for later use
    }

    return labelLines;
  }

  /**
   * Check if this tab is currently active
   *
   * If no controller is set, falls back to options.active.
   * Otherwise, queries the controller for the active tab ID.
   */
  isActive(): boolean {
    if (!this.controller) {
      return this.options.active ?? false;
    }
    return this.controller.getActive() === this.id;
  }

  /**
   * Get the tab identifier
   */
  getId(): string {
    return this.id;
  }
}
