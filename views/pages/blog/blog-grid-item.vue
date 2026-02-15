<script setup lang="ts">
import { getBaseCDN } from "@core/utils/formatters"

const props = defineProps({
  entry: {
    type: Object,
  },
})
</script>

<template>
  <article
    id="post-$entry.Id"
    v-bind="$attrs"
  >
    <header class="title-container">
      <a :href="entry.friendlyUrl">
        <h2 style="height: 96px;">{{ entry.title }} </h2>
      </a>
      <p class="posts-date-category">
        <span class="date">
          {{ entry.createDate }}
          <span class="bull">●</span>
        </span>
        <a
          class="parent-category"
          href="#"
        >
          Reviews y pruebas </a>
        <a
          class="child-category"
          href="#"
        >
          <span class="category-slash"> &gt; </span>
          Electrónica para tu moto
        </a>
      </p>
    </header>
    <a :href="entry.friendlyUrl">
      <div class="img-wrapper">
        <img
          :src="`${getBaseCDN()}${entry.previewImage}`"
          class="image wp-post-image lazyloaded"
          :alt="entry.title"
        >
      </div>
      <div
        class="text-container"
        itemprop="articleBody"
      >
        <div class="post-excerpt">
          <p>{{ entry.previewText }}</p>
        </div>
        <span class="read-more">Seguir leyendo
          <img src="/content/assets/icons/read-more.svg">
        </span>
      </div>
    </a>
  </article>
</template>


