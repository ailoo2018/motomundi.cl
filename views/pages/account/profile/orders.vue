<script setup lang="ts">
import { onMounted } from "vue"
const token = useCookie("accessToken").value

const latestOrders = ref()

const viewOrder = order => {
  console.log("viewOrder", order)
}

onMounted(async () => {
  const latestOrdersRs = await $fetch("/api/account/latest-orders", {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json' },
  })

  latestOrders.value = latestOrdersRs.orders

})
</script>

<template>

  <section
    class="profile__orders ng-hide"
    ng-controller="OrdersCtrl"
    ng-show="latestOrders"
  >
    <h1>Últimos pedidos </h1>

    <div
      v-for="order in latestOrders"
      :key="order.id"
      class="account-order__detail simplified order "
      ng-class="getOrderClass(order)"
      @click="viewOrder(order)"
    >
      <span class="order-detail__type">
        <svg
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <title>{{ order.status }}</title>

          <use
            v-if="order.statusId == 1"
            href="/content/svg/motomundi.svg#i-icon-x-circle"
            xlink:href="/content/svg/motomundi.svg#i-icon-x-circle"
          />
          <use
            v-if="order.statusId == 2"
            href="/content/svg/motomundi.svg#i-order-check"
            xlink:href="/content/svg/motomundi.svg#i-order-check"
          />
        </svg>
        {{ order.status }}
      </span>
      <div class="order-detail__header">
        <div class="order-detail__totals">
          <span>1 artículo</span>
          <strong>{{ formatMoney(order.total)  }}</strong>
        </div>
        <div class="order-detail__estimate-date">
          <span>Entrega prevista</span>
          <span>
            <strong>{{ order.date  }}</strong>
          </span>
        </div>
        <div class="order-detail__thumbnails-list">
          <div
            class="order-detail__thumbnail"
            v-for="prd in order.products"
          >
            <img
              :src="prd.image"
              alt="X-Spirit 3 Marquez Motegi 3 TC-2"
              width="45"
              height="45"
            >
          </div>
        </div>
      </div>
    </div>

    <a
      href="/cuenta/pedidos"
      data-dr="true"
      class="button--text-only mtc-link"
    >
      Ver todos
    </a>
  </section>
</template>

<style lang="scss">
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
