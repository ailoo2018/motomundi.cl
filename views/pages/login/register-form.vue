<script setup lang="ts">
import { ref } from 'vue'

// 1. Define the form reference
const form = ref<any>(null)

// 2. Expand your state to include email and password
const registerFormValues = ref({
  fname: '',
  lname: '',
  email: '',
  password: '',
  receiveNewsletter: false
})

const emit = defineEmits(['on-logged-in'])

// 3. Define Validation Rules
const rules = {
  required: (value: string) => !!value || 'Este campo es obligatorio.',
  email: (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Email no válido.'
  },
  min: (value: string) => value.length >= 8 || 'Mínimo 8 caracteres',
}

const loading = ref(false)
const error = ref()

const router = useRouter()


const register = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    console.log('Form is valid! Sending data:', registerFormValues.value)

    loading.value = true
    error.value = null
    try{

      const data = await useUser().createAccount(registerFormValues.value)

      emit('on-logged-in', data)
      //router.push("/account/profile")
    }catch(e){
      console.error("error", e)
      error.value = e.data?.message || e.message
    }finally{
      loading.value = false
    }

    // Perform your API call here
  } else {
    console.log('Form has errors.')
  }
}
</script>

<template>
  <VCard class="register-container opacity-100" variant="plain">
    <VCardText class="basic-data">
      <VAlert v-if="error" color="warning" class="mb-5 d-flex gap-2" >
        <VIcon class="tabler-exclamation-circle mr-1"></VIcon>
        Error: {{error}}
      </VAlert>
      <VForm
        ref="form"
        name="registerForm"
        @submit.prevent="register"
      >
        <div class="field-group">
          <span class="h3">¿Cómo quieres que nos dirijamos a ti?</span>
          <VRow class="mt-2">
            <VCol cols="12" md="6" >
              <label class="login-label">Nombre <span class="required">*</span></label>
              <VTextField
                v-model="registerFormValues.fname"
                placeholder="Nombre"
                :rules="[rules.required]"
                type="text"
              />
            </VCol>
            <VCol cols="12" md="6" >
              <label class="login-label">Apellido <span class="required">*</span></label>
              <VTextField
                v-model="registerFormValues.lname"
                placeholder="Apellido"
                :rules="[rules.required]"
                type="text"
              />
            </VCol>
          </VRow>
        </div>

        <div class="field-group mt-8">
          <span class="h3 pb-10">Tu email y contraseña</span>
          <VRow class="mt-2">
            <VCol cols="12" md="6" >
              <label class="login-label">EMAIL <span class="required">*</span></label>
              <VTextField
                v-model="registerFormValues.email"
                placeholder="Correo electrónico"
                :rules="[rules.required, rules.email]"
                type="email"
              />
            </VCol>
            <VCol cols="12" md="6" >
              <label class="login-label">CONTRASEÑA <span class="required">*</span></label>
              <VTextField
                v-model="registerFormValues.password"
                type="password"
                placeholder="Contraseña"
                :rules="[rules.required, rules.min]"
              />
            </VCol>
          </VRow>
        </div>

        <div class="gdpr-legal-text pt-8">
          <VCheckbox
            v-model="registerFormValues.receiveNewsletter"
            label="Regístrate para recibir correos electrónicos..."
          />

          <VBtn color="#41a334" class="pl-10 pr-10 w-100 mt-10 rounded-0" type="submit">
            <span>Regístrate</span>
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
<style  lang="scss">
form label.login-label {
  color: #000;
  display: block;
  flex: 0 0 48%;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -.25px;

  text-transform: uppercase;
}

.register-container .basic-data, .register-container .extra-data {
  box-sizing: border-box;
  display: block;
  padding-top: 30px;
  transition-duration: .5s;
  transition-property: opacity,-webkit-transform;
  transition-property: transform,opacity;
  transition-property: transform,opacity,-webkit-transform;
  transition-timing-function: cubic-bezier(.175,.885,.32,1.275);
}
</style>
