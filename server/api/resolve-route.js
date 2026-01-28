// server/middleware/route-mapper.ts
export default defineEventHandler(async (event) => {
  const path = getRequestPath(event)
  // Skip if it's already a product list page or an API call
  if (path.startsWith('/products') || path.startsWith('/api') || path.startsWith('/_nuxt')) {
    return
  }

  // 1. Check Redis for the path
  const categoryId = 123

  // 2. If found, redirect to the internal page
  if (categoryId) {
    return sendRedirect(event, `/products/list?categoryId=${categoryId}`, 302)
  }
})
