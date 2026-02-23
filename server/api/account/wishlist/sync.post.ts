import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async (event) => {
  // 1. Get the body (array of product IDs or a single ID)
  const body = await readBody(event)
  const { productIds, userId } = body


  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const token = getCookie(event, "accessToken")

    var data = await $fetch(`${baseUrl}/${getDomainId()}/wishlist/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: {
        productIds: productIds,
      },
    })

    return data
  } catch (error) {
    const retErr = createError({
      statusCode: 500,
      statusMessage: error.data?.message || 'Failed to sync wishlist to database: ' + error.message,
    })

    return retErr
  }
})
