import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {
  // 1. Get the body (array of product IDs or a single ID)
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const token = getCookie(event, "accessToken")
    const body = await readBody(event)

    const data = await $fetch(`${baseUrl}/${getDomainId()}/account/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: body,
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
