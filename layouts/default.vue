// layouts/default.vue
<script setup>

import MotomundiHeaderbar from "@/views/pages/motomundi-headerbar.vue"
import MotomundiNavigation from "@/views/pages/motomundi-navigation.vue"
import MotomundiHeaderlogo from "@/views/pages/motomundi-headerlogo.vue"
import MotomundiFooter from "@/views/pages/motomundi-footer.vue"
import MobileHeader from "@/views/pages/mobile/mobile-header.vue"
import MobileFooter from "@/views/pages/mobile/mobile-footer.vue"
import AppLoader from "@/components/AppLoader.vue"
import YoutubeLatest from "@/views/pages/home/youtube-latest.vue"
import NewsletterSignUp from "@/views/pages/home/NewsletterSignUp.vue"


const deviceType = useState('device-type', () => {
  // This function only runs on the SERVER during the first request
  const event = useRequestEvent()
  return event?.context.deviceType || 'desktop'
})

const isMobile = computed(() => deviceType.value === 'mobile')

const { injectSkinClasses } = useSkins()
injectSkinClasses()

const { setDepartment} = useDepartment()

onMounted(() => {
  const stored = localStorage.getItem('mm-user-department')
  if (stored) setDepartment(Number(stored))
})

</script>

<template>

  <AppLoader />
  <!-- mobile -->
  <div v-if="isMobile" class="mobile-layout">
    <main class="main-content">
      <MobileHeader/>
      <div class="home-container">
        <slot/>
      </div>
      <NewsletterSignUp />
      <YoutubeLatest />
      <MobileFooter/>
    </main>
  </div>

  <!-- desktop -->
  <div v-else class="desktop-layout layout-wrapper layout-blank">

    <div class="landing-page-wrapper desktop-only-container">
      <MotomundiHeaderbar/>
      <MotomundiHeaderlogo/>
      <MotomundiNavigation />
      <main class="main-content">
        <slot/>
        <NewsletterSignUp />
        <YoutubeLatest />
        <MotomundiFooter/>
      </main>
    </div>
  </div>

  <WhatsAppFab/>
</template>

<style>

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
