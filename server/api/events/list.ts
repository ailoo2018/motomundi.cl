import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    const { limit } = getQuery(event)

    return await $fetch(baseUrl + `/${getDomainId()}/events/list?limit=${limit}`,
      { method: 'POST' })
  }catch(error){
    console.error('Error latest-events:', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
