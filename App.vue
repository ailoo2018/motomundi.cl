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

const configStore = useConfigStore()
const { isMobile } = useDevice()
if (isMobile)
  configStore.appContentLayoutNav = 'vertical'


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
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

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
