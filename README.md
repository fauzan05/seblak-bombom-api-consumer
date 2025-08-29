# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Testing

This project includes comprehensive unit tests using Vitest. The test suite covers:

- **Stores**: User store, counter store, and app settings store
- **Middleware**: Authentication middleware and app settings middleware  
- **Plugins**: Toast notification plugin

### Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Structure

```
tests/
├── setup.ts                    # Test setup and global mocks
├── utils.ts                    # Test utilities and helpers
├── stores/
│   ├── counter.test.ts         # Counter store tests
│   ├── user.test.ts            # User store tests
│   └── appSetting.test.ts      # App settings store tests
├── middleware/
│   ├── auth.test.ts            # Auth middleware tests
│   └── app.setting.global.test.ts  # App settings middleware tests
└── plugins/
    └── toast.client.test.ts    # Toast plugin tests
```

### Writing Tests

The project uses Vitest with Vue Test Utils and Pinia testing utilities. Example test:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should increment count', () => {
    const store = useCounterStore()
    store.increment()
    expect(store.count).toBe(1)
  })
})
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
