

export const fetchRecommendProducts = async (productId, count)    => {

  const config = useRuntimeConfig()
  const baseUrl = config.public.cmsBaseUrl

  const res = await fetch(`${baseUrl}/recommend?productId=${productId}&count=${count}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },


  })

  return await res.json()
}


export const fetchProduct = async productId    => {

  const config = useRuntimeConfig()
  const baseUrl = config.public.cmsBaseUrl

  const res = await fetch(`${baseUrl}/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },


  })

  return await res.json()
}
