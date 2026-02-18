<script setup lang="ts">
import Orders from "@/views/pages/account/profile/orders.vue";

definePageMeta({
  alias: '/cuenta/pedidos',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})
</script>

<template>
  <div class="col s12 m9 l9 account__content">
    <div>
      <div class="account-orders__header">
        <h1 class="account__title">
          <svg
            width="30"
            height="30"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use 
              href="/content/svg/motomundi.svg#i-account-orders"
              xlink:href="/content/svg/motomundi.svg#i-account-orders"
            />
          </svg>
          Mis pedidos
        </h1>
        <div class="account-orders__filter">
          <ul>
            <li class="active">
              <a>
                Online
              </a>
            </li>
            <li class="">
              <a> Tienda</a>
            </li>
          </ul>
          <div class="account-orders__return-product">
            <a 
              href="/realizar-cambio-o-devolucion.html"
              data-dr="true"
              class="mtc-link"
            >
              ¿Necesitas devolver un pedido?
              <svg
                width="14"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
                class="icon sprite-line-icons"
              >
                <use 
                  href="/content/svg/motomundi.svg#i-icon-info"
                  xlink:href="/content/svg/motomundi.svg#i-icon-info"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div
        class="account__content-block"
        ng-if="latestOrders"
      >
        <Orders />
        <nav
          class="load-more"
        >
          <ul
            class="pagination mobile-prev-next"
          />
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-orders__filter {
  margin-top: .67em;
}


.account-orders__filter ul {
  background-color: #f5f5f5;
  border-radius: 200px;
  display: flex;
  font-size: 10px;
  font-weight: 700;
  justify-content: space-between;
  text-align: center;
  text-transform: uppercase;
  width: auto;
}

.account-orders__filter ul li {
  display: inline;
  flex: 1 1 auto;
}

.account-orders__filter ul li.active a {
  background-color: #000;
  color: #fff;
}

.account-orders__filter ul a {
  align-items: center;
  border-radius: 200px;
  color: #000;
  display: flex;
  height: 29px;
  justify-content: space-around;
  margin: 4px;
  padding: 0 25px;
}

.account-orders__filter ul li {
  display: inline;
  flex: 1 1 auto;
}

.account-orders__filter .account-orders__return-product {
  height: 21px;
}

.account-orders__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
}

.account-orders__filter .account-orders__return-product a {
  color: #000;
  display: block;
  font-size: 11px;
  line-height: 16px;
  padding-top: 5px;
  text-align: right;
  text-transform: uppercase;
}


@media only screen and (max-width: 600px) {
  .account-orders__filter ul a {
    padding: 0 12px;
  }
}

@media only screen and (max-width: 600px) {
  .account-orders__filter .account-orders__return-product a {
    font-weight: 500;
    text-align: center;
  }
}

@media only screen and (max-width: 600px) {
  .account-orders__header {
    flex-direction: column;
  }
}
</style>
