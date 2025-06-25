import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | Record<string, any>,
    }),

    actions: {
        async fetchUser(cookieHeader?: string) {
            try {
                const config = useRuntimeConfig()
                const apiUrl = config.public.apiUrl
                const isServer = typeof window === 'undefined'

                const { data, error, status } = await useFetch('/users/current', {
                    baseURL: apiUrl,
                    credentials: 'include',
                    headers: isServer && cookieHeader
                        ? { cookie: cookieHeader, 'Content-Type': 'application/json'}
                        : {'Content-Type': 'application/json'}
                })

                if (error.value || Number(status.value) === 401 || !data.value) {
                    this.user = null
                    return null
                }

                this.user = (data.value as any)?.data
                return data.value
            } catch (err) {
                console.error('Error when get current user:', err)
                this.user = null
                return null
            }
        }
    }

})
