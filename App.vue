<script setup>
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config'
import { hexToRgb } from '@core/utils/colorConverter'

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()



if (process.client) {
  const originalSetAttribute = Element.prototype.setAttribute
  Element.prototype.setAttribute = function(name, value) {
    try {
      if (value === undefined || value === null) {
        console.warn(`Attempted to set ${name} to ${value}`)
        return
      }
      originalSetAttribute.call(this, name, value)
    } catch (e) {
      console.error('setAttribute error:', { name, value, element: this })
      throw e
    }
  }
}
</script>

<template>
  <VLocaleProvider >
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp >
      <!-- Add this debug line -->
      <div style="position:fixed;top:0;right:0;z-index:99999;background:red;color:white;padding:4px">
        {{ $route.path }}
      </div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <CountryPopup />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>

<style lang="scss">
.v-application
{
  display: flex;
  background: transparent !important;
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
