import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    let limit = 10
    let categoryId = 0

    const query = getQuery(event)
    if(query.limit)
      limit = query.limit


    url = `${baseUrl}/${getDomainId()}/blog/featured`

    var ret =  await $fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      query: {
        categoryId,
        limit,
      },
    })
    console.log("ret" + ret)

    return ret
  } catch (error) {
    console.error('Error GET CART: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }
})
