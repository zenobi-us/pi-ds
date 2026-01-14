/**
 * Snapshot Tests for Tabs System
 * 
 * Captures visual output for regression testing.
 */

import { describe, it, expect } from 'vitest';
import { Text } from '@mariozechner/pi-tui';
import { TabController } from './TabController';
import { Tab } from './Tab';
import { Pane } from './Pane';
import { Flex } from '../Flex';
import { fixed } from '../Sized';
import { createTestTheme } from '../test-helpers';

describe('Tabs Snapshot Tests', () => {
  const theme = createTestTheme();

  // Helper to create a Text component with test theme
  const createText = (text: string) => new Text(theme.fg('text', text), 0, 0);

  describe('Single Tab Rendering', () => {
    it('should match snapshot for single active tab', () => {
      const controller = new TabController();
      const tab = new Tab('home', createText('Home'));
      controller.addTab(tab);

      const output = tab.render(40);
      expect(output).toMatchSnapshot();
    });

    it('should match snapshot for single inactive tab', () => {
      const controller = new TabController();
      const tab1 = new Tab('home', createText('Home'));
      const tab2 = new Tab('settings', createText('Settings'));
      controller.addTabs(tab1, tab2);
      controller.setActive('home'); // tab2 is inactive

      const output = tab2.render(40);
      expect(output).toMatchSnapshot();
    });
  });

  describe('Multiple Tabs at Various Widths', () => {
    it('should match snapshot for tabs at 80 width', () => {
      const controller = new TabController();
      const tabs = [
        new Tab('tab1', createText('Home')),
        new Tab('tab2', createText('Profile')),
        new Tab('tab3', createText('Settings')),
      ];
      controller.addTabs(...tabs);

      const outputs = tabs.map((tab) => tab.render(80));
      expect(outputs).toMatchSnapshot();
    });

    it('should match snapshot for tabs at 120 width', () => {
      const controller = new TabController();
      const tabs = [
        new Tab('tab1', createText('Dashboard')),
        new Tab('tab2', createText('Analytics')),
        new Tab('tab3', createText('Reports')),
      ];
      controller.addTabs(...tabs);

      const outputs = tabs.map((tab) => tab.render(120));
      expect(outputs).toMatchSnapshot();
    });

    it('should match snapshot for tabs at 160 width', () => {
      const controller = new TabController();
      const tabs = [
        new Tab('tab1', createText('Overview')),
        new Tab('tab2', createText('Details')),
        new Tab('tab3', createText('Configuration')),
      ];
      controller.addTabs(...tabs);

      const outputs = tabs.map((tab) => tab.render(160));
      expect(outputs).toMatchSnapshot();
    });
  });

  describe('Tabs in Flex Layout', () => {
    it('should match snapshot for tabs side-by-side', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('First'));
      const tab2 = new Tab('tab2', createText('Second'));
      const tab3 = new Tab('tab3', createText('Third'));
      controller.addTabs(tab1, tab2, tab3);

      const flex = new Flex({ mode: 'fill', spacing: 1 });
      flex.addChild(fixed(tab1, 20));
      flex.addChild(fixed(tab2, 20));
      flex.addChild(fixed(tab3, 20));

      const output = flex.render(80);
      expect(output).toMatchSnapshot();
    });

    it('should match snapshot for tabs in vertical stack', () => {
      const controller = new TabController();
      const tabs = [
        new Tab('nav1', createText('Navigation 1')),
        new Tab('nav2', createText('Navigation 2')),
        new Tab('nav3', createText('Navigation 3')),
      ];
      controller.addTabs(...tabs);

      // Each tab rendered separately (stacked vertically)
      const outputs = tabs.map((tab) => tab.render(40));
      const combined = outputs.flat();
      expect(combined).toMatchSnapshot();
    });
  });

  describe('Pane Content Rendering', () => {
    it('should match snapshot for active pane content', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const pane = new Pane('tab1', createText('This is the content of the active pane'));
      controller.addTab(tab);
      controller.addPane(pane);

      const output = pane.render(80);
      expect(output).toMatchSnapshot();
    });

    it('should match snapshot for inactive pane (empty)', () => {
      const controller = new TabController();
      const tab1 = new Tab('tab1', createText('Tab 1'));
      const tab2 = new Tab('tab2', createText('Tab 2'));
      const pane1 = new Pane('tab1', createText('Content 1'));
      controller.addTabs(tab1, tab2);
      controller.addPane(pane1);
      controller.setActive('tab2'); // pane1 inactive

      const output = pane1.render(80);
      expect(output).toMatchSnapshot();
    });

    it('should match snapshot for pane with long content', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      const longContent = 'This is a very long piece of content that spans multiple lines and tests the pane rendering capabilities';
      const pane = new Pane('tab1', createText(longContent));
      controller.addTab(tab);
      controller.addPane(pane);

      const output = pane.render(60);
      expect(output).toMatchSnapshot();
    });
  });

  describe('Complete Tabbed Interface', () => {
    it('should match snapshot for simple tabbed interface', () => {
      const controller = new TabController();

      const tab1 = new Tab('home', createText('Home'));
      const tab2 = new Tab('settings', createText('Settings'));
      controller.addTabs(tab1, tab2);

      const pane1 = new Pane('home', createText('Welcome Home'));
      const pane2 = new Pane('settings', createText('Settings Panel'));
      controller.addPanes(pane1, pane2);

      // Render tabs
      const tabOutputs = [tab1.render(40), tab2.render(40)];

      // Render active pane
      const paneOutput = pane1.render(80);

      const result = {
        tabs: tabOutputs,
        pane: paneOutput,
      };

      expect(result).toMatchSnapshot();
    });

    it('should match snapshot for multi-tab interface', () => {
      const controller = new TabController();

      const tabs = ['Dashboard', 'Reports', 'Analytics', 'Settings', 'Help'].map((label, i) =>
        new Tab(`tab-${i}`, createText(label))
      );
      controller.addTabs(...tabs);

      const panes = tabs.map((tab) =>
        new Pane(tab.getId(), createText(`Content for ${tab.getId()}`))
      );
      controller.addPanes(...panes);

      // Render all tabs
      const tabOutputs = tabs.map((tab) => tab.render(25));

      // Render active pane
      const activePane = panes[0];
      const paneOutput = activePane.render(100);

      const result = {
        tabs: tabOutputs,
        pane: paneOutput,
      };

      expect(result).toMatchSnapshot();
    });
  });

  describe('Edge Cases Visual Output', () => {
    it('should match snapshot for tab with very long label', () => {
      const controller = new TabController();
      const longLabel = 'This is an extremely long tab label that might need truncation';
      const tab = new Tab('long', createText(longLabel));
      controller.addTab(tab);

      const output = tab.render(30);
      expect(output).toMatchSnapshot();
    });

    it('should match snapshot for narrow width rendering', () => {
      const controller = new TabController();
      const tab = new Tab('tab1', createText('Tab'));
      controller.addTab(tab);

      const output = tab.render(10);
      expect(output).toMatchSnapshot();
    });

    it('should match snapshot for tabs with special characters', () => {
      const controller = new TabController();
      const tabs = [
        new Tab('tab1', createText('✓ Success')),
        new Tab('tab2', createText('⚠ Warning')),
        new Tab('tab3', createText('✗ Error')),
      ];
      controller.addTabs(...tabs);

      const outputs = tabs.map((tab) => tab.render(40));
      expect(outputs).toMatchSnapshot();
    });
  });
});
