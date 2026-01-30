import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""

  try {

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const body = await readBody(event)

    url = `${baseUrl}/${getDomainId()}/contact`

    return await $fetch(url, {
      method: 'POST',
      headers: {
      },
      body: body,

    })


  }catch(error) {
    console.error('Error in contact: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
