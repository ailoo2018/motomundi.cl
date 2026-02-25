// stores/profile.ts
import { defineStore } from 'pinia'

export interface RidingStyle {
  id: string
  label: string
  icon: string
  description: string
}

export interface ProfileState {
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string | null
  gender: string
  ridingStyles: string[]
}

export const RIDING_STYLES: RidingStyle[] = [
  {
    id: 'sport',
    label: 'Sport / Racing',
    icon: 'IconSpeedboat',
    description: 'Circuitos, velocidad y máxima adrenalina en cada curva.',
  },
  {
    id: 'cafe_racer',
    label: 'Café Racer / Vintage',
    icon: 'IconVinyl',
    description: 'Estilo clásico y elegante inspirado en los años 60.',
  },
  {
    id: 'touring',
    label: 'Touring / Ruta',
    icon: 'IconCompass',
    description: 'Largas rutas, comodidad y equipaje para la aventura.',
  },
  {
    id: 'urban',
    label: 'Scooter / Urbano',
    icon: 'IconBike',
    description: 'Movilidad ágil y práctica en la ciudad.',
  },
  {
    id: 'motocross',
    label: 'Motocross / Enduro',
    icon: 'IconMountain',
    description: 'Terrenos off-road, saltos y barro sin límites.',
  },
  {
    id: 'adventure',
    label: 'Trail / Adventure',
    icon: 'IconTrekking',
    description: 'Lo mejor del asfalto y la tierra en una sola moto.',
  },
]

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: null,
    gender: '',
    ridingStyles: [],
  }),

  actions: {
    async saveProfile(data: Partial<ProfileState>) {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1200))
      this.$patch(data)
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('motomundi_profile_draft')
      if (saved) {
        try {
          this.$patch(JSON.parse(saved))
        } catch {}
      }
    },

    saveDraft(data: Partial<ProfileState>) {
      localStorage.setItem('motomundi_profile_draft', JSON.stringify(data))
    },

    clearDraft() {
      localStorage.removeItem('motomundi_profile_draft')
    },
  },
})
