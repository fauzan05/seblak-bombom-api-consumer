import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// Mock global functions
global.defineNuxtRouteMiddleware = vi.fn((fn) => fn)

// Mock the app setting store
const mockAppSettingStore = {
  fetchSettings: vi.fn()
}

global.useAppSettingStore = vi.fn(() => mockAppSettingStore)

// Mock window.location
const mockLocation = {
  hostname: 'localhost',
  pathname: '/test',
  href: 'http://localhost:3000/test'
}

Object.defineProperty(global, 'window', {
  value: {
    location: mockLocation
  },
  writable: true
})

describe('App Setting Global Middleware', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    
    // Reset window.location
    mockLocation.hostname = 'localhost'
    mockLocation.pathname = '/test'
    mockLocation.href = 'http://localhost:3000/test'
  })

  it('should fetch settings without redirect for normal hostname', async () => {
    // Import the middleware after setting up mocks
    const { default: appSettingMiddleware } = await import('../../middleware/app.setting.global')

    const to = { path: '/home' }
    const from = { path: '/' }

    await appSettingMiddleware(to, from)

    expect(mockAppSettingStore.fetchSettings).toHaveBeenCalled()
  })

  it('should redirect from production hostname to custom domain', async () => {
    mockLocation.hostname = 'seblak-bombom-api-consumer-production.up.railway.app'
    mockLocation.pathname = '/admin/products'
    
    // Mock window.location.href as a setter
    let redirectUrl = ''
    Object.defineProperty(window.location, 'href', {
      set: (url) => { redirectUrl = url },
      get: () => redirectUrl,
      configurable: true
    })

    const { default: appSettingMiddleware } = await import('../../middleware/app.setting.global')

    const to = { path: '/admin/products' }
    const from = { path: '/admin' }

    await appSettingMiddleware(to, from)

    expect(redirectUrl).toBe('https://seblak.fznh-dev.my.id/admin/products')
    expect(mockAppSettingStore.fetchSettings).not.toHaveBeenCalled()
  })

  it('should handle server-side execution without window object', async () => {
    // Temporarily remove window object to simulate server-side
    const originalWindow = global.window
    delete global.window

    const { default: appSettingMiddleware } = await import('../../middleware/app.setting.global')

    const to = { path: '/api/test' }
    const from = { path: '/' }

    await appSettingMiddleware(to, from)

    expect(mockAppSettingStore.fetchSettings).toHaveBeenCalled()

    // Restore window object
    global.window = originalWindow
  })

  it('should handle different pathnames correctly in redirect', async () => {
    mockLocation.hostname = 'seblak-bombom-api-consumer-production.up.railway.app'
    mockLocation.pathname = '/auth/login'
    
    let redirectUrl = ''
    Object.defineProperty(window.location, 'href', {
      set: (url) => { redirectUrl = url },
      get: () => redirectUrl,
      configurable: true
    })

    const { default: appSettingMiddleware } = await import('../../middleware/app.setting.global')

    const to = { path: '/auth/login' }
    const from = { path: '/' }

    await appSettingMiddleware(to, from)

    expect(redirectUrl).toBe('https://seblak.fznh-dev.my.id/auth/login')
    expect(mockAppSettingStore.fetchSettings).not.toHaveBeenCalled()
  })

  it('should handle root path correctly in redirect', async () => {
    mockLocation.hostname = 'seblak-bombom-api-consumer-production.up.railway.app'
    mockLocation.pathname = '/'
    
    let redirectUrl = ''
    Object.defineProperty(window.location, 'href', {
      set: (url) => { redirectUrl = url },
      get: () => redirectUrl,
      configurable: true
    })

    const { default: appSettingMiddleware } = await import('../../middleware/app.setting.global')

    const to = { path: '/' }
    const from = { path: '/home' }

    await appSettingMiddleware(to, from)

    expect(redirectUrl).toBe('https://seblak.fznh-dev.my.id/')
    expect(mockAppSettingStore.fetchSettings).not.toHaveBeenCalled()
  })

  it('should not redirect for other hostnames', async () => {
    mockLocation.hostname = 'other-domain.com'
    
    const { default: appSettingMiddleware } = await import('../../middleware/app.setting.global')

    const to = { path: '/test' }
    const from = { path: '/' }

    await appSettingMiddleware(to, from)

    expect(mockAppSettingStore.fetchSettings).toHaveBeenCalled()
  })
})