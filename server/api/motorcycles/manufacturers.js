import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    return await $fetch(`${baseUrl}/motorcycles/manufacturers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }catch (error) {
    console.error('Error in collection: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed remove cart',
    })
  }
}, {
  maxAge: 60 * 60 * 24, // 24 hours
  name: 'motorcycles-manufacturers',
  getKey: () => 'manufacturers', // static key since response is always the same
  swr: true, // serve stale while revalidating in background
})
