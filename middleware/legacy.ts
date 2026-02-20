export default defineNuxtRouteMiddleware((to, from) => {
  console.log("defineNuxtRouteMiddleware legacy: " )

  if (to.path === '/checkout/recover.rails') {
    return navigateTo("/cart")
  }


})
