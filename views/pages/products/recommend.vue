<script setup lang="ts">
import ProductItem from "@/views/pages/products/product-item.vue"
import { fetchRecommendProducts } from "@/api/ailoo"

const props = defineProps(
  {
    product: {
      type: Object,
      required: true,
    },
  },
)

const product = ref(props.product)


// const rs = await fetchRecommendProducts(props.product.id, 10)
/*
const { data: products } = await useAsyncData(`recommend-${props.product.id}`, () =>
  fetchRecommendProducts(props.product.id, 10)
)
*/

// client side
const rs = await fetchRecommendProducts(props.product.id, 10)
const products = ref([])
products.value = rs
</script>

<template>
  <div class="row">
    <div class="col s12">
      <aside class="related algolia-recommended">
        <section
          class="product-list"
          style="--7e560bfa: 2; --32a5b472: 3; --15fff006: 5;"
        >
          <hgroup class="product-list__title">
            <h2 class="">
              Te recomendamos
            </h2>
          </hgroup>
          <div class="products">

            <ProductItem
              v-for="prod in products"
              :key="prod.id"
              :product="prod"
            />
          </div>
          <div class="product-list__view-more">
            <button class="button button--tiny">
              <span>Ver más</span>
            </button>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.product-list .products {
  -moz-column-gap: 20px;
  column-gap: 20px;
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(var(--7e560bfa), calc(100% / var(--7e560bfa) - 10px));
  row-gap: 20px;
}

.button.button--tiny {
  border: 1px solid #000;
  color: #000;
  font-size: 9px !important;
  font-weight: 600;
  line-height: 20px !important;
  padding: 2px 10px;
  text-align: center !important;
}
.product-list .product-list__view-more .button {
  align-items: center;
  background-color: #f5f5f5;
  display: inline-flex;
  justify-content: center;
  min-width: 70px;
}
.product-list .product-list__view-more {
  margin: 40px 0;
  text-align: center;
}

@media only screen and (min-width: 993px) {
  .product-list .products {
    -moz-column-gap: 32px;
    column-gap: 32px;
    grid-template-columns: repeat(var(--15fff006), calc(100% / var(--15fff006) - 24px));
    row-gap: 32px;
  }
}
</style>

