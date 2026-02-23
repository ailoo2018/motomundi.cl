import {getDomainId} from "~/server/ailoo-domain";

export default defineEventHandler(async (event) => {
  try {

    const config = useRuntimeConfig()
    const baseUrl = config.public.w3BaseUrl

    let { email, hash, password } = await readBody(event)


    return await $fetch(`${baseUrl}/${getDomainId()}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: email,
        hash: hash,
        password: password,
      },
    })
  }catch(error) {
    const errorData = error.data
    throw createError({
      statusCode: error.data?.code || 500,
      message: error.data?.message || 'Failed to recover email: ' + error.message,
      data: error.data || null,
    })
  }

})
