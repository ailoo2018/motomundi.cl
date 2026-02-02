<script setup>
import { getBaseCDN } from "@core/utils/formatters.js"
import BlogGridItem from "@/views/pages/blog/blog-grid-item.vue"

const { data: rs } = useFetch("/api/blog/featured-posts?limit=10")



const currentPage = ref(1)
const totalPages = ref(10)

</script>

<template>
  <div class="grid grid-container previous-posts-container">
    <VRow class="row flex">
      <VCol
        v-for="entry in rs.entries"
        :key="entry.id"
        cols="6"
        sm="6"
        xs="12"

      >
        <BlogGridItem
          :entry="entry"
          class="grid-item review type-review status-publish has-post-thumbnail hentry "
        />
      </VCol>
    </VRow>
  </div>
  <VPagination
    v-model="currentPage"
    :length="totalPages"
  />

</template>
<style>


</style>


