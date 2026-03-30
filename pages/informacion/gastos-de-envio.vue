<script setup lang="ts">
useHead({
  title: 'Gastos de Envío | Motomundi',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500;600&display=swap',
    },
  ],
})

const tiendas = [
  { nombre: 'Las Tranqueras', icon: '📍' },
  { nombre: 'Mall Sport',     icon: '📍' },
  { nombre: 'La Reina',       icon: '📍' },
  { nombre: 'Concepción',     icon: '📍' },
  { nombre: 'Temuco',         icon: '📍' },
  { nombre: 'Antofagasta',    icon: '📍' },
]

const modalidades = [
  {
    id: 'retiro',
    icon: '🏪',
    label: 'Sin costo de envío',
    title: 'Retiro en Tienda',
    desc: 'Los pedidos con retiro en cualquiera de nuestras tiendas Motomundi no tienen costo de envío.',
    badge: 'GRATIS',
    badgeColor: 'green',
  },
  {
    id: 'click',
    icon: '⚡',
    label: 'Click & Collect',
    title: 'Retira en 2 Horas',
    desc: 'Retira tu pedido en 2 horas en la tienda seleccionada (según disponibilidad de stock). El plazo se cuenta desde la apertura de la tienda.',
    badge: 'GRATIS',
    badgeColor: 'green',
  },
  {
    id: 'domicilio',
    icon: '🚚',
    label: 'Envío a domicilio',
    title: 'Despacho a Tu Puerta',
    desc: 'Envío gratuito en compras iguales o superiores a $150.000. Para montos menores, el costo se calcula automáticamente en el checkout según la comuna de destino.',
    badge: 'DESDE $0',
    badgeColor: 'red',
  },
  {
    id: 'express',
    icon: '🏎️',
    label: 'Solo RM · Mismo día',
    title: 'Envío Express',
    desc: 'Recibe tu pedido en un máximo de 4 horas dentro de la Región Metropolitana (sujeto a disponibilidad de stock y horario de compra).',
    badge: 'MISMO DÍA',
    badgeColor: 'red',
  },
]

const notas = [
  { icon: '⚖️', text: 'Los costos de envío pueden variar según el peso, volumen y destino del pedido.' },
  { icon: '🪖', text: 'Los productos voluminosos (cascos, maletas, neumáticos) pueden tener costos adicionales de transporte.' },
  { icon: '✅', text: 'Los pedidos serán despachados una vez confirmado el pago.' },
  { icon: '↩️', text: 'En caso de devoluciones, los costos de envío no son reembolsables.' },
]
</script>

<template>
  <div class="envio-page">

    <!-- ─── HERO ─── -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-eyebrow">Información de despacho</div>
        <h1>Gastos de<br /><em>Envío</em></h1>
        <p>Enviamos a todo Chile, desde Arica hasta Punta Arenas, incluyendo Isla de Pascua y zonas extremas. Los gastos de envío se calculan automáticamente al finalizar tu compra.</p>
      </div>
    </section>

    <!-- ─── MODALIDADES GRID ─── -->
    <section class="modalidades-section">
      <span class="section-label">¿Cómo quieres recibirlo?</span>
      <h2 class="section-title">Opciones de Envío</h2>
      <p class="section-subtitle">Elige la modalidad que mejor se adapte a tus necesidades. Todos los pedidos se confirman una vez acreditado el pago.</p>
      <div class="modalidades-grid">
        <div
          v-for="m in modalidades"
          :key="m.id"
          class="modalidad-card"
          :class="m.id"
        >
          <div class="modalidad-top">
            <span class="modalidad-icon">{{ m.icon }}</span>
            <span class="modalidad-badge" :class="m.badgeColor">{{ m.badge }}</span>
          </div>
          <div class="modalidad-label">{{ m.label }}</div>
          <div class="modalidad-title">{{ m.title }}</div>
          <p class="modalidad-desc">{{ m.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ─── RETIRO EN TIENDA (detalle) ─── -->
    <section class="tiendas-section">
      <div class="tiendas-inner">
        <div class="tiendas-text">
          <span class="section-label">Red de tiendas</span>
          <h2 class="section-title">Retiro en Tienda<br /><em>Sin Costo</em></h2>
          <p class="section-subtitle">Elige retirar tu pedido en cualquiera de nuestras tiendas y ahórrate el costo de envío. Disponible en 6 sucursales a lo largo del país.</p>
          <div class="courier-note">
            <span class="courier-note-icon">ℹ️</span>
            <span>Para conocer horarios y disponibilidad actualizada, visita nuestra portada o síguenos en redes sociales.</span>
          </div>
        </div>
        <div class="tiendas-grid">
          <div v-for="t in tiendas" :key="t.nombre" class="tienda-card">
            <span class="tienda-icon">{{ t.icon }}</span>
            <span class="tienda-nombre">{{ t.nombre }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── UMBRAL ENVÍO GRATIS ─── -->
    <div class="umbral-strip">
      <div class="umbral-inner">
        <div class="umbral-left">
          <span class="umbral-label">Envío a domicilio gratuito</span>
          <span class="umbral-amount">$150.000</span>
          <span class="umbral-sub">o más en tu compra</span>
        </div>
        <div class="umbral-divider" />
        <div class="umbral-right">
          <p>Para compras inferiores a $150.000, el costo de envío se calcula automáticamente en el checkout según tu comuna de destino a través de nuestros transportes asociados:</p>
          <div class="courier-logos">
            <span class="courier-tag">Starken</span>
            <span class="courier-tag">Chilexpress</span>
            <span class="courier-tag">Bluexpress</span>
            <span class="courier-tag">y otros</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── ZONAS EXTREMAS (dark with BG) ─── -->
    <section class="zonas-section">
      <div class="zonas-bg" />
      <div class="zonas-overlay" />
      <div class="zonas-content">
        <div class="zonas-text">
          <span class="section-label">Cobertura nacional total</span>
          <h2 class="section-title">Zonas Extremas</h2>
          <p class="section-subtitle">Llegamos a Aysén, Magallanes, Isla de Pascua y todas las comunas de difícil acceso. Los plazos de entrega pueden ser mayores y el envío puede realizarse vía transporte marítimo o aéreo.</p>
        </div>
        <div class="zonas-box">
          <div class="zonas-box-title">🗺 Regiones con condiciones especiales</div>
          <ul class="zonas-list">
            <li><strong>XI Región — Aysén:</strong> envío marítimo o aéreo, plazos extendidos.</li>
            <li><strong>XII Región — Magallanes:</strong> envío marítimo o aéreo, plazos extendidos.</li>
            <li><strong>Isla de Pascua:</strong> envío aéreo exclusivo, consultar disponibilidad.</li>
            <li><strong>Comunas de difícil acceso:</strong> costos y plazos se informan en el checkout.</li>
          </ul>
          <p class="zonas-footer-note">Los costos de transporte para estas zonas se mostrarán al finalizar la compra.</p>
        </div>
      </div>
    </section>

    <!-- ─── NOTAS IMPORTANTES ─── -->
    <section class="notas-section">
      <span class="section-label">Condiciones generales</span>
      <h2 class="section-title">Notas Importantes</h2>
      <div class="notas-grid">
        <div v-for="nota in notas" :key="nota.text" class="nota-card">
          <span class="nota-icon">{{ nota.icon }}</span>
          <p class="nota-text">{{ nota.text }}</p>
        </div>
      </div>
    </section>

    <!-- ─── CONTACTO ─── -->
    <section class="contacto-section">
      <div class="contacto-bg" />
      <div class="contacto-overlay" />
      <div class="contacto-content">
        <span class="section-label">¿Tienes dudas sobre tu despacho?</span>
        <h2 class="section-title">Estamos Acá<br /><em>para Ayudarte</em></h2>
        <div class="contacto-cards">
          <a href="mailto:ventas@motomundi.cl" class="contacto-card">
            <span class="contacto-icon">✉️</span>
            <div class="contacto-label">Correo electrónico</div>
            <div class="contacto-value">ventas@motomundi.cl</div>
          </a>
          <a href="#" class="contacto-card whatsapp">
            <span class="contacto-icon">📲</span>
            <div class="contacto-label">WhatsApp oficial</div>
            <div class="contacto-value">Escríbenos ahora →</div>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ─── VARIABLES ─── */
.envio-page {
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
  min-height: 520px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80');
  background-size: cover;
  background-position: center 35%;
  transform: scale(1.03);
  transition: transform 8s ease;
}
.hero:hover .hero-bg { transform: scale(1); }

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(10, 10, 10, 0.9) 0%,
    rgba(10, 10, 10, 0.52) 55%,
    rgba(0, 0, 0, 0.15) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 64px 72px;
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
  color: rgba(255, 255, 255, 0.82);
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
  from { opacity: 0; transform: translateY(24px); }
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
  max-width: 620px;
  line-height: 1.75;
}

/* ─── MODALIDADES ─── */
.modalidades-section { background: var(--off-white); }

.modalidades-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  margin-top: 48px;
  background: var(--gray-light);
}

.modalidad-card {
  background: var(--white);
  padding: 36px 28px;
  transition: background 0.2s, transform 0.2s;
  position: relative;
}
.modalidad-card:hover { background: var(--off-white); transform: translateY(-4px); }

.modalidad-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--red);
}
.modalidad-card.retiro::before,
.modalidad-card.click::before { background: var(--green); }

.modalidad-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.modalidad-icon { font-size: 2rem; }

.modalidad-badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  text-transform: uppercase;
}
.modalidad-badge.green { background: #dcfce7; color: var(--green); }
.modalidad-badge.red   { background: #fee2e2; color: var(--red); }

.modalidad-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 6px;
}

.modalidad-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.4rem;
  text-transform: uppercase;
  color: var(--black);
  margin-bottom: 12px;
  line-height: 1.1;
}

.modalidad-desc {
  font-size: 0.86rem;
  color: var(--gray);
  line-height: 1.65;
}

/* ─── TIENDAS ─── */
.tiendas-section { background: var(--white); }

.tiendas-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.tiendas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: var(--gray-light);
}

.tienda-card {
  background: var(--white);
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.2s;
}
.tienda-card:hover { background: var(--off-white); }

.tienda-icon { font-size: 1.1rem; color: var(--red); }

.tienda-nombre {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--black);
}

.courier-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 28px;
  padding: 16px 18px;
  background: var(--off-white);
  border-left: 4px solid var(--red);
  font-size: 0.85rem;
  color: var(--gray);
  line-height: 1.6;
}
.courier-note-icon { flex-shrink: 0; font-size: 1rem; }

/* ─── UMBRAL STRIP ─── */
.umbral-strip {
  background: var(--black);
  padding: 48px 72px;
}

.umbral-inner {
  display: grid;
  grid-template-columns: auto 1px 1fr;
  gap: 48px;
  align-items: center;
}

.umbral-left { text-align: center; }

.umbral-label {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.umbral-amount {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 4rem;
  color: var(--white);
  line-height: 1;
}

.umbral-sub {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
  margin-top: 4px;
}

.umbral-divider {
  background: rgba(255, 255, 255, 0.12);
  height: 100%;
  min-height: 80px;
}

.umbral-right p {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  margin-bottom: 20px;
}

.courier-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.courier-tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.75);
}

/* ─── ZONAS EXTREMAS ─── */
.zonas-section {
  position: relative;
  padding: 80px 72px;
  overflow: hidden;
}

.zonas-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80');
  background-size: cover;
  background-position: center;
}

.zonas-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(178,25,21,0.7) 100%);
}

.zonas-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.zonas-text .section-label    { color: rgba(255,255,255,0.55); }
.zonas-text .section-title    { color: var(--white); }
.zonas-text .section-subtitle { color: rgba(255,255,255,0.72); max-width: 480px; }

.zonas-box {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.15);
  border-left: 5px solid var(--red);
  backdrop-filter: blur(10px);
  padding: 32px 28px;
}

.zonas-box-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 18px;
}

.zonas-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.zonas-list li {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.82);
  line-height: 1.6;
  padding-left: 14px;
  border-left: 2px solid rgba(255,255,255,0.15);
}
.zonas-list li strong { color: var(--white); }

.zonas-footer-note {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.12);
  font-size: 0.82rem;
  color: rgba(255,255,255,0.5);
  font-style: italic;
}

/* ─── NOTAS IMPORTANTES ─── */
.notas-section { background: var(--off-white); }

.notas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  margin-top: 48px;
  background: var(--gray-light);
}

.nota-card {
  background: var(--white);
  padding: 32px 28px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: background 0.2s;
}
.nota-card:hover { background: var(--off-white); }

.nota-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }

.nota-text {
  font-size: 0.9rem;
  color: var(--gray-dark);
  line-height: 1.7;
}

/* ─── CONTACTO ─── */
.contacto-section {
  position: relative;
  padding: 80px 72px;
  overflow: hidden;
  text-align: center;
}

.contacto-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80');
  background-size: cover;
  background-position: center 60%;
}

.contacto-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.88);
}

.contacto-content {
  position: relative;
  z-index: 2;
}

.contacto-content .section-label  { color: rgba(255,255,255,0.55); }
.contacto-content .section-title  { color: var(--white); margin-bottom: 48px; }

.contacto-cards {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.contacto-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 36px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  min-width: 240px;
}
.contacto-card:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.35);
  transform: translateY(-4px);
}
.contacto-card.whatsapp { border-color: rgba(37,211,102,0.4); }
.contacto-card.whatsapp:hover { border-color: rgba(37,211,102,0.8); }

.contacto-icon { font-size: 2rem; }

.contacto-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}

.contacto-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .modalidades-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1024px) {
  section,
  .zonas-section,
  .contacto-section,
  .umbral-strip { padding: 64px 28px; }

  .hero-content { padding: 48px 28px; }

  .tiendas-inner        { grid-template-columns: 1fr; gap: 36px; }
  .zonas-content        { grid-template-columns: 1fr; gap: 36px; }
  .umbral-inner         { grid-template-columns: 1fr; text-align: left; }
  .umbral-divider       { display: none; }
}

@media (max-width: 768px) {
  .modalidades-grid { grid-template-columns: 1fr; }
  .notas-grid       { grid-template-columns: 1fr; }
  .contacto-cards   { flex-direction: column; align-items: center; }
  .tiendas-grid     { grid-template-columns: 1fr; }
}
</style>
