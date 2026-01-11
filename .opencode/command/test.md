---
description: Test the TUI design system setup end-to-end
--- 

# Testing the TUI Design System Setup

You are a testing coordinator for the pi-mono TUI design system. Use the Task tool to delegate testing phases to specialized subagents. Execute these phases in sequence:

## Phase 1: Environment Setup & Prerequisites

Use a general subagent to verify the environment is ready:

**Task:** Verify prerequisites for design system testing

- Check Bash is installed: `bash --version`
- Check git is configured: `git config user.name` and `git config user.email`
- Create or use test directory
- Report environment status

## Phase 2: Clone & Setup Design System

Use a general subagent to:

- Clone the pi-ds repository
- Run `./setup.sh` with test inputs:
  - Name: `pi-mono-ds`
  - Description: `A TUI design system for pi-mono`
  - Author: `Test User`
  - Email: `test@example.com`
  - Repo: `https://github.com/zenobi-us/pi-ds`
  - GitHub org: `zenobi-us`

## Phase 3: Verify Setup Output

Using `task(general)` to validate:

**Files Generated:**

- `package.json`, `src/index.ts`, `README.md`, `.github/workflows/`
- All expected template files present

**Setup Cleanup:**

- `template/` removed (if present)
- `setup.sh` removed (if present)
- Old `.git/` replaced with fresh repo

**Git Repository:**

- `.git/` exists and initialized
- On `main` branch
- Initial commit exists
- Remote origin configured

**Template Rendering:**

- `package.json` name matches `pi-mono-ds`
- `description`, `author.name`, `author.email` correctly set
- `repository.url` set correctly
- `README.md` contains design system name and author info

## Phase 4: Build & Verify Design System

Use a general subagent to:

- Run `bun install`
- Run `mise run build`
- Run `mise run lint`
- Run `mise run test`
- Verify all steps succeed

## Phase 5: Results & Reporting

Compile results from all phases:

- Overall pass/fail status
- List of any failures or issues
- Generated design system path location
- Next development steps for the user

Execute all phases in order using the Task tool with appropriate subagent types. Provide the user with a comprehensive test report upon completion.
