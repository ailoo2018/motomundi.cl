<script setup lang="ts">

import {getCategoryUrl, getCategoryBrandUrl} from "@core/utils/formatters";

const props = defineProps({
  product: {
    type: Object,
  },
})

const category = computed( () => {
  if(!props.product)
    return { id: 0, name: "" }
  if(props.product.parentCategories && props.product.parentCategories.length > 0){
    return props.product.parentCategories[0]
  }
  
  return { id: 0, name: "" }
})

const categoryUrl = computed(() => {
  return getCategoryUrl(category.value)
})

const brandCategoryUrl = computed(() => {
  return getCategoryBrandUrl(category.value, props.product.brand)
})

</script>

<template>
  <!-- breadcrumbs -->
  <div class="breadcrumb-container">
    <ul class="breadcrumb">
      <li v-if="category" >
        <a
          :href="categoryUrl"
          class="mtc-link"
        >
         {{ category.name }}
        </a>
      </li>
      <li>
        <a
          :href="brandCategoryUrl"
          class="mtc-link"
        >
          {{ product.brand.name }}
        </a>
      </li>
      <li><span class="breadcrumb-current">{{ product.name }}</span></li>
    </ul>

    <span class="desktop-reference">
      <span>M-{{product.id}}</span>
      <span v-if="product.code" class="product-code">{{product.code}}</span>
    </span>
  </div>
  <!-- /breadcrumbs -->
</template>

<style scoped lang="scss">
.mobile .desktop-reference{
  display: none;
}

.breadcrumb-container{
  display: flex;
  justify-content: space-between;
}
/* Update your .breadcrumb li to this */
.breadcrumb {
  font-size: 11px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  display: flex;
  align-items: center; /* Ensures the whole row is centered */
}

.breadcrumb li {
  display: flex;       /* Use flex here too */
  align-items: center; /* Aligns text and chevron vertically */
}

.breadcrumb li:after {
  content: "";
  display: inline-block;
  background: transparent url('@images/svg/breadcrumb-chevron.svg') center no-repeat;
  background-size: contain;
  height: 8px;
  width: 10px;
  opacity: .5;
  /* Remove any extra margins that might be pushing it */
}

.breadcrumb li:last-child:after {
  display: none; /* Cleaner than background: unset */
}

/* Fix the padding on the links so they don't push the text away from the chevron */
li .mtc-link, li > a, .breadcrumb-current {
  color: #000;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .5px;
  padding: 6px 8px; /* Balanced padding */
  text-transform: uppercase;
  display: inline-block;
  vertical-align: middle;
}
</style>
