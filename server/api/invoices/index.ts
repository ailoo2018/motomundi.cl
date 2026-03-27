import { getDomainId } from "#server/ailoo-domain"

export default defineEventHandler(async event => {


  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const { from, to } = getQuery(event)
    const token = getCookie(event, "accessToken")

    url = `${baseUrl}/${getDomainId()}/invoices`

    return await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: {
        "itemsPerPage": 0,
        "page": 1,
        "filters": {
          "from": from,
          "to": to,
        },
      },
    })
  }catch(error) {
    console.error('Error in products/[id] lookup: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }

})
