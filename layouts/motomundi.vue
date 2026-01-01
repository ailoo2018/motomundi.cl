<script setup>
import MotomundiHeaderbar from "@/views/pages/motomundi-headerbar.vue";
import MotomundiNavigation from "@/views/pages/motomundi-navigation.vue";
import MotomundiHeaderlogo from "@/views/pages/motomundi-headerlogo.vue";
import swiper from "@/views/pages/home/swiper.vue";
import FeaturedProducts from "@/views/pages/home/featured-products.vue";
import ScrollingText from "@/views/pages/home/scrolling-text.vue";
import MotomundiFooter from "@/views/pages/motomundi-footer.vue";
import AddedValues from "@/views/pages/home/added-values.vue";
import HomeCategories from "@/views/pages/home/home-categories.vue";

const {injectSkinClasses} = useSkins()

// ℹ️ This will inject classes in body tag for accurate styling
injectSkinClasses()
</script>

<template>

  <div
      class="layout-wrapper layout-blank"
      data-allow-mismatch
  >
    <div class="landing-page-wrapper">

      <MotomundiHeaderbar/>
      <MotomundiHeaderlogo/>
      <MotomundiNavigation/>

      <main class="main-content">
        <slot/>
        <!-- 👉 Footer -->
        <MotomundiFooter />
      </main>


    </div>
  </div>
</template>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}


.main-content {
  width: 90%;
  min-width: 800px;
  max-width: 1300px;
  margin: auto;
  background-color: white;
}

@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}

@media (min-width: 960px) {
  .v-container {
    width: 90%;
    min-width: 800px;
    max-width: 1300px;

  }
}

</style>
