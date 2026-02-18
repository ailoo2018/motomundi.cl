<script setup lang="ts">
import OrderHistory from "@/views/pages/account/orders/OrderHistory.vue"
import OrderShippingAddress from "@/views/pages/account/orders/OrderShippingAddress.vue";
import OrderReturn from "@/views/pages/account/orders/OrderReturn.vue";

definePageMeta({
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

const route = useRoute()

const {data, error} = useFetch("/api/account/orders/" + route.params.id)

const order = data

const startReturn = () => {

}


const getStatusDescription = statusId => {
  return useOrderStatus().getOrderStatusDescription(statusId)
}

const getDescription = state => {
  return ""
}
</script>

<template>
  <VContainer class="pa-0 ma-0">
    <div class="account__content">
      <div class="account__order">
        <div class="account-orders__header mb-5" >
          <h1 class="account__title" style="border-bottom: 1px solid #ccc;">
            <svg
              class="sprite-line-icons"
              width="30"
              height="30"
            >
              <use href="/content/svg/motomundi.svg#i-account-orders"/>
            </svg>
            Pedido #{{ order.id }}
          </h1>
        </div>
        <!-- /header -->

        <VRow class="account__content-block">
          <VCol
            cols="12"
            md="8"
          >
            <div class="account-order">
<!--
              <div class="order-detail__header my-5">
                <h3 class="order-detail__order-id">
                  Pedido #{{ order.id }}
                </h3>
              </div>
-->
              <div class="order-detail__body">
                <div class="order-detail__tracking">
                  <div class="order-detail__order-status">
                    Estado del pedido:
                    <strong class="sent">{{ getStatusDescription(order.state) }}</strong>
                  </div>
                  <div class="order-detail__estimated-date">
                    Fecha de entrega prevista:
                    <strong class="">{{ formatDate(order.eta) }}</strong>
                  </div>
                  <VCard
                    variant="plain"
                    class="order-detail__status my-6"
                  >
                    <VCardText class="pa-0">
                      <div class="order-status__container">
                        <h3>Historial</h3>
                        <OrderHistory :journal="order.journals"/>
                      </div>
                    </VCardText>
                  </VCard>
                </div>
                <div id="cart-products">
                  <h3>Productos</h3>
                  <ul>
                    <li
                      v-for="item in order.items"
                      :key="item.id"
                    >
                      <div class="cart-item">
                        <article
                          v-if="item.type === 111"
                          class="d-flex "
                        >
                          <span
                            style="width: 100px;"
                            class="align-center text-center"
                          >
                            <VIcon
                              class="tabler-send"
                              color="success"
                              size="40"
                            />
                          </span>
                          <div class="cart-product__info">
                            <h1>Costo de envío</h1>
                            <div class="cart-product__details">
                              {{ item.comment }}
                            </div>
                          </div>
                        </article>
                        <article
                          v-if="item.type === 1"
                          class="cart-product__wrapper"
                        >
                          <a
                            class="cart-product mtc-link d-flex"
                            :href="item.link"
                          >
                            <span>

                              <VImg
                                v-if="item.productItem"
                                width="100"
                                :src="getImageUrl( item.productItem?.image, 150, getDomainId())"
                                :alt="item.productItem.product?.fullName"
                                class="cdn-img"
                              />
                            </span>

                            <div class="cart-product__info">
                              <h1
                                v-if="item.productItem"
                                class="cart-product__name"
                              >{{ item.productItem?.product?.fullName }}</h1>
                              <h1
                                v-else
                                class="cart-product__name"
                              >{{ item.description }} {{ item.comment }}</h1>
                              <div class="cart-product__details"/>
                              <div
                                v-if="item.size"
                                class="cart-product__size"
                              >Talla:
                                {{ item.size.name }}
                              </div>
                              <div
                                v-if="item.color"
                                class="cart-product__size"
                              >Color:
                                {{ item.color.name }}
                              </div>
                              <div class="cart-product__quantity">Cantidad: {{ item.quantity }}
                              </div>
                            </div>
                            <p class="cart-product__price">
                              <span class="price">{{ item.subtotal }}</span>
                              <span class="product-old-price strike"/>
                            </p>
                          </a>
                        </article>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <div class="order-detail__sidebar">
              <VCard
                variant="plain"
                elevation="0"
                class="order-detail__details mt-5 mb-10"
              >
                <h3>Detalles</h3>
                <p><strong>Fecha de pedido:</strong> {{ formatDate(order.orderDate) }}</p>
                <p><strong>Método de pago:</strong> {{ order.paymentMethod?.name }}</p>
                <p><strong>Método de envío:</strong> {{ order.shipmentMethod?.description }}</p>
                <p v-if="order.trackingId">
                  <strong>Seguimiento:</strong>
                  <span class="details__tracking-link">
                    <a
                      href="https://www.seur.com/miseur/mis-envios/?code=E15P_1299444"
                      target="_blank"
                      rel="noopener noreferrer"
                    >{{ order.trackingId }}</a>
                    <svg
                      class="sprite-line-icons"
                      width="16"
                      height="16"
                    >
                      <use href="/content/svg/motomundi.svg#i-icon-copy"/>
                    </svg>
                  </span>
                </p>
              </VCard>
              <VCard
                variant="plain"
                elevation="0"
                class=" order-detail__totals mt-5 mb-10"
              >
                <h3>Resumen de pedido</h3>
                <dl>
                  <dt>Subtotal</dt>
                  <dd>{{ formatMoney(order.netTotal) }}</dd>
                  <dt>Impuestos (I.V.A.)</dt>
                  <dd>{{ formatMoney(order.iva) }}</dd>
                  <dt>Gastos de envío</dt>
                  <dd v-if="order.shipping > 0">
                    {{ formatMoney(order.shipping) }}
                  </dd>
                  <dd v-if="order.shipping == 0">
                    Envío grátis
                  </dd>

                  <dt>Total</dt>
                  <dd>{{ formatMoney(order.total) }}</dd>
                </dl>
              </VCard>
              <OrderShippingAddress :order="order" />
              <OrderReturn :order="order"/>

              <VCard
                variant="plain"
                color="surface"
                class="order-detail__help my-5"
              >
                <VCardText class="pa-0">
                  <h3>
                    ¿Tienes
                    dudas?
                  </h3>
                  <p style="color:black;">
                    Consulta nuestra sección de <a href="/contactanos.html">ayuda y
                    atención al cliente</a>.
                  </p>
                </VCardText>
              </VCard>
            </div>
          </VCol>
        </VRow>
      </div>
    </div>
  </VContainer>
</template>

<style scoped>
.v-card--variant-plain {
  opacity: 1;
}

h3 {
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 700;
  margin: 4px 0 16px;
  padding-bottom: 8px;
  text-transform: uppercase;
}

.account__order .account-order h3 {
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 700;
  margin: 4px 0 16px;
  padding-bottom: 8px;
  text-transform: uppercase;
}

 .order-detail__body .order-detail__order-status {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
}


.order-detail__totals dl {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;
}


 .order-detail__totals dl dd {
  text-align: right;
}
 .order-detail__totals dl dd:last-of-type, .order-detail__totals dl dt:last-of-type {
  font-weight: 700;
  margin-top: 16px;
  text-transform: uppercase;
}

 .order-detail__totals dl dd,  .order-detail__totals dl dt {
  margin: 8px 0 0;
}
.order-detail__totals dl dd:last-of-type,  .order-detail__totals dl dt:last-of-type {
  font-weight: 700;
  margin-top: 16px;
  text-transform: uppercase;
}

.order-detail__totals dl dd:last-of-type,  .order-detail__totals dl dt:last-of-type {
  font-weight: 700;
  margin-top: 16px;
  text-transform: uppercase;
}

.order-detail__address-type {
  display: inline-block;
  padding: 0;
}

h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 4px 0;
}
</style>

