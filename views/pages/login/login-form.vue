<script setup lang="ts">
/* eslint-disable camelcase */
import RecoverPassword from "@/views/pages/login/recover-password.vue";

const loginFormValues = ref({email: '', password: ''})
const googleClient = ref(null)
const isLoading = ref(false)
const recoverFormValues = ref({email: '', sent: false})
const showForgotPassword = ref(false)
const loginForm = ref()


const emit = defineEmits(['on-register', 'on-logged-in', 'on-show-register'])

const onShowRegister = () => {
  emit('on-show-register')
}

const serverErrors = ref({
  email: '',
  password: ''
})

// Reglas de validación
const emailRules = [
  (v: string) => !!v || 'El correo electrónico es obligatorio',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es obligatoria',
  (v: string) => (v && v.length >= 4) || 'La contraseña debe tener al menos 4 caracteres'
]

const login = async () => {

  const { valid } = await loginForm.value.validate()

  if (!valid) return // Si no es válido, no hace el fetch

  try {

    const data = await useUser().login(loginFormValues.value.email, loginFormValues.value.password)

    emit('on-logged-in', data)
  } catch (error) {
    const errorCode = error.data?.data?.code

    if (errorCode === 'USER_NOT_FOUND') {
      serverErrors.value.email = "No encontramos ninguna cuenta con ese correo."
    } else if (errorCode === 'WRONG_PASSWORD') {
      serverErrors.value.password = "Contraseña incorrecta."
    } else {
      alert("Ocurrió un error inesperado: " + error.message)
    }
  }
}


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

      const {data} = await useFetch("/api/login/google", {
        method: "GET",
        headers: {},
        query: {
          authCode: response.code,
          wuid,
        },

      })

      await useUser().onLoggedIn(data.value)

      emit('on-logged-in', data.value)
    } else {
      console.error('Failed to get access token')

    }
  } catch (e) {
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



  <VCard
    variant="plain"
    class="login-container pt-5 opacity-100"
  >
    <VCardText>
      <VRow>

        <VCol v-if="showForgotPassword" cols="12">
        <RecoverPassword v-model:is-visible="showForgotPassword" />
        </VCol>
        <VCol v-if="!showForgotPassword" cols="12" >
          <VForm
            method="post"
            ref="loginForm"
            name="loginForm"
            autocomplete="on"
            @submit.prevent="login"
          >
            <span class="h2" style="text-align: left;">Entra en tu cuenta</span>
            <div class="form-fieldset">
              <VRow class="form-item">
                <VCol
                  cols="12"
                  md="6"
                  lg="6"
                  class="input__group"
                >
                  <VTextField
                    id="login-email-20"
                    v-model="loginFormValues.email"
                    :error-messages="serverErrors.email"
                    autocomplete="on"
                    :rules="emailRules"
                    type="email"
                    class="rounded-0"
                    placeholder="Correo electrónico"
                    required="required"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  lg="6"
                  class="input__group"
                >
                  <VTextField
                    id="login-password-20"
                    v-model="loginFormValues.password"
                    :error-messages="serverErrors.password"
                    :rules="passwordRules"
                    type="password"
                    class="rounded-0"
                    placeholder="Contraseña"
                    required="required"
                  />
                </VCol>
              </VRow>
            </div>
            <div class="w-100 d-flex form-actions justify-center mt-4">
              <VBtn
                id="login-button-20"
                type="submit"
                class="w-100 w-lg-50 w-xl-50 rounded-0 mt-1"
                color="#41a334"
                :loading="loginLoading"
              >
                Entrar
              </VBtn>
            </div>
            <div class="mt-3 login-form__links">
              <a
                class="link-forgot-password"
                @click="showForgotPassword = true"
              >
                <span>¿Has olvidado tu contraseña?</span>
              </a>
              <a
                class="link-register"
                @click="onShowRegister"
              >
                <span>¿No tienes cuenta? <br> Crea una aquí</span>
              </a>
            </div>
          </VForm>
        </VCol>
      </VRow>
      <VRow
        xxclass="social social-buttons "
        style="background-color: white;"
      >
        <VCol
          cols="12"
          md="6"
          class="col sm-6 "
        >
          <VBtn
            id="signinButton"
            color="#fff"
            class="social__google rounded-0 w-100"
            @click="handleGoogleLogin"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNC45MzQgMTJjMC0uNzYyLjEyNy0xLjQ5My4zNTMtMi4xNzhsLTMuOTctMy4wMkExMS42ODkgMTEuNjg5IDAgMDAuMTA3IDEyYzAgMS44NjguNDM2IDMuNjMgMS4yMDggNS4xOTRsMy45NjktMy4wMjVBNi45MTcgNi45MTcgMCAwMTQuOTM0IDEyIiBmaWxsPSIjZmJiYzA1Ii8+PHBhdGggZD0iTTExLjkwNSA1LjA2N2MxLjY2MiAwIDMuMTY0LjU4NiA0LjM0MyAxLjU0NkwxOS42OCAzLjJDMTcuNTkgMS4zODcgMTQuOTA4LjI2NyAxMS45MDUuMjY3Yy00LjY2MiAwLTguNjcgMi42NTUtMTAuNTg4IDYuNTM1bDMuOTcgMy4wMmE2Ljk1IDYuOTUgMCAwMTYuNjE4LTQuNzU1IiBmaWxsPSIjZWI0MzM1Ii8+PHBhdGggZD0iTTExLjkwNSAxOC45MzNhNi45NSA2Ljk1IDAgMDEtNi42MTgtNC43NTVsLTMuOTcgMy4wMmExMS43NjcgMTEuNzY3IDAgMDAxMC41ODggNi41MzVjMi44NzcgMCA1LjYyNS0xLjAxNyA3LjY4Ni0yLjkyNGwtMy43NjgtMi45MDJjLTEuMDY0LjY2Ny0yLjQwMyAxLjAyNi0zLjkxOCAxLjAyNiIgZmlsbD0iIzM0YTg1MyIvPjxwYXRoIGQ9Ik0yMy4xNjYgMTJjMC0uNjkzLS4xMDctMS40NC0uMjY4LTIuMTMzSDExLjkwNVYxNC40aDYuMzI4Yy0uMzE3IDEuNTQ2LTEuMTc4IDIuNzM0LTIuNDEgMy41MDdsMy43NjggMi45MDJjMi4xNjYtMi4wMDIgMy41NzUtNC45ODQgMy41NzUtOC44MDkiIGZpbGw9IiM0Mjg1ZjQiLz48L2c+PC9zdmc+"
              alt="Acceder con Google"
              class="mr-2"
            >
            Acceder con Google
          </VBtn>
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <VBtn
            color="#3b5b9d"
            class="w-100 rounded-0"
            href="#"
          >
            <VIcon size="25" class="tabler-brand-facebook-filled mr-2" /> Acceder con Facebook
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<style scoped>

form span.h2 {
  display: block;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.25px;
  margin: 0 auto 30px;
  /*padding: 30px 0 0;*/
  text-align: center;
  text-transform: uppercase;
}

.inline-login {
  padding: 40px 0 80px;
}

.social .social__google {
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .12), 0 1px 1px 0 rgba(0, 0, 0, .24);
  color: #000;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -.25px;
  padding: 10px 13px;
  text-transform: uppercase;
}

.social .social-login-facebook {
  align-items: center;
  justify-content: center;
  background-color: #3b5b9d;
  border-color: #3b5b9d;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .12), 0 1px 1px 0 rgba(0, 0, 0, .24);
  color: #fff;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -.25px;
  padding: 12px 15px;
  text-transform: uppercase;
}

.login-form__links {
  display: flex;
  justify-content: space-between;
}


.login-form__links form a {
  color: #41a334;
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
}

.login-form__links a {
  color: #41a334;
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
}

.auth .social {
  background-color: #f5f5f5;
  margin: 30px -40px -40px;
  padding: 30px 0;
}

.auth .social.social-buttons {
  display: flex;
  flex-direction: row;
  padding: 10px;
}


.social-buttons button {
  background-color: #41a334;
  color: #fff;
  display: block;
  font-size: 14px;
  font-weight: 700;
  height: 48px;
  letter-spacing: -.25px;
  margin-bottom: 8px;
  margin-top: 8px;
  text-transform: uppercase;
  width: 100%;
}


</style>

