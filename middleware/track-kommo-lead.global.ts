export default defineNuxtRouteMiddleware((to) => {
  // 1. Look for the 'kommo_id' in the URL query parameters
  const kommoId = to.query.kommo_id as string

  if (kommoId) {
    // 2. Define the cookie (Nuxt's useCookie is SSR-friendly)
    const leadCookie = useCookie('kommo_lead_id', {
      maxAge: 60 * 60 * 24 * 30, // 30 days expiration
      path: '/',                 // Available across the whole site
      sameSite: 'lax'            // Security best practice
    })

    // 3. Save the ID into the cookie
    leadCookie.value = kommoId

    // 4. (Optional) Clean the URL so the ID isn't visible anymore
    // This keeps the URL tidy for the user
    return navigateTo({ path: to.path, query: { ...to.query, kommo_id: undefined } }, { replace: true })
  }
})
