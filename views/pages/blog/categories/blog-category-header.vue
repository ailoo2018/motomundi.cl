<script setup lang="ts">

const props = defineProps({
  category: {
    type: Object,
    default: () => null,
  },
})



</script>

<template>
  <div class="category-title-container">
    <div class="title-container">
      <h1 class="page-title">
        <img src="/content/images/assets/icons/review.svg" >
        <span>{{category?.name}}</span>
      </h1>
      <div class="taxonomy-description">

      </div>
      <div class="categories-archive-container">
        <ul id="menu-principal-desktop-mobile" class="vertical menu-list menu" >

          <li>
            <a class="current" :href="category?.friendlyUrl">Todo</a>
          </li>

        </ul>
      </div>
    </div>
  </div>

  <div class="section-separator-title under-categories">
    <p>Destacado  <span>{{category.name}}</span></p>
  </div>

</template>

<style scoped lang="scss">

</style>
