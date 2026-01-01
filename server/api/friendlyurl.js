import { getDomainId } from "../ailoo-domain.js"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.cmsBaseUrl


  const query = getQuery(event)

  const fUrl = await $fetch(baseUrl + `/${getDomainId()}/friendly-url/lookup`, {
    method: 'POST',
    body: { url: query.path },
  })


  return fUrl
})
