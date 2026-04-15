<script setup lang="ts">
import pdf from '@images/icons/project-icons/pdf.png'

const props = defineProps({
  journal: {
    type: Array,
    required: true,
    default: () => [],
  },
})

console.log("entries: " + JSON.stringify(props.journal))

const entries = computed(() => {
  // Group by orderId to find duplicates with state === 2
  const seen = new Map()

  const filtered = props.journal.filter(entry => {
    // Only deduplicate entries with state === 2
    if (entry.state === 2) {
      const key = entry.orderId // Use orderId as the unique key for duplicates

      if (!seen.has(key)) {
        // First time seeing this orderId with state === 2
        seen.set(key, entry)
        return true
      }

      // Keep the earliest (smallest creationDate)
      const existingEntry = seen.get(key)
      if (new Date(entry.creationDate).getTime() < new Date(existingEntry.creationDate).getTime()) {
        // Current entry is earlier, replace the existing one
        seen.set(key, entry)
        return true
      }

      // This entry is a duplicate and later than the kept one, so filter it out
      return false
    }

    // Keep all entries that are not state === 2
    return true
  })

  // Sort by creationDate descending (newest first)
  return filtered.sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
  })
})

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
          {{ getStatusDescription( entry.state ) }}
        </span>
        <span class="app-timeline-meta">{{ formatDateTime(entry.creationDate) }}</span>
      </div>

      <!-- 👉 Content -->
      <div v-if="entry.state === 10">
        Esperamos que
        te haya encantado todo lo que has recibido. ¡Disfruta al máximo
        de tu compra!
      </div>
      <div class="app-timeline-text mt-1">
        {{ entry.description !== 'null' ? entry.description : '' }}
      </div>


      <div
        v-if="entry.state === 1"
        class="d-inline-flex align-center timeline-chip mt-2"
      >
        <img
          :src="pdf"
          height="20"
          class="me-2"
          alt="img"
        >
        <span class="app-timeline-text font-weight-medium">orden de compra.pdf</span>
      </div>
    </VTimelineItem>
  </VTimeline>
</template>


