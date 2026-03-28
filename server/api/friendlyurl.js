import { getDomainId } from "../ailoo-domain.js"

export default defineCachedEventHandler(async (event) => {

  let qpath = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    const query = getQuery(event)

    qpath = query.path
    console.log("query: " + query.path)

    const fUrl = await $fetch(baseUrl + `/${getDomainId()}/friendly-url/lookup`, {
      method: 'POST',
      body: { url: query.path },
    })


    return fUrl
  }catch(error){
    console.error('Error in friendly-url lookup: ' + qpath, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
}, {
  maxAge: 60 * 60 * 24, // 24 hours
  name: 'packs',
  getKey: async event => {
    const query = getQuery(event)

    return `friendlyurl-${query.path}`
  },
  swr: true, // serve stale while revalidating in background
})
