<template>
  <VContainer
    fluid
    class="pa-0 bg-white"
  >
    <!-- Hero Section -->
    <VContainer class="py-16 text-center">
      <VRow justify="center">
        <VCol
          cols="12"
          md="8"
        >
          <h1 class="text-h2 font-weight-bold mb-6">
            Nuestra <span class="brand-text">Historia</span>
          </h1>
          <p
            class="text-h5 text-grey-darken-1 mb-8"
            style="line-height: 1.6;"
          >
            Inspirando a la comunidad motociclista con los mejores productos y un servicio excepcional.
          </p>
        </VCol>
      </VRow>
    </VContainer>

    <!-- Act I: El Desvío -->
    <VContainer class="py-12">
      <VRow
        align="center"
        justify="space-between"
      >
        <VCol
          cols="12"
          md="5"
          class="order-2 order-md-1 mt-6 mt-md-0"
        >
          <div class="d-flex align-center mb-4">
            <Icon
              name="tabler:route"
              class="brand-text mr-3 text-h4"
            />
            <h2 class="text-h4 font-weight-bold">
              El Desvío
            </h2>
          </div>
          <p class="text-body-1 text-grey-darken-2 mb-4">
            En 2018, Juan Carlos Fuentes perseguía un sueño diferente. Como programador de corazón, su mirada estaba puesta en Redmond: quería trabajar para Microsoft. Pero cuando finalmente llegó la oportunidad, la respuesta fue un "no".
          </p>
          <p class="text-body-1 text-grey-darken-2">
            Al regresar a Chile, Juan Carlos enfrentó una crisis personal. Buscando despejar su mente y encontrar un nuevo rumbo, compró una motocicleta. No fue solo un pasatiempo; fue su terapia. Al buscar equipamiento de alta calidad, notó un gran vacío en el mercado chileno. Inspirado por el éxito digital de Revzilla en EE. UU., vio un camino claro: si no podía escribir código para Microsoft, construiría el mejor e-commerce para motociclistas en América Latina.
          </p>
        </VCol>
        <VCol
          cols="12"
          md="6"
          class="order-1 order-md-2"
        >
          <VImg
            src="https://placehold.co/800x600/eeeeee/a9a9a9?text=Juan+Carlos+y+su+primera+moto"
            alt="Juan Carlos Fuentes - El inicio"
            aspect-ratio="4/3"
            cover
            class="rounded-lg elevation-2"
          >
            <template #placeholder>
              <VRow
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <VProgressCircular
                  indeterminate
                  color="#B21915"
                />
              </VRow>
            </template>
          </VImg>
        </VCol>
      </VRow>
    </VContainer>

    <!-- Act II: El Gran Giro -->
    <VContainer class="py-12">
      <VRow
        align="center"
        justify="space-between"
      >
        <VCol
          cols="12"
          md="6"
        >
          <VImg
            src="https://placehold.co/800x600/eeeeee/a9a9a9?text=La+pequeña+tienda+en+Bocaccio"
            alt="La primera tienda en Las Condes"
            aspect-ratio="4/3"
            cover
            class="rounded-lg elevation-2"
          >
            <template #placeholder>
              <VRow
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <VProgressCircular
                  indeterminate
                  color="#B21915"
                />
              </VRow>
            </template>
          </VImg>
        </VCol>
        <VCol
          cols="12"
          md="5"
          class="mt-6 mt-md-0"
        >
          <div class="d-flex align-center mb-4">
            <Icon
              name="tabler:arrows-split"
              class="brand-text mr-3 text-h4"
            />
            <h2 class="text-h4 font-weight-bold">
              El Pequeño Local y el Gran Giro
            </h2>
          </div>
          <p class="text-body-1 text-grey-darken-2 mb-4">
            Junto a Paulina Silva, lanzó www.motomundi.cl y abrieron una diminuta tienda física en la calle Bocaccio, en Las Condes. Intentaron abarcar todo: venta de motocicletas, ropa y accesorios.
          </p>
          <p class="text-body-1 text-grey-darken-2">
            Pero el camino fue más duro de lo previsto. A los seis meses, Motomundi estaba al borde de la desaparición. Entonces, ocurrió un punto de inflexión: Motolife se acercó con una propuesta para compartir su espacio comercial. Fue el "milagro" que necesitaban. Juan Carlos y Paulina tomaron la decisión estratégica de dejar de vender motos y enfocarse enteramente en lo que hacían mejor: ofrecer el mejor equipamiento y accesorios de clase mundial.
          </p>
        </VCol>
      </VRow>
    </VContainer>

    <!-- YouTube Section: 100K Celebration -->
    <VContainer class="py-16">
      <VCard class="rounded-xl overflow-hidden elevation-4 border-brand">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="5"
            class="d-flex flex-column justify-center pa-8 pa-md-12 bg-grey-lighten-4"
          >
            <Icon
              name="tabler:brand-youtube"
              class="brand-text text-h1 mb-4"
            />
            <h3 class="text-h4 font-weight-bold mb-4">
              Construyendo una Comunidad
            </h3>
            <p class="text-body-1 text-grey-darken-2 mb-6">
              Motomundi no solo quería vender productos; queríamos compartir la ruta. Aprovechando la experiencia tecnológica de Juan Carlos y nuestra pasión por contar historias, apostamos todo a la creación de contenido. A través de reseñas honestas, bitácoras de viaje y guías técnicas, convertimos una tienda en una comunidad.
            </p>
            <VChip
              color="#B21915"
              class="text-white font-weight-bold align-self-start mb-2"
              size="large"
            >
              ¡Más de 500,000 Suscriptores!
            </VChip>
            <p class="text-caption text-grey-darken-1">
              Revive con nosotros el hito donde celebramos nuestros primeros 100K.
            </p>
          </VCol>
          <VCol
            cols="12"
            md="7"
          >
            <!-- Replace the src URL with your actual 100k celebration youtube embed link -->
            <VResponsive
              aspect-ratio="16/9"
              class="h-100"
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder"
                title="Celebración 100K Suscriptores Motomundi"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="border: none; display: block;"
              />
            </VResponsive>
          </VCol>
        </VRow>
      </VCard>
    </VContainer>

    <!-- Today: A Vision Realized -->
    <VContainer class="py-12 mb-12">
      <VRow
        justify="center"
        class="text-center mb-10"
      >
        <VCol
          cols="12"
          md="8"
        >
          <Icon
            name="tabler:map-pin-check"
            class="brand-text text-h2 mb-4"
          />
          <h2 class="text-h3 font-weight-bold mb-6">
            Hoy: Una Visión Hecha Realidad
          </h2>
          <p class="text-h6 text-grey-darken-1 font-weight-regular">
            Lo que comenzó como una pequeña tienda en Las Condes se ha expandido a 8 sucursales a lo largo de Chile, ganándose la reputación de ser una autoridad líder en el mundo del motociclismo en toda América Latina.
          </p>
        </VCol>
      </VRow>

      <VRow justify="center">
        <VCol
          cols="12"
          sm="10"
          md="8"
        >
          <VCard class="pa-8 text-center bg-grey-lighten-4 rounded-lg elevation-0 border-top-brand">
            <Icon
              name="tabler:quote"
              class="text-grey-lighten-1 text-h2 mb-2"
            />
            <p class="text-h5 font-italic text-grey-darken-3 font-weight-medium">
              "En Motomundi creemos que a veces, cuando una puerta se cierra, el camino abierto comienza."
            </p>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VContainer>
</template>

<script setup lang="ts">
// El componente está listo para integrarse en tu layout actual.
// No se han definido fuentes personalizadas para heredar las globales.
// Los íconos asumen que estás usando la integración estándar de Nuxt (ej. nuxt-icon).
</script>

<style scoped>
/* Utilidades específicas para mantener el color de marca #B21915 de Motomundi */
.brand-text {
  color: #B21915 !important;
}

.bg-brand {
  background-color: #B21915 !important;
}

.border-brand {
  border: 1px solid rgba(178, 25, 21, 0.2) !important;
}

.border-top-brand {
  border-top: 4px solid #B21915 !important;
}
</style>
