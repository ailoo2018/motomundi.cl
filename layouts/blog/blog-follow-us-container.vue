<script setup lang="ts">

</script>

<template>
  <div class="subscribe-rss-container">
    <div class="newsletter-container">
      <p class="sidebar-title">
        Mantente informado
      </p>
      <p class="claim">
        Recibe toda la información sobre la equipación de moto en tu
        correo:
      </p>
      <form class="newsletter-form subscribe-blog">
        <div class="input-container">
          <input
            class="input-email email"
            type="email"
            placeholder="Tu correo electrónico..."
          >
          <button
            class="submit"
            data-style="zoom-in"
          >
            Suscríbete
          </button>
        </div>
        <div class="error-email ng-hide">
          Necesitas un email válido para
          subscribirte
        </div>
        <div class="success ng-hide">
          <i class="icon-ok" /> <span class="comment">¡Gracias por apuntarte a nuestra newsletter!</span>
        </div>
        <div
          class="error-gdpr ng-hide"
          style="color: #c74044; margin: 10px 0;"
        >
          <i class="icon-attention" /> Debes aceptar las condiciones antes de
          continuar
        </div>
        <input
          id="gdpr-legal-accept-blog-sidebar"
          type="checkbox"
          name="gdpr-legal-accept"
          class="mc-checkbox"
          ng-model="formData.termsAccepted"
        > <label
        class="mc-checkbox-label sidebar-gdrp"
        for="gdpr-legal-accept-blog-sidebar"
      > <span class="checkbox-block" /> He leído y acepto la política de
        privacidad. </label>
        <p
          class="gdpr-small-newsletter"
          style="font-size: 10px"
        >
          Los datos
          personales que nos facilitas serán tratados por MotoMundi S.P.A.
          Podrás revocar cualquier consentimiento y modificar tus datos cuando
          quieras y con efecto inmediato desde tu panel de usuario. Para más
          información consulta nuestra <a
          href="/terminos-y-condiciones.html?open=privacy-policy"
          target="_blank"
        >política de privacidad.</a>
        </p>             <a
        gdpr-more-info=""
        style="text-transform: uppercase;font-size: 11px;margin-top: 5px;display: block;"
      >Más
        información</a>
      </form>
    </div>
    <div class="follow-us-container">
      <p class="title">
        O síguenos en tus redes sociales
        favoritas:
      </p>
      <ul>
        <li>
          <a
            target="_blank"
            rel="nofollow"
            href="https://twitter.com/motomundi?lang=es"
          > <img
            src="https://cf-cdn-blog.motocard.com/assets/icons/twitter.svg"
            class="lazyloaded"
            data-ll-status="loaded"
          >
            <noscript><img
              src="/content/images/assets/icons/twitter.svg">
            </noscript>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="nofollow"
            href="https://es-es.facebook.com/motomundi.la/"
          > <img
            src="https://cf-cdn-blog.motocard.com/assets/icons/facebook.svg"
            class="lazyloaded"
            data-ll-status="loaded"
          >
            <noscript><img
              src="/content/images/assets/icons/facebook.svg">
            </noscript>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="nofollow"
            href="https://www.youtube.com/user/motomunditv"
          > <img
            src="/content/images/assets/icons/youtube.svg"
            class="lazyloaded"
            data-ll-status="loaded"
          >
            <noscript><img
              src="/content/images/assets/icons/youtube.svg">
            </noscript>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="nofollow"
            href="https://www.instagram.com/motomundi/"
          > <img
            src="/content/images/assets/icons/instagram.svg"
            class="lazyloaded"
            data-ll-status="loaded"
          >
            <noscript><img
              src="/content/images/assets/icons/instagram.svg">
            </noscript>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
