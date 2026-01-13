# Project Summary: pi-ds

**Last Updated:** 2026-01-13

## Project Overview
A TUI design system for pi-mono. Built as a Bun module targeting ES2021+.

## Current Status
**Status:** Research Phase - Unit Testing
**Active Epic:** None (pre-epic research phase)
**Active Phases:** None

## Recent Accomplishments

### Research Completed: Unit Testing TUI Components (2026-01-13)
- ✅ Comprehensive research on testing TUI component output
- ✅ Identified vitest snapshot testing as primary strategy
- ✅ Documented patterns for testing layout components (Flex, Grid)
- ✅ Established ANSI code handling approaches (strip-ansi)
- ✅ Created example test patterns for Alert and Flex components
- ✅ Defined testing utilities and helper functions to implement
- ✅ Documented anti-patterns to avoid and best practices

**Key Findings:**
- Vitest snapshot testing ideal for TUI rendering verification
- Use `toMatchSnapshot()` for full output, `toMatchInlineSnapshot()` for embedded tests
- Handle ANSI codes with `strip-ansi` for logic tests or test with codes for integration
- Test at multiple widths (40, 80, 120, 160) for responsive behavior
- Focus on edge cases: empty, single child, overflow, minimum width, zero width
- Create helper utilities: test theme, output matchers, width testers

**Research Document:** `.memory/research-5d437659-unit-testing-tui-components.md`

## Key Information
- **Type:** TUI design system for pi-mono
- **Runtime:** Bun
- **Target:** ES2021+
- **Purpose:** Provide reusable TUI components and patterns
- **Test Framework:** vitest (already configured)
- **Components:** Alert, Flex, Grid, Modal, Sized

## Build & Test Commands
- Build: `mise run build` or `bun build ./src/index.ts --outdir dist --target bun`
- Test: `mise run test` or `bun test`
- Test Watch: `bun test --watch`
- Test Update Snapshots: `bun test -u`
- Single Test: `bun test <filename>`
- Lint: `mise run lint`
- Fix Lint: `mise run lint:fix`
- Format: `mise run format`

## Next Steps
1. Review research findings with human
2. Implement test helper utilities
3. Create first test files for Alert and Flex components
4. Install `strip-ansi` package
5. Set up test directory structure
6. Define project epic to establish vision and goals

## Active Epics
_None yet - awaiting epic definition_

## Active Phases
_None yet - awaiting phase planning_

## Completed Research
- [Research: Unit Testing TUI Components](research-5d437659-unit-testing-tui-components.md) ✅

## Notes
- Project uses NeverNesters principle: avoid deeply nested structures, exit early
- Strict TypeScript mode enforced
- Single quotes, 100 char line width, 2 space tabs
- Error handling: check error type before accessing properties
- Components follow pi-tui Component interface: `render(width: number): string[]`
