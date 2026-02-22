<script setup lang="ts">

const nodeEnv = process.env.NODE_ENV
const commerceCode = process.env.WEBPAY_COMMERCE_CODE
const wuid = useGuestUser().value
const token = useCookie( "accessToken").value
</script>

<template>

  <p>Node env: {{nodeEnv}}</p>
  <p>wuid: {{wuid}}</p>
  <p>token: {{accessToken}}</p>
</template>

<style scoped lang="scss">

</style>
