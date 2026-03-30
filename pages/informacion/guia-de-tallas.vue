<script setup lang="ts">
import {
  IconRuler,
  IconRuler2,
  IconHelmet,
  IconHanger,

  IconShoe,
  IconMan,
  IconCircleCheck,
  IconAlertTriangle,
  IconInfoCircle,
  IconArrowRight,
  IconClick,
  IconPointer,
  IconZoomIn,
  IconMessageCircle,
  IconMail,
  IconBrandWhatsapp,
  IconShieldCheck,
  IconStar,
  IconChevronDown,
  IconDeviceMobile,
  IconMapPin,
  IconArrowDown,
  IconBolt,
  IconBulb,
  IconListCheck, IconHandSanitizer, IconHandStop,
} from '@tabler/icons-vue'

useHead({
  title: 'Guía de Tallas | Motomundi',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500;600&display=swap',
    },
  ],
})

const categorias = [
  {
    icon: IconHelmet,
    title: 'Cascos',
    medicion: 'Perímetro craneal',
    instrucciones: [
      'Coloca una cinta métrica alrededor de tu cabeza, justo sobre las orejas y a 1–2 cm por encima de las cejas.',
      'Mantén la cinta nivelada y ajustada, sin apretar demasiado.',
      'Anota la medida en centímetros y búscala en la tabla de tallas del producto.',
    ],
    tip: 'Si tu medida queda entre dos tallas, elige siempre la más pequeña. Los cascos amoldan ligeramente con el uso. Pruébalo en casa antes de usarlo en moto.',
    unidad: 'cm (perímetro)',
    color: 'red',
  },
  {
    icon: IconHanger,
    title: 'Chaquetas y Pantalones',
    medicion: 'Pecho, cintura y cadera',
    instrucciones: [
      'Pecho: mide alrededor de la parte más ancha del torso, por debajo de las axilas.',
      'Cintura: mide en la parte más estrecha del abdomen, generalmente a la altura del ombligo.',
      'Cadera: mide alrededor de la parte más ancha de las caderas.',
    ],
    tip: 'Las tallas de ropa de moto pueden diferir de tu ropa habitual. Consulta siempre la tabla específica del producto, ya que cada marca tiene su propio corte y sistema de tallas.',
    unidad: 'cm (contorno)',
    color: 'dark',
  },
  {
    icon: IconHandStop,
    title: 'Guantes',
    medicion: 'Contorno de la mano',
    instrucciones: [
      'Cierra la mano con suavidad, sin apretar el puño.',
      'Mide el contorno de la mano en la parte más ancha, justo por debajo de los nudillos, sin incluir el pulgar.',
      'Consulta la tabla del producto: algunos fabricantes usan cm, otros usan tallas S/M/L o numeración europea.',
    ],
    tip: 'Un guante bien ajustado no debe quedar holgado ni apretar los nudillos. Si tienes los dedos muy largos en relación al contorno, opta por la talla mayor.',
    unidad: 'cm (contorno mano)',
    color: 'dark',
  },
  {
    icon: IconShoe,
    title: 'Botas',
    medicion: 'Longitud del pie',
    instrucciones: [
      'Apoya el pie descalzo sobre una hoja de papel y marca el talón y el dedo más largo.',
      'Mide la distancia entre ambas marcas en centímetros.',
      'Compara tu medida con la tabla del producto. Las botas de moto suelen usar talla europea (EU).',
    ],
    tip: 'Para calcetines gruesos o plantillas de protección, considera subir media talla. Si estás entre dos tallas, sube a la mayor para mayor comodidad en trayectos largos.',
    unidad: 'cm (longitud pie)',
    color: 'red',
  },
]

const consejos = [
  { icon: IconRuler2,    title: 'Usa una cinta métrica flexible',  desc: 'Una cinta de costura es más precisa que una regla rígida. Asegúrate de que esté bien posicionada y sin dobleces.' },
  { icon: IconListCheck, title: 'Mide sobre ropa interior',         desc: 'Para obtener medidas exactas, mide siempre directamente sobre el cuerpo o sobre ropa muy fina. No incluyas capas gruesas.' },
  { icon: IconBulb,      title: 'Consulta la tabla de cada producto', desc: 'Cada fabricante tiene su propia escala. No asumas que tu talla habitual aplica para todas las marcas.' },
  { icon: IconShieldCheck, title: 'Prueba en casa antes de usar en moto', desc: 'Una vez recibido tu producto, pruébalo en casa sobre una alfombra, sin sacar etiquetas, antes de salir a rodar.' },
]
</script>

<template>
  <div class="tallas-page">

    <!-- ─── HERO ─── -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-eyebrow">Información de compra</div>
        <h1>Guía de<br /><em>Tallas</em></h1>
        <p>Encontrar la talla correcta es fundamental para tu seguridad y comodidad sobre la moto. En Motomundi, cada producto tiene su propia guía de tallas adaptada al fabricante.</p>
      </div>
    </section>

    <!-- ─── INTRO ─── -->
    <section class="intro-section">
      <div class="intro-grid">
        <div class="intro-text">
          <span class="section-label">¿Cómo funciona?</span>
          <h2 class="section-title">Una Guía por<br /><em>Cada Producto</em></h2>
          <p class="intro-desc">
            En Motomundi no utilizamos una guía de tallas única y genérica porque cada fabricante
            aplica sus propios estándares de medición y corte. Una chaqueta talla M de una marca
            puede equivaler a una L de otra.
          </p>
          <p class="intro-desc">
            Por eso, <strong>cada producto en nuestro sitio tiene su propia tabla de tallas</strong>,
            basada en las especificaciones exactas del fabricante. Ahí encontrarás las medidas en
            centímetros que debes tomar para elegir correctamente.
          </p>
          <div class="intro-callout">
            <IconInfoCircle :size="20" :stroke="1.8" class="callout-icon" />
            <span>Si tienes dudas sobre la talla de un producto específico, nuestros asesores en tienda o a través de WhatsApp pueden ayudarte antes de comprar.</span>
          </div>
        </div>
        <div class="intro-steps">
          <div class="intro-step">
            <div class="step-num">01</div>
            <div class="step-body">
              <div class="step-title">Encuéntralo en la ficha del producto</div>
              <p class="step-desc">Ingresa al producto que te interesa. La guía de tallas está disponible directamente en la página del artículo, sobre el selector de tallas.</p>
            </div>
          </div>
          <div class="intro-step">
            <div class="step-num">02</div>
            <div class="step-body">
              <div class="step-title">Tómate las medidas</div>
              <p class="step-desc">Usa una cinta métrica flexible y sigue las instrucciones de la guía para cada tipo de producto. Las medidas varían según la categoría.</p>
            </div>
          </div>
          <div class="intro-step">
            <div class="step-num">03</div>
            <div class="step-body">
              <div class="step-title">Compara con la tabla</div>
              <p class="step-desc">Localiza tu medida en la tabla del producto y selecciona la talla correspondiente. Cuando estés entre dos tallas, consulta el tip del fabricante.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── DÓNDE ENCONTRAR EL BOTÓN ─── -->
    <section class="ubicacion-section">
      <div class="ubicacion-bg" />
      <div class="ubicacion-overlay" />
      <div class="ubicacion-content">
        <div class="ubicacion-text">
          <span class="section-label">¿Dónde la encuentro?</span>
          <h2 class="section-title">El Botón está<br /><em>Aquí</em></h2>
          <p class="section-subtitle">
            En la página de cada producto, justo encima del selector de tallas, encontrarás el
            enlace <strong>"Guía de Tallas"</strong>. Al hacer clic se desplegará la tabla con
            las medidas específicas de ese artículo.
          </p>
          <div class="ubicacion-steps">
            <div class="ub-step">
              <IconClick :size="20" :stroke="1.8" class="ub-step-icon" />
              <span>Ingresa a la ficha del producto</span>
            </div>
            <div class="ub-step">
              <IconPointer :size="20" :stroke="1.8" class="ub-step-icon" />
              <span>Busca el selector de tallas</span>
            </div>
            <div class="ub-step">
              <IconZoomIn :size="20" :stroke="1.8" class="ub-step-icon" />
              <span>Haz clic en "Guía de Tallas" justo encima</span>
            </div>
          </div>
        </div>

        <!-- PRODUCT PAGE MOCKUP -->
        <div class="mockup-wrap">
          <div class="mockup-label">
            <IconDeviceMobile :size="14" :stroke="2" />
            <span>Vista de ficha de producto — motomundi.cl</span>
          </div>
          <div class="mockup-browser">
            <!-- Browser chrome -->
            <div class="browser-bar">
              <div class="browser-dots">
                <span /><span /><span />
              </div>
              <div class="browser-url">motomundi.cl/producto/chaqueta-ejemplo</div>
            </div>
            <!-- Product page layout -->
            <div class="product-layout">
              <!-- Image col -->
              <div class="product-img-col">
                <div class="product-img-placeholder">
                  <IconHanger :size="48" :stroke="1" style="color: rgba(255,255,255,0.15);" />
                </div>
                <div class="product-thumbs">
                  <div class="thumb active" />
                  <div class="thumb" />
                  <div class="thumb" />
                </div>
              </div>
              <!-- Info col -->
              <div class="product-info-col">
                <div class="product-brand-tag">ALPINESTARS</div>
                <div class="product-name">Chaqueta T-GP R V2</div>
                <div class="product-price">$349.990</div>
                <div class="product-divider" />

                <!-- SIZE SELECTOR — the annotated part -->
                <div class="size-block">
                  <div class="size-header">
                    <span class="size-label">TALLA</span>
                    <!-- ★ THIS IS THE HIGHLIGHTED BUTTON ★ -->
                    <div class="guia-tallas-btn-wrap">
                      <div class="guia-tallas-btn">
                        <IconRuler :size="12" :stroke="2" />
                        <span>Guía de tallas</span>
                      </div>
                      <!-- Annotation arrow + tooltip -->
                      <div class="annotation">
                        <div class="annotation-line" />
                        <div class="annotation-bubble">
                          <IconArrowDown :size="12" :stroke="2.5" class="annotation-arrow-icon" />
                          <span>¡Aquí está el botón!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="size-options">
                    <div class="size-opt">XS</div>
                    <div class="size-opt active">S</div>
                    <div class="size-opt">M</div>
                    <div class="size-opt">L</div>
                    <div class="size-opt">XL</div>
                    <div class="size-opt disabled">XXL</div>
                  </div>
                </div>

                <div class="product-divider" />
                <div class="product-add-btn">Agregar al carro</div>
              </div>
            </div>
          </div>
          <div class="mockup-caption">
            <IconMapPin :size="14" :stroke="2" />
            <span>El enlace "Guía de tallas" aparece junto al selector de talla en cada producto</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CONSEJOS DE MEDICIÓN ─── -->
    <section class="consejos-section">
      <span class="section-label">Antes de medir</span>
      <h2 class="section-title">Consejos para<br /><em>Medirte Bien</em></h2>
      <p class="section-subtitle">Unas medidas precisas son la clave para elegir la talla correcta a la primera. Sigue estos consejos generales antes de consultar la guía de cualquier producto.</p>
      <div class="consejos-grid">
        <div v-for="c in consejos" :key="c.title" class="consejo-card">
          <component :is="c.icon" class="consejo-icon" :size="32" :stroke="1.5" />
          <div class="consejo-title">{{ c.title }}</div>
          <p class="consejo-desc">{{ c.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ─── CATEGORÍAS ─── -->
    <section class="categorias-section">
      <span class="section-label">Por categoría de producto</span>
      <h2 class="section-title">¿Qué Medir<br />según el <em>Producto?</em></h2>
      <p class="section-subtitle">Cada tipo de equipamiento requiere medidas distintas. Aquí te explicamos qué medir en cada caso para que consultes la tabla del producto con los datos correctos.</p>

      <div class="categorias-grid">
        <div
          v-for="cat in categorias"
          :key="cat.title"
          class="categoria-card"
          :class="cat.color"
        >
          <div class="cat-header">
            <component :is="cat.icon" class="cat-icon" :size="40" :stroke="1.3" />
            <div>
              <div class="cat-label">Cómo medirte</div>
              <div class="cat-title">{{ cat.title }}</div>
              <div class="cat-medicion">{{ cat.medicion }}</div>
            </div>
          </div>
          <ol class="cat-steps">
            <li v-for="(paso, i) in cat.instrucciones" :key="i">
              <span class="cat-step-num">{{ i + 1 }}</span>
              <span>{{ paso }}</span>
            </li>
          </ol>
          <div class="cat-tip">
            <IconBulb :size="15" :stroke="2" class="cat-tip-icon" />
            <p>{{ cat.tip }}</p>
          </div>
          <div class="cat-unidad">
            <IconRuler :size="13" :stroke="2" />
            <span>Unidad: {{ cat.unidad }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── AVISO IMPORTANTE ─── -->
    <div class="aviso-strip">
      <div class="aviso-strip-inner">
        <IconAlertTriangle :size="28" :stroke="1.8" class="aviso-icon" />
        <div class="aviso-body">
          <strong>Recuerda siempre:</strong> prueba el producto en casa antes de usarlo en moto. Los artículos que presentan señales de uso (marcas de roce, olor, suciedad) no pueden ser aceptados para cambio.
          Consulta nuestra <a href="/cambios-y-devoluciones">política de cambios y devoluciones</a> para más detalles.
        </div>
      </div>
    </div>

    <!-- ─── CTA ─── -->
    <section class="cta-section">
      <span class="section-label">¿Tienes dudas con tu talla?</span>
      <h2 class="section-title">Nuestros Expertos<br />te <em>Asesoran</em></h2>
      <p class="section-subtitle">Si aún no estás seguro de tu talla o necesitas ayuda con un producto específico, nuestro equipo de Motomundianos está listo para orientarte antes de tu compra.</p>
      <div class="cta-cards">
        <a href="#" class="cta-card featured">
          <IconBrandWhatsapp class="cta-card-icon" :size="36" :stroke="1.4" />
          <div class="cta-card-label">Atención inmediata</div>
          <div class="cta-card-value">WhatsApp oficial</div>
          <div class="cta-card-sub">Pregunta por tu talla ahora</div>
        </a>
        <a href="mailto:ventas@motomundi.cl" class="cta-card">
          <IconMail class="cta-card-icon" :size="36" :stroke="1.4" />
          <div class="cta-card-label">Correo electrónico</div>
          <div class="cta-card-value">ventas@motomundi.cl</div>
          <div class="cta-card-sub">Incluye nombre del producto</div>
        </a>
        <a href="/tiendas" class="cta-card">
          <IconMapPin class="cta-card-icon" :size="36" :stroke="1.4" />
          <div class="cta-card-label">Visítanos</div>
          <div class="cta-card-value">En tienda física</div>
          <div class="cta-card-sub">Prueba antes de comprar</div>
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.tallas-page {
  --red: #B21915;
  --red-dark: #8a1210;
  --black: #111111;
  --dark: #1e1e1e;
  --gray-dark: #3a3a3a;
  --gray: #6b6b6b;
  --gray-light: #d0d0d0;
  --off-white: #f7f5f2;
  --white: #ffffff;
  --green: #16a34a;

  font-family: 'Barlow', sans-serif;
  background: var(--white);
  color: var(--black);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

/* ─── HERO ─── */
.hero {
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background-image: url('/cms/tailertech.jpg');
  background-size: cover;
  background-position: center 50%;
  transform: scale(1.03);
  transition: transform 8s ease;
}
.hero:hover .hero-bg { transform: scale(1); }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.55) 55%, rgba(0,0,0,0.12) 100%);
}
.hero-content {
  position: relative; z-index: 2;
  padding: 60px 72px;
  max-width: 680px;
}
.hero-eyebrow {
  display: inline-block;
  background: var(--red);
  color: var(--white);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 5px 14px;
  margin-bottom: 20px;
}
.hero h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(3.2rem, 6vw, 5.5rem);
  line-height: 0.95;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin-bottom: 22px;
}
.hero h1 em { color: var(--red); font-style: normal; }
.hero p {
  color: rgba(255,255,255,0.82);
  font-size: 1.05rem;
  font-weight: 300;
  max-width: 500px;
  line-height: 1.7;
}
.hero-content > * { animation: fadeUp 0.7s ease both; }
.hero-content > *:nth-child(1) { animation-delay: 0.1s; }
.hero-content > *:nth-child(2) { animation-delay: 0.25s; }
.hero-content > *:nth-child(3) { animation-delay: 0.4s; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── SECTION COMMON ─── */
section { padding: 80px 72px; }
.section-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--red);
  display: block;
  margin-bottom: 12px;
}
.section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  text-transform: uppercase;
  line-height: 1;
  color: var(--black);
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}
.section-title em { color: var(--red); font-style: normal; }
.section-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: var(--gray);
  max-width: 680px;
  line-height: 1.75;
  margin-bottom: 0;
}

/* ─── INTRO ─── */
.intro-section { background: var(--off-white); }
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: start;
}
.intro-desc {
  font-size: 0.95rem;
  color: var(--gray-dark);
  line-height: 1.8;
  margin-top: 16px;
}
.intro-desc strong { color: var(--black); font-weight: 600; }
.intro-callout {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 24px;
  padding: 16px 18px;
  background: var(--white);
  border-left: 4px solid var(--red);
  font-size: 0.86rem;
  color: var(--gray-dark);
  line-height: 1.65;
}
.callout-icon { flex-shrink: 0; margin-top: 1px; color: var(--red); }

.intro-steps { display: flex; flex-direction: column; gap: 0; }
.intro-step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid var(--gray-light);
}
.intro-step:last-child { border-bottom: none; }
.step-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 1;
  color: rgba(178,25,21,0.12);
  flex-shrink: 0;
  width: 52px;
  text-align: right;
}
.step-body { padding-top: 4px; }
.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--black);
  margin-bottom: 6px;
}
.step-desc { font-size: 0.86rem; color: var(--gray); line-height: 1.65; }

/* ─── UBICACIÓN / MOCKUP ─── */
.ubicacion-section {
  position: relative;
  padding: 80px 72px;
  overflow: hidden;
}
.ubicacion-bg {
  position: absolute; inset: 0;
  background-image: url('https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1600&q=80');
  background-size: cover;
  background-position: center;
}
.ubicacion-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(178,25,21,0.72) 100%);
}
.ubicacion-content {
  position: relative; z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 56px;
  align-items: center;
}
.ubicacion-text .section-label    { color: rgba(255,255,255,0.5); }
.ubicacion-text .section-title    { color: var(--white); }
.ubicacion-text .section-subtitle { color: rgba(255,255,255,0.7); }
.ubicacion-text .section-subtitle strong { color: var(--white); }

.ubicacion-steps { margin-top: 28px; display: flex; flex-direction: column; gap: 14px; }
.ub-step {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
}
.ub-step-icon { color: var(--red); flex-shrink: 0; }

/* MOCKUP */
.mockup-wrap { display: flex; flex-direction: column; gap: 10px; }
.mockup-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-family: 'Barlow Condensed', sans-serif;
}

.mockup-browser {
  background: #1a1a2e;
  border: 1px solid rgba(255,255,255,0.12);
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.6);
}

.browser-bar {
  background: #0d0d1a;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.browser-dots { display: flex; gap: 6px; }
.browser-dots span {
  width: 10px; height: 10px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
}
.browser-dots span:nth-child(1) { background: #ff5f57; }
.browser-dots span:nth-child(2) { background: #ffbd2e; }
.browser-dots span:nth-child(3) { background: #28c840; }
.browser-url {
  font-family: monospace;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.02em;
}

.product-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 0;
}

.product-img-col {
  padding: 20px;
  background: #141422;
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.product-img-placeholder {
  background: rgba(255,255,255,0.04);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.06);
}
.product-thumbs { display: flex; gap: 6px; }
.thumb {
  flex: 1; height: 32px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
}
.thumb.active { border-color: var(--red); }

.product-info-col { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
.product-brand-tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--red);
}
.product-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--white);
  line-height: 1.1;
}
.product-price {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--white);
}
.product-divider {
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin: 4px 0;
}

/* SIZE BLOCK — the annotated section */
.size-block { position: relative; }
.size-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.size-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}

/* ★ THE HIGHLIGHTED BUTTON ★ */
.guia-tallas-btn-wrap { position: relative; }
.guia-tallas-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--red);
  color: var(--white);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  animation: pulse-red 2.5s ease-in-out infinite;
}
@keyframes pulse-red {
  0%, 100% { box-shadow: 0 0 0 0 rgba(178,25,21,0.7); }
  50%       { box-shadow: 0 0 0 6px rgba(178,25,21,0); }
}

/* Annotation bubble */
.annotation {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
  z-index: 10;
  pointer-events: none;
}
.annotation-line {
  width: 1px;
  height: 12px;
  background: rgba(255,215,0,0.7);
  margin-right: 28px;
}
.annotation-bubble {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,215,0,0.95);
  color: #1a1000;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 8px;
  white-space: nowrap;
}
.annotation-arrow-icon { flex-shrink: 0; color: #1a1000; }

.size-options { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 32px; }
.size-opt {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 5px 10px;
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  transition: all 0.15s;
}
.size-opt.active { background: var(--red); border-color: var(--red); color: var(--white); }
.size-opt.disabled { opacity: 0.25; }

.product-add-btn {
  background: var(--red);
  color: var(--white);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 12px;
  text-align: center;
  margin-top: 4px;
  cursor: pointer;
}

.mockup-caption {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.38);
  font-style: italic;
}

/* ─── CONSEJOS ─── */
.consejos-section { background: var(--white); }
.consejos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  margin-top: 48px;
  background: var(--gray-light);
}
.consejo-card {
  background: var(--white);
  padding: 32px 28px;
  transition: background 0.2s, transform 0.2s;
}
.consejo-card:hover { background: var(--off-white); transform: translateY(-4px); }
.consejo-icon { display: block; margin-bottom: 16px; color: var(--red); }
.consejo-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--black);
  margin-bottom: 10px;
}
.consejo-desc { font-size: 0.86rem; color: var(--gray); line-height: 1.7; }

/* ─── CATEGORÍAS ─── */
.categorias-section { background: var(--off-white); }
.categorias-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 48px;
}
.categoria-card {
  background: var(--white);
  border: 2px solid var(--gray-light);
  padding: 0;
  overflow: hidden;
  transition: border-color 0.2s;
}
.categoria-card:hover { border-color: var(--red); }
.categoria-card.red > .cat-header { background: var(--black); }
.categoria-card.dark > .cat-header { background: var(--dark); }

.cat-header {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.cat-icon { flex-shrink: 0; color: rgba(255,255,255,0.7); margin-top: 4px; }
.cat-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 2px;
}
.cat-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.4rem;
  text-transform: uppercase;
  color: var(--white);
  line-height: 1.05;
}
.cat-medicion {
  font-size: 0.75rem;
  color: var(--red);
  font-weight: 600;
  margin-top: 4px;
  letter-spacing: 0.04em;
}

.cat-steps {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cat-steps li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 28px;
  border-bottom: 1px solid var(--gray-light);
  font-size: 0.87rem;
  color: var(--gray-dark);
  line-height: 1.6;
}
.cat-step-num {
  flex-shrink: 0;
  width: 20px; height: 20px;
  background: var(--red);
  color: var(--white);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

.cat-tip {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 28px;
  background: #fff8f8;
  border-top: 1px solid var(--gray-light);
  font-size: 0.83rem;
  color: var(--gray-dark);
  line-height: 1.6;
}
.cat-tip-icon { flex-shrink: 0; margin-top: 2px; color: var(--red); }

.cat-unidad {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 28px;
  background: var(--off-white);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gray);
  border-top: 1px solid var(--gray-light);
}

/* ─── AVISO STRIP ─── */
.aviso-strip {
  background: var(--black);
  border-top: 4px solid var(--red);
  padding: 28px 72px;
}
.aviso-strip-inner {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
.aviso-icon { flex-shrink: 0; color: var(--red); margin-top: 2px; }
.aviso-body {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.7;
}
.aviso-body strong { color: var(--white); }
.aviso-body a { color: var(--red); text-decoration: none; font-weight: 600; }
.aviso-body a:hover { text-decoration: underline; }

/* ─── CTA ─── */
.cta-section {
  background: var(--off-white);
  text-align: center;
}
.cta-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 48px;
  flex-wrap: wrap;
}
.cta-card {
  background: var(--white);
  border: 2px solid var(--gray-light);
  padding: 32px 36px;
  text-decoration: none;
  text-align: center;
  min-width: 210px;
  transition: border-color 0.2s, transform 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.cta-card:hover { border-color: var(--red); transform: translateY(-4px); }
.cta-card.featured {
  background: var(--black);
  border-color: var(--red);
  border-top: 4px solid var(--red);
}
.cta-card-icon { margin-bottom: 6px; color: var(--gray); }
.cta-card.featured .cta-card-icon { color: var(--red); }
.cta-card-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gray);
}
.cta-card.featured .cta-card-label { color: rgba(255,255,255,0.45); }
.cta-card-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.05rem;
  text-transform: uppercase;
  color: var(--black);
  letter-spacing: 0.02em;
}
.cta-card.featured .cta-card-value { color: var(--white); }
.cta-card-sub { font-size: 0.78rem; color: var(--gray-light); }
.cta-card.featured .cta-card-sub { color: rgba(255,255,255,0.35); }

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .categorias-grid { grid-template-columns: 1fr; }
  .consejos-grid   { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 1024px) {
  section, .ubicacion-section { padding: 64px 28px; }
  .hero-content { padding: 48px 28px; }
  .intro-grid        { grid-template-columns: 1fr; gap: 40px; }
  .ubicacion-content { grid-template-columns: 1fr; gap: 40px; }
  .aviso-strip       { padding: 24px 28px; }
}
@media (max-width: 768px) {
  .consejos-grid { grid-template-columns: 1fr; }
  .cta-cards     { flex-direction: column; align-items: center; }
  .product-layout { grid-template-columns: 1fr; }
  .product-img-col { display: none; }
}
</style>
