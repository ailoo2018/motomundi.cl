// stores/profile.ts
import { defineStore } from 'pinia'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RidingStyle {
  id: string
  label: string
  icon: string
  description: string
}

export interface ProfileState {
  // Profile data
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string | null
  gender: string
  ridingStyles: string[]

  // Async state — owned by the store, not scattered across components
  loading: boolean
  saving: boolean
  fetchError: string | null
  saveError: string | null

  // Tracks whether the server data has been loaded at least once.
  // Lets callers skip re-fetching on repeat visits within the same session.
  hydrated: boolean
}

// ─── Static data ─────────────────────────────────────────────────────────────

export const RIDING_STYLES: RidingStyle[] = [
  {
    id: 'rsRace',
    label: 'Sport / Racing',
    icon: 'IconSpeedboat',
    description: 'Circuitos, velocidad y máxima adrenalina en cada curva.',
  },
  {
    id: 'rsCafeRacer',
    label: 'Café Racer / Vintage',
    icon: 'IconVinyl',
    description: 'Estilo clásico y elegante inspirado en los años 60.',
  },
  {
    id: 'rsSportTouring',
    label: 'Touring / Ruta',
    icon: 'IconCompass',
    description: 'Largas rutas, comodidad y equipaje para la aventura.',
  },
  {
    id: 'rsScooter',
    label: 'Scooter / Urbano',
    icon: 'IconBike',
    description: 'Movilidad ágil y práctica en la ciudad.',
  },
  {
    id: 'rsMX',
    label: 'Motocross / Enduro',
    icon: 'IconMountain',
    description: 'Terrenos off-road, saltos y barro sin límites.',
  },
  {
    id: 'rsAdv',
    label: 'Trail / Adventure',
    icon: 'IconTrekking',
    description: 'Lo mejor del asfalto y la tierra en una sola moto.',
  },
]

// ─── Store ───────────────────────────────────────────────────────────────────

// The type of the profile fields only (excludes async state), used when
// patching or saving — callers shouldn't need to pass loading/error fields.
type ProfileData = Omit<ProfileState, 'loading' | 'saving' | 'fetchError' | 'saveError' | 'hydrated'>

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    firstName:    '',
    lastName:     '',
    phone:        '',
    dateOfBirth:  null,
    gender:       '',
    ridingStyles: [],
    isDirty: false,
    loading:     false,
    saving:      false,
    fetchError:  null,
    saveError:   null,
    hydrated:    false,
  }),

  getters: {
    // Convenience: full display name for navbars, greetings, etc.
    fullName: (state) =>
      [state.firstName, state.lastName].filter(Boolean).join(' ') || 'Mi Cuenta',

    // True if any async operation is in flight
    isBusy: (state) => state.loading || state.saving,
  },

  actions: {
    // ── Fetch ───────────────────────────────────────────────────────────────

    /**
     * Load the user's profile from the server.
     *
     * @param force - Re-fetch even if the store is already hydrated.
     *                Default false: skips the network call if data is fresh,
     *                making it safe to call from multiple components without
     *                triggering duplicate requests.
     */
    async fetchProfile(force = false) {
      // Skip if already loaded and not forced — avoids redundant network calls
      // when the user navigates back to the profile page in the same session.
      if (this.hydrated && !force) return

      this.loading    = true
      this.fetchError = null

      try {
        const data = await $fetch<Partial<ProfileData>>('/api/account/profile', {
          method: 'GET',
        })

        this.$patch({
          firstName:    data.firstName    ?? '',
          lastName:     data.lastName     ?? '',
          phone:        data.phone        ?? '',
          dateOfBirth:  data.dateOfBirth  ?? null,
          gender:       data.gender       ?? '',
          ridingStyles: data.ridingStyles ?? [],
          hydrated:     true,
        })
      } catch (err: any) {
        // Store the error message so the UI can display it.
        // We intentionally do NOT rethrow — the component decides how to react.
        this.fetchError = err?.data?.message ?? err?.message ?? 'Error al cargar el perfil'
      } finally {
        this.loading = false
      }
    },

    // ── Save ────────────────────────────────────────────────────────────────

    /**
     * Persist profile changes to the server, then update local state on
     * success. Throws on API error so the caller (useProfileForm) can
     * surface it to the user.
     */
    async saveProfile(data: Partial<ProfileData>) {
      this.saving    = true
      this.saveError = null

      try {
        await $fetch('/api/account/profile', {
          method: 'POST',
          body:   data,
        })

        // Only patch local state after a confirmed server success
        this.$patch(data)
      } catch (err: any) {
        this.saveError = err?.data?.message ?? err?.message ?? 'Error al guardar el perfil'
        throw err // re-throw so useProfileForm can show the snackbar
      } finally {
        this.saving = false
      }
    },

    // ── Draft (localStorage) ────────────────────────────────────────────────

    saveDraft(data: Partial<ProfileData>) {
      if (typeof window === 'undefined') return
      localStorage.setItem('motomundi_profile_draft', JSON.stringify(data))
    },

    clearDraft() {
      if (typeof window === 'undefined') return
      localStorage.removeItem('motomundi_profile_draft')
    },

    // ── Reset ───────────────────────────────────────────────────────────────

    /** Full reset — call on logout to clear any cached profile data. */
    reset() {
      this.$patch({
        firstName:    '',
        lastName:     '',
        phone:        '',
        dateOfBirth:  null,
        gender:       '',
        ridingStyles: [],
        loading:      false,
        saving:       false,
        fetchError:   null,
        saveError:    null,
        hydrated:     false,
      })
      this.clearDraft()
    },
  },
})
