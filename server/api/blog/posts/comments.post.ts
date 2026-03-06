import { getDomainId } from "@/server/ailoo-domain"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const body = await readBody(event)

    url = `${baseUrl}/${getDomainId()}/blog/posts/${body.postId}/comments`


    return await $fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body
    })

  } catch (error) {
    console.error('Error GET CART: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }
})
