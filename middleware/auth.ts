export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()

  // Jika user belum ada, ambil dari API
  if (!userStore.user) {
    const user = await userStore.fetchUser() as { data?: { role?: string } };
    // Jika fetch gagal (null), redirect ke login
    // if (!user) {
    //   return navigateTo('/auth/login')
    // }

    if (to.path.startsWith('/admin') && user?.data?.role !== 'admin') {
      return navigateTo('/auth/login')
    }
  }
})
