<script setup lang="ts">
const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})

</script>

<template>
  <VCard
    variant="plain"
    class="order-detail__addresses"
  >
    <h3> Direcciones</h3>
    <div class="shipping-address">
      <h4 class="order-detail__address-type">
        Envío
      </h4>
      <div>
        <p>
          {{ order.shippingAddress?.name }}
          <br>
          {{ order.shippingAddress?.address }},
          <br>
          <span ng-if="order.shippingAddress?.postalCode">{{ order.shippingAddress?.postalCode }} - </span>
          {{ order.shippingAddress?.comuna?.name }}
        </p>
        <p>
          {{ order.shippedTo?.email }}<br>
          {{ order.shippedTo?.phone }}
        </p>
      </div>
    </div>
    <div class="shipping-address">
      <h4 class="order-detail__address-type">
        Facturación
      </h4>
      <div v-if="order.invoicedTo">
        <p>
          {{ order.invoicedTo.name }}<br>
          {{ order.invoicedTo.address }},<br>
          <span ng-if="order.invoicedTo.postalCode">{{ order.invoicedTo.postalCode }} - </span>
          {{ order.invoicedTo?.comuna?.name }}
        </p>
        <p>
          {{ order.invoicedTo?.email }}<br>
          {{ order.invoicedTo?.phone }}
        </p>
      </div>
      <div v-if="!order.invoicedTo">
        <p>
          {{ order.customer?.name }}<br>
          <span ng-if="order.customer?.address">{{ order.customer?.address }},<br></span>
          <span ng-if="order.customer?.postalCode">{{ order.customer?.postalCode }} - </span>
          {{ order.customer?.comuna?.name }}
        </p>
        <p>
          {{ order.customer?.email }}<br>
          {{ order.customer?.phone }}
        </p>
      </div>
    </div>
  </VCard>
</template>

<style scoped lang="scss">

</style>
