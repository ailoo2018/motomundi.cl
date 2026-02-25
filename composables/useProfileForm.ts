// composables/useProfileForm.ts
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useProfileStore, RIDING_STYLES } from '~/stores/profile'

// ─── Validation helpers ──────────────────────────────────────────────────────

const lettersOnly = (v: string) =>
  /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s-]+$/.test(v)

const parseChileanPhone = (v: string) => v.replace(/\s/g, '').replace('+', '')

export function validateFirstName(v: string): true | string {
  if (!v) return 'El nombre es requerido'
  if (v.length < 2) return 'Mínimo 2 caracteres'
  if (!lettersOnly(v)) return 'Solo letras permitidas'
  return true
}

export function validateLastName(v: string): true | string {
  if (!v) return 'El apellido es requerido'
  if (v.length < 2) return 'Mínimo 2 caracteres'
  if (!lettersOnly(v)) return 'Solo letras permitidas'
  return true
}

export function validatePhone(v: string): true | string {
  if (!v) return 'El teléfono es requerido'
  const cleaned = parseChileanPhone(v)
  // Valid: 56912345678 or 912345678
  if (!/^(56)?9\d{8}$/.test(cleaned)) return 'Formato inválido (+56 9 XXXX XXXX)'
  return true
}

export function validateDateOfBirth(v: string | null): true | string {
  if (!v) return true // optional
  const dob = new Date(v)
  if (isNaN(dob.getTime())) return 'Fecha inválida'
  const ageDiff = Date.now() - dob.getTime()
  const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25))
  if (age < 16) return 'Debes tener al menos 16 años'
  if (age > 120) return 'Fecha inválida'
  return true
}

export function validateRidingStyles(styles: string[]): true | string {
  if (!styles.length) return 'Selecciona al menos un estilo de conducción'
  return true
}

// ─── Password validation ─────────────────────────────────────────────────────

export interface PasswordStrength {
  score: number // 0-4
  label: string
  color: string
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '', color: 'grey' }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++
  score = Math.min(score, 4)

  const levels: PasswordStrength[] = [
    { score: 0, label: '', color: 'grey' },
    { score: 1, label: 'Muy débil', color: 'error' },
    { score: 2, label: 'Débil', color: 'warning' },
    { score: 3, label: 'Buena', color: 'info' },
    { score: 4, label: 'Fuerte', color: 'success' },
  ]
  return levels[score]
}

export function validateNewPassword(v: string): true | string {
  if (!v) return 'La contraseña es requerida'
  if (v.length < 8) return 'Mínimo 8 caracteres'
  if (!/[A-Z]/.test(v)) return 'Debe contener al menos una mayúscula'
  if (!/\d/.test(v)) return 'Debe contener al menos un número'
  if (!/[^a-zA-Z0-9]/.test(v)) return 'Debe contener al menos un símbolo'
  return true
}

// ─── Main composable ─────────────────────────────────────────────────────────

export function useProfileForm() {
  const store = useProfileStore()

  // ── Form state ────────────────────────────────────────────────────────────
  const profileForm = ref()
  const isFormValid = ref(false)
  const isDirty = ref(false)
  const saving = ref(false)
  const showSuccessSnackbar = ref(false)
  const showErrorSnackbar = ref(false)
  const showCancelDialog = ref(false)
  const showDraftBanner = ref(false)

  const form = reactive({
    firstName: store.firstName,
    lastName: store.lastName,
    phone: store.phone,
    dateOfBirth: store.dateOfBirth,
    gender: store.gender,
    ridingStyles: [...store.ridingStyles],
  })

  // Track original for dirty check
  const original = JSON.stringify({ ...form })

  watch(form, (val) => {
    isDirty.value = JSON.stringify(val) !== original
    // Auto-save draft
    store.saveDraft({ ...val })
  }, { deep: true })

  // ── Password section ──────────────────────────────────────────────────────
  const passwordExpanded = ref(false)
  const passwordForm = ref()
  const changingPassword = ref(false)
  const passwordSaving = ref(false)
  const showSuccessPasswordSnackbar = ref(false)

  const passwords = reactive({
    current: '',
    new: '',
    confirm: '',
  })

  const showCurrentPw = ref(false)
  const showNewPw = ref(false)
  const showConfirmPw = ref(false)

  const passwordStrength = computed(() => getPasswordStrength(passwords.new))

  const validateConfirmPassword = (v: string): true | string => {
    if (!v) return 'Confirma tu contraseña'
    if (v !== passwords.new) return 'Las contraseñas no coinciden'
    return true
  }

  const validateCurrentPassword = (v: string): true | string => {
    if (!v) return 'Ingresa tu contraseña actual'
    if (v.length < 6) return 'Contraseña inválida'
    return true
  }

  // ── Phone formatting ──────────────────────────────────────────────────────
  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '')
    // Strip leading 56
    const core = digits.startsWith('56') ? digits.slice(2) : digits
    const trimmed = core.slice(0, 9)
    if (trimmed.length <= 1) return trimmed
    if (trimmed.length <= 5) return `${trimmed.slice(0, 1)} ${trimmed.slice(1)}`
    return `${trimmed.slice(0, 1)} ${trimmed.slice(1, 5)} ${trimmed.slice(5)}`
  }

  const onPhoneInput = (e: Event) => {
    const el = e.target as HTMLInputElement
    form.phone = formatPhone(el.value)
  }

  // ── Riding style toggle ───────────────────────────────────────────────────
  const toggleRidingStyle = (id: string) => {
    const idx = form.ridingStyles.indexOf(id)
    if (idx === -1) form.ridingStyles.push(id)
    else form.ridingStyles.splice(idx, 1)
  }

  const isStyleSelected = (id: string) => form.ridingStyles.includes(id)

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    const { valid } = await profileForm.value.validate()
    if (!valid) return
    if (validateRidingStyles(form.ridingStyles) !== true) return

    saving.value = true
    try {
      await store.saveProfile({ ...form })
      store.clearDraft()
      isDirty.value = false
      showSuccessSnackbar.value = true
    } catch {
      showErrorSnackbar.value = true
    } finally {
      saving.value = false
    }
  }

  // ── Password change ───────────────────────────────────────────────────────
  const handlePasswordChange = async () => {
    const { valid } = await passwordForm.value.validate()
    if (!valid) return

    passwordSaving.value = true
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000))
      passwords.current = ''
      passwords.new = ''
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

  // ── Cancel ────────────────────────────────────────────────────────────────
  const handleCancel = () => {
    if (isDirty.value) {
      showCancelDialog.value = true
    } else {
      discardChanges()
    }
  }

  const discardChanges = () => {
    Object.assign(form, {
      firstName: store.firstName,
      lastName: store.lastName,
      phone: store.phone,
      dateOfBirth: store.dateOfBirth,
      gender: store.gender,
      ridingStyles: [...store.ridingStyles],
    })
    isDirty.value = false
    showCancelDialog.value = false
    store.clearDraft()
    profileForm.value?.resetValidation()
  }

  // ── Keyboard shortcut Ctrl+S ──────────────────────────────────────────────
  const onKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      if (isDirty.value && isFormValid.value) handleSave()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    // Check for saved draft
    const draft = localStorage.getItem('motomundi_profile_draft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        Object.assign(form, parsed)
        showDraftBanner.value = true
      } catch {}
    }
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  return {
    // Form refs
    profileForm,
    passwordForm,
    isFormValid,
    isDirty,
    saving,
    form,

    // Password
    passwordExpanded,
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
