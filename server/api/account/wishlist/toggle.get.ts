import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async (event) => {

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const { productId } = getQuery(event)

    const token = getCookie(event, "accessToken")

    var data = await $fetch(`${baseUrl}/${getDomainId()}/wishlist/toggle/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    return data
  } catch (error) {
    const retErr = createError({
      statusCode: 500,
      statusMessage: error.data?.message || 'Failed to toggle wishlist: ' + error.message,
    })

    return retErr
  }
})
