<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

const modules = [Autoplay]

const scrollItems = props.widget.configuration.items
</script>

<template>
  <ClientOnly>
    <swiper-container class="container text-center pt-2" events-prefix="swiper-">
      <swiper-slide
        v-for="item in scrollItems"
        :key="item"
      >
        <a href="item.link">
        {{item.text}}
        </a>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>

</template>


<style scoped>

.container {
  height: 40px;
  background: rgb(0, 0, 0);
  border-top: 3px solid rgb(0, 0, 0);
  border-bottom: 3px solid rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}

.container a {
  color: white;
  text-transform: uppercase;
}

/* Essential for the "Marquee" effect */
.text-swiper :deep(.swiper-wrapper) {
  /* This creates the linear, constant movement */
  transition-timing-function: linear !important;
}

.auto-width {
  width: auto !important;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

/* Optional: Pause on hover */
.text-swiper:hover :deep(.swiper-wrapper) {
  /* Swiper's autoplay naturally handles this if pauseOnMouseEnter is true,
     but for a pure linear ticker, CSS manual control is sometimes smoother */
}
</style>
