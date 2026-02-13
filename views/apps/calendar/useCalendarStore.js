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
    async fetchEvents(from, to, currentPage, pageSize, who) {
      console.log("calling events/list cartStore: " + JSON.stringify({ from, to, currentPage, pageSize, who }))

      const  data = await $fetch('/api/events/list', {
        method: "POST",
        key: `events-list-` + JSON.stringify({ from, to, currentPage, pageSize, who }),
        body: {
          who: who || "unknown",
          from: from || null,
          to: to || null,
          limit: pageSize || 1000,
          currentPage: currentPage || 1,
          offset: currentPage && pageSize ? (currentPage - 1) * pageSize : 0,
          calendars: this.selectedCalendars,
        },
      })


      return data
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
