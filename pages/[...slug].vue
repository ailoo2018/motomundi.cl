<script setup>
import ProductsList from "@/views/pages/products/list/products-list.vue"
import { getDomainId } from "@/server/ailoo-domain.js"

definePageMeta({
  /*layout: 'motomundi',*/
  public: true,

})

const route = useRoute()
const queryParams = route.query
const config = ref()

const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean)

const path = `/${slugArray.join('/')}`

if(path === "/Product/ReviewProduct.rails"){

  const wuid = useGuestUser().value
  const config = useRuntimeConfig()
  const baseUrl = config.public.w3BaseUrl

  const { data } = await useFetch(`${baseUrl}/${getDomainId()}/auth/hash-login`, {
    method: 'POST',
    body: {
      hash: queryParams.h,
      pid: queryParams.pid,
      wuid: wuid,
    },
  })

  useCookie('user_id').value = data.userId
  useCookie('accessToken').value = data.accessToken


  navigateTo("/account/review?productId=" + queryParams.prodId + "&invoiceId=" + queryParams.invoiceId)

}else{
  console.log("path received", path)
  try {
    const { data, error } = await useFetch(`/api/friendlyurl?path=${path}`)

    config.value = data.value
    console.log(`Mapping ${path}:` + JSON.stringify( config.value ))
    if (error.value || !config.value) {
      throw createError({
        statusCode: 404,
        statusMessage: `Category at ${path} not found ${error.value}`,
        fatal: true, // Ensures the error page shows during SSR
      })
    }

  }catch(e){
    console.error(e)
  }
}



/*
const { data: config, error } = await useAsyncData(
  `redirect-lookup:${path}`,
  async () => {

    const config = useRuntimeConfig()
    const baseUrl = config.public.cmsBaseUrl


    return await $fetch(baseUrl + `/${getDomainId()}/friendly-url/lookup`, {
      method: 'POST',
      body: { url: path },
    })

  },
)
*/
</script>

<template>

  <ProductsList
    v-if="config"
    :injected-query="config.query"
  />
</template>
