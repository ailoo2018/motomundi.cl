import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.productsBaseUrl


  let { collectionId, limit } = getQuery(event)

  if(!limit)
    limit = 10



  var rs = await $fetch(`${baseUrl}/${getDomainId()}/products/collections/${collectionId}?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },


  })


  return rs;
})
