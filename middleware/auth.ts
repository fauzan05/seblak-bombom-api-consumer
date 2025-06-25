export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  const headers = useRequestHeaders(['cookie'])
  console.log("COOKIE: ",headers.cookie)
  if (!userStore.user) {
    const user = await userStore.fetchUser(headers.cookie || '')

    // Jika user buka halaman /admin tapi bukan admin
    if (to.path.startsWith('/admin') && user?.data?.role !== 'admin') {
      return navigateTo('/auth/login')
    }
  }
})
