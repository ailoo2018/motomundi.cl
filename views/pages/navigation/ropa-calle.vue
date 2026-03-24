<script setup>
import RidingStylesMenu from "@/views/pages/navigation/riding-styles-menu.vue"

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})

const href = props.href

const isOpen = ref(false)

function handleSubmenuClick(event) {
  // NuxtLink renders as <a>, so close when any link is clicked
  if (event.target.closest("a")) {
    isOpen.value = false
  }
}

</script>


<template>
  <li
    class="l0  main-nav"
    v-bind="props"
    @mouseenter="isOpen = true"

  >
    <NuxtLink
      :to="href"
      title="Ropa de calle para moto"
    >
      <span>Ropa Calle </span>
    </NuxtLink>
    <Transition name="megamenu">
      <ul
        v-show="isOpen"
        class="u1"
        @click="handleSubmenuClick"
      >
        <li class="l1 c0 primary subCategories">
          <div class="submenu">
            <div class="container">
              <div class="rowaa">
                <div class="col s12 submenu__container">
                  <div class="submenu__main-content">
                    <div class="submenu__header">
                      <span class="h2">
                        <span>Equipación carretera</span>
                        <NuxtLink
                          class="mtc-link nuxt-link-active nuxt-link-exact-active"
                          to="/equipacion-moto-carretera"
                        >Ver todos</NuxtLink>
                      </span>
                    </div>
                    <div class="submenu__content submenu__lists">
                      <ul>
                        <li>
                          <NuxtLink
                            title="Chaquetas"
                            class="mtc-link"
                            to="/chaquetas-para-moto"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="-10 0 120 100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                href="/content/assets/menu/categories/blouz.svg#img-blouson-et-veste"
                                xlink:href="/content/assets/menu/categories/blouz.svg#img-blouson-et-veste"
                              />
                            </svg>

                            Chaquetas
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Airbag"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/chaquetas/airbag-incorporado"
                              >
                                Airbag
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Forro desmontable"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/chaquetas/forro-termico-desmontable"
                              >
                                Forro desmontable
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Cuero"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/chaquetas/cuero"
                              >
                                Cuero
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Impermeables"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/chaquetas/impermeables"
                              >
                                Impermeables
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/chaquetas/mujer"
                              >
                                Mujer
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Outlet"
                                class="mtc-link"
                                to="/chaquetas/outlet"
                              >
                                Outlet
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Chaquetas"
                                class="mtc-link"
                                to="/chaquetas-para-moto"
                              >
                                Ver todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Pantalones"
                            class="mtc-link"
                            to="/pantalones-para-moto"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="-10 0 120 110"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-pantalon-moto" />
                            </svg>

                            Pantalones
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Forro desmontable"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/pantalones/forro-termico-desmontable"
                              >
                                Forro
                                desmontable
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Jeans"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/pantalones/jeans"
                              >
                                Jeans
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Cuero"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/pantalones/cuero"
                              >
                                Cuero
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Impermeables"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/pantalones/impermeables"
                              >
                                Impermeables
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/pantalones/mujer"
                              >
                                Mujer
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Outlet"
                                class="mtc-link"
                                to="/pantalones/outlet"
                              >
                                Outlet
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Pantalones"
                                class="mtc-link"
                                to="/pantalones-para-moto"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Guantes"
                            class="mtc-link"
                            to="/guantes-para-moto"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="-10 0 120 110"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-gants-moto" />
                            </svg>
                            Guantes
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Impermeables"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/guantes/impermeables"
                              >
                                Impermeables
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Para Verano"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/guantes/solo-verano"
                              >
                                Para
                                Verano
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Calefactables"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/guantes/calefactables"
                              >
                                Calefactables
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Sport / Racing"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/guantes/sport-racing"
                              >
                                Sport
                                / Racing
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/guantes/mujer"
                              >
                                Mujer
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Outlet"
                                class="mtc-link"
                                to="/guantes/outlet"
                              >
                                Outlet
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Guantes"
                                class="mtc-link"
                                to="/guantes-para-moto"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Equipación completa"
                            class="mtc-link"
                            to="/equipacion-moto-carretera/equipacion-completa"
                          >
                            <img
                              src="/content/assets/categories/packs-chaqueta-pantalon.svg"
                              title="Equipación completa"
                              alt="Equipación completa"
                            >
                            Equipación completa
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Equipación completa"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/equipacion-completa"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Botas"
                            class="mtc-link"
                            to="/botas-para-moto"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="-10 0 120 110"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-bottes-et-chaussures" />
                            </svg>
                            Botas
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Touring"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/botas/touring"
                              >
                                Touring
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Scooter / Urbanas"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/botas/scooter-urban"
                              >
                                Scooter
                                / Urbanas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Sport / Racing"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/botas/sport-racing"
                              >
                                Sport
                                / Racing
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/botas/mujer"
                              >
                                Mujer
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Outlet"
                                class="mtc-link"
                                to="/botas/outlet"
                              >
                                Outlet
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Botas"
                                class="mtc-link"
                                to="/botas-para-moto"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Trajes / Monos"
                            class="mtc-link"
                            to="/trajes-para-moto"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="-10 0 120 110"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-combinaison-de-piste" />
                            </svg>

                            Trajes / Monos
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="1 Pieza"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/trajes-y-monos/1-pieza"
                              >
                                1
                                Pieza
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="2 Piezas"
                                class="mtc-link"

                                to="/equipacion-moto-carretera/trajes-y-monos/2-piezas"
                              >
                                2
                                Piezas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Mujer"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/trajes-y-monos/mujer"
                              >
                                Mujer
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Outlet"
                                class="mtc-link"
                                to="/trajes-y-monos/outlet"
                              >
                                Outlet
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Trajes / Monos"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/trajes-y-monos"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Electrónica"
                            class="mtc-link"
                            to="/equipacion-moto-carretera/electronica"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="0 0 410 410"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-gps-et-traceur-gps " />
                            </svg>

                            Electrónica
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Intercomunicadores"
                                class="mtc-link"
                                to="/intercomunicadores"
                              >
                                Intercomunicadores
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="GPS"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/electronica/gps"
                              >
                                GPS
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Electrónica"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/electronica"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Motoescuela"
                            class="mtc-link"
                            to="/pack-motoescuela"
                          >
                            <img
                              src="/content/assets/categories/packs-motoescuela.svg"
                              title="Motoescuela"
                              alt="Motoescuela"
                            > Motoescuela
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Motoescuela"
                                class="mtc-link"
                                to="/pack-motoescuela.html"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Protecciones"
                            class="mtc-link"
                            to="/protecciones-para-motociclistas"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="-10 0 120 110"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-protections-cross" />
                            </svg>

                            Protecciones
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Espalderas"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/protecciones/espalderas"
                              >
                                Espalderas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Airbags"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/protecciones/airbags"
                              >
                                Airbags
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Fajas"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/protecciones/fajas"
                              >
                                Fajas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Protecciones"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/protecciones"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Impermeables"
                            class="mtc-link"
                            to="/ropa-lluvia"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="0 0 210 210"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-protection-froid-et-pluie" />
                            </svg>

                            Impermeables
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Chaquetas"
                                class="mtc-link"

                                to="/equipacion-moto-carretera/impermeables/chaquetas"
                              >
                                Chaquetas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Pantalones"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/impermeables/pantalones"
                              >
                                Pantalones
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Cubreguantes"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/impermeables/cubreguantes"
                              >
                                Cubreguantes
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Cubrebotas"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/impermeables/cubrebotas"
                              >
                                Cubrebotas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-moto-carretera/impermeables/conjuntos"
                                title="Conjuntos"
                                class="mtc-link"
                              >
                                Conjuntos
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Impermeables"
                                class="mtc-link"
                                to="/ropa-lluvia"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Airbags"
                            class="mtc-link"
                            to="/airbags"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="0 0 420 420"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-airbag" />
                            </svg>
                            Airbags
                          </NuxtLink>
                        </li>

                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                to="/equipacion-moto-carretera/airbags/chaquetas"
                                title="Chaquetas"
                                class="mtc-link"
                              >
                                Chaquetas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-moto-carretera/airbags/trajes-monos"
                                title="Trajes / Monos"
                                class="mtc-link"
                              >
                                Trajes / Monos
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/equipacion-moto-carretera/airbags/chalecos"
                                title="Chalecos"
                                class="mtc-link"
                              >
                                Chalecos
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                to="/airbags"
                                title="Airbags"
                                class="mtc-link"
                              >
                                Ver todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Térmicos"
                            class="mtc-link"
                            to="/equipacion-moto-carretera/primeras-capas"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="-0 0 210 210"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-protection-froid-et-pluie" />
                            </svg>
                            Primeras Capas
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Cubrecuellos"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/primeras-capas/cubrecuellos"
                              >
                                Cubrecuellos
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Sotomonos"
                                class="mtc-link"

                                to="/equipacion-moto-carretera/primeras-capas/sotomono"
                              >
                                Sotomonos
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Sotocascos"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/primeras-capas/sotocascos"
                              >
                                Sotocascos
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Camisetas"
                                class="mtc-link"

                                to="/equipacion-moto-carretera/primeras-capas/camisetas"
                              >
                                Camisetas
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Térmicos"
                                class="mtc-link"

                                to="/equipacion-moto-carretera/primeras-capas"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Bolsas"
                            class="mtc-link"
                            to="/equipacion-moto-carretera/bolsas"
                          >
                            <svg
                              class="svg-icon"
                              viewBox="0 0 120 120"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="/content/assets/menu/categories/blouz.svg#img-sac-moto" />
                            </svg>
                            Bolsas
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Mochilas"
                                class="mtc-link"

                                to="/equipacion-moto-carretera/bolsas/mochilas"
                              >
                                Mochilas
                              </NuxtLink>
                            </li>
                            <li>
                              <span
                                title="Otras"
                                class="mtc-link"
                              >
                                Otras</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Bolsas"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/bolsas"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Complementos"
                            class="mtc-link"
                            to="/equipacion-moto-carretera/complementos"
                          >
                            <img
                              src="/content/assets/categories/16-moto-equipacion-carretera-complementos.svg"
                              title="Complementos"
                              alt="Complementos de moto"
                            >
                            Complementos
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <span
                                title="Alta visibilidad"
                                class="mtc-link"
                              >Alta visibilidad</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Calcetines"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/calcetines"
                              >
                                Calcetines
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Complementos"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/complementos"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Deslizaderas"
                            class="mtc-link"
                            to="/equipacion-moto-carretera/deslizaderas"
                          >
                            <img
                              src="/content/assets/categories/sliders.jpg"
                              title="Deslizadores"
                              alt="Deslizadores"
                            >


                            Deslizaderas
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <span
                                title="Botas"
                                class="mtc-link"
                              >
                                Botas
                              </span>
                            </li>
                            <li>
                              <span
                                title="Trajes / Monos"
                                class="mtc-link"
                              >Trajes / Monos</span>
                            </li>
                            <li>
                              <NuxtLink
                                title="Deslizaderas"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/deslizaderas"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <NuxtLink
                            title="Limpieza"
                            class="mtc-link"
                            to="/equipacion-moto-carretera/limpieza"
                          >
                            <img
                              src="/content/assets/categories/limpieza.jpg"
                              title="Limpieza"
                              alt="Limpieza"
                            >

                            Limpieza
                          </NuxtLink>
                        </li>
                        <li>
                          <ul>
                            <li>
                              <NuxtLink
                                title="Para cascos"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/limpieza/para-cascos"
                              >
                                Para
                                cascos
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Para ropa"
                                class="mtc-link"
                                to="/equipacion-moto-carretera/limpieza/para-ropa"
                              >
                                Para ropa
                              </NuxtLink>
                            </li>
                            <li>
                              <NuxtLink
                                title="Limpieza"
                                class="mtc-link"

                                to="/equipacion-moto-carretera/limpieza"
                              >
                                Ver
                                todos
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col s12 submenu__extra-nav">
                  <div class="extra__container">
                    <div class="submenu__riding-styles">
                      <div class="container">
                        <span class="h3">por estilo moto</span>
                        <ul class="desktop">
                          <li>
                            <span class="mtc-link">
                              <svg
                                class="svg-icon"
                                viewBox="0 0 190 110"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <use xlink:to="/content/assets/menu/categories/blouz.svg#img-roadster-sportif" />
                              </svg>
                              <p>Sport / Racing</p>
                            </span>
                          </li>
                          <li>
                            <span class="mtc-link">
                              <svg
                                class="svg-icon"
                                viewBox="0 0 190 110"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <use xlink:to="/content/assets/menu/categories/blouz.svg#img-vintage-classic" />
                              </svg>
                              <p>Touring</p></span>
                          </li>
                          <li>
                            <span class="mtc-link">
                              <svg
                                class="svg-icon"
                                viewBox="0 0 190 110"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <use xlink:to="/content/assets/menu/categories/blouz.svg#img-touring-adventure" />
                              </svg>
                              <p>Trail / Adventure</p>
                            </span>
                          </li>
                          <li>
                            <span class="mtc-link">
                              <svg
                                class="svg-icon"
                                viewBox="0 0 190 110"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <use xlink:to="/content/assets/menu/categories/blouz.svg#img-urbain-scooter" />
                              </svg>
                              <p>Scooter / Urban</p>
                            </span>
                          </li>
                          <li>
                            <span class="mtc-link">
                              <svg
                                class="svg-icon"
                                viewBox="0 0 190 110"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <use xlink:to="/content/assets/menu/categories/blouz.svg#img-vintage-classic" />
                              </svg>
                              <p>Cafe Racer / Vintage</p>
                            </span>
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
    </Transition>
  </li>

  <!-- ropa calle -->

  <!-- /ropa calle -->
</template>

<style  lang="scss">
#nav .submenu__content.submenu__lists > ul > li:first-child > .mtc-link > .svg-icon, #nav .submenu__content.submenu__lists > ul > li:first-child > a > .svg-icon {
  width: 45px;
  height: 45px;
  height: auto;
  left: -55px;
  position: absolute;
  top: 0;
  width: 45px;
}

#nav .submenu__content.submenu__lists > ul {
  flex: 0 0 25%;
  margin-bottom: 30px;
  margin-left: 50px;
  margin-right: -55px;
}

#nav .submenu__content.submenu__lists > ul > li:first-child {
  margin-bottom: 1px;
}

#nav .submenu__content.submenu__lists {
  display: flex;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
}

#nav .submenu__content.submenu__lists > ul {
  flex: 0 0 25%;
  margin-bottom: 30px;
  margin-left: 50px;
  margin-right: -55px;
}

#nav .submenu__content.submenu__lists > ul > li {
  line-height: 1.3;
  position: relative;
}

#nav .submenu__content.submenu__lists > ul > li:first-child {
  margin-bottom: 1px;
}

#nav .submenu__content.submenu__lists > ul > li:first-child > .mtc-link, #nav .submenu__content.submenu__lists > ul > li:first-child > a {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .5px;
  margin-bottom: 4px;
  min-width: 45px;
}

#nav .submenu__content.submenu__lists > ul > li:first-child > .mtc-link > img, #nav .submenu__content.submenu__lists > ul > li:first-child > a > img {
  height: auto;
  left: -55px;
  position: absolute;
  top: 0;
  width: 45px;
}

#nav .submenu__content.submenu__lists > ul > li > ul {
  padding-top: 3px;
}

#nav .submenu__main-content ul li {
  display: list-item;
  text-align: -webkit-match-parent;
  unicode-bidi: isolate;
}

#nav .submenu__content.submenu__lists a, #nav .submenu__content.submenu__lists span.mtc-link {
  color: #000;
  display: inline-block;
  padding: 0px;
}

#nav .submenu__content li .mtc-link, .submenu__content li > a {
  display: flex;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
}
</style>
