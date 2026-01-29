import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async (event) => {

  let url = "";
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const { id } = getQuery(event)

    url = `${baseUrl}/${getDomainId()}/products/${id}/create-images`;

    const res = await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })


    return res
  }catch(error) {
    console.error('Error in products/[id] lookup: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }
})
