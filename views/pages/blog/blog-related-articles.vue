<script setup lang="ts">

</script>

<template>
  <div class="recommended-most-viewed-container">
    <div class="recommended-posts mini-posts-container sidebar-block">
      <p class="sidebar-title">
        Te recomendamos
      </p>
      <div class="posts">
        <div
          v-for="r in entries"
          class="post-container"
        >
          <a href="$r.friendlyUrl">
            <div class="image-container">
              <div
                class="image rocket-lazyload lazyloaded"
                style="background-image: url(&quot;https://www.motomundi.cl$r.previewImage&quot;);"
              />
            </div>
            <div class="text-container">
              <div class="title">{{ r.title }}</div>
              <div class="date">{{ r.createDate }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
