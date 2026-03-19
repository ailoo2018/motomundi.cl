import { getDomainId } from "../../ailoo-domain"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const {  name, email } = body

  let url = ""

  try {

    url = `${config.public.w3BaseUrl}/${getDomainId()}/newsletter/subscribe`

    return await $fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name, email,
        },
      })

  } catch (error) {

    return createError({
      statusCode: 500,
      message:  error.data?.message || 'Failed to create user: ' + error.message,

    })
  }
})
