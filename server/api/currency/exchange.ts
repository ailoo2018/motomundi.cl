import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    const { from, to } = getQuery(event)

    return await $fetch(baseUrl + `/api/convert`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
        query: {
          from: from,
          to: to,
          amount: 1,
        },
      })
  } catch (error) {
    console.error('Error latest-events:', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
