import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    // For multipart/form-data, we need to read the multipart form data
    const formData = await readMultipartFormData(event)
    const token = getCookie(event, "accessToken")

    url = `${baseUrl}/${getDomainId()}/account/reviews/add`

    // Create a new FormData object to forward to the Express service
    const forwardFormData = new FormData()

    // Reconstruct the FormData from the parsed multipart data
    if (formData) {
      for (const part of formData) {
        if (part.filename) {
          // It's a file
          const blob = new Blob([part.data], { type: part.type || 'application/octet-stream' })
          forwardFormData.append(part.name, blob, part.filename)
        } else {
          // It's a regular field
          forwardFormData.append(part.name, part.data.toString())
        }
      }
    }

    const res = await $fetch(url, {
      headers: {
        // Don't set Content-Type - let fetch set it with the boundary
        'Authorization': `Bearer ${token}`,
      },
      method: 'POST',
      body: forwardFormData,
    })

    return res
  } catch (error) {
    console.error('Error in reviews/add: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to submit review',
    })
  }
})
