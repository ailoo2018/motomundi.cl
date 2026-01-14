import { getDomainId } from "@/server/ailoo-domain"

export default defineEventHandler(async event => {
  try {

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    let { user, password } = getQuery(event)


    return await $fetch(`${baseUrl}/${getDomainId()}/auth/login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        user,
        password,
      },
    })
  }catch(error) {
    console.error('Error in google login', error)
    console.error('Stack trace:', error.stack)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to check auth',
    })
  }

})
