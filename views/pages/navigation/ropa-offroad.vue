<script setup>
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
        id="ni_1562"
        class="l0 c2 main-nav"
        v-bind="props"
      >
        <a
          :href="href"
          title="Ropa Motocross"
        >
          <span>Ropa Motocross</span>
        </a>

      </li>
    </template>
    <ul class="u1">
      <li
        id="ni_3855"
        class="l1 c0 primary subCategories"
      >
        <div class="submenu">
          <div class="container">
            <div class="row">
              <div class="col s12 submenu__container">
                <div class="submenu__main-content">
                  <div class="submenu__header">
                          <span class="h2">
                            <span>Motocross / Enduro</span>
                            <a
                              title="Motocross / Enduro"
                              class="mtc-link"
                              href="/equipacion-motocross"
                            >Ver todos</a>
                          </span>
                  </div>
                  <div
                    class="submenu__content submenu__lists"
                    icon="/assets/menu/categories/130-moto-equipacion-carretera.svg"
                    link="https://www.motocard.com/equipacion-moto-carretera"
                    identifier="2"
                    parent-menu-title="Equipación carretera"
                  >
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Cascos"
                          class="mtc-link"
                          href="/equipacion-motocross/cascos"
                        ><img
                          src="/content/assets/categories/21-moto-equipacion-motocross-cascos.svg"
                          title="Cascos"
                          width="25"
                          height="25"
                          alt="Cascos de motocross"
                        > Cascos</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Fibra"
                              class="mtc-link"
                              href="/equipacion-motocross/cascos/fibra"
                            >Fibra</a>
                          </li>
                          <li>
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/cascos/nino"
                            >Junior</a>
                          </li>
                          <li>
                                  <span
                                    title="Outlet"
                                    class="mtc-link"
                                  >Outlet</span>
                          </li>
                          <li>
                            <a
                              title="Cascos"
                              class="mtc-link"
                              href="/equipacion-motocross/cascos"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Equipación completa"
                          class="mtc-link"
                          href="/equipacion-motocross/equipacion-completa"
                        ><img
                          src="/content/assets/categories/131-moto-equipacion-offroad.svg"
                          title="Equipación completa"
                          width="25"
                          height="25"
                          alt="Equipación completa"
                        > Equipación
                          completa</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Equipación completa"
                              class="mtc-link"
                              href="/equipacion-motocross/equipacion-completa"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Camisetas"
                          class="mtc-link"
                          href="/equipacion-motocross/camisetas"
                        ><img
                          src="/content/assets/categories/23-moto-equipacion-motocross-camisetas.svg"
                          title="Camisetas"
                          width="25"
                          height="25"
                          alt="Camisetas de motocross"
                        > Camisetas</a>
                        <ul class="double-menu__childs">
                          <li>
                                  <span
                                    title="Unisex"
                                    class="mtc-link"
                                  >Unisex</span>
                          </li>
                          <li>
                            <a
                              href="/equipacion-motocross/camisetas/ventilados"
                              title="Máxima ventilación"
                              class="mtc-link"
                            >Máxima ventilación</a>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-motocross/camisetas/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/camisetas/nino"
                            >Junior</a>
                          </li>
                          <li>
                            <a
                              href="/equipacion-motocross/camisetas/outlet"
                              title="Outlet"
                              class="mtc-link"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Camisetas"
                              class="mtc-link"
                              href="/equipacion-motocross/camisetas"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>

                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Pantalones"
                          class="mtc-link"
                          href="/equipacion-motocross/pantalones"
                        >
                          <img
                            src="/content/assets/categories/24-moto-equipacion-motocross-pantalones.svg"
                            title="Pantalones"
                            width="25"
                            height="25"
                            alt="Pantalones de motocross"
                          >
                          Pantalones
                        </a>
                        <ul class="double-menu__childs">
                          <li>
                                  <span
                                    title="Unisex"
                                    class="mtc-link"
                                  >
                                    Unisex</span>
                          </li>
                          <li>
                            <a
                              href="/equipacion-motocross/pantalones/ventilados"
                              title="Máxima ventilación"
                              class="mtc-link"
                            >Máxima ventilación</a>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-motocross/pantalones/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/pantalones/nino"
                            >Junior</a>
                          </li>
                          <li>
                            <a
                              href="/equipacion-motocross/pantalones/outlet"
                              title="Outlet"
                              class="mtc-link"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Pantalones"
                              class="mtc-link"
                              href="/equipacion-motocross/pantalones"
                            >Ver todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Botas"
                          class="mtc-link"
                          href="/equipacion-motocross/botas"
                        >
                          <img
                            src="/content/assets/categories/26-moto-equipacion-motocross-botas.svg"
                            title="Botas"
                            width="25"
                            height="25"
                            alt="Botas de motocross"
                          > Botas</a>
                        <ul class="double-menu__childs">
                          <li>
                                  <span
                                    title="Unisex"
                                    class="mtc-link"
                                  >Unisex</span>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-motocross/botas/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/botas/nino"
                            >Junior</a>
                          </li>
                          <li>
                            <a
                              href="/equipacion-motocross/botas/outlet"
                              title="Outlet"
                              class="mtc-link"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Botas"
                              class="mtc-link"
                              href="/equipacion-motocross/botas"
                            >Ver todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Guantes"
                          class="mtc-link"
                          href="/equipacion-motocross/guantes"
                        >
                          <img
                            src="/content/assets/categories/25-moto-equipacion-motocross-guantes.svg"
                            title="Guantes"
                            width="25"
                            height="25"
                            alt="Guantes de motocross"
                          > Guantes</a>
                        <ul class="double-menu__childs">
                          <li>
                                  <span
                                    title="Unisex"
                                    class="mtc-link"
                                  >Unisex</span>
                          </li>
                          <li>
                            <a
                              title="Mujer"
                              class="mtc-link"
                              href="/equipacion-motocross/guantes/mujer"
                            >Mujer</a>
                          </li>
                          <li>
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/guantes/nino"
                            >Junior</a>
                          </li>
                          <li>
                            <a
                              href="/equipacion-motocross/guantes/outlet"
                              title="Outlet"
                              class="mtc-link"
                            >Outlet</a>
                          </li>
                          <li>
                            <a
                              title="Guantes"
                              class="mtc-link"
                              href="/equipacion-motocross/guantes"
                            >Ver todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Gafas"
                          class="mtc-link"
                          href="/equipacion-motocross/gafas"
                        >
                          <img
                            src="/content/assets/categories/28-moto-equipacion-motocross-gafas.svg"
                            title="Gafas"
                            width="25"
                            height="25"
                            alt="Gafas de motocross"
                          > Gafas</a>
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
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/gafas/nino"
                            >Junior</a>
                          </li>
                          <li>
                            <a
                              title="Gafas"
                              class="mtc-link"
                              href="/equipacion-motocross/gafas"
                            >Ver todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Protecciones"
                          class="mtc-link"
                          href="/equipacion-motocross/protecciones"
                        ><img
                          src="/content/assets/categories/27-moto-equipacion-motocross-protecciones.svg"
                          title="Protecciones"
                          width="25"
                          height="25"
                          alt="Protecciones de motocross"
                        >
                          Protecciones</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Integrales"
                              class="mtc-link"
                              href="/equipacion-motocross/protecciones/protecciones-integrales"
                            >Integrales</a>
                          </li>
                          <li>
                            <a
                              title="Petos"
                              class="mtc-link"
                              href="/equipacion-motocross/protecciones/petos"
                            >Petos</a>
                          </li>
                          <li>
                            <a
                              title="Rodilleras"
                              class="mtc-link"
                              href="/equipacion-motocross/protecciones/rodilleras"
                            >Rodilleras</a>
                          </li>
                          <li>
                            <a
                              title="Coderas"
                              class="mtc-link"
                              href="/equipacion-motocross/protecciones/coderas"
                            >Coderas</a>
                          </li>
                          <li>
                            <a
                              title="Collarines"
                              class="mtc-link"
                              href="/equipacion-motocross/protecciones/collarines"
                            >Collarines</a>
                          </li>
                          <li>
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/protecciones/nino"
                            >Junior</a>
                          </li>
                          <li>
                            <a
                              title="Protecciones"
                              class="mtc-link"
                              href="/equipacion-motocross/protecciones"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Chaquetas"
                          class="mtc-link"
                          href="/equipacion-motocross/chaquetas"
                        ><img
                          src="/content/assets/categories/22-moto-equipacion-motocross-chaquetas.svg"
                          title="Chaquetas"
                          width="25"
                          height="25"
                          alt="Chaquetas de motocross"
                        > Chaquetas</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Compatibles con collarín"
                              class="mtc-link"
                              href="/equipacion-motocross/chaquetas/compatibles-con-collarin"
                            >Compatibles
                              con collarín</a>
                          </li>
                          <li>
                            <a
                              title="Impermeables"
                              class="mtc-link"
                              href="/equipacion-motocross/chaquetas/impermeables"
                            >Impermeables</a>
                          </li>
                          <li>
                            <a
                              title="Mangas desmontables"
                              class="mtc-link"
                              href="/equipacion-motocross/chaquetas/mangas-desmontables"
                            >Mangas
                              desmontables</a>
                          </li>
                          <li>
                            <a
                              title="Chaquetas"
                              class="mtc-link"
                              href="/equipacion-motocross/chaquetas"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Calcetines"
                          class="mtc-link"
                          href="/equipacion-motocross/calcetines"
                        >
                          <img
                            src="/content/assets/categories/29-moto-equipacion-motocross-calcetines.svg"
                            title="Calcetines"
                            width="25"
                            height="25"
                            alt="Calcetines de motocross"
                          > Calcetines</a>
                        <ul class="double-menu__childs">
                          <li>
                                  <span
                                    title="Unisex"
                                    class="mtc-link"
                                  >Unisex</span>
                          </li>
                          <li>
                            <a
                              title="Junior"
                              class="mtc-link"
                              href="/equipacion-motocross/calcetines/nino"
                            >Junior</a>
                          </li>
                          <li>
                            <a
                              title="Calcetines"
                              class="mtc-link"
                              href="/equipacion-motocross/calcetines"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Bolsas"
                          class="mtc-link"
                          href="/equipacion-motocross/bolsas"
                        ><img
                          src="/content/assets/categories/32-moto-equipacion-motocross-bolsas.svg"
                          title="Bolsas"
                          width="25"
                          height="25"
                          alt="Bolsas de motocross"
                        > Bolsas</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              href="/equipacion-motocross/bolsas/mochilas/hidratacion  "
                              title="Mochilas hidratación"
                              class="mtc-link"
                            >Mochilas hidratación</a>
                          </li>
                          <li>
                                  <span
                                    title="Transporte equipación"
                                    class="mtc-link"
                                  >Transporte equipación</span>
                          </li>
                          <li>
                            <a
                              title="Riñoneras"
                              class="mtc-link"
                              href="/equipacion-motocross/bolsas/rinoneras"
                            >Riñoneras</a>
                          </li>
                          <li>
                            <a
                              title="Bolsas"
                              class="mtc-link"
                              href="/equipacion-motocross/bolsas"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Complementos"
                          class="mtc-link"
                          href="/equipacion-motocross/complementos"
                        >
                          <img
                            src="/content/assets/categories/33-moto-equipacion-motocross-complementos.svg"
                            title="Complementos"
                            width="25"
                            height="25"
                            alt="Complementos de motocross"
                          >
                          Complementos</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Complementos"
                              class="mtc-link"
                              href="/equipacion-motocross/complementos"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Recambios"
                          class="mtc-link"
                          href="/equipacion-motocross/recambios"
                        >
                          <img
                            src="/content/assets/categories/34-moto-equipacion-motocross-recambios.svg"
                            title="Recambios"
                            width="25"
                            height="25"
                            alt="Recambios de motocross"
                          > Recambios</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Botas"
                              class="mtc-link"
                              href="/equipacion-motocross/recambios/botas"
                            >Botas</a>
                          </li>
                          <li>
                            <a
                              title="Gafas"
                              class="mtc-link"
                              href="/equipacion-motocross/recambios/gafas"
                            >Gafas</a>
                          </li>
                          <li>
                            <a
                              title="Recambios"
                              class="mtc-link"
                              href="/equipacion-motocross/recambios"
                            >Ver todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Térmicos"
                          class="mtc-link"
                          href="/equipacion-motocross/primeras-capas"
                        >
                          <img
                            src="/content/assets/categories/30-moto-equipacion-motocross-termicos.svg"
                            title="Térmicos"
                            width="25"
                            height="25"
                            alt="Equipación térmica de motocross"
                          > Térmicos</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Para verano"
                              class="mtc-link"
                              href="/equipacion-motocross/primeras-capas/solo-verano"
                            >Para
                              verano</a>
                          </li>
                          <li>
                            <a
                              title="Térmicos"
                              class="mtc-link"
                              href="/equipacion-motocross/primeras-capas"
                            >Ver
                              todos</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul>
                      <li class="double-menu__title">
                        <a
                          title="Impermeables"
                          class="mtc-link"
                          href="/equipacion-motocross/impermeables"
                        >
                          <img
                            src="/content/assets/categories/31-moto-equipacion-motocross-impermeables.svg"
                            title="Impermeables"
                            width="25"
                            height="25"
                            alt="Impermeables de moto"
                          > Impermeables</a>
                        <ul class="double-menu__childs">
                          <li>
                            <a
                              title="Impermeables"
                              class="mtc-link"
                              href="/equipacion-motocross/impermeables"
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
                            href="/equipacion-motocross/alpinestars"
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
                            href="/equipacion-motocross/fox"
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
                            href="/equipacion-motocross/leatt"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-126.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cascos AGV"
                            width="59"
                            height="30"
                          ></span></a>
                        </li>
                        <li>
                          <a
                            href="/equipacion-motocross/revit"
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
                            href="/equipacion-motocross/thor"
                            class="mtc-link"
                          >
                                  <span lazy="true"><img
                                    src="/content/assets/brands/brand-421.png"
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
  <!-- ropa offroad -->

  <!-- /ropa offraod -->

</template>

<style scoped lang="scss">

</style>
