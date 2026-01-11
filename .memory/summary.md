# Project Summary: pi-ds

**Last Updated:** 2026-01-11

## Project Overview
A TUI design system for pi-mono. Built as a Bun module targeting ES2021+.

## Current Status
**Status:** Initializing MDTM System
**Active Epic:** None (initialization phase)
**Active Phases:** None

## Key Information
- **Type:** TUI design system for pi-mono
- **Runtime:** Bun
- **Target:** ES2021+
- **Purpose:** Provide reusable TUI components and patterns for the pi-mono project

## Build & Test Commands
- Build: `mise run build` or `bun build ./src/index.ts --outdir dist --target bun`
- Test: `mise run test` or `bun test`
- Single Test: `bun test <filename>` (use file glob pattern)
- Watch Mode: `bun test --watch`
- Lint: `mise run lint`
- Fix Lint: `mise run lint:fix`
- Format: `mise run format`

## Next Steps
1. Define project epic to establish vision and goals
2. Review existing codebase structure
3. Plan development phases

## Active Epics
_None yet - awaiting epic definition_

## Active Phases
_None yet - awaiting phase planning_

## Completed Milestones
_None yet_

## Notes
- Project uses NeverNesters principle: avoid deeply nested structures, exit early
- Strict TypeScript mode enforced
- Single quotes, 100 char line width, 2 space tabs
- Error handling: check error type before accessing properties
