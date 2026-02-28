<script setup lang="ts">


const blogStore = useBlogStore()

await blogStore.fetchRelatedProducts()

let data = ref()
let rs = null



const products = computed(() => {
  return blogStore.relatedProducts
})
</script>

<template>
  <div
    v-if="products?.length > 0"
    class="recommended-most-viewed-container single-post"
  >
    <div class="related-products sidebar-block">
      <div class="header">
        <p class="sidebar-title">
          Productos relacionados de Motomundi.cl
        </p>
      </div>
      <div class="related-products-lists pt-4">
        <div
          v-for="p in products"
          class="product "
        >
          <a :href="getProductUrl(p)">
            <div class="image"><img
              :src="getImageUrl(p.image, 300, getDomainId())"
            >
            </div>
            <div class="product-details">

              <div v-if="p.hasDiscount" class="discount">Oferta {{ Math.round(p.discountPercent)}} %</div>

              <div class="name">{{p.fullName}}</div>
              <div class="star-rating"><i class="blog-icon-star" /><i class="blog-icon-star" /><i class="blog-icon-star" /><i class="blog-icon-star" /><i class="blog-icon-star" />
              </div>
              <div class="price">{{ formatMoney(p.minPrice)}}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
