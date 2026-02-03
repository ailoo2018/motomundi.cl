export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Check if the path starts with /Content/products/
  if (url.pathname.startsWith('/Content/products/')) {
    const cdnBase = 'https://cdn.motomundi.cl'
    return sendRedirect(event, cdnBase + url.pathname, 301)
  }
})
