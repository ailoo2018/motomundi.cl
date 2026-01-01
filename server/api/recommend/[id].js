export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.cmsBaseUrl
  const id = getRouterParam(event, 'id')

  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },


  })

  return await res.json()
})
