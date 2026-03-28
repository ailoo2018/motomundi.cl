// server/api/moto-blog/[...slug].ts
import { getDomainId } from "#server/ailoo-domain"

export default defineCachedEventHandler(async (event) => {
  const slugParts = getRouterParam(event, 'slug')
  const path = `moto-blog/${slugParts}`

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const fUrl = await $fetch(`${baseUrl}/${getDomainId()}/friendly-url/lookup`, {
      method: 'POST',
      body: { url: path },
    })

    if (fUrl?.query?.categoryId?.length > 0) {
      return { type: 'category', categoryId: fUrl.query.categoryId }
    }

    if (fUrl?.query?.id > 0) {
      return { type: 'article', id: fUrl.query.id }
    }

    throw createError({ statusCode: 404, message: 'Not found' })

  } catch (error) {
    throw createError({ statusCode: 500, message: error.message })
  }
}, {
  maxAge: 60 * 60 * 24, // 24 hours
  name: 'packs',
  getKey: async event => {
    const slugParts = getRouterParam(event, 'slug')
    const path = `moto-blog/${slugParts}`

    return `friendlyurl-${path}`
  },
  swr: true, // serve stale while revalidating in background
})
