import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    let { collectionId, limit } = getQuery(event)

    if (!limit)
      limit = 10


    var rs = await $fetch(`${baseUrl}/${getDomainId()}/products/collections/${collectionId}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },


    })


    return rs;
  }catch (error) {
    console.error('Error in collection: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed remove cart',
    })
  }
})
