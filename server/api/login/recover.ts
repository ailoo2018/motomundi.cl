import { getDomainId } from "@/server/ailoo-domain"

export default defineEventHandler(async event => {
  try {

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    let { email } = await readBody(event)


    return await $fetch(`${baseUrl}/${getDomainId()}/recover-password`, {
      method: 'POST',
      body: {
        username: username,
        password,
      },
    })
  }catch(error) {
    const errorData = error.data
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to check auth',
      data: {
        code: errorData?.code,
      },
    })
  }

})
