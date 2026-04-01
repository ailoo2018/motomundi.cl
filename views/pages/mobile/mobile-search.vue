<script setup>
import SearchFilters from "@/views/pages/products/filter/search-filters.vue"
import { watchDebounced } from "@vueuse/core"
import SearchResults from "@/views/search/search-results.vue"
import MobileFilterDrawer from "@/views/pages/products/list/mobile-filter-drawer.vue"

const isSearchOpen = defineModel({ type: Boolean, default: false })

const sword = ref()
const currentQuery = ref([])
const total = ref(0)
const loading = ref(false)
const filters = ref({})
const products = ref([]) // Changed from a plain array to a ref


// pagination state
const offset = ref(0)
const limit = 20
const hasMore = ref(true)
const showFilters = ref(false)

const router = useRouter()

router.afterEach(() => {
  sword.value = ''
  isSearchOpen.value = false
})


const toggleSearchFilter = () => {
  showFilters.value = !showFilters.value
}

const toggleSearch = () => {
  isSearchOpen.value = false
}



const redirectToSearch = () => {

}

const nextPage = () => {
  if (hasMore.value && !loading.value) {
    offset.value += limit
    search(true)
  }
}

watchDebounced(
  sword,
  async (newVal, oldVal) => {
    if (newVal.length > 2) {
      try {
        // Use $fetch for manual triggers inside watchers/methods
        if (newVal !== oldVal) {
          filters.value = null
        }

        await search(false)

      } catch (e) {
        console.error("Search error:", e)
      }
    } else {
      products.value = []
    }
  },
  { debounce: 300, maxWait: 100 }, // Configurable delay
)


watch(filters, () => {

  if (!sword.value || sword.value.trim().length === 0) {
    return
  }
  if(!filters.value || filters.value.length === 0) {
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

    console.log("do mobile search")

    const rs = await $fetch(`/api/product/search`, {
      key: "product-search-" + sword.value,
      method: "POST",
      body: body,
    })

    console.log("search returned")

    if (rs && rs.products) {

      if (isNextPage) {
        products.value.push(...rs.products)
      } else {
        products.value = rs.products
        if (!filters.value)
          filters.value = rs.filters
      }

      total.value = rs.totalHits

      if (products.value.length >= rs.totalHits) {
        hasMore.value = false
      }
    }
  } catch (e) {
    console.log(e.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <article
    v-if="isSearchOpen"
    class="search__panel search__panel-results--empty ng-cloak"
  >
    <!-- filter container -->
    <MobileFilterDrawer v-model="showFilters" :filters="filters" />
    <!-- /filter container -->

    <!-- search sword and  result container -->
    <section
      onmouseover="document.body.style.overflow='hidden';"
      onmouseout="document.body.style.overflow='auto';"
      class="search__panel-results-container "
    >
      <div class="search__panel-header">
        <button
          class="search__panel-close"
          @click="toggleSearch"
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
        <div class="search__input">
          <form>
            <input
              id="master-search-input"
              v-model="sword"
              type="search"
              placeholder="Buscar en Moto"
            >
            <button
              type="submit"
              @click="redirectToSearch"
            >
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                class="icon sprite-line-icons"
              >
                <use
                  href="/content/svg/motomundi.svg#i-icon-search"
                  xlink:href="/content/svg/motomundi.svg#i-icon-search"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div
        v-if="products.length > 0"
        class="search__results-summary"
      >
        <p style="color: #000">
          <strong>{{ total }}</strong> resultados
        </p>
        <a @click="toggleSearchFilter">Filtrar
          <svg
            width="14"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          ><title>Angle right icon</title>
            <use
              href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-angle-right"
              xlink:href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-angle-right"
            />
          </svg>
        </a>
      </div>


      <!-- search results -->
      <SearchResults
        :products="products"
        @next-page="nextPage"
      /> />
      <!-- /search results -->
    </section>
    <!-- /search sword and  result container -->
  </article>
</template>

<style>
.search__panel {
  background-color: #fff;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
 /* top: 58px;*/
  z-index: 800;
}

.search-mobile__filters {
  position: relative;
}

.search__panel .search__panel-results-container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 63px);
}

.search__panel .search__panel-header {
  background-color: #f5f5f5;
  display: flex;
  padding: 15px;
}

.search__panel .search__panel-header button {
  height: 40px;
  margin-left: -15px;
  padding: 0 15px;
}

.search__panel .search__input {
  flex: 1 1 auto;
  position: relative;
}


.search__panel .search__input input:focus {
  border: 0 !important;
  box-shadow: 0 0 0 3px rgba(214, 0, 28, .75) !important;
}

.search__panel .search__input input {
  background: #fff;
  border: 0 !important;
  border-radius: 200px;
  box-shadow: 0 0 22px 0 rgba(0, 0, 0, .1);
  height: 40px;
  width: 100%;
  line-height: 40px;
  margin-bottom: 0;
  padding: 0 25px 0 20px;
  transition: box-shadow .2s ease;
}

.search__panel .search__input button {
  content: "";
  display: block;
  height: 20px;
  padding: 0;
  position: absolute;
  right: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 20px;
}

.search__panel .search__input input:focus + button use {
  stroke-width: 2.2;
}

.search__panel .search__input button use {
  stroke: #d6001c;
  transition: all .2s ease;
}

.search-mobile__filters {
  position: relative;
}


.search__panel .search__results-empty {
  left: 50%;
  position: relative;
  text-align: center;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.search__panel .search__results-empty svg use {
  stroke: #d6001c;
}


.search__panel .search__results-summary {
  background-color: #f5f5f5;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-top: 1px;
  padding: 10px 15px;
}

.search__panel .search__results-summary p {
  margin: 0;
}

.search__panel .search__results-summary p strong {
  color: #d6001c;
}

@media only screen and (max-width: 600px) {
  .product-list .products.has-banner {
    grid-template-columns: 1fr 1fr;
  }
}


/*** filters ***/
.search-mobile__filters.show .search-mobile__filters-container {
  opacity: 1;
  pointer-events: auto;

  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.search-mobile__filters .search-mobile__filters-container {
  background-color: #fff;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  justify-content: space-between;
  opacity: 0;
  overflow: auto;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  -webkit-transform: translateX(1000px);
  transform: translateX(1000px);
  transition: all .3s ease-in;
  width: 100vw;
  z-index: 3;
}
.search-mobile__filters.show .search-mobile__filters-container {
  opacity: 1;
  pointer-events: auto;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.search-mobile__filters .search-mobile__filters-header {
  align-items: center;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
}
.search-mobile__filters .search-mobile__filters-header button {
  color: #000;
  display: flex;
  font-size: 10px;
  font-weight: 500;
  justify-items: center;
  letter-spacing: .5px;
  text-transform: uppercase;
}

.search-mobile__filters .search-mobile__filters-header button.clear-filters {
  border: 1px solid #000;
  padding: 9px 10px;
}

.search-mobile__filters .search-mobile__filters-header button {
  color: #000;
  display: flex;
  font-size: 10px;
  font-weight: 500;
  justify-items: center;
  letter-spacing: .5px;
  text-transform: uppercase;
}

.search-mobile__filters .search-mobile__filters-header button.close-filters {
  padding: 9px 10px 9px 30px;
}

.search-mobile__buttons{
  margin-top: auto;
}
.search-mobile__filters-content{
  overflow: hidden;
}
</style>
