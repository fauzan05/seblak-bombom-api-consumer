import { vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

/**
 * Setup Pinia for testing
 */
export function setupPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

/**
 * Mock Nuxt composables for testing
 */
export function mockNuxtComposables() {
  const mockNuxtApp = {
    ssrContext: undefined,
    $toast: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
    }
  }

  const mockRuntimeConfig = {
    public: {
      apiUrl: 'http://localhost:3001/api'
    }
  }

  global.useNuxtApp = vi.fn(() => mockNuxtApp)
  global.useRuntimeConfig = vi.fn(() => mockRuntimeConfig)
  global.useFetch = vi.fn()
  global.navigateTo = vi.fn()

  return {
    mockNuxtApp,
    mockRuntimeConfig,
    useFetch: global.useFetch,
    navigateTo: global.navigateTo
  }
}

/**
 * Create a mock user data for testing
 */
export function createMockUser(overrides = {}) {
  return {
    code: 200,
    status: 'success',
    data: {
      id: 1,
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      role: 'user',
      wallet: {
        id: 1,
        balance: 100000,
        status: 'active',
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
      },
      cart: {
        cart_items: [],
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
      },
      created_at: '2023-01-01',
      updated_at: '2023-01-01',
      ...overrides
    }
  }
}

/**
 * Create a mock admin user for testing
 */
export function createMockAdminUser(overrides = {}) {
  return createMockUser({
    role: 'admin',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    ...overrides
  })
}

/**
 * Mock window location for testing
 */
export function mockWindowLocation(hostname = 'localhost', pathname = '/') {
  const mockLocation = {
    hostname,
    pathname,
    href: `http://${hostname}${pathname}`
  }

  Object.defineProperty(global, 'window', {
    value: { location: mockLocation },
    writable: true
  })

  return mockLocation
}