import { getDomainId } from "../../ailoo-domain.js"

export default defineCachedEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    // 1. Destructure the 'ids' array from the body
    const body = await readBody(event)


    url = `${baseUrl}/${getDomainId()}/recommend?productId=${body.productId}&count=${body.count}`

    // 4. Execute the fetch
    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    console.error('Error in notify fetch: ' + url, error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.message || error.data?.error || error.message,
    })
  }
}, {
  maxAge: 60 * 60 * 24, // 24 hours
  name: 'product-recommend',
  getKey: async event => {
    const body = await readBody(event) || {}
    
    return `product-${body.productId}-count-${body.count}`
  },
  swr: true, // serve stale while revalidating in background
})
