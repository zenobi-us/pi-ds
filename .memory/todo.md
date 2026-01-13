# TODO List

**Last Updated:** 2026-01-13

## Completed Tasks

- [x] Research unit testing for TUI components
- [x] Document testing patterns and best practices
- [x] Identify vitest snapshot testing strategy
- [x] Create testing examples for Alert and Flex
- [x] Document helper utilities to implement

## Critical Tasks

### [NEEDS-HUMAN] Review Research Findings
**Priority:** High
**Blocking:** Test implementation

The research on unit testing TUI components is complete. Please review:
- Testing strategy (snapshot vs assertions)
- Helper utilities to implement
- Example test patterns
- Directory structure recommendations

**Research Document:** `.memory/research-5d437659-unit-testing-tui-components.md`

**Action Required:** Human approval before implementing tests

### [NEEDS-HUMAN] Define Project Epic
Before any major development work can proceed, we need to define the project epic that establishes:
- Vision and overall goal for pi-ds
- Success criteria
- Planned phases
- Overall timeline
- Key dependencies

**Action Required:** Human input needed to define project vision and scope

## Recommended Next Tasks

Once research is approved:

1. **Install Dependencies**
   - `bun add -d strip-ansi @types/strip-ansi`

2. **Create Test Directory Structure**
   ```
   tests/
   ├── unit/
   ├── integration/
   ├── helpers/
   │   ├── test-theme.ts
   │   ├── output-matchers.ts
   │   └── width-tester.ts
   └── snapshots/
   ```

3. **Implement Test Helpers**
   - Test theme factory
   - Output matcher helpers
   - Width testing utilities
   - Snapshot normalizer

4. **Write First Tests**
   - Alert.test.ts (unit tests)
   - Flex.test.ts (unit tests)
   - Alert.integration.test.ts (snapshot tests)

5. **Configure Vitest** (if needed)
   - Snapshot serializers
   - Test coverage thresholds
   - Parallel execution settings

## In Progress
- Research phase for unit testing (completed, awaiting review)

## Blocked
- Test implementation (blocked by: [NEEDS-HUMAN] Review Research Findings)
- Phase planning (blocked by: [NEEDS-HUMAN] Define Project Epic)

## Deferred Tasks
_None_
