export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const user = await userStore.fetchUser()
  console.log('Current user:', user)
  if (to.path.startsWith('/admin') && user?.data?.role !== 'admin') {
    return navigateTo('/auth/login')
  }
})
