<script setup lang="ts">
import SearchFilters from "@/views/pages/products/filter/search-filters.vue"

const showFilters = defineModel({
  type: Boolean,
  default: () => false,
})

const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
})
const resetFilters = () => {

}


const emit = defineEmits(['filters-changed'])

const toggleSearchFilter = () => {
  showFilters.value = false
}

watch(
  () => props.filters,
  (newFilters) => {
    emit('filters-changed', newFilters)
  },
  { deep: true }
)


</script>

<template>
  <nav
    class="search-mobile__filters"
    style="background: #fff;"
    :class="showFilters ? 'show' : ''"
  >
    <div class="search-mobile__filters-container" style="background-color: #fff">
      <div class="search-mobile__filters-header">
        <button
          class="clear-filters"
          @click="resetFilters"
        >
          Borrar filtros
        </button>
        <button
          class="close-filters"
          @click="toggleSearchFilter"
        >
          <svg
            height="10"
            width="10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            class="icon sprite-icons"
          >
            <use
              href="/content/svg/motomundi.svg#i-close"
              xlink:href="/content/svg/motomundi.svg#i-close"
            />
          </svg>
        </button>
      </div>
      <div class="search-mobile__filters-content">
        <SearchFilters
          :filters="filters"
          is-mobile
        />
      </div>
      <div class="search-mobile__buttons">
        <VBtn
          class="apply-filters w-100 mt-4"
          rounded="0"
          @click="toggleSearchFilter"
        >
          Aplicar
        </VBtn>
      </div>
    </div>
  </nav>
</template>


