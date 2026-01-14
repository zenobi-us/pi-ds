# Task: Setup & Structure

**Phase:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
**Epic:** [pi-ds TUI Design System](epic-62d4d25c-pi-ds-tui-design-system.md)
**Status:** completed
**Priority:** high
**Estimated Time:** 30 minutes
**Dependencies:** None

## Objective

Create the directory structure and base files for the Tabs component system, including TabController, Tab, Pane components and type definitions.

## Steps to Take

1. Create `src/tabs/` directory
2. Create `src/tabs/index.ts` (barrel exports)
3. Create `src/tabs/TabController.ts` (state management)
4. Create `src/tabs/Tab.ts` (tab component)
5. Create `src/tabs/Pane.ts` (pane component)
6. Create `src/tabs/types.ts` (TypeScript interfaces)
7. Update main `src/index.ts` to export tabs

## Files to Create

```
src/tabs/
├── index.ts
├── TabController.ts
├── Tab.ts
├── Pane.ts
└── types.ts
```

## Expected Outcome

- All files created with proper TypeScript structure
- Barrel exports configured correctly in `src/tabs/index.ts`
- Main index updated to export tabs module
- No lint errors when running `mise run lint`
- Project builds successfully with `mise run build`

## Acceptance Criteria

- [x] Directory `src/tabs/` created
- [x] File `src/tabs/index.ts` created with barrel exports
- [x] File `src/tabs/TabController.ts` created with class skeleton
- [x] File `src/tabs/Tab.ts` created with class skeleton
- [x] File `src/tabs/Pane.ts` created with class skeleton
- [x] File `src/tabs/types.ts` created with interface definitions
- [x] Main `src/index.ts` updated to export tabs
- [x] `mise run lint` passes with no errors (5 warnings about unused directives only)
- [x] `mise run build` succeeds (32 modules bundled)

## Related Documents

- **Specification:** [Tabs Component Specification](research-e193044a-tabs-component-specification.md)
- **Phase Plan:** [Tabs Component Implementation](phase-f89b39da-tabs-component-implementation.md)
- **GitHub Issue:** [#4 - Tabs](https://github.com/zenobi-us/pi-ds/issues/4)

## Notes

- Follow TypeScript strict mode conventions
- Use ES6 import/export syntax
- Follow NeverNesters principle (exit early, avoid deep nesting)
- Use single quotes, 100 char line width, 2 space tabs
