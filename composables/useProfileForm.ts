// composables/useProfileForm.ts
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore, RIDING_STYLES } from '~/stores/profile'
import type { ProfileState } from '~/stores/profile'

// ─── SSR-safe localStorage wrapper ──────────────────────────────────────────
const storage = {
  get:    (k: string) => (typeof window !== 'undefined' ? localStorage.getItem(k) : null),
  set:    (k: string, v: string) => { if (typeof window !== 'undefined') localStorage.setItem(k, v) },
  remove: (k: string) => { if (typeof window !== 'undefined') localStorage.removeItem(k) },
}

// ─── Pure validators ─────────────────────────────────────────────────────────

const lettersOnly       = (v: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s-]+$/.test(v)
const parseChileanPhone = (v: string) => v.replace(/\s/g, '').replace('+', '')

export function validateFirstName(v: string): true | string {
  if (!v)              return 'El nombre es requerido'
  if (v.length < 2)    return 'Mínimo 2 caracteres'
  if (!lettersOnly(v)) return 'Solo letras permitidas'
  return true
}

export function validateLastName(v: string): true | string {
  if (!v)              return 'El apellido es requerido'
  if (v.length < 2)    return 'Mínimo 2 caracteres'
  if (!lettersOnly(v)) return 'Solo letras permitidas'
  return true
}

export function validatePhone(v: string): true | string {
  if (!v) return 'El teléfono es requerido'
  if (!/^(56)?9\d{8}$/.test(parseChileanPhone(v))) return 'Formato inválido (+56 9 XXXX XXXX)'
  return true
}

export function validateDateOfBirth(v: string | null): true | string {
  if (!v) return true
  const dob = new Date(v)
  if (isNaN(dob.getTime())) return 'Fecha inválida'
  const age = Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
  if (age < 16)  return 'Debes tener al menos 16 años'
  if (age > 120) return 'Fecha inválida'
  return true
}

export function validateRidingStyles(styles: string[]): true | string {
  return styles.length ? true : 'Selecciona al menos un estilo de conducción'
}

// ─── Password helpers ────────────────────────────────────────────────────────

export interface PasswordStrength { score: number; label: string; color: string }

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '', color: 'grey' }
  let score = 0
  if (password.length >= 8)                              score++
  if (password.length >= 12)                             score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password))                               score++
  if (/[^a-zA-Z0-9]/.test(password))                    score++
  return [
    { score: 0, label: '',          color: 'grey'    },
    { score: 1, label: 'Muy débil', color: 'error'   },
    { score: 2, label: 'Débil',     color: 'warning' },
    { score: 3, label: 'Buena',     color: 'info'    },
    { score: 4, label: 'Fuerte',    color: 'success' },
  ][Math.min(score, 4)]
}

export function validateNewPassword(v: string): true | string {
  if (!v)                      return 'La contraseña es requerida'
  if (v.length < 8)            return 'Mínimo 8 caracteres'
 // if (!/[A-Z]/.test(v))        return 'Debe contener al menos una mayúscula'
 // if (!/\d/.test(v))           return 'Debe contener al menos un número'
//  if (!/[^a-zA-Z0-9]/.test(v)) return 'Debe contener al menos un símbolo'
  return true
}

// ─── Main composable ─────────────────────────────────────────────────────────

export function useProfileForm() {
  const store = useProfileStore()

  // Expose store's async state as refs — components read these directly
  // instead of managing their own duplicated loading/error booleans.
  const { loading, saving, fetchError, saveError, hydrated } = storeToRefs(store)

  // ── Local UI state (not in store — ephemeral, per-form-instance) ──────────
  const profileForm = ref()
  const isFormValid = ref(false)
  const isDirty     = ref(false)

  const showSuccessSnackbar         = ref(false)
  const showErrorSnackbar           = ref(false)
  const showCancelDialog            = ref(false)
  const showDraftBanner             = ref(false)
  const showSuccessPasswordSnackbar = ref(false)

  // ── Form data ─────────────────────────────────────────────────────────────
  // Always start empty — syncFormFromStore() immediately populates values.
  // Do NOT initialise from store here: if the page awaited fetchProfile()
  // before calling useProfileForm(), store state exists in Pinia but Vue's
  // reactivity system hasn't flushed it into a new reactive() snapshot yet,
  // so you would still get stale empty strings.
  const form = reactive<Omit<ProfileState, 'loading' | 'saving' | 'fetchError' | 'saveError' | 'hydrated'>>({
    firstName:    '',
    lastName:     '',
    phone:        '',
    dateOfBirth:  null,
    gender:       '',
    ridingStyles: [],
  })

  // Dirty-check baseline — re-taken by syncFormFromStore() and after saves.
  let original = JSON.stringify({ ...form })

  // { immediate: true } means this runs right now during composable init.
  // This is the critical fix: if the page already awaited fetchProfile()
  // before calling useProfileForm(), store.hydrated is already true and
  // a normal (non-immediate) watcher would never fire — leaving the form empty.
  watch(
    () => store.hydrated,
    (isHydrated) => {
      if (isHydrated && !isDirty.value) {
        syncFormFromStore()
      }
    },
    { immediate: true },
  )

  watch(form, (val) => {
    isDirty.value = JSON.stringify(val) !== original
    store.saveDraft({ ...val })
  }, { deep: true })

  function syncFormFromStore() {
    Object.assign(form, {
      firstName:    store.firstName    ?? '',
      lastName:     store.lastName     ?? '',
      phone:        store.phone        ?? '',
      dateOfBirth:  store.dateOfBirth  ?? null,
      gender:       store.gender       ?? '',
      ridingStyles: [...(store.ridingStyles ?? [])],
    })
    // Re-snapshot so the form isn't immediately dirty after a server load
    original = JSON.stringify({ ...form })
    isDirty.value = false
  }

  // ── Password section ──────────────────────────────────────────────────────
  const passwordExpanded = ref(false)
  const passwordForm     = ref()
  const changingPassword = ref(false)
  const passwordSaving   = ref(false)

  const passwords     = reactive({ current: '', new: '', confirm: '' })
  const showCurrentPw = ref(false)
  const showNewPw     = ref(false)
  const showConfirmPw = ref(false)

  const passwordStrength = computed(() => getPasswordStrength(passwords.new))

  const validateConfirmPassword = (v: string): true | string => {
    if (!v)                  return 'Confirma tu contraseña'
    if (v !== passwords.new) return 'Las contraseñas no coinciden'
    return true
  }

  const validateCurrentPassword = (v: string): true | string => {
    if (!v)           return 'Ingresa tu contraseña actual'
    if (v.length < 6) return 'Contraseña inválida'
    return true
  }

  // ── Phone auto-format ─────────────────────────────────────────────────────
  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '')
    const core   = digits.startsWith('56') ? digits.slice(2) : digits
    const t      = core.slice(0, 9)
    if (t.length <= 1) return t
    if (t.length <= 5) return `${t[0]} ${t.slice(1)}`
    return `${t[0]} ${t.slice(1, 5)} ${t.slice(5)}`
  }

  const onPhoneInput = (e: Event) => {
    form.phone = formatPhone((e.target as HTMLInputElement).value)
  }

  // ── Riding style toggle ───────────────────────────────────────────────────
  const toggleRidingStyle = (id: string) => {
    const idx = form.ridingStyles.indexOf(id)
    if (idx === -1) form.ridingStyles.push(id)
    else            form.ridingStyles.splice(idx, 1)
  }

  const isStyleSelected = (id: string) => form.ridingStyles.includes(id)

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    const { valid } = await profileForm.value.validate()
    if (!valid) return
    if (validateRidingStyles(form.ridingStyles) !== true) return

    try {
      await store.saveProfile({ ...form })
      store.clearDraft()
      isDirty.value = false
      // Re-snapshot after successful save so the new values become the baseline
      original = JSON.stringify({ ...form })
      showSuccessSnackbar.value = true
    } catch {
      // store.saveError is already set by the store action
      showErrorSnackbar.value = true
    }
  }

  // ── Password change ───────────────────────────────────────────────────────
  const handlePasswordChange = async () => {
    const { valid } = await passwordForm.value.validate()
    if (!valid) return

    passwordSaving.value = true
    try {
      await $fetch('/api/account/password', {
        method: 'POST',
        body: { current: passwords.current, new: passwords.new },
      })
      passwords.current = ''
      passwords.new     = ''
      passwords.confirm = ''
      passwordForm.value.reset()
      passwordExpanded.value = false
      showSuccessPasswordSnackbar.value = true
    } catch {
      showErrorSnackbar.value = true
    } finally {
      passwordSaving.value = false
    }
  }

  // ── Cancel / discard ──────────────────────────────────────────────────────
  const handleCancel = () => {
    isDirty.value ? (showCancelDialog.value = true) : discardChanges()
  }

  const discardChanges = () => {
    syncFormFromStore()
    showCancelDialog.value = false
    store.clearDraft()
    profileForm.value?.resetValidation()
  }

  // ── Ctrl+S shortcut ───────────────────────────────────────────────────────
  const onKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      if (isDirty.value && isFormValid.value) handleSave()
    }
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  onMounted(async () => {
    window.addEventListener('keydown', onKeydown)

    // Restore draft first — it may have more recent edits than the server
    const raw = storage.get('motomundi_profile_draft')
    if (raw) {
      try {
        Object.assign(form, JSON.parse(raw) as Partial<typeof form>)
        showDraftBanner.value = true
      } catch {
        storage.remove('motomundi_profile_draft')
      }
    }

    // Then fetch from server (skips if already hydrated in this session)
    await store.fetchProfile()

    // If no draft was restored, sync form with the freshly loaded server data
    if (!showDraftBanner.value) {
      syncFormFromStore()
    }
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    // Form
    profileForm,
    isFormValid,
    isDirty,
    form,

    // Store async state (reactive refs — components can use directly)
    loading,
    saving,
    fetchError,
    saveError,
    hydrated,

    // Password
    passwordExpanded,
    passwordForm,
    changingPassword,
    passwordSaving,
    passwords,
    showCurrentPw,
    showNewPw,
    showConfirmPw,
    passwordStrength,

    // UI state
    showSuccessSnackbar,
    showErrorSnackbar,
    showCancelDialog,
    showDraftBanner,
    showSuccessPasswordSnackbar,

    // Data
    ridingStyles: RIDING_STYLES,

    // Validators
    validateFirstName,
    validateLastName,
    validatePhone,
    validateDateOfBirth,
    validateRidingStyles,
    validateNewPassword,
    validateConfirmPassword,
    validateCurrentPassword,

    // Handlers
    onPhoneInput,
    toggleRidingStyle,
    isStyleSelected,
    handleSave,
    handleCancel,
    discardChanges,
    handlePasswordChange,
  }
}
