<script setup lang="ts">
const props = defineProps({
  article: {
    type: Object,
  },
})

const { data } = await useFetch("/api/product/list-by-ids", {
  "method": "POST",
  "key": "list-by-ids-" + props.article?.configuration?.assets?.products?.map(p => p.id),
  headers: {
    'Content-Type': 'application/json',
  },
  body: {
    ids: props.article?.configuration?.assets?.products?.map(p => p.id),
  },
})

const products = computed(() => {
  return data.value?.products || []
})
</script>

<template>
  <aside
    :class="[
      'did-you-like products-shortcode-container',
      products.length === 1 ? 'single-product' : 'multi-products'
    ]"
  >
    <div class="title">
      <p>¿Te ha gustado?</p>
    </div>
    <p class="subtitle">
      Cómpralo al mejor precio, GARANTIZADO
    </p>

    <div class="products-grid">
      <div
        v-for="p of products"
        :key="p.id"
        class="product-container"
      >
        <a :href="getProductUrl(p)">
          <div class="product-content">
            <div >
              <div class="image">
                <img :src="getImageUrl(p.image, 600, getDomainId())" class="lazyloaded">
              </div>
            </div>
            <div class="details">
              <div v-if="p.hasDiscount" class="discount">
                Oferta {{ Math.round(p.discountPercent) }}%
              </div>
              <div class="name">{{ p.fullName }}</div>
              <VRating v-model="p.rating" color="primary" />
              <div class="price">{{ formatMoney(p.minPrice) }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </aside>
</template>


<style scoped>
.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Adjust spacing between items */
}

.product-container {
  flex: 1 1 auto;
  width: 100%; /* Default: Mobile/Fallback is full width */
}

/* 1 Product: Full width */
.single-product .product-container {
  flex: 0 0 100%;
}

/* 2 Products: 50% each (minus gap) */
.multi-products .product-container {
  /* For 2 items, use 50%. For 3+, we calculate below */
  flex: 0 0 calc(50% - 0.5rem);
}

/* 3 or more Products: 33.3% each */
/* We use a media query or check count if you want 3 or 4 per row */
@media (min-width: 768px) {
  .multi-products .product-container {
    /* Adjusting to 3 per row if products.length > 2 */
    flex: 0 0 calc(33.333% - 0.7rem);
  }

  /* If you specifically want 2-column only when count is exactly 2 */
  .multi-products .product-container:nth-last-child(n+3),
  .multi-products .product-container:nth-last-child(n+3) ~ .product-container {
    flex: 0 0 calc(33.333% - 0.7rem);
  }
}
</style>

