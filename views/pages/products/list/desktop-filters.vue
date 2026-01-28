<script setup lang="ts">
import FacetGroup from "@/views/pages/products/filter/facet-group.vue"
import SearchFilters from "@/views/pages/products/filter/search-filters.vue";

const filters = defineModel({
  type: Array,
  default: () => []
})

const orderBy = ref()

/*        <option
          value="name:asc"
          selected="selected"
        >
          Orden: Marca
        </option>
        <!-- <option value="best_seller" >Popularidad</option> -->
        <option value="newest:asc">
          Orden: Novedades
        </option>
        <option value="bestseller">
          Orden: Más Vendidos
        </option>
        <option value="price:asc">
          Orden: Precio Menos a Más
        </option>
        <option value="price:desc">
          Orden: Precio Más a Menos
        </option>*/
const sorts = [
  { id: "name:asc", name: "Orden: Marca" },
  { id: "newest:asc", name: "Orden: Novedades" },
  { id: "bestseller", name: "Orden: Más Vendidos" },
  { id: "price:asc", name: "Orden: Precio Menos a Más" },
  { id: "price:desc", name: "Orden: Precio Más a Menos" },
]

orderBy.value = sorts[0]

const isShowFilters = ref(false)



const removeAllFilters = () => {

}

const showFilters  = () => {
  isShowFilters.value = !isShowFilters.value
}
</script>

<template>
  <div class="container desktop__filters mb-7">
    <div class="desktop__filters-main">
      <div class="facets-desktop__main">
        <div class="facets-bar-desktop">
          <VBtn
            :rounded="0"
            color="#c74044"
          >
            <svg
              class="icon sprite-line-icons"
              height="16"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use
                style="stroke: white;"
                href="/content/svg/motomundi.svg#i-icon-filters"
                xlink:href="/content/svg/motomundi.svg#i-icon-filters"
              />
            </svg>
            Filtrar
            <VMenu 
              activator="parent"
              :close-on-content-click="false"
            >
              <div class="facets-desktop__container fade ">
                <div class="facets-desktop__container-content">
                  <nav class="facets-desktop">
                    <ul ng-init="isShowAttrCat = {}">
                      <li class="facets__in-use">
                        <div class="in-use__header">
                          <strong>Tus filtros</strong>
                          <a
                            class="in-use__remove"
                            @click="removeAllFilters"
                          >
                            Eliminar todos
                          </a>
                        </div>
                      </li>


                      <SearchFilters v-model="filters" />



                      <li
                        class="facet"
                        ng-class="isShowColors ? 'expanded' : ''"
                        ng-init="isShowColors = false;"
                      >
                        <button ng-click="isShowColors = !isShowColors;">
                          Colores
                          <!-- ngIf: getTotalSelected(6) > 0 -->
                        </button>
                        <ul
                          class="facets-mobile__list ng-hide"
                          ng-show="isShowColors"
                        >
                          <li class="colors">
                            <!-- ngRepeat: color in filterTree.colors -->
                          </li>
                        </ul>
                      </li>
                      <!-- /colores -->

                    </ul>
                  </nav>
                </div>
              </div>
            </VMenu>
          </VBtn>
        </div>
      </div>
<!--
      <div  class="fast-delivery-button hide-on-small-only">
        <nav class="fast-delivery">
          <span
            class="mtc-link fake-checkbox"
            data-dr="true"
            style="block-size: 42px;"
          >
            <span>En stock</span>
          </span>
        </nav>
      </div>
-->
      <div
        class="most-used-filters"
        style="display: none;"
      >
        <strong>Filtros más usados</strong>
        <nav class="most-used">
          <div
            class="most-used__nav-button most-used__nav-button--left"
            style="display: none;"
          >
            <svg
              class="icon sprite-line-icons"
              height="14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            ><title>Angle left</title>
              <use
                href="/content/svg/motomundi.svg#i-icon-angle-left"
                xlink:href="/content/svg/motomundi.svg#i-icon-angle-left"
              />
            </svg>
          </div>
          <h2>
            <span
              class="mtc-link"
              data-dr="true"
            >        Equipación carretera
            </span>
          </h2>
          <h2>
            <span
              class="mtc-link"
              data-dr="true"
            >
              SHOEI
            </span>
          </h2>
          <h2>
            <span
              class="mtc-link"
              data-dr="true"
            >
              Equipación motocross
            </span>
          </h2>
          <h2>
            <span
              class="mtc-link"
              data-dr="true"
            >
              ARAI      </span>
          </h2>
          <h2>
            <span
              class="mtc-link"
              data-dr="true"
            >
              AGV
            </span>
          </h2>
          <div
            class="most-used__nav-button most-used__nav-button--right"
            style="display: none;"
          >
            <svg
              class="icon sprite-line-icons"
              height="14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            ><title>Angle right</title>
              <use
                href="/content/svg/motomundi.svg#i-icon-angle-right"
                xlink:href="/content/svg/motomundi.svg#i-icon-angle-right"
              />
            </svg>
          </div>
        </nav>
      </div>
    </div>
    <div class="desktop__sort">
      <VSelect v-model="orderBy" :items="sorts" return-object item-value="id" item-title="name"></VSelect>
    </div>
  </div>
</template>

<style  lang="scss">
.desktop__filters {
  display: flex;
  justify-content: space-between;
  margin-block-end: 20px;
}

.facets-desktop__container > .facets-desktop__container-content {
  position: relative;
}

.facets-bar-desktop button svg {
  margin-inline-end: 8px;
}

.desktop__filters-main {
  display: flex;
  flex: 1 1 auto;
}

.facets-bar-desktop button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background-color: #d6001c;
  block-size: 45px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  inline-size: 100%;
  line-height: 45px;
  max-inline-size: 350px;
  padding-block: 0;
  padding-inline: 30px;
  text-transform: uppercase;
}

.facets-bar-desktop {
  position: relative;
}

.facets-desktop__container {
  position: absolute;
  z-index: 200;
  box-shadow: 0 0 45px 0 rgba(0, 0, 0, 30%);
  inline-size: 350px;
  inset-block-start: 100%;
  inset-inline: 0;
  overflow-y: auto;
}

.desktop__filters {
  display: flex;
  justify-content: space-between;
  margin-block-end: 20px;
}

.desktop__filters-main {
  display: flex;
  flex: 1 1 auto;
}

.facets-bar-desktop {
  position: relative;
}

.facets-desktop {
  background-color: #fff;
  box-shadow: -10px 0 20px 0 rgba(0, 0, 0, 15%);
  overflow-y: auto;
}

/*** filters **/

.product-index-results__active-filters,
.product-index-results__mobile-header,
.product-index-results__product-tiles {
  float: inline-start;
  inline-size: 100%;
  padding-inline: 30px 0.3125rem;
}

@media screen and (min-width: 80em) {
  .product-index-active-filter {
    font-size: 16px;
  }
}

.product-index-active-filter,
.product-index-active-filter:hover {
  color: #151211;
}

.product-index-active-filter {
  display: inline-block;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 15%);
  line-height: 1;
  margin-block-end: 15px;
  margin-inline-end: 10px;
  white-space: nowrap;
}

.product-index-active-filter::after {
  display: inline-block;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%209.4%2010.4%27%3E%3Cpath%20fill%3D%27%23151211%27%20d%3D%27M9.05,10.05a1.2,1.2,0,0,1-1.7,0L4.7,7l-2.65,3a1.2,1.2,0,0,1-1.7-1.7L3.11,5.2.35,2.05A1.2,1.2,0,0,1,2.05.35l2.65,3,2.65-3a1.2,1.2,0,0,1,1.7,1.7L6.29,5.2,9.05,8.35A1.2,1.2,0,0,1,9.05,10.05Z%27%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
  background-position: 50%;
  background-repeat: no-repeat;
  block-size: 12px;
  content: "";
  inline-size: 6px;
  margin-inline-start: 8px;
}

.product-index-active-filter__clear-all {
  display: inline-block;
  margin-block-end: 15px;
  white-space: nowrap;
}

.fast-delivery-button .fast-delivery {
  display: flex;
  block-size: calc(100% - 1px);
}

.fast-delivery-button .mtc-link {
  display: flex;
  align-items: center;
  align-self: stretch;
  border: 2px solid #e1e1e1;
  background-color: #ebebeb;
  color: #000;
  font-size: 11px;
  font-weight: 700;
  margin-block: 0;
  margin-inline: 5px;
  padding-block: 0;
  padding-inline: 15px 25px;
  text-transform: uppercase;
  white-space: nowrap;
}

.fake-checkbox span,
.fake-radio span {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 12px;
  user-select: none;
}

.facet ul {
  /* display: none; */
  padding-block: 15px;
  padding-inline: 20px;
}

.facets-mobile__list li:not(.colors) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-block-end: 5px;
}

.fake-checkbox,
.fake-radio {
  block-size: 24px;
  color: #000;
  font-size: 12px;
  font-weight: 500;
}

.fake-checkbox span,
.fake-radio span {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 12px;
  user-select: none;
}

.fake-checkbox span::before,
.fake-radio span::before {
  display: block;
  flex: 0 0 18px;
  border: 1px solid #000;
  block-size: 18px;
  content: "";
  inline-size: 18px;
  margin-inline-end: 8px;
  transition: 0.2s;
}

.facets-mobile__list li .mtc-link,
.facets-mobile__list li > div {
  flex: 0 1 auto;
  max-inline-size: 65%;
}

.facets-mobile__list li:not(.colors) .filters__extras {
  display: flex;
  margin-inline-start: auto;
  max-block-size: 18px;
  min-inline-size: 0;
}

.facets-mobile__list li:not(.colors) strong {
  border-radius: 200px;
  background-color: #e8e8e8;
  font-size: 12px;
  font-weight: 500;
  min-inline-size: 18px;
  padding-block: 0;
  padding-inline: 10px;
  text-align: center;
}

.facets__in-use {
  background-color: #f5f5f5;
  padding-block: 15px;
  padding-inline: 20px;
}

.in-use__header {
  display: flex;
  justify-content: space-between;
}

.in-use__header strong {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.in-use__header a,
.in-use__header span {
  display: flex;
  align-items: center;
  padding: 0;
  color: #d6001c;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
}

.facet > button {
  position: relative;
  background-color: #fff;
  border-block-start: 1px solid #ebebeb;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  inline-size: 100%;
  padding-block: 15px;
  padding-inline: 20px;
  text-align: start;
  text-transform: uppercase;
}

.facet > button::after {
  position: absolute;
  display: block;
  background: #fff url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUIwMDEyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS4yOCIgZD0iTTEyLjQzIDYuNzczSDEuNTdNNyAxLjM0M3YxMC44NjEiLz48L3N2Zz4=") 50% no-repeat;
  block-size: 10px;
  content: "";
  inline-size: 10px;
  inset-block-start: 50%;
  inset-inline-end: 20px;
  transform: translateY(-50%);
}


.fake-checkbox.checked span:before {
  background: #000 url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSI4Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjgiIGQ9Ik05IDFMMy41IDYuNSAxIDQiLz48L3N2Zz4=) 50% no-repeat;
}

.fake-checkbox span:before, .fake-radio span:before {
  border: 1px solid #000;
  content: "";
  display: block;
  flex: 0 0 18px;
  height: 18px;
  margin-right: 8px;
  transition: .2s;
  width: 18px;
}

/*** v checkbox ***/

.v-checkbox .v-selection-control__input {
  /* Make it square */
  border-radius: 0 !important;
}

/* Target the checkbox icon/box itself */
.v-checkbox .v-selection-control__input .v-icon {
  border-radius: 0 !important;
}

/* Style the unchecked state - square with black outline */
.v-checkbox .v-selection-control__input::before {
  border: 2px solid #000 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}

/* Style the checked state */
.v-checkbox .v-selection-control__input .v-icon {
  color: #000 !important;
}

/* Alternative approach - more specific targeting */
.v-checkbox-custom .v-selection-control__wrapper {
  .v-selection-control__input {
    border-radius: 0;

    &::before {
      border: 2px solid #000;
      border-radius: 0;
      opacity: 1;
    }

    .v-icon {
      color: #000;
    }
  }
}
</style>
