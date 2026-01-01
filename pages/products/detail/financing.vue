<script setup lang="ts">

</script>

<template>
  <div
    class="financing"
  >
    <div
      class="financing__description"
    >
      <span >Desde <strong class="ng-binding">$19.158&nbsp;mes</strong> sin intereses (0% TAE)</span>
    </div>
    <div

      class="financing__logos"
    >
      <img
        src="/content/images/logos/webpay.png"
        alt="Webpay 12 hasta cuotas sin interéses"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">

.financing {
  align-items: center;
  border-top: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  margin: 10px 0 -15px;
  padding-top: 15px;
}

.financing .financing__description {
  font-size: 11px;
  text-align: left;
}

.financing .financing__description span strong {
  font-size: 13px;
  font-weight: 700;
}

.financing .financing__logos {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
}

.financing .financing__logos img {
  height: 20px;
  max-width: 60px;
  width: auto;
}

.financing .financing__logos {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
}

.financing .financing__logos img {
  height: 20px;
  max-width: 60px;
  width: auto;
}


</style>
