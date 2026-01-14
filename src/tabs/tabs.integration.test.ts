/**
 * Integration Tests for Tabs System
 * 
 * Tests the complete tabs system working together with real components.
 */

import { describe, it, expect } from 'vitest';
import { Text, Box } from '@mariozechner/pi-tui';
import { TabController } from './TabController';
import { Tab } from './Tab';
import { Pane } from './Pane';
import { Flex } from '../Flex';
import { Sized, fixed } from '../Sized';
import { createTestTheme, createOutputMatcher } from '../test-helpers';

describe('Tabs Integration Tests', () => {
  const theme = createTestTheme();

  // Helper to create a Text component with test theme
  const createText = (text: string) => new Text(theme.fg('text', text), 0, 0);

  describe('Complete Tabbed Interface', () => {
    it('should render tabs and active pane together', () => {
      const controller = new TabController();

      const tab1 = new Tab('tab1', createText('Home'));
      const tab2 = new Tab('tab2', createText('Settings'));
      controller.addTabs(tab1, tab2);

      const pane1 = new Pane('tab1', createText('Home Content'));
      const pane2 = new Pane('tab2', createText('Settings Content'));
      controller.addPanes(pane1, pane2);

      // Render all components
      const tab1Output = tab1.render(40);
      const tab2Output = tab2.render(40);
      const pane1Output = pane1.render(80);
      const pane2Output = pane2.render(80);

      // Verify tab1 is active
      expect(tab1.isActive()).toBe(true);
      expect(tab2.isActive()).toBe(false);

      // Verify only pane1 renders
      expect(pane1Output.length).toBeGreaterThan(0);
      expect(pane2Output).toEqual([]);

      // Verify content
      const pane1Matcher = createOutputMatcher(pane1Output);
      expect(pane1Matcher.contains('Home Content')).toBe(true);
    });

    it('should handle multiple tabs and panes', () => {
      const controller = new TabController();

      const tabs = [
        new Tab('home', createText('Home')),
        new Tab('profile', createText('Profile')),
        new Tab('settings', createText('Settings')),
        new Tab('help', createText('Help')),
      ];
      controller.addTabs(...tabs);

      const panes = [
        new Pane('home', createText('Welcome Home')),
        new Pane('profile', createText('Your Profile')),
        new Pane('settings', createText('App Settings')),
        new Pane('help', createText('Help Center')),
      ];
      controller.addPanes(...panes);

      // Verify first tab is active
      expect(controller.getActive()).toBe('home');
      expect(panes[0].isActive()).toBe(true);
      expect(panes[1].isActive()).toBe(false);
      expect(panes[2].isActive()).toBe(false);
      expect(panes[3].isActive()).toBe(false);
    });
  });

  describe('Tab Switching Workflow', () => {
    it('should switch active pane when tab changes', () => {
      const controller = new TabController();

      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      controller.addTabs(tab1, tab2);

      const pane1 = new Pane('tab1', createText('Content 1'));
      const pane2 = new Pane('tab2', createText('Content 2'));
      controller.addPanes(pane1, pane2);

      // Initially tab1 is active
      let output1 = pane1.render(80);
      let output2 = pane2.render(80);

      expect(output1.length).toBeGreaterThan(0);
      expect(output2).toEqual([]);

      const matcher1 = createOutputMatcher(output1);
      expect(matcher1.contains('Content 1')).toBe(true);

      // Switch to tab2
      controller.setActive('tab2');

      output1 = pane1.render(80);
      output2 = pane2.render(80);

      expect(output1).toEqual([]);
      expect(output2.length).toBeGreaterThan(0);

      const matcher2 = createOutputMatcher(output2);
      expect(matcher2.contains('Content 2')).toBe(true);
    });

    it('should update all related components when switching', () => {
      const controller = new TabController();

      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const tab3 = new Tab('tab3', createText('Tab 3'));
      controller.addTabs(tab1, tab2, tab3);

      const pane1 = new Pane('tab1', createText('Content 1'));
      const pane2 = new Pane('tab2', createText('Content 2'));
      const pane3 = new Pane('tab3', createText('Content 3'));
      controller.addPanes(pane1, pane2, pane3);

      // Switch through all tabs
      controller.setActive('tab1');
      expect(tab1.isActive()).toBe(true);
      expect(tab2.isActive()).toBe(false);
      expect(tab3.isActive()).toBe(false);
      expect(pane1.isActive()).toBe(true);
      expect(pane2.isActive()).toBe(false);
      expect(pane3.isActive()).toBe(false);

      controller.setActive('tab2');
      expect(tab1.isActive()).toBe(false);
      expect(tab2.isActive()).toBe(true);
      expect(tab3.isActive()).toBe(false);
      expect(pane1.isActive()).toBe(false);
      expect(pane2.isActive()).toBe(true);
      expect(pane3.isActive()).toBe(false);

      controller.setActive('tab3');
      expect(tab1.isActive()).toBe(false);
      expect(tab2.isActive()).toBe(false);
      expect(tab3.isActive()).toBe(true);
      expect(pane1.isActive()).toBe(false);
      expect(pane2.isActive()).toBe(false);
      expect(pane3.isActive()).toBe(true);
    });
  });

  describe('Layout Integration', () => {
    it('should work with Flex layout', () => {
      const controller = new TabController();

      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      controller.addTabs(tab1, tab2);

      const pane1 = new Pane('tab1', createText('Pane 1'));
      const pane2 = new Pane('tab2', createText('Pane 2'));
      controller.addPanes(pane1, pane2);

      // Create flex layout with tabs
      const flex = new Flex({ mode: 'fill' });
      flex.addChild(fixed(tab1, 20));
      flex.addChild(fixed(tab2, 20));

      const output = flex.render(80);

      expect(output).toBeDefined();
      expect(output.length).toBeGreaterThan(0);
    });

    it('should work with Sized component', () => {
      const controller = new TabController();

      const tab = new Tab('tab1', createText('Fixed Tab'));
      controller.addTab(tab);

      const pane = new Pane('tab1', createText('Fixed Content'));
      controller.addPane(pane);

      const sizedTab = fixed(tab, 30);
      const output = sizedTab.render(80);

      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });

    it('should render tabs side by side in Flex', () => {
      const controller = new TabController();

      const tab1 = new Tab('tab1', createText('First'));
      const tab2 = new Tab('tab2', createText('Second'));
      const tab3 = new Tab('tab3', createText('Third'));
      controller.addTabs(tab1, tab2, tab3);

      const flex = new Flex({ mode: 'fill', spacing: 2 });
      flex.addChild(fixed(tab1, 15));
      flex.addChild(fixed(tab2, 15));
      flex.addChild(fixed(tab3, 15));

      const output = flex.render(100);

      expect(output).toBeDefined();
      expect(output.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Rendering', () => {
    it('should render at 80 character width', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content at 80 width'));
      controller.addTab(tab);
      controller.addPane(pane);

      const tabOutput = tab.render(80);
      const paneOutput = pane.render(80);

      expect(tabOutput).toBeDefined();
      expect(paneOutput).toBeDefined();
      const matcher = createOutputMatcher(paneOutput);
      expect(matcher.contains('Content at 80 width')).toBe(true);
    });

    it('should render at 120 character width', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content at 120 width'));
      controller.addTab(tab);
      controller.addPane(pane);

      const tabOutput = tab.render(120);
      const paneOutput = pane.render(120);

      expect(tabOutput).toBeDefined();
      expect(paneOutput).toBeDefined();
      const matcher = createOutputMatcher(paneOutput);
      expect(matcher.contains('Content at 120 width')).toBe(true);
    });

    it('should render at 160 character width', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content at 160 width'));
      controller.addTab(tab);
      controller.addPane(pane);

      const tabOutput = tab.render(160);
      const paneOutput = pane.render(160);

      expect(tabOutput).toBeDefined();
      expect(paneOutput).toBeDefined();
      const matcher = createOutputMatcher(paneOutput);
      expect(matcher.contains('Content at 160 width')).toBe(true);
    });

    it('should handle narrow widths gracefully', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('Content'));
      controller.addTab(tab);
      controller.addPane(pane);

      const tabOutput = tab.render(20);
      const paneOutput = pane.render(20);

      expect(tabOutput).toBeDefined();
      expect(paneOutput).toBeDefined();
    });
  });

  describe('Real-World Scenarios', () => {
    it('should support navigation menu pattern', () => {
      const controller = new TabController();

      // Create navigation tabs
      const navTabs = ['Dashboard', 'Reports', 'Analytics', 'Settings'].map((label, i) =>
        new Tab(`nav-${i}`, createText(label))
      );
      controller.addTabs(...navTabs);

      // Create content panes
      const navPanes = navTabs.map((tab, i) =>
        new Pane(tab.getId(), createText(`Content for ${['Dashboard', 'Reports', 'Analytics', 'Settings'][i]}`))
      );
      controller.addPanes(...navPanes);

      // Navigate through tabs
      controller.setActive('nav-0');
      expect(navPanes[0].isActive()).toBe(true);

      controller.setActive('nav-2');
      expect(navPanes[2].isActive()).toBe(true);
      expect(navPanes[0].isActive()).toBe(false);
    });

    it('should support wizard steps pattern', () => {
      const controller = new TabController();

      // Create wizard step tabs
      const steps = [
        new Tab('step-1', createText('Step 1: Basic Info')),
        new Tab('step-2', createText('Step 2: Configuration')),
        new Tab('step-3', createText('Step 3: Review')),
      ];
      controller.addTabs(...steps);

      // Create step content
      const stepPanes = [
        new Pane('step-1', createText('Enter your basic information')),
        new Pane('step-2', createText('Configure your settings')),
        new Pane('step-3', createText('Review and confirm')),
      ];
      controller.addPanes(...stepPanes);

      // Simulate wizard progression
      expect(controller.getActive()).toBe('step-1');

      controller.setActive('step-2');
      expect(stepPanes[1].isActive()).toBe(true);

      controller.setActive('step-3');
      expect(stepPanes[2].isActive()).toBe(true);
    });

    it('should support dynamic tab adding', () => {
      const controller = new TabController();

      // Start with initial tabs
      const tab1 = new Tab('tab1', createText('Tab 1'));
      controller.addTab(tab1);

      expect(controller.getTab('tab1')).toBe(tab1);

      // Add more tabs dynamically
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const tab3 = new Tab('tab3', createText('Tab 3'));
      controller.addTabs(tab2, tab3);

      expect(controller.getTab('tab2')).toBe(tab2);
      expect(controller.getTab('tab3')).toBe(tab3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle tab without matching pane', () => {
      const controller = new TabController();

      const tab = new Tab('tab1', createText('Tab without Pane'));
      controller.addTab(tab);

      // No pane added
      expect(controller.getPane('tab1')).toBeUndefined();
      expect(tab.isActive()).toBe(true);
    });

    it('should handle pane without matching tab', () => {
      const controller = new TabController();

      const pane = new Pane('orphan', createText('Orphan Pane'));
      controller.addPane(pane);

      // Pane won't be active without a tab
      expect(pane.isActive()).toBe(false);
      expect(pane.render(80)).toEqual([]);
    });

    it('should handle empty tab list', () => {
      const controller = new TabController();

      expect(controller.getActive()).toBeNull();
      controller.addTabs(); // Empty
      expect(controller.getActive()).toBeNull();
    });

    it('should handle rapid tab switching', () => {
      const controller = new TabController();

      const tabs = Array.from({ length: 10 }, (_, i) =>
        new Tab(`tab-${i}`, createText(`Tab ${i}`))
      );
      controller.addTabs(...tabs);

      // Rapidly switch through all tabs
      for (let i = 0; i < 10; i++) {
        controller.setActive(`tab-${i}`);
        expect(controller.getActive()).toBe(`tab-${i}`);
      }
    });
  });
});
