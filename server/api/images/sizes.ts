import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""
  let body = null

  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    body = await readBody(event)


    url = `${baseUrl}/${getDomainId()}/images/sizes`

    return await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
  }catch(error) {
    console.error('Error in image sizes: ' + url, error)
    console.error('Stack trace:', error.stack)
    console.error("image sizes body: " + JSON.stringify(body))
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }
})
