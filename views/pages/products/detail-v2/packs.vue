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

const packs = computed(() => {return packsRs.packs?.slice(0,2) || []})

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

  >
    <!-- packs dialog -->
    <PacksModal
      v-model="isShowPackDialog"
      :selected-pack="selectedPack"
    />
    <!-- /packs dialog -->

    <h2 class="section-title">
      Packs Ahorro
    </h2>
    <VDivider class="section-divider mb-5" />
    <VRow
      id="packs-container"
      class="row product-packs__container"
    >
      <VCol
        v-for="pack in packs"
        cols="12"
      >
        <PackItem :pack="pack" @open-pack="showPackDialog"/>

      </VCol>
    </VRow>
  </div>
</template>

<style >

</style>

