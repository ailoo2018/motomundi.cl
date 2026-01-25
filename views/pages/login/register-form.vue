<script setup lang="ts">
const registerFormValues = ref({ fname: '', lname: '' })

</script>

<template>
  <VCard
    class="register-container opacity-100"
    variant="plain"

  >
    <VCardText class="basic-data">
      <VForm
        method="post"
        name="registerForm"
        @submit="register()"
      >
        <div class="field-group">
          <span class="h3">¿Cómo quieres que nos dirijamos a ti?</span>
          <VRow class="mt-2">
            <VCol cols="6" >
              <label class="login-label" for="register_fname">
                Nombre <span class="required">*</span>
              </label>
              <VTextField
                id="register_fname"
                v-model="registerFormValues.fname"
                placeholder="Nombre"
                required
                type="text"
              />

            </VCol>
            <VCol cols="6">
              <label class="login-label" for="register_fname">
                Apellido <span class="required">*</span>
              </label>
              <VTextField
                required
                placeholder="Apellido"
                v-model="registerFormValues.lname"
                type="text"
              />
            </VCol>
          </VRow>
        </div>

        <div class="field-group mt-8">
          <span class="h3 pb-10">Tu email y contraseña para acceder dónde y cuando quieras</span>

          <VRow class="mt-2">
            <VCol cols="6">
              <label class="login-label" for="register-email">EMAIL <span class="required">*</span></label>
              <VTextField
                id="register-email"
                v-model="registerFormValues.email"
                placeholder="Correo electrónico"

                type="email"
              />

            </VCol>
            <VCol cols="6">
              <label  class="login-label" for="register-pass">CONTRASEÑA <span class="required">*</span></label>
              <VTextField
                id="register-password-338"
                v-model="registerFormValues.password"
                type="password"
                placeholder="Contraseña"
              />

            </VCol>
          </VRow>

        </div>
        <div class="gdpr-legal-text pt-8">
          <VCheckbox
            id="recv-newsletter"
            v-model="registerFormValues.receiveNewsletter"
            label="Regístrate para recibir correos electrónicos y no perderte las últimas novedades, ofertas y cupones de descuento."

          />


          <div class="gdpr-legal-text mt-5">
            <small>Al crearte
              una cuenta, aceptas la <a
                href="/terminos-y-condiciones.html?open=privacy-policy"
                target="_blank"
              >Política
                de privacidad</a> y los <a
                href="/terminos-y-condiciones.html?open=general"
                target="_blank"
              >Términos y condiciones</a> de
              Motomundi.</small>
          </div>



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
.v-text-field  {
  border: 1px solid black;
  border-radius: 0px;
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
