<script setup lang="ts">
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"
import { watchDebounced } from '@vueuse/core'
import SearchFilters from "@/views/pages/products/filter/search-filters.vue";


const sword = ref('')
const showSearchWindow = ref(false)
const products = ref([]) // Changed from a plain array to a ref
const filters = ref()
const total = ref(0)

// Instead of masterSearch.length, we can just use the sword length
const canShowDropdown = computed(() => {
  return showSearchWindow.value && sword.value.length > 2
})

// Watcher to handle the search logic
watchDebounced(
  sword,
  async newVal => {
    if (newVal.length > 2) {
      try {
        // Use $fetch for manual triggers inside watchers/methods
        const rs = await $fetch(`/api/product/search`, {
          query: { sword: newVal, limit: 30 },
        })

        if (rs && rs.products) {
          products.value = rs.products
          filters.value = rs.filters
          total.value = rs.products.length
          showSearchWindow.value = true
        }
      } catch (e) {
        console.error("Search error:", e)
      }
    } else {
      showSearchWindow.value = false
      products.value = []
    }
  },
  { debounce: 500, maxWait: 1000 }, // Configurable delay
)

const closeSearch = () => {
  showSearchWindow.value = false
}
</script>

<template>
  <VTextField
    v-model="sword"
    width="300"
    style="background-color: white;"
    @focus="showSearchWindow = sword.length > 2"
  />
  <div
    v-if="canShowDropdown"
    class="search__dropdown"
  >
    <div class="search-dropdown__filters">
      <SearchFilters :filters="filters" />
    </div>
    <!-- /filters panel -->

    <div class="search-dropdown__results">
      <div class="search-results__summary">
        <p>
          <strong>{{ total }}</strong> resultados
        </p>
        <a
          class="button button--tiny button--light"
          ng-click="redirectToSearch()"
        >Ver todo</a>
        <button
          class="close"
          @click="showSearchWindow=false;"
        >
          <svg
            width="9"
            height="9"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/content/svg/motomundi.svg#i-icon-cross"
              xlink:href="/content/svg/motomundi.svg#i-icon-cross"
            />
          </svg>
        </button>
      </div>


      <!-- search results -->
      <div
        v-if="products.length > 0"
        class="vue-virtual-scroller ready direction-vertical"
      >
        <div
          infinite-scroll-parent="true"
          infinite-scroll-distance="0.5"
          infinite-scroll-disabled="false"
          infinite-scroll="next()"
          class="row vue-virtual-scroller__item-wrapper search__panel-results"
        >
          <VRow>
            <VCol
              v-for="product in products"
              cols="3"
              class="vue-virtual-scroller__item-view col s6 m4 l3"
              style="padding: 4px"
            >
              <ProductListItem :product="product" />
            </VCol>
          </VRow>
        </div>
        <div class="vue-virtual-scroller__slot" />
      </div>
      <!-- /search results -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters__list li label span {
  font-size: 12px !important;
  font-weight: 500;
  line-height: 26px !important;
  overflow: hidden;
  padding-left: 26px !important;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filters__list li label {
  color: #000;
  flex: 1 1 70%;
  margin-bottom: 0;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filters__list li {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.filter.expanded ul {
  display: block;
}

.filter ul {
  display: none;
  padding: 0 20px 15px;
}

.filters__list li strong {
  background-color: #e8e8e8;
  border-radius: 200px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  text-align: right;
}

.filters__list li label span[data-v-35914992] {
  font-size: 12px !important;
  font-weight: 500;
  line-height: 26px !important;
  overflow: hidden;
  padding-left: 26px !important;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filters__list li strong[data-v-35914992] {
  background-color: #e8e8e8;
  border-radius: 200px;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  text-align: right;
}

.filters__list li .filters__extras[data-v-35914992] {
  display: flex;
  max-height: 18px;
}

.vue-virtual-scroller.direction-vertical:not(.page-mode) {
  overflow-y: auto;
  right: 0;
  bottom: 0;
  left: 270px;

}

.vue-virtual-scroller.direction-vertical:not(.page-mode) {
  overflow-y: auto;
}

.search__dropdown {
  background: #fff;
  box-shadow: 0 10px 35px 0 rgba(0, 0, 0, .25);
  display: flex;
  /* 1. Use vh (Viewport Height) to lock it to screen size */
  height: 80vh;

  position: absolute;


  left: 50%;


  top: 150px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 95%;
  z-index: 2000000;
  max-width: 1150px;
}

.search__dropdown .search-dropdown__filters {
  background-color: #f5f5f5;
  flex: 0 0 27%;
  overflow-y: auto;
  padding: 10px;
}

.filter > button {
  border-top: 1px solid #ebebeb;
  font-size: 13px;
  font-weight: 700;
  padding: 15px 20px;
  position: relative;
  text-align: left;
  text-transform: uppercase;
  width: 100%;
}

.filter.expanded > button:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIyIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNFQjAwMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjI4IiBkPSJNMTIuNDMuNzc0SDEuNTciLz48L3N2Zz4=) 50% no-repeat;
}

.filter > button:after {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS4yOCIgZD0iTTEyLjQzIDYuNzczSDEuNTdNNyAxLjM0M3YxMC44NjEiLz48L3N2Zz4=) 50% no-repeat;
  content: "";
  display: block;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 10px;
}

.search__dropdown .search-dropdown__results {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 30px 10px 0;
  position: relative;

}

.vue-virtual-scroller.ready .vue-virtual-scroller__item-view {
  left: 0;
  /*position: absolute;*/
  top: 0;
  will-change: transform;
}

.item[data-v-0d784a01] {
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 275px;
  justify-content: space-between;
  margin: 4px;
  padding: 30px 15px 15px;
}

.search__dropdown:after {
  border: 12px solid hsla(0, 0%, 100%, 0);
  border-bottom-color: #fff;
  bottom: 100%;
  content: " ";
  height: 0;
  left: 85%;
  margin-left: -12px;
  pointer-events: none;
  position: absolute;
  width: 0;
}

.product-tags[data-v-0d784a01] {
  left: -1px;
  position: absolute;
  top: -1px;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
}

.vue-virtual-scroller.ready.direction-vertical .vue-virtual-scroller__item-view {
  /*width: 100%;*/
}


.item h1[data-v-0d784a01] {
  color: #000;
  font-size: 12px;
  justify-content: flex-end;
  line-height: 16px;
  margin: 15px 0 0;
  text-transform: uppercase;
}

.item .item__sizes[data-v-0d784a01], .item h1[data-v-0d784a01] {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item__old-price[data-v-0d784a01] {
  color: #000;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  opacity: .3;
  position: unset;
}

.row.vue-virtual-scroller__item-wrapper.search__panel-results {
  margin: 0;
}

.strike {
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
}

.item__price[data-v-0d784a01] {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.item__bottom[data-v-0d784a01] {
  align-items: center;
  border-top: 1px solid #d8d8d8;
  display: block;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 6px;
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .item[data-v-0d784a01] {
    height: 260px;
    padding: 20px 2px 10px;
  }
}

.button {
  background: none;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
  overflow: hidden;
  padding: 13px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  z-index: 1;
}

.search__dropdown .search-results__summary {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: -10px 0 0;
  padding: 0 20px;
}

.button.button--light {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
  color: #000;
}

.search__dropdown .search-results__summary .close {
  background-color: #000;
  position: absolute;
  right: 0;
  top: 0;
}

.button.button--tiny {
  border: 1px solid #000;
  color: #000;
  font-size: 9px !important;
  font-weight: 600;
  line-height: 20px !important;
  padding: 2px 10px;
  text-align: center !important;
}



.search__dropdown .search-results__summary .close use {
  stroke: #fff;
  stroke-width: 1.2;
}

@media only screen and (min-width: 993px) {
  .row .col.l3 {
    width: 25%;
  }
}
</style>
