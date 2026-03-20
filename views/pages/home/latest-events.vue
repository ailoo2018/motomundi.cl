<script setup lang="ts">
import { computed } from 'vue'
import { getDataImageUrl } from "@core/utils/formatters"

const props = defineProps({
  widget: {
    type: Object,
  }
})

// Using Nuxt 4 useFetch best practices
const { data: rs } = await useFetch(`/api/events/latest-events`, {
  query: { limit: 3 },
  key: `events-latest-3`,
})

const events = computed(() => rs.value?.events || [])

// Improved date formatting for a cleaner look
const fmtDate = (d: string) => {
  return new Date(d).toLocaleDateString('es-CL', {
    month: 'short',  // "ene" instead of "enero" saves space
    day: '2-digit',
    year: 'numeric'
  }).toUpperCase()
}

// Reduced limit for better card uniformity
const truncateText = (text: string, limit: number = 100) => {
  if (!text) return ''
  return text.length > limit ? text.substring(0, limit).trim() + '...' : text
}

// Mock formatMoney if not globally provided
const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
}
</script>

<template>
  <section id="home-latest-events" class="events-section">
    <div class="container">
      <h2 class="section-title">
        <VIcon class="tabler-calendar" size="28" />
        Próximos Eventos
      </h2>

      <div class="events-slider" v-if="events.length">
        <article
          v-for="e in events"
          :key="e.id || e.title"
          class="event-card"
        >
          <a :href="`/calendario/${e.slug || ''}`" class="card-image-link">
            <img
              decoding="async"
              loading="lazy"
              :src="getDataImageUrl(e.imageId, 600, getDomainId())"
              :alt="`Imagen del evento ${e.title}`"
              class="event-image"
            >
            <div class="date-badge">
              <VIcon class="tabler-calendar-event" size="16" />
              <span>{{ fmtDate(e.startDate) }}</span>
            </div>
          </a>

          <div class="card-content">
            <h3 class="event-title">
              <a :href="`/calendario/${e.slug || ''}`">{{ e.title }}</a>
            </h3>

            <p class="event-summary">
              {{ truncateText(e.summary, 90) }}
            </p>

            <div class="card-footer">
              <div class="event-location" v-if="e.location">
                <VIcon class="tabler-map-pin accent-icon"/>
                <span>{{ e.location }}</span>
              </div>

              <div v-if="e.price && e.price > 0" class="event-price">
                <VIcon class="tabler-cash accent-icon"/>
                <span>{{ formatMoney(e.price) }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="cta-container">
        <a href="/calendario" class="btn-primary">
          Ver calendario de eventos
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Base Variables & Section Setup */
.events-section {
  background-color: #F5F5F5;
  padding: 60px 0;
  font-family: system-ui, -apple-system, sans-serif;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 900;
  font-size: 2rem;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 40px;
}

/* Native CSS Slider / Grid */
.events-slider {
  display: flex;
  gap: 30px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  padding-bottom: 20px; /* Space for shadow */
}

.events-slider::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Event Card Design */
.event-card {
  flex: 0 0 calc(100% - 40px); /* Mobile full width minus padding */
  scroll-snap-align: center;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-image-link {
  position: relative;
  display: block;
  height: 220px;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.date-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.event-title {
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.3;
}

.event-title a {
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s ease;
}

.event-title a:hover {
  color: #d6001c; /* Accent color on title hover */
}

.event-summary {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 20px;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 16px;
  font-size: 0.9rem;
  color: #444;
}

.event-location, .event-price {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

.accent-icon {
  color: #d6001c; /* Brand accent sparingly applied */
}

.event-price {
  color: #d6001c; /* Highlight price slightly */
}

/* Call to Action Button */
.cta-container {
  text-align: center;
  margin-top: 20px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  padding: 14px 28px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #d6001c;
  border-color: #d6001c;
  color: #FFFFFF;
}

/* Desktop & Tablet Grid */
@media (min-width: 768px) {
  .events-slider {
    overflow-x: visible;
  }

  .event-card {
    flex: 1 1 calc(33.333% - 20px);
  }
}
</style>
