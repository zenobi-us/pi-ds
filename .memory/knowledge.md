# Project Knowledge Base

**Last Updated:** 2026-01-11

## Technical Stack
- **Runtime:** Bun
- **Language:** TypeScript (ES2021+, ESNext modules)
- **Module System:** ES6 import/export
- **Testing:** vitest
- **Build Tools:** mise task runner

## Code Style Guidelines

### Import & Module System
- Use ES6 `import`/`export` syntax
- Group imports: external libraries first, then internal modules
- Use explicit file extensions (`.ts`) for internal imports

### Formatting (Prettier)
- Single quotes (`singleQuote: true`)
- Line width: 100 characters
- Tab width: 2 spaces
- Trailing commas: ES5 (no trailing commas in function parameters)
- Semicolons: enabled

### TypeScript & Naming
- **NeverNesters principle:** Avoid deeply nested structures, always exit early
- Strict mode enforced (`"strict": true`)
- Classes: PascalCase (e.g., `BackgroundTask`, `BackgroundTaskManager`)
- Methods/properties: camelCase
- Status strings: use union types (e.g., `'pending' | 'running' | 'completed' | 'failed' | 'cancelled'`)
- Explicit types: prefer explicit type annotations over inference
- Return types: optional but recommended for public methods

### Error Handling
- Check error type before accessing properties: `error instanceof Error ? error.toString() : String(error)`
- Log errors with `[ERROR]` prefix for consistency
- Always provide error context when recording output

### Linting Rules
- `@typescript-eslint/no-explicit-any`: warn (avoid `any` type)
- `no-console`: error (minimize console logs)
- `prettier/prettier`: error (formatting violations are errors)

## Testing Practices
- Framework: vitest with `describe` & `it` blocks
- Style: Descriptive nested test cases with clear expectations
- Assertion library: `expect()` (vitest)

## Project Structure
- Source: `./src/`
- Build output: `./dist/`
- Tests: Co-located with source files (`.test.ts` suffix)
- Memory/Artifacts: `.memory/` (gitignored)

## TUI Design System for pi-mono
_To be documented as components and patterns are developed_

## Background Task Management
_To be documented as features are developed_

## References
- Project documentation: AGENTS.md
- Build configuration: mise configuration files
- Package configuration: package.json
