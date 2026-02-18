<script setup lang="ts">
import pdf from '@images/icons/project-icons/pdf.png'
const props = defineProps({
  journal: {
    type: Array,
    required: true,
    default: () => []
  }
})

const entries = computed(() => {
  // 1. Create a shallow copy to avoid mutating the original prop
  // 2. Convert to Date objects and subtract
  return [...props.journal].sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });
});
const getStatusDescription = statusId => {
  return useOrderStatus().getOrderStatusDescription(statusId)
}

const getDotColor = entry => {
  return useOrderStatus().getColor(entry.state)
}

</script>

<template>

  <VTimeline
    side="end"
    align="start"
    line-inset="8"
    truncate-line="start"
    density="compact"
  >
    <!-- SECTION Timeline Item: Flight -->
    <VTimelineItem
      v-for="entry in entries"
      :key="entry.id"
      :dot-color="getDotColor(entry)"
      size="x-small"
    >
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between align-center gap-2 flex-wrap mb-2">
            <span class="app-timeline-title">
              {{ getStatusDescription( entry.state )}}
            </span>
        <span class="app-timeline-meta">{{ formatDateTime(entry.creationDate)}}</span>
      </div>

      <!-- 👉 Content -->
      <div v-if="entry.state === 10">
        Esperamos que
        te haya encantado todo lo que has recibido. ¡Disfruta al máximo
        de tu compra!
      </div>
      <div class="app-timeline-text mt-1">
        {{entry.description}}

      </div>


      <div v-if="entry.state === 1" class="d-inline-flex align-center timeline-chip mt-2">
        <img
          :src="pdf"
          height="20"
          class="me-2"
          alt="img"
        >
        <span  class="app-timeline-text font-weight-medium">
              orden de compra.pdf
            </span>
      </div>
    </VTimelineItem>
  </VTimeline>

</template>

<style scoped lang="scss">

</style>
