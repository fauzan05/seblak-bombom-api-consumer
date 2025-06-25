export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const user = await userStore.fetchUser()

  const isClient = typeof window !== 'undefined'

  if (isClient) {
    console.log('✅ CLIENT: Current user:', user)
  } else {
    console.log('✅ SERVER: Current user:', user)
  }

  if (to.path.startsWith('/admin') && user?.data?.role !== 'admin') {
    return navigateTo('/auth/login')
  }
})
