<script setup>
import SearchFilters from "@/views/pages/products/filter/search-filters.vue"
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"

const filters = ref({})
const products = ref([]) // Changed from a plain array to a ref
</script>

<template>
  <article
    ng-if="isSearchOpen"
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
          ng-click="toggleSearch()"
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
              type="search"
              ng-model="masterSearch"
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
        ng-show="products.length == 0"
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
        class="search__results-summary"
        ng-show="products.length > 0"
      >
        <p>
          <strong>{{ total }}</strong> resultados {{ loading }}
        </p>
        <a ng-click="toggleSearchFilter()">Filtrar
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
        data-v-6ecb08ee=""
        ng-show="products.length > 0"
        style="padding-left:12px;"
        class="vue-virtual-scroller ready direction-vertical ng-hide"
      >
        <div
          infinite-scroll-parent="true"
          infinite-scroll-distance="0.5"
          infinite-scroll-disabled="false"
          infinite-scroll="next()"
          data-v-6ecb08ee=""
          class="row vue-virtual-scroller__item-wrapper search__panel-results"
        >
          <VRow style="margin:0px;">
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
        <div
          data-v-6ecb08ee=""
          class="vue-virtual-scroller__slot"
        />
      </div>
    </section>
  </article>
</template>

