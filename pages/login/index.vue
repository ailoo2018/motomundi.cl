<script setup>
import RegisterForm from "@/views/pages/login/register-form.vue"
import LoginForm from "@/views/pages/login/login-form.vue"

definePageMeta({
 // layout: 'motomundi',
  public: true,

})


const isShowForgotPassword = ref(false)
const currentTab = ref('register')

const loginLoading = ref(false)

const recover = async () => {

}

const register = async () => {

}

const login = async () => {

}

</script>

<template>
  <VContainer class="auth w-full pv-10 ">
    <VRow class="" style="max-width: 700px; margin: 0 auto; ">
      <div class="tabs w-100">
        <span
          class="tab"
          :class="{ 'is-active': currentTab == 'register'}"
          @click="currentTab = 'register'"
        >¿Eres nuevo? </span>
        <span
          data-ref="login"
          class="tab "
          :class="{ 'is-active': currentTab == 'login' }"
          @click="currentTab = 'login'"
        >¿Ya tienes cuenta?</span>
      </div>
      <div class="tabs-panels w-100 " >


        <div v-if="!isShowForgotPassword && currentTab == 'login'"  style="opacity: 1 !important;">
          <LoginForm />
        </div>
        <div v-if="currentTab == 'register'"  style="opacity: 1 !important;">
          <RegisterForm />
        </div>
      </div>
    </VRow>
  </VContainer>
</template>

<style lang="scss">

form  .required {
  margin-left: 2px;
  color: #d6001c;
}

.mobile .v-card-text{
  padding: 34px 4px 4px;
}

.auth label.v-label {
  font-size: 11px !important;
  font-weight: bold;
}


form.recover-password a {
  color: #41a334;
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-top: -8px;
  text-align: center;
}

form.recover-password span.h2 {
  display: block;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -.25px;
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 20px 0 0;
  text-align: center;
  text-transform: uppercase;
}

.form-fieldset {
  align-items: flex-start;
  -webkit-column-gap: 10px;
  -moz-column-gap: 10px;
  column-gap: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
  row-gap: 5px;
}

.form-item.full-width {
  max-width: 100%;
  width: 100%;
}


.form-actions .button {
  background-color: #41a334;
  border-color: #41a334;
  color: #fff;
  display: block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -.25px;
  margin-bottom: 15px;
  margin-top: 15px;
  text-transform: uppercase;
  width: 100%;
}

.button:active, .button:focus {
  background-color: #41a334;
  border-color: #41a334;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .3);
  color: #fff;
}



@media only screen and (max-width: 600px) {
  .auth .social.social-buttons {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
  }

}

@media only screen and (min-width: 601px) {
  .form-item {
    width: calc(50% - 5px);
  }
}


.tabs {
  display: flex;
}

.tabs .tab.is-active {
  border-color: #d6001c;
  color: #000;
}

.tabs .tab {
  border-bottom: 2px solid #ccc;
  color: #949494;
  cursor: pointer;
  flex: 1 1 auto;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -.5px;
  padding: 22px 5px;
  text-align: center;
  text-transform: uppercase;
}

.mobile .tabs .tab{
  font-size: 13px;
}

form .field-group .h3 {
  flex: 0 0 100%;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -.3px;
  margin: 0 0 12px;
  text-transform: uppercase;
}

label[for="recv-newsletter"] {
  color: #41a335;
  font-weight: bold;
}
</style>
