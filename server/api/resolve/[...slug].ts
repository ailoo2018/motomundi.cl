// server/api/resolve/[...slug].ts
import { getDomainId } from "#server/ailoo-domain"

export default defineEventHandler(async (event) => {
  const slugParts = getRouterParam(event, 'slug')
  const path = `/${slugParts}`
  const config = useRuntimeConfig()
  const baseUrl = config.public.w3BaseUrl

  try {
    const result = await $fetch(`${baseUrl}/${getDomainId()}/friendly-url/lookup`, {
      method: 'POST',
      body: { url: path },
    })

    if (!result) {
      throw createError({ statusCode: 404, message: `No mapping for ${path}` })
    }

    const isCms = result.source?.rawUrl?.toLowerCase().includes('cms/page')

    return {
      type: isCms ? 'cms' : 'products',
      query: result.query,
    }

  } catch (error) {
    throw createError({ statusCode: 404, message: `Path not found: ${path}` })
  }
})
