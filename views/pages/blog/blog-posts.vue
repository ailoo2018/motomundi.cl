<script setup>
import { ref, computed } from 'vue'
import BlogGridItem from "@/views/pages/blog/blog-grid-item.vue"
import BlogBreadcrumbs from "@/views/pages/blog/blog-breadcrumbs.vue"
import BlogCategoryHeader from "@/views/pages/blog/categories/blog-category-header.vue"

const props = defineProps({
  categoryId: {
    type: String,
    default: '',
  },
})

useSeoMeta({
  title: () =>  title.value?.name || 'Loading Product...',
  ogTitle: () => title.value?.name,
  description: () => title.value?.description,
  ogDescription: () => title.value?.description,
})


const limit = 10
const currentPage = ref(1)
const title = ref({ name: "", description: "" })

useSeoMeta({
  title: () =>  title.value?.name || 'Loading Product...',
  ogTitle: () => title.value?.name,
  description: () => title.value?.description,
  ogDescription: () => title.value?.description,
})


const offset = computed(() => (currentPage.value - 1) * limit)

const { data: rs, pending } = useFetch(() =>
  `/api/blog/search?offset=${offset.value}&limit=${limit}&categoryId=${props.categoryId}`,
{
  key: "blog-category-" + `offset=${offset.value}&limit=${limit}&categoryId=${props.categoryId}` ,
  watch: [currentPage], // Explicitly watch currentPage
},
)

if(rs.value && rs.value.category){
  title.value.name = rs.value.category.name
  title.value.description = rs.value.category.name
}




const category = computed(() => {
  return rs.value?.category || null
})

// 3. Compute total pages from API metadata
// Assuming your API returns a "total" field
const totalPages = computed(() => {
  return rs.value?.total ? Math.ceil(rs.value.total / limit) : 1
})
</script>

<template>
  <div class="blog-container">
    <VProgressLinear
      v-if="pending"
      indeterminate
      color="primary"
    />

    <BlogBreadcrumbs :category="category" />

    <BlogCategoryHeader :category="category"/>

    <VRow
      v-if="rs?.entries"
      class="row flex"
    >
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
