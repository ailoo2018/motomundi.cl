<script setup lang="ts">

</script>

<template>
  <section
    class="profile__orders ng-hide"
    ng-controller="OrdersCtrl"
    ng-show="latestOrders"
  >
    <h1>Últimos pedidos </h1>

    #parse('Account/PartialOrderList.vm')

    <a
      href="/cuenta/pedidos"
      data-dr="true"
      class="button--text-only mtc-link"
    >
      Ver todos
    </a>
  </section>
</template>

<style  lang="scss">
.profile .profile__orders {
  margin: 25px 0;
  width: 100%;
}

@media only screen and (min-width: 601px) {
  .profile .profile__orders {
    order: 4;
  }
}

</style>
