export default defineNuxtRouteMiddleware(async () => {
    const store = useAppSettingStore()
    await store.fetchSettings()
  })
  