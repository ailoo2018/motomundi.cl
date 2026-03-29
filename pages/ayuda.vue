<template>
  <v-app>
    <!-- Sección Hero / Buscador -->
    <section class="hero-bg py-10 py-md-16">
      <v-container>
        <v-row justify="center" align="center" class="text-center">
          <v-col cols="12" md="8" lg="7">
            <h1
              class="text-h4 text-md-h3 font-weight-black mb-4 text-grey-darken-4"
              style="letter-spacing: -1px"
            >
              ¿Problemas en la ruta? <br />
              <span class="text-primary">Te ayudamos a seguir.</span>
            </h1>

            <p
              class="text-body-1 text-md-h6 text-grey-darken-1 mb-8 font-weight-regular px-md-4"
              style="line-height: 1.6"
            >
              Queremos que tu única preocupación sea disfrutar el viaje.
              Encuentra aquí respuestas rápidas sobre envíos, cambios,
              devoluciones y pagos.
            </p>

            <v-text-field
              v-model="searchQuery"
              placeholder="Busca tu duda... ej: ¿Cómo hacer un cambio?"
              variant="outlined"
              color="primary"
              bg-color="white"
              rounded="lg"
              clearable
              hide-details
              class="mx-auto"
              style="max-width: 600px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)"
            >
              <template #prepend-inner>
                <i
                  class="ti ti-search text-grey-darken-1 mr-2"
                  style="font-size: 22px"
                />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Sección de Categorías -->
    <v-container class="py-12">
      <!-- Grid de Tarjetas -->
      <v-row v-if="filteredCategories.length > 0">
        <v-col
          v-for="(category, index) in filteredCategories"
          :key="index"
          cols="12"
          sm="6"
          lg="4"
          class="mb-2"
        >
          <v-card class="help-card pa-4" elevation="0">
            <v-card-item class="pb-2">
              <template #prepend>
                <v-avatar
                  color="primary"
                  variant="tonal"
                  rounded="lg"
                  size="52"
                  class="mr-3"
                >
                  <i :class="'ti ' + category.icon" style="font-size: 28px" />
                </v-avatar>
              </template>
              <v-card-title
                class="text-h6 font-weight-bold text-grey-darken-4"
                style="line-height: 1.2"
              >
                {{ category.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="pt-3">
              <v-list density="compact" class="bg-transparent pa-0">
                <v-list-item
                  v-for="(link, lIndex) in category.links"
                  :key="lIndex"
                  class="px-0"
                  :ripple="false"
                >
                  <template #prepend>
                    <i
                      class="ti ti-point-filled text-grey-lighten-1 mr-2"
                      style="font-size: 12px"
                    />
                  </template>
                  <!-- Replace href with NuxtLink when routes are available -->
                  <a href="#" class="link-item" @click.prevent>{{ link }}</a>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Estado Vacío -->
      <v-row v-else justify="center" align="center" class="py-16">
        <v-col cols="12" class="text-center">
          <v-avatar color="grey-lighten-4" size="100" class="mb-4">
            <i
              class="ti ti-zoom-cancel text-grey-lighten-1"
              style="font-size: 48px"
            />
          </v-avatar>
          <h3 class="text-h5 font-weight-bold text-grey-darken-3">
            No encontramos resultados
          </h3>
          <p class="text-body-1 text-grey-darken-1 mt-2">
            Intenta buscar con otras palabras o navega por las categorías.
          </p>
          <v-btn
            color="primary"
            variant="tonal"
            class="mt-6 text-none font-weight-bold"
            rounded="pill"
            @click="searchQuery = ''"
          >
            Ver todas las categorías
          </v-btn>
        </v-col>
      </v-row>

      <!-- CTA de Soporte Directo -->
      <v-row justify="center" class="mt-16">
        <v-col cols="12" md="10">
          <v-card
            color="grey-lighten-4"
            rounded="xl"
            elevation="0"
            class="pa-8 pa-md-10 text-center text-md-left border"
          >
            <v-row align="center">
              <v-col cols="12" md="8">
                <h3 class="text-h5 font-weight-bold mb-2 text-grey-darken-4">
                  ¿No encontraste lo que buscabas?
                </h3>
                <p class="text-body-1 text-grey-darken-2 mb-0">
                  Nuestro equipo de soporte experto está en boxes listo para
                  asistirte en lo que necesites.
                </p>
              </v-col>
              <v-col cols="12" md="4" class="text-md-right mt-6 mt-md-0">
                <v-btn
                  color="primary"
                  size="x-large"
                  rounded="pill"
                  elevation="2"
                  class="text-none font-weight-bold"
                >
                  <template #prepend>
                    <i class="ti ti-headset mr-1" style="font-size: 22px" />
                  </template>
                  Contactar Soporte
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface HelpCategory {
  title: string
  icon: string
  links: string[]
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const searchQuery = ref<string>('')

const categories = ref<HelpCategory[]>([
  {
    title: 'Tu Pedido y Envío',
    icon: 'tabler-box-seam',
    links: [
      'Seguimiento de pedidos',
      'Plazos de entrega',
      'Gastos de envío',
      'Formas de pago',
    ],
  },
  {
    title: 'Cambios y Garantías',
    icon: 'tabler-refresh-alert',
    links: [
      'Realizar un cambio, devolución o anulación',
      'Tramitar una garantía',
      'Condiciones servicios postventa',
    ],
  },
  {
    title: 'Tu Cuenta y Beneficios',
    icon: 'tabler-user-star',
    links: [
      'Registro de usuarios',
      'FAQ Mundipesos',
      'Nuestros códigos promocionales',
      'Garantía de precio mínimo',
    ],
  },
  {
    title: 'Antes de Comprar',
    icon: 'tabler-ruler-measure',
    links: ['Guías de tallas', 'Atención al cliente', 'Información y horarios'],
  },
  {
    title: 'Sobre Motomundi',
    icon: 'tabler-building-store',
    links: ['Quiénes Somos', 'Trabaja con nosotros'],
  },
  {
    title: 'Legal y Políticas',
    icon: 'tabler-shield-lock',
    links: [
      'Términos y condiciones',
      'Política de privacidad',
      'Política de precios',
      'Política de cookies',
      'Aviso legal',
      'Código ético',
    ],
  },
])

// ---------------------------------------------------------------------------
// Computed
// ---------------------------------------------------------------------------
const filteredCategories = computed<HelpCategory[]>(() => {
  if (!searchQuery.value) return categories.value

  const query = searchQuery.value.toLowerCase().trim()

  return categories.value
    .map((cat) => ({
      ...cat,
      links: cat.links.filter((link) => link.toLowerCase().includes(query)),
    }))
    .filter(
      (cat) =>
        cat.title.toLowerCase().includes(query) || cat.links.length > 0,
    )
})
</script>

<style scoped>
/* ------------------------------------------------------------------ */
/* Layout Hero                                                          */
/* ------------------------------------------------------------------ */
.hero-bg {
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
  border-bottom: 3px solid #f0f0f0;
  position: relative;
}

.hero-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #b21915; /* Acento rojo corporativo */
}

/* ------------------------------------------------------------------ */
/* Tarjetas de ayuda                                                   */
/* ------------------------------------------------------------------ */
.help-card {
  transition: all 0.2s ease-in-out;
  height: 100%;
  border-radius: 12px !important;
  border: 1px solid #e0e0e0 !important;
}

.help-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06) !important;
  border-color: #b21915 !important;
}

/* ------------------------------------------------------------------ */
/* Links internos                                                       */
/* ------------------------------------------------------------------ */
.link-item {
  color: #555555;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-block;
  width: 100%;
}

.link-item:hover {
  color: #b21915;
}

/* ------------------------------------------------------------------ */
/* Ajuste densidad lista Vuetify                                        */
/* ------------------------------------------------------------------ */
:deep(.v-list-item--density-compact) {
  min-height: 36px !important;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
