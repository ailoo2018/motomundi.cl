export default defineEventHandler(event => {
  const url = getRequestURL(event)

  // Check if the path starts with /Content/products/
  if (
    url.pathname.startsWith('/Content/products/')
    || url.pathname.startsWith('/Content/images/no-image')
    || url.pathname.startsWith('/MotoMundiMobile/content/images')
  ) {
    const cdnBase = 'https://cdn.motomundi.cl'
    
    return sendRedirect(event, cdnBase + url.pathname, 301)
  }

})
