export default defineNuxtRouteMiddleware((to) => {
  // 1. Check if the path contains '/motocicleta/'
  // This matches both /motocicleta/... and /en-US/motocicleta/...
  if (to.path.includes('/motocicleta/')) {

    // 2. Extract the segment containing the ID
    const segments = to.path.split('/')
    const productSegment = segments.find(s => s.includes('-'))

    if (productSegment) {
      // 3. Extract the numeric ID (digits before the first hyphen)
      const productId = productSegment.split('-')[0]

      if (/^\d+$/.test(productId)) {
        // 4. Redirect to your destination page
        // navigateTo handles the locale automatically if configured
        return navigateTo(`/products/detail/${productId}`)
      }
    }
  }
})
