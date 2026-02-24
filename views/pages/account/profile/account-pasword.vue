<script setup lang="ts">
const passwordForm = ref({})
</script>

<template>
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
</template>

<style scoped lang="scss">

</style>
