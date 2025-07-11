import { defineStore } from 'pinia'
interface Wallet {
    id: number
    balance: number
    status: string
    created_at: string
    updated_at: string
}

interface Cart {
    cart_items: any[] | null
    created_at: string
    updated_at: string
}

interface UserData {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    role: string
    wallet: Wallet
    cart: Cart
    created_at: string
    updated_at: string
}

interface CurrentUserResponse {
    code: number
    status: string
    data: UserData
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | Record<string, any>,
    }),

    actions: {
        async fetchUser(): Promise<CurrentUserResponse | null> {
            try {
                const config = useRuntimeConfig()
                const apiUrl = config.public.apiUrl

                const nuxtApp = useNuxtApp()
                const isServer = nuxtApp.ssrContext !== undefined

                const cookieHeader = isServer
                    ? nuxtApp.ssrContext?.event?.req?.headers?.cookie || ''
                    : ''

                const { data, error, status } = await useFetch<CurrentUserResponse>('/users/current', {
                    baseURL: apiUrl,
                    credentials: 'include',
                    headers: isServer ? { cookie: cookieHeader } : {}
                })

                if (error.value || Number(status.value) === 401 || !data.value) {
                    this.user = null
                    return null
                }

                this.user = data.value.data
                return data.value
            } catch (err) {
                console.error('Error fetching current user:', err)
                this.user = null
                return null
            }
        }
    },
    persist: true
})
