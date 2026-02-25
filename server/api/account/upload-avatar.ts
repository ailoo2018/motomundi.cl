import { getDomainId } from "@/server/ailoo-domain"

export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    // 1. Grab the multipart data from the incoming request
    const multipartData = await readMultipartFormData(event)

    if (!multipartData) {
      throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
    }

    // 2. Reconstruct FormData for the outbound request
    const formData = new FormData()

    for (const part of multipartData) {
      if (part.name && part.data) {
        if (part.filename) {
          // It's a file: Convert Buffer to Blob for the fetch API
          const blob = new Blob([part.data], { type: part.type })

          formData.append(part.name, blob, part.filename)
        } else {
          // It's a regular field
          formData.append(part.name, part.data.toString())
        }
      }
    }

    // 3. Forward to Express
    // Note: Do NOT manually set 'Content-Type' header; 
    // $fetch/FormData will set it automatically with the correct boundary.
    return await $fetch(`${baseUrl}/${getDomainId()}/account/avatar`, {
      method: 'POST',
      body: formData,
      headers: {
        // Forward auth if necessary
        Authorization: `Bearer ${getCookie(event, "accessToken")}`,
      },
    })

  } catch (error) {
    console.error('Proxy Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to save file on server',
    })
  }
})
