import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    const { limit, offset,  from, to, who } = await readBody(event)

    console.log("who: " + who)

    var rs = await $fetch(baseUrl + `/${getDomainId()}/events/list`,
      {
        key: `events-list-${new Date().toISOString()}`,
        method: 'POST',
        body: {
          from: from,
          to: to,
          limit: limit,
          offset: offset,
        },

      })

    return rs
  }catch(error){
    console.error('Error latest-events:', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
