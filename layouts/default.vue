<script setup>
import { getHeader } from 'h3'
import MotomundiHeaderbar from "@/views/pages/motomundi-headerbar.vue"
import MotomundiNavigation from "@/views/pages/motomundi-navigation.vue"
import MotomundiHeaderlogo from "@/views/pages/motomundi-headerlogo.vue"
import MotomundiFooter from "@/views/pages/motomundi-footer.vue"
import MobileHeader from "@/views/pages/mobile/mobile-header.vue"

const { injectSkinClasses } = useSkins()



// Get user-agent from request event
const event = useRequestEvent()
const ua = process.server && event
  ? (getHeader(event, 'user-agent') || '')
  : (process.client ? navigator.userAgent : '')

const deviceType = ua.match(/Mobile|Android|iPhone|iPad/) ? 'mobile' : 'desktop'


console.log("deviceType " +  deviceType + " ua: " + ua)

useHead({
  bodyAttrs: {
    class: deviceType,
  },
})

// ℹ️ This will inject classes in body tag for accurate styling
injectSkinClasses()
</script>

<template>
  <!-- mobile -->
  <div v-if="deviceType === 'mobile'">
    <main class="main-content" >
      <MobileHeader />

      <div class="home-container">
        <slot />
      </div>
    </main>
  </div>
  <!-- /mobile -->

  <!-- desktop -->
  <div v-else
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
        <MotomundiFooter/>
      </main>
    </div>
  </div>
  <!-- /desktop -->
</template>

<style>

/* 1. Hiding logic using Media Queries */
/*
@media (max-width: 960px) {
  .desktop-only-container { display: none !important; }
  .mobile-only-container { display: block !important; }
}

@media (min-width: 961px) {
  .mobile-only-container { display: none !important; }
  .desktop-only-container { display: block !important; }
}
*/



/* 2. Your existing styles modified to use Media Queries instead of .mobile/.desktop classes */

/* Background for Desktop */
@media (min-width: 961px) {
  body {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
    linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0) 400px) center/auto repeat-x,
    url("https://www.motomundi.cl/Content/uploads/1/_data/3/c2/3c25da0755aa485e9a984f5ca30cfe7f.jpg");
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

@media (min-width: 960px) {
  .v-container {
    width: 90%;
    min-width: 800px;
    max-width: 1300px;
  }
}




.layout-wrapper.layout-blank {
  flex-direction: column;
}


</style>
