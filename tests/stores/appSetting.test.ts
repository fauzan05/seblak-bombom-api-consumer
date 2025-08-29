import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppSettingStore } from '../../stores/appSetting'

// Mock the useFetch composable
const mockUseFetch = vi.fn()
global.useFetch = mockUseFetch

describe('App Setting Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    
    global.useRuntimeConfig = vi.fn(() => ({
      public: {
        apiUrl: 'http://localhost:3001/api'
      }
    }))
  })

  it('should initialize with null settings and loaded false', () => {
    const store = useAppSettingStore()
    expect(store.settings).toBeNull()
    expect(store.loaded).toBe(false)
  })

  it('should fetch settings successfully and update state', async () => {
    const mockSettingsData = {
      app_name: 'Seblak Bombom',
      app_description: 'Best seblak in town',
      contact_email: 'info@seblakbombom.com',
      contact_phone: '+62123456789',
      address: 'Jakarta, Indonesia'
    }

    mockUseFetch.mockResolvedValue({
      data: { value: mockSettingsData }
    })

    const store = useAppSettingStore()
    await store.fetchSettings()

    expect(mockUseFetch).toHaveBeenCalledWith('http://localhost:3001/api/applications')
    expect(store.settings).toEqual(mockSettingsData)
    expect(store.loaded).toBe(true)
  })

  it('should not fetch again if already loaded', async () => {
    const store = useAppSettingStore()
    
    // Manually set loaded to true
    store.loaded = true
    
    await store.fetchSettings()
    
    expect(mockUseFetch).not.toHaveBeenCalled()
  })

  it('should handle fetch error gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    mockUseFetch.mockRejectedValue(new Error('API Error'))

    const store = useAppSettingStore()
    await store.fetchSettings()

    expect(store.settings).toBeNull()
    expect(store.loaded).toBe(false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load app settings', expect.any(Error))
    
    consoleErrorSpy.mockRestore()
  })

  it('should handle null data response', async () => {
    mockUseFetch.mockResolvedValue({
      data: { value: null }
    })

    const store = useAppSettingStore()
    await store.fetchSettings()

    expect(store.settings).toBeNull()
    expect(store.loaded).toBe(false)
  })

  it('should set loaded to true even after multiple successful fetches', async () => {
    const mockSettingsData = {
      app_name: 'Updated App',
      version: '2.0.0'
    }

    mockUseFetch.mockResolvedValue({
      data: { value: mockSettingsData }
    })

    const store = useAppSettingStore()
    
    // First fetch
    await store.fetchSettings()
    expect(store.loaded).toBe(true)
    expect(mockUseFetch).toHaveBeenCalledTimes(1)
    
    // Second fetch should not happen
    await store.fetchSettings()
    expect(mockUseFetch).toHaveBeenCalledTimes(1) // Still 1, not 2
  })
})