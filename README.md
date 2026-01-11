# pi-ds

A TUI design system for pi-mono

![](./assets/Kooha-2026-01-12-09-18-42.gif)

## Features

- 🏗️ TypeScript-based TUI component architecture
- 🔧 Mise task runner integration
- 📦 Bun/npm build tooling
- ✨ ESLint + Prettier formatting
- 🧪 Vitest testing setup
- 🚀 GitHub Actions CI/CD
- 📝 Release automation with release-please


## Usage

In your pi-mono extensions, ensure you have a `package.json` file set up. Then, install 
and import the design system:

```bash
bun add @zenobius/pi-ds
```

```typescript
import { Grid, Flex, Sized, sized } from '@zenobius/pi-ds';
```

## Development 

1. **Clone this repository:**

   ```bash
   git clone https://github.com/zenobi-us/pi-ds.git
   cd pi-ds
   ```

2. **Install dependencies:**

   ```bash
   mise setup
   ```

3. **Implement your TUI components in `src/{name}.ts`:**

4. **Test your components:**

   ```bash
   mise run test #runs pi with a kitchen sink extension that uses the ds
   ```

## Dev Commands

- `mise run build` - Build the design system
- `mise run test` - Run tests
- `mise run lint` - Lint code
- `mise run lint:fix` - Fix linting issues
- `mise run format` - Format code with Prettier

## Contributing

Contributions are welcome! Please file issues or submit pull requests on the GitHub repository.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
