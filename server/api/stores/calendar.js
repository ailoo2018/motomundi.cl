import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  try{
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const query = getQuery(event)

    const facilityId = query.facilityId

    const ret =  await $fetch(`${baseUrl}/${getDomainId()}/stores/${facilityId}/calendar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: query,
    })

    console.log("ret", ret)
    return ret;

  }catch(error){
    console.error('Error', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to list addreses',
    })
  }

})
