<script setup>
import { useWishlistStore } from "@/stores/wishlist.js"

definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

const loading = ref(false)

loading.value = true

const { data, refresh } = useFetch("/api/account/wishlist", { key: "account-wishlist-" + useUser().getUserId() })

loading.value = false

const favorites = computed(() => data.value?.products || [])




const removeFromFavorites = async id => {
  useWishlistStore().toggleItem(id)
  loading.value = true
  try {
    await refresh()
  }finally {
    loading.value = false
  }
}
</script>

<template>
  <VContainer
    class="favorites-page"
    min-height="700"
  >
    <Spinner v-model="loading" />

    <VRow
      align="center"
      class="mb-8"
    >
      <VCol cols="12">
        <h1 class="text-h4 font-weight-black text-uppercase">
          <VIcon class="tabler-heart-filled brand-red-text mr-2" />
          Mis <span class="brand-red-text">Favoritos</span>
        </h1>
        <p class="text-subtitle-1 text-grey-darken-1">
          Prepárate para tu próxima ruta. Guarda tus productos favoritos aquí.
        </p>
      </VCol>
    </VRow>

    <VRow
      v-if="favorites.length === 0"
      justify="center"
      class="py-12"
    >
      <VCol
        cols="12"
        sm="6"
        class="text-center"
      >
        <VIcon
          size="80"
          class="tabler-heart text-grey-lighten-1 mb-4"
        />
        <h2 class="text-h5 font-weight-bold">
          Tu garaje está vacío
        </h2>
        <p class="mb-6">
          Parece que aún no has seleccionado tu equipamiento.
        </p>
        <VBtn
          color="#d6001c"
          rounded="0"
          size="large"
          to="/"
          class="text-white"
        >
          Explorar Productos
        </VBtn>
      </VCol>
    </VRow>

    <VRow v-else>
      <VCol
        v-for="product in favorites"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <VCard
          variant="outlined"
          class="product-card"
        >
          <VBtn
            icon="tabler-x"
            variant="text"
            position="absolute"
            location="top right"
            class="mt-2 mr-2 z-index-1000"
            style="z-index: 1000000;"
            @click="removeFromFavorites(product.id)"
          />

          <a :href="getProductUrl(product)">
            <VImg
              :src="getImageUrl(product.image, 300, getDomainId())"
              cover
              class="bg-grey-lighten-4"
            >
              <template #placeholder>
                <VRow
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <VProgressCircular
                    indeterminate
                    color="#d6001c"
                  />
                </VRow>
              </template>
            </VImg>
          </a>

          <VCardItem>
            <div class="text-overline mb-1">
              {{ product.brand.name }}
            </div>
            <VCardTitle class="text-subtitle-1 font-weight-bold pt-0">
              {{ product.name }}
            </VCardTitle>
            <div class="text-h6 brand-red-text font-weight-black">
              {{ formatMoney(product.minPrice) }}
            </div>
          </VCardItem>

          <VCardActions class="pa-4 pt-0">
            <VBtn
              block
              color="#d6001c"
              variant="flat"
              class="text-white font-weight-bold "
              @click="navigateTo(getProductUrl(product), { external: true})"
              prepend-icon="tabler-shopping-cart"
            >

              Añadir al Carrito
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>


<style scoped>
.brand-red-text {
  color: #d6001c !important;
}

.product-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border-radius: 8px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  border-color: #d6001c;
}
</style>
