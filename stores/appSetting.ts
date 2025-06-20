import { defineStore } from 'pinia'

export const useAppSettingStore = defineStore('appSetting', {
  state: () => ({
    settings: null as null | Record<string, any>,
    loaded: false
  }),

  actions: {
    async fetchSettings() {
      if (this.loaded) return // jika sudah pernah di-load, jangan fetch lagi
      const config = useRuntimeConfig()
      const apiUrl = config.public.apiUrl
      try {
        const { data } = await useFetch(apiUrl + '/applications')
        if (data.value) {
          this.settings = data.value
          this.loaded = true
        }
      } catch (err) {
        console.error('Failed to load app settings', err)
      }
    }
  },

  // persist: true // optional → biar tetap ada walau di-refresh
})
