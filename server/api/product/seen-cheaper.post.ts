import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    // 1. Destructure the 'ids' array from the body
    const body = await readBody(event)

    const domainId = getDomainId()

    url = `${baseUrl}/${domainId}/seen-cheaper`

    // 4. Execute the fetch
    return await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

  } catch (error) {
    console.error('Error in notify fetch: ' + url, error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.message || error.data?.error || error.message,
    })
  }
})
