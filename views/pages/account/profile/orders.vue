<script setup lang="ts">
import {onMounted} from "vue"

const token = useCookie("accessToken").value

const latestOrders = ref()

const viewOrder = order => {
  console.log("viewOrder", order)
  navigateTo("/account/orders/" + order.id)
}

onMounted(async () => {
  const latestOrdersRs = await $fetch("/api/account/latest-orders", {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json'
    },
  })

  latestOrders.value = latestOrdersRs.orders

})


const OrderStatus = {
  1: {id: 1, color: "text-secondary", icon: "tabler-transfer-in"},
  2: {id: 2, color: "text-success", icon: "tabler-circle-check"},
  3: {id: 3, color: "text-info", icon: "tabler-send"},
  4: {id: 4, color: "text-error", icon: "tabler-circle-x"},
  10: {id: 10, color: "text-success", icon: "tabler-circle-check"},
  11: {id: 11, color: "text-error", icon: "tabler-circle-x"},
}

const getOrderClass = order => {
  return OrderStatus[order.statusId]?.color
}

const getOrderIcon = order => {
  return OrderStatus[order.statusId]?.icon

}
</script>

<template>

  <section class="profile__orders ng-hide">
    <h1>Últimos pedidos </h1>

    <div
      v-for="order in latestOrders"
      :key="order.id"
      class="account-order__detail simplified order "

      @click="viewOrder(order)"
    >
      <span class="order-detail__type " :class="getOrderClass(order)">

        <VIcon :class="getOrderIcon(order)"></VIcon>


       {{ order.status }}
      </span>
      <div class="order-detail__header">
        <div class="order-detail__totals">
          <div class="h2 font-weight-bold">N° {{order.id}}</div>
          <span>{{order.products?.length}} artículo</span>
          <strong>{{ formatMoney(order.total) }}</strong>
        </div>
        <div class="order-detail__estimate-date">
          <span>Entrega prevista</span>
          <span>
            <strong>{{ formatDate(order.date, { month: 'numeric', day: 'numeric', year: 'numeric' }) }}</strong>
          </span>
        </div>

        <div class="order-detail__thumbnails-list">

          <div class="v-avatar-group demo-avatar-group">

            <VAvatar
              v-for="pit in order.products"
              :size="50"
            >
              <VImg :src="getImageUrl( pit.image, 50, getDomainId())"/>
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ pit.description }}
              </VTooltip>
            </VAvatar>
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

.account-order__detail.order__error .order-detail__type {
  color: #fd5f5f;
}

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
