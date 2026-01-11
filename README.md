# pi-mono-ds

A TUI design system for pi-mono

> A TUI design system created from the [bun-module](https://github.com/zenobi-us/bun-module)

## Features

- 🏗️ TypeScript-based TUI component architecture
- 🔧 Mise task runner integration
- 📦 Bun/npm build tooling
- ✨ ESLint + Prettier formatting
- 🧪 Vitest testing setup
- 🚀 GitHub Actions CI/CD
- 📝 Release automation with release-please

## Getting Started

1. **Clone this repository:**

   ```bash
   git clone https://github.com/zenobi-us/pi-ds.git
   cd pi-ds
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Implement your TUI components in `src/index.ts`:**

   ```typescript
   // TUI design system components for pi-mono
   export * from './components';
   ```

4. **Test your components:**
   ```bash
   mise run test
   ```

## Development

- `mise run build` - Build the design system
- `mise run test` - Run tests
- `mise run lint` - Lint code
- `mise run lint:fix` - Fix linting issues
- `mise run format` - Format code with Prettier

## Usage in pi-mono

Install and import the design system:

```bash
bun add pi-mono-ds
```

```typescript
import { Component } from 'pi-mono-ds';
```

## Author

Your Name <you@example.com>

## Repository

https://github.com/zenobi-us/pi-ds.git

## Contributing

Contributions are welcome! Please file issues or submit pull requests on the GitHub repository.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
