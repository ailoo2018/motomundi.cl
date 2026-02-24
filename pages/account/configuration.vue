<script setup lang="ts">
import AccountProfile from "@/views/pages/account/profile/account-profile.vue";
import AccountPrivacy from "@/views/pages/account/profile/account-privacy.vue";
import AccountDelete from "@/views/pages/account/profile/account-delete.vue";

definePageMeta({
  alias: '/cuenta/configuracion',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})




const saveProfile = () => {

}
</script>

<template>
  <VContainer>
    <div class="account__content">
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
        <AccountProfile />
        <AccountPrivacy />
        <AccountPassword />
        <AccountDelete />
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
  text-align: left;
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

[type=checkbox]:checked + span:before {
  background-color: #000;
  background-size: auto;
}
[type=checkbox] + span:before {
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSI4Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjgiIGQ9Ik05IDFMMy41IDYuNSAxIDQiLz48L3N2Zz4=) 50% no-repeat;
  background-size: 0;
  border: 1px solid #000;
  content: "";
  height: 18px;
  left: 0;
  margin-top: 3px;
  position: absolute;
  top: 0;
  transition: .2s;
  transition: all .2s ease-in-out;
  width: 18px;
  z-index: 0;
}

.riding-styles__checkboxes .checkbox__label {
  font-size: 11px;
  text-align: center;
  text-transform: uppercase;
  transition: .375s ease;
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

.profile-form .field-group.radios, .profile-form .form-fieldset.radios {
  justify-content: flex-start;
}

.profile-form .field-group.radios .radio__container, .profile-form .form-fieldset.radios .radio__container {
  margin-right: 24px;
}

/***** privacidad ***/

.account__content-block .account__content-block-body {
  background-color: #f5f5f5;
  padding: 24px 32px;
}
</style>
