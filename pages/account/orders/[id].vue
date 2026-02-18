<script setup lang="ts">
definePageMeta({
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

const order = ref({ status: null, shippedTo: {}, paymentMethod: {}, invoicedTo: {}, receivedBy: {} })

const getDescription = () => {
  return ""
}

</script>

<template>
  <div class="row">
    <div class="account__content">
      <div>
        <div class="account-orders__header">
          <h1 class="account__title">
            <svg
              class="sprite-line-icons"
              width="30"
              height="30"
            >
              <use href="/content/svg/motomundi.svg#i-account-orders" />
            </svg>
            Mis pedidos
          </h1>
        </div>
        <div class="account__content-block">
          <div
            id="2598094"
            class="account-order__detail"
          >
            <div class="order-detail__header">
              <h2 class="order-detail__order-id">
                Pedido #${order.Number}
              </h2>
            </div>
            <div class="order-detail__body">
              <div class="order-detail__tracking">
                <div class="order-detail__order-status">
                  Estado del pedido:
                  <strong class="sent">{{ order.status }}</strong>
                </div>
                <div class="order-detail__estimated-date">
                  Fecha de entrega prevista:
                  <strong class="">{{ order.eta }}</strong>
                </div>
                <div class="order-detail__status">
                  <div class="order-status__container">
                    <ul>
                      <li
                        class="status-item"
                        v-for="history in order.history"
                      >
                        <div class="status-item__information">
                          <span class="status-item__title">{{ getDescription(history.status) }}</span>
                          <p
                            class="status-item__description"
                            ng-if="history.statusId == 10"
                          >
                            Esperamos que
                            te haya encantado todo lo que has recibido. ¡Disfruta al máximo
                            de tu compra!
                          </p>
                        </div>
                        <span class="status-item__date">{{ history.date }}</span>
                      </li>
                      <!--
                        <li class="status-item">
                        <div class="status-item__information"><span
                        class="status-item__title">Enviado</span>
                        </div>
                        <span class="status-item__date">4/5/2020</span></li>
                        <li class="status-item">
                        <div class="status-item__information"><span

                        class="status-item__title">Listo para enviar</span>
                        </div>
                        <span class="status-item__date">30/4/2020</span></li>
                        <li class="status-item">
                        <div class="status-item__information"><span
                        class="status-item__title">Preparando el pedido</span>
                        </div>
                        <span class="status-item__date">29/4/2020</span></li>
                        <li class="status-item">
                        <div class="status-item__information"><span
                        class="status-item__title">Pagado</span>
                        </div>
                        <span class="status-item__date">29/4/2020</span></li>
                      -->
                    </ul>
                  </div>
                </div>
              </div>
              <div id="cart-products">
                <h3>Productos</h3>
                <ul>
                  <li v-for="item in order.items" :key="item.id">
                    <div class="cart-item">
                      <article class="cart-product__wrapper">
                        <a
                          class="cart-product mtc-link"
                          data-dr="true"
                          :href="item.link"
                        >
                          <span>
                            <img
                              width="120"
                              height="120"
                              :src="item.imageUrl"
                              alt="{{item.product ? item.product.fullName : ''}}"
                              class="cdn-img"
                            >
                          </span>
                          <div class="cart-product__info">
                            <h1 class="cart-product__name">{{ item.product.fullName }}</h1>
                            <div class="cart-product__details" />
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
                            <span class="product-old-price strike" />
                          </p>
                        </a>
                      </article>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="order-detail__sidebar">
            <div class="order-detail__details">
              <h3>Detalles</h3>
              <p><strong>Fecha de pedido:</strong> {{ order.date }}</p>
              <p><strong>Método de pago:</strong> {{ order.paymentMethod?.name }}</p>
              <p><strong>Método de envío:</strong> {{ order.shippingMethod?.name }}</p>
              <p ng-if="order.trackingId">
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
                    <use href="/content/svg/motomundi.svg#i-icon-copy" />
                  </svg>
                </span>
              </p>
            </div>
            <div class="order-detail__totals">
              <h3>
                Resumen de
                pedido
              </h3>
              <dl>
                <dt>Subtotal</dt>
                <dd>{{ order.netTotal }}</dd>
                <dt>Impuestos (I.V.A.)</dt>
                <dd>{{ order.iva }}</dd>
                <dt>Gastos de envío</dt>
                <dd ng-if="order.shipping > 0">
                  {{ order.shipping }}
                </dd>
                <dd ng-if="order.shipping == 0">
                  Envío grátis
                </dd>

                <dt>Total</dt>
                <dd>{{ order.total }}</dd>
              </dl>
            </div>
            <div class="order-detail__addresses">
              <h3> Direcciones</h3>
              <div class="shipping-address">
                <h4 class="order-detail__address-type">
                  Envío
                </h4>
                <div>
                  <p>
                    {{ order.shippedTo?.name }}
                    <br>
                    {{ order.shippedTo?.address }},
                    <br>
                    <span ng-if="order.shippedTo.postalCode">{{ order.shippedTo.postalCode }} - </span>
                    {{ order.shippedTo?.comuna?.name }}
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
                <div ng-if="order.invoicedTo">
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
                <div ng-if="!order.invoicedTo">
                  <p>
                    {{ order.receivedBy?.name }}<br>
                    <span ng-if="order.receivedBy?.address">{{ order.receivedBy?.address }},<br></span>
                    <span ng-if="order.receivedBy?.postalCode">{{ order.receivedBy?.postalCode }} - </span>
                    {{ order.receivedBy?.comuna?.name }}
                  </p>
                  <p>
                    {{ order.receivedBy?.email }}<br>
                    {{ order.receivedBy?.phone }}
                  </p>
                </div>
              </div>
            </div>
            <div class="order-detail__actions">
              <h3>Acciones</h3>
              <div class="actions__buttons">
                <a
                  class="button button--small button--filled mtc-link"

                  href="/realizar-cambio-o-devolucion?email={{order.receivedBy.email}}&amp;order={{order.id}}"
                ><span>Cambio o devolución</span></a>
              </div>
            </div>
            <div class="order-detail__help">
              <h3>
                ¿Tienes
                dudas?
              </h3>
              <p>
                Consulta nuestra sección de <a href="/contactanos.html">ayuda y
                  atención al cliente</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


