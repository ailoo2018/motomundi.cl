<script setup lang="ts">
useHead({
  title: 'Plazos de Entrega | Motomundi',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500;600&display=swap',
    },
  ],
})

const deliveryRegions = [
  { region: 'Región Metropolitana (RM)',               days: '1 – 2 días', speed: 'fast', coverage: 'Todo Santiago y comunas',   note: 'Despacho prioritario' },
  { region: 'V Región — Valparaíso / Viña del Mar',    days: '2 – 3 días', speed: 'fast', coverage: 'Ciudades principales',       note: '—' },
  { region: 'VI Región — O\'Higgins',                   days: '2 – 3 días', speed: 'fast', coverage: 'Rancagua, Rengo y otras',   note: '—' },
  { region: 'VII Región — Maule',                       days: '3 – 4 días', speed: 'med',  coverage: 'Talca, Curicó, Linares',    note: '—' },
  { region: 'VIII Región — Biobío',                     days: '3 – 4 días', speed: 'med',  coverage: 'Concepción, Chillán',       note: '—' },
  { region: 'IX Región — La Araucanía',                 days: '4 – 5 días', speed: 'med',  coverage: 'Temuco, Villarrica',        note: '—' },
  { region: 'X Región — Los Lagos',                     days: '4 – 5 días', speed: 'med',  coverage: 'Puerto Montt, Osorno',      note: '—' },
  { region: 'IV Región — Coquimbo / La Serena',         days: '3 – 5 días', speed: 'med',  coverage: 'La Serena, Coquimbo',       note: '—' },
  { region: 'III Región — Atacama',                     days: '5 – 7 días', speed: 'slow', coverage: 'Copiapó, Vallenar',         note: 'Consultar disponibilidad' },
  { region: 'II Región — Antofagasta',                  days: '5 – 7 días', speed: 'slow', coverage: 'Antofagasta, Calama',       note: 'Consultar disponibilidad' },
  { region: 'I Región — Tarapacá / XV Región — Arica', days: '6 – 8 días', speed: 'slow', coverage: 'Iquique, Arica',            note: 'Consultar disponibilidad' },
  { region: 'XIV Región — Los Ríos',                    days: '4 – 6 días', speed: 'med',  coverage: 'Valdivia',                  note: '—' },
  { region: 'XI y XII Región — Aysén y Magallanes',     days: '7 – 10 días', speed: 'slow', coverage: 'Coyhaique, Punta Arenas', note: 'Consultar disponibilidad' },
]
</script>

<template>
  <div class="plazos-page">

    <!-- ─── HERO ─── -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-eyebrow">Información de envíos</div>
        <h1>Plazos de<br /><em>Entrega</em></h1>
        <p>En Motomundi seguimos trabajando a toda máquina para llevar la pasión donde estés. Conoce todos los detalles de nuestro proceso de despacho a lo largo de Chile.</p>
      </div>
    </section>

    <!-- ─── PROCESO DE COMPRA ─── -->
    <section class="proceso">
      <span class="section-label">¿Cómo funciona?</span>
      <h2 class="section-title">Proceso de Compra</h2>
      <p class="section-subtitle">Desde que haces clic en "comprar" hasta que tu pedido llega a tus manos, esto es lo que ocurre en cada etapa.</p>
      <div class="proceso-grid">
        <div class="proceso-step">
          <span class="step-number">01</span>
          <span class="step-icon">🛒</span>
          <div class="step-title">Orden Confirmada</div>
          <p class="step-desc">Recibirás un correo electrónico de confirmación en cuanto tu compra sea procesada exitosamente en nuestro sistema.</p>
          <span class="step-tag">Inmediato</span>
        </div>
        <div class="proceso-step">
          <span class="step-number">02</span>
          <span class="step-icon">📦</span>
          <div class="step-title">Preparación del Pedido</div>
          <p class="step-desc">Nuestro equipo de bodega se encargará de revisar, empacar y alistar tu orden con el mayor cuidado posible.</p>
          <span class="step-tag">Hasta 5 días hábiles</span>
        </div>
        <div class="proceso-step">
          <span class="step-number">03</span>
          <span class="step-icon">✉️</span>
          <div class="step-title">Aviso de Despacho</div>
          <p class="step-desc">Te notificaremos vía correo electrónico cuando tu pedido esté listo y en manos del servicio courier (Alasxpress).</p>
          <span class="step-tag">Antes del envío</span>
        </div>
        <div class="proceso-step">
          <span class="step-number">04</span>
          <span class="step-icon">🏍️</span>
          <div class="step-title">Entrega en Destino</div>
          <p class="step-desc">El courier realizará la entrega según los plazos indicados en la tabla de despacho, según tu región de destino.</p>
          <span class="step-tag">Según tabla adjunta</span>
        </div>
      </div>
    </section>

    <!-- ─── CORTE HORARIO ─── -->
    <section class="corte-section">
      <span class="section-label">Hora de corte</span>
      <h2 class="section-title">¿Cuándo compraste?</h2>
      <p class="section-subtitle">La hora en que realizas tu compra determina cuándo comienza a contar el plazo de entrega del courier.</p>
      <div class="corte-grid">
        <div class="corte-card antes">
          <div class="corte-time">Antes<br />12:00</div>
          <p class="corte-desc">
            Si realizas tu compra <strong>antes de las 12:00 hrs</strong> de cualquier día hábil,
            el plazo de entrega del courier comienza a contarse ese mismo día, conforme a los tiempos
            indicados en la tabla de plazos.
          </p>
          <span class="corte-badge">✓ Plazo estándar de la tabla</span>
        </div>
        <div class="corte-card despues">
          <div class="corte-time">Después<br />12:00</div>
          <p class="corte-desc">
            Si tu compra fue cursada <strong>después de las 12:00 hrs</strong>, debes
            <strong>sumar 1 día hábil adicional</strong> al plazo indicado en la tabla de plazos,
            ya que el inicio del despacho se desplaza al siguiente día hábil.
          </p>
          <span class="corte-badge">⚠ Plazo tabla + 1 día hábil</span>
        </div>
      </div>
    </section>

    <!-- ─── TABLA DE PLAZOS ─── -->
    <section class="table-section">
      <span class="section-label">Tiempos de entrega courier</span>
      <h2 class="section-title">Tabla de Plazos — Alasxpress</h2>
      <p class="table-note">
        * Los tiempos indicados no contemplan los 5 días hábiles de procesamiento interno.
        Tampoco son válidos para situaciones de emergencia, contingencia o campañas promocionales
        masivas (MMDays / Cyber).
      </p>
      <div class="delivery-table-wrap">
        <table class="delivery-table">
          <thead>
          <tr>
            <th>Región de Destino</th>
            <th>Días hábiles (courier)</th>
            <th>Cobertura</th>
            <th>Observaciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in deliveryRegions" :key="row.region">
            <td>{{ row.region }}</td>
            <td><span class="days-badge" :class="row.speed">{{ row.days }}</span></td>
            <td>{{ row.coverage }}</td>
            <td>{{ row.note }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ─── AVISO STOCK ─── -->
    <section class="aviso-stock">
      <div class="aviso-stock-bg" />
      <div class="aviso-stock-overlay" />
      <div class="aviso-stock-content">
        <div class="aviso-stock-text">
          <span class="section-label">Aviso de stock</span>
          <h2 class="section-title">Productos Fuera de Bodega Santiago</h2>
          <p class="section-subtitle">
            Algunos productos pueden tener tiempos de procesamiento y despacho mayores al habitual.
            Te recomendamos siempre consultar el stock disponible antes de finalizar tu compra.
          </p>
        </div>
        <div class="aviso-box">
          <div class="aviso-box-title">⚠ ¿Cuándo aplica este aviso?</div>
          <p>
            Para todos los productos que <strong>no figuren con stock disponible en nuestra Bodega
            Santiago</strong>, o para aquellos que presenten un aviso especial en la ficha del
            producto, el tiempo de procesamiento y despacho puede ser
            <strong>considerablemente mayor</strong> al habitual.<br /><br />
            En estos casos, el plazo de despacho indicado en la tabla <strong>no aplica</strong>
            directamente. Si tienes dudas, contáctanos antes de comprar.
          </p>
        </div>
      </div>
    </section>

    <!-- ─── PROMISE STRIP ─── -->
    <div class="promise-strip">
      <div class="promise-item">
        <span class="promise-icon">📧</span>
        <span class="promise-text">Notificación por correo en cada etapa</span>
      </div>
      <div class="promise-item">
        <span class="promise-icon">🔒</span>
        <span class="promise-text">Pago 100% seguro</span>
      </div>
      <div class="promise-item">
        <span class="promise-icon">🛡️</span>
        <span class="promise-text">Productos 100% originales</span>
      </div>
      <div class="promise-item">
        <span class="promise-icon">🤝</span>
        <span class="promise-text">Estamos acá para ayudarte</span>
      </div>
    </div>

    <!-- ─── CANALES DE CONTACTO ─── -->
    <section class="contacto">
      <span class="section-label">¿Tienes dudas?</span>
      <h2 class="section-title">Contáctanos</h2>
      <p class="section-subtitle">Nuestros equipos están a tu disposición para resolver cualquier consulta sobre tu pedido o el estado de tu despacho.</p>
      <div class="contacto-grid">
        <div class="contacto-card">
          <span class="contacto-icon">💬</span>
          <div class="contacto-label">Chat en línea</div>
          <div class="contacto-title">Chat del Sitio Web</div>
          <p class="contacto-desc">Habla directamente con uno de nuestros asesores a través del chat disponible en nuestra tienda online.</p>
          <a href="https://api.whatsapp.com/send?phone=15558366927&amp;text=¡Hola!" target="_blank" class="contacto-link">Abrir chat →</a>
        </div>
        <div class="contacto-card">
          <span class="contacto-icon">📲</span>
          <div class="contacto-label">Redes sociales</div>
          <div class="contacto-title">Instagram &amp; Facebook</div>
          <p class="contacto-desc">Síguenos y escríbenos por mensaje directo. Revisamos nuestras redes con frecuencia y respondemos a la brevedad.</p>
          <a href="https://www.instagram.com/motomundi/" target="_blank" class="contacto-link">Ver redes sociales →</a>
        </div>
        <div class="contacto-card">
          <span class="contacto-icon">✉️</span>
          <div class="contacto-label">Correo electrónico</div>
          <div class="contacto-title">Atención al Cliente</div>
          <p class="contacto-desc">Escríbenos a nuestro correo de atención al cliente con el número de tu orden y te responderemos a la brevedad.</p>
          <a href="/contactenos" class="contacto-link">Enviar correo →</a>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ─── CSS VARIABLES ─── */
.plazos-page {
  --red: #B21915;
  --red-dark: #8a1210;
  --black: #111111;
  --dark: #1e1e1e;
  --gray-dark: #3a3a3a;
  --gray: #6b6b6b;
  --gray-light: #d0d0d0;
  --off-white: #f7f5f2;
  --white: #ffffff;

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
  background-image: url('/cms/delivery.jpg');
  background-size: cover;
  background-position: center 40%;
  transform: scale(1.03);
  transition: transform 8s ease;
}
.hero:hover .hero-bg { transform: scale(1); }

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(10, 10, 10, 0.88) 0%,
    rgba(10, 10, 10, 0.5) 55%,
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

.hero h1 em {
  color: var(--red);
  font-style: normal;
}

.hero p {
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  font-weight: 300;
  max-width: 500px;
  line-height: 1.7;
}

.hero-content > * {
  animation: fadeUp 0.7s ease both;
}
.hero-content > *:nth-child(1) { animation-delay: 0.1s; }
.hero-content > *:nth-child(2) { animation-delay: 0.25s; }
.hero-content > *:nth-child(3) { animation-delay: 0.4s; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── CONTINGENCIA BANNER ─── */
.contingencia {
  background: var(--black);
  border-left: 6px solid var(--red);
  padding: 28px 48px;
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.contingencia-icon {
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.contingencia-body h2 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 10px;
}

.contingencia-body p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.7;
}

.contingencia-body strong {
  color: var(--white);
}

/* ─── SECTION COMMON ─── */
section {
  padding: 80px 72px;
}

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

.section-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: var(--gray);
  max-width: 620px;
  line-height: 1.75;
}

/* ─── PROCESO ─── */
.proceso {
  background: var(--off-white);
}

.proceso-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 56px;
  border: 1px solid var(--gray-light);
}

.proceso-step {
  padding: 36px 28px;
  border-right: 1px solid var(--gray-light);
  position: relative;
  transition: background 0.25s;
}
.proceso-step:last-child { border-right: none; }
.proceso-step:hover { background: var(--white); }

.step-number {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 4.5rem;
  color: rgba(178, 25, 21, 0.08);
  line-height: 1;
  position: absolute;
  top: 16px;
  right: 20px;
}

.step-icon {
  font-size: 1.8rem;
  margin-bottom: 16px;
  display: block;
}

.step-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--black);
  margin-bottom: 10px;
}

.step-desc {
  font-size: 0.87rem;
  color: var(--gray);
  line-height: 1.65;
}

.step-tag {
  display: inline-block;
  margin-top: 14px;
  background: var(--red);
  color: var(--white);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 4px 12px;
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
}

/* ─── CORTE HORARIO ─── */
.corte-section {
  background: var(--white);
}

.corte-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 40px;
}

.corte-card {
  border: 2px solid var(--gray-light);
  padding: 36px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
}
.corte-card:hover { border-color: var(--red); transform: translateY(-3px); }

.corte-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
}
.corte-card.antes::before { background: #16a34a; }
.corte-card.despues::before { background: var(--red); }

.corte-time {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 3.6rem;
  line-height: 1;
  color: var(--black);
  margin-bottom: 4px;
}
.corte-card.despues .corte-time { color: var(--red); }

.corte-desc {
  font-size: 0.88rem;
  color: var(--gray);
  line-height: 1.65;
  margin-top: 10px;
}

.corte-badge {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  margin-top: 16px;
}
.corte-card.antes .corte-badge { background: #dcfce7; color: #16a34a; }
.corte-card.despues .corte-badge { background: #fee2e2; color: var(--red); }

/* ─── TABLA ─── */
.table-section {
  background: var(--off-white);
}

.table-note {
  font-size: 0.82rem;
  color: var(--gray);
  margin-bottom: 36px;
  font-style: italic;
}

.delivery-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--gray-light);
}

.delivery-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 640px;
}

.delivery-table thead {
  background: var(--black);
  color: var(--white);
}

.delivery-table thead th {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 18px 24px;
  text-align: left;
}

.delivery-table thead th:first-child {
  border-left: 6px solid var(--red);
}

.delivery-table tbody tr {
  border-bottom: 1px solid var(--gray-light);
  transition: background 0.15s;
}
.delivery-table tbody tr:last-child { border-bottom: none; }
.delivery-table tbody tr:hover { background: rgba(178, 25, 21, 0.04); }

.delivery-table td {
  padding: 18px 24px;
  color: var(--dark);
  vertical-align: middle;
}

.delivery-table td:first-child {
  font-weight: 600;
  color: var(--black);
}

.days-badge {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
  background: var(--black);
  color: var(--white);
  padding: 4px 14px;
}
.days-badge.fast { background: #16a34a; }
.days-badge.med  { background: var(--red); }
.days-badge.slow { background: var(--gray-dark); }

/* ─── AVISO STOCK ─── */
.aviso-stock {
  position: relative;
  padding: 80px 72px;
  overflow: hidden;
}

.aviso-stock-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1600&q=80');
  background-size: cover;
  background-position: center;
}

.aviso-stock-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.93) 0%, rgba(178, 25, 21, 0.72) 100%);
}

.aviso-stock-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.aviso-stock-text .section-label  { color: rgba(255, 255, 255, 0.6); }
.aviso-stock-text .section-title  { color: var(--white); }
.aviso-stock-text .section-subtitle { color: rgba(255, 255, 255, 0.72); max-width: 480px; }

.aviso-box {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-left: 5px solid var(--red);
  backdrop-filter: blur(10px);
  padding: 32px 28px;
}

.aviso-box p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.75;
}

.aviso-box strong {
  color: var(--white);
  font-weight: 600;
}

.aviso-box-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 14px;
}

/* ─── PROMISE STRIP ─── */
.promise-strip {
  background: var(--red);
  padding: 36px 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.promise-item {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--white);
}

.promise-icon { font-size: 1.6rem; flex-shrink: 0; }

.promise-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ─── CONTACTO ─── */
.contacto {
  background: var(--white);
}

.contacto-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 48px;
  background: var(--gray-light);
}

.contacto-card {
  background: var(--white);
  padding: 36px 32px;
  text-align: center;
  transition: background 0.2s;
}
.contacto-card:hover { background: var(--off-white); }

.contacto-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 14px;
}

.contacto-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 6px;
}

.contacto-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: var(--black);
  margin-bottom: 8px;
}

.contacto-desc {
  font-size: 0.85rem;
  color: var(--gray);
  line-height: 1.6;
}

.contacto-link {
  display: inline-block;
  margin-top: 14px;
  color: var(--red);
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  letter-spacing: 0.04em;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.contacto-link:hover { border-color: var(--red); }

/* ─── RESPONSIVE ─── */
@media (max-width: 1024px) {
  section,
  .aviso-stock,
  .promise-strip { padding: 64px 28px; }

  .contingencia { padding: 24px 28px; }

  .proceso-grid {
    grid-template-columns: 1fr 1fr;
  }
  .proceso-step {
    border-right: none;
    border-bottom: 1px solid var(--gray-light);
  }

  .aviso-stock-content {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .contacto-grid { grid-template-columns: 1fr; }
  .hero-content  { padding: 48px 28px; }
  .corte-grid    { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .proceso-grid  { grid-template-columns: 1fr; }
  .promise-strip { flex-direction: column; align-items: flex-start; }
}
</style>
