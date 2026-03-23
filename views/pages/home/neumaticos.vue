<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})

const href = props.href

const isOpen = ref(false)

function handleSubmenuClick(event) {
  // NuxtLink renders as <NuxtLink>, so close when any link is clicked
  if (event.target.closest("a")) {
    isOpen.value = false
  }
}
</script>

<template>
  <li
    id="ni_1702"
    class="l0 c6 "
    v-bind="props"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <NuxtLink
      :to="href"
      title="Ropa Casual"
    >
      <span>Neumáticos</span>
    </NuxtLink>
    <Transition name="megamenu">
      <ul
        v-show="isOpen"
        class="u1"
        style="background-color: white;"
        @click="handleSubmenuClick"
      >
        <li
          id="ni_3857"
          class="l1 c0 primary subCategories clearfix"
        >
          <div class="submenu">
            <div class="container">
              <div>
                <div class="col s12 submenu__container">
                  <div class="submenu__main-content submenu__no-border">
                    <div class="submenu__header">
                      <span class="h2">
                        <span>Neumáticos</span>
                        <NuxtLink
                          to="/ropa-casual"
                          class="mtc-link"
                        >
                          Ver todos
                        </NuxtLink>
                      </span>
                    </div>
                    <div class="submenu__content submenu__icon-buttons">
                      <NuxtLink
                        to="/neumaticos-sport-touring-para-moto"
                        class="mtc-link"
                        title="Neumáticos para motos touring"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/michelin_pilot_road4_trail_tires_detail.jpg"
                          src="/content/images/michelin_pilot_road4_trail_tires_detail.jpg"
                        >
                        <p>Touring</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/neumaticos-supersport-para-moto"
                        class="mtc-link"
                        title="Neumáticos para motos deportivas"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/pirelli_diablo_super_sport_2_detail.jpg"
                          src="/content/images/pirelli_diablo_super_sport_2_detail.jpg"
                        >
                        <p>Supersport</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/neumaticos-custom-para-moto"
                        class="mtc-link"
                        title="Nemáticos para motos custom"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/vtwin_tires.jpg"
                          src="/content/images/vtwin_tires.jpg"
                        >
                        <p>Cruiser</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/neumaticos-doble-proposito-para-moto"
                        class="mtc-link"
                        title="Neumáticos para motos adventure"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/Continental_Twinduro_TKC80_Dual_Sport_Tires_300x300.jpg"
                          src="/content/images/Continental_Twinduro_TKC80_Dual_Sport_Tires_300x300.jpg"
                        >
                        <p>Doble propósito</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/off-road-para-moto"
                        class="mtc-link"
                        title="Neumáticos para motocross"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/dirt_tires.jpg"
                          src="/content/images/dirt_tires.jpg"
                        >
                        <p>Motocross</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/neumaticos-scooter-para-moto"
                        class="mtc-link"
                        title="Neumáticos para motos scooter"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/metzeler_tire_free63_detail.jpg"
                          src="/content/images/metzeler_tire_free63_detail.jpg"
                        >
                        <p>Scooter</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/neumtaicos-de-trabajo-para-moto"
                        class="mtc-link"
                        title="Neumáticos para moto de trabajo"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/trabajo.jpg"
                          src="/content/images/trabajo.jpg"
                        >

                        <p>Trabajo</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/accesorio-neumaticos"
                        class="mtc-link"
                        title="Accesorios de neumaticos para moto"
                      >
                        <img
                          class="site-navigation__facet-image"
                          data-src="/content/images/bike_master_dial_tire_pressure_gauge_detail.jpg"
                          src="/content/images/bike_master_dial_tire_pressure_gauge_detail.jpg"
                        >
                        <p>Accesorios</p>
                      </NuxtLink>
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
                            <NuxtLink
                              to="/neumaticos-para-moto/pirelli"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-250.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Pirelli"
                              width="59"
                              height="30"
                            >
                            </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/dunlop"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-253.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Dunlop"
                              width="59"
                              height="30"
                            ></span></NuxtLink>
                          </li>

                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/bridgestone"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-254.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Bridgeston"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/maxxis"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-257.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para moto Maxxis"
                              height="30"
                            > </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/metzeler"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-251.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Metzeler"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/michelin"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-249.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Michelin"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
                          </li>

                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/avon"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-252.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Avon"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
                          </li>

                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/continental"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-246.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Continental"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/neumaticos-para-moto/mitas"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-248.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Neumáticos para motos Mitas"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
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
    </Transition>
  </li>
</template>


