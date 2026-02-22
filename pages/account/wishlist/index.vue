<script setup>
definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

// Use your preferred state management (Pinia/Vuex)
const favorites = ref([
  { id: 1, name: 'Casco AGV K6 S', brand: 'AGV', price: 450000, image: 'https://images.example.com/helmet.jpg' },
  { id: 2, name: 'Chaqueta Alpinestars T-GP', brand: 'Alpinestars', price: 280000, image: 'https://images.example.com/jacket.jpg' },

  // ... more items
])

const formatPrice = value => {
  return value.toLocaleString('es-CL')
}

const removeFromFavorites = id => {
  favorites.value = favorites.value.filter(item => item.id !== id)
}
</script>

<template>
  <VContainer
    class="favorites-page py-10"
    min-height="700"
  >
    <VRow
      align="center"
      class="mb-8"
    >
      <VCol
        cols="12"
        md="6"
      >
        <h1 class="text-h4 font-weight-black text-uppercase italic">
          <ITablerHeartFilled class="brand-red-text mr-2" />
          Mi Garaje <span class="brand-red-text">Favoritos</span>
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
        <ITablerMotorcycle
          size="80"
          class="text-grey-lighten-1 mb-4"
        />
        <h2 class="text-h5 font-weight-bold">
          Tu garaje está vacío
        </h2>
        <p class="mb-6">
          Parece que aún no has seleccionado tu equipamiento.
        </p>
        <VBtn
          color="#d6001c"
          size="large"
          to="/tienda"
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
            icon="i-tabler-x"
            variant="text"
            position="absolute"
            location="top right"
            class="mt-2 mr-2 z-index-1"
            @click="removeFromFavorites(product.id)"
          />

          <VImg
            :src="product.image"
            height="250px"
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

          <VCardItem>
            <div class="text-overline mb-1">
              {{ product.brand }}
            </div>
            <VCardTitle class="text-subtitle-1 font-weight-bold pt-0">
              {{ product.name }}
            </VCardTitle>
            <div class="text-h6 brand-red-text font-weight-black">
              ${{ formatPrice(product.price) }}
            </div>
          </VCardItem>

          <VCardActions class="pa-4 pt-0">
            <VBtn
              block
              color="#d6001c"
              variant="flat"
              class="text-white font-weight-bold"
              prepend-icon="i-tabler-shopping-cart"
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

.italic {
  font-style: italic;
}
</style>
