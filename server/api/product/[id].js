import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async (event) => {

  let url = ""
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl
    const id = getRouterParam(event, 'id')


    if(!(parseInt(id) > 0))
      return null

    url = `${baseUrl}/${getDomainId()}/products/${parseInt(id)}`;

    const res = await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },


    })


    return res
  }catch(error) {
    const msg = error.data?.message || error.data?.error || error.message || 'Failed to lookup friendly URL'

    if(error.statusCode !== 404) {
      console.error('Error in products/[id] lookup: ' + url + " " + msg)
      console.error('Stack trace:', error.stack)
    }
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.data?.error || error.message || 'Failed to lookup friendly URL',
    })
  }
})
