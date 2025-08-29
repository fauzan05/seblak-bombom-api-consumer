import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../stores/user'

// Mock the useFetch composable
const mockUseFetch = vi.fn()
global.useFetch = mockUseFetch

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    
    // Reset global mocks
    global.useNuxtApp = vi.fn(() => ({
      ssrContext: undefined
    }))
    global.useRuntimeConfig = vi.fn(() => ({
      public: {
        apiUrl: 'http://localhost:3001/api'
      }
    }))
  })

  it('should initialize with null user', () => {
    const store = useUserStore()
    expect(store.user).toBeNull()
  })

  it('should fetch user successfully and update state', async () => {
    const mockUserData = {
      code: 200,
      status: 'success',
      data: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
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
        updated_at: '2023-01-01'
      }
    }

    mockUseFetch.mockResolvedValue({
      data: { value: mockUserData },
      error: { value: null },
      status: { value: 200 }
    })

    const store = useUserStore()
    const result = await store.fetchUser()

    expect(mockUseFetch).toHaveBeenCalledWith('/users/current', {
      baseURL: 'http://localhost:3001/api',
      credentials: 'include',
      headers: {}
    })
    expect(store.user).toEqual(mockUserData.data)
    expect(result).toEqual(mockUserData)
  })

  it('should handle user fetch error and set user to null', async () => {
    mockUseFetch.mockResolvedValue({
      data: { value: null },
      error: { value: { message: 'Unauthorized' } },
      status: { value: 401 }
    })

    const store = useUserStore()
    const result = await store.fetchUser()

    expect(store.user).toBeNull()
    expect(result).toBeNull()
  })

  it('should handle 401 status and set user to null', async () => {
    mockUseFetch.mockResolvedValue({
      data: { value: null },
      error: { value: null },
      status: { value: 401 }
    })

    const store = useUserStore()
    const result = await store.fetchUser()

    expect(store.user).toBeNull()
    expect(result).toBeNull()
  })

  it('should handle server-side rendering with cookie headers', async () => {
    const mockUserData = {
      code: 200,
      status: 'success',
      data: {
        id: 1,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@example.com',
        phone: '0987654321',
        role: 'admin',
        wallet: {
          id: 2,
          balance: 200000,
          status: 'active',
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        cart: {
          cart_items: null,
          created_at: '2023-01-01',
          updated_at: '2023-01-01'
        },
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
      }
    }

    // Mock server-side context
    global.useNuxtApp = vi.fn(() => ({
      ssrContext: {
        event: {
          req: {
            headers: {
              cookie: 'session=abc123; auth=token456'
            }
          }
        }
      }
    }))

    mockUseFetch.mockResolvedValue({
      data: { value: mockUserData },
      error: { value: null },
      status: { value: 200 }
    })

    const store = useUserStore()
    const result = await store.fetchUser()

    expect(mockUseFetch).toHaveBeenCalledWith('/users/current', {
      baseURL: 'http://localhost:3001/api',
      credentials: 'include',
      headers: { cookie: 'session=abc123; auth=token456' }
    })
    expect(store.user).toEqual(mockUserData.data)
    expect(result).toEqual(mockUserData)
  })

  it('should handle exceptions and set user to null', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    mockUseFetch.mockRejectedValue(new Error('Network error'))

    const store = useUserStore()
    const result = await store.fetchUser()

    expect(store.user).toBeNull()
    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching current user:', expect.any(Error))
    
    consoleErrorSpy.mockRestore()
  })
})