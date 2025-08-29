import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock Nuxt composables
const mockNuxtApp = {
  ssrContext: undefined,
  $toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }
}

// Global mocks for Nuxt composables
global.useNuxtApp = vi.fn(() => mockNuxtApp)
global.useRuntimeConfig = vi.fn(() => ({
  public: {
    apiUrl: 'http://localhost:3001/api'
  }
}))
global.useFetch = vi.fn()
global.navigateTo = vi.fn()
global.defineNuxtRouteMiddleware = vi.fn((fn) => fn)
global.defineNuxtPlugin = vi.fn((fn) => fn)

// Mock toast functionality
global.$toast = mockNuxtApp.$toast

// Configure Vue Test Utils
config.global.mocks = {
  $toast: mockNuxtApp.$toast,
  useNuxtApp: () => mockNuxtApp,
  useRuntimeConfig: () => ({
    public: {
      apiUrl: 'http://localhost:3001/api'
    }
  })
}

// Setup DOM globals
Object.defineProperty(window, 'location', {
  value: {
    hostname: 'localhost',
    pathname: '/',
    href: 'http://localhost:3000'
  },
  writable: true
})