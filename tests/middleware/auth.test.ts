import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// Mock the middleware function
const mockNavigateTo = vi.fn()
global.navigateTo = mockNavigateTo
global.defineNuxtRouteMiddleware = vi.fn((fn) => fn)

// Mock the user store
const mockUserStore = {
  fetchUser: vi.fn()
}

global.useUserStore = vi.fn(() => mockUserStore)

// Import the middleware after setting up mocks
const authMiddleware = await import('../../middleware/auth')

describe('Auth Middleware', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should allow access to non-admin routes for regular users', async () => {
    const mockUser = {
      data: {
        id: 1,
        role: 'user',
        first_name: 'John',
        last_name: 'Doe'
      }
    }

    mockUserStore.fetchUser.mockResolvedValue(mockUser)

    const to = { path: '/profile' }
    const from = { path: '/' }

    const result = await authMiddleware.default(to, from)

    expect(mockUserStore.fetchUser).toHaveBeenCalled()
    expect(mockNavigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('should allow access to admin routes for admin users', async () => {
    const mockAdminUser = {
      data: {
        id: 1,
        role: 'admin',
        first_name: 'Admin',
        last_name: 'User'
      }
    }

    mockUserStore.fetchUser.mockResolvedValue(mockAdminUser)

    const to = { path: '/admin/dashboard' }
    const from = { path: '/' }

    const result = await authMiddleware.default(to, from)

    expect(mockUserStore.fetchUser).toHaveBeenCalled()
    expect(mockNavigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('should redirect non-admin users from admin routes to login', async () => {
    const mockUser = {
      data: {
        id: 1,
        role: 'user',
        first_name: 'John',
        last_name: 'Doe'
      }
    }

    mockUserStore.fetchUser.mockResolvedValue(mockUser)

    const to = { path: '/admin/products' }
    const from = { path: '/' }

    const result = await authMiddleware.default(to, from)

    expect(mockUserStore.fetchUser).toHaveBeenCalled()
    expect(mockNavigateTo).toHaveBeenCalledWith('/auth/login')
  })

  it('should redirect unauthenticated users from admin routes to login', async () => {
    mockUserStore.fetchUser.mockResolvedValue(null)

    const to = { path: '/admin/dashboard' }
    const from = { path: '/' }

    const result = await authMiddleware.default(to, from)

    expect(mockUserStore.fetchUser).toHaveBeenCalled()
    expect(mockNavigateTo).toHaveBeenCalledWith('/auth/login')
  })

  it('should allow access when user data is null but not accessing admin routes', async () => {
    mockUserStore.fetchUser.mockResolvedValue(null)

    const to = { path: '/home' }
    const from = { path: '/' }

    const result = await authMiddleware.default(to, from)

    expect(mockUserStore.fetchUser).toHaveBeenCalled()
    expect(mockNavigateTo).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('should handle user object without data property', async () => {
    const mockIncompleteUser = {
      // Missing data property
      status: 'success'
    }

    mockUserStore.fetchUser.mockResolvedValue(mockIncompleteUser)

    const to = { path: '/admin/settings' }
    const from = { path: '/' }

    const result = await authMiddleware.default(to, from)

    expect(mockUserStore.fetchUser).toHaveBeenCalled()
    expect(mockNavigateTo).toHaveBeenCalledWith('/auth/login')
  })

  it('should handle deeply nested admin routes', async () => {
    const mockUser = {
      data: {
        id: 1,
        role: 'user',
        first_name: 'John',
        last_name: 'Doe'
      }
    }

    mockUserStore.fetchUser.mockResolvedValue(mockUser)

    const to = { path: '/admin/products/edit/123' }
    const from = { path: '/admin' }

    const result = await authMiddleware.default(to, from)

    expect(mockUserStore.fetchUser).toHaveBeenCalled()
    expect(mockNavigateTo).toHaveBeenCalledWith('/auth/login')
  })
})