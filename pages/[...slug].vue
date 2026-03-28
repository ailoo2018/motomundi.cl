<!-- pages/[...slug].vue -->
<script setup lang="ts">
import ProductsList from "@/views/pages/products/list/products-list.vue"
import CmsContent from "@/views/pages/cms/CmsContent.vue"

definePageMeta({ public: true })

const route = useRoute()

const slugArray = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean)

// ✅ Top-level, always runs on server
const { data, error } = await useFetch(`/api/resolve/${slugArray.join('/')}`, {
  server: true,
  key: `resolve-${slugArray.join('-')}`,
})

if (error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found`,
    fatal: true,
  })
}


let query = null

if (!data.value?.query) {
  query = route.query
} else {
  query = data.value?.query
}

const baseQuery = []
if(data.value?.type === "products") {
  const query = data.value.query
  if (query.categoryId) {
    baseQuery.push({type: "categories", values: [query.categoryId]})
  }
  if (query.brandId) {
    baseQuery.push({type: "brands", values: [query.brandId]})
  }
  if (query.collection) {
    baseQuery.push({type: "collection", value: query.collection})
  }
  if (query.bikeManufacturer) {
    baseQuery.push({
      type: "bike",
      value: {manufacturer: query.bikeManufacturer, model: query.bikeModel, year: query.bikeYear},
    })
  }
  if (query.minDiscount) {
    baseQuery.push({type: "minDiscount", value: query.minDiscount})
  }
  if (query.sword) {
    baseQuery.push({type: "sword", value: query.sword})
  }

  console.log("baseQuery: " + JSON.stringify(baseQuery))

}
</script>

<template>
  <CmsContent
    v-if="data?.type === 'cms'"
    :id="data.query.id"
  />
  <ProductsList
    v-else-if="data?.type === 'products'"
    :base-query="baseQuery"

  />
</template>
