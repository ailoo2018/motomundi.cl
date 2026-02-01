import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl



    const { id } = getQuery(event)
    const wuid  = getCookie(event, "guest_id")

    url = `${baseUrl}/${getDomainId()}/shipping/set-carrier`

    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        carrierId: id,
        wuid,
      },
    })
  }catch(error) {
    console.error('Error in set-carrier: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
