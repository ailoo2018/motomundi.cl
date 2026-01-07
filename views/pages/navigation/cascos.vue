<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})

const href = props.href
</script>

<template>
  <!-- cascos  -->
  <VMenu
    open-on-hover
    :close-on-content-click="false"
    attach="#menu-anchor"
    location="bottom"
    class="mega-menu-wrapper "
    width="100%"
    content-class="centered-mega-menu"
  >
    <template #activator="{ props }">
      <li
        v-bind="props"
        class="l0 c0 main-nav"
      >
        <a :href="href">
          <span>Cascos</span>
        </a>
      </li>
    </template>

    <ul class="u1">
      <li
        id="ni_3853"
        class="l1 c0 primary subCategories"
      >
        <div class="submenu">
          <div class="container">
            <div class="row">
              <div class="col s12 submenu__container">
                <div class="submenu__main-content">
                  <div class="submenu__header">
                    <span class="h2">
                      <span>Cascos</span>
                      <a
                        href="/cascos-para-moto"
                        class="mtc-link"
                      >
                        Ver todos
                      </a>
                    </span>
                  </div>

                  <div class="submenu__content submenu__icon-buttons">
                    <a
                      href="/cascos/novedades"
                      class="mtc-link"
                      title="Novedades"
                    >
                      <img
                        src="/content/assets/categories/140-motos-novedades-cascos.svg"
                        title="Novedades"
                        width="40"
                        height="40"
                        alt="Novedades"
                      >
                      <p>Novedades</p>
                    </a>


                    <a
                      href="/cascos-integrales-para-moto"
                      class="mtc-link"
                      title="Integrales"
                    >
                      <img
                        src="/content/assets/menu/categories/01-moto-equipacion-carretera-cascos-racing.svg"
                        title="Integrales"
                        width="40"
                        height="40"
                        alt="Cascos Integrales"
                      >
                      <p>Integrales</p>
                    </a>

                    <a
                      href="/cascos-abatibles-para-moto"
                      class="mtc-link"
                      title="Modulares"
                    >
                      <img
                        src="/content/assets/menu/categories/02-moto-equipacion-carretera-cascos-modulares.svg"
                        title="Modulares"
                        width="40"
                        height="40"
                        alt="Cascos modulares"
                      >
                      <p>Modulares</p>
                    </a>


                    <a
                      href="/cascos-abiertos-para-moto"
                      class="mtc-link"
                      title="Jet"
                    ><img
                       src="/content/assets/menu/categories/03-moto-equipacion-carretera-cascos-jet.svg"
                       title="Jet"
                       width="40"
                       height="40"
                       alt="Cascos jet"
                     >
                      <p>Jet</p>
                    </a>

                    <a
                      href="/cascos-motocross"
                      class="mtc-link"
                      title="Motocross / Enduro"
                    ><img
                       src="/content/assets/menu/categories/21-moto-equipacion-motocross-cascos.svg"
                       title="Motocross / Enduro"
                       width="40"
                       height="40"
                       alt="Cascos motocross"
                     >
                      <p>Motocross / Enduro</p>
                    </a>

                    <a
                      href="/cascos-motocross"
                      class="mtc-link"
                      title="Trial"
                    >
                      <img
                        src="/content/assets/menu/categories/36-moto-equipacion-trial-cascos.svg"
                        title="Trial"
                        width="40"
                        height="40"
                        alt="Cascos trial"
                      >
                      <p>Trial</p>
                    </a>

                    <a
                      href="/intercomunicadores"
                      class="mtc-link"
                      title="Casco + intercomunicador"
                    >
                      <img
                        src="/content/assets/menu/categories/packs-casco-intercom.svg"
                        title="Casco + intercomunicador"
                        width="40"
                        height="40"
                        alt="Casco + intercomunicador"
                      >
                      <p>Intercomunicador</p>
                    </a>


                    <a
                      href="/accesorios-para-cascos"
                      class="mtc-link"
                      title="Accesorios"
                    >
                      <img
                        src="/content/assets/menu/categories/16-moto-equipacion-carretera-complementos.svg"
                        title="Accesorios"
                        width="40"
                        height="40"
                        alt="Accesorios de cascos"
                      >
                      <p>Accesorios</p>
                    </a>
                  </div>
                </div>
              </div>

              <div class="col s12 submenu__extra-nav">
                <div class="extra__container">
                  <!-- marcas destacadas -->
                  <div class="extra__brands">
                    <div class="container">
                      <span class="h3">Marcas destacadas</span>
                      <ul>
                        <li>
                          <a
                            href="/cascos-alpinestars"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-77.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos ALPINESTARS"
                            width="59"
                            height="30"
                          >
                          </span></a>
                        </li>
                        <li>
                          <a
                            href="/shoei"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-78.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos SHOEI"
                            width="59"
                            height="30"
                          ></span></a>
                        </li>
                        <li>
                          <a
                            href="/cascos-agv"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-82.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos AGV"
                            width="59"
                            height="30"
                          ></span></a>
                        </li>
                        <li>
                          <a
                            href="/scorpion"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-277.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos Scorpion"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/schuberth"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-239.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos SCHUBERTH"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>

                        <li>
                          <a
                            href="/cascos-arai"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-83.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos ARAI"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/hjc"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-293.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos HJC"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /marcas destacadas -->

                  <!-- esilo de piloto -->
                  <div class="submenu__riding-styles">
                    <div class="container">
                      <span class="h3">por riding style</span>
                      <ul class="desktop">
                        <li>
                          <a href="/cascos/sport-racing">
                            <span class="mtc-link">

                              <img
                                width="60"
                                height="40"
                                src="/content/assets/menu/categories/mobile-menu__seg-racing.svg"
                                alt="Sport / Racing"
                              > <p>Sport / Racing</p>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="/cascos/touring">
                            <span class="mtc-link">
                              <img
                                width="60"
                                height="40"
                                src="/content/assets/menu/categories/mobile-menu__seg-touring.svg"
                                alt="Touring"
                              > <p>Touring</p></span>
                          </a>
                        </li>
                        <li>
                          <a href="/cascos/trail-adventure">
                            <span class="mtc-link">
                              <img
                                width="60"
                                height="40"
                                src="/content/assets/menu/categories/mobile-menu__seg-trail.svg"
                                alt="Trail / Adventure"
                              > <p>Trail / Adventure</p></span>
                          </a>
                        </li>
                        <li>
                          <a href="/cascos/scooter-urban">
                            <span class="mtc-link">
                              <img
                                width="60"
                                height="40"
                                src="/content/assets/menu/categories/mobile-menu__seg-urban.svg"
                                alt="Scooter / Urban"
                              > <p>Scooter / Urban</p></span>
                          </a>
                        </li>
                        <li>
                          <a href="/cascos/cafe-racer-vintage">
                            <span class="mtc-link">
                              <img
                                width="60"
                                height="40"
                                src="/content/assets/menu/categories/mobile-menu__seg-caferacer.svg"
                                alt="Cafe Racer / Vintage"
                              > <p>Cafe Racer / Vintage</p></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </VMenu>

  <!-- /cascos -->
</template>




