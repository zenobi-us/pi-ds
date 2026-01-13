# Research: Unit Testing TUI Components

**Status:** Completed
**Created:** 2026-01-13
**Type:** research
**Hash:** 5d437659

## Summary

Comprehensive research on testing TUI (Text User Interface) components that render text-based output. This research covers testing strategies, tools, patterns, and best practices specifically for the pi-ds design system which uses vitest as its testing framework.

## Key Findings

### 1. Vitest Snapshot Testing

**Source:** [Vitest Snapshot Documentation](https://vitest.dev/guide/snapshot)

Vitest provides excellent snapshot testing capabilities that are ideal for TUI components:

- **Basic Snapshots:** Use `expect(output).toMatchSnapshot()` to compare rendered output
- **Inline Snapshots:** Use `toMatchInlineSnapshot()` to embed snapshots directly in test files
- **File Snapshots:** Use `toMatchFileSnapshot()` for better syntax highlighting and readability
- **Update Mode:** Run `vitest -u` to update snapshots when changes are intentional

**Advantages for TUI Testing:**
- Perfect for catching unintended layout changes
- Easy to review visual output in snapshot files
- Automatic comparison of multi-line string arrays
- Built-in diff display when snapshots don't match

**Example Pattern:**
```typescript
import { expect, it } from 'vitest';

it('renders alert with icon and message', () => {
  const alert = new Alert(theme, 'success', 'Operation completed');
  const output = alert.render(80);
  expect(output).toMatchSnapshot();
});
```

### 2. Testing String Output Patterns

**Source:** [Testing CLI Output Guide](https://www.lekoarts.de/how-to-test-cli-output-in-jest-vitest/)

For testing specific content within rendered output without full snapshots:

**Recommended Pattern:**
```typescript
import { expect, describe, it } from 'vitest';

describe('Alert Component', () => {
  it('contains expected text content', () => {
    const alert = new Alert(theme, 'error', 'Connection failed');
    const output = alert.render(80).join('\n');
    
    expect(output).toContain('Connection failed');
    expect(output).toContain('✗'); // Error icon
  });
});
```

**Helper Function Pattern:**
```typescript
function createOutputMatcher(lines: string[]) {
  const output = lines.join('\n');
  
  return {
    contains: (text: string) => expect(output).toContain(text),
    notContains: (text: string) => expect(output).not.toContain(text),
    matchesPattern: (pattern: RegExp) => expect(output).toMatch(pattern),
  };
}
```

### 3. Handling ANSI Color Codes

**Source:** [strip-ansi npm package](https://www.npmjs.com/package/strip-ansi)

TUI components use ANSI escape codes for colors. Testing strategies:

**Option 1: Test with ANSI codes** (verify complete output)
```typescript
it('applies correct color for success alert', () => {
  const alert = new Alert(theme, 'success', 'Done');
  const output = alert.render(80);
  // Check for ANSI green color code
  expect(output.join('\n')).toContain('\u001b[32m'); // Green
});
```

**Option 2: Strip ANSI codes** (test logical content only)
```typescript
import stripAnsi from 'strip-ansi';

it('contains correct text without colors', () => {
  const alert = new Alert(theme, 'success', 'Done');
  const output = alert.render(80).join('\n');
  const cleanOutput = stripAnsi(output);
  
  expect(cleanOutput).toContain('✓');
  expect(cleanOutput).toContain('Done');
});
```

**Recommendation:** Use Option 1 (with ANSI) for full integration tests, Option 2 (stripped) for logic-focused unit tests.

### 4. Testing Layout Components

**Best Practices:**

#### Test Width Distribution
```typescript
describe('Flex fill mode', () => {
  it('distributes width evenly among children', () => {
    const flex = new Flex({ mode: 'fill' });
    flex.addChild(new Text('A', 0, 0));
    flex.addChild(new Text('B', 0, 0));
    flex.addChild(new Text('C', 0, 0));
    
    const output = flex.render(60);
    // Each child should get roughly 60/3 = 20 chars
    // (minus spacing)
  });
});
```

#### Test Wrapping Behavior
```typescript
describe('Flex wrap mode', () => {
  it('wraps children to next line when width exceeded', () => {
    const flex = new Flex({ mode: 'wrap', spacing: 2 });
    flex.addChild(sized(new Text('Long text here'), 30));
    flex.addChild(sized(new Text('More text'), 30));
    
    const output = flex.render(40); // Not enough for both
    expect(output.length).toBeGreaterThan(1); // Wrapped to multiple lines
  });
});
```

#### Test Spacing
```typescript
describe('Flex spacing', () => {
  it('applies correct spacing between children', () => {
    const flex = new Flex({ mode: 'fill', spacing: 4 });
    flex.addChild(new Text('A', 0, 0));
    flex.addChild(new Text('B', 0, 0));
    
    const output = flex.render(20);
    const line = output[0];
    // Check for 4 space gap between A and B
    expect(line).toMatch(/A\s{4}B/);
  });
});
```

#### Test Alignment
```typescript
describe('Flex alignment', () => {
  it('centers content when align is center', () => {
    const flex = new Flex({ align: 'center' });
    flex.addChild(new Text('Centered', 0, 0));
    
    const output = flex.render(40);
    const line = output[0];
    const trimmed = line.trim();
    const leadingSpaces = line.indexOf(trimmed);
    const trailingSpaces = line.length - trimmed.length - leadingSpaces;
    
    expect(Math.abs(leadingSpaces - trailingSpaces)).toBeLessThanOrEqual(1);
  });
});
```

### 5. Testing Component State Changes

**Pattern for Dynamic Updates:**
```typescript
describe('Alert state changes', () => {
  it('updates content when update() is called', () => {
    const alert = new Alert(theme, 'info', 'Loading...');
    let output = alert.render(80).join('\n');
    expect(output).toContain('Loading...');
    
    alert.update('✓', 'Complete');
    output = alert.render(80).join('\n');
    expect(output).toContain('Complete');
    expect(output).not.toContain('Loading...');
  });
  
  it('changes type and icon when setType() is called', () => {
    const alert = new Alert(theme, 'info', 'Message');
    alert.setType('error');
    
    const output = alert.render(80).join('\n');
    expect(output).toContain('✗'); // Error icon
  });
});
```

### 6. Testing Edge Cases

**Critical Edge Cases to Test:**

1. **Empty Content:**
```typescript
it('handles empty children gracefully', () => {
  const flex = new Flex({ mode: 'fill' });
  const output = flex.render(80);
  expect(output).toEqual([]);
});
```

2. **Single Child:**
```typescript
it('renders single child correctly', () => {
  const flex = new Flex({ mode: 'fill' });
  flex.addChild(new Text('Alone', 0, 0));
  const output = flex.render(80);
  expect(output.length).toBeGreaterThan(0);
});
```

3. **Overflow:**
```typescript
it('handles content wider than available width', () => {
  const alert = new Alert(theme, 'info', 'Very long message '.repeat(20));
  const output = alert.render(40);
  // Should wrap or truncate gracefully
  expect(output.every(line => line.length <= 40)).toBe(true);
});
```

4. **Minimum Width:**
```typescript
it('handles very small widths', () => {
  const alert = new Alert(theme, 'info', 'Test');
  const output = alert.render(5);
  expect(output).toBeDefined();
  expect(() => alert.render(5)).not.toThrow();
});
```

5. **Zero Width:**
```typescript
it('handles zero width gracefully', () => {
  const flex = new Flex({ mode: 'fill' });
  flex.addChild(new Text('Test', 0, 0));
  expect(() => flex.render(0)).not.toThrow();
});
```

## Recommended Testing Strategy

### Test Organization Structure

```
tests/
├── unit/
│   ├── Alert.test.ts           # Component logic tests
│   ├── Flex.test.ts            # Layout algorithm tests
│   ├── Grid.test.ts            # Grid layout tests
│   ├── Sized.test.ts           # Sizing helper tests
│   └── Modal.test.ts           # Modal component tests
├── integration/
│   ├── Alert.integration.test.ts    # Full render tests
│   └── Flex.integration.test.ts     # Complex layout tests
├── helpers/
│   ├── test-theme.ts           # Mock theme for testing
│   ├── output-matchers.ts      # Custom matchers
│   └── strip-ansi.ts           # ANSI stripping utility
└── snapshots/
    └── __snapshots__/          # Snapshot files
```

### Unit Tests vs Integration Tests

**Unit Tests** (Fast, focused):
- Test individual methods (e.g., `getType()`, `setType()`)
- Test state management
- Test helper functions
- Use minimal or mock dependencies

**Integration Tests** (Slower, comprehensive):
- Test full render output with real theme
- Test component composition
- Use snapshot testing
- Test responsive behavior across widths

### Test Coverage Goals

1. **Component Behavior:** 100%
   - All public methods
   - State transitions
   - Getter/setter pairs

2. **Rendering Logic:** 80%+
   - Common width scenarios (40, 80, 120, 160 chars)
   - Edge cases (0, 1, very large)
   - Different content sizes

3. **Layout Algorithms:** 95%+
   - Distribution calculations
   - Wrapping logic
   - Spacing application
   - Alignment positioning

## Utility Functions to Implement

### 1. Test Theme Factory

```typescript
// tests/helpers/test-theme.ts
import { Theme } from '@mariozechner/pi-coding-agent';

export function createTestTheme(): Theme {
  // Create a theme with predictable output for testing
  return new Theme({
    // Configuration for consistent test output
  });
}

export function createNoColorTheme(): Theme {
  // Theme that doesn't add ANSI codes
  // Useful for testing pure layout logic
}
```

### 2. Output Matcher Helpers

```typescript
// tests/helpers/output-matchers.ts
import stripAnsi from 'strip-ansi';
import { visibleWidth } from '@mariozechner/pi-tui';

export function createOutputMatcher(lines: string[]) {
  const joined = lines.join('\n');
  const cleaned = stripAnsi(joined);
  
  return {
    raw: joined,
    clean: cleaned,
    lines,
    
    contains(text: string): boolean {
      return cleaned.includes(text);
    },
    
    hasLineCount(count: number): boolean {
      return lines.length === count;
    },
    
    allLinesWithinWidth(maxWidth: number): boolean {
      return lines.every(line => visibleWidth(line) <= maxWidth);
    },
    
    getVisibleWidth(): number {
      return Math.max(...lines.map(line => visibleWidth(line)));
    },
  };
}
```

### 3. Width Testing Helper

```typescript
// tests/helpers/width-tester.ts
import type { Component } from '@mariozechner/pi-tui';

export function testAtWidths(
  component: Component,
  widths: number[],
  assertions: (output: string[], width: number) => void
): void {
  for (const width of widths) {
    const output = component.render(width);
    assertions(output, width);
  }
}

// Usage:
testAtWidths(alert, [40, 80, 120], (output, width) => {
  expect(output.every(line => visibleWidth(line) <= width)).toBe(true);
});
```

### 4. Snapshot Normalizer

```typescript
// tests/helpers/snapshot-normalizer.ts
export function normalizeSnapshot(lines: string[]): string[] {
  // Normalize ANSI codes to readable format for snapshots
  return lines.map(line => 
    line
      .replace(/\u001b\[(\d+)m/g, '<color:$1>')
      .replace(/\u001b\[0m/g, '<reset>')
  );
}
```

## Anti-Patterns to Avoid

### ❌ Don't: Test Implementation Details

```typescript
// BAD: Testing internal structure
it('has a container Box', () => {
  expect(alert.container).toBeDefined();
});
```

```typescript
// GOOD: Test observable behavior
it('renders message with padding', () => {
  const output = alert.render(80);
  expect(output.join('\n')).toContain('Message');
});
```

### ❌ Don't: Hardcode ANSI Codes

```typescript
// BAD: Brittle test with hardcoded ANSI
expect(output).toBe('\u001b[32mSuccess\u001b[0m');
```

```typescript
// GOOD: Test logical content or use helpers
expect(stripAnsi(output)).toContain('Success');
// OR test that *some* color is applied
expect(output).toMatch(/\u001b\[\d+m.*Success/);
```

### ❌ Don't: Test Every Pixel

```typescript
// BAD: Overly specific layout test
expect(output[0]).toBe('  ✓     Success message      ');
//                       ^^     ^^^^^^                  exact spaces
```

```typescript
// GOOD: Test layout properties
const matcher = createOutputMatcher(output);
expect(matcher.contains('✓')).toBe(true);
expect(matcher.contains('Success message')).toBe(true);
expect(matcher.allLinesWithinWidth(80)).toBe(true);
```

### ❌ Don't: Ignore Edge Cases

```typescript
// BAD: Only testing happy path
it('renders alert', () => {
  const alert = new Alert(theme, 'success', 'OK');
  expect(alert.render(80)).toBeDefined();
});
```

```typescript
// GOOD: Test boundaries and edge cases
describe('Alert edge cases', () => {
  it('handles empty message', () => { /* ... */ });
  it('handles very long message', () => { /* ... */ });
  it('handles minimum width', () => { /* ... */ });
  it('handles special characters', () => { /* ... */ });
});
```

## Testing Workflow

### 1. TDD Approach (Recommended)

```typescript
// Step 1: Write failing test
it('renders success alert with icon', () => {
  const alert = new Alert(theme, 'success', 'Done');
  const output = stripAnsi(alert.render(80).join('\n'));
  expect(output).toContain('✓');
  expect(output).toContain('Done');
}); // FAILS: Component not implemented

// Step 2: Implement minimal code to pass
// Step 3: Refactor while keeping tests green
```

### 2. Snapshot Workflow

```bash
# Initial development - create snapshots
bun test --update

# Regular development - verify snapshots
bun test

# After intentional changes - update snapshots
bun test --update

# Review snapshot changes in git diff before committing
git diff tests/**/__snapshots__
```

### 3. Watch Mode Development

```bash
# Run tests in watch mode during development
bun test --watch

# Run specific test file in watch mode
bun test Alert.test.ts --watch
```

## Performance Considerations

### 1. Mock Heavy Dependencies

```typescript
// Mock theme to avoid complex theme initialization
vi.mock('@mariozechner/pi-coding-agent', () => ({
  Theme: vi.fn(() => ({
    fg: (color: string, text: string) => text,
    bg: (color: string, text: string) => text,
  })),
}));
```

### 2. Shared Test Setup

```typescript
// Use describe-level setup for shared state
describe('Alert', () => {
  let theme: Theme;
  
  beforeEach(() => {
    theme = createTestTheme();
  });
  
  it('test 1', () => { /* use theme */ });
  it('test 2', () => { /* use theme */ });
});
```

### 3. Parallel Test Execution

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    // Run tests in parallel (default)
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
  },
});
```

## Example Test Files

### Complete Alert Test Example

```typescript
// tests/unit/Alert.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import stripAnsi from 'strip-ansi';
import { Alert, createAlert } from '../src/Alert';
import { createTestTheme } from './helpers/test-theme';
import { createOutputMatcher } from './helpers/output-matchers';

describe('Alert', () => {
  let theme: ReturnType<typeof createTestTheme>;
  
  beforeEach(() => {
    theme = createTestTheme();
  });
  
  describe('constructor', () => {
    it('creates alert with default options', () => {
      const alert = new Alert(theme, 'info', 'Test message');
      expect(alert).toBeDefined();
      expect(alert.getType()).toBe('info');
      expect(alert.getMessage()).toBe('Test message');
    });
    
    it('uses default icon for alert type', () => {
      const success = new Alert(theme, 'success', 'OK');
      expect(success.getIcon()).toBe('✓');
      
      const error = new Alert(theme, 'error', 'Failed');
      expect(error.getIcon()).toBe('✗');
    });
  });
  
  describe('render', () => {
    it('renders alert at specified width', () => {
      const alert = new Alert(theme, 'success', 'Operation completed');
      const output = alert.render(80);
      
      expect(output).toBeDefined();
      expect(output.length).toBeGreaterThan(0);
    });
    
    it('includes icon and message in output', () => {
      const alert = new Alert(theme, 'warning', 'Be careful');
      const output = stripAnsi(alert.render(80).join('\n'));
      
      expect(output).toContain('⚠');
      expect(output).toContain('Be careful');
    });
    
    it('respects width constraints', () => {
      const alert = new Alert(theme, 'info', 'Test');
      const matcher = createOutputMatcher(alert.render(40));
      
      expect(matcher.allLinesWithinWidth(40)).toBe(true);
    });
  });
  
  describe('update', () => {
    it('updates icon and message', () => {
      const alert = new Alert(theme, 'info', 'Initial');
      alert.update('★', 'Updated');
      
      expect(alert.getIcon()).toBe('★');
      expect(alert.getMessage()).toBe('Updated');
      
      const output = stripAnsi(alert.render(80).join('\n'));
      expect(output).toContain('★');
      expect(output).toContain('Updated');
      expect(output).not.toContain('Initial');
    });
  });
  
  describe('setType', () => {
    it('changes alert type', () => {
      const alert = new Alert(theme, 'info', 'Message');
      alert.setType('error');
      
      expect(alert.getType()).toBe('error');
      expect(alert.getIcon()).toBe('✗');
    });
  });
  
  describe('createAlert helper', () => {
    it('creates alert with convenient syntax', () => {
      const alert = createAlert(theme, 'Success!', 'success');
      
      expect(alert.getMessage()).toBe('Success!');
      expect(alert.getType()).toBe('success');
    });
  });
  
  describe('edge cases', () => {
    it('handles empty message', () => {
      const alert = new Alert(theme, 'info', '');
      expect(() => alert.render(80)).not.toThrow();
    });
    
    it('handles very long message', () => {
      const longMessage = 'Long '.repeat(100);
      const alert = new Alert(theme, 'info', longMessage);
      const output = alert.render(80);
      
      expect(output.length).toBeGreaterThan(1); // Should wrap
    });
    
    it('handles minimum width', () => {
      const alert = new Alert(theme, 'info', 'X');
      expect(() => alert.render(10)).not.toThrow();
    });
  });
});
```

### Complete Flex Test Example

```typescript
// tests/unit/Flex.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { Flex } from '../src/Flex';
import { Text } from '@mariozechner/pi-tui';
import { sized, fixed } from '../src/Sized';
import { createTestTheme } from './helpers/test-theme';
import { createOutputMatcher } from './helpers/output-matchers';

describe('Flex', () => {
  let theme: ReturnType<typeof createTestTheme>;
  
  beforeEach(() => {
    theme = createTestTheme();
  });
  
  describe('constructor', () => {
    it('creates flex with default options', () => {
      const flex = new Flex();
      expect(flex.getMode()).toBe('fill');
      expect(flex.getAlign()).toBe('left');
    });
    
    it('accepts custom mode', () => {
      const flex = new Flex({ mode: 'wrap' });
      expect(flex.getMode()).toBe('wrap');
    });
  });
  
  describe('fill mode', () => {
    it('distributes width evenly among children', () => {
      const flex = new Flex({ mode: 'fill', spacing: 0 });
      flex.addChild(new Text('A', 0, 0));
      flex.addChild(new Text('B', 0, 0));
      flex.addChild(new Text('C', 0, 0));
      
      const output = flex.render(60);
      // Each child should get approximately 20 chars
      expect(output.length).toBeGreaterThan(0);
    });
    
    it('respects fixed width children', () => {
      const flex = new Flex({ mode: 'fill', spacing: 2 });
      flex.addChild(fixed(new Text('Icon', 0, 0), 10));
      flex.addChild(new Text('Message', 0, 0));
      
      const output = flex.render(80);
      expect(output.length).toBeGreaterThan(0);
      // Icon should stay at 10 chars, message gets remaining space
    });
  });
  
  describe('wrap mode', () => {
    it('wraps children to next line when needed', () => {
      const flex = new Flex({ mode: 'wrap', spacing: 2 });
      flex.addChild(sized(new Text('First item'), 30));
      flex.addChild(sized(new Text('Second item'), 30));
      
      const output = flex.render(40); // Not enough for both
      expect(output.length).toBeGreaterThan(1); // Wrapped to multiple lines
    });
    
    it('fits multiple children on same line when possible', () => {
      const flex = new Flex({ mode: 'wrap', spacing: 2 });
      flex.addChild(sized(new Text('A'), 10));
      flex.addChild(sized(new Text('B'), 10));
      flex.addChild(sized(new Text('C'), 10));
      
      const output = flex.render(80); // Plenty of space
      expect(output.length).toBe(1); // All on one line
    });
  });
  
  describe('alignment', () => {
    it('left aligns content by default', () => {
      const flex = new Flex({ align: 'left' });
      flex.addChild(new Text('Left', 0, 0));
      
      const output = flex.render(40);
      const line = output[0];
      expect(line.trimStart()).toBe(line); // No leading spaces
    });
    
    it('center aligns content when specified', () => {
      const flex = new Flex({ align: 'center' });
      flex.addChild(new Text('Center', 0, 0));
      
      const output = flex.render(40);
      const line = output[0];
      const trimmed = line.trim();
      const leadingSpaces = line.indexOf(trimmed);
      const trailingSpaces = line.length - trimmed.length - leadingSpaces;
      
      expect(Math.abs(leadingSpaces - trailingSpaces)).toBeLessThanOrEqual(1);
    });
    
    it('right aligns content when specified', () => {
      const flex = new Flex({ align: 'right' });
      flex.addChild(new Text('Right', 0, 0));
      
      const output = flex.render(40);
      const line = output[0];
      expect(line.trimEnd()).toBe(line); // No trailing spaces
      expect(line.trim().length).toBeLessThan(line.length); // Has leading spaces
    });
  });
  
  describe('child management', () => {
    it('adds children', () => {
      const flex = new Flex();
      flex.addChild(new Text('Child', 0, 0));
      expect(flex.getChildCount()).toBe(1);
    });
    
    it('removes children', () => {
      const flex = new Flex();
      const child = new Text('Child', 0, 0);
      flex.addChild(child);
      flex.removeChild(child);
      expect(flex.getChildCount()).toBe(0);
    });
    
    it('clears all children', () => {
      const flex = new Flex();
      flex.addChild(new Text('A', 0, 0));
      flex.addChild(new Text('B', 0, 0));
      flex.clear();
      expect(flex.getChildCount()).toBe(0);
    });
  });
  
  describe('edge cases', () => {
    it('handles no children', () => {
      const flex = new Flex();
      const output = flex.render(80);
      expect(output).toEqual([]);
    });
    
    it('handles single child', () => {
      const flex = new Flex();
      flex.addChild(new Text('Alone', 0, 0));
      expect(() => flex.render(80)).not.toThrow();
    });
    
    it('handles zero width', () => {
      const flex = new Flex();
      flex.addChild(new Text('Test', 0, 0));
      expect(() => flex.render(0)).not.toThrow();
    });
  });
});
```

## Sources & References

1. **Vitest Documentation**
   - Snapshot Testing: https://vitest.dev/guide/snapshot
   - expect API: https://vitest.dev/api/expect.html
   - Score: 10/10 - Official documentation, comprehensive

2. **Testing CLI Output Guide**
   - URL: https://www.lekoarts.de/how-to-test-cli-output-in-jest-vitest/
   - Score: 9/10 - Practical patterns, directly applicable
   - Reason: Real-world testing patterns for terminal output

3. **strip-ansi Package**
   - URL: https://www.npmjs.com/package/strip-ansi
   - Score: 10/10 - Standard solution for ANSI code handling
   - Reason: Widely used, well-maintained, simple API

4. **ANSI Escape Codes Reference**
   - URL: https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797
   - Score: 8/10 - Comprehensive reference
   - Reason: Good background knowledge for understanding color codes

## Conclusion

Testing TUI components requires a combination of:

1. **Snapshot testing** for catching visual regressions
2. **Logical assertions** for specific behavior verification
3. **ANSI code handling** for clean or complete output testing
4. **Layout testing** for width, spacing, and alignment
5. **Edge case coverage** for robustness

The recommended approach is to:
- Use vitest's built-in snapshot testing for full render output
- Create helper utilities for common assertions
- Test at multiple widths to ensure responsive behavior
- Focus on observable behavior, not implementation details
- Maintain both unit tests (fast, focused) and integration tests (comprehensive)

**Next Steps:**
1. Install `strip-ansi` package: `bun add -d strip-ansi @types/strip-ansi`
2. Create `tests/helpers/` directory with utility functions
3. Write first test file following the patterns above
4. Set up vitest configuration if not already done
5. Establish snapshot review workflow in development process
