<script setup lang="ts">
import BikeSelector from "@/views/pages/bike-selector.vue"

const { data: rs } = await useFetch("/api/categories/leafs?parentId=9&parentId=27", {
  key: "leaf-categories",
})

const categories = rs.value.categories
</script>


<template>
  <nav
    id="navSec"
    class="menu-mobile__nav-sec"
  >
    <div>
      <ul>
        <li>
          <a
            href="/lubricantes-y-fluidos-para-motos" 
            class="mtc-link"
          ><img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/61-moto-accesorios-aceites.svg"
            alt="Aceites"
          > <span>Aceites</span></a>
        </li>
        <li>
          <a
            href="/seguridad" 
            class="mtc-link"
          ><img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/62-moto-accesorios-antirrobos.svg"
            alt="Antirrobos"
          > <span>Antirrobos</span></a>
        </li>
        <li>
          <a
            href="/bolsos-para-moto"
            class="mtc-link"
          ><img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/63-moto-accesorios-bolsas-motos.svg"
            alt="Bolsas"
          > <span>Bolsas</span></a>
        </li>
        <li>
          <a
            href="/maletas-para-motos" 
            class="mtc-link"
          >
            <img
              width="40"
              height="40"
              src="/content/assets/images/mobile-menu/categories/64-moto-accesorios-maletas.svg"
              alt="Maletas"
            > <span>Maletas</span></a>
        </li>
        <li>
          <a
            href="/anclajes-para-maletas-moto"
            class="mtc-link"
          ><img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/packs-maletas-anclajes.svg"
            alt="Maletas + anclajes"
          > <span>Maletas + anclajes</span></a>
        </li>
        <li>
          <a
            href="/escapes" 
            class="mtc-link"
          ><img
            width="40"
            height="40"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNCIgaGVpZ2h0PSIzNCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii44IiBkPSJNNS45MjMgNy42NjRMMTkuOTk3IDcuNGwtMy4zNzkgNS43MDJMMjMuMDczIDcuNGg2LjIxMmwtOC45NzggMTUuMmgtNC45NjRsMy43NzgtNi40MTctMy4xNTMgMS4wMTQtLjcxMy0xLjE5LTQuMjQgNi41OTNINS43MDJsNi45MDEtMTEuNjQ3LTYuNjgtMy4yOXoiLz48L3N2Zz4="
            alt="Escapes"
          > <span>Escapes</span></a>
        </li>
      </ul>
      <div class="bike-selector__container">
        <div
          class="bike-search"
          style=""
        >
          <h2
            class="h3 mt-4"
            style="background-color: white; color: black"
          >
            Elige tu modelo de moto para ver accesorios específicos
          </h2> 
          <div class="bike-search-filter">
            <div class="bike-selector">
              <div class="s12 m9 l10 col px-8 mb-8">
                <BikeSelector
                  ng-if="!hideSelector"
                  filter-bike-with-products="true"
                  on-bike-select="bikeSelected(bike)"
                />
              </div>
            </div>
          </div>
          <div
            class="add-bike"
            style="display: none;"
          />
        </div>
      </div>
      <h2 class="menu-mobile__divider">
        Otros
      </h2>


      <ul class="outstanding-list">
        <li
          v-for="category in categories"
          :key="category.id"
        >
          <a 
            :href="category.url"
            class="mtc-link"
          >
            <span>{{ category.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>


