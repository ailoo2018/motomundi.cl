<script>
import { defineComponent } from "vue"
import BlogSearch from "@/views/pages/blog/blog-search.vue"
import BlogNavigation from "@/layouts/blog/blog-navigation.vue"

const entry = ref()
const searchSelector = ref({ isShow: false })

export default defineComponent({
  components: { BlogNavigation, BlogSearch },
})
</script>

<template>
  <BlogNavigation />
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
        > 
        <label
          class="mc-checkbox-label sidebar-gdrp"
          for="gdpr-legal-accept-blog-sidebar"
        > 
          <span class="checkbox-block" /> He leído y acepto la política de
          privacidad. 
        </label>
        <p
          class="gdpr-small-newsletter"
          style="font-size: 10px"
        >
          Los datos
          personales que nos facilitas serán tratados por MotoMundi S.P.A.
          Podrás revocar cualquier consentimiento y modificar tus datos cuando
          quieras y con efecto inmediato desde tu panel de usuario. Para más
          información consulta nuestra
          <a
            href="/terminos-y-condiciones.html?open=privacy-policy"
            target="_blank"
          >política de privacidad.</a>
        </p>
        <a style="text-transform: uppercase;font-size: 11px;margin-top: 5px;display: block;">Más información</a>
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
          >
            <img src="https://cf-cdn-blog.motocard.com/assets/icons/twitter.svg">

          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="nofollow"
            href="https://es-es.facebook.com/motomundi.la/"
          > <img src="https://cf-cdn-blog.motocard.com/assets/icons/facebook.svg">
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="nofollow"
            href="https://www.youtube.com/user/motomunditv"
          >
            <img src="/content/images/assets/icons/youtube.svg">
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="nofollow"
            href="https://www.instagram.com/motomundi/"
          >
            <img src="/content/images/assets/icons/instagram.svg">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.categories-menu .vs__selected-options {
  padding-left: 20px !important;
}


.menu-mobile > * {
  opacity: 1;
  pointer-events: none;
}

.categories-menu .vs__selected-options input, .categories-menu .vs__selected-options span {
  font-size: 11px;
  font-weight: 600;
  height: 34px;
  margin: 0 0 8px;
  padding: 0 30px 0 10px;
  text-transform: uppercase;
  vertical-align: middle;
}

.categories-menu ul {
  padding: 0;
}

.v-select .vs__dropdown-menu {
  border: 0;
  border-radius: 0;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, .15), 0 0 35px 0 rgba(0, 0, 0, .2);
}


.v-select .vs__dropdown-menu li {
  white-space: normal;
  padding-left: 10px;
}

.v-select .vs__dropdown-menu {
  background: #fff;
  background: var(--vs-dropdown-bg);
  border: 1px solid rgba(60, 60, 60, .26);
  border: var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);
  border-radius: 0 0 var(--vs-border-radius) var(--vs-border-radius);
  border-top-style: none;
  box-shadow: var(--vs-dropdown-box-shadow);
  box-sizing: border-box;
  color: var(--vs-dropdown-color);
  display: block;
  left: 0;
  list-style: none;
  margin: 0;
  max-height: var(--vs-dropdown-max-height);
  min-width: var(--vs-dropdown-min-width);
  overflow-y: auto;
  overflow-x: unset;
  white-space: normal;
  padding: 5px 0;
  position: absolute;
  text-align: left;
  top: calc(100% + 1px);
  width: calc(100% + 90px);
  z-index: 1000;

}

.fade {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.fade.ng-show {
  opacity: 1;
}

.categories-menu.horizontal .selector {
  display: flex;
  gap: 8px;
}


.categories-menu.horizontal .selector {
  display: flex;
  gap: 8px;
}

#blognav .categories-menu ul li {
  padding: 0 6px !important;
}

.categories-menu ul li.vs__dropdown-option {
  min-height: 50px;
}

.categories-menu ul li.vs__dropdown-option--highlight {
  background-color: #f5f5f5;
  color: #000;
  white-space: unset;
  width: 100%;
  overflow-x: unset;
}

.categories-menu ul li {
  /*
  font-size: 11px;
  font-weight: 600;
  height: 34px;
  line-height: 34px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
  */
}

.v-select.vs--open .vs__open-indicator {
  -webkit-transform: scale(.65) rotate(180deg) !important;
  transform: scale(.65) rotate(180deg) !important;
}


.categories-menu .select-container[data-v-69f9aebc] {
  flex: 0 1 100%;
  margin-bottom: 8px;
  position: relative;
}
</style>
