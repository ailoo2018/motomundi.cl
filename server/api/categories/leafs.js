import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    let { collectionId, limit } = getQuery(event)

    return await $fetch(`${baseUrl}/${getDomainId()}/categories/leafs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: getQuery(event),


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
