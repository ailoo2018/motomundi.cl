<script setup lang="ts">
definePageMeta({
  alias: '/cuenta/perfil',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})


const addAddress = () => {

}

const setDefault = addr => {

}

const deleteAddress = addr => {

}

const { data } = useFetch("/api/account/addresses")

const addresses  = computed(() => {
  return data.value?.addresses || []
})


</script>

<template>
  <VContainer>

    <div class="col s12 m9 l9 account__content ng-cloak">
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
                href="/content/svg/motomundi.svg#i-account-address"
                xlink:href="/content/svg/motomundi.svg#i-account-address"
              />
            </svg>
            Mis direcciones
          </h1>
          <VBtn
            rounded="0"}
            color="#000"
            @click="addAddress();">
            Añadir dirección
          </VBtn>
        </div>



        <div v-if="addresses != null && addresses.length == 0">
          <div class="col s12 l12 empty-addresses">
            <svg
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              class="icon sprite-line-icons"
            >
              <use 
                href="/content/svg/motomundi.svg#i-account-address"
                xlink:href="/content/svg/motomundi.svg#i-account-address"
              />
            </svg>
            <p>Aún no has añadido ninguna dirección a tu cuenta.</p>
            <button
              class="button button--filled button--small"
              @click="addAddress();"
            >
              Añadir la primera dirección
            </button>
          </div>
        </div>


        <div class="account__address-container">
          <div  
            v-for="addr in addresses"
            class="account__address "
            :class="addr.isDefault ? 'account__address--default' : ''"
          >
            <div
              class="account__address-edit"
              style="display: none;"
            >
              <button class="cancel">
                <svg
                  width="8"
                  height="8"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                >
                  <use 
                    href="/content/svg/motomundi.svg#i-icon-cross"
                    xlink:href="/content/svg/motomundi.svg#i-icon-cross"
                  />
                </svg>
                Cancelar
              </button>
              <div class="account__address-edit-actions">
                <p>Marcar como predeterminada para</p>
                <a>Envío</a>
                <a>Facturación</a>
                <a>Ambas</a>
              </div>
            </div>
            <div class="account__address-header">
              <span v-if="addr.isDefault">Predeterminada
                <strong> Envío</strong>
              </span>
              <button
                class="address-default-toggle"
                @click="setDefault(addr)"
              >
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon sprite-line-icons"
                >
                  <use 
                    href="/content/svg/motomundi.svg#i-icon-star"
                    xlink:href="/content/svg/motomundi.svg#i-icon-star"
                  />
                </svg>
              </button>
            </div>
            <div class="account__address-body">
              <p class="address__name">
                <strong >{{ addr?.alias }}</strong>
              </p>
              <p>{{ addr.fname }} {{ addr.lname }}</p>
              <p>{{ addr.phone  }}</p>
              <p>
                {{ addr.address }} {{ addr.address2 }},<br>
                <span v-if="addr.postalCode && addr.postalCode.length > 0">{{ addr.postalCode }} - </span>{{ addr.comuna.name }}<br>
                Chile
              </p>
            </div>
            <div class="account__address-actions">
              <a 
                :href="'/account/addresses' + addr.id"
                class="mtc-link"
              >
                Modificar
              </a> ·
              <button @click="deleteAddress(addr);">
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <button
          v-if="addresses.length > 0"
          @click="addAddress();"
          class="button hide-on-large-only hide-on-extra-large-only"
        >
          <svg
            width="10"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
            class="icon sprite-line-icons"
          >
            <use
              href="/content/svg/motomundi.svg#i-icon-plus"
              xlink:href="/content/svg/motomundi.svg#i-icon-plus"
            />
          </svg>
          Añadir dirección
        </button>
      </div>
    </div>
  </VContainer>
</template>

<style>
.account__address-container p {
  margin: 0;
}

.account__address-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.account__address-header button {
  padding: 5px;
  position: absolute;
  right: 7px;
  top: 2px;
  z-index: 3;
}

.account__address.account__address--default .account__address-header use {
  fill: #d6001c;
  stroke: #d6001c;
}

.account__address-header span {
  font-size: 10px;
  line-height: 0;
  opacity: .3;
  text-transform: uppercase;
}

.account__address.account__address--default .account__address-header span {
  display: block;
  line-height: 32px;
  opacity: 1;
}

.account__address-header {
  height: 0;
}

.account__address.account__address--default .account__address-header {
  border-bottom: 2px solid #fff;
  height: 30px;
  padding: 0 30px;
}

.account__address .account__address-edit {
  display: flex;
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
  z-index: 2;
}

.account__address-edit {
  align-content: center;
  align-items: center;
  background-color: hsla(0, 0%, 96%, .95);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
  transition: -webkit-transform .3s cubic-bezier(.53, .01, .36, 1.23);
  transition: transform .3s cubic-bezier(.53, .01, .36, 1.23);
  transition: transform .3s cubic-bezier(.53, .01, .36, 1.23), -webkit-transform .3s cubic-bezier(.53, .01, .36, 1.23);
}

.account__address {
  border: 2px solid #f1f1f1;
  flex: 0 1 48%;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 30px;
  overflow: hidden;
  position: relative;
}

.account__address.account__address--default {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
}

.account__address-body p:first-child {
  margin-top: 0;
}

.account__address-body p:last-child {
  margin-bottom: 0;
}

.account__address-actions {
  padding: 0 30px 20px;
}

.account__address-actions a, .account__address-actions button, .account__address-actions span {
  color: #d6001c;
  font-size: 11px;
  font-weight: 500;
  padding: 0;
}

.account__address-body {
  padding: 20px 30px;
}

@media only screen and (max-width: 600px) {
  .account__address {
    flex: 0 1 100%;
  }
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .account__address {
    flex: 0 1 100%;
    margin-bottom: 10px;
  }
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .account__address-body {
    padding: 20px 30px 10px;
  }
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .account__address-body p {
    font-size: 12px;
    line-height: 14px;
    margin: 6px 0;
  }
}
</style>
