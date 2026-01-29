<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  description: {
    type: String,
    required: true,
  },
})

// State to track if the content is expanded or collapsed
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <section
    class="product-description description"
    :class="{ 'collapsed': !isExpanded }"
  >
    <h2>Información del producto</h2>
    <div id="prod-desc-body" class="description-content">
      <div v-html="description" />
    </div>

    <button
      v-if="!isExpanded"
      class="show-more show-full-description"
      @click="toggleExpand"
    >
      <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" class="icon sprite-line-icons">
        <use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-plus"/>
      </svg>
      Mostrar descripción completa
    </button>

    <button
      v-else
      class="show-less hide-full-description"
      @click="toggleExpand"
    >
      <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" class="icon sprite-line-icons">
        <use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-minus"/>
      </svg>
      Mostrar menos
    </button>
  </section>
</template>

<style scoped lang="scss">
.description {
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 50px;
  padding-right: 50px;
  transition: max-height 0.3s ease-out; // Added smooth transition
}

@media (max-width: 960px) {
  .description {
    padding-right: 0px;
  }

}

.description.collapsed {
  max-height: 550px;
  overflow: hidden;
  position: relative;

  // Optional: Add a fade-out effect at the bottom when collapsed
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(transparent, white);
    pointer-events: none;
  }
}

/** description icon styles **/


.description-content {
  // This targets the UL inside the v-html div
  :deep(b) {
    font-weight: 700;
  }
  :deep(p) {
    margin-bottom: 12px;
  }
  :deep(ul) {
    padding-left: 0;
    list-style: none; // Often needed if you're using custom icons

    li {
      position: relative;
      padding-left: 25px; // Make room for your absolute icon
      margin-bottom: 8px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 7px;
        width: 15px;
        height: 11px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjExIiB3aWR0aD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0IDFsLTguOTM3IDlMMSA1LjkwOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS42Ii8+PC9zdmc+) 0 0 no-repeat;
        background-size: 90% auto;
        display: block;
      }
    }
  }
}



.description.collapsed .show-full-description {
  display: block;
}

.description .show-full-description {
  bottom: 0;
  display: none;
  left: 0;
  position: absolute;
  z-index: 10;
}

.description.collapsed:after {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, #fff 83%, #fff);
  bottom: 0;
  content: "";
  display: block;
  height: 200px;
  left: 0;
  position: absolute;
  right: 0;
  width: 100%;
}


.description .hide-full-description, .description .show-full-description {
  border-bottom: 1px solid #000;
  color: #000;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 0;
  text-transform: uppercase;
}
</style>
