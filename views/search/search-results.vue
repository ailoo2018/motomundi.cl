<script setup lang="ts">

import ProductListItem from "@/views/pages/products/list/product-list-item.vue";

const scrollContainer = ref(null)

const emits = defineEmits(["next-page"])

const props = defineProps({
  products: Array,
})

useInfiniteScroll(
  scrollContainer,
  () => {
    emits("next-page")
/*
    if (hasMore.value && !loading.value) {
      offset.value += limit
      search(true)
    }
*/
  },
  { distance: 200 } // Load when 200px from bottom
)

</script>

<template>
  <!-- search empty -->
  <div
    v-if="products.length == 0"
    class="search__results-empty"
  >
    <svg
      width="54"
      height="54"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      class="icon sprite-line-icons"
    >
      <use
        href="/content/svg/motomundi.svg#i-icon-search"
        xlink:href="/content/svg/motomundi.svg#i-icon-search"
      />
    </svg>
  </div>
  <!-- /search empty -->

  <div
    v-if="products.length > 0"
    ref="scrollContainer"
    style="padding-left:12px;overflow-y:auto;"
    class="vue-virtual-scroller ready direction-vertical ng-hide"
  >
    <div class="row vue-virtual-scroller__item-wrapper search__panel-results">
      <VRow style="margin:0px;">
        <VCol
          v-for="product in products"
          :key="product.id"
          cols="6"
          sm="4"
          md="3"
          class="vue-virtual-scroller__item-view col s6 m4 l3"
          style="padding: 4px"
        >
          <ProductListItem :product="product"/>
        </VCol>
      </VRow>
    </div>
    <div class="vue-virtual-scroller__slot"/>
  </div>

</template>

<style scoped lang="scss">
@media only screen and (min-width: 993px) {
  .row .col.l3 {
    width: 25%;
  }
}

/*
.vue-virtual-scroller.direction-vertical:not(.page-mode) {
  overflow-y: auto;
}
*/

/*.vue-virtual-scroller.direction-vertical:not(.page-mode) {
  overflow-y: auto;
  right: 0;
  bottom: 0;
  left: 270px;

}*/
.row.vue-virtual-scroller__item-wrapper.search__panel-results {
  margin: 0;
}

@media only screen and (min-width: 993px) {
  .row .col.l3 {
    width: 25%;
  }
}

.product-list .products.has-banner {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

@media only screen and (max-width: 600px) {
  .product-list .products.has-banner {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
