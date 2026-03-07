<script setup lang="ts">

import BikeSelector from "@/views/pages/bike-selector.vue"
import {getHeader} from "h3";

const deviceType = useState('device-type', () => {
  // This function only runs on the SERVER during the first request
  const event = useRequestEvent()
  return event?.context.deviceType || 'desktop'
})

const isMobile = computed(() => deviceType.value === 'mobile')
// const deviceType = ua.match(/Mobile|Android|iPhone|iPad/) ? 'mobile' : 'desktop'

</script>

<template>
  <section class="bike-search-block">
    <div class="bike-selector__container">
      <div class="bike-search horizontal">
        <h2 class="h3">
          Elige tu modelo de moto para ver accesorios específicos
        </h2> 
        <div class="bike-search-filter">
          <BikeSelector :as-row="!isMobile" />
        </div>
        <div
          class="add-bike"
          style="display: none;"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.bike-search-block {
  padding: 50px 40px 40px;
}

@media (max-width: 961px) {
  .bike-search-block {
    padding: 30px 10px 20px;
  }

}

.bike-search .h3 {
  display: block;
  font-size: 14px;
  font-weight: 900;
  line-height: 16px;
  margin: 0 auto 20px;
  text-align: left;
  text-transform: uppercase;
}

.bike-search-block .bike-search.horizontal .h3 {
  font-size: 24px;
  font-weight: 900;
  line-height: 1.2em;
  margin: 0 auto 30px;
}
</style>
