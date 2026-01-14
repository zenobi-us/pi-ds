/**
 * Unit Tests for Tab Component
 */

import { describe, it, expect, vi } from 'vitest';
import { Text } from '@mariozechner/pi-tui';
import { Tab } from './Tab';
import { TabController } from './TabController';
import { createTestTheme, createOutputMatcher } from '../test-helpers';

describe('Tab Component', () => {
  const theme = createTestTheme();

  // Helper to create a Text component with test theme
  const createText = (text: string) => new Text(theme.fg('text', text), 0, 0);

  describe('Basic Rendering', () => {
    it('should render label content', () => {
      const tab = new Tab('tab1', createText('Home'));
      const output = tab.render(40);

      const matcher = createOutputMatcher(output);
      expect(matcher.contains('Home')).toBe(true);
    });

    it('should render at specified width', () => {
      const tab = new Tab('tab1', createText('Settings'));
      const output = tab.render(80);

      expect(output.length).toBeGreaterThan(0);
      const matcher = createOutputMatcher(output);
      expect(matcher.contains('Settings')).toBe(true);
    });

    it('should handle narrow width constraints', () => {
      const tab = new Tab('tab1', createText('Tab'));
      const output = tab.render(10);

      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });

    it('should return empty array for zero width', () => {
      const tab = new Tab('tab1', createText('Tab'));
      const output = tab.render(0);

      expect(output).toEqual([]);
    });

    it('should return empty array for negative width', () => {
      const tab = new Tab('tab1', createText('Tab'));
      const output = tab.render(-1);

      expect(output).toEqual([]);
    });
  });

  describe('Active State', () => {
    it('should report active when controller says so', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Active Tab'));

      controller.addTab(tab);
      controller.setActive('tab1');

      expect(tab.isActive()).toBe(true);
    });

    it('should report inactive when controller says so', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));

      controller.addTabs(tab1, tab2);
      controller.setActive('tab2');

      expect(tab1.isActive()).toBe(false);
      expect(tab2.isActive()).toBe(true);
    });

    it('should use options.active when no controller set', () => {
      const activeTab = new Tab('tab1', createText('Active'), { active: true });
      const inactiveTab = new Tab('tab2', createText('Inactive'), { active: false });

      expect(activeTab.isActive()).toBe(true);
      expect(inactiveTab.isActive()).toBe(false);
    });

    it('should default to false when no controller or options', () => {
      const tab = new Tab('tab1', createText('Tab'));

      expect(tab.isActive()).toBe(false);
    });

    it('should update active state when controller changes', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));

      controller.addTabs(tab1, tab2);

      expect(tab1.isActive()).toBe(true);
      expect(tab2.isActive()).toBe(false);

      controller.setActive('tab2');

      expect(tab1.isActive()).toBe(false);
      expect(tab2.isActive()).toBe(true);
    });
  });

  describe('Callbacks', () => {
    it('should store onSelect callback in options', () => {
      const callback = vi.fn();
      const _tab = new Tab('tab1', createText('Tab'), { onSelect: callback });

      // Callback is stored but not invoked automatically
      expect(callback).not.toHaveBeenCalled();
    });

    it('should not invoke callback on render', () => {
      const callback = vi.fn();
      const tab = new Tab('tab1', createText('Tab'), { onSelect: callback });

      tab.render(40);

      // Callbacks should be invoked by external event handlers, not by render
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('ID Management', () => {
    it('should return correct ID from getId()', () => {
      const tab = new Tab('home', createText('Home'));

      expect(tab.getId()).toBe('home');
    });

    it('should support different ID formats', () => {
      const tab1 = new Tab('simple', createText('Tab'));
      const tab2 = new Tab('kebab-case', createText('Tab'));
      const tab3 = new Tab('snake_case', createText('Tab'));
      const tab4 = new Tab('camelCase', createText('Tab'));

      expect(tab1.getId()).toBe('simple');
      expect(tab2.getId()).toBe('kebab-case');
      expect(tab3.getId()).toBe('snake_case');
      expect(tab4.getId()).toBe('camelCase');
    });
  });

  describe('Controller Integration', () => {
    it('should accept controller via setController', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));

      tab.setController(controller);

      // Should not throw
      expect(() => tab.isActive()).not.toThrow();
    });

    it('should work without controller', () => {
      const tab = new Tab('tab1', createText('Tab'));

      expect(() => tab.render(40)).not.toThrow();
      expect(() => tab.isActive()).not.toThrow();
      expect(() => tab.getId()).not.toThrow();
    });

    it('should query controller when available', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));

      controller.addTab(tab);

      // Tab should query controller for active state
      expect(tab.isActive()).toBe(true); // First tab is auto-active
    });
  });

  describe('Label Rendering', () => {
    it('should render Text component label', () => {
      const tab = new Tab('tab1', createText('My Label'));
      const output = tab.render(40);

      const matcher = createOutputMatcher(output);
      expect(matcher.contains('My Label')).toBe(true);
    });

    it('should render at multiple widths', () => {
      const tab = new Tab('tab1', createText('Tab Label'));

      const output40 = tab.render(40);
      const output80 = tab.render(80);
      const output120 = tab.render(120);

      expect(output40.length).toBeGreaterThan(0);
      expect(output80.length).toBeGreaterThan(0);
      expect(output120.length).toBeGreaterThan(0);
    });

    it('should handle empty label', () => {
      const tab = new Tab('tab1', createText(''));
      const output = tab.render(40);

      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });

    it('should handle long label text', () => {
      const longText = 'This is a very long tab label that might need special handling';
      const tab = new Tab('tab1', new Text(theme.fg('text', longText), 0, 0));
      const output = tab.render(40);

      expect(output).toBeDefined();
      expect(output.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle tab with special characters in ID', () => {
      const tab = new Tab('tab-1_2.3', createText('Tab'));

      expect(tab.getId()).toBe('tab-1_2.3');
    });

    it('should handle tab with special characters in label', () => {
      const tab = new Tab('tab1', createText('✓ Success'));
      const output = tab.render(40);

      const matcher = createOutputMatcher(output);
      expect(matcher.contains('✓')).toBe(true);
      expect(matcher.contains('Success')).toBe(true);
    });

    it('should handle very small width', () => {
      const tab = new Tab('tab1', createText('Tab'));
      const output = tab.render(1);

      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });

    it('should render consistently across multiple calls', () => {
      const tab = new Tab('tab1', createText('Consistent'));

      const output1 = tab.render(40);
      const output2 = tab.render(40);

      expect(output1).toEqual(output2);
    });
  });

  describe('wasMarkedActive Helper', () => {
    it('should return true when tab marked active in options', () => {
      const tab = new Tab('tab1', createText('Tab'), { active: true });

      expect(tab.wasMarkedActive()).toBe(true);
    });

    it('should return false when tab not marked active', () => {
      const tab = new Tab('tab1', createText('Tab'), { active: false });

      expect(tab.wasMarkedActive()).toBe(false);
    });

    it('should return false when no active option provided', () => {
      const tab = new Tab('tab1', createText('Tab'));

      expect(tab.wasMarkedActive()).toBe(false);
    });
  });
});
