import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const { productItemId } = getQuery(event)

    url = `${baseUrl}/${getDomainId()}/products/stock`

    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        productItemId: productItemId
      },
    })
  }catch(error) {
    console.error('Error stock: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }
})
