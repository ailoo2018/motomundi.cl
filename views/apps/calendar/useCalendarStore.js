export const useCalendarStore = defineStore('calendar', {
  // arrow function recommended for full type inference
  state: () => ({
    availableCalendars: [
      {
        color: 'error',
        label: 'Paseos',
      },
      {
        color: 'primary',
        label: 'Eventos',
      },
      {
        color: 'warning',
        label: 'Deporte',
      },
      {
        color: 'success',
        label: 'Clinicas',
      },
    ],
    selectedCalendars: ['Paseos', 'Eventos', 'Deporte', 'Clinicas'],
  }),
  actions: {
    async fetchEvents(from, to, currentPage, pageSize) {
      const { data, error } = await useFetch('/api/events/list', {
        method: "POST",
        key: `events-list-${from}-${currentPage}-${pageSize}`,
        body: {
          from: from,
          to: to,
          limit: pageSize || 12,
          currentPage: currentPage,
          offset: (currentPage - 1) * pageSize,
          calendars: this.selectedCalendars,
        },
      })

      if (error.value)
        return error.value
      
      return data.value
    },
    async addEvent(event) {
      await $api('/apps/calendar', {
        method: 'POST',
        body: event,
      })
    },
    async updateEvent(event) {
      return await $api(`/apps/calendar/${event.id}`, {
        method: 'PUT',
        body: event,
      })
    },
    async removeEvent(eventId) {
      return await $api(`/apps/calendar/${eventId}`, {
        method: 'DELETE',
      })
    },
  },
})
