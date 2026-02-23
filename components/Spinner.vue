<script setup lang="ts">

const show = defineModel({
  show: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div
    v-if="show"
    style="height: 60px;"
  >
    <div class="spinner-container">
      <div class="spinner" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.spinner-container {
  /* Position the spinner container */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Center the spinner */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Semi-transparent overlay */
  background-color: rgba(255, 255, 255, 0.8);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #e5e5e5;
  border-top: 4px solid #c74044;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
