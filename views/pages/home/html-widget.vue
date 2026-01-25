<script setup lang="ts">
const props = defineProps({
  widget: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div v-html="widget.configuration?.contenido"></div>
</template>

<style scoped lang="scss">

</style>
