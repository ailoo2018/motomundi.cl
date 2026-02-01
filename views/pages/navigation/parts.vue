<script setup lang="ts">
import BikeSelector from "@/views/pages/bike-selector.vue"
import PartsMegaMenuContent from "@/views/pages/navigation/parts-mega-menu-content.vue";

const props = defineProps({
  href: {
    type: String,
    required: true
  }
})
const href = props.href

</script>

<template>
  <li
    id="ni_1985_accesorios"
    class="l0 c3 main-nav"
    v-bind="props"
  >
    <a :href="href">
      <span>Accesorios</span>
    </a>
    <PartsMegaMenuContent/>
  </li>


</template>

<style lang="scss">

</style>
