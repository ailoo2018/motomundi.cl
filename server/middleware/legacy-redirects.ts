// server/middleware/legacy-redirects.ts
import { getDomainId } from "#server/ailoo-domain"

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  const query = Object.fromEntries(url.searchParams)
  const pathLower = path.toLowerCase()

  // Block non-page paths immediately
  if (
    pathLower.includes('sitemap') ||
    pathLower.includes('__sitemap__') ||
    pathLower.startsWith('/api') ||
    pathLower.match(/\.(jpg|jpeg|png|webp|gif|rails|php|js|xml|txt|git)$/) ||
    pathLower.includes('/product/listbycategory.rails') ||
    pathLower.includes('.')
  ) {
    return // let Nuxt handle 404 naturally
  }

  // Legacy .rails redirects
  if (pathLower.startsWith('/payment/quickcheckout.rails')) {
    return sendRedirect(event, `/checkout/${query.documentId}`, 301)
  }

  if (pathLower.startsWith('/product/view.rails')) {
    return sendRedirect(event, `/products/detail/${query.productId}`, 301)
  }

  if (path === '/Product/Search.rails') {
    return sendRedirect(event, `/products/list?sword=${query.w}`, 301)
  }

  if (path === '/Login/Index.rails') {
    return sendRedirect(event, `/login`, 301)
  }

  if (path === '/Account/OrderDetail.rails') {
    const runtimeConfig = useRuntimeConfig()
    const baseUrl = runtimeConfig.public.w3BaseUrl

    const data = await $fetch(`${baseUrl}/${getDomainId()}/auth/hash-login`, {
      method: 'POST',
      body: { type: 'order', hash: query.hash, pid: query.orderId },
    })

    setCookie(event, 'user_id', data.userId)
    setCookie(event, 'accessToken', data.accessToken)
    return sendRedirect(event, `/account/orders/${query.orderId}`, 302)
  }

  if (pathLower === '/product/reviewproduct.rails') {
    const runtimeConfig = useRuntimeConfig()
    const baseUrl = runtimeConfig.public.w3BaseUrl

    const data = await $fetch(`${baseUrl}/${getDomainId()}/auth/hash-login`, {
      method: 'POST',
      body: { type: 'product', hash: query.h, pid: query.pid },
    })

    setCookie(event, 'user_id', data.userId)
    setCookie(event, 'accessToken', data.accessToken)
    return sendRedirect(event, `/account/reviews`, 302)
  }
})
