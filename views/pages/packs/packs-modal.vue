<script setup lang="ts">

import PackModalItem from "@/views/pages/packs/pack-modal-item.vue";
import {CartItemType, SaleItemType} from "@/models";
import {useGuestUser} from "@/composables/useGuestUser";

const isShowPackDialog = defineModel<boolean>({default: false});

interface Props {
  selectedPack: any;
  loading?: boolean;
}

const loading = ref(false)

const props = defineProps<Props>();

// Example helper function for savings
const getSavings = (pack: any) => {
  // Your logic here
  return "$0";
};

const cartStore = useCartStore()
const addPackToCart = async () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.w3BaseUrl

  const rq = {
    wuid: useGuestUser().value,
    id: props.selectedPack.id,
    name: props.selectedPack.name,
    type: CartItemType.Pack,
    packId: props.selectedPack.id,
    quantity: 1,
    packContents: []
  }

  let validated = true
  for (const p of products.value) {
    if (p.selectedVariant == null) {
      // show error
      console.log("product not selected: " + p.name)
      p.error = "Debe seleccionar talla y/o color" + new Date()
      validated = false;
      continue
    }
    rq.packContents.push({productItemId: p.selectedVariant.id, quantity: 1})
  }
  if (!validated) {
    return
  }



  try {
    loading.value = true

    const wuid = useGuestUser().value
    await cartStore.add(rq, wuid)

/*
    const res = await $fetch(`${baseUrl}/${getDomainId()}/cart/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: rq
    })
*/

    await navigateTo('/cart')
    console.log("result cart add: ", res)
  } catch (e) {
    loading.value = false
    alert(e.message)
  }

}

const products = computed(() => {
  // return props.selectedPack.products
  return [props.selectedPack.mainProduct, ...props.selectedPack.products]
})

</script>

<template>
  <div
    id="packmodal"
    class="modal-wrapper "
    v-if="isShowPackDialog"
  >
    <div class="modal-backdrop"/>
    <div
      class="modal"
      role="dialog"
    >
      <div class="modal__close-cont">
        <button
          class="modal__close"
          @click="isShowPackDialog = false;"
        >
          <svg
            class="sprite-line-icons"
            width="9"
            height="9"
          >
            <use href="/content/svg/motomundi.svg#i-icon-cross"/>
          </svg>
        </button>
      </div>
      <header class="modal-header"/>
      <section class="modal-body">
        <div>
          <div class="pack packs-modal-full">
            <button
              class="packs-modal-full__close"
              @click="isShowPackDialog = false;"
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g
                    transform="translate(-1411 -11)"
                    stroke="#FFF"
                    stroke-width="2"
                  >
                    <g transform="translate(1400)">
                      <g transform="translate(12.857 12.857)">
                        <path
                          id="Path"
                          d="M14.286 0 0 14.286M0 0l14.286 14.286"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>

            <div class="packs-modal-full__title">
              <h2>
                {{ selectedPack.title }}
                <small/>
              </h2>
            </div>

            <div
              class="packs-modal-full__content fade-in--right ng-hide"
              v-if="selectedPack"
            >
              <div>


                <PackModalItem v-for="(packProd, index) in products" v-model="products[index]" :key="packProd.id"
                               :error="packProd.error"
                />
              </div>
            </div>
            <div
              class="packs-modal-full__tooltip tooltip tooltip--warning active"
              style="display: none;"
            >
              <svg
                class="sprite-line-icons"
                width="15"
                height="12"
              >
                <use href="/content/svg//motomundi.svg#i-icon-alert"/>
              </svg>
              Parece que algo ha ido mal
            </div>
            <div class="packs-modal-full__footer">
              <div class="packs-modal-full__buy">
                <div class="price">
                  <span class="vat-included">IVA incluido</span>
                  <strong class="pack__total">{{selectedPack.total}}</strong>
                  <small class="pack__savings">Ahorro de
                    {{getSavings(selectedPack) }}</small>
                </div>
                <VBtn
                  :rounded="0"
                  color="rgb(65, 163, 53)"
                  @click="addPackToCart($event, selectedPack)"
                  style="height: 100%"
                  :loading="loading"
                  :class="{ 'loading' : loading, 'disabled' : loading }"
                >
                  <svg
                    width="22"
                    height="24"
                    v-if="!loading"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 .6C8.033.6 5.61 2.909 5.493 5.783L5.49 6v1.8H1.222a.615.615 0 0 0-.614.503L.6 8.4v14.4c0 .297.223.545.52.592l.102.008h19.556a.615.615 0 0 0 .614-.503l.008-.097V8.4a.606.606 0 0 0-.52-.592l-.102-.008H16.51V6c0-2.975-2.47-5.4-5.511-5.4zM5.489 9v2.4h1.244V9h8.534v2.4h1.244V9h3.645v13.2H1.844V9H5.49zM11 1.8c2.35 0 4.267 1.881 4.267 4.2v1.8H6.733V6c0-2.319 1.917-4.2 4.267-4.2z"
                      fill="#FFF"
                      fill-rule="nonzero"
                    />
                  </svg>
                  <span v-if="!loading">Comprar pack </span>
                </VBtn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<style scoped lang="scss">
/*** modal ***/
#packmodal .packs-modal-full__content > div {
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  scroll-snap-type: x mandatory;
  gap: 20px;
  margin: 20px auto;
  padding: 0px 60px;
}

.modal-wrapper {
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
}

.modal-wrapper .modal-backdrop {
  background: hsla(0, 0%, 96%, .9);
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
}

@media only screen and (max-width: 992px) {
  .modal-wrapper .modal {
    max-height: 90%;
    max-width: 80%;
  }
}

.modal-wrapper .modal .modal__close-cont {
  position: relative;
}

.modal-wrapper .modal .modal-header {
  background-color: #f5f5f5;
  padding: 30px 30px 0;
  position: relative;
  z-index: 20;
}

.modal-wrapper .modal .modal-body {
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;
}

#packmodal .customization__container, #packmodal .packs-modal-full {
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  position: fixed;
  right: 0px;
  top: 0px;
}

#packmodal .packs-modal-full {
  display: grid;
  grid-template-areas: "packs-modal-full__title" "packs-modal-full__content" "packs-modal-full__buy";
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto 80px;
  max-width: 100vw;
  z-index: 10000;
  background: rgb(255, 255, 255);
  gap: 0px;
}

#packmodal .packs-modal-full__close {
  background-color: rgb(0, 0, 0);
  height: 40px;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 40px;
}

#packmodal .packs-modal-full__title {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 60px auto 0px;
  padding: 0px 60px;
}

#packmodal .packs-modal-full__title h2 {
  font-size: 36px;
  font-weight: 900;
  line-height: 1.2em;
  text-transform: uppercase;
  margin: 0px;
}

#packmodal .packs-modal-full__content {
  display: flex;
  overflow-x: auto;
  position: relative;
  scroll-snap-type: x mandatory;
  flex: 2 1 0%;
  padding: 0px;
}

#packmodal .tooltip.tooltip--warning {
  background-color: rgb(255, 243, 205);
  color: rgb(133, 100, 4);
}

#packmodal .tooltip {
  font-size: 11px;
  font-weight: 600;
  z-index: 1;
  padding: 10px;
}

#packmodal .packs-modal-full__tooltip {
  bottom: 80px;
  position: fixed;
  width: 100%;
}

#packmodal .packs-modal-full__footer {
  bottom: 0px;
  left: 50%;
  position: absolute;
  transform: translate(-50%);
  z-index: 1;
}

#packmodal .packs-modal-full__buy {
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.18) 0px -2px 34px;
  display: flex;
  justify-content: space-between;
  background: rgb(255, 255, 255);
}

#packmodal .packs-modal-full__buy .price {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  text-align: center;
  text-transform: uppercase;
  padding: 0px 70px;
}

#packmodal .packs-modal-full__buy button {
  align-items: flex-end;
  background-color: rgb(65, 163, 53);
  color: rgb(255, 255, 255);
  display: flex;
  font-weight: 800;
  text-transform: uppercase;
  padding: 28px 30px;
}

#packmodal .packs-modal-full__buy button svg {
  flex: 0 0 22px;
  margin-right: 8px;
  width: 22px !important;
}

#packmodal .pack {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#packmodal .packs-modal-full__buy .price .vat-included {
  color: rgb(175, 175, 175);
  font-size: 11px;
  font-weight: 600;
  text-align: center;
}

#packmodal .packs-modal-full__buy .price strong {
  font-size: 28px;
  font-weight: 900;
}

#packmodal .packs-modal-full__buy .price small {
  color: rgb(214, 0, 28);
  font-size: 11px;
  font-weight: 600;
}

#packmodal .pack-item__description button {
  color: rgb(165, 165, 165);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 2px 0px;
}
</style>
