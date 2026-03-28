<script setup>
import BikeSelector from "@/views/pages/bike-selector.vue"

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
    class="l0 c3 main-nav"
    v-bind="props"
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <NuxtLink :to="href">
      <span>Accesorios</span>
    </NuxtLink>
    <Transition name="megamenu">
      <ul
        v-show="isOpen"
        class="u1"
        style="background-color: white;"
        @click="handleSubmenuClick"
      >
        <li>
          <div
            class="container"
            style="padding: 0 10px; "
          >
            <div>
              <VRow class="col s12 submenu__container">
                <VCol
                  cols="9"
                  class="submenu__main-content submenu__no-border"
                >
                  <div class="submenu__header">
                    <span class="h2">
                      <span>Accesorios y recambios</span> <NuxtLink
                        class="mtc-link"
                        to="/accesorios-moto"
                      >Ver todos</NuxtLink></span>
                  </div>
                  <div
                    id="4"
                    class="submenu__content submenu__outstanding"
                  >
                    <div class="submenu__outstanding-showcase">
                      <NuxtLink
                        title="Aceites"
                        class="mtc-link"
                        to="/accesorios-moto/aceites-y-sprays"
                      >

                        <div class="submenu__outstanding-icon">
                          <img
                            src="/content/assets/categories/61-moto-accesorios-aceites.svg"
                            width="60"
                            height="40"
                            alt="Aceites de moto"
                          >
                          <span>Aceites</span>
                        </div>
                      </NuxtLink>
                      <NuxtLink
                        title="Antirrobos"
                        class="mtc-link"
                        to="/accesorios-moto/antirrobos"
                      >
                        <div class="submenu__outstanding-icon">
                          <img
                            src="/content/assets/categories/62-moto-accesorios-antirrobos.svg"
                            width="60"
                            height="40"
                            alt="Antirrobos de moto"
                          >
                          <span>Antirrobos</span>
                        </div>
                      </NuxtLink>
                      <NuxtLink
                        title="Bolsas"
                        class="mtc-link"
                        to="/accesorios-moto/bolsas"
                      >
                        <div class="submenu__outstanding-icon">
                          <img
                            src="/content/assets/categories/63-moto-accesorios-bolsas-motos.svg"
                            width="60"
                            height="40"
                            alt="Bolsas de moto"
                          >
                          <span>Bolsas</span></div>
                      </NuxtLink>
                      <NuxtLink
                        title="Maletas"
                        class="mtc-link"
                        to="/accesorios-moto/maletas"
                      >
                        <div class="submenu__outstanding-icon">
                          <img
                            src="/content/assets/categories/64-moto-accesorios-maletas.svg"
                            width="60"
                            height="40"
                            alt="Maletas de moto"
                          >
                          <span>Maletas</span>
                        </div>
                      </NuxtLink><NuxtLink
                        title="Maletas + anclajes"
                        class="mtc-link"
                        to="/packs/maletas-anclajes"
                      >
                        <div class="submenu__outstanding-icon">
                          <img
                            src="/content/assets/categories/packs-maletas-anclajes.svg"
                            width="60"
                            height="40"
                            alt="Maletas + anclajes"
                          > <span>Maletas + anclajes</span></div>
                      </NuxtLink>
                      <NuxtLink
                        title="Escapes"
                        class="mtc-link"
                        to="/accesorios-moto/escapes"
                      >
                        <div class="submenu__outstanding-icon"><img
                          src="/content/assets/categories/139-moto-accesorios-escapes.svg"
                          width="60"
                          height="40"
                          alt="Escapes"
                        > <span>Escapes</span></div>
                      </NuxtLink>
                    </div>
                    <!-- /outstanding -->

                    <div class="submenu__divider">
                      Otras categorías
                    </div>

                    <div class="submenu__outstanding-list">
                      <ul class="five-columns">
                        <li class="column2">
                          <NuxtLink
                            to="/accesorios-de-top-case"
                            class="ng-isolate-scope"
                          >
                            Accesorios de Top Case
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/aceite-de-amortiguador-para-moto"
                            class="ng-isolate-scope"
                          >
                            Aceite de Amortiguador
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/aceite-de-horquillas-para-moto"
                            77
                            class="ng-isolate-scope"
                          >
                            Aceite de Horquillas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/aceite-de-motor-2t-para-moto"
                            class="ng-isolate-scope"
                          >
                            Aceite de Motor 2T
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/aceite-de-motor-4t-para-moto"
                            class="ng-isolate-scope"
                          >
                            Aceite de Motor 4T
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/aceite-para-filtro-de-aire"
                            class="ng-isolate-scope"
                          >
                            Aceite para filtro de aire
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/adaptadores-usb"
                            class="ng-isolate-scope"
                          >
                            Adaptadores USB
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/alarmas-para-moto"
                            class="ng-isolate-scope"
                          >
                            Alarmas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/alforjas"
                            class="ng-isolate-scope"
                          >
                            Alforjas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/alza-manillar"
                            class="ng-isolate-scope"
                          >
                            Alza Manillar
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/amarres-correas-tie-down-para-moto"
                            class="ng-isolate-scope"
                          >
                            Amarres y Tie Down
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/anclajes-maleta-lateral"
                            class="ng-isolate-scope"
                          >
                            Anclajes Maleta Lateral
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/anclajes-top-case"
                            class="ng-isolate-scope"
                          >
                            Anclajes Top Case
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/asientos-para-moto"
                            class="ng-isolate-scope"
                          >
                            Asientos
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/bases-de-top-case"
                            class="ng-isolate-scope"
                          >
                            Bases de Top Case
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/baterias-para-moto"
                            class="ng-isolate-scope"
                          >
                            Baterias
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/bidones-de-bencina"
                            class="ng-isolate-scope"
                          >
                            Bidones de Bencina
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/bolso-de-cola-para-moto"
                            class="ng-isolate-scope"
                          >
                            Bolso de Cola
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/bolsos-de-estanque-para-motos"
                            class="ng-isolate-scope"
                          >
                            Bolsos de Estanque
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/caballetes"
                            class="ng-isolate-scope"
                          >
                            Caballetes
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/cadenas"
                            class="ng-isolate-scope"
                          >
                            Cadenas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/cadenas-y-correas-transmision-para-moto"
                            class="ng-isolate-scope"
                          >
                            Cadenas y Correas Transmision
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/camaras-de-videos"
                            class="ng-isolate-scope"
                          >
                            Cámaras de Videos
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/candados-para-moto"
                            class="ng-isolate-scope"
                          >
                            Candados
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/carpas-para-moto"
                            class="ng-isolate-scope"
                          >
                            Carpas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/chapas-maletas"
                            class="ng-isolate-scope"
                          >
                            Chapas Maletas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/corta-hilo"
                            class="ng-isolate-scope"
                          >
                            Corta Hilo
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/escapes"
                            class="ng-isolate-scope"
                          >
                            Escapes
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/extensor-de-pata"
                            class="ng-isolate-scope"
                          >
                            Extensor de Pata
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/gps"
                            class="ng-isolate-scope"
                          >
                            GPS
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/intercomunicadores"
                            class="ng-isolate-scope"
                          >
                            Intercomunicadores
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/limpia-carburador-para-moto"
                            class="ng-isolate-scope"
                          >
                            Limpia Carburador
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/limpieza-y-proteccion-para-moto"
                            class="ng-isolate-scope"
                          >
                            Limpieza y Protección
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/liquido-de-frenos-para-moto"
                            class="ng-isolate-scope"
                          >
                            Liquido de Frenos
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/lubricantes-de-cadena-para-moto"
                            class="ng-isolate-scope"
                          >
                            Lubricantes de Cadena
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/luces-para-moto"
                            class="ng-isolate-scope"
                          >
                            Luces
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/maletas-laterales"
                            class="ng-isolate-scope"
                          >
                            Maletas Laterales
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/maletas-top-case"
                            class="ng-isolate-scope"
                          >
                            Maletas Top Case
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/mochilas"
                            class="ng-isolate-scope"
                          >
                            Mochilas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/pantallas-de-conduccion"
                            class="ng-isolate-scope"
                          >
                            Pantallas de Conducción
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/parabrisas"
                            class="ng-isolate-scope"
                          >
                            Parabrisas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/parrillas"
                            class="ng-isolate-scope"
                          >
                            Parrillas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/electronicapartidores"
                            class="ng-isolate-scope"
                          >
                            Partidores
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/partidores"
                            class="ng-isolate-scope"
                          >
                            Partidores
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/pastillas-de-freno"
                            class="ng-isolate-scope"
                          >
                            Pastillas de Freno
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/pata-central"
                            class="ng-isolate-scope"
                          >
                            Pata Central
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/piezas"
                            class="ng-isolate-scope"
                          >
                            Piezas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/portapatente"
                            class="ng-isolate-scope"
                          >
                            Portapatente
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protector-de-carter"
                            class="ng-isolate-scope"
                          >
                            Protector de Carter
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protector-de-foco"
                            class="ng-isolate-scope"
                          >
                            Protector de Foco
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protector-de-horquillas"
                            class="ng-isolate-scope"
                          >
                            Protector de Horquillas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protector-de-motor"
                            class="ng-isolate-scope"
                          >
                            Protector de Motor
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protector-de-punos"
                            class="ng-isolate-scope"
                          >
                            Protector de Puños
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protector-de-radiador"
                            class="ng-isolate-scope"
                          >
                            Protector de Radiador
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protector-deposito-liquido"
                            class="ng-isolate-scope"
                          >
                            Protector Depósito Líquido
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protecto-de-estanque-para-moto"
                            class="ng-isolate-scope"
                          >
                            Protectores de Estanque
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/protectores-de-multiple"
                            class="ng-isolate-scope"
                          >
                            Protectores de múltiple
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/punos"
                            class="ng-isolate-scope"
                          >
                            Puños
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/punos-calefaccionados"
                            class="ng-isolate-scope"
                          >
                            Puños Calefaccionados
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/rampas"
                            class="ng-isolate-scope"
                          >
                            Rampas
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/refrigerante-para-moto"
                            class="ng-isolate-scope"
                          >
                            Refrigerante
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/repuestos-intercomunicadores"
                            class="ng-isolate-scope"
                          >
                            Repuestos Intercomunicadores
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/soportes-celulares"
                            class="ng-isolate-scope"
                          >
                            Soportes Celulares
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/tapabarros"
                            class="ng-isolate-scope"
                          >
                            Tapabarros
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/tapones-para-los-oidos"
                            class="ng-isolate-scope"
                          >
                            Tapones para los Oídos
                          </NuxtLink>
                        </li>
                        <li class="column2">
                          <NuxtLink
                            to="/topes-de-caidas"
                            class="ng-isolate-scope"
                          >
                            Topes de caidas
                          </NuxtLink>
                        </li>
                      </ul>
                      <ul
                        class="five-columns"
                        style="display: none;"
                      >
                        <li>
                          <NuxtLink
                            title="Adhesivos"
                            class="mtc-link"
                            to="/accesorios-moto/adhesivos"
                          >Adhesivos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Asideros"
                            class="mtc-link"
                            to="/accesorios-moto/asideros"
                          >Asideros</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Asientos"
                            class="mtc-link"
                            to="/accesorios-moto/asientos"
                          >Asientos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Bujías"
                            class="mtc-link"
                            to="/accesorios-moto/bujias"
                          >Bujías</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Caballetes"
                            class="mtc-link"
                            to="/accesorios-moto/caballetes"
                          >Caballetes</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Cargadores batería"
                            class="mtc-link"
                            to="/accesorios-moto/cargadores-bateria"
                          >Cargadores
                            batería</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Catadriópticos"
                            class="mtc-link"
                            to="/accesorios-moto/catadriopticos"
                          >Catadriópticos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Conectores alimentación"
                            class="mtc-link"
                            to="/accesorios-moto/conectores-alimentacion"
                          >Conectores
                            alimentación</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Contrapesos manillar"
                            class="mtc-link"
                            to="/accesorios-moto/contrapesos-manillar"
                          >Contrapesos
                            manillar</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Correas de sujeción"
                            class="mtc-link"
                            to="/accesorios-moto/correas-de-sujecion"
                          >Correas
                            de sujeción</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Cubre cadenas"
                            class="mtc-link"
                            to="/accesorios-moto/cubre-cadenas"
                          >Cubre
                            cadenas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Cubre mozos"
                            class="mtc-link"
                            to="/accesorios-moto/cubre-mozos"
                          >Cubre
                            mozos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Cubre radiadores"
                            class="mtc-link"
                            to="/accesorios-moto/cubre-radiadores"
                          >Cubre
                            radiadores</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Cubrepiernas"
                            class="mtc-link"
                            to="/accesorios-moto/cubrepiernas"
                          >Cubrepiernas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Cúpulas"
                            class="mtc-link"
                            to="/accesorios-moto/cupulas"
                          >Cúpulas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Depósitos de fluidos"
                            class="mtc-link"
                            to="/accesorios-moto/depositos-de-fluidos"
                          >Depósitos
                            de fluidos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Discos de freno"
                            class="mtc-link"
                            to="/accesorios-moto/discos-de-freno"
                          >Discos
                            de freno</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Escapes"
                            class="mtc-link"
                            to="/accesorios-moto/escapes"
                          >Escapes</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Estriberas"
                            class="mtc-link"
                            to="/accesorios-moto/estriberas"
                          >Estriberas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Faros"
                            class="mtc-link"
                            to="/accesorios-moto/faros"
                          >Faros</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Filtros"
                            class="mtc-link"
                            to="/accesorios-moto/filtros"
                          >Filtros</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Fundas"
                            class="mtc-link"
                            to="/accesorios-moto/fundas"
                          >Fundas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Guardabarros"
                            class="mtc-link"
                            to="/accesorios-moto/guardabarros"
                          >Guardabarros</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Horquillas"
                            class="mtc-link"
                            to="/accesorios-moto/horquillas"
                          >Horquillas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Indicadores de presión"
                            class="mtc-link"
                            to="/accesorios-moto/indicadores-de-presion"
                          >Indicadores
                            de presión</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Intermitentes"
                            class="mtc-link"
                            to="/accesorios-moto/intermitentes"
                          >Intermitentes</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Kits de fijación"
                            class="mtc-link"
                            to="/accesorios-moto/kits-de-fijacion"
                          >Kits
                            de fijación</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Manetas"
                            class="mtc-link"
                            to="/accesorios-moto/manetas"
                          >Manetas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Manillares"
                            class="mtc-link"
                            to="/accesorios-moto/manillares"
                          >Manillares</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Manoplas cubrepuños"
                            class="mtc-link"
                            to="/accesorios-moto/manoplas-cubrepunos"
                          >Manoplas
                            cubrepuños</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Neumáticos"
                            class="mtc-link"
                            to="/accesorios-moto/neumaticos"
                          >Neumáticos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Otros"
                            class="mtc-link"
                            to="/accesorios-moto/otros-3"
                          >Otros</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Paramanos"
                            class="mtc-link"
                            to="/accesorios-moto/paramanos"
                          >Paramanos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Parrillas maletas"
                            class="mtc-link"
                            to="/accesorios-moto/parrillas-maletas"
                          >Parrillas
                            maletas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Pastillas de freno"
                            class="mtc-link"
                            to="/accesorios-moto/pastillas-de-freno"
                          >Pastillas
                            de freno</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Protectores llantas"
                            class="mtc-link"
                            to="/accesorios-moto/protectores-llantas"
                          >Protectores
                            llantas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Protectores manillar"
                            class="mtc-link"
                            to="/accesorios-moto/protectores-manillar"
                          >Protectores
                            manillar</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Protege-motor"
                            class="mtc-link"
                            to="/accesorios-moto/protege-motor"
                          >Protege-motor</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Puños"
                            class="mtc-link"
                            to="/accesorios-moto/punos"
                          >Puños</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Quillas"
                            class="mtc-link"
                            to="/accesorios-moto/quillas"
                          >Quillas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Redes"
                            class="mtc-link"
                            to="/accesorios-moto/redes"
                          >Redes</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Respaldos"
                            class="mtc-link"
                            to="/accesorios-moto/respaldos"
                          >Respaldos</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Retrovisores"
                            class="mtc-link"
                            to="/accesorios-moto/retrovisores"
                          >Retrovisores</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Soportes matrículas"
                            class="mtc-link"
                            to="/accesorios-moto/soportes-matriculas"
                          >Soportes
                            matrículas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Tapas"
                            class="mtc-link"
                            to="/accesorios-moto/tapas"
                          >Tapas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Tapones depósito"
                            class="mtc-link"
                            to="/accesorios-moto/tapones-deposito"
                          >Tapones
                            depósito</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Tijas"
                            class="mtc-link"
                            to="/accesorios-moto/tijas"
                          >Tijas</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Tornillería"
                            class="mtc-link"
                            to="/accesorios-moto/tornilleria"
                          >Tornillería</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            title="Torretas"
                            class="mtc-link"
                            to="/accesorios-moto/torretas"
                          >Torretas</NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </VCol>
                <VCol
                  cols="3"
                  class="bike-search ng-scope"
                  style="padding-top: 30px;"
                >
                  <h2 class="h3">
                    Elige tu modelo de moto para ver
                    accesorios específicos
                  </h2>
                  <!-- ngIf: !hideSelector -->
                  <BikeSelector
                    :filter-bike-with-products="true"
                    class="ng-scope ng-isolate-scope"
                    @on-bike-select="bikeSelected(bike)"
                  /><!-- end ngIf: !hideSelector -->
                </VCol>
              </VRow>
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
                            to="/vulcanet"
                            class="mtc-link"
                          >
                            <span lazy="true">
                              <img
                                src="/content/assets/brands/brand-714.png"
                                class="cdn-img v-lazy-image v-lazy-image-loaded"
                                alt="Vulcanet"
                                width="59"
                                height="30"
                              >
                            </span></NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            to="/chigee"
                            class="mtc-link"
                          >
                            <span lazy="true">
                              <img
                                src="/content/assets/brands/brand-738.png"
                                class="cdn-img v-lazy-image v-lazy-image-loaded"
                                alt="Chigee"
                                width="59"
                                height="30"
                              >
                            </span>
                          </NuxtLink>
                        </li>


                        <li>
                          <NuxtLink
                            to="/sena"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-292.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Sena"
                            height="30"
                          > </span></NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            to="/intercomunicadores-cardo"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-131.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Cardo"
                            width="59"
                            height="30"
                          > </span></NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            to="/ram-mounts"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-570.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Ram Mounts"
                            width="59"
                            height="30"
                          > </span></NuxtLink>
                        </li>

                        <li>
                          <NuxtLink
                            to="/sp-connect"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-532.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="SP Connect"
                            width="59"
                            height="30"
                          > </span></NuxtLink>
                        </li>

                        <li>
                          <NuxtLink
                            to="/kappa"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-514.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="Kappa"
                            width="59"
                            height="30"
                          > </span></NuxtLink>
                        </li>
                        <li>
                          <NuxtLink
                            to="/liqui-moy"
                            class="mtc-link"
                          ><span lazy="true"><img
                            src="/content/assets/brands/brand-557.png"
                            class="cdn-img v-lazy-image v-lazy-image-loaded"
                            alt="lIQUI MOLY"
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
        </li>
      </ul>
    </Transition>
  </li>
</template>

<style scoped>

#nav .submenu__content li .mtc-link, .submenu__content li > a {
  display: flex;
  padding: 5px 3px;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  text-transform: none;
}
</style>
