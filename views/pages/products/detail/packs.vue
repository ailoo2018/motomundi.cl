<script setup lang="ts">
import { getImageUrl } from "@core/utils/formatters"
import PacksModal from "@/views/pages/packs/packs-modal.vue"

const props = defineProps({
  product: {
    type: Object,
  },
},
)

const isShowPackDialog = ref(false)
const loading = ref(false)
const selectedPack = ref({})

const getSavings = () => {

}

const packsRs = await $fetch("/api/product/packs?productId=" + props.product.id)

const packs = computed(() => {return packsRs.packs || []})

const getProducts = pack => {

}


const showPackDialog = pack => {
  console.log("isShowPackDialog click")
  isShowPackDialog.value = true
  selectedPack.value = pack
}
</script>

<template>

  <div
    v-if="packs && packs.length > 0"
    :key="packs.id"
    class="row"
  >
    <!-- packs dialog -->
    <PacksModal
      v-model="isShowPackDialog"
      :selected-pack="selectedPack"
    />
    <!-- /packs dialog -->

    <div class="row pack-header">
      <div class="col s12">
        <h2>Packs ahorro</h2>
      </div>
    </div>
    <VRow
      id="packs-container"
      class="row product-packs__container"
    >
      <VCol
        v-for="pack in packs"
        sm="12"
        md="6"
        cols="12"
      >
        <div class="pack-item">
          <div class="pack-item__description">
            <div class="pack-item__description-content">
              <h4 class="title">
                {{ pack.title }}
              </h4>
              <p class="description" />
            </div>
            <div
              class="pack-item__more-info"
              @click="showPackDialog(pack)"
            >
              <p class="pack-item__savings">
                <strong>
                  <span>ahorro</span> {{ formatMoney( pack.savings * -1 ) }}
                </strong>
                <small>Total: {{ formatMoney(pack.total) }}</small>
              </p>
              <svg
                class="sprite-line-icons"
                width="14"
                height="14"
              >
                <title>Right chevron</title>
                <use
                  style="stroke:white;"
                  href="/content/svg/motomundi.svg#i-icon-angle-right"
                />
              </svg>
            </div>
          </div>
          <div class="pack-item__image-container">
            <div class="pack-item__image">
              <a
                class="mtc-link nuxt-link-active nuxt-link-exact-active"
                data-dr="true"
                :href="pack.mainProduct.url"
              >
                <span>
                  <img
                    v-if="pack.mainProduct.image"
                    width="70"
                    height="70"
                    :src="getImageUrl(pack.mainProduct.image, 300, getDomainId())"
                    :alt="pack.mainProduct.productName"
                    class="cdn-img"
                  >
                </span>
              </a>
            </div>
            <div
              v-for="slot in pack.products"
              class="pack-item__image"
            >
              <a
                class="mtc-link"
                data-dr="true"
                :href="slot.url"
              >
                <span>

                  <img
                    width="70"
                    height="70"
                    :src="getImageUrl(slot.image, 600, getDomainId())"
                    :alt="slot.productName"
                    class="cdn-img"
                  >
                </span>
              </a>
            </div>
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<style >
#packs-container .pack-item {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 12px 24px 24px;
  position: relative;
}

#packs-container .pack-item__description {
  align-items: center;
  display: flex;
  margin-bottom: 4px;
  position: relative;
}
#packs-container .pack-item__description:before {
  background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Cpath fill='none' fill-rule='evenodd' stroke='%23d6001c' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 1 1 6l10 5 10-5zM1 16l10 5 10-5M1 11l10 5 10-5'/%3E%3C/svg%3E") 50% no-repeat;
  border-radius: 200px;
  content: "";
  display: block;
  flex: 0 0 40px;
  height: 40px;
  width: 40px;
}

#packs-container .pack-item__description .pack-item__description-content {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
}

#packs-container .pack-item__description h4 {
  font-size: 16px;
  font-weight: 800;
  line-height: .9;
  margin: 0 0 3px;
  text-transform: uppercase;
}

#packs-container .pack-item__description h4 + p {
  font-size: 11px;
  font-weight: 600;
  margin: 0;
}
#packs-container .pack-item__description .pack-item__more-info {
  align-items: center;
  background-color: #d6001c;
  color: #fff;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  padding: 12px 18px;
  transform: translate(28px, -18px);
}

#packs-container .pack-item__description .pack-item__more-info .pack-item__savings strong {
  display: block;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
}
small {
  font-size: 80%;
}


#packs-container .pack-item__image-container {
  align-items: center;
  display: flex;
  justify-content: center;
}

#packs-container .pack-item__image {
  align-items: center;
  display: flex;
}

#packs-container .pack-item__image .mtc-link, .pack-item__image span {
  display: block;
  height: 65px;
  position: relative;
  width: 65px;
}

#packs-container .pack-item__image:not(:last-child):after {
  color: #d6001c;
  content: "+";
  display: block;
  font-size: 38px;
  font-weight: 200;
  padding: 8px;
}

#packmodal .pack-grid__item, #packmodal .pack-item {
  box-shadow: rgba(0, 0, 0, 0.07) 0px 58px 36px, rgba(0, 0, 0, 0.05) 0px 39px 33px, rgba(0, 0, 0, 0.04) 0px 16px 17px, rgba(0, 0, 0, 0.04) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px -2px 5px, rgba(0, 0, 0, 0.02) 0px -6px 2px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  height: 515px;
  max-height: 515px;
  max-width: 265px;
  position: relative;
  scroll-snap-align: center;
  background: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(203, 203, 203);
  border-image: initial;
  border-radius: 9px;
  flex: 0 0 auto;
}

#packmodal .pack-item__change {
  align-items: center;
  color: rgb(255, 255, 255);
  display: flex;
  font-size: 8px;
  font-weight: 600;
  height: 28px;
  left: 50%;
  line-height: 28px;
  position: absolute;
  text-transform: uppercase;
  top: -14px;
  transform: translate(-50%);
  width: auto;
  z-index: 10;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMSIgaGVpZ2h0PSIxNCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjA2NCI+PHBhdGggZD0ibTguMjkyIDEuMTA1IDIuMTI5IDIuMTQ0LTIuMTI5IDIuMTQzIi8+PHBhdGggZD0iTS44NDIgNi40NjRWNS4zOTJoMGMwLTEuMTg0Ljk1My0yLjE0MyAyLjEyOS0yLjE0M2g3LjQ1bS03LjQ1IDkuNjQ1TC44NDIgMTAuNzUxbDIuMTI5LTIuMTQ0Ii8+PHBhdGggZD0iTTEwLjQyMSA3LjUzNXYxLjA3MmgwYTIuMTQgMi4xNCAwIDAgMS0yLjEyOSAyLjE0NEguODQyIi8+PC9nPjwvc3ZnPg==") 12px center no-repeat rgb(0, 0, 0);
  border-radius: 200px;
  overflow: hidden;
  padding: 0px 15px 0px 30px;
  transition: all 0.2s ease-out;
}

#packmodal .pack-item__info {
  padding-bottom: 0px;
  text-align: left;
}

#packmodal .pack-item__info {
  padding: 20px 30px;
}


#packmodal .pack-grid__item, #packmodal .pack-item {
  box-shadow: rgba(0, 0, 0, 0.07) 0px 58px 36px, rgba(0, 0, 0, 0.05) 0px 39px 33px, rgba(0, 0, 0, 0.04) 0px 16px 17px, rgba(0, 0, 0, 0.04) 0px 4px 10px, rgba(0, 0, 0, 0.03) 0px -2px 5px, rgba(0, 0, 0, 0.02) 0px -6px 2px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  height: 515px;
  max-height: 515px;
  max-width: 265px;
  position: relative;
  scroll-snap-align: center;
  background: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(203, 203, 203);
  border-image: initial;
  border-radius: 9px;
  flex: 0 0 auto;
}

#packmodal .pack-item__size {
  margin-top: auto;
  justify-self: flex-end;
  width: 100%;
  padding: 20px 30px;
}

#packmodal .pack-item__price, #packmodal .pack-item__price > span {
  align-items: center;
  display: flex;
  justify-content: center;
}

#packmodal .pack-item__price {
  background-color: rgb(245, 245, 245);
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  justify-self: flex-end;
  text-align: center;
  width: 100%;
  overflow: hidden;
  padding: 15px;
}

#packmodal .pack-item__price, #packmodal .pack-item__price > span {
  align-items: center;
  display: flex;
  justify-content: center;
}

</style>

