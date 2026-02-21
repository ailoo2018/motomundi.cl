<script setup>
definePageMeta({
  alias: '/cuenta/evaluaciones',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})


const activeTab = ref('pending')

// Mock Data - In a real Nuxt app, these would come from useFetch or a Pinia store
const pendingProducts = ref([
  { id: 1, name: 'Alpinestars T-GP Plus R V3 Jacket', brand: 'Alpinestars', image: 'https://via.placeholder.com/150', purchaseDate: 'Jan 12, 2024' },
  { id: 2, name: 'Shoei GT-Air II Helmet', brand: 'Shoei', image: 'https://via.placeholder.com/150', purchaseDate: 'Feb 05, 2024' },
])

const reviewedProducts = ref([
  {
    id: 101,
    name: 'Revit Sand 4 Gloves',
    image: 'https://via.placeholder.com/150',
    rating: 5,
    comment: 'Excellent ventilation and protection for summer rides. Highly recommend!',
    reviewDate: 'Dec 20, 2023',
  },
])

const openReviewModal = product => {
  // Logic to trigger your review dialog
  console.log('Opening review for:', product.name)
}
</script>

<template>

  <VContainer class="py-8 ma-0 pa-0">
    <VRow class="mb-6">
      <VCol cols="12">
        <div class="d-flex align-center">
          <VIcon
            size="32"
            class="mr-3 text-primary tabler-package"
          >

          </VIcon>
          <h1 class="text-h4 font-weight-bold">
            My Product Reviews
          </h1>
        </div>
        <p class="text-subtitle-1 text-medium-emphasis mt-2">
          Manage your feedback and help the biker community choose the right gear.
        </p>
      </VCol>
    </VRow>

    <VTabs
      v-model="activeTab"
      color="primary"
      align-tabs="start"
      class="mb-6"
    >
      <VTab value="pending">
        <VIcon start>
          i-tabler-clipboard-check
        </VIcon>
        Pending ({{ pendingProducts.length }})
      </VTab>
      <VTab value="completed">
        <VIcon start>
          i-tabler-star
        </VIcon>
        My Reviews ({{ reviewedProducts.length }})
      </VTab>
    </VTabs>

    <VWindow v-model="activeTab">
      <VWindowItem value="pending">
        <VRow v-if="pendingProducts.length > 0">
          <VCol
            v-for="product in pendingProducts"
            :key="product.id"
            cols="12"
          >
            <VCard
              variant="outlined"
              class="pa-4 border-sm rounded-lg"
            >
              <div class="d-flex flex-column flex-md-row align-center">
                <VImg
                  :src="product.image"
                  width="100"
                  height="100"
cover class="rounded-lg bg-grey-lighten-3"
                />

                <div class="ms-md-6 flex-grow-1 mt-4 mt-md-0">
                  <div class="text-overline text-primary">
                    {{ product.brand }}
                  </div>
                  <h3 class="text-h6">
                    {{ product.name }}
                  </h3>
                  <div class="text-body-2 text-medium-emphasis">
                    Purchased on: {{ product.purchaseDate }}
                  </div>
                </div>

                <VBtn
                  color="primary"
                  size="large"
                  class="mt-4 mt-md-0"
@click="openReviewModal(product)"
                >
                  <VIcon start>
                    i-tabler-pencil
                  </VIcon>
                  Write Review
                </VBtn>
              </div>
            </VCard>
          </VCol>
        </VRow>

        <VSheet
          v-else
          class="text-center pa-12"
          border
          rounded
        >
          <VIcon
            size="64"
            class="mb-4 text-disabled"
          >
            i-tabler-mood-empty
          </VIcon>
          <h3>All caught up!</h3>
          <p>You've reviewed everything you've bought recently.</p>
        </VSheet>
      </VWindowItem>

      <VWindowItem value="completed">
        <VRow v-if="reviewedProducts.length > 0">
          <VCol
            v-for="item in reviewedProducts"
            :key="item.id"
            cols="12"
          >
            <VCard
              variant="flat"
              class="pa-4 bg-grey-lighten-4 rounded-lg"
            >
              <div class="d-flex align-start">
                <VImg
                  :src="item.image"
                  width="80"
                  height="80"
cover class="rounded-lg"
                />
                <div class="ms-4 flex-grow-1">
                  <div class="d-flex justify-space-between align-center">
                    <h3 class="text-subtitle-1 font-weight-bold">
                      {{ item.name }}
                    </h3>
                    <VRating
                      :model-value="item.rating"
                      readonly
                      density="compact"
color="orange-darken-2"
                    />
                  </div>
                  <div class="text-body-2 font-italic mt-2">
                    "{{ item.comment }}"
                  </div>
                  <div class="text-caption text-medium-emphasis mt-2">
                    Reviewed on: {{ item.reviewDate }}
                  </div>
                </div>
                <VBtn
                  icon
                  variant="text"
                  size="small"
color="error"
                >
                  <VIcon>i-tabler-trash</VIcon>
                </VBtn>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>
    </VWindow>
  </VContainer>
</template>

