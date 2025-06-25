export default defineNuxtRouteMiddleware(async (to, from) => {
  const isClient = typeof window !== 'undefined'; // Define isClient locally
  if (isClient) {
    const currentHost = window.location.hostname
    if (currentHost === 'seblak-bombom-api-consumer-production.up.railway.app') {
      window.location.href = 'https://seblak.fznh-dev.my.id' + window.location.pathname
      return // Stop middleware agar tidak lanjut fetchSettings
    }
  }

  const store = useAppSettingStore()
  await store.fetchSettings()
})
