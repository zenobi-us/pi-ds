/**
 * Unit Tests for Pane Component
 */

import { describe, it, expect } from 'vitest';
import { Text } from '@mariozechner/pi-tui';
import { Pane } from './Pane';
import { Tab } from './Tab';
import { TabController } from './TabController';
import { createTestTheme, createOutputMatcher } from '../test-helpers';

describe('Pane Component', () => {
  const theme = createTestTheme();

  // Helper to create a Text component with test theme
  const createText = (text: string) => new Text(theme.fg('text', text), 0, 0);

  describe('Basic Rendering', () => {
    it('should render content when active', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab 1'));
      const pane = new Pane('tab1', createText('Content 1'));

      controller.addTab(tab);
      controller.addPane(pane);
      controller.setActive('tab1');

      const output = pane.render(80);

      expect(output.length).toBeGreaterThan(0);
      const matcher = createOutputMatcher(output);
      expect(matcher.contains('Content 1')).toBe(true);
    });

    it('should return empty array when inactive', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const pane1 = new Pane('tab1', createText('Content 1'));

      controller.addTabs(tab1, tab2);
      controller.addPane(pane1);
      controller.setActive('tab2'); // Different tab active

      const output = pane1.render(80);

      expect(output).toEqual([]);
    });

    it('should render at full width', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content'));

      controller.addTab(tab);
      controller.addPane(pane);

      const output80 = pane.render(80);
      const output120 = pane.render(120);

      expect(output80).toBeDefined();
      expect(output120).toBeDefined();
    });
  });

  describe('Active State', () => {
    it('should report active when associated tab is active', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab 1'));
      const pane = new Pane('tab1', createText('Content 1'));

      controller.addTab(tab);
      controller.addPane(pane);
      controller.setActive('tab1');

      expect(pane.isActive()).toBe(true);
    });

    it('should report inactive when associated tab is inactive', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const pane1 = new Pane('tab1', createText('Content 1'));

      controller.addTabs(tab1, tab2);
      controller.addPane(pane1);
      controller.setActive('tab2');

      expect(pane1.isActive()).toBe(false);
    });

    it('should return false when no controller set', () => {
      const pane = new Pane('tab1', createText('Content'));

      expect(pane.isActive()).toBe(false);
    });

    it('should update when active tab changes', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const pane1 = new Pane('tab1', createText('Content 1'));
      const pane2 = new Pane('tab2', createText('Content 2'));

      controller.addTabs(tab1, tab2);
      controller.addPanes(pane1, pane2);

      expect(pane1.isActive()).toBe(true);
      expect(pane2.isActive()).toBe(false);

      controller.setActive('tab2');

      expect(pane1.isActive()).toBe(false);
      expect(pane2.isActive()).toBe(true);
    });
  });

  describe('Tab ID Management', () => {
    it('should return correct tab ID', () => {
      const pane = new Pane('home', createText('Content'));

      expect(pane.getTabId()).toBe('home');
    });

    it('should support different ID formats', () => {
      const pane1 = new Pane('simple', createText('Content'));
      const pane2 = new Pane('kebab-case', createText('Content'));
      const pane3 = new Pane('snake_case', createText('Content'));
      const pane4 = new Pane('camelCase', createText('Content'));

      expect(pane1.getTabId()).toBe('simple');
      expect(pane2.getTabId()).toBe('kebab-case');
      expect(pane3.getTabId()).toBe('snake_case');
      expect(pane4.getTabId()).toBe('camelCase');
    });
  });

  describe('Controller Integration', () => {
    it('should accept controller via setController', () => {
      const controller = new TabController();
      const pane = new Pane('tab1', createText('Content'));

      pane.setController(controller);

      expect(() => pane.isActive()).not.toThrow();
    });

    it('should work without controller', () => {
      const pane = new Pane('tab1', createText('Content'));

      expect(() => pane.render(80)).not.toThrow();
      expect(() => pane.isActive()).not.toThrow();
      expect(() => pane.getTabId()).not.toThrow();
    });

    it('should query controller for active state', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content'));

      controller.addTab(tab);
      controller.addPane(pane);

      // Pane should query controller
      expect(pane.isActive()).toBe(true); // First tab is auto-active
    });
  });

  describe('Content Rendering', () => {
    it('should delegate rendering to content component', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Test Content'));

      controller.addTab(tab);
      controller.addPane(pane);

      const output = pane.render(80);

      const matcher = createOutputMatcher(output);
      expect(matcher.contains('Test Content')).toBe(true);
    });

    it('should pass full width to content', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const content = createText('Content');
      const pane = new Pane('tab1', content);

      controller.addTab(tab);
      controller.addPane(pane);

      // Content should receive the full width
      const output = pane.render(100);
      expect(output).toBeDefined();
    });

    it('should handle empty content', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText(''));

      controller.addTab(tab);
      controller.addPane(pane);

      const output = pane.render(80);

      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });
  });

  describe('Visibility Control', () => {
    it('should show only active pane', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const pane1 = new Pane('tab1', createText('Content 1'));
      const pane2 = new Pane('tab2', createText('Content 2'));

      controller.addTabs(tab1, tab2);
      controller.addPanes(pane1, pane2);
      controller.setActive('tab1');

      const output1 = pane1.render(80);
      const output2 = pane2.render(80);

      expect(output1.length).toBeGreaterThan(0);
      expect(output2).toEqual([]);
    });

    it('should switch visibility when tab changes', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const pane1 = new Pane('tab1', createText('Content 1'));
      const pane2 = new Pane('tab2', createText('Content 2'));

      controller.addTabs(tab1, tab2);
      controller.addPanes(pane1, pane2);
      controller.setActive('tab1');

      let output1 = pane1.render(80);
      let output2 = pane2.render(80);

      expect(output1.length).toBeGreaterThan(0);
      expect(output2).toEqual([]);

      controller.setActive('tab2');

      output1 = pane1.render(80);
      output2 = pane2.render(80);

      expect(output1).toEqual([]);
      expect(output2.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle pane with special characters in tab ID', () => {
      const pane = new Pane('tab-1_2.3', createText('Content'));

      expect(pane.getTabId()).toBe('tab-1_2.3');
    });

    it('should handle zero width', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content'));

      controller.addTab(tab);
      controller.addPane(pane);

      const output = pane.render(0);

      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });

    it('should handle negative width', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content'));

      controller.addTab(tab);
      controller.addPane(pane);

      const output = pane.render(-1);

      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });

    it('should render consistently across multiple calls', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Consistent Content'));

      controller.addTab(tab);
      controller.addPane(pane);

      const output1 = pane.render(80);
      const output2 = pane.render(80);

      expect(output1).toEqual(output2);
    });
  });
});
