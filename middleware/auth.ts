export default defineNuxtRouteMiddleware((to, from) => {
  const userId = useCookie('user_id')

  // Convert to number and check if it's greater than 0
  const isAuthenticated = Number(userId.value) > 0

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return navigateTo('/login')
  }
})
