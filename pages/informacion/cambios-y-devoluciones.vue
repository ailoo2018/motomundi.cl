<script setup lang="ts">
import {
  IconRefresh,
  IconPackage,
  IconArrowBackUp,
  IconShieldCheck,
  IconTag,
  IconSparkles,
  IconBan,
  IconHelmet,
  IconHanger,
  IconPlug,
  IconCircleDot,
  IconZoomQuestion,
  IconBluetooth,
  IconCreditCard,
  IconCoin,
  IconClipboardList,
  IconCamera,
  IconClockHour4,
  IconWorld,
  IconTruck,
  IconReceiptOff,
  IconMessageCircle,
  IconDeviceLaptop,
  IconBrandWhatsapp,
  IconMail,
  IconBolt,
  IconMapPin,
  IconBulb,
  IconAlertTriangle,
  IconInfoCircle,
  IconCircleCheck,
  IconBuildingStore,
  IconAlertCircle,
  IconPackageOff,
  IconChecks,
  IconMotorbike,
  IconStar,
  IconVideo,
} from '@tabler/icons-vue'

useHead({
  title: 'Cambios y Devoluciones | Motomundi',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500;600&display=swap',
    },
  ],
})

const resumenItems = [
  { icon: IconRefresh,     label: 'Cambios en tienda',       tags: ['30 días corridos'],               color: 'red' },
  { icon: IconPackage,     label: 'Cambios no presenciales', tags: ['Online', 'Courier'],              color: 'dark' },
  { icon: IconArrowBackUp, label: 'Devolución de dinero',    tags: ['Solo compras online', '10 días'], color: 'dark' },
  { icon: IconShieldCheck, label: 'Garantía legal',          tags: ['Ley 21.398', '6 meses'],          color: 'red' },
]

const condicionesCambio = [
  { icon: IconTag,      text: 'El producto debe tener todas sus etiquetas originales: precio, informativas, pólizas, garantías y componentes.' },
  { icon: IconPackage,  text: 'Debe venir en su embalaje original: cajas, bolsas, envoltorios, sellado (si aplica) y todos sus accesorios.' },
  { icon: IconSparkles, text: 'El producto no debe haber sido usado, lavado, alterado, modificado ni manipulado en ninguna forma.' },
  { icon: IconBan,      text: 'Productos "probados en motocicleta" se consideran usados y no son aceptados para cambio bajo ninguna circunstancia.' },
]

const senalesUso = [
  'Roce o desgaste por fricción',
  'Salpicaduras de insectos',
  'Suciedad o polvo de tierra',
  'Olor ajeno al producto',
  'Pelos de animales',
  'Peladuras o rayaduras',
  'Cualquier condición distinta a la recibida',
]

const productosEspeciales = [
  {
    icon: IconHelmet,
    title: 'Cascos',
    desc: 'El ruido y la ventilación son percepciones personales y no constituyen motivo de cambio por garantía. Prueba siempre tu casco en casa o en la oficina antes de usarlo en moto, para asegurarte de que la horma se adapta a tu anatomía.',
  },
  {
    icon: IconHanger,
    title: 'Vestimenta',
    desc: 'Todo cambio de ropa debe realizarse con etiquetas, bolsas y perchas incluidas en el embalaje original. La prenda no debe presentar ninguna señal de uso. Te recomendamos probar sobre una alfombra sin sacar las etiquetas.',
  },
  {
    icon: IconPlug,
    title: 'Electrónica y Repuestos',
    desc: 'Ninguna pieza electrónica o repuesto será recibido si el embalaje original fue removido, el sello del fabricante está roto o el sello de garantía fue violado. Revisa las pólizas adjuntas al producto para condiciones específicas.',
  },
  {
    icon: IconCircleDot,
    title: 'Neumáticos',
    desc: 'Los neumáticos se compran por medida específica y no requieren prueba de calce, por lo que no es posible realizar cambios en compras online.',
  },
  {
    icon: IconZoomQuestion,
    title: 'Pinlocks',
    desc: 'Los Pinlocks son específicos por modelo de casco y no requieren prueba de calce, por lo que no es posible realizar cambios al comprarlos por nuestra tienda online.',
  },
  {
    icon: IconBluetooth,
    title: 'Intercomunicadores y Antiempañantes',
    desc: 'Estos productos solo se aceptan para cambio si están completamente sellados y no han sido manipulados en ninguna forma. Si fue sacado de su estuche y probado, no puede ser cambiado.',
  },
]

const devolucionPlazos = [
  {
    icon: IconCreditCard,
    title: 'Débito o Transferencia',
    plazo: '7 a 10 días hábiles',
    desc: 'La devolución será tramitada y efectuada directamente a tu cuenta bancaria dentro de este plazo.',
    color: 'red',
  },
  {
    icon: IconCoin,
    title: 'Tarjeta de Crédito',
    plazo: '~3 días hábiles + banco emisor',
    desc: 'Se gestiona la reversión a través de Transbank. El plazo final depende del banco emisor de tu tarjeta.',
    color: 'dark',
  },
]

const garantiaItems = [
  { icon: IconClipboardList, title: 'Evaluación inicial',      desc: 'Nuestro equipo recibe el producto en tienda y lo envía a control de calidad para determinar si la falla es de origen.' },
  { icon: IconCamera,        title: 'Evidencia requerida',     desc: 'Puede ser necesario el envío de fotografías o videos de respaldo antes de la recepción física del producto.' },
  { icon: IconClockHour4,    title: 'Tiempo de respuesta',     desc: 'El proceso estándar toma aproximadamente 10 días hábiles, incluyendo evaluación, resolución e informe final.' },
  { icon: IconWorld,         title: 'Garantías de fabricante', desc: 'En casos fuera del plazo legal, la gestión puede demorar 2 a 3 semanas e involucrar el envío al país de origen del fabricante.' },
]

const noAplicaGarantia = [
  'Desgaste normal por uso',
  'Manipulación indebida',
  'Negligencia del usuario',
  'Accidentes (choques, incendios, daños por agua)',
  'Productos de segunda selección u Outlet',
]

const videoBullets = [
  { text: 'Plazos y condiciones para cambios en tienda' },
  { text: 'Cómo solicitar un cambio si compraste online' },
  { text: 'Qué pasa si tu producto llegó con fallas' },
  { text: 'Proceso de garantía legal paso a paso' },
]
</script>

<template>
  <div class="cambios-page">

    <!-- ─── HERO ─── -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-eyebrow">Políticas de postventa</div>
        <h1>Cambios y<br /><em>Devoluciones</em></h1>
        <p>Nos importa que quedes 100% satisfecho con tu compra. Conoce aquí todas nuestras políticas de cambio, devolución y garantía para que tomes decisiones informadas y sin sorpresas.</p>
      </div>
    </section>

    <!-- ─── RESUMEN STRIP ─── -->
    <div class="resumen-strip">
      <div v-for="m in resumenItems" :key="m.label" class="resumen-item" :class="m.color">
        <component :is="m.icon" class="resumen-icon" :size="28" :stroke="1.5" />
        <div>
          <div class="resumen-label">{{ m.label }}</div>
          <div class="resumen-tags">
            <span v-for="tag in m.tags" :key="tag" class="resumen-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── VIDEO EXPLAINER ─── -->
    <section class="video-section">
      <div class="video-inner">
        <div class="video-text">
          <span class="section-label">¿Cómo funciona?</span>
          <h2 class="section-title">Todo lo que<br />necesitas <em>Saber</em></h2>
          <p class="section-subtitle">
            Nuestro equipo explica en detalle el proceso de cambios y devoluciones en Motomundi.
            Mira el video para entender cada paso antes de iniciar tu solicitud.
          </p>
          <div class="video-bullets">
            <div v-for="b in videoBullets" :key="b.text" class="video-bullet">
              <IconCircleCheck class="bullet-icon" :size="18" :stroke="2" />
              <span>{{ b.text }}</span>
            </div>
          </div>
        </div>
        <div class="video-embed-wrap">
          <iframe
              src="https://www.youtube.com/embed/ca8vPpLiiIQ"
              title="Política de Cambios y Devoluciones Motomundi"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
          />
        </div>
      </div>
    </section>

    <!-- ─── PROCESO DE CAMBIO ─── -->
    <section class="proceso-section">
      <span class="section-label">Proceso de cambio</span>
      <h2 class="section-title">¿Cómo Hago<br />un <em>Cambio?</em></h2>
      <p class="section-subtitle">Tienes hasta <strong>30 días corridos</strong> desde la fecha de compra para solicitar un cambio. El proceso varía según dónde realizaste la compra.</p>
      <div class="proceso-grid">

        <!-- Presencial -->
        <div class="proceso-card presencial">
          <div class="proceso-card-header">
            <IconBuildingStore class="proceso-icon" :size="36" :stroke="1.5" />
            <div>
              <div class="proceso-card-badge">Compra presencial</div>
              <div class="proceso-card-title">Cambio en Tienda</div>
            </div>
          </div>
          <ul class="proceso-steps">
            <li><span class="step-num">1</span><span>Dirígete a cualquier tienda Motomundi con el producto y tu boleta.</span></li>
            <li><span class="step-num">2</span><span>Nuestro equipo verificará el estado del producto y las condiciones para el cambio.</span></li>
            <li><span class="step-num">3</span><span>Selecciona el producto de reemplazo según disponibilidad en tienda.</span></li>
            <li><span class="step-num">4</span><span>Si eres de regiones, puedes enviar el producto a nuestro centro de distribución (los costos de envío son de tu responsabilidad).</span></li>
          </ul>
          <div class="proceso-note">
            <IconMapPin :size="16" :stroke="2" class="note-icon" />
            <span>Las compras online pueden cambiarse en tienda según disponibilidad. Para marcas exclusivas del canal online, el cambio debe tramitarse por la plataforma web.</span>
          </div>
        </div>

        <!-- Online -->
        <div class="proceso-card online">
          <div class="proceso-card-header">
            <IconDeviceLaptop class="proceso-icon online" :size="36" :stroke="1.5" />
            <div>
              <div class="proceso-card-badge online">Compra online</div>
              <div class="proceso-card-title online">Cambio No Presencial</div>
            </div>
          </div>
          <ul class="proceso-steps">
            <li><span class="step-num">1</span><span>Escríbenos a <strong>online@motomundi.cl</strong> indicando número de pedido, producto y motivo del cambio.</span></li>
            <li><span class="step-num">2</span><span>Verifica la disponibilidad del producto que deseas recibir a cambio.</span></li>
            <li><span class="step-num">3</span><span>Envía el producto por courier a nuestras bodegas (embalado en su estado original).</span></li>
            <li><span class="step-num">4</span><span>Una vez recibido y validado, despachamos el producto de reemplazo.</span></li>
          </ul>
          <div class="proceso-note online">
            <IconBulb :size="16" :stroke="2" class="note-icon" />
            <span>Si el error fue nuestro (talla o modelo equivocado), nosotros asumimos los costos de retiro y reenvío. Si el cambio es por preferencia personal, los costos de courier son de tu responsabilidad.</span>
          </div>
        </div>

      </div>
    </section>

    <!-- ─── CONDICIONES PARA EL CAMBIO ─── -->
    <section class="condiciones-section">
      <div class="condiciones-bg" />
      <div class="condiciones-overlay" />
      <div class="condiciones-content">
        <div class="condiciones-text">
          <span class="section-label">Requisitos</span>
          <h2 class="section-title">Condiciones para<br /><em>Aceptar el Cambio</em></h2>
          <p class="section-subtitle">Para que podamos procesar tu cambio, el producto debe cumplir todos los siguientes requisitos sin excepción.</p>
        </div>
        <div class="condiciones-grid">
          <div v-for="c in condicionesCambio" :key="c.text" class="condicion-card">
            <component :is="c.icon" class="condicion-icon" :size="32" :stroke="1.5" />
            <p class="condicion-text">{{ c.text }}</p>
          </div>
        </div>
        <div class="senales-uso-box">
          <div class="senales-title">
            <IconAlertTriangle :size="15" :stroke="2" />
            <span>Señales de uso que impiden el cambio</span>
          </div>
          <div class="senales-grid">
            <div v-for="s in senalesUso" :key="s" class="senal-item">
              <span class="senal-dot" />
              <span>{{ s }}</span>
            </div>
          </div>
          <p class="senales-tip">
            <IconBulb :size="14" :stroke="2" style="display:inline; vertical-align:middle; margin-right:4px;" />
            <strong>Consejo:</strong> Prueba tus prendas y cascos en casa sobre una alfombra, sin sacar etiquetas. Asesórate con nuestros expertos antes de decidir.
          </p>
        </div>
      </div>
    </section>

    <!-- ─── DEVOLUCIÓN DE DINERO ─── -->
    <section class="devolucion-section">
      <span class="section-label">Solo compras online</span>
      <h2 class="section-title">Devolución<br />de <em>Dinero</em></h2>
      <p class="section-subtitle">
        La devolución de dinero aplica <strong>exclusivamente para compras no presenciales</strong>, dentro de un plazo máximo de <strong>10 días corridos</strong> desde la recepción del producto. Los plazos de reembolso varían según el medio de pago utilizado.
      </p>
      <div class="devolucion-grid">
        <div v-for="d in devolucionPlazos" :key="d.title" class="devolucion-card" :class="d.color">
          <component :is="d.icon" class="devolucion-icon" :size="40" :stroke="1.3" />
          <div class="devolucion-body">
            <div class="devolucion-title">{{ d.title }}</div>
            <div class="devolucion-plazo">{{ d.plazo }}</div>
            <p class="devolucion-desc">{{ d.desc }}</p>
          </div>
        </div>
      </div>
      <div class="devolucion-nota">
        <IconInfoCircle :size="18" :stroke="1.8" class="nota-icon" />
        <div>
          <strong>Importante:</strong> Los mismos requisitos de estado del producto aplican para devoluciones. El artículo debe estar nuevo, sin uso, con embalaje original y todas sus etiquetas.
          Para iniciar el proceso escribe a <a href="mailto:online@motomundi.net">online@motomundi.net</a>
        </div>
      </div>
    </section>

    <!-- ─── PRODUCTOS ESPECIALES ─── -->
    <section class="especiales-section">
      <span class="section-label">Consideraciones especiales</span>
      <h2 class="section-title">Productos con<br /><em>Condiciones Específicas</em></h2>
      <p class="section-subtitle">Ciertos productos tienen políticas de cambio particulares por su naturaleza. Revisa las condiciones antes de comprar.</p>
      <div class="especiales-grid">
        <div v-for="p in productosEspeciales" :key="p.title" class="especial-card">
          <component :is="p.icon" class="especial-icon" :size="36" :stroke="1.4" />
          <div class="especial-title">{{ p.title }}</div>
          <p class="especial-desc">{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ─── GARANTÍAS ─── -->
    <section class="garantia-section">
      <div class="garantia-bg" />
      <div class="garantia-overlay" />
      <div class="garantia-content">

        <div class="garantia-header">
          <span class="section-label">Ley 21.398 — PRO Consumidor</span>
          <h2 class="section-title">Garantía Legal</h2>
          <p class="section-subtitle">
            Todos nuestros productos que presenten <strong>falla de fábrica</strong> están cubiertos
            por la garantía legal vigente: <strong>6 meses desde la recepción del producto</strong>
            para compras realizadas desde el 24 de marzo de 2022.
          </p>
        </div>

        <div class="garantia-proceso-grid">
          <div v-for="g in garantiaItems" :key="g.title" class="garantia-step">
            <component :is="g.icon" class="garantia-step-icon" :size="32" :stroke="1.4" />
            <div class="garantia-step-title">{{ g.title }}</div>
            <p class="garantia-step-desc">{{ g.desc }}</p>
          </div>
        </div>

        <div class="garantia-no-aplica">
          <div class="no-aplica-title">
            <IconBan :size="15" :stroke="2" />
            <span>La garantía NO cubre</span>
          </div>
          <div class="no-aplica-grid">
            <div v-for="n in noAplicaGarantia" :key="n" class="no-aplica-item">
              <span class="no-aplica-dot" />
              <span>{{ n }}</span>
            </div>
          </div>
        </div>

        <div class="garantia-outlet-box">
          <IconAlertTriangle class="garantia-outlet-icon" :size="22" :stroke="1.8" />
          <div>
            <strong>Productos de segunda selección y Outlet:</strong> Los productos outlet no están
            afectos a cambio, devolución ni garantía legal, ni tampoco aplica garantía de fabricante.
          </div>
        </div>

      </div>
    </section>

    <!-- ─── IMPORTANTE ─── -->
    <section class="importante-section">
      <span class="section-label">A tener en cuenta</span>
      <h2 class="section-title">Información<br /><em>Importante</em></h2>
      <div class="importante-grid">
        <div class="importante-card">
          <IconTruck class="importante-icon" :size="36" :stroke="1.4" />
          <div class="importante-title">Envíos con Courier</div>
          <p class="importante-desc">Los despachos se realizan con empresas de courier externas. Te entregaremos el número de tracking para que puedas hacer seguimiento. Guárdalo como respaldo ante cualquier contingencia.</p>
        </div>
        <div class="importante-card">
          <IconReceiptOff class="importante-icon" :size="36" :stroke="1.4" />
          <div class="importante-title">Sin retracto en tienda</div>
          <p class="importante-desc">Motomundi no está adherido a ningún tipo de garantía de satisfacción. No rige derecho a retracto para compras presenciales donde el cliente pudo ver y evaluar el producto antes de comprarlo.</p>
        </div>
        <div class="importante-card">
          <IconTag class="importante-icon" :size="36" :stroke="1.4" />
          <div class="importante-title">Modificación de precios</div>
          <p class="importante-desc">Motomundi se reserva el derecho a modificar o poner término anticipado a promociones o rebajas en su sitio web y tiendas físicas. Aplica para Cybers, MMDays y campañas específicas.</p>
        </div>
        <div class="importante-card">
          <IconMessageCircle class="importante-icon" :size="36" :stroke="1.4" />
          <div class="importante-title">Foros de opinión</div>
          <p class="importante-desc">Antes de comprar, te invitamos a revisar los foros de opinión de cada producto en nuestro sitio. Nuestros clientes aportan información muy valiosa sobre uso y características.</p>
        </div>
      </div>
    </section>

    <!-- ─── CTA CONTACTO ─── -->
    <section class="cta-section">
      <span class="section-label">¿Tienes una solicitud?</span>
      <h2 class="section-title">Estamos Acá<br />para <em>Ayudarte</em></h2>
      <p class="section-subtitle">Nuestro equipo de postventa está disponible para orientarte en cualquier proceso de cambio, devolución o garantía.</p>
      <div class="cta-cards">
        <a href="mailto:online@motomundi.cl" class="cta-card">
          <IconDeviceLaptop class="cta-card-icon" :size="36" :stroke="1.4" />
          <div class="cta-card-label">Compras online</div>
          <div class="cta-card-value">online@motomundi.cl</div>
          <div class="cta-card-sub">Cambios y devoluciones web</div>
        </a>
        <a href="mailto:postventa@motomundi.cl" class="cta-card featured">
          <IconShieldCheck class="cta-card-icon" :size="36" :stroke="1.4" />
          <div class="cta-card-label">Garantías y postventa</div>
          <div class="cta-card-value">postventa@motomundi.cl</div>
          <div class="cta-card-sub">Fallas, garantías y reclamos</div>
        </a>
        <a href="#" class="cta-card">
          <IconBrandWhatsapp class="cta-card-icon" :size="36" :stroke="1.4" />
          <div class="cta-card-label">WhatsApp oficial</div>
          <div class="cta-card-value">Escríbenos →</div>
          <div class="cta-card-sub">Atención en línea</div>
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.cambios-page {
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
  min-height: 500px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/cms/devoluciones-mm.jpg');
  background-size: cover;
  background-position: center 45%;
  transform: scale(1.03);
  transition: transform 8s ease;
}
.hero:hover .hero-bg { transform: scale(1); }
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 55%, rgba(0,0,0,0.15) 100%);
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 64px 72px;
  max-width: 700px;
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
  margin-bottom: 22px;
}
.hero h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(3.2rem, 6vw, 5.5rem);
  line-height: 0.95;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin-bottom: 24px;
}
.hero h1 em { color: var(--red); font-style: normal; }
.hero p {
  color: rgba(255,255,255,0.82);
  font-size: 1.05rem;
  font-weight: 300;
  max-width: 520px;
  line-height: 1.7;
}
.hero-content > * { animation: fadeUp 0.7s ease both; }
.hero-content > *:nth-child(1) { animation-delay: 0.1s; }
.hero-content > *:nth-child(2) { animation-delay: 0.25s; }
.hero-content > *:nth-child(3) { animation-delay: 0.4s; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── RESUMEN STRIP ─── */
.resumen-strip {
  background: var(--black);
  display: flex;
  border-top: 4px solid var(--red);
}
.resumen-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  border-right: 1px solid rgba(255,255,255,0.08);
  transition: background 0.2s;
}
.resumen-item:last-child { border-right: none; }
.resumen-item:hover { background: rgba(255,255,255,0.04); }
.resumen-icon { flex-shrink: 0; color: rgba(255,255,255,0.4); }
.resumen-item.red .resumen-icon { color: var(--red); }
.resumen-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--white);
  margin-bottom: 8px;
}
.resumen-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.resumen-tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 9px;
  border: 1px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.55);
}
.resumen-item.red .resumen-tag { border-color: var(--red); color: var(--red); }

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
}
.section-subtitle strong { color: var(--black); font-weight: 600; }

/* ─── VIDEO ─── */
.video-section { background: var(--off-white); }
.video-inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 64px;
  align-items: center;
}
.video-bullets { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
.video-bullet {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--gray-dark);
  line-height: 1.5;
}
.bullet-icon { color: var(--green); flex-shrink: 0; margin-top: 2px; }
.video-embed-wrap {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  box-shadow: 0 24px 56px rgba(0,0,0,0.18);
}
.video-embed-wrap iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* ─── PROCESO ─── */
.proceso-section { background: var(--white); }
.proceso-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 48px;
}
.proceso-card {
  border: 2px solid var(--gray-light);
  overflow: hidden;
  transition: border-color 0.2s;
}
.proceso-card:hover { border-color: var(--red); }
.proceso-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  background: var(--off-white);
  border-bottom: 2px solid var(--gray-light);
}
.proceso-card.online .proceso-card-header { background: var(--black); }
.proceso-icon { flex-shrink: 0; color: var(--gray-dark); }
.proceso-icon.online { color: rgba(255,255,255,0.7); }
.proceso-card-badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 4px;
}
.proceso-card-badge.online,
.proceso-card.online .proceso-card-badge { color: rgba(255,255,255,0.45); }
.proceso-card-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  text-transform: uppercase;
  color: var(--black);
}
.proceso-card-title.online,
.proceso-card.online .proceso-card-title { color: var(--white); }
.proceso-steps {
  list-style: none;
  padding: 0;
  margin: 0;
}
.proceso-steps li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 28px;
  border-bottom: 1px solid var(--gray-light);
  font-size: 0.88rem;
  color: var(--gray-dark);
  line-height: 1.6;
}
.proceso-steps li:last-child { border-bottom: none; }
.proceso-steps li strong { color: var(--black); }
.step-num {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  background: var(--red);
  color: var(--white);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.proceso-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px 28px;
  background: #fff8f8;
  border-top: 2px solid var(--gray-light);
  font-size: 0.83rem;
  color: var(--gray-dark);
  line-height: 1.6;
}
.proceso-note.online { background: rgba(178,25,21,0.06); }
.note-icon { flex-shrink: 0; margin-top: 2px; color: var(--red); }

/* ─── CONDICIONES ─── */
.condiciones-section {
  position: relative;
  padding: 80px 72px;
  overflow: hidden;
}
.condiciones-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1600&q=80');
  background-size: cover;
  background-position: center;
}
.condiciones-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.94) 0%, rgba(178,25,21,0.75) 100%);
}
.condiciones-content { position: relative; z-index: 2; }
.condiciones-text { margin-bottom: 48px; }
.condiciones-text .section-label    { color: rgba(255,255,255,0.5); }
.condiciones-text .section-title    { color: var(--white); }
.condiciones-text .section-subtitle { color: rgba(255,255,255,0.7); }

.condiciones-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: rgba(255,255,255,0.08);
  margin-bottom: 32px;
}
.condicion-card {
  background: rgba(255,255,255,0.05);
  padding: 28px 24px;
  transition: background 0.2s;
}
.condicion-card:hover { background: rgba(255,255,255,0.1); }
.condicion-icon {
  display: block;
  margin-bottom: 14px;
  color: rgba(255,255,255,0.65);
}
.condicion-text { font-size: 0.86rem; color: rgba(255,255,255,0.78); line-height: 1.65; }

.senales-uso-box {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-left: 5px solid var(--red);
  backdrop-filter: blur(10px);
  padding: 28px 32px;
}
.senales-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 18px;
}
.senales-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}
.senal-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: rgba(255,255,255,0.72);
}
.senal-dot {
  width: 6px;
  height: 6px;
  background: var(--red);
  border-radius: 50%;
  flex-shrink: 0;
}
.senales-tip {
  font-size: 0.84rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.65;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.senales-tip strong { color: rgba(255,255,255,0.85); }

/* ─── DEVOLUCIÓN ─── */
.devolucion-section { background: var(--off-white); }
.devolucion-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 48px;
}
.devolucion-card {
  border: 2px solid var(--gray-light);
  padding: 32px 28px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  transition: border-color 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
}
.devolucion-card:hover { border-color: var(--red); transform: translateY(-3px); }
.devolucion-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--red);
}
.devolucion-card.dark::before { background: var(--gray-dark); }
.devolucion-icon { flex-shrink: 0; color: var(--red); margin-top: 4px; }
.devolucion-card.dark .devolucion-icon { color: var(--gray-dark); }
.devolucion-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 4px;
}
.devolucion-plazo {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: var(--black);
  line-height: 1.1;
  margin-bottom: 8px;
}
.devolucion-desc { font-size: 0.86rem; color: var(--gray-dark); line-height: 1.65; }
.devolucion-nota {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 28px;
  padding: 20px 24px;
  background: var(--white);
  border-left: 4px solid var(--red);
  font-size: 0.88rem;
  color: var(--gray-dark);
  line-height: 1.7;
}
.devolucion-nota strong { color: var(--black); }
.devolucion-nota a { color: var(--red); text-decoration: none; font-weight: 600; }
.devolucion-nota a:hover { text-decoration: underline; }
.nota-icon { flex-shrink: 0; margin-top: 2px; color: var(--red); }

/* ─── PRODUCTOS ESPECIALES ─── */
.especiales-section { background: var(--white); }
.especiales-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 48px;
  background: var(--gray-light);
}
.especial-card {
  background: var(--white);
  padding: 32px 28px;
  transition: background 0.2s;
}
.especial-card:hover { background: var(--off-white); }
.especial-icon {
  display: block;
  margin-bottom: 14px;
  color: var(--red);
}
.especial-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--black);
  margin-bottom: 10px;
}
.especial-desc { font-size: 0.86rem; color: var(--gray); line-height: 1.7; }

/* ─── GARANTÍA ─── */
.garantia-section {
  position: relative;
  padding: 80px 72px;
  overflow: hidden;
}
.garantia-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80');
  background-size: cover;
  background-position: center 60%;
}
.garantia-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,10,10,0.93);
}
.garantia-content { position: relative; z-index: 2; }
.garantia-header { margin-bottom: 48px; }
.garantia-header .section-label    { color: rgba(255,255,255,0.5); }
.garantia-header .section-title    { color: var(--white); }
.garantia-header .section-subtitle { color: rgba(255,255,255,0.68); }
.garantia-header .section-subtitle strong { color: var(--white); }

.garantia-proceso-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: rgba(255,255,255,0.06);
  margin-bottom: 40px;
}
.garantia-step {
  background: rgba(255,255,255,0.03);
  padding: 28px 24px;
  border-right: 1px solid rgba(255,255,255,0.06);
  transition: background 0.2s;
}
.garantia-step:last-child { border-right: none; }
.garantia-step:hover { background: rgba(255,255,255,0.07); }
.garantia-step-icon {
  display: block;
  margin-bottom: 14px;
  color: rgba(255,255,255,0.5);
}
.garantia-step:hover .garantia-step-icon { color: var(--red); }
.garantia-step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--white);
  margin-bottom: 8px;
}
.garantia-step-desc { font-size: 0.82rem; color: rgba(255,255,255,0.52); line-height: 1.65; }

.garantia-no-aplica {
  background: rgba(178,25,21,0.1);
  border: 1px solid rgba(178,25,21,0.3);
  border-left: 5px solid var(--red);
  padding: 28px 32px;
  margin-bottom: 24px;
}
.no-aplica-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 18px;
}
.no-aplica-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.no-aplica-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: rgba(255,255,255,0.7);
}
.no-aplica-dot {
  width: 6px;
  height: 6px;
  background: var(--red);
  border-radius: 50%;
  flex-shrink: 0;
}

.garantia-outlet-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 20px 24px;
  font-size: 0.86rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
}
.garantia-outlet-icon { flex-shrink: 0; margin-top: 2px; color: rgba(255,255,255,0.4); }
.garantia-outlet-box strong { color: rgba(255,255,255,0.9); }

/* ─── IMPORTANTE ─── */
.importante-section { background: var(--off-white); }
.importante-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  margin-top: 48px;
  background: var(--gray-light);
}
.importante-card {
  background: var(--white);
  padding: 32px 28px;
  transition: background 0.2s;
}
.importante-card:hover { background: var(--off-white); }
.importante-icon {
  display: block;
  margin-bottom: 14px;
  color: var(--red);
}
.importante-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--black);
  margin-bottom: 10px;
}
.importante-desc { font-size: 0.85rem; color: var(--gray); line-height: 1.7; }

/* ─── CTA ─── */
.cta-section {
  background: var(--black);
  text-align: center;
  padding: 80px 72px;
}
.cta-section .section-label    { color: rgba(255,255,255,0.5); }
.cta-section .section-title    { color: var(--white); }
.cta-section .section-subtitle { color: rgba(255,255,255,0.6); margin: 0 auto; }

.cta-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 48px;
  flex-wrap: wrap;
}
.cta-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 32px 40px;
  text-decoration: none;
  text-align: center;
  min-width: 220px;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.cta-card:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.3); transform: translateY(-4px); }
.cta-card.featured { border-color: var(--red); border-top: 4px solid var(--red); }
.cta-card-icon { color: rgba(255,255,255,0.4); margin-bottom: 6px; }
.cta-card.featured .cta-card-icon { color: var(--red); }
.cta-card-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}
.cta-card-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.05rem;
  text-transform: uppercase;
  color: var(--white);
  letter-spacing: 0.02em;
}
.cta-card.featured .cta-card-value { color: var(--red); }
.cta-card-sub { font-size: 0.78rem; color: rgba(255,255,255,0.35); }

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .condiciones-grid       { grid-template-columns: 1fr 1fr; }
  .especiales-grid        { grid-template-columns: 1fr 1fr; }
  .garantia-proceso-grid  { grid-template-columns: 1fr 1fr; }
  .importante-grid        { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 1024px) {
  section,
  .condiciones-section,
  .garantia-section { padding: 64px 28px; }
  .hero-content { padding: 48px 28px; }
  .resumen-strip { flex-direction: column; }
  .resumen-item  { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .video-inner   { grid-template-columns: 1fr; gap: 40px; }
  .proceso-grid  { grid-template-columns: 1fr; }
  .devolucion-grid { grid-template-columns: 1fr; }
  .senales-grid  { grid-template-columns: 1fr 1fr; }
  .no-aplica-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .condiciones-grid       { grid-template-columns: 1fr; }
  .especiales-grid        { grid-template-columns: 1fr; }
  .garantia-proceso-grid  { grid-template-columns: 1fr; }
  .importante-grid        { grid-template-columns: 1fr; }
  .senales-grid           { grid-template-columns: 1fr; }
  .no-aplica-grid         { grid-template-columns: 1fr; }
  .cta-cards              { flex-direction: column; align-items: center; }
}
</style>
