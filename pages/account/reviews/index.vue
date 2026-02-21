<script setup lang="ts">
import ProductListItem from "@/views/pages/products/list/product-list-item.vue"

definePageMeta({
  alias: '/cuenta/evaluaciones',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

const wuid = useGuestUser().value

const { data } = await useFetch("/api/account/reviews",
  { key: "reviews-" + wuid },
)

const reviewProduct = (productItemId, invoiceId) => {
  navigateTo("/account/review?productItemId=" + productItemId + "&invoiceId=" + invoiceId)
}

console.log("data", data)
</script>

<template>
  <div class="col s12 m9 l9 account__content service-rating">
    <h1 class="main-heading">
      Calificar Productos
    </h1>
    <VRow v-if="data && data.reviews && data.reviews?.length > 0">
      <VCol
        v-for="p in data.reviews"
        cols="6"
        sm="6"
        md="3"
        lg="3"
        class="prod-list"
      >
        <VCard >
          <VCardText v-if="p && p.product">
            <a href="/Review/AddReview.rails?productItemId=$p.Id">
              <img :src="getImageUrl(p.product?.image, 300, getDomainId())">
            </a>
            <div class="prod-list-title">
              {{ p.product.fullname }} <br>
            </div>
          </VCardText>
          <VCardActions class="text-center">
            <VBtn
              color="black"
              rounded="0"
              variant="outlined"
              @click="reviewProduct(p.productItemId, p.invoiceId)"
            >
              Calificar
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
    <div
      v-else
      class="row account-section-content"
      style="margin:4px;"
    >
      <div class="large-12 columns">
        <p class="no-orders-yet text-center" >
          <span class="d-flex justify-center">
            <VIcon class="tabler-shopping-bag" />
          </span>
        No hay productos para calificar.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.main-heading {
  margin-top: 20px;
  font: 18px "Open Sans", Arial, sans-serif;
  text-transform: uppercase;
  border-left: 3px solid #c74044;
  padding-left: 14px;
  line-height: 2;
  margin-bottom: 20px;
  font-weight: 600;
}
.account-section-content .no-orders-yet {
  font-size: .8rem;
  display: block;
  padding: 4rem 1rem;
  text-align: center;
  text-transform: uppercase;
  color: #8a8a8a;
  background-color: #f3f3f3;
  border-radius: 3px;
}
.account-section-content .no-orders-yet {
  font-size: .8rem;
  display: block;
  padding: 4rem 1rem;
  text-align: center;
  text-transform: uppercase;
  color: #8a8a8a;
  background-color: #f3f3f3;
  border-radius: 3px;
}
.account-section-content .no-orders-yet i {
  font-size: 1.4rem;
  display: block;
}
</style>
