<!-- components/AppLoader.vue -->
<script setup>
const { isLoading, progress } = useLoadingIndicator()
</script>

<template>
  <div v-if="isLoading" class="loading-bar" :style="{ width: progress + '%' }" />
</template>

<style scoped>
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: #b21a15;
  transition: width 0.3s ease;
  z-index: 9999;
}
</style>
