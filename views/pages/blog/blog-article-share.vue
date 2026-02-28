<script setup lang="ts">
const props = defineProps({
  entry: {
    type: Object,
    default: () => null,
  },
})
</script>

<template>
  <div class="share-links-wrapper">
    <a
      href="#"
      onclick="window.open(`https://twitter.com/intent/tweet?source=webclient&amp;text=${entry.Name}+-+https://www.motomundi.cl/$linkHelper.GetUrl($entry)`, 'Twitter','width=600, height=600'); return false;"
    >
      <img
        src="/content/images/assets/icons/social-twitter.svg"
        class="lazyloaded"
        data-ll-status="loaded"
      >
      <noscript><img
        src="/content/images/assets/icons/social-twitter.svg"
      >
      </noscript>
    </a> <a
    href="#"
    onclick="window.open('https://www.facebook.com/sharer.php?u=https://www.motomundi.cl/$linkHelper.GetUrl($entry)&amp;t=$entry.Name', 'Facebook','width=600, height=600'); return false;"
  >
    <img
      src="/content/images/assets/icons/social-facebook.svg"
      class="lazyloaded"
      data-ll-status="loaded"
    >
    <noscript><img
      src="/content/images/assets/icons/social-facebook.svg"
    >
    </noscript>
  </a> <a
    href="#"
    onclick="window.open('https://web.whatsapp.com/send?text=$entry.Name - https://www.motomundi.cl/$linkHelper.GetUrl($entry)', 'Whatsapp','width=600, height=600'); return false;"
  >
    <img
      src="/content/images/assets/icons/social-whatsapp.svg"
      class="lazyloaded"
      data-ll-status="loaded"
    >
    <noscript><img
      src="/content/images/assets/icons/social-whatsapp.svg"
    >
    </noscript>
  </a>
  </div>
</template>

<style scoped lang="scss">

</style>
