/**
 * Grid and Flex Layout Examples
 *
 * Demonstrates the difference between Grid (equal widths) and Flex (flow layout)
 */

import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import { Box, Container, Text } from '@mariozechner/pi-tui';
import { Grid, Flex, sized } from '@zenobius/pi-ds';

export default function (pi: ExtensionAPI) {
  pi.registerCommand('pi-ds', {
    description: 'Show Grid and Flex layout examples',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();
        const hr = () => new Text(theme.fg('dim', '─'.repeat(60)), 0, 1);

        // Title
        container.addChild(
          new Text(theme.bold(theme.fg('accent', '📐 Pi-DS Layout Examples')), 0, 1)
        );
        container.addChild(new Text(theme.fg('dim', 'Grid and Flex layout demonstrations'), 0, 1));

        // Grid Example
        container.addChild(hr());
        container.addChild(
          new Text(theme.bold(theme.fg('accent', '1. Grid Layout (Equal Widths)')), 0, 1)
        );
        const grid = new Grid({ spacing: 2 });

        const gridBox1 = new Box();
        const gridBox1Content = new Container();
        gridBox1Content.addChild(new Text(theme.fg('success', '● Build'), 1, 0));
        gridBox1Content.addChild(new Text(theme.fg('dim', '─'.repeat(12)), 1, 0));
        gridBox1Content.addChild(new Text(theme.fg('text', 'Status: Pass'), 1, 0));
        gridBox1Content.addChild(new Text(theme.fg('text', 'Time: 2m 34s'), 1, 0));
        gridBox1Content.addChild(new Text(theme.fg('dim', '5 min ago'), 1, 0));
        gridBox1.addChild(gridBox1Content);
        grid.addChild(gridBox1);

        const gridBox2 = new Box();
        const gridBox2Content = new Container();
        gridBox2Content.addChild(new Text(theme.fg('success', '● Tests'), 1, 0));
        gridBox2Content.addChild(new Text(theme.fg('dim', '─'.repeat(12)), 1, 0));
        gridBox2Content.addChild(new Text(theme.fg('text', 'Passed: 156'), 1, 0));
        gridBox2Content.addChild(new Text(theme.fg('text', 'Failed: 0'), 1, 0));
        gridBox2Content.addChild(new Text(theme.fg('dim', 'Coverage: 94%'), 1, 0));
        gridBox2.addChild(gridBox2Content);
        grid.addChild(gridBox2);

        const gridBox3 = new Box();
        const gridBox3Content = new Container();
        gridBox3Content.addChild(new Text(theme.fg('warning', '● Deploy'), 1, 0));
        gridBox3Content.addChild(new Text(theme.fg('dim', '─'.repeat(12)), 1, 0));
        gridBox3Content.addChild(new Text(theme.fg('text', 'In Progress'), 1, 0));
        gridBox3Content.addChild(new Text(theme.fg('text', 'Step: 3/5'), 1, 0));
        gridBox3Content.addChild(new Text(theme.fg('dim', 'ETA: 2 min'), 1, 0));
        gridBox3.addChild(gridBox3Content);
        grid.addChild(gridBox3);

        container.addChild(grid);
        container.addChild(
          new Text(theme.fg('dim', 'All columns get equal width regardless of content'), 0, 0)
        );

        // Flex Fill Example
        container.addChild(hr());
        container.addChild(
          new Text(theme.bold(theme.fg('accent', '2. Flex Fill Mode (Share Space)')), 0, 1)
        );
        const flexFill = new Flex({ mode: 'fill', spacing: 2 });

        const fillBox1 = new Box();
        const fillBox1Content = new Container();
        fillBox1Content.addChild(new Text(theme.fg('accent', 'React'), 1, 0));
        fillBox1Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        fillBox1Content.addChild(new Text(theme.fg('text', 'UI Library'), 1, 0));
        fillBox1Content.addChild(new Text(theme.fg('text', 'Component'), 1, 0));
        fillBox1Content.addChild(new Text(theme.fg('dim', 'Min: 15'), 1, 0));
        fillBox1.addChild(fillBox1Content);
        flexFill.addChild(sized(fillBox1, 15));

        const fillBox2 = new Box();
        const fillBox2Content = new Container();
        fillBox2Content.addChild(new Text(theme.fg('accent', 'TypeScript'), 1, 0));
        fillBox2Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        fillBox2Content.addChild(new Text(theme.fg('text', 'Type Safety'), 1, 0));
        fillBox2Content.addChild(new Text(theme.fg('text', 'JavaScript'), 1, 0));
        fillBox2Content.addChild(new Text(theme.fg('dim', 'Min: 20'), 1, 0));
        fillBox2.addChild(fillBox2Content);
        flexFill.addChild(sized(fillBox2, 20));

        const fillBox3 = new Box();
        const fillBox3Content = new Container();
        fillBox3Content.addChild(new Text(theme.fg('accent', 'Node.js'), 1, 0));
        fillBox3Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        fillBox3Content.addChild(new Text(theme.fg('text', 'Runtime'), 1, 0));
        fillBox3Content.addChild(new Text(theme.fg('text', 'Server'), 1, 0));
        fillBox3Content.addChild(new Text(theme.fg('dim', 'Min: 15'), 1, 0));
        fillBox3.addChild(fillBox3Content);
        flexFill.addChild(sized(fillBox3, 15));

        container.addChild(flexFill);
        container.addChild(
          new Text(theme.fg('dim', 'Each starts at minimum, then shares extra space evenly'), 0, 0)
        );

        // Flex Wrap Example
        container.addChild(hr());
        container.addChild(
          new Text(theme.bold(theme.fg('accent', '3. Flex Wrap Mode (Flow & Wrap)')), 0, 1)
        );
        const flexWrap = new Flex({ mode: 'wrap', spacing: 2 });

        const wrapCards = [
          { icon: '🔨', title: 'Build', desc: 'Compile code', size: 14 },
          { icon: '🧪', title: 'Test', desc: 'Run tests', size: 14 },
          { icon: '📦', title: 'Package', desc: 'Bundle app', size: 16 },
          { icon: '🚀', title: 'Deploy', desc: 'Push live', size: 14 },
          { icon: '📊', title: 'Monitor', desc: 'Track metrics', size: 16 },
          { icon: '🔍', title: 'Debug', desc: 'Find issues', size: 15 },
        ];

        for (const card of wrapCards) {
          const wrapBox = new Box();
          const wrapContent = new Container();
          wrapContent.addChild(new Text(theme.fg('accent', `${card.icon} ${card.title}`), 1, 0));
          wrapContent.addChild(new Text(theme.fg('dim', '─'.repeat(10)), 1, 0));
          wrapContent.addChild(new Text(theme.fg('text', card.desc), 1, 0));
          wrapBox.addChild(wrapContent);
          flexWrap.addChild(sized(wrapBox, card.size));
        }

        container.addChild(flexWrap);
        container.addChild(
          new Text(
            theme.fg('dim', "Cards flow in natural order, wrap to next line when they don't fit"),
            0,
            0
          )
        );

        container.addChild(hr());
        container.addChild(
          new Text(theme.fg('dim', 'Resize terminal to see responsive behavior'), 0, 0)
        );

        return container;
      });

      ctx.ui.notify('Pi-DS examples shown - scroll to explore!', 'info');
    },
  });
}
