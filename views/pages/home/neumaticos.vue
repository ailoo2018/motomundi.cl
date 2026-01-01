<script setup lang="ts">

const props = defineProps({
  href: {
    type: String,
    required: true
  }
})
const href = props.href

</script>

<template>
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
        id="ni_1702"
        class="l0 c6 "
        v-bind="props"
      >
        <a :href="href"
          title="Ropa Casual"
        >
          <span>Neumáticos</span>
        </a>

      </li>
    </template>
    <ul class="u1 main-nav">
      <li
        id="ni_3857"
        class="l1 c0 primary subCategories clearfix"
      >
        <div class="submenu">
          <div class="container">
            <div class="row">
              <div class="col s12 submenu__container">
                <div class="submenu__main-content submenu__no-border">
                  <div class="submenu__header">
                          <span class="h2">
                            <span>Neumáticos</span>
                            <a
                              href="/ropa-casual"
                              class="mtc-link"
                            >
                              Ver todos
                            </a>
                          </span>
                  </div>
                  <div class="submenu__content submenu__icon-buttons">
                    <a
                      href="/neumaticos-sport-touring-para-moto"
                      class="mtc-link"
                      title="Neumáticos para motos touring"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/michelin_pilot_road4_trail_tires_detail.jpg"
                        src="/content/images/michelin_pilot_road4_trail_tires_detail.jpg"
                      >
                      <p>Touring</p>
                    </a>
                    <a
                      href="/neumaticos-supersport-para-moto"
                      class="mtc-link"
                      title="Neumáticos para motos deportivas"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/pirelli_diablo_super_sport_2_detail.jpg"
                        src="/content/images/pirelli_diablo_super_sport_2_detail.jpg"
                      >
                      <p>Supersport</p>
                    </a>
                    <a
                      href="/neumaticos-custom-para-moto"
                      class="mtc-link"
                      title="Nemáticos para motos custom"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/vtwin_tires.jpg"
                        src="/content/images/vtwin_tires.jpg"
                      >
                      <p>Cruiser</p>
                    </a>
                    <a
                      href="/neumaticos-doble-proposito-para-moto"
                      class="mtc-link"
                      title="Neumáticos para motos adventure"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/Continental_Twinduro_TKC80_Dual_Sport_Tires_300x300.jpg"
                        src="/content/images/Continental_Twinduro_TKC80_Dual_Sport_Tires_300x300.jpg"
                      >
                      <p>Doble propósito</p>
                    </a>
                    <a
                      href="/off-road-para-moto"
                      class="mtc-link"
                      title="Neumáticos para motocross"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/dirt_tires.jpg"
                        src="/content/images/dirt_tires.jpg"
                      >
                      <p>Motocross</p>
                    </a>
                    <a
                      href="/neumaticos-scooter-para-moto"
                      class="mtc-link"
                      title="Neumáticos para motos scooter"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/metzeler_tire_free63_detail.jpg"
                        src="/content/images/metzeler_tire_free63_detail.jpg"
                      >
                      <p>Scooter</p>
                    </a>
                    <a
                      href="/neumtaicos-de-trabajo-para-moto"
                      class="mtc-link"
                      title="Neumáticos para moto de trabajo"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/trabajo.jpg"
                        src="/content/images/trabajo.jpg"
                      >

                      <p>Trabajo</p>
                    </a>
                    <a
                      href="/accesorio-neumaticos"
                      class="mtc-link"
                      title="Accesorios de neumaticos para moto"
                    >
                      <img
                        class="site-navigation__facet-image"
                        data-src="/content/images/bike_master_dial_tire_pressure_gauge_detail.jpg"
                        src="/content/images/bike_master_dial_tire_pressure_gauge_detail.jpg"
                      >
                      <p>Accesorios</p>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col s12 submenu__extra-nav">
                <div
                  class="extra__container"
                  style="background: #f5f5f5"
                >
                  <!-- marcas destacadas -->
                  <div class="extra__brands">
                    <div class="container">
                      <span class="h3">Marcas destacadas</span>
                      <ul>
                        <li>
                          <a
                            href="/neumaticos-para-moto/pirelli"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-250.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Pirelli"
                            width="59"
                            height="30"
                          >
                                </span></a>
                        </li>
                        <li>
                          <a
                            href="/neumaticos-para-moto/dunlop"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-253.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Dunlop"
                            width="59"
                            height="30"
                          ></span></a>
                        </li>

                        <li>
                          <a
                            href="/neumaticos-para-moto/bridgestone"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-254.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Bridgeston"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/neumaticos-para-moto/maxxis"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-257.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para moto Maxxis"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/neumaticos-para-moto/metzeler"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-251.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Metzeler"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/neumaticos-para-moto/michelin"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-249.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Michelin"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>

                        <li>
                          <a
                            href="/neumaticos-para-moto/avon"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-252.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Avon"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>

                        <li>
                          <a
                            href="/neumaticos-para-moto/continental"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-246.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Continental"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/neumaticos-para-moto/mitas"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-248.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Neumáticos para motos Mitas"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /marcas destacadas -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </VMenu>


</template>

<style scoped lang="scss">

</style>
