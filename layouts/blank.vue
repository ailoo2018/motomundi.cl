<script setup>
useHead({
  link: [
    { rel: 'stylesheet', href: '/css/checkout.css' },
  ],
})
</script>

<template>
  <VApp>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>



<style lang="scss">
body {
  background: none;
}
</style>
