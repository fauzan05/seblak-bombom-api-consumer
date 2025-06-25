export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const isServer = typeof window === 'undefined'

  const cookieHeader = isServer ? useRequestHeaders(['cookie']).cookie || '' : undefined
  console.log("Cookie Header:", cookieHeader)
  const user = await userStore.fetchUser(cookieHeader)

  if (to.path.startsWith('/admin') && user?.data?.role !== 'admin') {
    return navigateTo('/auth/login')
  }
})
