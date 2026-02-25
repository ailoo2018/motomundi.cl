import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const token = getCookie(event, "accessToken")


    const data = await $fetch(`${baseUrl}/${getDomainId()}/account/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    return data
  } catch (error) {
    return createError({
      statusCode: 500,
      errorCode: error.data?.errorCode || null,
      message:  error.data?.message || 'Failed to create user: ' + error.message,

    })
  }


})
