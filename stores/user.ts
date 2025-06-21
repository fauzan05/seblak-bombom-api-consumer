import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | Record<string, any>,
    }),

    actions: {
        async fetchUser() {
            const cookie = useRequestHeaders(['cookie']) // Ambil cookie dari SSR context
            try {
                const config = useRuntimeConfig()
                const apiUrl = config.public.apiUrl

                const { data, error, status } = await useFetch('/users/current', {
                    baseURL: apiUrl,
                    credentials: 'include',
                    headers: {
                        cookie: cookie.cookie || '',
                    },
                })
                console.log('Current user fetched:', data.value)

                if (error.value || Number(status.value) === 401 || !data.value) {
                    this.user = null
                    return null
                }

                this.user = data.value
                this.user = this.user.data
                return data.value
            } catch (err) {
                console.error('Error when get current user:', err)
                this.user = null
                return null
            }
        }
    }
})
