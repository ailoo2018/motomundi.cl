import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const { productId, modelId, limit, offset, rating, orderBy, orderDir } = getQuery(event)


    url = `${baseUrl}/${getDomainId()}/reviews/list`

    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        productId: productId,
        modelId: modelId || 0,
        limit: limit || 10,
        offset: offset || 0,
        rating: rating,
        orderBy: orderBy,
        orderDir: orderDir,
      },
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
