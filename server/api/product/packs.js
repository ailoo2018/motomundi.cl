import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const { productId } = getQuery(event)

    return await $fetch(`${baseUrl}/${getDomainId()}/products/packs/${productId}`, {
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
})
