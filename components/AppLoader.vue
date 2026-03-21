<!-- components/AppLoader.vue -->
<script setup>
const { isLoading, progress } = useLoadingIndicator()
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading">
      <!-- Progress bar -->
      <div class="loading-bar" :style="{ width: progress + '%' }" />



      <!-- Page dimmer -->
      <div class="loading-overlay" />
    </div>
  </Transition>
</template>

<style scoped>
/* Bar */
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #b21a15;
  box-shadow: 0 0 10px #b21a15, 0 0 5px #ff4444;
  transition: width 0.3s ease;
  z-index: 99999;
}

/* Spinning circle bottom-right */
.loading-spinner {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  z-index: 99999;
  animation: rotate 0.8s linear infinite;
}

/* Page dim */
.loading-overlay {
  position: fixed;
  inset: 0;

  z-index: 100000000;
  pointer-events: none; /* so user can still interact if needed */
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

/* Smooth appear/disappear */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
