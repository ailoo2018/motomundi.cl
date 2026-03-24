<script setup lang="ts">
const isOpen = defineModel({ type: Boolean, default: () => false })

const props = defineProps({
  productItem: { type: Number, required: true },
})

const email = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)
const emailError = ref('')

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = (): boolean => {
  if (!email.value.trim()) {
    emailError.value = 'El correo electrónico es obligatorio.'
    return false
  }
  if (!EMAIL_REGEX.test(email.value.trim())) {
    emailError.value = 'Introduce un correo electrónico válido.'
    return false
  }
  emailError.value = ''
  return true
}

const onEmailInput = () => {
  if (emailError.value) validateEmail()
}

const hideOoskDialog = () => {
  isOpen.value = false
}

const resetState = () => {
  email.value = ''
  emailError.value = ''
  isSuccess.value = false
}

watch(isOpen, (val) => {
  if (!val) resetState()
})

const submit = async () => {
  if (!validateEmail()) return

  isSubmitting.value = true
  try {
    await $fetch('/api/product/notify-when-available', {
      method: 'POST',
      body: {
        email: email.value.trim(),
        productItemId: props.productItem.id,
      },
    })
    isSuccess.value = true
  } catch {
    emailError.value = 'Ocurrió un error. Por favor, inténtalo de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    id="soofs"
    class="size-oosk"
  >
    <button
      class="oosk__close"
      aria-label="Cerrar"
      @click="hideOoskDialog"
    >
      <svg
        width="9"
        height="9"
        xmlns="http://www.w3.org/2000/svg"
        class="icon sprite-line-icons"
      >
        <use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-cross" />
      </svg>
    </button>

    <!-- Success state -->
    <div
      v-if="isSuccess"
      class="size-oosk__success"
    >
      <img
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIEtleXNoYXBlIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiB3aWR0aD0iMjAiPgogICAgPHN0eWxlPgpAa2V5ZnJhbWVzIGEwX2RvIHsgMCUgeyBzdHJva2UtZGFzaG9mZnNldDogNDdweDsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNiwwLjA0LDAuOTgsMC4zMzUpOyB9IDc3Ljc3NzglIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSAxMDAlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSB9CkBrZXlmcmFtZXMgYTFfZG8geyAwJSB7IHN0cm9rZS1kYXNob2Zmc2V0OiAxMnB4OyB9IDIyLjIyMjIlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDEycHg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjc4NSwwLjEzNSwwLjE1LDAuODYpOyB9IDEwMCUgeyBzdHJva2UtZGFzaG9mZnNldDogMHB4OyB9IH0KICAgIDwvc3R5bGU+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM0MWEzMzUiIHN0cm9rZS1kYXNoYXJyYXk9IjQ3IDQ3IiBzdHJva2UtZGFzaG9mZnNldD0iNDciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTAsLTcuNUM0LjE0MjE0LC03LjUsNy41LC00LjE0MjE0LDcuNSwwQzcuNSw0LjE0MjE0LDQuMTQyMTQsNy41LDAsNy41Qy00LjE0MjE0LDcuNSwtNy41LDQuMTQyMTQsLTcuNSwwQy03LjUsLTQuMTQyMTQsLTQuMTQyMTQsLTcuNSwwLC03LjVaIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIHJvdGF0ZSg1Mi42KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMF9kbzsiLz4KICAgIDxwYXRoIGQ9Ik0wLDNMMi41LDUuNUw4LDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxYTMzNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxMiAxMiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEyIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiw3LjI1KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMV9kbzsiLz4KPC9zdmc+Cg=="
        alt="Éxito"
      >
      <span class="h3">Hemos recibido tu correo correctamente.</span>
      <p>Te avisaremos en cuanto la talla vuelva a estar disponible.</p>
      <VBtn
        variant="outlined"
        size="small"
        rounded="0"
        @click="hideOoskDialog"
      >
        Aceptar
      </VBtn>
    </div>

    <!-- Form state -->
    <div v-else>
      <span class="h3">
        <svg
          width="30"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          class="icon sprite-line-icons"
        >
          <title>Alert icon</title>
          <use href="/content/images/svg/0b25363450c5afe3b3f9ba7fe4f4173b.svg#i-icon-alert" />
        </svg>
        La <span>talla</span> se ha agotado. <br>
        ¿Te avisamos cuando esté disponible?
      </span>

      <div class="size-oosk__email-form-fields">
        <VTextField
          v-model="email"
          rounded="0"
          label="Correo electrónico"
          variant="outlined"
          type="email"
          :error-messages="emailError"
          :disabled="isSubmitting"
          hide-details="auto"
          @input="onEmailInput"
          @keyup.enter="submit"
        />
        <VBtn
          color="primary"
          rounded="0"
          style="max-height:38px"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          class="submit-btn"
          @click="submit"
        >
          Enviar
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.size-oosk {
  background: #fff;
  border-top: 3px solid #ffae02;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .1), 0 0 35px 0 rgba(0, 0, 0, .15);
  left: 0;
  padding: 25px;
  position: relative;
  right: 0;
  top: 105%;
  z-index: 5;
}

.size-oosk .oosk__close {
  background-color: #ffae02;
  height: 30px;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  z-index: 100;
}

.size-oosk__success {
  padding: 15px 0;
  text-align: center;
}

.size-oosk > div > span.h3 {
  display: block;
  font-size: 11px;
  font-weight: 700;
  line-height: 14px;
  margin: 0 0 12px;
  padding-left: 35px;
  position: relative;
  text-transform: uppercase;
}

.size-oosk__email-form-fields {
  display: flex;
  align-items: flex-start; // aligns to top so error message doesn't shift the button
  gap: 0;
}

.submit-btn {
  // Match Vuetify outlined field height (56px default)
  height: 56px !important;
  background-color: #41a334 !important;
  border: 1px solid #41a334;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -.25px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.size-oosk__similar {
  background-color: #f5f5f5;
  margin: 20px -25px -25px;
  padding: 20px 30px;
}

.size-oosk > div > span.h3 svg {
  left: 0;
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
}

.size-oosk .oosk__close use {
  stroke: #fff;
}

.size-oosk > div > span.h3 span {
  color: #ffae02;
  font-weight: 800;
}

.size-oosk > div > span.h3 use {
  stroke: #ffae02;
  stroke-width: 1;
  transform: scale(1.8);
}
</style>
