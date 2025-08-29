import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock vue-toastification
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn()
}

const mockUseToast = vi.fn(() => mockToast)
const mockToastPlugin = {
  install: vi.fn()
}

vi.mock('vue-toastification', () => ({
  default: mockToastPlugin,
  useToast: mockUseToast,
  POSITION: {
    TOP_RIGHT: 'top-right'
  }
}))

// Mock Nuxt plugin
global.defineNuxtPlugin = vi.fn((fn) => fn)

describe('Toast Plugin', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should configure toast plugin with correct options', async () => {
    const mockNuxtApp = {
      vueApp: {
        use: vi.fn()
      }
    }

    const { default: toastPlugin } = await import('../../plugins/toast.client')
    const result = toastPlugin(mockNuxtApp)

    expect(mockNuxtApp.vueApp.use).toHaveBeenCalledWith(mockToastPlugin, {
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })

    expect(mockUseToast).toHaveBeenCalled()
    expect(result.provide).toBeDefined()
    expect(result.provide.toast).toBeDefined()
  })

  it('should provide toast methods that call underlying toast functions', async () => {
    const mockNuxtApp = {
      vueApp: {
        use: vi.fn()
      }
    }

    const { default: toastPlugin } = await import('../../plugins/toast.client')
    const result = toastPlugin(mockNuxtApp)

    const providedToast = result.provide.toast

    // Test success method
    providedToast.success('Success message')
    expect(mockToast.success).toHaveBeenCalledWith('Success message')

    // Test error method
    providedToast.error('Error message')
    expect(mockToast.error).toHaveBeenCalledWith('Error message')

    // Test warning method
    providedToast.warning('Warning message')
    expect(mockToast.warning).toHaveBeenCalledWith('Warning message')

    // Test info method
    providedToast.info('Info message')
    expect(mockToast.info).toHaveBeenCalledWith('Info message')
  })

  it('should handle multiple toast calls', async () => {
    const mockNuxtApp = {
      vueApp: {
        use: vi.fn()
      }
    }

    const { default: toastPlugin } = await import('../../plugins/toast.client')
    const result = toastPlugin(mockNuxtApp)

    const providedToast = result.provide.toast

    // Call multiple toast methods
    providedToast.success('First success')
    providedToast.success('Second success')
    providedToast.error('First error')
    providedToast.warning('First warning')

    expect(mockToast.success).toHaveBeenCalledTimes(2)
    expect(mockToast.success).toHaveBeenNthCalledWith(1, 'First success')
    expect(mockToast.success).toHaveBeenNthCalledWith(2, 'Second success')
    expect(mockToast.error).toHaveBeenCalledTimes(1)
    expect(mockToast.error).toHaveBeenCalledWith('First error')
    expect(mockToast.warning).toHaveBeenCalledTimes(1)
    expect(mockToast.warning).toHaveBeenCalledWith('First warning')
  })

  it('should use correct plugin configuration', async () => {
    const mockNuxtApp = {
      vueApp: {
        use: vi.fn()
      }
    }

    const { default: toastPlugin } = await import('../../plugins/toast.client')
    toastPlugin(mockNuxtApp)

    const [plugin, options] = mockNuxtApp.vueApp.use.mock.calls[0]
    
    expect(plugin).toBe(mockToastPlugin)
    expect(options).toEqual({
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  })
})