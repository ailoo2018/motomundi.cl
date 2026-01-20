<script setup>
import ProductsList from "@/views/pages/products/list/products-list.vue"

const route = useRoute()


const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean)

const path = `/${slugArray.join('/')}`


const { data: config, error } = await useFetch(`/api/friendlyurl?path=${path}`)
console.log(`Mapping ${path}:`, config)

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


if (error.value || !config.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Category at ${path} not found ${error.value}`,
    fatal: true, // Ensures the error page shows during SSR
  })
}



</script>

<template>
  <ProductsList :injected-query="config.query" />
</template>
