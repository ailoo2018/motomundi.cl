<script setup>
import ProductsList from "@/views/pages/products/list/products-list.vue"
import { getDomainId } from "@/server/ailoo-domain.js"
import CmsContent from "@/views/pages/cms/CmsContent.vue"

definePageMeta({
  /*layout: 'motomundi',*/
  public: true,

})



const route = useRoute()
const queryParams = route.query
const config = ref()
const type = ref("products")

const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean)

const path = `/${slugArray.join('/')}`

console.log("original path: " + path)

console.log("!!!!!!!!!!!!!" + path.includes('sitemap'))


if (path.includes('sitemap') || path.includes('__sitemap__')) {
  throw createError({ statusCode: 404 })
}else if(path.toLowerCase().startsWith("/payment/quickcheckout.rails")) {
  // /Payment/QuickCheckout.rails?documentId=27759764&amount=249900&documentType=INVOICE
  navigateTo("/checkout/" + queryParams.documentId, {external:true})
}else if(path.toLowerCase().startsWith("/product/view.rails")) {

  navigateTo("/products/detail/" + queryParams.productId)

}else if(path === "/Product/Search.rails"){
  navigateTo("/products/list?sword=" + queryParams.w)
}else if(path === "/Account/OrderDetail.rails"){
  // ?orderId=190920&hash=FF4970D2B241BAFFAACE2F654EAE60A8

  const wuid = useGuestUser().value
  const config = useRuntimeConfig()
  const baseUrl = config.public.w3BaseUrl

  const { data } = await useFetch(`${baseUrl}/${getDomainId()}/auth/hash-login`, {
    method: 'POST',
    body: {
      hash: queryParams.hash,
      pid: queryParams.orderId,
      wuid: wuid,
    },
  })

  console.log("hashlogin rs: " + JSON.stringify(data))

  useCookie('user_id').value = data.userId
  useCookie('accessToken').value = data.accessToken


  navigateTo("/account/orders/" + queryParams.orderId)

}else if(path === "/Product/ReviewProduct.rails"){

  console.log("/Product/ReviewProduct.rails : " + JSON.stringify(queryParams) )
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

  console.log("hashlogin rs: " + data.value.userId)

  useCookie('user_id').value = data.value.userId
  useCookie('accessToken').value = data.value.accessToken


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

    if(config.value.source && config.value.source.rawUrl && config.value.source.rawUrl.toLowerCase().includes("cms/page")){
      type.value = "cms"
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

  <CmsContent v-if="type==='cms'" :id="config.query.id" />
  <ProductsList
    v-if="config && type==='products'"
    :injected-query="config.query"
  />
</template>
