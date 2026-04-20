import { getDomainId } from "../../ailoo-domain"

export default defineCachedEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const { productId } = getQuery(event)

    console.log("baseUrl", baseUrl)

    return await $fetch(`${baseUrl}/${getDomainId()}/products/packs/${parseInt(productId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }catch (error) {
    console.error('Error in collection: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed remove cart',
    })
  }
}, {
  maxAge: 60 * 60 * 24, // 24 hours
  name: 'packs',
  getKey: async event => {
    const { productId } = getQuery(event)

    return `packs-${productId}`
  },
  swr: true, // serve stale while revalidating in background
})
