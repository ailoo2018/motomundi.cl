<script setup>
import FullCalendar from '@fullcalendar/vue3'
import {
  blankEvent,
  useCalendar,
} from '@/views/apps/calendar/useCalendar'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'

// Components
import CalendarEventHandler from '@/views/apps/calendar/CalendarEventHandler.vue'

const store = useCalendarStore()


const currentPage = ref(1)
const pageSize = ref(12)


const now = new Date()


// 1. Move the calculation logic into a computed property
const fetchBody = computed(() => {
  const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), now.getDay() )
  
  return {
    from: firstDayMonth,
    to: null,
    limit: pageSize.value,
    currentPage: currentPage.value,
    offset: (currentPage.value - 1) * pageSize.value,
    calendars: store.selectedCalendars,
  }
})

// 2. Use useFetch at the top level
const { data: eventResponse, pending, refresh } = await useFetch('/api/events/list', {
  method: 'POST',
  body: fetchBody, // Nuxt watches this automatically because it's a computed
  key: 'events-list', // Use a static key
  watch: [currentPage, () => store.selectedCalendars], // Re-run when these change
})

const events = computed(() => {
  return eventResponse.value?.events || []})

const totalPages = computed(() => {
  const total = eventResponse.value?.totalCount || 0
  
  return Math.ceil(total / pageSize.value)
})

const loading = computed(() => pending.value)



// 👉 Event
const event = ref(structuredClone(blankEvent))
const isEventHandlerSidebarActive = ref(false)
const isViewEventDetail = ref(false)

watch(isEventHandlerSidebarActive, val => {
  if (!val)
    event.value = structuredClone(blankEvent)
})

const { isLeftSidebarOpen } = useResponsiveLeftSidebar()

// 👉 useCalendar
const { refCalendar, calendarOptions, addEvent, updateEvent, removeEvent, jumpToDate } = useCalendar(event, isEventHandlerSidebarActive, isLeftSidebarOpen)

// SECTION Sidebar

// 👉 Check all
const checkAll = computed({

  /*GET: Return boolean `true` => if length of options matches length of selected filters => Length matches when all events are selected
SET: If value is `true` => then add all available options in selected filters => Select All
Else if => all filters are selected (by checking length of both array) => Empty Selected array  => Deselect All
*/
  get: () => store.selectedCalendars.length === store.availableCalendars.length,
  set: val => {
    if (val)
      store.selectedCalendars = store.availableCalendars.map(i => i.label)
    else if (store.selectedCalendars.length === store.availableCalendars.length)
      store.selectedCalendars = []
  },
})

const jumpToDateFn = date => {
  jumpToDate(date)
}
</script>

<template>
  <div>
    <VCard class="pa-4">
      <!-- `z-index: 0` Allows overlapping vertical nav on calendar -->
      <VLayout style="z-index: 0;">
        <!-- 👉 Navigation drawer -->
        <VDialog
          v-model="isEventHandlerSidebarActive"
          max-width="800"
        >
          <VCard :title="event.title">
            <VCardText>
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                >
                  <VImg :src="getBaseCDN() + event.imageUrl" />
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                >
                  <p>
                    {{ event.summary }}
                  </p>
                  <p class="mt-4">
                    <VIcon
                      class="tabler-map-pin-filled"
                      color="primary"
                    />
                    {{ event.location }}
                  </p>
                  <p class="mt-2">
                    <VIcon
                      class="tabler-calendar"
                      color="primary"
                    />
                    {{ formatDate( event.start ) }}
                  </p>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VDialog>


        <VNavigationDrawer
          v-model="isLeftSidebarOpen"
          data-allow-mismatch
          width="292"
          absolute
          touchless
          location="start"
          class="calendar-add-event-drawer"
          :temporary="$vuetify.display.mdAndDown"
        >
          <div style="margin: 1.5rem;">
            <VBtn
              block
              prepend-icon="tabler-plus"
              @click="isEventHandlerSidebarActive = true"
            >
              Agregar Evento
            </VBtn>
          </div>

          <VDivider />

          <div class="d-flex align-center justify-center pa-2">
            <AppDateTimePicker
              id="calendar-date-picker"
              :model-value="new Date().toJSON().slice(0, 10)"
              :config="{ inline: true }"
              class="calendar-date-picker"
              @update:model-value="jumpToDateFn"
            />
          </div>

          <VDivider />
          <div class="pa-6">
            <h6 class="text-lg font-weight-medium mb-4">
              Filtros
            </h6>

            <div class="d-flex flex-column calendars-checkbox">
              <VCheckbox
                id="check-all-events"
                v-model="checkAll"
                label="Ver todos"
              />
              <VCheckbox
                v-for="(calendar, index) in store.availableCalendars"
                :id="`${index}`"
                :key="calendar.label"
                v-model="store.selectedCalendars"
                :value="calendar.label"
                :color="calendar.color"
                :label="calendar.label"
              />
            </div>
          </div>
        </VNavigationDrawer>

        <VMain>
          <VCard flat>
            <FullCalendar
              ref="refCalendar"
              :options="calendarOptions"
            />
          </VCard>
        </VMain>
      </VLayout>
    </VCard>
  </div>

  <VContainer>
  <VRow class="mt-5 ">
    <VCol
      v-for="event in events"
      :key="event.id"
      cols="12"
      sm="6"
      md="4"
      lg="4"
      class="ma-0"
    >
      <VCard class="h-100 mb-2">
        <VCardText>
          <VImg
            max-height="350px"
            class="mb-4"
            cover
            :src="getBaseCDN() + event.imageUrl"
          />

          {{ event.summary }}
          <p class="mt-4">
            <VIcon
              class="tabler-map-pin-filled"
              color="primary"
            />
            {{ event.location }}
          </p>
          <p class="mt-2">
            <VIcon
              class="tabler-calendar"
              color="primary"
            />
            {{ formatDate( event.startDate ) }}
          </p>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VPagination
        v-model="currentPage"
        :length="totalPages"
        :disabled="loading"
        total-visible="7"
      />
    </VCol>
  </VRow>
  </VContainer>
</template>

<style lang="scss">
@use "@core/scss/template/libs/full-calendar";

.calendars-checkbox {
  .v-label {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    opacity: var(--v-high-emphasis-opacity);
  }
}

.calendar-add-event-drawer {
  &.v-navigation-drawer:not(.v-navigation-drawer--temporary) {
    border-end-start-radius: 0.375rem;
    border-start-start-radius: 0.375rem;
  }

  &.v-navigation-drawer--temporary:not(.v-navigation-drawer--active) {
    transform: translateX(-110%) !important;
  }
}

.calendar-date-picker {
  display: none;

  +.flatpickr-input {
    +.flatpickr-calendar.inline {
      border: none;
      box-shadow: none;

      .flatpickr-months {
        border-block-end: none;
      }
    }
  }

  & ~ .flatpickr-calendar .flatpickr-weekdays {
    margin-block: 0 4px;
  }
}

@media screen and (max-width: 1279px) {
  .calendar-add-event-drawer {
    border-width: 0;
  }
}
</style>

<style lang="scss" scoped>
.v-layout {
  overflow: visible !important;

  .v-card {
    overflow: visible;
  }
}
</style>
