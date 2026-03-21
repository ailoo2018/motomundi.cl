<script setup>
import DesktopFilters from "@/views/pages/products/list/desktop-filters.vue"
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"
import { useProductList } from "@/composables/useProductList.js"
import MobileFilterDrawer from "@/views/pages/products/list/mobile-filter-drawer.vue"

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

const loading = ref(false)
const isFilterDrawerOpen = ref(false)


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
if (query.bikeManufacturer) {
  baseQuery.push({
    type: "bike",
    value: { manufacturer: query.bikeManufacturer, model: query.bikeModel, year: query.bikeYear },
  })
}
if (query.minDiscount) {
  baseQuery.push({ type: "minDiscount", value: query.minDiscount })
}
if (query.sword) {
  baseQuery.push({ type: "sword", value: query.sword })
}

console.log("baseQuery: " + JSON.stringify(baseQuery))


const {
  products,
  title,
  total,
  queryDesc,
  currentPage,
  totalPages,
  applyFilters,
  filters,
  orderBy,
} = useProductList({ baseQuery: baseQuery })


useSeoMeta({
  title: () => title || 'Loading Product...',
  ogTitle: () => title,
  description: () => title,
  ogDescription: () => title,
})


const onOrderBy = ob => {
  orderBy.value = ob
}


const onFilter = filters => {
  applyFilters(filters)
}
</script>

<template>
  <div class="list-continer pt-6 pb-10">
    <section>
      <div class="filters__header">

        <!-- page title -->
        <div class="row">
          <div class="container">
            <div class="filters__header-title">
              <h1
                v-if="title"
                class="header-title mb-4"
              >
                <span class="total-results">{{ total }}</span>
                {{ title }}
              </h1>
            </div>
          </div>
        </div>
        <!-- / page title -->

        <!-- filters (really is mobile and desktop -->
        <DesktopFilters
          :filters="filters"
          @on-order-by="onOrderBy"
          @on-filter="onFilter"
        />
      </div>
      <section class="pa-1 results-list ">
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
        <div class="product-list ">
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


