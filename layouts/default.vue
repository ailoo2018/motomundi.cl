<script setup>
import MotomundiHeaderbar from "@/views/pages/motomundi-headerbar.vue"
import MotomundiNavigation from "@/views/pages/motomundi-navigation.vue"
import MotomundiHeaderlogo from "@/views/pages/motomundi-headerlogo.vue"
import MotomundiFooter from "@/views/pages/motomundi-footer.vue"
import MobileHeader from "@/views/pages/mobile/mobile-header.vue"
import MobileFooter from "@/views/pages/mobile/mobile-footer.vue"

const { injectSkinClasses } = useSkins()
injectSkinClasses()
</script>

<template>
  <!-- mobile -->
  <div class="mobile-layout">
    <main class="main-content">
      <MobileHeader />
      <div class="home-container"><slot /></div>
      <MobileFooter />
    </main>
  </div>

  <!-- desktop -->
  <div class="desktop-layout layout-wrapper layout-blank">

    <div class="landing-page-wrapper desktop-only-container">
      <MotomundiHeaderbar />
      <MotomundiHeaderlogo />
      <MotomundiNavigation />
      <main class="main-content">
        <slot />
        <MotomundiFooter />
      </main>
    </div>
  </div>

  <WhatsAppFab />
</template>

<style>
/* Mobile layout: show on small screens, hide on large */
.mobile-layout  { display: block; }
.desktop-layout { display: none;  }

@media (min-width: 961px) {
  .mobile-layout  { display: none;  }
  .desktop-layout { display: block; }
}
/* Background for Desktop */
@media (min-width: 961px) {
  body {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
    linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
    url("/mm-bg.jpg");
  }

  .desktop-only-container .main-content {
    width: 90%;
    min-width: 800px;
    max-width: 1300px;
    margin: auto;
    background-color: white;
  }
}

/* Main Content for Mobile */
@media (max-width: 960px) {
  .mobile-only-container .main-content {
    width: 100%;
    margin: auto;
    background-color: white;
  }
}

.layout-wrapper.layout-blank {
  flex-direction: column;
}

@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper .v-container {
    padding-inline: 2rem !important;
  }
}






.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
