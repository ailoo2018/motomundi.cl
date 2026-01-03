<script setup lang="ts">

const props = defineProps({
  widget: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <VAlert>
    Component not found
  </VAlert>
<p>{{widget}}</p>
</template>

<style scoped lang="scss">

</style>
