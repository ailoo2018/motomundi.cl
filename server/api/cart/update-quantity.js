import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {
  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    const { wuid, itemId, quantity } = await readBody(event)



    url = `${baseUrl}/${getDomainId()}/cart/update-quantity`

    const res = await $fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: { wuid, itemId, quantity },
    })

    console.log("res", res)

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
