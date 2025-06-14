// plugins/axios.js
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiUrl || 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json',
      },
  })

  return {
    provide: {
      axios: api,
    },
  }
})
