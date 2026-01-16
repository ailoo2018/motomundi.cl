export default defineNuxtRouteMiddleware((to, from) => {
  const userId = useCookie('user_id')
  const isAuthenticated = Number(userId.value) > 0

  console.log("defineNuxtRouteMiddleware: " + userId)

  // If already on login, don't redirect again
  if (to.path === '/login') return

  if (!isAuthenticated) {
    return navigateTo('/login')
  }
})
