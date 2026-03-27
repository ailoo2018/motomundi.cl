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
    class="l0 main-nav"
    v-bind="props"
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <NuxtLink
      :to="href"
      title="Ropa Motocross"
    >
      <span>Ropa Motocross</span>
    </NuxtLink>
    <Transition name="megamenu">
      <ul
        v-show="isOpen"
        class="u1"
        @click="handleSubmenuClick"
      >
        <li
          id="ni_3855"
          class="l1 c0 primary subCategories"
        >
          <div class="submenu">
            <div class="container">
              <div>
                <div class="col s12 submenu__container">
                  <div class="submenu__main-content">
                    <div class="submenu__header">
                      <span class="h2">
                        <span>Motocross / Enduro</span>
                        <NuxtLink
                          title="Motocross / Enduro"
                          class="mtc-link"
                          to="/equipacion-motocross"
                        >Ver todos</NuxtLink>
                      </span>
                    </div>
                    <div class="submenu__content submenu__lists">
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Cascos"
                            class="mtc-link"
                            to="/equipacion-motocross/cascos"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="0 0 140 140"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use xlink:to="/content/assets/menu/categories/blouz.svg#img-casque-cross" />
                            </svg>
                            Cascos</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Fibra"
                                class="mtc-link"
                                to="/equipacion-motocross/cascos/fibra"
                              >Fibra</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"

                                to="/equipacion-motocross/cascos/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <span
                                title="Outlet"
                                class="mtc-link"
                              >Outlet</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Cascos"
                                class="mtc-link"

                                to="/equipacion-motocross/cascos"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Equipación completa"
                            class="mtc-link"
                            to="/equipacion-motocross/equipacion-completa"
                          >
                            <img
                              src="/content/assets/categories/conjuntomx.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >

                            Equipación completa</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Equipación completa"
                                class="mtc-link"
                                to="/equipacion-motocross/equipacion-completa"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Camisetas"
                            class="mtc-link"
                            to="/equipacion-motocross/camisetas"
                          >
                            <img
                              src="/content/assets/categories/jersey.jpg"
                              title="Cascos"
                              width="25"
                              height="25"
                              alt="Cascos de motocross"
                            >


                            Jerseys</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <span
                                title="Unisex"
                                class="mtc-link"
                              >Unisex</span>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-motocross/camisetas/ventilados"
                                title="Máxima ventilación"
                                class="mtc-link"
                              >Máxima ventilación</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-motocross/camisetas/mujer"
                              >Mujer</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"
                                to="/equipacion-motocross/camisetas/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-motocross/camisetas/outlet"
                                title="Outlet"
                                class="mtc-link"
                              >Outlet</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Camisetas"
                                class="mtc-link"
                                to="/equipacion-motocross/camisetas"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>

                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Pantalones"
                            class="mtc-link"
                            to="/equipacion-motocross/pantalones"
                          >

                            <img
                              src="/content/assets/categories/pantsmx.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >

                            Pantalones
                          </NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <span
                                title="Unisex"
                                class="mtc-link"
                              >
                                Unisex</span>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-motocross/pantalones/ventilados"
                                title="Máxima ventilación"
                                class="mtc-link"
                              >Máxima ventilación</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-motocross/pantalones/mujer"
                              >Mujer</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"
                                to="/equipacion-motocross/pantalones/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-motocross/pantalones/outlet"
                                title="Outlet"
                                class="mtc-link"
                              >Outlet</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Pantalones"
                                class="mtc-link"
                                to="/equipacion-motocross/pantalones"
                              >Ver todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Botas"
                            class="mtc-link"
                            to="/equipacion-motocross/botas"
                          >

                            <img
                              src="/content/assets/categories/botamx.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >


                            Botas</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <span
                                title="Unisex"
                                class="mtc-link"
                              >Unisex</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-motocross/botas/mujer"
                              >Mujer</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"
                                to="/equipacion-motocross/botas/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-motocross/botas/outlet"
                                title="Outlet"
                                class="mtc-link"
                              >Outlet</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Botas"
                                class="mtc-link"
                                to="/equipacion-motocross/botas"
                              >Ver todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Guantes"
                            class="mtc-link"
                            to="/equipacion-motocross/guantes"
                          >

                            <img
                              src="/content/assets/categories/glovesmx.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >


                            Guantes</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <span
                                title="Unisex"
                                class="mtc-link"
                              >Unisex</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"

                                to="/equipacion-motocross/guantes/mujer"
                              >Mujer</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"
                                to="/equipacion-motocross/guantes/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-motocross/guantes/outlet"
                                title="Outlet"
                                class="mtc-link"
                              >Outlet</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Guantes"
                                class="mtc-link"
                                to="/equipacion-motocross/guantes"
                              >Ver todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Gafas"
                            class="mtc-link"
                            to="/equipacion-motocross/gafas"
                          >

                            <svg
                              class="svg-icon"
                              viewBox="0 0 210 210"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use xlink:to="/content/assets/menu/categories/blouz.svg#img-masque-cross" />
                            </svg>

                            Antiparras</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <span
                                title="Unisex"
                                class="mtc-link"
                              >Unisex</span>
                            </li>
                            <li>
                              <span
                                title="Para llevar gafas debajo"
                                class="mtc-link"
                              >Para llevar gafas debajo</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"
                                to="/equipacion-motocross/gafas/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Gafas"
                                class="mtc-link"
                                to="/equipacion-motocross/gafas"
                              >Ver todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Protecciones"
                            class="mtc-link"
                            to="/equipacion-motocross/protecciones"
                          >

                            <img
                              src="/content/assets/categories/jofa.jpg"
                              title="Cascos"
                              width="25"
                              height="25"
                              alt="Cascos de motocross"
                            >

                            Protecciones</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Integrales"
                                class="mtc-link"
                                to="/equipacion-motocross/protecciones/protecciones-integrales"
                              >Integrales</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Petos"
                                class="mtc-link"
                                to="/equipacion-motocross/protecciones/petos"
                              >Petos</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Rodilleras"
                                class="mtc-link"
                                to="/equipacion-motocross/protecciones/rodilleras"
                              >Rodilleras</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Coderas"
                                class="mtc-link"
                                to="/equipacion-motocross/protecciones/coderas"
                              >Coderas</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Collarines"
                                class="mtc-link"
                                to="/equipacion-motocross/protecciones/collarines"
                              >Collarines</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"
                                to="/equipacion-motocross/protecciones/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Protecciones"
                                class="mtc-link"
                                to="/equipacion-motocross/protecciones"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Chaquetas"
                            class="mtc-link"
                            to="/equipacion-motocross/chaquetas"
                          >

                            <img
                              src="/content/assets/categories/jacketmx.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >
                            Chaquetas</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Compatibles con collarín"
                                class="mtc-link"
                                to="/equipacion-motocross/chaquetas/compatibles-con-collarin"
                              >Compatibles
                                con collarín</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Impermeables"
                                class="mtc-link"
                                to="/equipacion-motocross/chaquetas/impermeables"
                              >Impermeables</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mangas desmontables"
                                class="mtc-link"
                                to="/equipacion-motocross/chaquetas/mangas-desmontables"
                              >Mangas
                                desmontables</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Chaquetas"
                                class="mtc-link"
                                to="/equipacion-motocross/chaquetas"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Calcetines"
                            class="mtc-link"
                            to="/equipacion-motocross/calcetines"
                          >
                            <img
                              src="/content/assets/categories/socks.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >

                            Calcetines</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <span
                                title="Unisex"
                                class="mtc-link"
                              >Unisex</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Junior"
                                class="mtc-link"
                                to="/equipacion-motocross/calcetines/nino"
                              >Junior</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Calcetines"
                                class="mtc-link"
                                to="/equipacion-motocross/calcetines"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Bolsas"
                            class="mtc-link"
                            to="/equipacion-motocross/bolsas"
                          >
                            <img
                              src="/content/assets/categories/bagmx.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >
                            Bolsas</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                to="/equipacion-motocross/bolsas/mochilas/hidratacion  "
                                title="Mochilas hidratación"
                                class="mtc-link"
                              >Mochilas hidratación</NuxtLink>
                            </li>
                            <li>
                              <span
                                title="Transporte equipación"
                                class="mtc-link"
                              >Transporte equipación</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Riñoneras"
                                class="mtc-link"
                                to="/equipacion-motocross/bolsas/rinoneras"
                              >Riñoneras</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Bolsas"
                                class="mtc-link"
                                to="/equipacion-motocross/bolsas"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Complementos"
                            class="mtc-link"
                            to="/equipacion-motocross/complementos"
                          >

                            <img
                              src="/content/assets/categories/standmx.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >


                            Complementos</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Complementos"
                                class="mtc-link"
                                to="/equipacion-motocross/complementos"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Recambios"
                            class="mtc-link"
                            to="/equipacion-motocross/recambios"
                          >
                            <img
                              src="/content/assets/categories/tearoff.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >
                            Recambios</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Botas"
                                class="mtc-link"
                                to="/equipacion-motocross/recambios/botas"
                              >Botas</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Gafas"
                                class="mtc-link"
                                to="/equipacion-motocross/recambios/gafas"
                              >Gafas</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Recambios"
                                class="mtc-link"
                                to="/equipacion-motocross/recambios"
                              >Ver todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Térmicos"
                            class="mtc-link"
                            to="/equipacion-motocross/primeras-capas"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="0 0 210 210"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use xlink:to="/content/assets/menu/categories/blouz.svg#img-protection-froid-et-pluie" />
                            </svg>

                            Térmicos</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Para verano"
                                class="mtc-link"
                                to="/equipacion-motocross/primeras-capas/solo-verano"
                              >Para
                                verano</NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Térmicos"
                                class="mtc-link"
                                to="/equipacion-motocross/primeras-capas"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li class="double-menu__title">
                          <NuxtLink
                            title="Impermeables"
                            class="mtc-link"
                            to="/equipacion-motocross/impermeables"
                          >

                            <svg
                              class="svg-icon"
                              viewBox="0 0 210 210"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use xlink:to="/content/assets/menu/categories/blouz.svg#img-protection-froid-et-pluie" />
                            </svg>

                            Impermeables</NuxtLink>
                          <ul class="double-menu__childs">
                            <li>
                              <NuxtLink
                                title="Impermeables"
                                class="mtc-link"
                                to="/equipacion-motocross/impermeables"
                              >Ver
                                todos</NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
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
                              to="/equipacion-motocross/alpinestars"
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
                              to="/equipacion-motocross/fox"
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
                              to="/equipacion-motocross/leatt"
                              class="mtc-link"
                            ><span lazy="true"><img
                              src="/content/assets/brands/brand-126.png"
                              class="cdn-img v-lazy-image v-lazy-image-loaded"
                              alt="Cascos AGV"
                              width="59"
                              height="30"
                            ></span></NuxtLink>
                          </li>
                          <li>
                            <NuxtLink
                              to="/equipacion-motocross/revit"
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
                              to="/equipacion-motocross/thor"
                              class="mtc-link"
                            >
                              <span lazy="true"><img
                                src="/content/assets/brands/brand-421.png"
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
  <!-- ropa offroad -->

  <!-- /ropa offraod -->
</template>


