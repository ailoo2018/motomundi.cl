import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const { wuid, itemId, type } = await getQuery(event)



    url = `${baseUrl}/${getDomainId()}/cart/remove-item`

    const res = await $fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      query: { wuid, itemId, type },
    })

    if (res && res.filters) {
      for (const f of res.filters) {
        f.expanded = false
        f.showExtraContent = false
        f.buckets.forEach(b => b.checked = false)
      }

    }

    return res
  } catch (error) {
    console.error('Error in cart/remove-item: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed remove cart',
    })
  }
})
