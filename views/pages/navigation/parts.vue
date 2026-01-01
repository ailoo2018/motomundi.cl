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

  <VMenu
    open-on-hover
    :close-on-content-click="false"
    attach="#menu-anchor"
    location="bottom"
    class="mega-menu-wrapper "
    width="100%"
    content-class="centered-mega-menu"
  >
    <template #activator="{ props }">
      <li
        id="ni_1985_accesorios"
        class="l0 c3 main-nav"
        v-bind="props"
      >
        <a :href="href">
          <span>Accesorios</span>
        </a>
      </li>
    </template>
    <PartsMegaMenuContent />
  </VMenu>
</template>

<style lang="scss">

</style>
