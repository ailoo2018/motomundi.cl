export default defineEventHandler(async (event) => {
  // 1. Get the body (array of product IDs or a single ID)
  const body = await readBody(event)
  const { productIds, userId } = body


  try {

    const token = getCookie(event, "accessToken")

    return $fetch(`/${getDomainId()}/account/wishlist/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: {
        productIds: productIds,
      },
    })
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to sync wishlist to database',
    })
  }
})
