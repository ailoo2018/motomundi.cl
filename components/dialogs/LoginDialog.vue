<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'closed',
  'user-logged-in',
])

const username = ref('')
const password = ref('')
const error = ref('')
const errors = ref('')
const isLoading = ref(false)
const config = useRuntimeConfig()
const loginFormValues = ref({ email: '', password: '' })

const isDialogVisible = ref(props.isDialogVisible)
const googleClient = ref(null)

const serverErrors = ref({
  email: '',
  password: '',
})

watch(props,  props => {
  isDialogVisible.value = props.isDialogVisible
})


const closeDialog = async () => {
  isDialogVisible.value = false
  emit("closed")
}

console.log("LoginDialog:::")

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {

    const username = loginFormValues.value.email
    const password = loginFormValues.value.password

    const data = await useUser().login(username, password)

    await nextTick()
    emit("user-logged-in", data)
  } catch (err) {
    const errorCode = err.data?.data?.code

    if (errorCode === 'USER_NOT_FOUND') {
      serverErrors.value.email = "No encontramos ninguna cuenta con ese correo."
    } else if (errorCode === 'WRONG_PASSWORD') {
      serverErrors.value.password = "Contraseña incorrecta."
    }else{
      error.value = err.message || 'Error al tratar de ingresar. Por favor probar nuevamente.'
    }


  } finally {
    isLoading.value = false
  }
}



/********************* google login **********/


const handleGoogleLogin = () => {
  isLoading.value = true
  if (googleClient.value) {
    googleClient.value.requestCode()
  }
}

const handleCallback = async response => {
  try {
    console.log("handleCallback", response)
    isLoading.value = false

    const wuid = useGuestUser().value
    if (response.code) {

      const { data } = await useFetch("/api/login/google", {
        method: "GET",
        headers: {},
        query: {
          authCode: response.code,
          wuid,
        },

      })

      useCookie('user_id').value = data.value.userId
      useCookie('accessToken').value = data.value.accessToken

      await nextTick()
      emit("user-logged-in", data.value)
    } else {
      console.error('Failed to get access token')
      emit('error', new Error('Failed to get access token'))
    }
  }catch(e){
    alert(e.message || e.error)
  }
}

onMounted(() => {
  // Load Google API Script
  const script = document.createElement('script')

  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)

  script.onload = () => {
    googleClient.value = google.accounts.oauth2.initCodeClient({
      client_id: '573119085091-10gjskn72s3dsfmncmmhppe6p8o3u1qj.apps.googleusercontent.com',
      scope: 'email profile openid',
      callback: handleCallback,
    })
  }
})
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        <span class="h2">Entra en tu cuenta </span>
      </VCardTitle>
      <VCardText>
        <div>
          <div>
            <form
              method="post"
              data-gtm-form-interact-id="0"
              @submit.prevent="handleLogin"
            >
              <div class="form-fieldset">
                <div class="form-item">
                  <div class="input__group">
                    <label
                      for="login-email-29"
                      class="login-form__field"
                    >
                      Correo electrónico
                    </label>
                    <VTextField
                      id="login-email-29"
                      v-model="loginFormValues.email"
                      autocomplete="on"
                      type="email"
                      placeholder="Email"
                      required="required"
                      data-gtm-form-interact-field-id="0"
                    />

                  </div>

                  <span
                    v-if="serverErrors?.email"
                    class="input-hint error"
                  >{{ serverErrors?.email }}</span>
                </div>
                <div class="form-item">
                  <div class="input__group">
                    <label
                      for="login-password-29"
                      class="login-form__field"
                    >
                      Correo electrónico
                    </label>
                    <VTextField
                      id="login-password-29"
                      v-model="loginFormValues.password"
                      autocomplete="on"
                      type="password"
                      placeholder="Contraseña"
                      required="required"
                      data-gtm-form-interact-field-id="1"
                    />
                  </div>
                  <span
                    v-if="serverErrors?.password"
                    class="input-hint error"
                  >{{ serverErrors?.password }}</span>
                </div>
              </div>
              <div class="form-item text-center">
                <span
                  v-if="error"
                  class="error"
                >{{ error }}</span>
              </div>
              <div class="form-actions">
                <button
                  id="login-button-29"
                  type="submit"
                  class="button"
                >
                  <span>Entrar</span>
                </button>
              </div>
              <div class="login-form__links">
                <a class="link-forgot-password">
                  <span>¿Has olvidado tu contraseña?</span></a> <a class="link-register">
                  <span>¿No tienes cuenta? <br> Crea una aquí</span></a>
              </div>
            </form>
          </div>
          <div class="divider w-100 text-center">o</div>
          <div class="social">
            <button
              class="social__google"
              @click="handleGoogleLogin"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNC45MzQgMTJjMC0uNzYyLjEyNy0xLjQ5My4zNTMtMi4xNzhsLTMuOTctMy4wMkExMS42ODkgMTEuNjg5IDAgMDAuMTA3IDEyYzAgMS44NjguNDM2IDMuNjMgMS4yMDggNS4xOTRsMy45NjktMy4wMjVBNi45MTcgNi45MTcgMCAwMTQuOTM0IDEyIiBmaWxsPSIjZmJiYzA1Ii8+PHBhdGggZD0iTTExLjkwNSA1LjA2N2MxLjY2MiAwIDMuMTY0LjU4NiA0LjM0MyAxLjU0NkwxOS42OCAzLjJDMTcuNTkgMS4zODcgMTQuOTA4LjI2NyAxMS45MDUuMjY3Yy00LjY2MiAwLTguNjcgMi42NTUtMTAuNTg4IDYuNTM1bDMuOTcgMy4wMmE2Ljk1IDYuOTUgMCAwMTYuNjE4LTQuNzU1IiBmaWxsPSIjZWI0MzM1Ii8+PHBhdGggZD0iTTExLjkwNSAxOC45MzNhNi45NSA2Ljk1IDAgMDEtNi42MTgtNC43NTVsLTMuOTcgMy4wMmExMS43NjcgMTEuNzY3IDAgMDAxMC41ODggNi41MzVjMi44NzcgMCA1LjYyNS0xLjAxNyA3LjY4Ni0yLjkyNGwtMy43NjgtMi45MDJjLTEuMDY0LjY2Ny0yLjQwMyAxLjAyNi0zLjkxOCAxLjAyNiIgZmlsbD0iIzM0YTg1MyIvPjxwYXRoIGQ9Ik0yMy4xNjYgMTJjMC0uNjkzLS4xMDctMS40NC0uMjY4LTIuMTMzSDExLjkwNVYxNC40aDYuMzI4Yy0uMzE3IDEuNTQ2LTEuMTc4IDIuNzM0LTIuNDEgMy41MDdsMy43NjggMi45MDJjMi4xNjYtMi4wMDIgMy41NzUtNC45ODQgMy41NzUtOC44MDkiIGZpbGw9IiM0Mjg1ZjQiLz48L2c+PC9zdmc+"
                alt="Acceder con Google"
              >
              Acceder con Google
            </button>
          </div>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.input__group input:not([type]):focus + label, .input__group input:not([type]):not(:placeholder-shown) + label, .input__group input[type=date]:not(.browser-default):focus + label, .input__group input[type=date]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=datetime-local]:not(.browser-default):focus + label, .input__group input[type=datetime-local]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=datetime]:not(.browser-default):focus + label, .input__group input[type=datetime]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=email]:not(.browser-default):focus + label, .input__group input[type=email]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=number]:not(.browser-default):focus + label, .input__group input[type=number]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=password]:not(.browser-default):focus + label, .input__group input[type=password]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=search]:not(.browser-default):focus + label, .input__group input[type=search]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=tel]:not(.browser-default):focus + label, .input__group input[type=tel]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=text]:not(.browser-default):focus + label, .input__group input[type=text]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=time]:not(.browser-default):focus + label, .input__group input[type=time]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=url]:not(.browser-default):focus + label, .input__group input[type=url]:not(.browser-default):not(:placeholder-shown) + label, .input__group textarea:focus + label, .input__group textarea:not(:placeholder-shown) + label {
  font-size: 12px;
  left: 7px;
  padding: 0 5px;
  top: 1px;
  -webkit-transform: translate(0);
  transform: translate(0);
}
</style>
