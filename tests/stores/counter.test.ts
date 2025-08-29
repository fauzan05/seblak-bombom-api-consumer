import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../../stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with count 0', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
  })

  it('should increment count by 1', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
    
    store.increment()
    expect(store.count).toBe(1)
    
    store.increment()
    expect(store.count).toBe(2)
  })

  it('should patch state correctly when incrementing', () => {
    const store = useCounterStore()
    const initialCount = store.count
    
    store.increment()
    
    expect(store.count).toBe(initialCount + 1)
  })
})