import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  try{
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    return await $fetch(`${baseUrl}/${getDomainId()}/stores/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

  }catch(error){
    console.error('Error', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to list addreses',
    })
  }

})
