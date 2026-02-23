<script setup>
const { data } = useFetch("/api/product/brands", { key: "brands-all"})

const brands = computed(() => {
  return data.value?.brands || []
})
</script>

<template>
  <nav id="navSec" class="menu-mobile__nav-sec"  >
    <ul>
      <li
        v-for="brand in brands"
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


