<template>
  <nav id="blognav">
    <ul
      class="categories-menu"
      ng-controller="BlogSearchCtrl"
    >
      <li>
        <form
          role="search"
          method="get"
          class="search-form blog-search-form"
        >
          <label class="v-select">
            <input
              type="search"
              class="input-magnifying-glass search-field not-found-input"
              value=""
              name="s"
              ng-keydown="handleKeyDown($event, searchSelector)"
              ng-model="sword"
              data-swplive="true"
              data-swpengine="default"
              data-swpconfig="default"
              autocomplete="off"
            >

            <ul
              id="vs1__listbox"
              role="listbox"
              tabindex="-1"
              class="vs__dropdown-menu fade ng-hide"

              ng-class="searchSelector.isShow ? 'ng-show' : ''"
              ng-show="searchSelector.isShow"
            >
              <li
                id="vs1__option-0"
                ng-click="onSelectEntry(entry)"
                role="option"
                ng-mouseenter="entrySelector.index = $index"
                ng-repeat="entry in entries"
                ng-class="{'vs__dropdown-option--highlight' : searchSelector.index == $index}"
                class="blogsearch_dropdown_option vs__dropdown-option"
              >
                {{ entry.title }}
              </li>
            </ul>
          </label>
          <input
            type="submit"
            class="search-submit submit button button--primary"
            value="Buscar"
          >
        </form>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/reviews/"
        >
          <div class="icon-container">
            <img
              src="/content/images/assets/icons/review.svg"
              class="lazyloaded"
            >

          </div>
          <div class="text-container"><p>Reviews y pruebas</p>
            <span>Conoce al detalle lo que buscas.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/comparativas-y-rankings/"
        >
          <div class="icon-container"><img
            src="/content/images/assets/icons/comparison.svg"
            class="lazyloaded"
          >

          </div>
          <div class="text-container"><p>Comparativas y rankings</p>
            <span>¿Dudas entre varios productos? Te ayudamos.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/tutoriales/"
        >
          <div class="icon-container">
            <img
              src="/content/images/assets/icons/tutorial.svg"
              class="lazyloaded"
            >

          </div>
          <div class="text-container"><p>Tutoriales y tecnología</p>
            <span>Conviértete en un experto de la equipación.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/guias-de-compra/"
        >
          <div class="icon-container"><img
            src="/content/images/assets/icons/shopping-guide.svg"
            class="lazyloaded"
          >
          </div>
          <div class="text-container"><p>Guías de compra</p>
            <span>Todo lo que debes saber antes de decidirte.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/noticias/"
        >
          <div class="icon-container"><img
            src="/content/assets/icons/news.png"
            class="lazyloaded"
          >
          </div>
          <div class="text-container"><p>Tendencias y novedades</p>
            <span>La evolución del mercado de motocicletas en Chile.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/planeta-motero/"
        >
          <div class="icon-container"><img
            src="/content/images/assets/icons/planet-biker.svg"
            class="lazyloaded"
          >
          </div>
          <div class="text-container"><p>Mundi motero</p><span>Adéntrate en el mundo de la moto.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/videos/"
        >
          <div class="icon-container">
            <img
              src="/content/images/assets/icons/video.svg"
              class="lazyloaded"
            >
          </div>
          <div class="text-container"><p>Nuestros vídeos</p>
            <span>Disfruta de nuestros mejores vídeos.</span>
          </div>
        </a>
      </li>
    </ul>
  </nav>
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
            >
            <noscript><img
              src="/content/images/assets/icons/twitter.svg"
              >
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
            >
            <noscript><img
              src="/content/images/assets/icons/facebook.svg"
              >
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
            >
            <noscript><img
              src="/content/images/assets/icons/youtube.svg"
              >
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
            >
            <noscript><img
              src="/content/images/assets/icons/instagram.svg"
              >
            </noscript>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>


