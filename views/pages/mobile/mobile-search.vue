<script setup>
import SearchFilters from "@/views/pages/products/filter/search-filters.vue"
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"
import { watchDebounced } from "@vueuse/core"

const isSearchOpen = defineModel({ type: Boolean, default: false })

const sword = ref()
const currentQuery = ref([])
const loading = ref(false)
const filters = ref({})
const products = ref([]) // Changed from a plain array to a ref

const toggleSearch = () => {
  isSearchOpen.value = false
}

const toggleSearchFilter = () => {

}

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
      products.value = []
    }
  },
  { debounce: 300, maxWait: 1000 }, // Configurable delay
)


const search = async () => {
  try {
    loading.value = true

    let body = {
      brands: [],
      models: [],
      colors: [],
      tags: [],
      sizes: [],
      categories: [],
      sword: sword.value,
      limit: 30, // used for pagination
      offset: 0,  // used for pagination
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
      method: "POST",
      body: body,
    })


    if (rs && rs.products) {
      products.value = rs.products
      if (!filters.value)
        filters.value = rs.filters


      total.value = rs.products.length
      showSearchWindow.value = true
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
    ng-controller="SearchCtrl"
    class="search__panel search__panel-results--empty ng-cloak"
  >
    <nav
      class="search-mobile__filters "
      ng-class="showFilters ? 'show' : ''"
    >
      <div
        class="search-mobile__filters-container"
        style="height:100%;"
      >
        <div class="search-mobile__filters-header">
          <button
            class="clear-filters"
            ng-click="resetFilters()"
          >
            Borrar filtros
          </button>
          <button
            class="close-filters"
            ng-click="toggleSearchFilter()"
          >
            <svg
              height="10"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 15"
              class="icon sprite-icons"
            >
              <use
                href="/content/svg/motomundi.svg?v=1.1#i-close"
                xlink:href="/content/svg/motomundi.svg#i-close"
              />
            </svg>
          </button>
        </div>
        <div class="search-mobile__filters-content">
          <SearchFilters v-model="filters" />
        </div>
        <div class="search-mobile__buttons">
          <button
            type="button"
            class="apply-filters"
            ng-click="toggleSearchFilter()"
          >
            Aplicar
          </button>
        </div>
      </div>
    </nav>
    <!-- /fiter container -->

    <section
      xxonmouseover="document.body.style.overflow='hidden';"
      xxonmouseout="document.body.style.overflow='auto';"
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
              ng-keyup="fullSearch(1, $event)"
              ng-blur="focus = false"
              ng-focus="focus = true"
              placeholder="Buscar en Moto"
            >
            <button
              type="submit"
              ng-click="redirectToSearch()"
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
        <p>
          <strong>{{ total }}</strong> resultados {{ loading }}
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


      <div
        v-if="products.length > 0"
        style="padding-left:12px;overflow-y:auto;"
        class="vue-virtual-scroller ready direction-vertical ng-hide"
      >
        <div
          infinite-scroll-parent="true"
          infinite-scroll-distance="0.5"
          infinite-scroll-disabled="false"
          infinite-scroll="next()"
          
          class="row vue-virtual-scroller__item-wrapper search__panel-results"
        >
          <VRow style="margin:0px;">
            <VCol
              v-for="product in products"
              cols="6"
              class="vue-virtual-scroller__item-view col s6 m4 l3"
              style="padding: 4px"
            >
              <ProductListItem :product="product" />
            </VCol>
          </VRow>
        </div>
        <div class="vue-virtual-scroller__slot" />
      </div>
    </section>
  </article>
</template>

<style>
.search__panel {
  background-color: #fff;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 58px;
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

.search__panel .search__input input{
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

.search-mobile__filters .search-mobile__filters-container {
  background-color: #fff;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh) * 100);
  justify-content: space-between;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  -webkit-transform: translateX(1000px);
  transform: translateX(1000px);
  transition: all .3s ease-in;
  width: 100vw;
  z-index: 2;
}

.search__panel .search__results-empty{
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
</style>
