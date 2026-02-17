import {getDomainId} from "@/server/ailoo-domain";

export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    let {limit} = getQuery(event)

    if(!limit)
      limit = 10

    var rs = await $fetch(baseUrl + `/${getDomainId()}/yt/latest?limit=${limit}`)

    return rs;


  } catch(error) {
    console.error('Error calling youtube latest', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch YouTube videos',
    })
  }
})
