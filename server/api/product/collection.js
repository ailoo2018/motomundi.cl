import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.productsBaseUrl


  let { collectionId, limit } = getQuery(event)

  if(!limit)
    limit = 10

  console.log(`calling: ${baseUrl}/products/collections/${collectionId}`)


  var rs = await $fetch(`${baseUrl}/${getDomainId()}/products/collections/${collectionId}?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },


  })

  console.log("rs: " + JSON.stringify(rs))

  return rs;
})
