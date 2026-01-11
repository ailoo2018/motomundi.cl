export default defineEventHandler(async (event) => {

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const { sword } = getQuery(event)

    const res = await $fetch(`${baseUrl}/comunas/search`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: { sword },


    })
    return res
  }catch(error) {
    console.error('Error in products/search lookup: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
