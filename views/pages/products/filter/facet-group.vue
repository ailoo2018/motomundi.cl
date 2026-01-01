<script setup lang="ts">
const props = defineProps({
  facetGroup: {
    type: Object,
  },
})

const isShowFacet = ref(false)
</script>

<template>
  <li
    v-if="facetGroup?.length > 0"
    class="facet ng-scope"
    :class="isShowFacet ? 'expanded' : ''"
  >
    <button @click="isShowFacet = !isShowFacet">
      Categoría
    </button>
    <ul
      v-if="isShowFacet"
      class="facets-mobile__list"
    >
      <li
        v-for="category in facetGroup"
        class="ng-scope"
      >
        <span
          :class="category.selected ? 'checked' : ''"
          class="fake-checkbox"
          @click="category.selected = !category.selected"
        >
          <span>{{ category.name }}</span>
        </span>
        <div class="filters__extras">
          <strong class="facets__total ng-binding">{{ category.count }}</strong>
        </div>
      </li>
    </ul>
  </li>
</template>


