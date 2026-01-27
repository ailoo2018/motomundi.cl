<script setup lang="ts">

const nodeEnv = process.env.NODE_ENV
const commerceCode = process.env.WEBPAY_COMMERCE_CODE

</script>

<template>

  <p>Node env: {{nodeEnv}}</p>
  <p>Webpay commerce code: {{commerceCode}}</p>
</template>

<style scoped lang="scss">

</style>
