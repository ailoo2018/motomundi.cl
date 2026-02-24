<script setup lang="ts">
const emailForm = ref({})
</script>

<template>
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
</template>

<style scoped lang="scss">

</style>
