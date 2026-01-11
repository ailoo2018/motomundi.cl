import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const body = await readBody(event)



    url = `${baseUrl}/${getDomainId()}/cart/add`

    const res = await $fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body, // $fetch does support query parameter
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
    console.error('Error in products/search lookup: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })
  }
})
