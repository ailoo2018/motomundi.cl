import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()

  const baseUrl = config.public.productsBaseUrl


  const query = getQuery(event)
  const params = new URLSearchParams(query)

  const res = await $fetch(`${baseUrl}/${getDomainId()}/products/search`, {
    method: 'GET',
    query: query, // $fetch does support query parameter
  })

  return res
})
