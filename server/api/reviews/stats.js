import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const { productId, modelId } = getQuery(event)


    url = `${baseUrl}/${getDomainId()}/reviews/stats`

    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        productId: productId,
        modelId: modelId,
      }
    })
  }catch(error) {
    console.error('Error in products/search lookup: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
