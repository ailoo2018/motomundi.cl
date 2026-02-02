<script setup>
import { ref, computed } from 'vue'
import BlogGridItem from "@/views/pages/blog/blog-grid-item.vue"

const props = defineProps({
  categoryId: {
    type: String,
    default: ''
  }
})

const limit = 10
const currentPage = ref(1)

// 1. Calculate offset based on current page
// Page 1 -> offset 0, Page 2 -> offset 10, etc.
const offset = computed(() => (currentPage.value - 1) * limit)

// 2. Use a getter function () => ... for the URL
// This tells Nuxt to auto-refresh whenever 'offset' or 'props.categoryId' changes
const { data: rs, pending } = useFetch(() =>
    `/api/blog/search?offset=${offset.value}&limit=${limit}&categoryId=${props.categoryId}`,
  {
    watch: [currentPage] // Explicitly watch currentPage
  }
)

// 3. Compute total pages from API metadata
// Assuming your API returns a "total" field
const totalPages = computed(() => {
  return rs.value?.total ? Math.ceil(rs.value.total / limit) : 1
})
</script>

<template>
  <div class="blog-container">
    <VProgressLinear v-if="pending" indeterminate color="primary" />

    <VRow class="row flex" v-if="rs?.entries">
      <VCol
        v-for="entry in rs.entries"
        :key="entry.id"
        cols="12"
        sm="6"
        md="6"
      >
        <BlogGridItem
          :entry="entry"
          class="grid-item review type-review status-publish"
        />
      </VCol>
    </VRow>

    <div class="mt-8">
      <VPagination
        v-model="currentPage"
        :length="totalPages"
        :disabled="pending"
        total-visible="7"
      />
    </div>
  </div>
</template>
