<script setup>
const { data: brands } = useFetch("/api/product/brands", { key: "brands-all"})
</script>

<template>
  <nav id="navSec" class="menu-mobile__nav-sec"  >
    <ul>
      <li
        v-for="brand in brands.brands"
        :key="brand.id">
        <a
          :href="getBrandUrl(brand)"
          class="mtc-link"
        ><span>{{brand.name}}</span>
        </a>
      </li>

    </ul>
  </nav>
</template>


