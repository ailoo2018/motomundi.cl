<script setup lang="ts">
const props = defineProps({
  productItemId: {
    type: Number,
  },
})



const isShow = ref(false)
const stores = ref([])
const store = ref({ name: "" })
const isAvailable = ref(false)


const loadStock = async  () => {

  const data  = await $fetch("/api/product/stock", {
    key: "product-item-stock-" + props.productItemId,
    method: "GET",
    query: {
      productItemId: props.productItemId,
    },
  })


  stores.value = data.stores
  if(stores.value && stores.value.length > 0){
    isAvailable.value = stores.value.some(s => s.stock > 0)
  }else{
    isAvailable.value = false
  }

}

watch(() => props.productItemId, async newValue => {
  console.log("storepickup pit changed: " + props.productItemId)
  if(props.productItemId > 0 ) {
    await loadStock()
  }
}, { immediate: true })



const showStockDialog = () => {
  isShow.value = true
}
</script>

<template>
  <div class="shop-lookup__container mt-4">
    <div
      class="shipping-options__container not-clickable"
      @click="showStockDialog"
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
            <p :class="isAvailable ? '' :  'option__not-checked'">
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
    <VDialog
      v-model="isShow"
      max-width="700px"
      class="modal-wrapper shop-lookup__modal"
    >
      <VCardTitle />
      <VCard>
        <header class="modal-header">
          <VBtn
            icon
            variant="text"
            style="position: absolute; top: 8px; right: 8px; z-index: 1;"
            @click="isShow = false"
          >
            <VIcon
              class="tabler-x"
              color="#000"
            />
          </VBtn>
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
              <ul />
              <div class="shop-lookup__no-stock">
                No hay stock de esta talla en ninguna de nuestras
                tiendas.
              </div>
            </div>
            <div
              v-if="!stores"
              style="height: 60px;"
            >
              <div class="spinner-container">
                <div class="spinner" />
              </div>
            </div>
            <div v-if="stores">
              <ul style="padding:0px;">
                <li
                  v-for="store in stores"
                  :key="store.id"
                  class="shop"
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
                        <use href="/content/images/svg/5a3436bd5fabb67d5b4db2b6a90371b1.svg#i-icon-star" />
                      </svg>
                    </div>
                    <p class="shop__address-info">
                      <strong>{{ store.name }}</strong>
                      {{ store.address }}
                    </p>
                  </div>
                  <div class="shop__stock">
                    <p
                      v-if="store.stock == 0"
                      class="shop__no-stock"
                    >
                      Sin stock
                    </p>
                    <p
                      v-if="store.stock > 0"
                      class=""
                    >
                      1 en stock
                    </p>
                    <p v-if="store.stock > 0" class="shop__available-2h">
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
                la tienda. Consulta los horarios de las tiendas

                <a
                  href="/tiendas"
                  target="_blank"
                >aquí</a>
              </li>
            </ul>
          </div>
        </section>
      </VCard>
    </VDialog>
    <!-- /popup shop lookup -->
  </div>
</template>

<style lang="scss">
.shop-lookup__modal .modal-header .shop-lookup__header {
  align-items: flex-start;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
}

.shop-lookup__modal .modal-header span.h1 {
  display: block;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -.4px;
  padding-bottom: 0;
  text-transform: uppercase;
}

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

/*** dialog ****/

.shop {
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding: 12px 10px 12px 12px;
  position: relative;
  color: black;
}

.shop .shop__address {
  align-items: baseline;
  display: flex;
  flex: 0 1 65%;
  font-size: 13px;
  gap: 7px;
  justify-content: flex-start;
  line-height: 16px;
  margin: 0;
  max-width: 65%;
  padding: 0;
}

.shop .shop__address strong {
  display: block;
  font-size: 14px;
  margin-bottom: 2px;
  text-transform: uppercase;
  font-weight: bolder;
}

.shop .shop__address p, .shop .shop__address strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shop .shop__address p, .shop .shop__address strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shop:first-child {
  border-top: 1px solid #e5e5e5;
}

.shop-lookup__modal .modal-header {
  background-color: #fff !important;
  padding: 25px 30px !important;
}

.shop-lookup__conditions {
  background: #fff;
  border-top: 1px solid #e5e5e5;
  bottom: 0;
  display: block;
  font-size: 11px;
  line-height: 15px;
  padding: 16px;
  position: sticky;
}

.shop .shop__stock {
  align-items: flex-end;
  display: flex;
  flex: 1 0 35%;
  flex-direction: column;
  flex-wrap: nowrap;
  font-size: 12px;
  gap: 4px;
  justify-content: center;
  text-align: right;
}

.shop .shop__stock p:after {
  background-color: #41a334;
  border-radius: 50%;
  content: "";
  display: inline-block;
  height: 10px;
  margin-left: 5px;
  position: relative;
  top: 1px;
  width: 10px;
}

.shop .shop__stock p:after {
  background-color: #41a334;
  border-radius: 50%;
  content: "";
  display: inline-block;
  height: 10px;
  margin-left: 5px;
  position: relative;
  top: 1px;
  width: 10px;
}

.shop .shop__stock p.shop__no-stock:after {
  background-color: #f44a4a;
}
</style>

