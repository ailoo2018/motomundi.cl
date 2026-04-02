<template>
  <div class="envios-page">

    <!-- Hero Banner -->
    <div class="hero-banner">
      <div class="hero-content">
        <div class="hero-eyebrow">
          <IconWorld :size="18" stroke-width="1.5" />
          <span>Motomundi Global</span>
        </div>
        <h1 class="hero-title">Envíos Internacionales</h1>
        <p class="hero-subtitle">
          Llevamos tu equipamiento a donde sea que ruedes. Transparencia total en costos, sin sorpresas.
        </p>
      </div>
      <div class="hero-stripe" />
    </div>

    <v-container class="page-container" max-width="960">

      <!-- Shipping Cost Cards -->
      <section class="section">
        <h2 class="section-title">Costos de Envío</h2>
        <v-row class="mt-2" :gutter="0">

          <!-- Free Shipping -->
          <v-col cols="12" md="6" class="pa-2">
            <div class="shipping-card shipping-card--free">
              <div class="card-badge card-badge--free">GRATIS</div>
              <div class="card-icon-wrap card-icon-wrap--free">
                <IconPackage :size="36" stroke-width="1.2" />
              </div>
              <div class="card-body">
                <p class="card-condition">Compras sobre</p>
                <p class="card-amount">US$ 300</p>
                <p class="card-desc">
                  El envío está completamente cubierto por Motomundi. Compra con tranquilidad y recibirás tu pedido sin costo adicional de flete.
                </p>
              </div>
              <div class="card-footer">
                <IconCircleCheck :size="16" stroke-width="2" />
                <span>Sin costo de envío</span>
              </div>
            </div>
          </v-col>

          <!-- Fixed Cost Shipping -->
          <v-col cols="12" md="6" class="pa-2">
            <div class="shipping-card shipping-card--fixed">
              <div class="card-icon-wrap card-icon-wrap--fixed">
                <IconTruckDelivery :size="36" stroke-width="1.2" />
              </div>
              <div class="card-body">
                <p class="card-condition">Compras bajo</p>
                <p class="card-amount card-amount--dark">US$ 300</p>
                <p class="card-desc">
                  Se aplica un costo de envío fijo para cubrir el flete internacional. Este valor es único e independiente de la cantidad de productos.
                </p>
              </div>
              <div class="card-footer card-footer--dark">
                <VIcon icon="tabler-coin-dollar" :size="16" stroke-width="2" />
                <span>Envío fijo de US$ 35</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- Customs Info -->
      <section class="section">
        <h2 class="section-title">Aranceles e Impuestos de Aduana</h2>
        <div class="customs-block">
          <div class="customs-icon">
            <IconBuildingBank :size="40" stroke-width="1.1" />
          </div>
          <div class="customs-content">
            <h3 class="customs-title">El cliente es responsable de los cargos aduaneros</h3>
            <p class="customs-desc">
              Motomundi despacha todos los pedidos con documentación completa y declaración de valor real. Sin embargo, <strong>los aranceles, impuestos de importación y cualquier cargo aduanero son de exclusiva responsabilidad del destinatario</strong> y deben ser cancelados directamente en el país de destino.
            </p>
            <div class="customs-tips">
              <div class="tip-item">
                <IconAlertTriangle :size="15" stroke-width="2" class="tip-icon tip-icon--warn" />
                <span>Motomundi no prepaga ni reembolsa cargos de aduana bajo ninguna circunstancia.</span>
              </div>
              <div class="tip-item">
                <IconInfoCircle :size="15" stroke-width="2" class="tip-icon tip-icon--info" />
                <span>Los montos varían según el país de destino, el tipo de producto y la normativa vigente. Te recomendamos consultar con tu aduana local antes de comprar.</span>
              </div>
              <div class="tip-item">
                <IconClockHour4 :size="15" stroke-width="2" class="tip-icon tip-icon--info" />
                <span>El despacho aduanero puede extender los tiempos de entrega. Los plazos indicados en tu pedido son de referencia y no incluyen posibles demoras en aduana.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Special Conditions -->
      <section class="section">
        <h2 class="section-title">Condiciones Especiales por Tipo de Producto</h2>

        <!-- Bulky Products -->
        <div class="special-block special-block--consult">
          <div class="special-header">
            <div class="special-icon">
              <IconDimensions :size="28" stroke-width="1.3" />
            </div>
            <div>
              <h3 class="special-title">Productos Voluminosos o de Gran Tamaño</h3>
              <p class="special-subtitle">Condiciones diferenciadas aplican</p>
            </div>
            <div class="consult-badge">
              <IconMessageQuestion :size="14" stroke-width="2" />
              Consultar
            </div>
          </div>
          <p class="special-desc">
            Los siguientes productos están sujetos a condiciones de envío especiales debido a su volumen, peso o características de embalaje:
          </p>
          <div class="special-product-tags">
            <span class="special-product-tag">
              <IconBike :size="14" stroke-width="2" /> Bicicletas
            </span>
            <span class="special-product-tag">
              <IconEngine :size="14" stroke-width="2" /> Tubos de Escape
            </span>
            <span class="special-product-tag">
              <IconCircle :size="14" stroke-width="2" /> Neumáticos
            </span>
            <span class="special-product-tag">
              <IconAdjustments :size="14" stroke-width="2" /> Cuadros de Bicicleta
            </span>
            <span class="special-product-tag">
              <IconPackages :size="14" stroke-width="2" /> Otros Productos Voluminosos
            </span>
          </div>
          <div class="consult-cta">
            <VIcon class="tabler-brand-whatsapp" :size="16" stroke-width="1.8" />
            <span>¿Tienes dudas sobre tu producto?
              <a href="https://api.whatsapp.com/send?phone=15558366927&amp;text=¡Hola!"
                 target="_blank"

                 class="cta-link">Contáctanos antes de comprar</a> y te entregamos una cotización personalizada.</span>
          </div>
        </div>

        <!-- Imperfectos -->
        <div class="special-block special-block--imperfect mt-4">
          <div class="special-header">
            <div class="special-icon special-icon--imperfect">
              <IconRosetteDiscount :size="28" stroke-width="1.3" />
            </div>
            <div>
              <h3 class="special-title">Sección "Imperfectos"</h3>
              <p class="special-subtitle">Condiciones específicas de despacho</p>
            </div>
          </div>
          <p class="special-desc">
            Los productos listados en nuestra sección <strong>"Imperfectos"</strong> ofrecen precios especiales por presentar detalles estéticos menores. Para envíos internacionales de estos productos, considera lo siguiente:
          </p>
          <div class="imperfect-rules">
            <div class="rule-item rule-item--included">
              <IconTruckDelivery :size="18" stroke-width="1.8" />
              <div>
                <strong>Gastos de transporte siempre incluidos</strong>
                <p>Todo producto de la sección Imperfectos lleva asociado un costo de envío, el cual se informará claramente antes de confirmar tu compra.</p>
              </div>
            </div>
            <div class="rule-item rule-item--no">
              <IconArrowsExchange :size="18" stroke-width="1.8" />
              <div>
                <strong>No se aceptan cambios</strong>
                <p>Debido a su naturaleza, los productos imperfectos no admiten cambios por talla, color u otro motivo.</p>
              </div>
            </div>
            <div class="rule-item rule-item--yes">
              <IconRotate :size="18" stroke-width="1.8" />
              <div>
                <strong>Devoluciones sí son aceptadas</strong>
                <p>Si el producto no cumple con lo descrito o presenta un defecto no informado, puedes solicitar una devolución siguiendo nuestro proceso estándar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Delivery Info -->
      <section class="section">
        <h2 class="section-title">Información Adicional de Envío</h2>
        <v-row>
          <v-col v-for="item in deliveryInfo" :key="item.title" cols="12" sm="6" class="pa-2">
            <div class="info-card">
              <div class="info-card-icon">
                <component :is="item.icon" :size="22" stroke-width="1.5" />
              </div>
              <div>
                <h4 class="info-card-title">{{ item.title }}</h4>
                <p class="info-card-desc">{{ item.desc }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="cta-inner">
          <IconHeadset :size="32" stroke-width="1.2" class="cta-icon" />
          <div>
            <h3 class="cta-title">¿Tienes dudas sobre tu envío internacional?</h3>
            <p class="cta-desc">Nuestro equipo está listo para ayudarte con cotizaciones, tiempos estimados y cualquier consulta antes de tu compra.</p>
          </div>
          <a href="https://api.whatsapp.com/send?phone=15558366927&amp;text=¡Hola!" target="_blank" class="cta-btn">
            <VIcon class="tabler-brand-whatsapp" :size="16" stroke-width="2" />
            Contactar al equipo
          </a>
        </div>
      </section>

    </v-container>
  </div>
</template>

<script setup>
import {
  IconWorld,
  IconPackage,
  IconTruckDelivery,

  IconBuildingBank,
  IconAlertTriangle,
  IconInfoCircle,
  IconClockHour4,
  IconDimensions,
  IconMessageQuestion,
  IconBike,
  IconEngine,
  IconCircle,
  IconAdjustments,
  IconPackages,
  IconMail,
  IconRosetteDiscount,
  IconArrowsExchange,
  IconRotate,
  IconHeadset,
  IconCircleCheck,
  IconShieldCheck,
  IconBarcode,
  IconMapPin,
  IconClock,
} from '@tabler/icons-vue'

const deliveryInfo = [
  {
    icon: IconClock,
    title: 'Tiempos de Entrega',
    desc: 'Los plazos estimados varían entre 7 y 21 días hábiles según el país de destino, una vez despachado el pedido desde Chile.',
  },
  {
    icon: IconBarcode,
    title: 'Seguimiento en Tiempo Real',
    desc: 'Al despachar tu pedido recibirás un número de tracking para rastrear tu envío en todo momento a través del operador logístico.',
  },
  {
    icon: IconShieldCheck,
    title: 'Seguro de Transporte',
    desc: 'Todos los envíos incluyen seguro básico contra pérdida o daño durante el transporte. Consulta coberturas adicionales si necesitas mayor protección.',
  },
  {
    icon: IconMapPin,
    title: 'Cobertura Internacional',
    desc: 'Enviamos a la mayoría de los países de América Latina, América del Norte y Europa. Para destinos especiales, contáctanos para verificar disponibilidad.',
  },
]
</script>

<style scoped>
/* ── Brand tokens ─────────────────────────────── */
:root {
  --mm-red: #B21915;
  --mm-red-dark: #8c1210;
  --mm-red-light: #fdf2f2;
  --mm-text: #1a1a1a;
  --mm-muted: #6b7280;
  --mm-border: #e5e7eb;
  --mm-surface: #f9fafb;
}

/* ── Page wrapper ─────────────────────────────── */
.envios-page {
  background: #fff;
  min-height: 100vh;
  padding-bottom: 60px;
}

/* ── Hero ─────────────────────────────────────── */
.hero-banner {
  position: relative;
  background: var(--mm-red, #B21915);
  overflow: hidden;
  padding: 56px 32px 48px;
}

.hero-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      -55deg,
      transparent,
      transparent 28px,
      rgba(0,0,0,0.07) 28px,
      rgba(0,0,0,0.07) 30px
    );
  pointer-events: none;
}

.hero-banner::after {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px;
  padding: 4px 14px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.hero-title {
  color: #fff;
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 14px;
}

.hero-subtitle {
  color: rgba(255,255,255,0.82);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

.hero-stripe {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255,255,255,0.2);
}

/* ── Page Container ───────────────────────────── */
.page-container {
  padding-top: 48px !important;
}

/* ── Sections ─────────────────────────────────── */
.section {
  margin-bottom: 52px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--mm-text, #1a1a1a);
  letter-spacing: -0.01em;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--mm-border, #e5e7eb);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--mm-red, #B21915);
}

/* ── Shipping Cards ───────────────────────────── */
.shipping-card {
  border-radius: 12px;
  padding: 28px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.shipping-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.shipping-card--free {
  background: var(--mm-red, #B21915);
  color: #fff;
}

.shipping-card--fixed {
  background: var(--mm-surface, #f9fafb);
  border: 1px solid var(--mm-border, #e5e7eb);
  color: var(--mm-text, #1a1a1a);
}

.card-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 3px 10px;
  border-radius: 20px;
}

.card-badge--free {
  background: rgba(255,255,255,0.2);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.35);
}

.card-icon-wrap {
  margin-bottom: 16px;
}

.card-icon-wrap--free {
  opacity: 0.85;
  color: #fff;
}

.card-icon-wrap--fixed {
  color: var(--mm-red, #B21915);
}

.card-condition {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
  margin: 0 0 4px;
}

.card-amount {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 12px;
  line-height: 1;
}

.card-amount--dark {
  color: var(--mm-text, #1a1a1a);
}

.card-body {
  flex: 1;
}

.card-desc {
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.2);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.card-footer--dark {
  border-top-color: var(--mm-border, #e5e7eb);
  color: var(--mm-red, #B21915);
}

/* ── Customs Block ────────────────────────────── */
.customs-block {
  display: flex;
  gap: 24px;
  background: #fffbf0;
  border: 1px solid #f0e0a0;
  border-left: 4px solid #d4a017;
  border-radius: 10px;
  padding: 28px;
}

.customs-icon {
  flex-shrink: 0;
  color: #b8860b;
  padding-top: 2px;
}

.customs-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--mm-text, #1a1a1a);
  margin: 0 0 8px;
}

.customs-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--mm-muted, #6b7280);
  margin: 0 0 16px;
}

.customs-tips {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--mm-muted, #6b7280);
}

.tip-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.tip-icon--warn { color: #d97706; }
.tip-icon--info { color: #3b82f6; }

/* ── Special Blocks ───────────────────────────── */
.special-block {
  border-radius: 10px;
  border: 1px solid var(--mm-border, #e5e7eb);
  padding: 24px 28px;
}

.special-block--consult {
  background: #f8f9fa;
}

.special-block--imperfect {
  background: #fff;
}

.special-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.special-icon {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: var(--mm-red-light, #fdf2f2);
  color: var(--mm-red, #B21915);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.special-icon--imperfect {
  background: #f0f9ff;
  color: #0ea5e9;
}

.special-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--mm-text, #1a1a1a);
  margin: 0 0 2px;
}

.special-subtitle {
  font-size: 12px;
  color: var(--mm-muted, #6b7280);
  margin: 0;
  font-weight: 500;
}

.consult-badge {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--mm-red, #B21915);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 20px;
  flex-shrink: 0;
  white-space: nowrap;
}

.special-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--mm-muted, #6b7280);
  margin: 0 0 16px;
}

.special-product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.special-product-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #fff;
  border: 1px solid var(--mm-border, #e5e7eb);
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--mm-text, #1a1a1a);
}

.consult-cta {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #fff;
  border: 1px dashed var(--mm-red, #B21915);
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 13px;
  color: var(--mm-muted, #6b7280);
  line-height: 1.5;
}

.consult-cta svg {
  color: var(--mm-red, #B21915);
  flex-shrink: 0;
  margin-top: 1px;
}

.cta-link {
  color: var(--mm-red, #B21915);
  font-weight: 600;
  text-decoration: none;
}

.cta-link:hover {
  text-decoration: underline;
}

/* ── Imperfect Rules ──────────────────────────── */
.imperfect-rules {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;
}

.rule-item strong {
  display: block;
  font-size: 14px;
  margin-bottom: 2px;
}

.rule-item p {
  margin: 0;
  color: var(--mm-muted, #6b7280);
}

.rule-item--included {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.rule-item--included svg { color: #16a34a; flex-shrink: 0; margin-top: 2px; }

.rule-item--no {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  color: #9f1239;
}

.rule-item--no svg { color: #e11d48; flex-shrink: 0; margin-top: 2px; }

.rule-item--yes {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
}

.rule-item--yes svg { color: #2563eb; flex-shrink: 0; margin-top: 2px; }

/* ── Info Cards ───────────────────────────────── */
.info-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: var(--mm-surface, #f9fafb);
  border: 1px solid var(--mm-border, #e5e7eb);
  border-radius: 10px;
  padding: 18px;
  height: 100%;
}

.info-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--mm-red-light, #fdf2f2);
  color: var(--mm-red, #B21915);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-card-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--mm-text, #1a1a1a);
  margin: 0 0 4px;
}

.info-card-desc {
  font-size: 13px;
  line-height: 1.55;
  color: var(--mm-muted, #6b7280);
  margin: 0;
}

/* ── CTA Section ──────────────────────────────── */
.cta-section {
  margin-top: 8px;
}

.cta-inner {
  background: var(--mm-red, #B21915);
  border-radius: 14px;
  padding: 32px 36px;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
}

.cta-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 28px,
    rgba(0,0,0,0.06) 28px,
    rgba(0,0,0,0.06) 30px
  );
  pointer-events: none;
}

.cta-icon {
  color: rgba(255,255,255,0.6);
  flex-shrink: 0;
  position: relative;
}

.cta-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
  position: relative;
}

.cta-desc {
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  margin: 0;
  line-height: 1.5;
  position: relative;
}

.cta-inner > div {
  flex: 1;
  min-width: 200px;
  position: relative;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: var(--mm-red, #B21915);
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;
  transition: background 0.15s, transform 0.15s;
}

.cta-btn:hover {
  background: #f7f7f7;
  transform: translateY(-1px);
}

/* ── Responsive ───────────────────────────────── */
@media (max-width: 600px) {
  .hero-banner {
    padding: 40px 20px 36px;
  }

  .customs-block {
    flex-direction: column;
    gap: 16px;
  }

  .special-header {
    flex-wrap: wrap;
  }

  .consult-badge {
    margin-left: 0;
  }

  .cta-inner {
    padding: 24px 20px;
    gap: 16px;
  }

  .cta-icon {
    display: none;
  }
}
</style>
