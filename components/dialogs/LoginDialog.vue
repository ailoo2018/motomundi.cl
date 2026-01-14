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
const isDialogVisible = ref(props.isDialogVisible)
const googleClient = ref(null)


watch(props,  props => {
  isDialogVisible.value = props.isDialogVisible
})


const closeDialog = async () => {
  isDialogVisible.value = false
  emit("closed")
}


const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {

    console.log(config.public.CHECKOUT_API_BASE_URL)

    const { data, error: fetchError } = await useFetch( config.public.LEGACY_URL + '/AJAX/Login.rails', {
      method: 'POST',
      body: {
        email: username.value,
        password: password.value,
      },
      headers: {
        'Content-Type': 'application/json',
      },

      // Add this to ensure error response is parsed
      async onResponseError({ response }) {
        // Access error response data here
        const errorData = response._data  // or response.body

        console.log('Error data:', errorData)
        errors.value = errorData.errors
      },
    })

    console.log("result", error)

    if (fetchError.value) {

      if(fetchError.value.data.errors)
        errors.value = fetchError.value.data.errors

      return
    }

    if (data.value) {
      const { accessToken, userData } = data.value

      useCookie('userData').value = userData
      useCookie('accessToken').value = accessToken

      console.log("token: " + useCookie('accessToken').value)
      emit("user-logged-in", userData)
    } else {
      throw new Error('No data received from the server')
    }
  } catch (err) {
    error.value = err.message || 'Error al tratar de ingresar. Por favor probar nuevamente.'
  } finally {
    isLoading.value = false
  }
}



/********************* google login **********/


const handleGoogleLogin = () => {
  isLoading.value = true
  if (googleClient.value) {
    //    googleClient.value.requestAccessToken();
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
  <div
    v-if="isDialogVisible"
    class="modal-wrapper"
  >
    <div class="modal-backdrop" />
    <div
      role="dialog"
      class="modal"
    >
      <div class="modal__close-cont">
        <button
          class="modal__close"
          @click="closeDialog"
        >
          <svg
            width="9"
            height="9"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/svg/ailoo.svg#i-icon-cross"
              xlink:href="/svg/ailoo.svg#i-icon-cross"
            />
          </svg>
        </button>
      </div>
      <header class="modal-header" />
      <section class="modal-body">
        <div>
          <div>
            <form
              method="post"
              data-gtm-form-interact-id="0"
              @submit.prevent="handleLogin"
            >
              <span class="h2">Entra en tu cuenta </span>
              <div class="form-fieldset">
                <div class="form-item">
                  <div class="input__group">
                    <input
                      id="login-email-29"
                      v-model="username"
                      autocomplete="on"
                      type="email"
                      placeholder=" "
                      required="required"
                      data-gtm-form-interact-field-id="0"
                    >
                    <label
                      for="login-email-29"
                      class="login-form__field"
                    >
                      Correo electrónico
                    </label>
                  </div>

                  <span
                    v-if="errors?.username"
                    class="input-hint error"
                  >{{ errors?.username }}</span>
                </div>
                <div class="form-item">
                  <div class="input__group">
                    <input
                      id="login-password-29"
                      v-model="password"
                      autocomplete="on"
                      type="password"
                      placeholder=" "
                      required="required"
                      data-gtm-form-interact-field-id="1"
                    > <label
                      for="login-password-29"
                      class="login-form__field"
                    >
                      Contraseña
                    </label>
                  </div>
                  <span
                    v-if="errors?.password"
                    class="input-hint error"
                  >{{ errors?.password[0] }}</span>
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
          <span class="divider">o</span>
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
      </section>
    </div>
  </div>
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
