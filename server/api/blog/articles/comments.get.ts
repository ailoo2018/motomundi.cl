import { getDomainId } from "@/server/ailoo-domain"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const { id, limit} = getQuery(event)

    url = `${baseUrl}/${getDomainId()}/blog/articles/related/` + id

    return [{
      author: "Juan",
      createdAt: new Date(),
      comment: "Hello World!",
    }]

  } catch (error) {
    console.error('Error GET CART: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }
})
