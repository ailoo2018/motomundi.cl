<script setup lang="ts">

import BikeSelector from "@/views/pages/bike-selector.vue";
</script>

<template>
  <ul
    class="u1"
    style="background-color: white;"
  >
    <li>
      <div
        class="container"
        style="padding: 0 10px; "
      >
        <div class="row">
          <VRow class="col s12 submenu__container">
            <VCol
              cols="9"
              class="submenu__main-content submenu__no-border"
            >
              <div class="submenu__header">
                  <span class="h2">
                    <span>Accesorios y recambios</span> <a
                    class="mtc-link"
                    href="/accesorios-moto"
                  >Ver todos</a></span>
              </div>
              <div
                id="4"
                class="submenu__content submenu__outstanding"
                icon="/assets/menu/categories/132-moto-accesorios.svg"
                order="3"
                link="https://www.motocard.com/parts-home"
                show_riding_styles="false"
              >
                <div class="submenu__outstanding-showcase">
                  <a
                    title="Aceites"
                    class="mtc-link"
                    href="/accesorios-moto/aceites-y-sprays"
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
                  </a>
                  <a
                    title="Antirrobos"
                    class="mtc-link"
                    href="/accesorios-moto/antirrobos"
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
                  </a>
                  <a
                    title="Bolsas"
                    class="mtc-link"
                    href="/accesorios-moto/bolsas"
                  >
                    <div class="submenu__outstanding-icon">
                      <img
                        src="/content/assets/categories/63-moto-accesorios-bolsas-motos.svg"
                        width="60"
                        height="40"
                        alt="Bolsas de moto"
                      >
                      <span>Bolsas</span></div>
                  </a>
                  <a
                    title="Maletas"
                    class="mtc-link"
                    href="/accesorios-moto/maletas"
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
                  </a><a
                  title="Maletas + anclajes"
                  class="mtc-link"
                  href="/packs/maletas-anclajes"
                >
                  <div class="submenu__outstanding-icon">
                    <img
                      src="/content/assets/categories/packs-maletas-anclajes.svg"
                      width="60"
                      height="40"
                      alt="Maletas + anclajes"
                    > <span>Maletas + anclajes</span></div>
                </a>
                  <a
                    title="Escapes"
                    class="mtc-link"
                    href="/accesorios-moto/escapes"
                  >
                    <div class="submenu__outstanding-icon"><img
                      src="/content/assets/categories/139-moto-accesorios-escapes.svg"
                      width="60"
                      height="40"
                      alt="Escapes"
                    > <span>Escapes</span></div>
                  </a>
                </div>
                <!-- /outstanding -->

                <div class="submenu__divider">
                  Otras categorías
                </div>

                <div class="submenu__outstanding-list">
                  <ul class="five-columns">
                    <li class="column2">
                      <a
                        href="/accesorios-de-top-case"
                        class="ng-isolate-scope"
                      >
                        Accesorios de Top Case
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/aceite-de-amortiguador-para-moto"
                        class="ng-isolate-scope"
                      >
                        Aceite de Amortiguador
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/aceite-de-horquillas-para-moto"
                        77
                        class="ng-isolate-scope"
                      >
                        Aceite de Horquillas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/aceite-de-motor-2t-para-moto"
                        class="ng-isolate-scope"
                      >
                        Aceite de Motor 2T
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/aceite-de-motor-4t-para-moto"
                        class="ng-isolate-scope"
                      >
                        Aceite de Motor 4T
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/aceite-para-filtro-de-aire"
                        class="ng-isolate-scope"
                      >
                        Aceite para filtro de aire
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/adaptadores-usb"
                        class="ng-isolate-scope"
                      >
                        Adaptadores USB
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/alarmas-para-moto"
                        class="ng-isolate-scope"
                      >
                        Alarmas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/alforjas"
                        class="ng-isolate-scope"
                      >
                        Alforjas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/alza-manillar"
                        class="ng-isolate-scope"
                      >
                        Alza Manillar
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/amarres-correas-tie-down-para-moto"
                        class="ng-isolate-scope"
                      >
                        Amarres y Tie Down
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/anclajes-maleta-lateral"
                        class="ng-isolate-scope"
                      >
                        Anclajes Maleta Lateral
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/anclajes-top-case"
                        class="ng-isolate-scope"
                      >
                        Anclajes Top Case
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/asientos-para-moto"
                        class="ng-isolate-scope"
                      >
                        Asientos
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/bases-de-top-case"
                        class="ng-isolate-scope"
                      >
                        Bases de Top Case
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/baterias-para-moto"
                        class="ng-isolate-scope"
                      >
                        Baterias
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/bidones-de-bencina"
                        class="ng-isolate-scope"
                      >
                        Bidones de Bencina
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/bolso-de-cola-para-moto"
                        class="ng-isolate-scope"
                      >
                        Bolso de Cola
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/bolsos-de-estanque-para-motos"
                        class="ng-isolate-scope"
                      >
                        Bolsos de Estanque
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/caballetes"
                        class="ng-isolate-scope"
                      >
                        Caballetes
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/cadenas"
                        class="ng-isolate-scope"
                      >
                        Cadenas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/cadenas-y-correas-transmision-para-moto"
                        class="ng-isolate-scope"
                      >
                        Cadenas y Correas Transmision
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/camaras-de-videos"
                        class="ng-isolate-scope"
                      >
                        Cámaras de Videos
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/candados-para-moto"
                        class="ng-isolate-scope"
                      >
                        Candados
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/carpas-para-moto"
                        class="ng-isolate-scope"
                      >
                        Carpas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/chapas-maletas"
                        class="ng-isolate-scope"
                      >
                        Chapas Maletas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/corta-hilo"
                        class="ng-isolate-scope"
                      >
                        Corta Hilo
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/escapes"
                        class="ng-isolate-scope"
                      >
                        Escapes
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/extensor-de-pata"
                        class="ng-isolate-scope"
                      >
                        Extensor de Pata
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/gps"
                        class="ng-isolate-scope"
                      >
                        GPS
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/intercomunicadores"
                        class="ng-isolate-scope"
                      >
                        Intercomunicadores
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/limpia-carburador-para-moto"
                        class="ng-isolate-scope"
                      >
                        Limpia Carburador
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/limpieza-y-proteccion-para-moto"
                        class="ng-isolate-scope"
                      >
                        Limpieza y Protección
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/liquido-de-frenos-para-moto"
                        class="ng-isolate-scope"
                      >
                        Liquido de Frenos
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/lubricantes-de-cadena-para-moto"
                        class="ng-isolate-scope"
                      >
                        Lubricantes de Cadena
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/luces-para-moto"
                        class="ng-isolate-scope"
                      >
                        Luces
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/maletas-laterales"
                        class="ng-isolate-scope"
                      >
                        Maletas Laterales
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/maletas-top-case"
                        class="ng-isolate-scope"
                      >
                        Maletas Top Case
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/mochilas"
                        class="ng-isolate-scope"
                      >
                        Mochilas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/pantallas-de-conduccion"
                        class="ng-isolate-scope"
                      >
                        Pantallas de Conducción
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/parabrisas"
                        class="ng-isolate-scope"
                      >
                        Parabrisas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/parrillas"
                        class="ng-isolate-scope"
                      >
                        Parrillas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/electronicapartidores"
                        class="ng-isolate-scope"
                      >
                        Partidores
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/partidores"
                        class="ng-isolate-scope"
                      >
                        Partidores
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/pastillas-de-freno"
                        class="ng-isolate-scope"
                      >
                        Pastillas de Freno
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/pata-central"
                        class="ng-isolate-scope"
                      >
                        Pata Central
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/piezas"
                        class="ng-isolate-scope"
                      >
                        Piezas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/portapatente"
                        class="ng-isolate-scope"
                      >
                        Portapatente
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protector-de-carter"
                        class="ng-isolate-scope"
                      >
                        Protector de Carter
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protector-de-foco"
                        class="ng-isolate-scope"
                      >
                        Protector de Foco
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protector-de-horquillas"
                        class="ng-isolate-scope"
                      >
                        Protector de Horquillas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protector-de-motor"
                        class="ng-isolate-scope"
                      >
                        Protector de Motor
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protector-de-punos"
                        class="ng-isolate-scope"
                      >
                        Protector de Puños
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protector-de-radiador"
                        class="ng-isolate-scope"
                      >
                        Protector de Radiador
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protector-deposito-liquido"
                        class="ng-isolate-scope"
                      >
                        Protector Depósito Líquido
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protecto-de-estanque-para-moto"
                        class="ng-isolate-scope"
                      >
                        Protectores de Estanque
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/protectores-de-multiple"
                        class="ng-isolate-scope"
                      >
                        Protectores de múltiple
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/punos"
                        class="ng-isolate-scope"
                      >
                        Puños
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/punos-calefaccionados"
                        class="ng-isolate-scope"
                      >
                        Puños Calefaccionados
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/rampas"
                        class="ng-isolate-scope"
                      >
                        Rampas
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/refrigerante-para-moto"
                        class="ng-isolate-scope"
                      >
                        Refrigerante
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/repuestos-intercomunicadores"
                        class="ng-isolate-scope"
                      >
                        Repuestos Intercomunicadores
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/soportes-celulares"
                        class="ng-isolate-scope"
                      >
                        Soportes Celulares
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/tapabarros"
                        class="ng-isolate-scope"
                      >
                        Tapabarros
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/tapones-para-los-oidos"
                        class="ng-isolate-scope"
                      >
                        Tapones para los Oídos
                      </a>
                    </li>
                    <li class="column2">
                      <a
                        href="/topes-de-caidas"
                        class="ng-isolate-scope"
                      >
                        Topes de caidas
                      </a>
                    </li>
                  </ul>
                  <ul
                    class="five-columns"
                    style="display: none;"
                  >
                    <li>
                      <a
                        title="Adhesivos"
                        class="mtc-link"
                        href="/accesorios-moto/adhesivos"
                      >Adhesivos</a>
                    </li>
                    <li>
                      <a
                        title="Asideros"
                        class="mtc-link"
                        href="/accesorios-moto/asideros"
                      >Asideros</a>
                    </li>
                    <li>
                      <a
                        title="Asientos"
                        class="mtc-link"
                        href="/accesorios-moto/asientos"
                      >Asientos</a>
                    </li>
                    <li>
                      <a
                        title="Bujías"
                        class="mtc-link"
                        href="/accesorios-moto/bujias"
                      >Bujías</a>
                    </li>
                    <li>
                      <a
                        title="Caballetes"
                        class="mtc-link"
                        href="/accesorios-moto/caballetes"
                      >Caballetes</a>
                    </li>
                    <li>
                      <a
                        title="Cargadores batería"
                        class="mtc-link"
                        href="/accesorios-moto/cargadores-bateria"
                      >Cargadores
                        batería</a>
                    </li>
                    <li>
                      <a
                        title="Catadriópticos"
                        class="mtc-link"
                        href="/accesorios-moto/catadriopticos"
                      >Catadriópticos</a>
                    </li>
                    <li>
                      <a
                        title="Conectores alimentación"
                        class="mtc-link"
                        href="/accesorios-moto/conectores-alimentacion"
                      >Conectores
                        alimentación</a>
                    </li>
                    <li>
                      <a
                        title="Contrapesos manillar"
                        class="mtc-link"
                        href="/accesorios-moto/contrapesos-manillar"
                      >Contrapesos
                        manillar</a>
                    </li>
                    <li>
                      <a
                        title="Correas de sujeción"
                        class="mtc-link"
                        href="/accesorios-moto/correas-de-sujecion"
                      >Correas
                        de sujeción</a>
                    </li>
                    <li>
                      <a
                        title="Cubre cadenas"
                        class="mtc-link"
                        href="/accesorios-moto/cubre-cadenas"
                      >Cubre
                        cadenas</a>
                    </li>
                    <li>
                      <a
                        title="Cubre mozos"
                        class="mtc-link"
                        href="/accesorios-moto/cubre-mozos"
                      >Cubre
                        mozos</a>
                    </li>
                    <li>
                      <a
                        title="Cubre radiadores"
                        class="mtc-link"
                        href="/accesorios-moto/cubre-radiadores"
                      >Cubre
                        radiadores</a>
                    </li>
                    <li>
                      <a
                        title="Cubrepiernas"
                        class="mtc-link"
                        href="/accesorios-moto/cubrepiernas"
                      >Cubrepiernas</a>
                    </li>
                    <li>
                      <a
                        title="Cúpulas"
                        class="mtc-link"
                        href="/accesorios-moto/cupulas"
                      >Cúpulas</a>
                    </li>
                    <li>
                      <a
                        title="Depósitos de fluidos"
                        class="mtc-link"
                        href="/accesorios-moto/depositos-de-fluidos"
                      >Depósitos
                        de fluidos</a>
                    </li>
                    <li>
                      <a
                        title="Discos de freno"
                        class="mtc-link"
                        href="/accesorios-moto/discos-de-freno"
                      >Discos
                        de freno</a>
                    </li>
                    <li>
                      <a
                        title="Escapes"
                        class="mtc-link"
                        href="/accesorios-moto/escapes"
                      >Escapes</a>
                    </li>
                    <li>
                      <a
                        title="Estriberas"
                        class="mtc-link"
                        href="/accesorios-moto/estriberas"
                      >Estriberas</a>
                    </li>
                    <li>
                      <a
                        title="Faros"
                        class="mtc-link"
                        href="/accesorios-moto/faros"
                      >Faros</a>
                    </li>
                    <li>
                      <a
                        title="Filtros"
                        class="mtc-link"
                        href="/accesorios-moto/filtros"
                      >Filtros</a>
                    </li>
                    <li>
                      <a
                        title="Fundas"
                        class="mtc-link"
                        href="/accesorios-moto/fundas"
                      >Fundas</a>
                    </li>
                    <li>
                      <a
                        title="Guardabarros"
                        class="mtc-link"
                        href="/accesorios-moto/guardabarros"
                      >Guardabarros</a>
                    </li>
                    <li>
                      <a
                        title="Horquillas"
                        class="mtc-link"
                        href="/accesorios-moto/horquillas"
                      >Horquillas</a>
                    </li>
                    <li>
                      <a
                        title="Indicadores de presión"
                        class="mtc-link"
                        href="/accesorios-moto/indicadores-de-presion"
                      >Indicadores
                        de presión</a>
                    </li>
                    <li>
                      <a
                        title="Intermitentes"
                        class="mtc-link"
                        href="/accesorios-moto/intermitentes"
                      >Intermitentes</a>
                    </li>
                    <li>
                      <a
                        title="Kits de fijación"
                        class="mtc-link"
                        href="/accesorios-moto/kits-de-fijacion"
                      >Kits
                        de fijación</a>
                    </li>
                    <li>
                      <a
                        title="Manetas"
                        class="mtc-link"
                        href="/accesorios-moto/manetas"
                      >Manetas</a>
                    </li>
                    <li>
                      <a
                        title="Manillares"
                        class="mtc-link"
                        href="/accesorios-moto/manillares"
                      >Manillares</a>
                    </li>
                    <li>
                      <a
                        title="Manoplas cubrepuños"
                        class="mtc-link"
                        href="/accesorios-moto/manoplas-cubrepunos"
                      >Manoplas
                        cubrepuños</a>
                    </li>
                    <li>
                      <a
                        title="Neumáticos"
                        class="mtc-link"
                        href="/accesorios-moto/neumaticos"
                      >Neumáticos</a>
                    </li>
                    <li>
                      <a
                        title="Otros"
                        class="mtc-link"
                        href="/accesorios-moto/otros-3"
                      >Otros</a>
                    </li>
                    <li>
                      <a
                        title="Paramanos"
                        class="mtc-link"
                        href="/accesorios-moto/paramanos"
                      >Paramanos</a>
                    </li>
                    <li>
                      <a
                        title="Parrillas maletas"
                        class="mtc-link"
                        href="/accesorios-moto/parrillas-maletas"
                      >Parrillas
                        maletas</a>
                    </li>
                    <li>
                      <a
                        title="Pastillas de freno"
                        class="mtc-link"
                        href="/accesorios-moto/pastillas-de-freno"
                      >Pastillas
                        de freno</a>
                    </li>
                    <li>
                      <a
                        title="Protectores llantas"
                        class="mtc-link"
                        href="/accesorios-moto/protectores-llantas"
                      >Protectores
                        llantas</a>
                    </li>
                    <li>
                      <a
                        title="Protectores manillar"
                        class="mtc-link"
                        href="/accesorios-moto/protectores-manillar"
                      >Protectores
                        manillar</a>
                    </li>
                    <li>
                      <a
                        title="Protege-motor"
                        class="mtc-link"
                        href="/accesorios-moto/protege-motor"
                      >Protege-motor</a>
                    </li>
                    <li>
                      <a
                        title="Puños"
                        class="mtc-link"
                        href="/accesorios-moto/punos"
                      >Puños</a>
                    </li>
                    <li>
                      <a
                        title="Quillas"
                        class="mtc-link"
                        href="/accesorios-moto/quillas"
                      >Quillas</a>
                    </li>
                    <li>
                      <a
                        title="Redes"
                        class="mtc-link"
                        href="/accesorios-moto/redes"
                      >Redes</a>
                    </li>
                    <li>
                      <a
                        title="Respaldos"
                        class="mtc-link"
                        href="/accesorios-moto/respaldos"
                      >Respaldos</a>
                    </li>
                    <li>
                      <a
                        title="Retrovisores"
                        class="mtc-link"
                        href="/accesorios-moto/retrovisores"
                      >Retrovisores</a>
                    </li>
                    <li>
                      <a
                        title="Soportes matrículas"
                        class="mtc-link"
                        href="/accesorios-moto/soportes-matriculas"
                      >Soportes
                        matrículas</a>
                    </li>
                    <li>
                      <a
                        title="Tapas"
                        class="mtc-link"
                        href="/accesorios-moto/tapas"
                      >Tapas</a>
                    </li>
                    <li>
                      <a
                        title="Tapones depósito"
                        class="mtc-link"
                        href="/accesorios-moto/tapones-deposito"
                      >Tapones
                        depósito</a>
                    </li>
                    <li>
                      <a
                        title="Tijas"
                        class="mtc-link"
                        href="/accesorios-moto/tijas"
                      >Tijas</a>
                    </li>
                    <li>
                      <a
                        title="Tornillería"
                        class="mtc-link"
                        href="/accesorios-moto/tornilleria"
                      >Tornillería</a>
                    </li>
                    <li>
                      <a
                        title="Torretas"
                        class="mtc-link"
                        href="/accesorios-moto/torretas"
                      >Torretas</a>
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
                      <a
                        href="/vulcanet"
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
                          </span></a>
                    </li>
                    <li>
                      <a
                        href="/chigee"
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
                      </a>
                    </li>


                    <li>
                      <a
                        href="/sena"
                        class="mtc-link"
                      ><span lazy="true"><img
                        src="/content/assets/brands/brand-292.png"
                        class="cdn-img v-lazy-image v-lazy-image-loaded"
                        alt="Sena"
                        height="30"
                      > </span></a>
                    </li>
                    <li>
                      <a
                        href="/intercomunicadores-cardo"
                        class="mtc-link"
                      ><span lazy="true"><img
                        src="/content/assets/brands/brand-131.png"
                        class="cdn-img v-lazy-image v-lazy-image-loaded"
                        alt="Cardo"
                        width="59"
                        height="30"
                      > </span></a>
                    </li>
                    <li>
                      <a
                        href="/ram-mounts"
                        class="mtc-link"
                      ><span lazy="true"><img
                        src="/content/assets/brands/brand-570.png"
                        class="cdn-img v-lazy-image v-lazy-image-loaded"
                        alt="Ram Mounts"
                        width="59"
                        height="30"
                      > </span></a>
                    </li>

                    <li>
                      <a
                        href="/sp-connect"
                        class="mtc-link"
                      ><span lazy="true"><img
                        src="/content/assets/brands/brand-532.png"
                        class="cdn-img v-lazy-image v-lazy-image-loaded"
                        alt="SP Connect"
                        width="59"
                        height="30"
                      > </span></a>
                    </li>

                    <li>
                      <a
                        href="/kappa"
                        class="mtc-link"
                      ><span lazy="true"><img
                        src="/content/assets/brands/brand-514.png"
                        class="cdn-img v-lazy-image v-lazy-image-loaded"
                        alt="Kappa"
                        width="59"
                        height="30"
                      > </span></a>
                    </li>
                    <li>
                      <a
                        href="/liqui-moy"
                        class="mtc-link"
                      ><span lazy="true"><img
                        src="/content/assets/brands/brand-557.png"
                        class="cdn-img v-lazy-image v-lazy-image-loaded"
                        alt="lIQUI MOLY"
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
    </li>
  </ul>
</template>

<style lang="scss">

ul.five-columns {
  -moz-columns: 100px 5;
  columns: 100px 5;
}


#nav .submenu__outstanding-list ul li {
  margin-bottom: 3px;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

ul li.column2 a {
  font-size: 12px;
  padding: 4px 0;
  text-transform: capitalize;
}

</style>
