/**
 * Grid and Flex Layout Examples
 *
 * Demonstrates the difference between Grid (equal widths) and Flex (flow layout)
 */

import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import { Box, Container, Text } from '@mariozechner/pi-tui';
import { Grid, Flex, sized } from '@zenobius/pi-ds';

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
        const box1Content = new Container();
        box1Content.addChild(new Text(theme.fg('accent', 'Column 1'), 1, 0));
        box1Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        box1Content.addChild(new Text(theme.fg('text', 'Short'), 1, 0));
        box1Content.addChild(new Text(theme.fg('text', 'content'), 1, 0));
        box1.addChild(box1Content);
        grid.addChild(box1);

        const box2 = new Box();
        const box2Content = new Container();
        box2Content.addChild(new Text(theme.fg('accent', 'Column 2'), 1, 0));
        box2Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        box2Content.addChild(new Text(theme.fg('text', 'Medium'), 1, 0));
        box2Content.addChild(new Text(theme.fg('text', 'length'), 1, 0));
        box2Content.addChild(new Text(theme.fg('text', 'content'), 1, 0));
        box2.addChild(box2Content);
        grid.addChild(box2);

        const box3 = new Box();
        const box3Content = new Container();
        box3Content.addChild(new Text(theme.fg('accent', 'Column 3'), 1, 0));
        box3Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        box3Content.addChild(new Text(theme.fg('text', 'This is a'), 1, 0));
        box3Content.addChild(new Text(theme.fg('text', 'much longer'), 1, 0));
        box3Content.addChild(new Text(theme.fg('text', 'piece of'), 1, 0));
        box3Content.addChild(new Text(theme.fg('text', 'text content'), 1, 0));
        box3.addChild(box3Content);
        grid.addChild(box3);

        container.addChild(grid);
        container.addChild(new Text('', 0, 1));
        container.addChild(
          new Text(theme.fg('dim', 'All columns get equal width, content wraps naturally'), 0, 0)
        );
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
        const box1Content = new Container();
        box1Content.addChild(new Text(theme.fg('accent', 'Small'), 1, 0));
        box1Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        box1Content.addChild(new Text(theme.fg('text', 'Min: 10'), 1, 0));
        box1Content.addChild(new Text(theme.fg('text', 'Compact'), 1, 0));
        box1Content.addChild(new Text(theme.fg('text', 'box'), 1, 0));
        box1.addChild(box1Content);
        flex.addChild(sized(box1, 10));

        const box2 = new Box();
        const box2Content = new Container();
        box2Content.addChild(new Text(theme.fg('accent', 'Medium'), 1, 0));
        box2Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        box2Content.addChild(new Text(theme.fg('text', 'Min: 20'), 1, 0));
        box2Content.addChild(new Text(theme.fg('text', 'This box'), 1, 0));
        box2Content.addChild(new Text(theme.fg('text', 'wants more'), 1, 0));
        box2Content.addChild(new Text(theme.fg('text', 'space'), 1, 0));
        box2.addChild(box2Content);
        flex.addChild(sized(box2, 20));

        const box3 = new Box();
        const box3Content = new Container();
        box3Content.addChild(new Text(theme.fg('accent', 'Regular'), 1, 0));
        box3Content.addChild(new Text(theme.fg('dim', '─'.repeat(8)), 1, 0));
        box3Content.addChild(new Text(theme.fg('text', 'Min: 15'), 1, 0));
        box3Content.addChild(new Text(theme.fg('text', 'Standard'), 1, 0));
        box3Content.addChild(new Text(theme.fg('text', 'sized box'), 1, 0));
        box3.addChild(box3Content);
        flex.addChild(sized(box3, 15));

        container.addChild(flex);
        container.addChild(new Text('', 0, 1));
        container.addChild(
          new Text(theme.fg('dim', 'Each starts at min width, then shares extra space'), 0, 0)
        );
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

        // Tags with different widths - some multiline
        const tags = [
          { name: 'React', desc: 'UI Library' },
          { name: 'TypeScript', desc: 'Type-safe JS' },
          { name: 'Node.js', desc: 'Runtime' },
          { name: 'Python', desc: 'Language' },
          { name: 'JavaScript', desc: 'Dynamic' },
          { name: 'Rust', desc: 'Systems' },
          { name: 'Go', desc: 'Fast' },
          { name: 'Docker', desc: 'Containers' },
        ];

        for (const tag of tags) {
          const box = new Box();
          const boxContent = new Container();
          boxContent.addChild(new Text(theme.fg('accent', tag.name), 1, 0));
          boxContent.addChild(new Text(theme.fg('dim', tag.desc), 1, 0));
          box.addChild(boxContent);
          flex.addChild(sized(box, tag.length + 4));
        }

        container.addChild(flex);
        container.addChild(new Text('', 0, 1));
        container.addChild(
          new Text(theme.fg('dim', "Multi-line boxes wrap to next line when they don't fit"), 0, 0)
        );
        return container;
      });

      ctx.ui.notify('Flex wrap mode - children wrap when needed', 'info');
    },
  });

  // Example 4: Comparison - Side by side with multiline content
  pi.registerCommand('example-grid-vs-flex', {
    description: 'Compare Grid vs Flex layouts with multiline boxes',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        // Grid example with multiline boxes
        container.addChild(new Text(theme.bold(theme.fg('accent', 'Grid (Equal Widths)')), 0, 1));
        const grid = new Grid({ spacing: 2 });

        const successBox = new Box();
        const successContent = new Container();
        successContent.addChild(new Text(theme.fg('success', '✓ Pass'), 1, 0));
        successContent.addChild(new Text(theme.fg('dim', '─'.repeat(6)), 1, 0));
        successContent.addChild(new Text(theme.fg('text', 'All tests'), 1, 0));
        successContent.addChild(new Text(theme.fg('text', 'passed'), 1, 0));
        successBox.addChild(successContent);
        grid.addChild(successBox);

        const errorBox = new Box();
        const errorContent = new Container();
        errorContent.addChild(new Text(theme.fg('error', '✗ Fail'), 1, 0));
        errorContent.addChild(new Text(theme.fg('dim', '─'.repeat(6)), 1, 0));
        errorContent.addChild(new Text(theme.fg('text', '2 tests'), 1, 0));
        errorContent.addChild(new Text(theme.fg('text', 'failed'), 1, 0));
        errorBox.addChild(errorContent);
        grid.addChild(errorBox);

        const warnBox = new Box();
        const warnContent = new Container();
        warnContent.addChild(new Text(theme.fg('warning', '⚠ Warn'), 1, 0));
        warnContent.addChild(new Text(theme.fg('dim', '─'.repeat(6)), 1, 0));
        warnContent.addChild(new Text(theme.fg('text', '3 warnings'), 1, 0));
        warnContent.addChild(new Text(theme.fg('text', 'found'), 1, 0));
        warnBox.addChild(warnContent);
        grid.addChild(warnBox);

        container.addChild(grid);
        container.addChild(new Text(theme.fg('dim', 'All columns equal width'), 0, 1));

        // Flex wrap example with multiline boxes
        container.addChild(
          new Text(theme.bold(theme.fg('accent', 'Flex Wrap (Natural Widths)')), 0, 1)
        );
        const flex = new Flex({ mode: 'wrap', spacing: 2 });

        const flexBox1 = new Box();
        const flexContent1 = new Container();
        flexContent1.addChild(new Text(theme.fg('success', '✓ OK'), 1, 0));
        flexContent1.addChild(new Text(theme.fg('text', 'Short'), 1, 0));
        flexBox1.addChild(flexContent1);
        flex.addChild(sized(flexBox1, 12));

        const flexBox2 = new Box();
        const flexContent2 = new Container();
        flexContent2.addChild(new Text(theme.fg('error', '✗ Error'), 1, 0));
        flexContent2.addChild(new Text(theme.fg('text', 'Longer content'), 1, 0));
        flexBox2.addChild(flexContent2);
        flex.addChild(sized(flexBox2, 18));

        const flexBox3 = new Box();
        const flexContent3 = new Container();
        flexContent3.addChild(new Text(theme.fg('warning', '⚠ Warning'), 1, 0));
        flexContent3.addChild(new Text(theme.fg('text', 'Medium'), 1, 0));
        flexBox3.addChild(flexContent3);
        flex.addChild(sized(flexBox3, 14));

        container.addChild(flex);
        container.addChild(new Text(theme.fg('dim', 'Each uses its natural width'), 0, 0));

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

  // Example 7: Box styles and variants
  pi.registerCommand('example-box-styles', {
    description: 'Show different Box border styles and variants',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        container.addChild(new Text(theme.bold(theme.fg('accent', 'Box Styles')), 0, 1));

        // Grid with different box styles
        const grid = new Grid({ spacing: 2 });

        // Success box
        const successBox = new Box();
        const successContent = new Container();
        successContent.addChild(new Text(theme.fg('success', '✓ Success'), 1, 0));
        successContent.addChild(new Text(theme.fg('text', 'Operation completed'), 1, 0));
        successBox.addChild(successContent);
        grid.addChild(successBox);

        // Warning box
        const warningBox = new Box();
        const warningContent = new Container();
        warningContent.addChild(new Text(theme.fg('warning', '⚠ Warning'), 1, 0));
        warningContent.addChild(new Text(theme.fg('text', 'Check your input'), 1, 0));
        warningBox.addChild(warningContent);
        grid.addChild(warningBox);

        // Error box
        const errorBox = new Box();
        const errorContent = new Container();
        errorContent.addChild(new Text(theme.fg('error', '✗ Error'), 1, 0));
        errorContent.addChild(new Text(theme.fg('text', 'Something failed'), 1, 0));
        errorBox.addChild(errorContent);
        grid.addChild(errorBox);

        container.addChild(grid);

        return container;
      });

      ctx.ui.notify('Box styles shown', 'info');
    },
  });

  // Example 8: Nested layouts
  pi.registerCommand('example-nested', {
    description: 'Show nested Grid and Flex layouts',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        container.addChild(new Text(theme.bold(theme.fg('accent', 'Nested Layouts')), 0, 1));

        // Outer grid
        const outerGrid = new Grid({ spacing: 2 });

        // Left column with vertical stack
        const leftBox = new Box();
        const leftContent = new Container();
        leftContent.addChild(new Text(theme.fg('accent', 'Sidebar'), 1, 0));
        leftContent.addChild(new Text(theme.fg('dim', '━'.repeat(15)), 1, 0));
        leftContent.addChild(new Text(theme.fg('text', 'Navigation'), 1, 0));
        leftContent.addChild(new Text(theme.fg('text', 'Settings'), 1, 0));
        leftContent.addChild(new Text(theme.fg('text', 'Help'), 1, 0));
        leftBox.addChild(leftContent);
        outerGrid.addChild(leftBox);

        // Right column with nested grid
        const rightBox = new Box();
        const rightContent = new Container();
        rightContent.addChild(new Text(theme.fg('accent', 'Content Area'), 1, 0));
        rightContent.addChild(new Text(theme.fg('dim', '━'.repeat(30)), 1, 1));

        // Nested grid for cards
        const cardsGrid = new Grid({ spacing: 1 });
        for (let i = 1; i <= 4; i++) {
          const card = new Box();
          const cardContent = new Container();
          cardContent.addChild(new Text(theme.fg('text', `Card ${i}`), 1, 0));
          cardContent.addChild(new Text(theme.fg('dim', `Description ${i}`), 1, 0));
          card.addChild(cardContent);
          cardsGrid.addChild(card);
        }
        rightContent.addChild(cardsGrid);
        rightBox.addChild(rightContent);
        outerGrid.addChild(rightBox);

        container.addChild(outerGrid);

        return container;
      });

      ctx.ui.notify('Nested layouts shown', 'info');
    },
  });

  // Example 9: Status cards with icons
  pi.registerCommand('example-status-cards', {
    description: 'Show status cards with Grid layout',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        container.addChild(new Text(theme.bold(theme.fg('accent', 'Status Cards')), 0, 1));

        const grid = new Grid({ spacing: 2, minColumnWidth: 20 });

        // Build status
        const buildBox = new Box();
        const buildContent = new Container();
        buildContent.addChild(new Text(theme.bold(theme.fg('success', '● Build')), 1, 0));
        buildContent.addChild(new Text(theme.fg('dim', '─'.repeat(15)), 1, 0));
        buildContent.addChild(new Text(theme.fg('text', 'Status: Passing'), 1, 0));
        buildContent.addChild(new Text(theme.fg('text', 'Duration: 2m 34s'), 1, 0));
        buildContent.addChild(new Text(theme.fg('dim', 'Last: 5 min ago'), 1, 0));
        buildBox.addChild(buildContent);
        grid.addChild(buildBox);

        // Test status
        const testBox = new Box();
        const testContent = new Container();
        testContent.addChild(new Text(theme.bold(theme.fg('success', '● Tests')), 1, 0));
        testContent.addChild(new Text(theme.fg('dim', '─'.repeat(15)), 1, 0));
        testContent.addChild(new Text(theme.fg('text', 'Passed: 156'), 1, 0));
        testContent.addChild(new Text(theme.fg('text', 'Failed: 0'), 1, 0));
        testContent.addChild(new Text(theme.fg('dim', 'Coverage: 94%'), 1, 0));
        testBox.addChild(testContent);
        grid.addChild(testBox);

        // Deploy status
        const deployBox = new Box();
        const deployContent = new Container();
        deployContent.addChild(new Text(theme.bold(theme.fg('warning', '● Deploy')), 1, 0));
        deployContent.addChild(new Text(theme.fg('dim', '─'.repeat(15)), 1, 0));
        deployContent.addChild(new Text(theme.fg('text', 'Status: In Progress'), 1, 0));
        deployContent.addChild(new Text(theme.fg('text', 'Step: 3/5'), 1, 0));
        deployContent.addChild(new Text(theme.fg('dim', 'ETA: 2 minutes'), 1, 0));
        deployBox.addChild(deployContent);
        grid.addChild(deployBox);

        container.addChild(grid);

        return container;
      });

      ctx.ui.notify('Status cards shown', 'info');
    },
  });

  // Example 10: Form layout with boxes
  pi.registerCommand('example-form-layout', {
    description: 'Show form-like layout with labeled boxes',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        container.addChild(new Text(theme.bold(theme.fg('accent', 'Form Layout')), 0, 1));
        container.addChild(new Text(theme.fg('dim', 'Example configuration form'), 0, 1));

        // Field 1: Full width
        const nameBox = new Box();
        const nameContent = new Container();
        nameContent.addChild(new Text(theme.fg('accent', 'Project Name'), 1, 0));
        nameContent.addChild(new Text(theme.fg('text', 'my-awesome-project'), 1, 0));
        nameBox.addChild(nameContent);
        container.addChild(nameBox);
        container.addChild(new Text('', 0, 1));

        // Fields 2-3: Grid
        const grid = new Grid({ spacing: 2 });

        const versionBox = new Box();
        const versionContent = new Container();
        versionContent.addChild(new Text(theme.fg('accent', 'Version'), 1, 0));
        versionContent.addChild(new Text(theme.fg('text', '1.0.0'), 1, 0));
        versionBox.addChild(versionContent);
        grid.addChild(versionBox);

        const licenseBox = new Box();
        const licenseContent = new Container();
        licenseContent.addChild(new Text(theme.fg('accent', 'License'), 1, 0));
        licenseContent.addChild(new Text(theme.fg('text', 'MIT'), 1, 0));
        licenseBox.addChild(licenseContent);
        grid.addChild(licenseBox);

        container.addChild(grid);
        container.addChild(new Text('', 0, 1));

        // Tags with flex wrap
        const tagsBox = new Box();
        const tagsContent = new Container();
        tagsContent.addChild(new Text(theme.fg('accent', 'Tags'), 1, 0));

        const tagsFlex = new Flex({ mode: 'wrap', spacing: 1 });
        const tags = ['typescript', 'nodejs', 'cli', 'tools'];
        for (const tag of tags) {
          tagsFlex.addChild(sized(new Text(theme.fg('text', `#${tag}`), 0, 0), tag.length + 1));
        }
        tagsContent.addChild(tagsFlex);
        tagsBox.addChild(tagsContent);
        container.addChild(tagsBox);

        return container;
      });

      ctx.ui.notify('Form layout shown', 'info');
    },
  });

  // Example 11: File tree with boxes
  pi.registerCommand('example-file-tree', {
    description: 'Show file tree structure with nested boxes',
    handler: async (_args, ctx) => {
      if (!ctx.hasUI) return;

      ctx.ui.setWidget('layout-demo', (tui, theme) => {
        const container = new Container();

        container.addChild(new Text(theme.bold(theme.fg('accent', 'File Tree')), 0, 1));

        const treeBox = new Box();
        const treeContent = new Container();

        // Root
        treeContent.addChild(new Text(theme.fg('accent', '📁 src/'), 1, 0));

        // Components folder
        treeContent.addChild(new Text(theme.fg('text', '├─ 📁 components/'), 1, 0));
        treeContent.addChild(new Text(theme.fg('dim', '│  ├─ 📄 Button.ts'), 1, 0));
        treeContent.addChild(new Text(theme.fg('dim', '│  └─ 📄 Input.ts'), 1, 0));

        // Utils folder
        treeContent.addChild(new Text(theme.fg('text', '├─ 📁 utils/'), 1, 0));
        treeContent.addChild(new Text(theme.fg('dim', '│  └─ 📄 helpers.ts'), 1, 0));

        // Files
        treeContent.addChild(new Text(theme.fg('text', '├─ 📄 index.ts'), 1, 0));
        treeContent.addChild(new Text(theme.fg('text', '└─ 📄 types.ts'), 1, 0));

        treeBox.addChild(treeContent);
        container.addChild(treeBox);

        // Stats in grid
        container.addChild(new Text('', 0, 1));
        container.addChild(new Text(theme.fg('dim', 'Statistics'), 0, 0));

        const statsGrid = new Grid({ spacing: 2 });

        const filesBox = new Box();
        filesBox.addChild(new Text(theme.fg('text', '6 files'), 1, 0));
        statsGrid.addChild(filesBox);

        const foldersBox = new Box();
        foldersBox.addChild(new Text(theme.fg('text', '3 folders'), 1, 0));
        statsGrid.addChild(foldersBox);

        const linesBox = new Box();
        linesBox.addChild(new Text(theme.fg('text', '1.2K lines'), 1, 0));
        statsGrid.addChild(linesBox);

        container.addChild(statsGrid);

        return container;
      });

      ctx.ui.notify('File tree shown', 'info');
    },
  });
}
