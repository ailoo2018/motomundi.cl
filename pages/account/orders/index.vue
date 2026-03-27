<script setup>
import Orders from "@/views/pages/account/profile/orders.vue"

definePageMeta({
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

</script>

<template>
<VContainer>
  <Orders />
</VContainer>
</template>


<style scoped>
</style>
