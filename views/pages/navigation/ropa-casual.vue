<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})

const href = props.href
const isOpen = ref(false)
let hoverTimeout = null

function openMenu() {
  hoverTimeout = setTimeout(() => {
    isOpen.value = true
  }, 150) // adjust delay in ms to taste
}

function closeMenu() {
  clearTimeout(hoverTimeout)
  isOpen.value = false
}

function handleSubmenuClick(event) {
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
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <NuxtLink
      :to="href"
      title="Ropa Casual"
    >
      <span>Ropa Casual</span>
    </NuxtLink>
    <Transition name="megamenu">
      <ul
        v-show="isOpen"
        class="u1"
        @click="handleSubmenuClick"
      >
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
                        <NuxtLink
                          to="/ropa-casual"
                          class="mtc-link"
                        >
                          Ver todos
                        </NuxtLink>
                      </span>
                    </div>
                    <div
                      id="5"
                      class="submenu__content submenu__icon-buttons"
                      parent-menu-title="Ropa casual"
                      template="icons"
                      order="3"
                      link="/ropa-casual"
                      identifier="5"
                    >
                      <NuxtLink
                        to="/adhesivos"
                        class="mtc-link"
                        title="Adhesivos"
                      >
                        <img
                          src="/content/assets/categories/stickers.jpg"
                          title="Adhesivos"
                          width="40"
                          height="40"
                          alt="Adhesivos"
                        >
                        <p>Adhesivos</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/mochilas"
                        class="mtc-link"
                        title="Bolsas"
                      ><img
                         src="/content/assets/categories/backpack.jpg"
                         title="Bolsas"
                         width="40"
                         height="40"
                         alt="Bolsas"
                       >
                        <p>Bolsas</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/poleras-para-moto"

                        class="mtc-link"
                        title="Camisetas"
                      >
                        <img
                          src="/content/assets/categories/tshirt.jpg"
                          title="Camiseta"
                          width="40"
                          height="40"
                          alt="Camiseta"
                        >
                        <p>Camisetas</p></NuxtLink>
                      <NuxtLink
                        to="/chaquetas-casual"

                        class="mtc-link"
                        title="Chalecos"
                      >

                        <img
                          src="/content/assets/categories/vest.jpg"
                          title="Gilet"
                          width="40"
                          height="40"
                          alt="Gilet"
                        >
                        <p>Gilet</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/chaquetas-casual"

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
                      </NuxtLink>
                      <NuxtLink
                        to="/complementos-casual"

                        class="mtc-link"
                        title="Complementos"
                      >
                        <img
                          src="/content/assets/categories/scarf.jpg"
                          title="Complementos"
                          width="40"
                          height="40"
                          alt="Complementos"
                        >
                        <p>Complementos</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/lentes-casual"

                        class="mtc-link"
                        title="Gafas de sol"
                      >
                        <img
                          src="/content/assets/categories/lentes.jpg"
                          title="Lentes de sol"
                          width="40"
                          height="40"
                          alt="Lentes de sol"
                        >
                        <p>Lentes</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/jockey-para-moto"
                        class="mtc-link"
                        title="Jockeys"
                      >
                        <img
                          src="/content/assets/categories/jockey.jpg"
                          title="Jockey"
                          width="40"
                          height="40"
                          alt="Jockey"
                        >
                        <p>Jockeys</p>
                      </NuxtLink>
                      <NuxtLink
                        to="/gorros"
                        class="mtc-link"
                        title="Gorros"
                      ><img

                         src="/content/assets/categories/gorros.jpg"
                         title="Gorros"
                         width="40"
                         height="40"
                         alt="Gorros"
                       >
                        <p>Gorros</p></NuxtLink>
                      <NuxtLink
                        to="/llaveros"

                        class="mtc-link"
                        title="Llaveros"
                      ><img

                         src="/content/assets/categories/llavero.jpg"
                         title="Llaveros"
                         width="40"
                         height="40"
                         alt="Llaveros"
                       >
                        <p>Llaveros</p></NuxtLink>
                      <NuxtLink
                        to="/pantalones-lifestyle"
                        class="mtc-link"
                        title="Pantalones"
                      >
                        <img
                          src="/content/assets/categories/shorts.jpg"
                          title="Pantalones"
                          width="40"
                          height="40"
                          alt="Pantalones"
                        >
                        <p>Pantalones</p></NuxtLink>
                      <NuxtLink
                        to="/sweaters-y-polerones"
                        class="mtc-link"
                        title="Sudaderas"
                      ><img
                         src="/content/assets/categories/poleron.jpg"
                         title="Sudaderas"
                         width="40"
                         height="40"
                         alt="Sudaderas"
                       >
                        <p>Polerones</p></NuxtLink>
                      <NuxtLink
                        to="/zapatillas-para-moto"

                        class="mtc-link"
                        title="Zapatillas"
                      ><img

                         src="/content/assets/categories/sneakers.jpg"
                         title="Zapatillas"
                         width="40"
                         height="40"
                         alt="Zapatillas"
                       >
                        <p>Zapatillas</p>
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
                              to="/ropa-casual/alpinestars"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-77.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Cascos ALPINESTARS"
                              width="59"
                              height="30"
                            >
                            </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/ropa-casual/fox"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-91.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Cascos SHOEI"
                              width="59"
                              height="30"
                            ></span></NuxtLink>
                          </li>

                          <li>
                            <NuxtLink
                              to="/ropa-casual/revit"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-118.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Cascos SCHUBERTH"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/ropa-casual/dainese"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-450.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Cascos SCHUBERTH"
                              width="59"
                              height="30"
                            > </span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/ropa-casual/fuel"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-380.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Equipación Offroad Thor"
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

  <!-- ropa casual -->
</template>


