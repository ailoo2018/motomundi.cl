<script setup lang="ts">
const profile = ref({})

</script>

<template>
  <div class="account__content-block">
    <div class="account__content-block-header">
      <h2>
        Datos de contacto
      </h2>
    </div>
    <div class="profile-form">
      <div class="form-fieldset">
        <div class="form-item half-width">
          <div class="input__group">
            <AppTextField
              id="register-name"
              v-model="profile.fname"
              placeholder=" "
              label="Nombre"
            />
          </div>
        </div>
        <div class="form-item half-width">
          <div class="input__group">
            <AppTextField
              id="register-surnames"
              ng-model="profile.lname"
              placeholder="Apellidos"
              label="Apellidos"
            />
          </div>
        </div>
      </div>
      <div class="form-fieldset">
        <div class="form-item half-width">
          <div class="input__group">
            <AppTextField
              id="register-phone"
              ng-model="profile.phone"
              type="tel"
              placeholder="Añade tu móvil"
              label="Añade tu móvil"
            />
          </div>
        </div>
        <div class="form-item half-width">
          <div class="input__group">
            <VDateInput
              id="register-birthdate"
              ng-model="profile.birthdate"
              type="date"
              placeholder="Fecha de Nacimiento"
              label="Fecha de Nacimiento"
            />
          </div>
        </div>
      </div>
      <div class="form-fieldset radios">
        <p>
          Selecciona tus
          preferencias de compra para una experiencia más personalizada *
        </p>
        <div class="radio__container">
          <input
            id="man"
            ng-model="profile.gender"
            value="1"
            type="radio"
            class="mc-radio"
          >
          <label
            for="man"
            class="register-form__field"
          >Hombre</label>
        </div>
        <div class="radio__container">
          <input
            id="woman"
            ng-model="profile.gender"
            value="2"
            type="radio"
            class="mc-radio"
          >
          <label
            for="woman"
            class="register-form__field"
          >Mujer</label>
        </div>
        <div class="radio__container">
          <input
            id="others"
            ng-model="profile.gender"
            value="3"
            type="radio"
            class="mc-radio"
          > <label
          for="others"
          class="register-form__field"
        >Otros</label>
        </div>
      </div>
      <div class="form-fieldset">
        <p>
          ¿Cuál es tu riding style favorito? (puedes seleccionar varios) *
        </p>
        <div class="riding-styles__checkboxes">
          <label class="checkbox__wrapper">
            <input
              type="checkbox"
              name="sport-racing"
              class="checkbox__input"
              ng-model="selectedStyles.sport"
            >
            <span class="checkbox__tile">
                    <span class="checkbox__icon">
                      <svg
                        width="64"
                        height="36"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 18"
                        class="icon sprite-line-icons"
                      >
                        <title>Sport/Racing</title>
                        <use
                          href="/content/svg/motomundi.svg#i-rs-newsletter-sport"
                          xlink:href="/content/svg/motomundi.svg#i-rs-newsletter-sport"
                        />
                      </svg>
                    </span>
                    <strong class="checkbox__label">Sport/racing</strong>
                  </span>
          </label>
          <label class="checkbox__wrapper">
            <input
              type="checkbox"
              name="caferacer-vintage"
              ng-model="selectedStyles.cafeRacer"
              class="checkbox__input"
            >
            <span class="checkbox__tile">
                    <span class="checkbox__icon">
                      <svg
                        width="64"
                        height="36"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 18"
                        class="icon sprite-line-icons"
                      >
                        <title>Cafe Racer/Vintage</title>
                        <use
                          href="/content/svg/motomundi.svg#i-rs-newsletter-vintage"
                          xlink:href="/content/svg/motomundi.svg#i-rs-newsletter-vintage"
                        />
                      </svg>
                    </span>
                    <strong class="checkbox__label">Cafe Racer/Vintage</strong>
                  </span>
          </label>
          <label class="checkbox__wrapper">
            <input
              type="checkbox"
              ng-model="selectedStyles.touring"
              name="touring"
              class="checkbox__input"
            >
            <span class="checkbox__tile">
                    <span class="checkbox__icon">
                      <svg
                        width="64"
                        height="36"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 18"
                        class="icon sprite-line-icons"
                      >
                        <title>Touring</title>
                        <use
                          href="/content/svg/motomundi.svg#i-rs-newsletter-touring"
                          xlink:href="/content/svg/motomundi.svg#i-rs-newsletter-touring"
                        /></svg>
                    </span>
                    <strong class="checkbox__label">Touring</strong>
                  </span>
          </label>
          <label class="checkbox__wrapper">
            <input
              type="checkbox"
              ng-model="selectedStyles.urban"
              name="scooter-urban-city"
              class="checkbox__input"
            >
            <span class="checkbox__tile"><span class="checkbox__icon">
                                                 <svg
                                                   width="64"
                                                   height="36"
                                                   xmlns="http://www.w3.org/2000/svg"
                                                   viewBox="0 0 32 18"
                                                   class="icon sprite-line-icons"
                                                 >
                                                   <title>Scooter/Urban/City</title>
                                                   <use
                                                     href="/content/svg/motomundi.svg#i-rs-newsletter-scooter"
                                                     xlink:href="/content/svg/motomundi.svg#i-rs-newsletter-scooter"
                                                   />
                                                 </svg>
                                               </span>
                    <strong class="checkbox__label">Scooter/urban/city</strong>
                  </span>
          </label>
          <label class="checkbox__wrapper">
            <input
              type="checkbox"
              ng-model="selectedStyles.offroad"
              name="motocross-enduro"
              class="checkbox__input"
            >
            <span class="checkbox__tile">
                    <span class="checkbox__icon">
                      <svg
                        width="64"
                        height="36"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 18"
                        class="icon sprite-line-icons"
                      >
                        <title>Motocross/Enduro</title>
                        <use
                          href="/content/svg/motomundi.svg#i-rs-newsletter-motocross"
                          xlink:href="/content/svg/motomundi.svg#i-rs-newsletter-motocross"
                        />
                      </svg>
                    </span>
                    <strong class="checkbox__label">Motocross/enduro</strong>
                  </span>
          </label>
          <label class="checkbox__wrapper">
            <input
              type="checkbox"
              ng-model="selectedStyles.adventure"
              name="trail-adventure"
              class="checkbox__input"
            > <span class="checkbox__tile"><span class="checkbox__icon">
                    <svg
                      width="64"
                      height="36"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 18"
                      class="icon sprite-line-icons"
                    ><title>Trail/Adventure</title><use
                      href="/content/svg/motomundi.svg#i-rs-newsletter-trail"
                      xlink:href="/content/svg/motomundi.svg#i-rs-newsletter-trail"
                    /></svg></span> <strong class="checkbox__label">Trail/adventure</strong></span>
          </label>
        </div>
      </div>

      <div class="form-fieldset">
        <p>Club Motomundi</p>
        <p class="club-member">
          Miembro desde: ${user.Party.CreateDate.ToString("dd/MM/yyyy")}
        </p>
      </div>
      <div class="profile__actions">
        <VBtn
          style="min-width: 158px; height: 41px; padding: 0px;"
          color="#000" rounded="0" variant="outlined" class="mr-2">
          Cancelar
        </VBtn>
        <VBtn

          color="#000" rounded="0"
          :loading="loading"
          style="min-width: 158px; height: 41px; padding: 0px;"
          @click="saveProfile"
          class="button button--filled with-spinner"
        >
                <span

                  ng-show="!loading"
                >Guardar cambios</span>
          <div
            ng-show="loading"
            class="spinner-container button-mode ng-hide"
            style=""
          >
            <span class="message" />
          </div>
        </VBtn>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>
