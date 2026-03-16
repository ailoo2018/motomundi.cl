<!-- components/AppLoader.vue -->
<script setup>
const { isLoading, progress } = useLoadingIndicator()
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-fullscreen">

      <!-- Optional thin bar at the top still showing progress -->
      <div class="loading-bar" :style="{ width: progress + '%' }" />

      <!-- Centered content -->
      <div class="loading-content">
        <div class="loading-ring">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Background track -->
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              stroke-width="6"
            />
            <!-- Spinning arc -->
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="#b21a15"
              stroke-width="6"
              stroke-linecap="round"
              stroke-dasharray="180 300"
              stroke-dashoffset="0"
            />
          </svg>
        </div>

        <p class="loading-label">Cargando...</p>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
.loading-fullscreen {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Thin progress bar still visible at the very top */
.loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: #b21a15;
  box-shadow: 0 0 8px #b21a15;
  transition: width 0.3s ease;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loading-ring {
  width: 80px;
  height: 80px;
  animation: rotate 0.9s linear infinite;
  filter: drop-shadow(0 0 8px rgba(178, 26, 21, 0.8));
}

.loading-label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
