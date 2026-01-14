/* eslint-disable camelcase */

import { getDomainId } from "@/server/ailoo-domain.js"

export default defineEventHandler(async event => {

  try {

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    let { authCode, wuid } = getQuery(event)

    
    const user = await $fetch(`${baseUrl}/${getDomainId()}/auth/google`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        authCode,
        wuid,
      },
    })

    return user
  }catch(error) {
    console.error('Error in google login', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to check auth',
    })
  }
})
