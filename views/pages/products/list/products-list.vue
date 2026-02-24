<script setup>
import DesktopFilters from "@/views/pages/products/list/desktop-filters.vue"
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"

const props = defineProps({
  injectedQuery: {
    type: Object,
  },
})

let query = null
const route = useRoute()
if (!props.injectedQuery) {
  query = route.query
} else {
  query = props.injectedQuery
}
console.log("the query", query)

const total = ref(0)
const title = ref()
const totalPages = ref(0)
const queryDesc = ref()
const currentPage = ref(1)
const ignoreNextPageWatch = ref(false)
const pageSize = ref(60)
const currentQuery = ref([])
const loading = ref(false)
const filters = ref()
let rs = {}
const products = ref([])

useSeoMeta({
  title: () =>  title.value || 'Loading Product...',
  ogTitle: () => title.value,
  description: () => title.value,
  ogDescription: () => title.value,
})


watch(currentPage, async () => {
// If this was triggered by a filter change, skip this execution
  if (ignoreNextPageWatch.value) {
    ignoreNextPageWatch.value = false
    
    return
  }

  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  await search()
})


const getQueryDescription = q => {
  if(q.description?.length > 0)
    return  `<span class="total-results">${ rs?.totalHits } </span>` + q.description

  return "Resultado"
}

const baseQuery = []

if (query.categoryId) {
  baseQuery.push({ type: "categories", values: [query.categoryId] })
}
if (query.brandId) {
  baseQuery.push({ type: "brands", values: [query.brandId] })
}
if (query.collection) {
  baseQuery.push({ type: "collection", value: query.collection })
}
if(query.bikeManufacturer){
  baseQuery.push({ type: "bike", value: { manufacturer: query.bikeManufacturer, model: query.bikeModel, year: query.bikeYear } })
}
if(query.minDiscount){
  baseQuery.push({ type: "minDiscount", value: query.minDiscount })
}
if(query.sword){
  baseQuery.push({ type: "sword", value: query.sword })
}


watch(filters, () => {

  const map = new Map()
  for (const f of filters.value) {
    for (const b of f.buckets) {
      if (b.checked) {
        if (!map.has(f.type))
          map.set(f.type, { type: f.type, values: [] })
        map.get(f.type).values.push(b.id)
      }
    }
  }

  const newQuery = [...map.values()]
  if (currentQuery.value.length === 0 && newQuery.length === 0) {
    return
  }

  if (JSON.stringify(currentQuery.value) !== JSON.stringify(newQuery)) {

    if (currentPage.value !== 1) {
      ignoreNextPageWatch.value = true // Prevent the watcher from calling search()
      currentPage.value = 1
    }
    console.log("NEW QUERY!" + JSON.stringify(newQuery))
    console.log("OLD QUERY!" + JSON.stringify(currentQuery.value))
    currentQuery.value = newQuery

    search()
  }
}, { deep: true })


const search = async () => {
  try {
    products.value = []
    loading.value = true

    let body = {
      brands: [],
      models: [],
      colors: [],
      tags: [],
      sword: null,
      bike: null,
      collectionId: null,
      sizes: [],
      categories: [],
      limit: pageSize.value,
      offset: (currentPage.value - 1) * pageSize.value,
    }


    var cQuery = JSON.parse(JSON.stringify(currentQuery.value))

    // add baseQuery filters if not selected
    console.log(JSON.stringify(baseQuery))
    for (const bq of baseQuery) {
      const fg = cQuery.find(cq => cq.type === bq.type)
      if (!fg) {
        cQuery.push(bq)
      } else {
        if (fg && !fg.values && fg.values.length === 0) {
          fg.values = bq.values
        }
      }
    }

    for (const facet of cQuery) {
      if (facet.type === "brands") {
        body.brands = facet.values
      }
      else if (facet.type === "categories") {
        body.categories = facet.values
      }

      else if (facet.type === "tags") {
        facet.values.forEach(t => {
          body.tags.push(t)
        })
      }
      else if (facet.type === "sizes") {
        facet.values.forEach(t => {
          body.sizes.push(t)
        })
      }
      else if (facet.type === "models") {
        facet.values.forEach(t => {
          body.models.push(t)
        })
      }
      else if (facet.type === "collection") {
        body.collectionId = facet.value
      }
      else if (facet.type === "colors") {
        facet.values.forEach(t => {
          body.colors.push(t)
        })
      }
      else if (facet.type === "bike") {
        body.bike = facet.value
      }
      else {
        body[facet.type] = facet.value
      }

    }


    const { data } = await useFetch(`/api/product/search`, {
      key: `product-search-` + JSON.stringify(body),
      method: "POST",
      body: body,
    })

    rs = data.value

    /*
    let debug = false

    if(!debug) {
      const { data } = await useFetch(`/api/product/search`, {
        key: `product-search-` + JSON.stringify(body),
        method: "POST",
        body: body,
      })

      rs = data.value
    }else {
      rs = await $fetch(`/api/product/search`, {
        key: `product-search-` + JSON.stringify(body),
        method: "POST",
        body: body,
      })
    }
*/




    if (rs && rs.products) {
      total.value = rs.totalHits
      totalPages.value = Math.ceil( rs.totalHits / pageSize.value )


      title.value = rs.query.description
      queryDesc.value = getQueryDescription(rs.query)
      rs.products.forEach(p => p.isWished = false )
      products.value = rs.products
      if (!filters.value)
        filters.value = rs.filters

    }
  } catch (e) {
    console.log(e.message)
  } finally {
    loading.value = false
  }
}


search()
</script>

<template>
  <div class="list-container pt-6">
    <section>
      <div class="filters__header">
        <div class="row">
          <div class="container">
            <div class="filters__header-title">
              <h1
                class="header-title mb-4"
                v-html="queryDesc"
              />
            </div>
          </div>
        </div>
        <!-- / page title -->
        <DesktopFilters v-model="filters" />
      </div>
      <section class="container results-list">
        <div
          v-if="loading"
          class="d-flex justify-center align-center py-12"
        >
          <VProgressCircular
            indeterminate
            color="primary"
            size="64"
          />
        </div>
        <div class="product-list">
          <div>
            <div
              id="resultscontainer"
              class="row products banner--right has-banner"
            >
              <div
                v-for="product in products"
                :key="product.id"
                class="col s6 m4 lc5"
              >
                <ProductListItem :product="product" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>

    <VPagination
      v-model="currentPage"
      :length="totalPages"
    />
  </div>
</template>

<style scoped scss>
.container {
  inline-size: 95%;
  margin-block: 0;
  margin-inline: auto;
  max-inline-size: 1280px;
}

/*.row .col {
  box-sizing: border-box;
  float: inline-start;
  min-block-size: 1px;
  padding-block: 0;
  padding-inline: 0.375rem;
}*/

.products > .col {
  margin-block-end: 15px;
}

.product-list .products {
  display: flex;
  flex-wrap: wrap;
}

.product-list .products.has-banner {
  display: grid;
  gap: unset;
  grid-auto-flow: dense;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
}

.product-list .products.has-banner > .col {
  inline-size: 100% !important;
  justify-self: stretch;
}

.product-list .products.row > .col {
  margin-inline-start: 0;
}

.filters__header .filters__header-title .header-title {
  display: block;
  font-size: 17px;
  font-weight: 900;
  padding-block: 15px 4px;
  padding-inline: 0;
  text-transform: uppercase;
}


@media only screen and (min-width: 993px) {
  .filters__header .filters__header-title .header-title {
    font-size: 25px;
  }
}

@media only screen and (max-width: 600px) {
  .product-list .products.has-banner {
    grid-template-columns: 1fr 1fr;
  }
}
</style>


