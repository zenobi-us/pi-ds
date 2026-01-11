/**
 * Grid and Flex Layout Examples
 *
 * Demonstrates the difference between Grid (equal widths) and Flex (flow layout)
 */

import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import { Box, Container, Text } from '@mariozechner/pi-tui';
import { Grid, Flex, sized } from '@zenobius/pi-mono-ds';

export default function (pi: ExtensionAPI) {
  // Example 1: Grid - Equal width columns
  pi.registerCommand('example-grid', {
    description: 'Show Grid layout (equal widths)',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();
        container.addChild(
          new Text(theme.bold(theme.fg('accent', 'Grid Layout (Equal Widths)')), 0, 1)
        );

        const grid = new Grid({ spacing: 2 });

        // Three boxes - all get equal width regardless of content
        const box1 = new Box();
        box1.addChild(new Text(theme.fg('text', 'Short'), 1, 0));
        grid.addChild(box1);

        const box2 = new Box();
        box2.addChild(new Text(theme.fg('text', 'Medium length'), 1, 0));
        grid.addChild(box2);

        const box3 = new Box();
        box3.addChild(new Text(theme.fg('text', 'This is a much longer piece of text'), 1, 0));
        grid.addChild(box3);

        container.addChild(grid);
        return container;
      });

      ctx.ui.notify('Grid layout shown - all columns equal width', 'info');
    },
  });

  // Example 2: Flex Fill - Children fill available space
  pi.registerCommand('example-flex-fill', {
    description: 'Show Flex fill mode (evenly fill row)',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();
        container.addChild(
          new Text(theme.bold(theme.fg('accent', 'Flex Fill Mode (Evenly Fill)')), 0, 1)
        );

        const flex = new Flex({ mode: 'fill', spacing: 2 });

        // With preferredWidth hints
        const box1 = new Box();
        box1.addChild(new Text(theme.fg('text', 'Min: 10'), 1, 0));
        flex.addChild(sized(box1, 10));

        const box2 = new Box();
        box2.addChild(new Text(theme.fg('text', 'Min: 20'), 1, 0));
        flex.addChild(sized(box2, 20));

        const box3 = new Box();
        box3.addChild(new Text(theme.fg('text', 'Min: 15'), 1, 0));
        flex.addChild(sized(box3, 15));

        container.addChild(
          new Text(theme.fg('dim', 'Each starts at min width, then shares extra space'), 0, 0)
        );
        container.addChild(flex);
        return container;
      });

      ctx.ui.notify('Flex fill mode - respects minimums, fills extra space', 'info');
    },
  });

  // Example 3: Flex Wrap - Children wrap to next line
  pi.registerCommand('example-flex-wrap', {
    description: 'Show Flex wrap mode (wrap to next line)',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();
        container.addChild(
          new Text(theme.bold(theme.fg('accent', 'Flex Wrap Mode (Flow Layout)')), 0, 1)
        );

        const flex = new Flex({ mode: 'wrap', spacing: 2 });

        // Tags with different widths
        const tags = [
          'React',
          'TypeScript',
          'Node.js',
          'Python',
          'JavaScript',
          'Rust',
          'Go',
          'Docker',
          'Kubernetes',
          'AWS',
          'Git',
        ];

        for (const tag of tags) {
          const box = new Box();
          box.addChild(new Text(theme.fg('accent', ` ${tag} `), 0, 0));
          flex.addChild(sized(box, tag.length + 4)); // Width = text + padding
        }

        container.addChild(
          new Text(theme.fg('dim', "Tags wrap to next line when they don't fit"), 0, 0)
        );
        container.addChild(flex);
        return container;
      });

      ctx.ui.notify('Flex wrap mode - children wrap when needed', 'info');
    },
  });

  // Example 4: Comparison - Side by side
  pi.registerCommand('example-grid-vs-flex', {
    description: 'Compare Grid vs Flex layouts',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        // Grid example
        container.addChild(new Text(theme.bold(theme.fg('accent', 'Grid (Equal Widths)')), 0, 1));
        const grid = new Grid({ spacing: 2 });
        grid.addChild(new Text(theme.fg('success', '✓'), 0, 0));
        grid.addChild(new Text(theme.fg('error', '✗'), 0, 0));
        grid.addChild(new Text(theme.fg('warning', '⚠'), 0, 0));
        container.addChild(grid);
        container.addChild(new Text(theme.fg('dim', 'All get equal width'), 0, 1));

        // Flex wrap example
        container.addChild(
          new Text(theme.bold(theme.fg('accent', 'Flex Wrap (Natural Widths)')), 0, 1)
        );
        const flex = new Flex({ mode: 'wrap', spacing: 2 });
        flex.addChild(sized(new Text(theme.fg('success', '✓'), 0, 0), 3));
        flex.addChild(sized(new Text(theme.fg('error', '✗'), 0, 0), 3));
        flex.addChild(sized(new Text(theme.fg('warning', '⚠'), 0, 0), 3));
        container.addChild(flex);
        container.addChild(new Text(theme.fg('dim', 'Each uses natural width'), 0, 1));

        return container;
      });

      ctx.ui.notify('Comparison shown', 'info');
    },
  });

  // Example 5: Real-world dashboard
  pi.registerCommand('example-dashboard', {
    description: 'Show dashboard layout with Grid and Flex',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        // Title
        container.addChild(new Text(theme.bold(theme.fg('accent', 'Dashboard Example')), 0, 1));

        // Top row - 3 metrics (Grid)
        const metricsRow = new Grid({ spacing: 3 });

        const metric1 = new Box();
        const m1Content = new Container();
        m1Content.addChild(new Text(theme.fg('dim', 'Total Users'), 1, 0));
        m1Content.addChild(new Text(theme.bold(theme.fg('accent', '1,234')), 1, 0));
        metric1.addChild(m1Content);
        metricsRow.addChild(metric1);

        const metric2 = new Box();
        const m2Content = new Container();
        m2Content.addChild(new Text(theme.fg('dim', 'Active'), 1, 0));
        m2Content.addChild(new Text(theme.bold(theme.fg('success', '856')), 1, 0));
        metric2.addChild(m2Content);
        metricsRow.addChild(metric2);

        const metric3 = new Box();
        const m3Content = new Container();
        m3Content.addChild(new Text(theme.fg('dim', 'Errors'), 1, 0));
        m3Content.addChild(new Text(theme.bold(theme.fg('error', '12')), 1, 0));
        metric3.addChild(m3Content);
        metricsRow.addChild(metric3);

        container.addChild(metricsRow);
        container.addChild(new Text('', 0, 1));

        // Tags row (Flex wrap)
        container.addChild(new Text(theme.fg('dim', 'Tags:'), 0, 0));
        const tagsRow = new Flex({ mode: 'wrap', spacing: 1 });
        const tags = ['production', 'monitoring', 'alerts', 'dashboard', 'metrics'];
        for (const tag of tags) {
          tagsRow.addChild(sized(new Text(theme.fg('accent', `[${tag}]`), 0, 0), tag.length + 2));
        }
        container.addChild(tagsRow);

        return container;
      });

      ctx.ui.notify('Dashboard shown', 'info');
    },
  });

  // Example 6: Responsive behavior
  pi.registerCommand('example-responsive', {
    description: 'Show responsive Grid and Flex behavior',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        container.addChild(new Text(theme.bold(theme.fg('accent', 'Responsive Layouts')), 0, 1));
        container.addChild(new Text(theme.fg('dim', 'Resize terminal to see behavior'), 0, 1));

        // Grid with minColumnWidth
        container.addChild(new Text(theme.fg('accent', 'Grid (min 15 chars/column):'), 0, 1));
        const grid = new Grid({ spacing: 2, minColumnWidth: 15 });
        for (let i = 1; i <= 4; i++) {
          grid.addChild(new Text(theme.fg('text', `Col ${i}`), 1, 0));
        }
        container.addChild(grid);
        container.addChild(
          new Text(theme.fg('dim', 'Falls back to vertical when too narrow'), 0, 1)
        );

        // Flex wrap
        container.addChild(new Text(theme.fg('accent', 'Flex Wrap:'), 0, 1));
        const flex = new Flex({ mode: 'wrap', spacing: 2 });
        const items = ['Short', 'Medium text', 'Longer text here', 'X', 'Another item'];
        for (const item of items) {
          flex.addChild(sized(new Text(theme.fg('text', item), 0, 0), item.length + 2));
        }
        container.addChild(flex);
        container.addChild(new Text(theme.fg('dim', 'Automatically wraps to fit width'), 0, 0));

        return container;
      });

      ctx.ui.notify('Responsive layouts shown - resize terminal!', 'info');
    },
  });
}
