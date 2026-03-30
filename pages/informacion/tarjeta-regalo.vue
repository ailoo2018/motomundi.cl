<template>
  <div class="page-gift-cards bg-white">
    <VContainer
      class="py-10 py-md-16"
      max-width="1200"
    >
      <!-- HERO SECTION -->
      <VRow
        align="center"
        justify="space-between"
        class="mb-16"
      >
        <VCol
          cols="12"
          md="6"
          class="text-center text-md-left pr-md-10"
        >
          <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">
            Regala la <span class="text-brand">Libertad de Rodar</span>
          </h1>
          <p class="text-body-1 text-grey-darken-2 mb-8">
            La Gift Card de Motomundi es la forma perfecta de inspirar a esa persona especial. Déjales elegir el equipamiento, casco o accesorio que realmente necesitan para su próxima aventura en moto.
          </p>
          <VBtn
            size="x-large"
            class="bg-brand text-white font-weight-bold px-8"
            to="/motocicleta/342011-accesorios-motomundi-gift-card-100000"
            elevation="2"
            rounded="0"
            prepend-icon="tabler-cart"
          >
            Comprar Gift Card
            <!--
              Nota: En Vuetify 3 puro se usa prepend-icon o el slot por defecto.
              Usaremos el slot de icono de Tabler importado abajo para mejor control 
            -->
            <template #prepend>
              <IconGift
                class="mr-2"
                size="24"
              />
            </template>
          </VBtn>
        </VCol>
        <VCol
          cols="12"
          md="6"
          class="d-none d-md-flex justify-center"
        >
          <!-- Ilustración o representación visual de la Gift Card -->
          <VCard
            variant="text"
            width="100%"
            max-width="500"
            height="300"
            elevation="0"
          >
            <VImg src="/cms/giftcard.jpg" />
          </VCard>
        </VCol>
      </VRow>

      <!-- VENTAJAS SECTION -->
      <div class="mb-16">
        <h2 class="text-h4 font-weight-bold text-center mb-10">
          ¿Por qué regalar una Gift Card Motomundi?
        </h2>
        <VRow>
          <VCol
            v-for="(ventaja, index) in ventajas"
            :key="index"
            cols="12"
            sm="6"
            md="3"
          >
            <VCard
              flat
              class="text-center h-100 pa-4 bg-transparent"
            >
              <div class="d-flex justify-center mb-4 text-brand">
                <component
                  :is="ventaja.icon"
                  size="48"
                  stroke-width="1.5"
                />
              </div>
              <h3 class="text-h6 font-weight-bold mb-2">
                {{ ventaja.title }}
              </h3>
              <p class="text-body-2 text-grey-darken-1">
                {{ ventaja.description }}
              </p>
            </VCard>
          </VCol>
        </VRow>
      </div>

      <VDivider class="mb-16" />

      <!-- FAQs SECTION -->
      <div class="mb-16">
        <h2 class="text-h4 font-weight-bold text-center mb-10">
          Preguntas Frecuentes
        </h2>
        <VRow justify="center">
          <VCol
            cols="12"
            md="10"
          >
            <VExpansionPanels
              variant="accordion"
              elevation="0"
              class="border rounded-lg"
            >
              <VExpansionPanel
                v-for="(faq, index) in faqs"
                :key="index"
                class="border-bottom"
              >
                <VExpansionPanelTitle class="text-subtitle-1 font-weight-medium py-4">
                  {{ faq.question }}
                  <template #actions="{ expanded }">
                    <IconChevronDown
                      :class="{'rotate-180': expanded}"
                      class="text-grey transition-transform"
                    />
                  </template>
                </VExpansionPanelTitle>
                <VExpansionPanelText class="text-body-2 text-grey-darken-2 pb-4">
                  {{ faq.answer }}
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCol>
        </VRow>
      </div>

      <!-- CONDICIONES LEGALES -->
      <VRow justify="center">
        <VCol
          cols="12"
          md="10"
        >
          <VCard
            flat
            class="bg-grey-lighten-4 pa-6 rounded-lg"
          >
            <h3 class="text-subtitle-2 font-weight-bold text-grey-darken-3 mb-3">
              Términos y Condiciones
            </h3>
            <p
              class="text-caption text-grey-darken-2 text-justify"
              style="line-height: 1.6;"
            >
              Las Tarjetas de Regalo Motomundi solo se pueden adquirir y canjear en Pesos Chilenos (CLP).
              La Gift Card es un documento al portador; el comprador o beneficiario será el único responsable de su uso y custodia en caso de pérdida o robo.
              El valor de la Gift Card es el del momento de su activación y podrá usarse para efectuar compras hasta agotar su saldo, disminuyendo a medida que se realicen pedidos en www.motomundi.cl o en nuestra red de tiendas a nivel nacional.
              No es canjeable por dinero en efectivo y no se aceptarán devoluciones de la Tarjeta de Regalo.
              Los artículos adquiridos mediante esta tarjeta están sujetos a nuestras políticas habituales de cambios y devoluciones.
              El saldo existente se podrá consultar en nuestro sitio web durante el proceso de pago o directamente en la caja de nuestras sucursales.
              La Gift Card podrá ser utilizada única y exclusivamente en Chile.
              No se podrá adquirir una nueva Gift Card pagando con otra ya existente, y el sistema solo permite el uso de una (1) Gift Card por transacción.
            </p>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
// Importación de Tabler Icons para Vue
import {
  IconGift,
  IconMotorbike,
  IconBuildingStore,
  IconAdjustmentsAlt,
  IconInfinity,
  IconChevronDown,
} from '@tabler/icons-vue'

const ventajas = [
  {
    icon: IconAdjustmentsAlt,
    title: 'Elección del Importe',
    description: 'Tú decides cuánto regalar. Escoge montos cerrados desde $10.000 hasta $500.000 CLP.',
  },
  {
    icon: IconBuildingStore,
    title: '100% Omnicanal',
    description: 'Canjeable online en motomundi.cl y en cualquiera de nuestras tiendas físicas a lo largo de Chile.',
  },
  {
    icon: IconGift,
    title: 'Multiusos y Flexible',
    description: 'Válida para todo nuestro catálogo. Se puede usar en una o varias compras hasta agotar el saldo.',
  },
  {
    icon: IconInfinity,
    title: 'Sin Caducidad',
    description: 'La pasión por las motos no tiene fecha de vencimiento, nuestra tarjeta de regalo tampoco.',
  },
]

const faqs = [
  {
    question: '¿Qué es la Gift Card Motomundi?',
    answer: 'La Gift Card de Motomundi es la forma más fácil y segura de acertar cuando quieres hacer un regalo a un amante de las motocicletas, permitiéndole elegir exactamente lo que necesita.',
  },
  {
    question: '¿Cómo compro una Gift Card?',
    answer: 'Para compras online, simplemente elige el importe deseado (entre $10.000 y $500.000 CLP) y añádela al carrito como cualquier otro producto. Para comprar en una tienda física, indícale al vendedor en caja el monto que deseas cargar.',
  },
  {
    question: '¿Dónde puedo utilizar mi Gift Card?',
    answer: 'Puedes utilizarla libremente tanto en nuestra página web www.motomundi.cl como en cualquiera de nuestras tiendas físicas a lo largo de Chile. La tarjeta es exclusiva para el territorio chileno.',
  },
  {
    question: '¿Cómo y dónde se envía la tarjeta?',
    answer: 'La Gift Card virtual se envía por email de forma automática a la dirección de correo que nos indiques. Puedes enviarla directamente al correo del afortunado(a) o enviarla a tu propio correo para imprimirla y entregarla personalmente.',
  },
  {
    question: '¿Cuándo se descuenta el saldo de mi tarjeta?',
    answer: 'El saldo se descuenta inmediatamente tras la confirmación de la realización del pedido en la web o al pasar por caja en la tienda.',
  },
  {
    question: '¿La Gift Card puede combinarse con otras formas de pago?',
    answer: '¡Por supuesto! Si el valor de tu carrito de compras es superior al saldo disponible en tu Gift Card, puedes pagar la diferencia utilizando tarjetas de crédito, débito u otro medio de pago habilitado.',
  },
  {
    question: '¿Cómo puedo consultar mi saldo disponible?',
    answer: 'Puedes consultar tu saldo introduciendo el código de tu tarjeta en el checkout de motomundi.cl antes de pagar, o bien, consultando directamente con nuestros asesores en cualquier tienda física.',
  },
]
</script>

<style scoped>
/* Colores de marca y utilidades custom para no ensuciar el CSS global */
.text-brand {
  color: #B21915 !important;
}
.bg-brand {
  background-color: #B21915 !important;
}
.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}
.transition-transform {
  transition: transform 0.3s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}
.tracking-widest {
  letter-spacing: 0.2em;
}

/* Efecto sutil para la visualización de la tarjeta de regalo */
.gift-card-visual {
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  border: 1px solid #eeeeee;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
  position: relative;
  overflow: hidden;
}
/* Detalle estético para simular banda magnética o decoración de la tarjeta */
.gift-card-visual::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(178, 25, 21, 0.03));
  transform: skewX(-15deg);
}
</style>
