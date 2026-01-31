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

    content-class="centered-mega-menu"
  >
    <template #activator="{ props }">
      <li
        id="ni_1702"
        class="l0 c6 "
        v-bind="props"
      >
        <a
          :href="href"
          title="Ropa Casual"
        >
          <span>Ropa Casual</span>
        </a>

      </li>
    </template>
    <ul class="u1 main-nav">
      <li
        id="ni_3858"
        class="l1 c0 primary subCategories clearfix"
        style="display:block;padding-left:6px;padding-top:20px;"
      >
        <div class="submenu">
          <div class="container">
            <div class="row">
              <div class="col s12 submenu__container">
                <div class="submenu__main-content submenu__no-border">
                  <div class="submenu__header">
                          <span class="h2">
                            <span>Ropa casual</span>
                            <a
                              href="/ropa-casual"
                              class="mtc-link"
                            >
                              Ver todos
                            </a>
                          </span>
                  </div>
                  <div
                    id="5"
                    class="submenu__content submenu__icon-buttons"
                    parent-menu-title="Ropa casual"
                    template="icons"
                    icon="/assets/menu/categories/133-moto-ropa-casual.svg"
                    order="3"
                    link="/ropa-casual"
                    identifier="5"
                  >
                    <a
                      href="/adhesivos"
                      class="mtc-link"
                      title="Adhesivos"
                    ><img
                      src="/content/assets/menu/categories/43-moto-casual-adhesivos.svg"
                      title="Adhesivos"
                      width="40"
                      height="40"
                      alt="Adhesivos"
                    >
                      <p>Adhesivos</p>
                    </a>
                    <a
                      href="/mochilas"
                      class="mtc-link"
                      title="Bolsas"
                    ><img
                      src="/content/assets/menu/categories/45-moto-casual-bolsas.svg"
                      title="Bolsas"
                      width="40"
                      height="40"
                      alt="Bolsas"
                    >
                      <p>Bolsas</p>
                    </a>
                    <a
                      href="/poleras-para-moto"
                      class="mtc-link"
                      title="Camisetas"
                    ><img
                      src="/content/assets/menu/categories/46-moto-casual-camisetas.svg"
                      title="Camisetas"
                      width="40"
                      height="40"
                      alt="Camisetas"
                    >
                      <p>Camisetas</p></a>
                    <a
                      href="/chaquetas-casual"
                      class="mtc-link"
                      title="Chalecos"
                    ><img
                      src="/content/assets/menu/categories/47-moto-casual-chalecos.svg"
                      title="Chalecos"
                      width="40"
                      height="40"
                      alt="Chalecos"
                    >
                      <p>Chalecos</p>
                    </a>
                    <a
                      href="/chaquetas-casual"
                      class="mtc-link"
                      title="Chaquetas"
                    ><img
                      src="/content/assets/menu/categories/48-moto-casual-chaquetas.svg"
                      title="Chaquetas"
                      width="40"
                      height="40"
                      alt="Chaquetas"
                    >
                      <p>Chaquetas</p>
                    </a>
                    <a
                      href="/complementos-casual"
                      class="mtc-link"
                      title="Complementos"
                    ><img
                      src="/content/assets/menu/categories/49-moto-casual-complementos.svg"
                      title="Complementos"
                      width="40"
                      height="40"
                      alt="Complementos"
                    >
                      <p>Complementos</p>
                    </a>
                    <a
                      href="/lentes-casual"
                      class="mtc-link"
                      title="Gafas de sol"
                    ><img
                      src="/content/assets/menu/categories/50-moto-casual-gafas-sol.svg"
                      title="Gafas de sol"
                      width="40"
                      height="40"
                      alt="Gafas de sol"
                    >
                      <p>Gafas de sol</p>
                    </a>
                    <a
                      href="/jockey-para-moto"
                      class="mtc-link"
                      title="Jockeys"
                    ><img
                      src="/content/assets/menu/categories/51-moto-casual-gorras.svg"
                      title="Jockeys"
                      width="40"
                      height="40"
                      alt="Gorras"
                    >
                      <p>Jockeys</p>
                    </a>
                    <a
                      href="/gorros"
                      class="mtc-link"
                      title="Gorros"
                    ><img
                      src="/content/assets/menu/categories/52-moto-casual-gorros.svg"
                      title="Gorros"
                      width="40"
                      height="40"
                      alt="Gorros"
                    >
                      <p>Gorros</p></a>
                    <a
                      href="/llaveros"
                      class="mtc-link"
                      title="Llaveros"
                    ><img
                      src="/content/assets/menu/categories/53-moto-casual-llaveros.svg"
                      title="Llaveros"
                      width="40"
                      height="40"
                      alt="Llaveros"
                    >
                      <p>Llaveros</p></a>
                    <a
                      href="/pantalones-lifestyle"
                      class="mtc-link"
                      title="Pantalones"
                    ><img
                      src="/content/assets/menu/categories/55-moto-casual-bermudas.svg"
                      title="Pantalones"
                      width="40"
                      height="40"
                      alt="Pantalones"
                    >
                      <p>Pantalones</p></a>
                    <a
                      href="/sweaters-y-polerones"
                      class="mtc-link"
                      title="Sudaderas"
                    ><img
                      src="/content/assets/menu/categories/57-moto-casual-sudaderas.svg"
                      title="Sudaderas"
                      width="40"
                      height="40"
                      alt="Sudaderas"
                    >
                      <p>Sudaderas</p></a>
                    <a
                      href="/zapatillas-para-moto"
                      class="mtc-link"
                      title="Zapatillas"
                    ><img
                      src="/content/assets/menu/categories/60-moto-casual-zapatillas.svg"
                      title="Zapatillas"
                      width="40"
                      height="40"
                      alt="Zapatillas"
                    >
                      <p>Zapatillas</p>
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
                            href="/ropa-casual/alpinestars"
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
                            href="/ropa-casual/fox"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-91.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos SHOEI"
                            width="59"
                            height="30"
                          ></span></a>
                        </li>

                        <li>
                          <a
                            href="/ropa-casual/revit"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-118.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos SCHUBERTH"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/ropa-casual/dainese"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-450.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos SCHUBERTH"
                            width="59"
                            height="30"
                          > </span></a>
                        </li>
                        <li>
                          <a
                            href="/ropa-casual/fuel"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-380.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Equipación Offroad Thor"
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
  <!-- ropa casual -->



</template>

<style scoped lang="scss">

</style>
