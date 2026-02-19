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
        <p class="mb-3">
          {{ order.shippingAddress?.name }} {{ order.shippingAddress?.surname }}
          <br>
          RUT: {{ order.shippingAddress?.rut }}
          <br>
          {{ order.shippingAddress?.address }},
          <br>
          <span v-if="order.shippingAddress?.postalCode">{{ order.shippingAddress?.postalCode }} - </span>
          {{ order.shippingAddress?.comuna?.name }}
        </p>
        <p class="mb-3">
          {{ order.shippedTo?.email || order.customer?.email }}<br>
          {{ order.shippedTo?.phone || order.customer?.phone }}
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
          {{ order.invoicedTo.address || order.shippingAddress?.address }},<br>
          <span v-if="order.invoicedTo.postalCode">{{ order.invoicedTo.postalCode }} - </span>
          {{ order.invoicedTo?.comuna?.name }}
        </p>
        <p>
          {{ order.invoicedTo?.email || order.customer?.email }}<br>
          {{ order.invoicedTo?.phone || order.customer?.phone }}
        </p>
      </div>
      <div v-if="!order.invoicedTo">
        <p class="mb-3">
          {{ order.customer?.name }}<br>
          RUT: {{ order.customer?.rut || order.shippingAddress?.rut }}<br>
          <span >{{ order.customer?.address || order.shippingAddress?.address }},<br></span>
          <span v-if="order.customer?.postalCode">{{ order.customer?.postalCode || order.shippingAddress?.postalCode}} - </span>
          {{ order.customer?.comuna?.name || order.shippingAddress?.comuna?.name}}
        </p>
        <p class="mb-3">
          {{ order.customer?.email || order.shippedTo?.email }}<br>
          {{ order.customer?.phone || order.shippedTo?.phone }}
        </p>
      </div>
    </div>
  </VCard>
</template>

<style  lang="scss">

</style>
