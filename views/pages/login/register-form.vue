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
          <VRow>
            <VCol cols="6">
              <AppTextField
                id="register-name-338"
                v-model="registerFormValues.fname"
                label="Nombre"
                required

                type="text"
              />

            </VCol>
            <VCol cols="6">
              <AppTextField
                required
                id="register-surnames-338"
                label="Apellido"
                v-model="registerFormValues.lname"
                type="text"
              />
            </VCol>
          </VRow>
        </div>

        <div class="field-group mt-5">
          <span class="h3 pb-10">Tu email y contraseña para acceder dónde y cuando quieras</span>

          <VRow>
            <VCol cols="6">
              <AppTextField
                id="register-email-338"
                v-model="registerFormValues.email"
                placeholder="Correo electrónico"
                label="Correo electrónico"
                type="email"
              />

            </VCol>
            <VCol cols="6">
              <AppTextField
                id="register-password-338"
                v-model="registerFormValues.password"
                type="password"
                label="Contraseña"
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

<style scoped lang="scss">

</style>
