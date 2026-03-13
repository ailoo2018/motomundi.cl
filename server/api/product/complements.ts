import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const { productId } = getQuery(event)

    var rs = await $fetch(`${baseUrl}/${getDomainId()}/products/${productId}/complements/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })


    return rs
  }catch (error) {
    console.error('Error in coll  ection: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.data?.error || error.message,
    })
  }
})
