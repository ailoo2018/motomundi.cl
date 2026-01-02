import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  let url= ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.cmsBaseUrl

    url = `${baseUrl}/${getDomainId()}/widgets?pageId=1`

    const { collectionId } = getQuery(event)

    console.log(`calling: ${url}`)

    // const body = await readBody(event)
    return await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    console.error(`Error in home : ${url} `, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to lookup friendly URL',
    })

  }

  //  return await res.json()


})
