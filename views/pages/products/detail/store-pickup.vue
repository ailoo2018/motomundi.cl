<script setup lang="ts">

const store = ref({name: ""})
const showStockDialog = () => {

}
</script>

<template>
  <div class="shop-lookup__container mt-4">
    <div
      class="shipping-options__container not-clickable"
      ng-click="showStockDialog()"
    >
      <div class="shipping-options__content">
        <p class="shipping-options__heading">
          <svg
            width="14"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-click-and-collect"
              xlink:href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-click-and-collect"
            />
          </svg>
          <span>Retiro en Tienda</span>
        </p>
        <div class="shipping-options__body">
          <div class="shipping-options__option">
            <p class="option__not-checked">
              Comprobar disponibilidad
            </p>
          </div>
        </div>
      </div>
      <div class="shipping-options__actions">
        <button>
          Comprobar
          <svg
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-angle-right"
              xlink:href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-angle-right"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- popup shop lookup -->
    <div
      class="modal-wrapper shop-lookup__modal"
      style="display: none;"
    >
      <div class="modal-backdrop"/>
      <div
        role="dialog"
        class="modal"
      >
        <div class="modal__close-cont">
          <button
            class="modal__close"
            ng-click="hideStockDialog()"
          >
            <svg
              width="9"
              height="9"
              xmlns="http://www.w3.org/2000/svg"
              class="icon sprite-line-icons"
            >
              <use
                href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-cross"
                xlink:href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-cross"
              />
            </svg>
          </button>
        </div>
        <header class="modal-header">
          <div class="shop-lookup__header">
            <svg
              width="24"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              class="icon sprite-line-icons"
            >
              <use
                href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-click-and-collect"
                xlink:href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-click-and-collect"
              />
            </svg>
            <div class="shop-lookup__title">
              <span class="h1">Click &amp; Collect</span>
              <span class="subtitle">¡Recoge tu pedido en una tienda Motomundi!</span>
            </div>
          </div>
        </header>
        <section
          class="modal-body"
          style="padding: 0px;"
        >
          <div>
            <div style="display: none;">
              <ul/>
              <div class="shop-lookup__no-stock">
                No hay stock de esta talla en ninguna de nuestras
                tiendas.
              </div>
            </div>
            <div
              style="height: 60px;"
              ng-if="!stores"
            >
              <div class="spinner-container">
                <div class="spinner"/>
              </div>
            </div>
            <div
              data-v-7292d933=""
              ng-if="stores"
            >
              <ul style="padding:0px;">
                <li
                  class="shop"
                  ng-repeat="store in stores"
                >
                  <div class="shop__address">
                    <div class="preferred-icon">
                      <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                        class="icon sprite-line-icons"
                      >
                        <use href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-star"/>
                      </svg>
                    </div>
                    <p class="shop__address-info">
                      <strong>{{ store.name }}</strong>
                      {{ store.address }}
                    </p>
                  </div>
                  <div class="shop__stock">
                    <p
                      class="shop__no-stock"
                      ng-if="store.stock == 0"
                    >
                      Sin stock
                    </p>
                    <p
                      class=""
                      ng-if="store.stock > 0"
                    >
                      1 en stock
                    </p>
                    <p class="shop__available-2h">
                      Recógelo en 2 horas
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <ul class="shop-lookup__conditions">
              <li>
                No existen gastos de envío al
                recogerlo en la tienda
              </li>
              <li>
                El stock se actualiza diariamente. La
                disponibilidad mostrada puede variar en cualquier
                momento
              </li>
              <li>
                Recogida en 2 horas desde apertura de
                la tienda. Consulta los horarios de las tiendas <a
                href="/tiendas"
                target="_blank"
              >aquí</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
    <!-- /popup shop lookup -->
  </div>
</template>
<style lang="scss">

.shipping-options__container {
  align-items: center;
  background-color: #f5f5f5;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 10px 9px;
}

.shipping-options__container .shipping-options__option p {
  align-items: baseline;
  display: flex;
  justify-content: flex-start;
  margin: 8px 0 0;
}

.shipping-options__container .shipping-options__option p.option__not-checked:before {
  background-color: #c9c9c9;
}

.shipping-options__container .shipping-options__option p:before {
  background-color: #41a334;
  border-radius: 50%;
  content: "";
  display: inline-block;
  flex-shrink: 0;
  height: 10px;
  margin-right: 5px;
  position: relative;
  top: 1px;
  width: 10px;
}

.shipping-options__container .shipping-options__actions button {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  flex-wrap: nowrap;
  font-size: 10px;
  justify-content: flex-end;
  text-transform: uppercase;
}


.shipping-options__container .shipping-options__body {
  padding-left: 20px;
}

.shipping-options__container .shipping-options__heading svg {
  margin-right: 7px;
  min-width: 13px;
}

.shipping-options__heading svg use {
  scale: .6;
}

.shipping-options__container .shipping-options__heading svg use {
  stroke-width: 1;
}

.shipping-options__container .shipping-options__heading {
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: 500;
  justify-content: flex-start;
  margin: 0;
  text-transform: uppercase;
}
</style>

