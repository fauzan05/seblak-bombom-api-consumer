import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | Record<string, any>,
    }),

    actions: {
        async fetchUser() {
            try {
                const config = useRuntimeConfig()
                const apiUrl = config.public.apiUrl

                // Deteksi apakah sedang SSR
                const isServer = typeof window === 'undefined'
                const cookieHeader = isServer ? useRequestHeaders(['cookie']).cookie || '' : ''

                const { data, error, status } = await useFetch('/users/current', {
                    baseURL: apiUrl,
                    credentials: 'include',
                    headers: isServer ? { cookie: cookieHeader } : {}, // Kirim header hanya saat SSR
                })

                if (error.value || Number(status.value) === 401 || !data.value) {
                    this.user = null
                    return null
                }

                const userData = (data.value as any)?.data
                console.log("CURRENTNYA : ",userData)
                this.user = userData
                return data.value
            } catch (err) {
                console.error('Error when get current user:', err)
                this.user = null
                return null
            }
        }
    }
})
