import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl


    var rs = await $fetch(`${baseUrl}/${getDomainId()}/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })


    return rs
  }catch (error) {
    console.error('Error in collection: ' + url, error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.message ,
    })
  }
})
