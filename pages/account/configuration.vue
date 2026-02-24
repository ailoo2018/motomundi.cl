<script setup lang="ts">
definePageMeta({
  alias: '/cuenta/configuracion',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

const profile = ref({})
const passwordForm = ref({})
const emailForm = ref({})
</script>

<template>
  <VContainer>
    <div class="col s12 m9 l9 account__content">
      <div class="account__content-block">
        <div class="account__content-block-title">
          <h1 class="account__title">
            <svg
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              class="icon sprite-line-icons"
            >
              <use 
                href="/content/svg/motomundi.svg#i-account-user"
                xlink:href="/content/svg/motomundi.svg#i-account-user"
              />
            </svg>
            Configuración
          </h1>
        </div>
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
              <VBtn >
                Cancelar
              </VBtn>
              <VBtn
                id="submit-profile-form-button"
                
                type="button"
                ng-disabled="loading"
                style="    min-width: 158px;    height: 41px;    padding: 0px;"
                ng-click="saveProfile()"
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
        <div class="account__content-block account__privacy">
          <div class="account__content-block-header">
            <h2>Privacidad</h2>
          </div>
          <div class="account__content-block-body">
            <p>
              Apúntate para
              recibir las ofertas y promociones exclusivas que enviamos a nuestros clientes, además
              <strong>¡podemos personalizártelas para que sólo recibas lo que te interesa!</strong>
            </p>
            <label for="commercial_communications">
              <input
                id="commercial_communications"
                type="checkbox"
                ng-model="profile.receiveNewsletter"
              >
              <span>
                Quiero recibir comunicaciones comerciales por parte de MOTOMUNDI SPA.
                <a
                  href="/terminos-y-condiciones.html?open=privacy-policy"
                  target="_blank"
                  rel="nofollow"
                ><svg
                  width="19"
                  height="19"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                ><title>Más información</title><use
                                  
                  href="/content/svg/motomundi.svg#i-icon-info"
                  xlink:href="/content/svg/motomundi.svg#i-icon-info"
                /></svg></a></span></label>
            <label for="want_customize_offers_and_interest"><input 
              id="want_customize_offers_and_interest"
              type="checkbox"
            > <span>Quiero personalizar mis ofertas en función de mis intereses personales, preferencias y uso de vuestros servicios.
              <a
                href="/terminos-y-condiciones.html?open=privacy-policy"
                target="_blank"
                rel="nofollow"
              ><svg
                width="19"
                height="19"
                xmlns="http://www.w3.org/2000/svg"
                class="icon sprite-line-icons"
              ><title>Más información</title><use
                href="/content/svg/motomundi.svg#i-icon-info"
                xlink:href="/content/svg/motomundi.svg#i-icon-info"
              /></svg></a></span></label>
          </div>
        </div>
        <div class="account__content-block">
          <div class="account__content-block-header">
            <h2>
              Datos de acceso
            </h2>
          </div>
          <div class="account__content-block-body">
            <p class="account__content-user">
              <span>Correo:</span>
              <strong class="ng-cloak">{{ profile.email }}</strong>
              <button
                class="edit-account-button"
                ng-click="emailForm.isEdit = !emailForm.isEdit;"
              >
                <svg
                  width="17"
                  height="17"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                ><title>Modificar</title>
                  <use 
                    href="/content/svg/motomundi.svg#i-icon-edit"
                    xlink:href="/content/svg/motomundi.svg#i-icon-edit"
                  />
                </svg>
              </button>
            </p>
            <div class="account__content-password-change">
              <button
                id="show-password-button"
                ng-show="!emailForm.isEdit"
                ng-click="isChangePassword = !isChangePassword;"
                class="button button--filled button--tiny"
              >
                Cambiar Contraseña
              </button>
            </div>
            <div class="cropper-wrapper">
              <div
                class="edit-user-avatar"
                style="display: none;"
              >
                <div class="upload-image">
                  <input
                    id="fileAvatar"
                    type="file"
                    ngf-select
                    ng-model="file"
                    
                    ngf-max-size="20MB"
                    ngf-pattern="'image/*'"
                    name="avatar"
                    accept="image/*"
                  >
                  <svg
                    width="11"
                    height="11"
                    xmlns="http://www.w3.org/2000/svg"
                    class="edit-icon icon sprite-line-icons"
                  ><title>Upload image</title>
                    <use
                      href="/content/svg/motomundi.svg#i-icon-upload"
                      xlink:href="/content/svg/motomundi.svg#i-icon-upload"
                    />
                  </svg>
                </div>
              </div>
              <div class="mobile-buttons">
                <button
                  ng-click="uploadAvatar()"
                  class="button button--filled button--tiny xxhide-on-large-only xxhide-on-extra-large-only"
                >
                  Cambiar avatar
                </button>
              </div>
              #parse("Account/CropperDialog.vm")

              <div
                class="resize-wrapper"
                ng-if="avatarUrl"
                style="max-width: 500px;"
              >
                <img ng-src="{{avatarUrl}}">
                <!-- <canvas></canvas> -->
              </div>
            </div>
            <div
              class="password-form ng-hide"
              ng-show="isChangePassword"
            >
              <form
                name="passForm"
                data-gtm-form-interact-id="3"
              >
                <input
                  type="hidden"
                  ng-model="profile.partyId"
                >
                <input 
                  id="catchChromeAutocomplete"
                  type="email"
                  style="display: none;"
                  data-gtm-form-interact-field-id="6"
                >
                <div class="form-fieldset">
                  <div class="form-item half-width">
                    <div class="input__group">
                      <input 
                        id="old-password"
                        ng-model="passwordForm.oldPassword"
                        ng-class="passwordForm.oldPasswordError != null ? 'invalid' : ''"
                        type="password"
                        placeholder=" "
                        class="validate"
                        data-gtm-form-interact-field-id="7"
                      >
                      <label
                        for="old-password"
                        class="active"
                      >Contraseña
                        actual</label>
                    </div>
                    <span
                      class="input-hint error ng-hide"
                      ng-show="passwordForm.oldPasswordError"
                    >
                      {{ passwordForm.oldPasswordError }}
                    </span>
                  </div>
                </div>
                <div class="form-fieldset">
                  <div class="form-item half-width">
                    <div class="input__group">
                      <input 
                        id="account-password"
                        type="password"
                        ng-model="passwordForm.password"
                        ng-class="passwordForm.passwordError != null ? 'invalid' : ''"
                        placeholder=" "
                        class="validate"
                      > <label
                        for="account-password"
                        class="active"
                      >Nueva
                        contraseña</label>
                    </div>
                    <span
                      class="input-hint error ng-hide"
                      ng-show="passwordForm.passwordError"
                    >{{ passwordForm.passwordError }}</span>
                  </div>
                  <div class="form-item half-width">
                    <div class="input__group">
                      <input 
                        id="account-password-confirmation"
                        type="password"
                        ng-class="passwordForm.confirmationError != null ? 'invalid' : ''"
                        ng-model="passwordForm.password_confirmation"
                        placeholder=" "
                        class="validate"
                      >
                      <label
                        for="account-password-confirmation"
                        class="active"
                      >Repite
                        la contraseña</label>
                    </div>
                    <span
                      class="helper-text"
                      ng-if="passwordForm.confirmationError"
                    >
                      {{ passwordForm.confirmationError }}
                    </span>
                  </div>
                </div>
                <div class="modify-buttons">
                  <VBtn
                    type="button"
                    class="button"
                    ng-click="isChangePassword = false;"
                  >
                    Cancelar
                  </VBtn>
                  <VBtn
                    id="submit-password-form"
                    
                    type="button"
                    ng-click="savePassword()"
                    class="button button--filled with-spinner"
                  >
                    <span >Guardar cambios</span>
                    <div
                      ng-show="loading"
                      class="spinner-container button-mode ng-hide"
                      style=""
                    >
                      <span class="message"/>
                    </div>
                  </VBtn>
                </div>
              </form>
            </div>
            <div
              class="account-form ng-hide"
              ng-show="emailForm.isEdit"
            >
              <div class="form-fieldset">
                <div class="form-item half-width">
                  <div class="input__group">
                    <input 
                      id="account-email"
                      ng-model="emailForm.email"
                      ng-class="emailForm.error != null ? 'invalid' : ''"
                      type="email"
                      placeholder=" "
                      class="validate"
                    >
                    <label
                      for="account-email"
                      class="active"
                    >
                      Correo electrónico
                    </label>
                  </div>
                  <span
                    class="input-hint error ng-hide"
                    ng-show="emailForm.error"
                  >
                    {{ emailForm.error }}
                  </span>
                </div>
                <div class="form-item half-width">
                  <div class="input__group">
                    <input 
                      id="account-old-password"
                      ng-model="emailForm.password"
                      type="password"
                      placeholder=" "
                      class="validate"
                    >
                    <label
                      for="account-old-password"
                      class="active"
                    >
                      Contraseña actual
                    </label>
                  </div>
                  <span
                    class="input-hint error ng-hide"
                    ng-show="emailForm.errorPassword"
                  >
                    {{ emailForm.errorPassword }}
                  </span>
                </div>
              </div>
              <div class="modify-buttons">
                <button
                  class="button"
                  ng-click="emailForm.isEdit = false;"
                >
                  Cancelar
                </button>
                <button
                  id="submit-account-form-button"
                  
                  type="button"
                  ng-click="updateEmail()"
                  style="    min-width: 158px;height: 41px;padding: 0px;"
                  ng-class="emailForm.isLoading ? 'loading' : ''"
                  class="button button--filled with-spinner"
                >
                  <span
                    
                    ng-show="!emailForm.isLoading"
                  >
                    Guardar cambios
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="account__content-block account__delete">
          <div class="account__content-block-header">
            <h2>
              Eliminar cuenta
            </h2>
          </div>
          <p>
            Esto eliminará todos tus datos personales, incluida la cuenta y los pedidos
            vinculados.
          </p>
          <div>
            <div class="delete-account-wrapper">
              <button class="button button-outline button--tiny">
                Eliminar cuenta
              </button>
            </div>
            <div
              class="modal-wrapper delete-account-modal"
              style="display: none;"
            >
              <div class="modal-backdrop" />
              <div
                role="dialog"
                class="modal"
              >
                <div class="modal__close-cont">
                  <button class="modal__close">
                    <svg
                      width="9"
                      height="9"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon sprite-line-icons"
                    >
                      <use
                        href="/content/svg/motomundi.svg#i-icon-cross"
                        xlink:href="/content/svg/motomundi.svg#i-icon-cross"
                      />
                    </svg>
                  </button>
                </div>
                <header class="modal-header">
                  <div>
                    <h1>
                      ¿Seguro que quieres eliminar tu
                      cuenta?
                    </h1>
                  </div>
                </header>
                <section class="modal-body">
                  <div class="container">
                    <p>
                      <strong>Esto eliminará todos tus datos personales, incluida la
                        cuenta y los pedidos vinculados.</strong>
                    </p>
                    <p>
                      Si haces click en 'Eliminar cuenta' tu cuenta será
                      eliminada, a no ser que vuelvas a iniciar sesión antes de 30 días.
                    </p>
                    <div class="buttons">
                      <button class="button">
                        Cancelar
                      </button>
                      <button class="delete-account-btn button button--primary">
                        Eliminar cuenta
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </VContainer>
</template>

<style>
.account__content h1.account__title {
  font-size: 25px;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
}

.account__content-block .account__content-block-header h2 {
  font-size: 15px;
  font-weight: 700;
}

.account__content-block .account__content-block-header h2 {
  font-size: 15px;
  font-weight: 700;
}

.profile-form {
  background-color: #f5f5f5;
  margin: 0 auto;
  padding: 0;
}

.cropper-wrapper .modal-wrapper.cropper-modal .modal .actions {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}
.cropper-wrapper .modal-wrapper.cropper-modal .modal .actions a:first-child {
  margin-right: 8px;
}
.cropper-wrapper .modal-wrapper.cropper-modal .modal .actions a {
  background: none;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .5px;
  line-height: 1;
  overflow: hidden;
  padding: 13px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
  z-index: 1;
}

.riding-styles__checkboxes {
  grid-column-gap: 3px;
  grid-row-gap: 3px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  margin: 0 auto;
  width: 100%;
}

@media only screen and (min-width: 601px) {
  .riding-styles__checkboxes {
    grid-template-columns: repeat(3, 1fr);
  }
}

.profile-form .field-group p, .profile-form .form-fieldset p {
  flex: 0 0 100%;
  font-size: 15px;
  font-weight: 300;
  margin: 0 0 12px;
}

.riding-styles__checkboxes {
  grid-column-gap: 3px;
  grid-row-gap: 3px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  margin: 0 auto;
  width: 100%;
}

.form-fieldset {
  align-items: flex-start;
  -webkit-column-gap: 10px;
  -moz-column-gap: 10px;
  column-gap: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-between;
  row-gap: 5px;
}

.profile-form .field-group, .profile-form .form-fieldset {
  border-bottom: 2px solid #fff;
  padding: 24px 32px;
}

@media only screen and (min-width: 993px) {
  .riding-styles__checkboxes {
    /*width: 70%;*/
  }
}
@media only screen and (min-width: 601px) {
  .riding-styles__checkboxes {
    grid-template-columns: repeat(3, 1fr);
  }
}

.riding-styles__checkboxes .checkbox__input {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.riding-styles__checkboxes .checkbox__tile {
  align-items: center;
  background-color: hsla(0, 0%, 100%, .5);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
  padding: 10px 0 !important;
  position: relative;
  transition: .15s ease;
  width: 100%;
}

.riding-styles__checkboxes [type=checkbox] + span {
  height: auto;
  line-height: 1.1em;
  padding: 0;
}

.riding-styles__checkboxes .checkbox__tile {
  align-items: center;
  background-color: hsla(0, 0%, 100%, .5);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
  padding: 10px 0 !important;
  position: relative;
  transition: .15s ease;
  width: 100%;
}
.riding-styles__checkboxes .checkbox__input:checked + .checkbox__tile:before {
  background-color: #d6001c;
  border-color: #d6001c;
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.riding-styles__checkboxes .checkbox__tile:before {
  background-color: #fff;
  border: 2px solid #d8d8d8;
  border-radius: 50%;
  content: "";
  display: block;
  height: .8rem;
  left: 8px;
  margin: 0;
  position: absolute;
  top: 8px;
  transition: .25s ease;
  width: .8rem;
}
.riding-styles__checkboxes .checkbox__icon svg {
  display: block;
  margin: 6px auto;
}

.riding-styles__checkboxes .checkbox__input:checked + .checkbox__tile .checkbox__icon, .riding-styles__checkboxes .checkbox__input:checked + .checkbox__tile .checkbox__label {
  color: #000;
}
.riding-styles__checkboxes .checkbox__wrapper {
  margin: 0;
}

.riding-styles__checkboxes .checkbox__input {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.riding-styles__checkboxes .checkbox__input:checked + .checkbox__tile {
  color: #000;
}

.riding-styles__checkboxes .checkbox__icon svg use {
  stroke: #000;
  stroke-width: .5;
}



/***** privacidad ***/

.account__content-block .account__content-block-body {
  background-color: #f5f5f5;
  padding: 24px 32px;
}
</style>
