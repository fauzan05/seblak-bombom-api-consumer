export default defineNuxtRouteMiddleware(async () => {
    const userStore = useUserStore()
    const user = await userStore.fetchUser()

    // Jika user belum ada, ambil dari API
    // if (!userStore.user) {
    //   const user = await userStore.fetchUser()
    //   // Jika fetch gagal (null), redirect ke login
    //   if (!user) {
    //     return navigateTo('/auth/login')
    //   }
    // }
  })
