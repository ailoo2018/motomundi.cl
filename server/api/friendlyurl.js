import { getDomainId } from "../ailoo-domain.js"

export default defineEventHandler(async (event) => {

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    const query = getQuery(event)

    const fUrl = await $fetch(baseUrl + `/${getDomainId()}/friendly-url/lookup`, {
      method: 'POST',
      body: { url: query.path },
    })


    return fUrl
  }catch(error){
    console.error('Error in friendly-url lookup:', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
