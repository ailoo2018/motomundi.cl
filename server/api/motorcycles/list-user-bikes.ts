import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const token = getCookie(event, "accessToken")

    if(!token)
      return []

    return await $fetch(`${baseUrl}/motorcycles/list-user-bikes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
})
