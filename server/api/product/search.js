import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl



    const query = getQuery(event)
    const params = new URLSearchParams(query)

    url = `${baseUrl}/${getDomainId()}/products/search`
    const res = await $fetch(url, {
      method: 'GET',
      query: query, // $fetch does support query parameter
    })

    return res
  } catch (error) {
    console.error('Error in products/search lookup: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }
})
