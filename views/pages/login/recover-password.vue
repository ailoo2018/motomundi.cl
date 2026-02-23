<script setup lang="ts">

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'sent',
  'update:isVisible',
])

const isVisible = computed({
  get: () => props.isVisible,
  set: (value) => {
    if (!value) emit('closed') // Keep your closed event if needed
    emit('update:isVisible', value)
  }
})

const sent = ref(false)
const email = ref()
const error = ref()
const loading = ref(false)
const emailRules = [
  (v: string) => !!v || 'El correo electrónico es obligatorio',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
]

const login = () =>{
  isVisible.value = false
  emit('update:isVisible', false)
}

const recover = async () => {
  console.log("recover")
  try {
    const data = await $fetch("/api/login/recover", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {
        email: email.value,
      }
    })
  }catch(e){
    console.error("error calling recover: " + e.message, e)
    error.value = e.message
  }
}
</script>

<template>

  <VCard v-if="isVisible" variant="plain" class="opacity-100 w-100 pa-0 ma-0" >
    <VCardText class="pa-0 ma-0">
      <div >
        <div
          v-if="sent"
          class="success-message"
        >
          <img

            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIEtleXNoYXBlIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiB3aWR0aD0iMjAiPgogICAgPHN0eWxlPgpAa2V5ZnJhbWVzIGEwX2RvIHsgMCUgeyBzdHJva2UtZGFzaG9mZnNldDogNDdweDsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNiwwLjA0LDAuOTgsMC4zMzUpOyB9IDc3Ljc3NzglIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSAxMDAlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSB9CkBrZXlmcmFtZXMgYTFfZG8geyAwJSB7IHN0cm9rZS1kYXNob2Zmc2V0OiAxMnB4OyB9IDIyLjIyMjIlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDEycHg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjc4NSwwLjEzNSwwLjE1LDAuODYpOyB9IDEwMCUgeyBzdHJva2UtZGFzaG9mZnNldDogMHB4OyB9IH0KICAgIDwvc3R5bGU+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM0MWEzMzUiIHN0cm9rZS1kYXNoYXJyYXk9IjQ3IDQ3IiBzdHJva2UtZGFzaG9mZnNldD0iNDciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTAsLTcuNUM0LjE0MjE0LC03LjUsNy41LC00LjE0MjE0LDcuNSwwQzcuNSw0LjE0MjE0LDQuMTQyMTQsNy41LDAsNy41Qy00LjE0MjE0LDcuNSwtNy41LDQuMTQyMTQsLTcuNSwwQy03LjUsLTQuMTQyMTQsLTQuMTQyMTQsLTcuNSwwLC03LjVaIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIHJvdGF0ZSg1Mi42KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMF9kbzsiLz4KICAgIDxwYXRoIGQ9Ik0wLDNMMi41LDUuNUw4LDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxYTMzNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxMiAxMiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEyIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiw3LjI1KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMV9kbzsiLz4KPC9zdmc+Cg=="
            alt="Check"
          >
          <p>
            Recibirá un enlace para restablecer su contraseña en
            {{ email }}.
          </p>
          <button
            ng-click="goBack();"
            class="button button--light"
          >
            Volver
          </button>
        </div>
        <div  class="mb-10">

          <VForm
            class="recover-password"
            method="post"
            @submit.prevent="recover"
          >
            <h2 class="pa-0 ma-0 mb-4">¿Has olvidado tu contraseña?</h2>
            <VAlert v-if="error"  color="warning">
              <VIcon class="tabler-alert-circle mr-2"  />

                error: {{ error }}

            </VAlert>
            <div class="form-fieldset">
              <div class="form-item full-width">
                <div class="input__group">
                  <AppTextField
                    id="forgot-email"
                    v-model="email"
                    type="email"
                    :rules="emailRules"
                    required="required"
                    label="Email"
                    placeholder="Ingrese su email"
                  />

                </div>
              </div>
            </div>
            <div class="form-actions mt-8">
              <VBtn
                type="submit"
                class="button w-100"
                rounded="0"
                :loading="loading"

              >
                <span v-if="!loading">Recuperar tu contraseña</span>
              </VBtn>
            </div>
            <a @click="login">Entra en tu cuenta {{isVisible}}</a>
          </VForm>
        </div>
      </div>
    </VCardText>
  </VCard>

</template>

<style scoped lang="scss">

</style>
