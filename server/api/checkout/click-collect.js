import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    url = `${baseUrl}/${getDomainId()}/checkout/click-collect`

    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    })
  }catch(error) {
    console.error('Error in click-collect: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
