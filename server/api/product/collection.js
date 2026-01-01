import { getDomainId } from "../../ailoo-domain.js"

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.productsBaseUrl


  const { collectionId } = getQuery(event)

  console.log(`calling: ${baseUrl}/products/collections/${collectionId}`)

// const body = await readBody(event)
  const res = await fetch(`${baseUrl}/${getDomainId()}/products/collections/${collectionId}?limit=10`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },


  })

  return await res.json()
})
