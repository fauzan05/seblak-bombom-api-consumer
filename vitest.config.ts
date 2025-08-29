import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '.nuxt/',
        '.output/',
        'coverage/',
        '**/*.d.ts',
        'vitest.config.ts',
      ]
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '~': resolve(__dirname, '.'),
      '#app': resolve(__dirname, '.nuxt/types/app.config.d.ts'),
      '#imports': resolve(__dirname, '.nuxt/imports.d.ts'),
    },
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false,
  },
})