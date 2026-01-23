<script setup lang="ts">
import breadCrumbsChevron from '@images/svg/breadcrumb-chevron.svg'

const props = defineProps({
  product: {
    type: Object,
  },
})

const category = computed( () => {
  if(props.product && props.product.categories && props.product.categories.length > 0){
    return props.product.categories[0].name
  }
  
  return "Home"
})
</script>

<template>
  <!-- breadcrumbs -->
  <div class="breadcrumb-container">
    <ul class="breadcrumb">
      <li>
        <a
          href="/cascos-integrales-para-moto"
          data-dr="true"
          class="mtc-link"
        >
          {{ category }}
        </a>
      </li>
      <li>
        <a
          href="/cascos-integrales-para-moto-hjc"
          data-dr="true"
          class="mtc-link"
        >
          {{ product.brand.name }}
        </a>
      </li>
      <li><span class="breadcrumb-current">{{ product.name }}</span></li>
    </ul>

    <span class="desktop-reference">
      <span>M-2419884</span>
      <span class="product-code">2419884</span>
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
