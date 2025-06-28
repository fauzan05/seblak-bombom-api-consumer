export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '',
    }
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
    }
  },
  plugins: [
    '~/plugins/toast.client.ts'
  ],
  css: [
    '~/assets/css/main.css',
    'vue-toastification/dist/index.css'
  ],
})