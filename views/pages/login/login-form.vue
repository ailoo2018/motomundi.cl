<script setup lang="ts">
/* eslint-disable camelcase */
const loginFormValues = ref({email: '', password: ''})
const googleClient = ref(null)
const isLoading = ref(false)
const recoverFormValues = ref({email: '', sent: false})
const showForgotPassword = ref(false)
const loginForm = ref()

// Reglas de validación
const emailRules = [
  (v: string) => !!v || 'El correo electrónico es obligatorio',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es obligatoria',
  (v: string) => (v && v.length >= 6) || 'La contraseña debe tener al menos 6 caracteres'
]

const login = async () => {

  // Validar el formulario programáticamente
  const { valid } = await loginForm.value.validate()

  if (!valid) return // Si no es válido, no hace el fetch

  try {

    const {data} = await useFetch("/api/login/", {
      method: "GET",
      headers: {},
    })
  } catch (error) {

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

      useCookie('user_id').value = data.value.userId
      useCookie('accessToken').value = data.value.accessToken


      await navigateTo("/cuenta/perfil")
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

  <VCard v-if="showForgotPassword" variant="plain" class="opacity-100" >
    <VCardText>
      <div >
        <div
          v-if="recoverFormValues.sent"
          class="success-message"
        >
          <img

            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIEtleXNoYXBlIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiB3aWR0aD0iMjAiPgogICAgPHN0eWxlPgpAa2V5ZnJhbWVzIGEwX2RvIHsgMCUgeyBzdHJva2UtZGFzaG9mZnNldDogNDdweDsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNiwwLjA0LDAuOTgsMC4zMzUpOyB9IDc3Ljc3NzglIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSAxMDAlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDBweDsgfSB9CkBrZXlmcmFtZXMgYTFfZG8geyAwJSB7IHN0cm9rZS1kYXNob2Zmc2V0OiAxMnB4OyB9IDIyLjIyMjIlIHsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDEycHg7IGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjc4NSwwLjEzNSwwLjE1LDAuODYpOyB9IDEwMCUgeyBzdHJva2UtZGFzaG9mZnNldDogMHB4OyB9IH0KICAgIDwvc3R5bGU+CiAgICA8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM0MWEzMzUiIHN0cm9rZS1kYXNoYXJyYXk9IjQ3IDQ3IiBzdHJva2UtZGFzaG9mZnNldD0iNDciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTAsLTcuNUM0LjE0MjE0LC03LjUsNy41LC00LjE0MjE0LDcuNSwwQzcuNSw0LjE0MjE0LDQuMTQyMTQsNy41LDAsNy41Qy00LjE0MjE0LDcuNSwtNy41LDQuMTQyMTQsLTcuNSwwQy03LjUsLTQuMTQyMTQsLTQuMTQyMTQsLTcuNSwwLC03LjVaIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMTApIHJvdGF0ZSg1Mi42KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMF9kbzsiLz4KICAgIDxwYXRoIGQ9Ik0wLDNMMi41LDUuNUw4LDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzQxYTMzNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIxMiAxMiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjEyIiBzdHJva2Utd2lkdGg9IjEuMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiw3LjI1KSIgc3R5bGU9ImFuaW1hdGlvbjogMC45cyBsaW5lYXIgYm90aCBhMV9kbzsiLz4KPC9zdmc+Cg=="
            alt="Check"
          >
          <p>
            Recibirá un enlace para restablecer su contraseña en
            {{ recoverFormValues.email }}.
          </p>
          <button
            ng-click="goBack();"
            class="button button--light"
          >
            Volver
          </button>
        </div>
        <div v-if="!recoverFormValues.sent" class="mb-10">

          <VForm

            class="recover-password"
            method="post"
          >
            <span class="h2">¿Has olvidado tu contraseña?</span>
            <div v-if="recoverFormValues.error" class="error-message">
              <p>
                {{ recoverFormValues.error }}
              </p>
            </div>
            <div class="form-fieldset">
              <div class="form-item full-width">
                <div class="input__group">
                  <AppTextField
                    id="forgot-email"
                    v-model="recoverFormValues.email"
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

                :loading="recoverFormValues.loading"
                @click="recover"
              >
                <span v-if="!recoverFormValues.loading">Recuperar tu contraseña</span>
              </VBtn>
            </div>
            <a @click="showForgotPassword = false;">Entra en tu cuenta</a>
          </VForm>
        </div>
      </div>
    </VCardText>
  </VCard>

  <VCard
    v-else
    variant="plain"

    class="login-container pt-5 opacity-100"

  >
    <VCardText>
      <VRow>
        <VCol cols="12">
          <VForm
            method="post"
            ref="loginForm"
            name="loginForm"
            autocomplete="on"
            @submit.prevent="login"
          >
            <span class="h2">Entra en tu cuenta</span>
            <div class="form-fieldset">
              <VRow class="form-item">
                <VCol
                  cols="6"
                  class="input__group"
                >
                  <VTextField
                    id="login-email-20"
                    v-model="loginFormValues.email"
                    autocomplete="on"
                    :rules="emailRules"
                    type="email"
                    class="rounded-0"
                    placeholder="Correo electrónico"
                    required="required"
                  />
                </VCol>
                <VCol>
                  <VTextField
                    id="login-password-20"
                    v-model="loginFormValues.password"
                    :rules="passwordRules"
                    type="password"
                    class="rounded-0"
                    placeholder="Contraseña"
                    required="required"
                  />
                </VCol>
              </VRow>
            </div>
            <div class="w-100 form-actions justify-center">
              <VBtn
                id="login-button-20"
                type="submit"
                style="margin: 20px auto"
                class="button w-50 rounded-0"
                color="#41a334"
                :loading="loginLoading"
              >
                Entrar
              </VBtn>
            </div>
            <div class="login-form__links">
              <a
                class="link-forgot-password"
                @click="showForgotPassword = true"
              >
                <span>¿Has olvidado tu contraseña?</span>
              </a>
              <a
                class="link-register"
                @click="currentTab = 'register'"
              >
                <span>¿No tienes cuenta? <br> Crea una aquí</span>
              </a>
            </div>
          </VForm>
        </VCol>
      </VRow>
      <VRow
        class="social social-buttons "
        style="background-color: white;max-width:600px"
      >
        <VCol
          cols="6"
          class="col sm-6"
        >
          <button
            id="signinButton"
            class="social__google"
            @click="handleGoogleLogin"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNC45MzQgMTJjMC0uNzYyLjEyNy0xLjQ5My4zNTMtMi4xNzhsLTMuOTctMy4wMkExMS42ODkgMTEuNjg5IDAgMDAuMTA3IDEyYzAgMS44NjguNDM2IDMuNjMgMS4yMDggNS4xOTRsMy45NjktMy4wMjVBNi45MTcgNi45MTcgMCAwMTQuOTM0IDEyIiBmaWxsPSIjZmJiYzA1Ii8+PHBhdGggZD0iTTExLjkwNSA1LjA2N2MxLjY2MiAwIDMuMTY0LjU4NiA0LjM0MyAxLjU0NkwxOS42OCAzLjJDMTcuNTkgMS4zODcgMTQuOTA4LjI2NyAxMS45MDUuMjY3Yy00LjY2MiAwLTguNjcgMi42NTUtMTAuNTg4IDYuNTM1bDMuOTcgMy4wMmE2Ljk1IDYuOTUgMCAwMTYuNjE4LTQuNzU1IiBmaWxsPSIjZWI0MzM1Ii8+PHBhdGggZD0iTTExLjkwNSAxOC45MzNhNi45NSA2Ljk1IDAgMDEtNi42MTgtNC43NTVsLTMuOTcgMy4wMmExMS43NjcgMTEuNzY3IDAgMDAxMC41ODggNi41MzVjMi44NzcgMCA1LjYyNS0xLjAxNyA3LjY4Ni0yLjkyNGwtMy43NjgtMi45MDJjLTEuMDY0LjY2Ny0yLjQwMyAxLjAyNi0zLjkxOCAxLjAyNiIgZmlsbD0iIzM0YTg1MyIvPjxwYXRoIGQ9Ik0yMy4xNjYgMTJjMC0uNjkzLS4xMDctMS40NC0uMjY4LTIuMTMzSDExLjkwNVYxNC40aDYuMzI4Yy0uMzE3IDEuNTQ2LTEuMTc4IDIuNzM0LTIuNDEgMy41MDdsMy43NjggMi45MDJjMi4xNjYtMi4wMDIgMy41NzUtNC45ODQgMy41NzUtOC44MDkiIGZpbGw9IiM0Mjg1ZjQiLz48L2c+PC9zdmc+"
              alt="Acceder con Google"
            >
            Acceder con Google
          </button>
        </VCol>
        <VCol
          cols="6"
          class="col sm-6"
        >
          <button
            id="signinFbkButton"
            class="social-login-facebook"
            href="#"
          >
            <i class="icon-facebook"/> &nbsp;&nbsp;Acceder con Facebook
          </button>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<style scoped>


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

