<script setup>
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"
import { watchDebounced } from '@vueuse/core'
import SearchFilters from "@/views/pages/products/filter/search-filters.vue"
import SearchResults from "@/views/search/search-results.vue"


const sword = ref('')
const showSearchWindow = ref(false)
const products = ref([]) // Changed from a plain array to a ref
const filters = ref()
const total = ref(0)
const currentQuery = ref([])
const loading = ref(false)

// pagination state
const offset = ref(0)
const limit = 20
const hasMore = ref(true)
const showFilters = ref(false)

// Instead of masterSearch.length, we can just use the sword length
const canShowDropdown = computed(() => {
  return showSearchWindow.value && sword.value.length > 2
})

const nextPage = () => {
  if (hasMore.value && !loading.value) {
    offset.value += limit
    search(true)
  }
}

const onChange = val => {
  console.log("Features selected changed!", val)
}

// Watcher to handle the search logic
watchDebounced(
  sword,
  async (newVal, oldVal) => {
    if (newVal.length > 2) {
      try {
        // Use $fetch for manual triggers inside watchers/methods
        if(newVal !== oldVal) {
          filters.value = null
        }

        search()

      } catch (e) {
        console.error("Search error:", e)
      }
    } else {
      showSearchWindow.value = false
      products.value = []
    }
  },
  { debounce: 300, maxWait: 1000 }, // Configurable delay
)


const search = async (isNextPage = false) => {
  try {
    loading.value = true

    // Reset if it's a fresh search
    if (!isNextPage) {
      offset.value = 0
      hasMore.value = true
    }

    let body = {
      brands: [],
      models: [],
      colors: [],
      tags: [],
      sizes: [],
      categories: [],
      sword: sword.value,
      limit: limit, // used for pagination
      offset: offset.value,  // used for pagination
    }

    for (const facet of currentQuery.value) {
      if (facet.type === "brands") {
        body.brands = facet.values
      }
      if (facet.type === "categories") {
        body.categories = facet.values
      }

      if (facet.type === "tags") {
        facet.values.forEach(t => {
          body.tags.push(t)
        })
      }

      if (facet.type === "sizes") {
        facet.values.forEach(t => {
          body.sizes.push(t)
        })
      }
      if (facet.type === "models") {
        facet.values.forEach(t => {
          body.models.push(t)
        })
      }
      if (facet.type === "colors") {
        facet.values.forEach(t => {
          body.colors.push(t)
        })
      }

    }


    const rs = await $fetch(`/api/product/search`, {
      key: "product-search-" + sword.value,
      method: "POST",
      body: body,
    })


    if (rs && rs.products) {

      if (isNextPage) {
        products.value.push(...rs.products)
      } else {
        products.value = rs.products
        if (!filters.value)
          filters.value = rs.filters
      }


      total.value = rs.products.length
      showSearchWindow.value = true

      if (total.value < limit) {
        hasMore.value = false
      }
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    loading.value = false
  }
}

watch(filters, () => {

  if (!sword.value || sword.value.trim().length === 0) {
    return
  }
  if(!filters || !filters.value) {
    return
  }

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
    console.log("NEW QUERY!" + JSON.stringify(newQuery))
    console.log("OLD QUERY!" + JSON.stringify(currentQuery.value))
    currentQuery.value = newQuery
    search()

  }


}, { deep: true })


const closeSearch = () => {
  showSearchWindow.value = false
}
</script>

<template>
  <div class="d-flex search-control">

    <VTextField
      v-model="sword"
      width="300"
      style="background-color: white;"
      @focus="showSearchWindow = sword.length > 2"
    />
    <VIcon
      icon="tabler-search"
      class="ml-2 ma-1 mt-2  pa-2"
      color="white"
    />
  </div>
  <div
    v-if="canShowDropdown"
    class="search__dropdown"
  >
    <div class="search-dropdown__filters">
      <SearchFilters v-model="filters" />
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
      <SearchResults :products="products" @next-page="nextPage"/>

      <!-- /search results -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-field {
  border-radius: 0px;
}
.search-control{
  margin-top: 14px;
  padding: 8px;
  background-color: black;
  border-radius: 8px;
  border: 3px solid black;
}

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




.vue-virtual-scroller.ready.direction-vertical .vue-virtual-scroller__item-view {
  /*width: 100%;*/
}



.strike {
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
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


</style>
