import { getDomainId } from "../../ailoo-domain.js"

export default defineCachedEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    var rs = await $fetch(`${baseUrl}/${getDomainId()}/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })


    return rs
  }catch (error) {
    console.error('Error in coll  ection: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.message ,
    })
  }
}, {
  maxAge: 60 * 60 * 24, // 24 hours
  name: 'api-brands',
  getKey: () => 'api-brands', // static key since response is always the same
  swr: true, // serve stale while revalidating in background
})
