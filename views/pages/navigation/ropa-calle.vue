<script setup>
import RidingStylesMenu from "@/views/pages/navigation/riding-styles-menu.vue"

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
})

const href = props.href
</script>


<template>
  <li
    class="l0 c1 main-nav"
    v-bind="props"
  >
    <a
      :href="href"
      title="Motorcycle Jackets"
    >
      <span>Ropa Calle</span>
    </a>
    <ul class="u1">
      <li class="l1 c0 primary subCategories">
        <div class="submenu">
          <div class="container">
            <div class="rowaa">
              <div class="col s12 submenu__container">
                <div class="submenu__main-content">
                  <div class="submenu__header">
                    <span class="h2">
                      <span>Equipación carretera</span>
                      <a
                        class="mtc-link nuxt-link-active nuxt-link-exact-active"
                        href="/equipacion-moto-carretera"
                      >Ver todos</a>
                    </span>
                  </div>
                  <div class="submenu__content submenu__lists">
                    <ul>
                      <li>
                        <a
                          title="Chaquetas"
                          class="mtc-link"
                          href="/chaquetas-para-moto"
                        >
                          <svg
                            class="svg-icon"
                            viewBox="-10 0 120 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-blouson-et-veste" />
                          </svg>

                          Chaquetas</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Airbag"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/chaquetas/airbag-incorporado"
                            >Airbag</a>
                          </li>
                          <li>
                            <a
                              title="Forro desmontable"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/chaquetas/forro-termico-desmontable"
                            >
                              Forro desmontable</a>
                          </li>
                          <li>
                            <a
                              title="Cuero"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/chaquetas/cuero"
                            >Cuero</a>
                          </li>
                          <li>
                            <a
                              title="Impermeables"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/chaquetas/impermeables"
                            >Impermeables</a>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/chaquetas/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Outlet"
                              class="mtc-link"
                              href="/chaquetas/outlet"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Chaquetas"
                              class="mtc-link"
                              href="/chaquetas-para-moto"
                            >Ver todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Pantalones"
                          class="mtc-link"
                          href="/pantalones-para-moto"
                        >
                          <svg
                            class="svg-icon"
                            viewBox="-10 0 120 110"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-pantalon-moto" />
                          </svg>

                          Pantalones</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Forro desmontable"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/pantalones/forro-termico-desmontable"
                            >Forro
                              desmontable</a>
                          </li>
                          <li>
                            <a
                              title="Jeans"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/pantalones/jeans"
                            >Jeans</a>
                          </li>
                          <li>
                            <a
                              title="Cuero"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/pantalones/cuero"
                            >Cuero</a>
                          </li>
                          <li>
                            <a
                              title="Impermeables"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/pantalones/impermeables"
                            >Impermeables</a>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/pantalones/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Outlet"
                              class="mtc-link"
                              href="/pantalones/outlet"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Pantalones"
                              class="mtc-link"
                              href="/pantalones-para-moto"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Guantes"
                          class="mtc-link"
                          href="/guantes-para-moto"
                        >


                          <svg
                            class="svg-icon"
                            viewBox="-10 0 120 110"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-gants-moto" />
                          </svg>
                          Guantes</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Impermeables"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/guantes/impermeables"
                            >Impermeables</a>
                          </li>
                          <li>
                            <a
                              title="Para Verano"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/guantes/solo-verano"
                            >Para
                              Verano</a>
                          </li>
                          <li>
                            <a
                              title="Calefactables"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/guantes/calefactables"
                            >Calefactables</a>
                          </li>
                          <li>
                            <a
                              title="Sport / Racing"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/guantes/sport-racing"
                            >Sport
                              / Racing</a>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/guantes/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Outlet"
                              class="mtc-link"
                              href="/guantes/outlet"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Guantes"
                              class="mtc-link"
                              href="/guantes-para-moto"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Equipación completa"
                          class="mtc-link"
                          href="/equipacion-moto-carretera/equipacion-completa"
                        >
                          <img
                            src="/content/assets/categories/packs-chaqueta-pantalon.svg"
                            title="Equipación completa"
                            alt="Equipación completa"
                          >
                          Equipación completa</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Equipación completa"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/equipacion-completa"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Botas"
                          class="mtc-link"
                          href="/botas-para-moto"
                        >


                          <svg
                            class="svg-icon"
                            viewBox="-10 0 120 110"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-bottes-et-chaussures" />
                          </svg>
                          Botas</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Touring"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/botas/touring"
                            >Touring</a>
                          </li>
                          <li>
                            <a
                              title="Scooter / Urbanas"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/botas/scooter-urban"
                            >Scooter
                              / Urbanas</a>
                          </li>
                          <li>
                            <a
                              title="Sport / Racing"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/botas/sport-racing"
                            >Sport
                              / Racing</a>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/botas/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Outlet"
                              class="mtc-link"
                              href="/botas/outlet"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Botas"
                              class="mtc-link"
                              href="/botas-para-moto"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Trajes / Monos"
                          class="mtc-link"
                          href="/trajes-para-moto"
                        >


                          <svg
                            class="svg-icon"
                            viewBox="-10 0 120 110"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-combinaison-de-piste" />
                          </svg>

                          Trajes / Monos</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="1 Pieza"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/trajes-y-monos/1-pieza"
                            >1
                              Pieza</a>
                          </li>
                          <li>
                            <a
                              title="2 Piezas"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/trajes-y-monos/2-piezas"
                            >2
                              Piezas</a>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/trajes-y-monos/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Outlet"
                              class="mtc-link"
                              href="/trajes-y-monos/outlet"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Trajes / Monos"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/trajes-y-monos"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Electrónica"
                          class="mtc-link"
                          href="/equipacion-moto-carretera/electronica"
                        >


                          <svg
                            class="svg-icon"
                            viewBox="0 0 410 410"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-gps-et-traceur-gps " />
                          </svg>

                          Electrónica


                        </a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Intercomunicadores"
                              class="mtc-link"
                              href="/intercomunicadores"
                            >Intercomunicadores</a>
                          </li>
                          <li>
                            <a
                              title="GPS"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/electronica/gps"
                            >GPS</a>
                          </li>
                          <li>
                            <a
                              title="Electrónica"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/electronica"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Motoescuela"
                          class="mtc-link"
                          href="/pack-motoescuela"
                        ><img
                          src="/content/assets/categories/packs-motoescuela.svg"
                          title="Motoescuela"
                          alt="Motoescuela"
                        > Motoescuela</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Motoescuela"
                              class="mtc-link"
                              href="/pack-motoescuela.html"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Protecciones"
                          class="mtc-link"
                          href="/protecciones-para-motociclistas"
                        >

                          <svg
                            class="svg-icon"
                            viewBox="-10 0 120 110"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-protections-cross" />
                          </svg>

                          Protecciones</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Espalderas"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/protecciones/espalderas"
                            >Espalderas</a>
                          </li>
                          <li>
                            <a
                              title="Airbags"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/protecciones/airbags"
                            >Airbags</a>
                          </li>
                          <li>
                            <a
                              title="Fajas"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/protecciones/fajas"
                            >Fajas</a>
                          </li>
                          <li>
                            <a
                              title="Protecciones"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/protecciones"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Impermeables"
                          class="mtc-link"
                          href="/ropa-lluvia"
                        >

                          <svg
                            class="svg-icon"
                            viewBox="0 0 210 210"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-protection-froid-et-pluie" />
                          </svg>

                          Impermeables</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Chaquetas"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/impermeables/chaquetas"
                            >Chaquetas</a>
                          </li>
                          <li>
                            <a
                              title="Pantalones"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/impermeables/pantalones"
                            >Pantalones</a>
                          </li>
                          <li>
                            <a
                              title="Cubreguantes"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/impermeables/cubreguantes"
                            >Cubreguantes</a>
                          </li>
                          <li>
                            <a
                              title="Cubrebotas"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/impermeables/cubrebotas"
                            >Cubrebotas</a>
                          </li>
                          <li>
                            <a
                              href="/equipacion-moto-carretera/impermeables/conjuntos"
                              title="Conjuntos"
                              class="mtc-link"
                            >
                              Conjuntos
                            </a>
                          </li>
                          <li>
                            <a
                              title="Impermeables"
                              class="mtc-link"
                              href="/ropa-lluvia"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Airbags"
                          class="mtc-link"
                          href="/airbags"
                        >

                          <svg
                            class="svg-icon"
                            viewBox="0 0 420 420"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-airbag" />
                          </svg>
                          Airbags
                        </a>
                      </li>

                      <li>
                        <ul>
                          <li>
                            <a
                              href="/equipacion-moto-carretera/airbags/chaquetas"
                              title="Chaquetas"
                              class="mtc-link"
                            >
                              Chaquetas</a>
                          </li>
                          <li>
                            <a
                              href="/equipacion-moto-carretera/airbags/trajes-monos"
                              title="Trajes / Monos"
                              class="mtc-link"
                            >
                              Trajes / Monos</a>
                          </li>
                          <li>
                            <a
                              href="/equipacion-moto-carretera/airbags/chalecos"
                              title="Chalecos"
                              class="mtc-link"
                            >Chalecos</a>
                          </li>
                          <li>
                            <a
                              href="/airbags"
                              title="Airbags"
                              class="mtc-link"
                            >Ver todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Térmicos"
                          class="mtc-link"
                          href="/equipacion-moto-carretera/primeras-capas"
                        >
                          <svg
                            class="svg-icon"
                            viewBox="-0 0 210 210"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-protection-froid-et-pluie" />
                          </svg>
                          Primeras Capas</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Cubrecuellos"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/primeras-capas/cubrecuellos"
                            >Cubrecuellos</a>
                          </li>
                          <li>
                            <a
                              title="Sotomonos"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/primeras-capas/sotomono"
                            >Sotomonos</a>
                          </li>
                          <li>
                            <a
                              title="Sotocascos"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/primeras-capas/sotocascos"
                            >Sotocascos</a>
                          </li>
                          <li>
                            <a
                              title="Camisetas"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/primeras-capas/camisetas"
                            >Camisetas</a>
                          </li>
                          <li>
                            <a
                              title="Térmicos"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/primeras-capas"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Bolsas"
                          class="mtc-link"
                          href="/equipacion-moto-carretera/bolsas"
                        >

                          <svg
                            class="svg-icon"
                            viewBox="0 0 120 120"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use xlink:href="/content/assets/menu/categories/blouz.svg#img-sac-moto" />
                          </svg>
                          Bolsas</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Mochilas"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/bolsas/mochilas"
                            >Mochilas</a>
                          </li>
                          <li>
                            <span
                              title="Otras"
                              class="mtc-link"
                            >
                              Otras</span>
                          </li>
                          <li>
                            <a
                              title="Bolsas"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/bolsas"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Complementos"
                          class="mtc-link"
                          href="/equipacion-moto-carretera/complementos"
                        ><img
                          src="/content/assets/categories/16-moto-equipacion-carretera-complementos.svg"
                          title="Complementos"
                          alt="Complementos de moto"
                        >
                          Complementos</a>
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
                            <a
                              title="Calcetines"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/calcetines"
                            >Calcetines</a>
                          </li>
                          <li>
                            <a
                              title="Complementos"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/complementos"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Deslizaderas"
                          class="mtc-link"
                          href="/equipacion-moto-carretera/deslizaderas"
                        >
                          <img
                            src="/content/assets/categories/sliders.jpg"
                            title="Deslizadores"
                            alt="Deslizadores"
                          >


                          Deslizaderas</a>
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
                            <a
                              title="Deslizaderas"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/deslizaderas"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a
                          title="Limpieza"
                          class="mtc-link"
                          href="/equipacion-moto-carretera/limpieza"
                        >
                          <img
                            src="/content/assets/categories/limpieza.jpg"
                            title="Limpieza"
                            alt="Limpieza"
                          >

                          Limpieza</a>
                      </li>
                      <li>
                        <ul>
                          <li>
                            <a
                              title="Para cascos"
                              class="mtc-link"
                              href="/equipacion-moto-carretera/limpieza/para-cascos"
                            >Para
                              cascos</a>
                          </li>
                          <li>
                            <a
                              title="Para ropa"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/limpieza/para-ropa"
                            >Para
                              ropa</a>
                          </li>
                          <li>
                            <a
                              title="Limpieza"
                              class="mtc-link"

                              href="/equipacion-moto-carretera/limpieza"
                            >Ver
                              todos</a>
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
                              <use xlink:href="/content/assets/menu/categories/blouz.svg#img-roadster-sportif" />
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
                              <use xlink:href="/content/assets/menu/categories/blouz.svg#img-vintage-classic" />
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
                              <use xlink:href="/content/assets/menu/categories/blouz.svg#img-touring-adventure" />
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
                              <use xlink:href="/content/assets/menu/categories/blouz.svg#img-urbain-scooter" />
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
                              <use xlink:href="/content/assets/menu/categories/blouz.svg#img-vintage-classic" />
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
