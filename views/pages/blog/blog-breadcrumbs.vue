<script setup lang="ts">
const props = defineProps({
  category: {
    type: Object,
    default: () => null,
  },
})
</script>

<template>
  <div class="breadcrumbs">
    <span
      property="itemListElement"
      typeof="ListItem"
    >
      <a
        property="item"
        typeof="WebPage"
        href="/moto-blog/"
        class="home"
      >
        <span property="name">Blog Motomundi</span>
      </a>
      <meta
        property="position"
        content="1"
      >
    </span>
    <span
      property="itemListElement"
      typeof="ListItem"
    >
      <a
        property="item"
        typeof="WebPage"
        :href="category.friendlyUrl"
        class="home"
      >
        <span property="name">{{ category.name }}</span>
      </a>
      <meta
        property="position"
        content="2"
      >
    </span>
  </div>
</template>


