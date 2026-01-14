/**
 * Unit Tests for TabController
 */

import { describe, it, expect } from 'vitest';
import { Text } from '@mariozechner/pi-tui';
import { TabController } from './TabController';
import { Tab } from './Tab';
import { Pane } from './Pane';
import { createTestTheme } from '../test-helpers';

describe('TabController', () => {
  const theme = createTestTheme();

  // Helper to create a Text component with test theme
  const createText = (text: string) => new Text(theme.fg('text', text), 0, 0);

  describe('Initialization', () => {
    it('should initialize with empty state', () => {
      const controller = new TabController();
      expect(controller.getActive()).toBeNull();
      expect(controller.getTab('any-id')).toBeUndefined();
      expect(controller.getPane('any-id')).toBeUndefined();
    });
  });

  describe('Adding Tabs', () => {
    it('should add and retrieve a single tab', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab 1'));

      controller.addTab(tab);

      expect(controller.getTab('tab1')).toBe(tab);
    });

    it('should add multiple tabs at once', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const tab3 = new Tab('tab3', createText('Tab 3'));

      controller.addTabs(tab1, tab2, tab3);

      expect(controller.getTab('tab1')).toBe(tab1);
      expect(controller.getTab('tab2')).toBe(tab2);
      expect(controller.getTab('tab3')).toBe(tab3);
    });

    it('should auto-activate first tab when no active tab set', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));

      controller.addTab(tab1);
      controller.addTab(tab2);

      expect(controller.getActive()).toBe('tab1');
    });

    it('should activate tab marked as active in options', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'), { active: true });

      controller.addTab(tab1);
      controller.addTab(tab2);

      expect(controller.getActive()).toBe('tab2');
    });

    it('should set controller reference on added tab', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab 1'));

      controller.addTab(tab);

      // Tab should now be able to query controller
      expect(tab.isActive()).toBe(true); // First tab is auto-activated
    });
  });

  describe('Adding Panes', () => {
    it('should add and retrieve a single pane', () => {
      const controller = new TabController();
      const pane = new Pane('tab1', createText('Content 1'));

      controller.addPane(pane);

      expect(controller.getPane('tab1')).toBe(pane);
    });

    it('should add multiple panes at once', () => {
      const controller = new TabController();
      const pane1 = new Pane('tab1', createText('Content 1'));
      const pane2 = new Pane('tab2', createText('Content 2'));
      const pane3 = new Pane('tab3', createText('Content 3'));

      controller.addPanes(pane1, pane2, pane3);

      expect(controller.getPane('tab1')).toBe(pane1);
      expect(controller.getPane('tab2')).toBe(pane2);
      expect(controller.getPane('tab3')).toBe(pane3);
    });

    it('should set controller reference on added pane', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab 1'), { active: true });
      const pane = new Pane('tab1', createText('Content 1'));

      controller.addTab(tab);
      controller.addPane(pane);

      // Pane should now be able to query controller
      expect(pane.isActive()).toBe(true);
    });
  });

  describe('Active State Management', () => {
    it('should set and get active tab', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));

      controller.addTabs(tab1, tab2);
      controller.setActive('tab2');

      expect(controller.getActive()).toBe('tab2');
    });

    it('should throw error for invalid tab ID', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab 1'));

      controller.addTab(tab);

      expect(() => controller.setActive('invalid-id')).toThrow(
        'Tab with ID "invalid-id" not found'
      );
    });

    it('should update tab active state when setActive is called', () => {
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

    it('should update pane active state when setActive is called', () => {
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

  describe('Edge Cases', () => {
    it('should return undefined for non-existent tab ID', () => {
      const controller = new TabController();
      expect(controller.getTab('non-existent')).toBeUndefined();
    });

    it('should return undefined for non-existent pane ID', () => {
      const controller = new TabController();
      expect(controller.getPane('non-existent')).toBeUndefined();
    });

    it('should handle multiple tabs with different IDs', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab1', createText('Tab 1 Duplicate')); // Same ID

      controller.addTab(tab1);
      controller.addTab(tab2);

      // Second tab should replace first
      expect(controller.getTab('tab1')).toBe(tab2);
    });

    it('should handle empty tabs array', () => {
      const controller = new TabController();
      controller.addTabs();
      expect(controller.getActive()).toBeNull();
    });

    it('should handle empty panes array', () => {
      const controller = new TabController();
      controller.addPanes();
      expect(controller.getActive()).toBeNull();
    });
  });

  describe('State Query Methods', () => {
    it('should return null when no active tab is set', () => {
      const controller = new TabController();
      expect(controller.getActive()).toBeNull();
    });

    it('should retrieve tabs by ID', () => {
      const controller = new TabController();
      const tab1 = new Tab('home', createText('Home'));
      const tab2 = new Tab('settings', createText('Settings'));

      controller.addTabs(tab1, tab2);

      expect(controller.getTab('home')).toBe(tab1);
      expect(controller.getTab('settings')).toBe(tab2);
    });

    it('should retrieve panes by tab ID', () => {
      const controller = new TabController();
      const pane1 = new Pane('home', createText('Home Content'));
      const pane2 = new Pane('settings', createText('Settings Content'));

      controller.addPanes(pane1, pane2);

      expect(controller.getPane('home')).toBe(pane1);
      expect(controller.getPane('settings')).toBe(pane2);
    });
  });
});
