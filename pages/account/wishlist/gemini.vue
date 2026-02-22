<template>
  <v-container class="favorites-page py-10" min-height="700">
    <v-row align="center" class="mb-8">
      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-black text-uppercase italic">
          <i-tabler-heart-filled class="brand-red-text mr-2" />
          Mi Garaje <span class="brand-red-text">Favoritos</span>
        </h1>
        <p class="text-subtitle-1 text-grey-darken-1">
          Prepárate para tu próxima ruta. Guarda tus productos favoritos aquí.
        </p>
      </v-col>
    </v-row>

    <v-row v-if="favorites.length === 0" justify="center" class="py-12">
      <v-col cols="12" sm="6" class="text-center">
        <i-tabler-motorcycle size="80" class="text-grey-lighten-1 mb-4" />
        <h2 class="text-h5 font-weight-bold">Tu garaje está vacío</h2>
        <p class="mb-6">Parece que aún no has seleccionado tu equipamiento.</p>
        <v-btn color="#d6001c" size="large" to="/tienda" class="text-white">
          Explorar Productos
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="product in favorites"
        :key="product.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card variant="outlined" class="product-card">
          <v-btn
            icon="i-tabler-x"
            variant="text"
            position="absolute"
            location="top right"
            class="mt-2 mr-2 z-index-1"
            @click="removeFromFavorites(product.id)"
          ></v-btn>

          <v-img :src="product.image" height="250px" cover class="bg-grey-lighten-4">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="#d6001c"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-item>
            <div class="text-overline mb-1">{{ product.brand }}</div>
            <v-card-title class="text-subtitle-1 font-weight-bold pt-0">
              {{ product.name }}
            </v-card-title>
            <div class="text-h6 brand-red-text font-weight-black">
              ${{ formatPrice(product.price) }}
            </div>
          </v-card-item>

          <v-card-actions class="pa-4 pt-0">
            <v-btn
              block
              color="#d6001c"
              variant="flat"
              class="text-white font-weight-bold"
              prepend-icon="i-tabler-shopping-cart"
            >
              Añadir al Carrito
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Use your preferred state management (Pinia/Vuex)
const favorites = ref([
  { id: 1, name: 'Casco AGV K6 S', brand: 'AGV', price: 450000, image: 'https://images.example.com/helmet.jpg' },
  { id: 2, name: 'Chaqueta Alpinestars T-GP', brand: 'Alpinestars', price: 280000, image: 'https://images.example.com/jacket.jpg' },
  // ... more items
]);

const formatPrice = (value) => {
  return value.toLocaleString('es-CL');
};

const removeFromFavorites = (id) => {
  favorites.value = favorites.value.filter(item => item.id !== id);
};
</script>

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
