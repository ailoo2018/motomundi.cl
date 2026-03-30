<script setup lang="ts">
useHead({
  title: 'Formas de Pago | Motomundi',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500;600&display=swap',
    },
  ],
})

const metodosResumen = [
  { icon: '💳', label: 'Tarjeta de crédito o débito', tags: ['VISA', 'Mastercard', 'AMEX'],   color: 'red' },
  { icon: '🛒', label: 'MercadoPago',                  tags: ['Cuotas', 'Wallet', 'QR'],        color: 'mp' },
  { icon: '🏦', label: 'Transferencia bancaria',       tags: ['BCI'],                           color: 'dark' },
  { icon: '🌍', label: 'Pagos internacionales',        tags: ['DLocal', 'PayPal', 'PayPal 4x'], color: 'blue' },
]

const tarjetas = ['VISA', 'Mastercard', 'AMEX']

const bancoDatos = [
  { label: 'Beneficiario',   value: 'Autovia Chile Limitada' },
  { label: 'Tipo de cuenta', value: 'Cuenta Corriente' },
  { label: 'N° de cuenta',   value: '81873247' },
  { label: 'RUT',            value: '76.014.548-3' },
  { label: 'Banco',          value: 'BCI' },
]

const seguridadItems = [
  { icon: '🔒', title: 'Conexión HTTPS',        desc: 'Todas las transacciones se realizan bajo protocolo seguro SSL/HTTPS. Motomundi nunca retiene ni almacena tus datos bancarios.' },
  { icon: '🏦', title: 'Pago directo',          desc: 'Al pagar con tarjeta eres redirigido al entorno seguro de nuestra entidad bancaria, sin intermediarios.' },
  { icon: '↩️', title: 'Reembolso garantizado', desc: 'Ante cualquier incidencia de stock o despacho, devolvemos el importe íntegro en un plazo máximo de 15 días hábiles.' },
  { icon: '🛡️', title: 'Derecho de reserva',   desc: 'Nos reservamos el derecho de rechazar operaciones sospechosas. En ese caso, el monto es reintegrado de inmediato.' },
]

const mpFeatures = [
  { icon: '💳', title: 'Tarjetas y cuotas',   desc: 'Paga con tu tarjeta de crédito o débito en cuotas sin interés, directamente desde la plataforma de MercadoPago.' },
  { icon: '📱', title: 'Wallet MercadoPago',  desc: 'Si ya tienes saldo en tu cuenta MercadoPago, úsalo para pagar de forma instantánea, sin ingresar datos adicionales.' },
  { icon: '🔗', title: 'Código QR',           desc: 'Escanea el QR en el checkout con tu app de MercadoPago y confirma el pago en segundos desde tu celular.' },
]

const dlocalFeatures = [
  { icon: '🗺️', title: 'Cobertura global',      desc: 'DLocal acepta los principales métodos de pago locales de más de 40 países de América Latina, África y Asia.' },
  { icon: '💱', title: 'Múltiples monedas',     desc: 'Paga en tu moneda local. DLocal gestiona la conversión de forma automática y transparente.' },
  { icon: '🔐', title: 'Seguridad certificada', desc: 'Plataforma certificada PCI DSS Nivel 1. Todos los datos de pago viajan cifrados y nunca son almacenados por Motomundi.' },
]
</script>

<template>
  <div class="pago-page">

    <!-- ─── HERO ─── -->
    <section class="hero">
      <div class="hero-bg" />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="hero-eyebrow">Medios de pago</div>
        <h1>Formas de<br /><em>Pago</em></h1>
        <p>Elige el método que más te acomode, sin importar dónde estés en el mundo. Todas nuestras opciones operan bajo protocolos de seguridad certificados para que compres con total tranquilidad.</p>
      </div>
    </section>

    <!-- ─── MÉTODOS RESUMEN STRIP ─── -->
    <div class="metodos-strip">
      <div v-for="m in metodosResumen" :key="m.label" class="metodo-item" :class="m.color">
        <span class="metodo-icon">{{ m.icon }}</span>
        <div class="metodo-body">
          <div class="metodo-label">{{ m.label }}</div>
          <div class="metodo-tags">
            <span v-for="tag in m.tags" :key="tag" class="metodo-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── 01 TARJETA DE CRÉDITO / DÉBITO ─── -->
    <section class="metodo-section bg-off-white">
      <div class="metodo-grid">
        <div class="metodo-text">
          <span class="section-label">01 — Tarjeta</span>
          <h2 class="section-title">Crédito o Débito</h2>
          <div class="card-brands">
            <span v-for="t in tarjetas" :key="t" class="brand-tag">{{ t }}</span>
          </div>
          <p class="metodo-desc">
            Al seleccionar este método serás redirigido al entorno seguro de nuestra entidad bancaria.
            Motomundi <strong>nunca almacena tus datos de tarjeta</strong>: toda la información
            viaja directamente al banco mediante un protocolo cifrado HTTPS.
          </p>
          <p class="metodo-desc">
            El cargo se realiza en el momento exacto en que validas el pago. Si existiera algún
            problema de stock o incidencia en el despacho,
            <strong>reembolsamos el importe íntegro en un plazo máximo de 15 días hábiles</strong>.
          </p>
          <p class="metodo-desc">
            Por razones de seguridad nos reservamos el derecho de rechazar operaciones que
            presenten irregularidades. En ese caso el monto es reintegrado de inmediato y, si
            deseas continuar con tu pedido, te solicitaremos una transferencia bancaria como
            método alternativo.
          </p>
          <div class="confirmation-note">
            <span>✉️</span>
            <span>Una vez procesado el pago recibirás un correo con la confirmación y los detalles de tu pedido.</span>
          </div>
        </div>
        <div class="metodo-visual">
          <div class="card-mock">
            <div class="card-mock-chip" />
            <div class="card-mock-number">•••• •••• •••• ••••</div>
            <div class="card-mock-bottom">
              <span class="card-mock-name">TITULAR</span>
              <span class="card-mock-exp">MM/AA</span>
            </div>
            <div class="card-mock-lock">🔒 Pago seguro</div>
          </div>
          <div class="security-badges">
            <div class="sec-badge"><span>🔐</span><span>SSL Cifrado</span></div>
            <div class="sec-badge"><span>✅</span><span>3D Secure</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── 02 MERCADOPAGO ─── -->
    <section class="metodo-section bg-white">
      <div class="metodo-grid reverse">
        <div class="metodo-visual">
          <div class="mp-card">
            <div class="mp-card-header">
              <span class="mp-logo-icon">
                <img src="/gateways/mercado_pago.png" style="max-width: 80px;" />
              </span>
              <div>
                <div class="mp-card-title">MercadoPago</div>
                <div class="mp-card-sub">La plataforma de pagos más usada de Chile</div>
              </div>
            </div>
            <div class="mp-features-list">
              <div v-for="f in mpFeatures" :key="f.title" class="mp-feature">
                <span class="mp-feature-icon">{{ f.icon }}</span>
                <div>
                  <div class="mp-feature-title">{{ f.title }}</div>
                  <p class="mp-feature-desc">{{ f.desc }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mp-badge-row">
            <span class="mp-badge">Cuotas sin interés</span>
            <span class="mp-badge green">Pago instantáneo</span>
            <span class="mp-badge">Sin registro previo</span>
          </div>
        </div>
        <div class="metodo-text">
          <span class="section-label">02 — MercadoPago</span>
          <h2 class="section-title">Paga con<br /><em>MercadoPago</em></h2>
          <p class="metodo-desc">
            Aceptamos MercadoPago como una de nuestras principales formas de pago para compras en
            Chile. Es rápido, seguro y no requiere que compartas tus datos bancarios directamente
            con Motomundi.
          </p>
          <p class="metodo-desc">
            Puedes pagar con tu tarjeta de crédito o débito en <strong>cuotas sin interés</strong>,
            con el saldo de tu cuenta MercadoPago o con cualquier método disponible en la
            plataforma, incluyendo pago por QR desde tu teléfono.
          </p>
          <p class="metodo-desc">
            Al hacer clic en "Pagar con MercadoPago" en el checkout, serás redirigido al entorno
            encriptado de MercadoPago, donde completarás el pago de forma segura sin salir de
            la plataforma.
          </p>
          <div class="confirmation-note">
            <span>⚡</span>
            <span>La confirmación de pago con MercadoPago es inmediata. Tu pedido se procesa en cuanto se valida la transacción.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── 03 TRANSFERENCIA BANCARIA ─── -->
    <section class="metodo-section bg-off-white">
      <div class="metodo-grid">
        <div class="metodo-text">
          <span class="section-label">03 — Transferencia</span>
          <h2 class="section-title">Pago Bancario</h2>
          <p class="metodo-desc">
            Si prefieres pagar por transferencia, al completar tu pedido recibirás un correo con los
            datos bancarios necesarios para realizar el depósito. Es una opción directa y sin
            intermediarios digitales.
          </p>
          <p class="metodo-desc">
            <strong>Tu pedido se activará una vez confirmado el ingreso del pago en nuestra cuenta.</strong>
            El plazo de despacho comienza a correr desde esa fecha. Para agilizar la verificación,
            incluye tu número de pedido en el campo "comentario" de la transferencia.
          </p>
          <div class="confirmation-note">
            <span>⏱️</span>
            <span>La verificación puede tomar hasta 1 día hábil. Te notificaremos por correo en cuanto esté confirmada.</span>
          </div>
        </div>
        <div class="metodo-visual">
          <div class="bank-card">
            <div class="bank-card-header">
              <span class="bank-icon">🏦</span>
              <span class="bank-name">Banco BCI</span>
            </div>
            <div class="bank-card-rows">
              <div v-for="dato in bancoDatos" :key="dato.label" class="bank-row">
                <span class="bank-row-label">{{ dato.label }}</span>
                <span class="bank-row-value">{{ dato.value }}</span>
              </div>
            </div>
          </div>
          <div class="iban-note">
            <span>🌐</span>
            <span>Para transferencias desde el extranjero, solicita los códigos <strong>BIC e IBAN</strong> a nuestro equipo antes de operar.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SEGURIDAD STRIP ─── -->
    <div class="seguridad-strip">
      <div v-for="item in seguridadItems" :key="item.title" class="seg-item">
        <span class="seg-icon">{{ item.icon }}</span>
        <div>
          <div class="seg-title">{{ item.title }}</div>
          <p class="seg-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- ─── 04 PAGOS INTERNACIONALES ─── -->
    <section class="internacional-section">
      <div class="internacional-bg" />
      <div class="internacional-overlay" />
      <div class="internacional-content">

        <div class="int-header">
          <span class="section-label">04 — Pagos internacionales</span>
          <h2 class="section-title">Compra desde<br /><em>Cualquier País</em></h2>
          <p class="section-subtitle">
            Si estás fuera de Chile, contamos con dos plataformas de pago internacional para
            que puedas adquirir tu equipamiento sin barreras: <strong>DLocal</strong> para
            pagos con métodos locales desde múltiples países, y <strong>PayPal</strong> para
            quienes prefieren una billetera digital global de confianza.
          </p>
        </div>

        <div class="int-grid">

          <!-- DLocal -->
          <div class="int-card dlocal">
            <div class="int-card-header">
              <span class="int-card-logo">
                <img style="min-width: 50px; height: 50px;" src="/gateways/dlocal.png"  />
              </span>
              <div>
                <div class="int-card-name">DLocal</div>
                <div class="int-card-sub">Pagos locales en +40 países</div>
              </div>
              <span class="int-badge">Internacional</span>
            </div>
            <p class="int-card-desc">
              DLocal es nuestra plataforma de pago para clientes internacionales. Permite abonar
              con los métodos de pago más populares de tu país de origen —tarjetas locales,
              transferencias y billeteras digitales— sin necesidad de una tarjeta internacional.
            </p>
            <div class="int-features">
              <div v-for="f in dlocalFeatures" :key="f.title" class="int-feature">
                <span class="int-feature-icon">{{ f.icon }}</span>
                <div>
                  <div class="int-feature-title">{{ f.title }}</div>
                  <p class="int-feature-desc">{{ f.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PayPal -->
          <div class="int-card paypal">
            <div class="int-card-header">
              <span class="int-card-logo">
                <img style="min-width: 50px; height: 50px;" src="/gateways/paypal.png"  />

              </span>
              <div>
                <div class="int-card-name">PayPal</div>
                <div class="int-card-sub">La billetera digital más usada del mundo</div>
              </div>
              <span class="int-badge blue">Internacional</span>
            </div>
            <p class="int-card-desc">
              Acepta pagos mediante PayPal para clientes de todo el mundo. Al elegir esta opción
              en el checkout serás redirigido al entorno encriptado de PayPal, donde podrás pagar
              con tu cuenta o con tarjeta, sin compartir tus datos financieros con Motomundi.
            </p>
            <div class="pp-options">
              <div class="pp-option">
                <div class="pp-option-title">PayPal Estándar</div>
                <p class="pp-option-desc">Pago único e inmediato desde tu cuenta PayPal o tarjeta asociada. Disponible en el paso final del proceso de compra.</p>
                <span class="pp-badge-sm">Pago inmediato</span>
              </div>
              <div class="pp-option featured">
                <div class="pp-option-title">PayPal 4x ✨</div>
                <p class="pp-option-desc">Divide tu compra en 4 cuotas directamente desde PayPal, sujeto a los requisitos y condiciones de la plataforma.</p>
                <span class="pp-badge-sm green">Pago fraccionado</span>
              </div>
            </div>
          </div>

        </div>

        <div class="int-footer-note">
          <span>ℹ️</span>
          <span>Los métodos de pago internacional disponibles se mostrarán automáticamente en el proceso de compra según tu país de origen y dirección de facturación.</span>
        </div>

      </div>
    </section>

    <!-- ─── CTA CONTACTO ─── -->
    <section class="cta-section">
      <span class="section-label">¿Tienes dudas?</span>
      <h2 class="section-title">Te Ayudamos<br />a <em>Pagar</em></h2>
      <p class="section-subtitle">Si tienes alguna consulta sobre los métodos de pago, una transacción no reconocida o necesitas orientación sobre pagos internacionales, contáctanos de inmediato.</p>
      <div class="cta-buttons">
        <NuxtLink to="/contactenos" class="cta-btn primary">
          <VIcon icon="tabler-mail"></VIcon>
          Contáctenos</NuxtLink>
        <a href="https://api.whatsapp.com/send?phone=15558366927&text=%C2%A1Hola!"
           target="_blank" class="cta-btn secondary">
          <VIcon icon="tabler-brand-whatsapp"></VIcon>
          WhatsApp oficial
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.pago-page {
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
  --mp-blue: #009ee3;

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
  background-image: url('/cms/meson.webp');
  background-size: cover;
  background-position: center 40%;
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

/* ─── MÉTODOS STRIP ─── */
.metodos-strip {
  background: var(--black);
  display: flex;
  border-top: 4px solid var(--red);
}
.metodo-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 28px;
  border-right: 1px solid rgba(255,255,255,0.08);
  transition: background 0.2s;
}
.metodo-item:last-child { border-right: none; }
.metodo-item:hover { background: rgba(255,255,255,0.04); }
.metodo-icon { font-size: 1.7rem; flex-shrink: 0; }
.metodo-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--white);
  margin-bottom: 8px;
}
.metodo-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.metodo-tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 9px;
  border: 1px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.55);
}
.metodo-item.red  .metodo-tag { border-color: var(--red);     color: var(--red); }
.metodo-item.mp   .metodo-tag { border-color: var(--mp-blue); color: var(--mp-blue); }
.metodo-item.blue .metodo-tag { border-color: #60a5fa;        color: #60a5fa; }
.metodo-item.dark .metodo-tag { border-color: rgba(255,255,255,0.28); color: rgba(255,255,255,0.65); }

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
  max-width: 640px;
  line-height: 1.75;
}

/* ─── METODO SECTION ─── */
.metodo-section.bg-off-white { background: var(--off-white); }
.metodo-section.bg-white     { background: var(--white); }
.metodo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}
.metodo-grid.reverse { direction: rtl; }
.metodo-grid.reverse > * { direction: ltr; }
.metodo-desc { font-size: 0.92rem; color: var(--gray-dark); line-height: 1.8; margin-top: 16px; }
.metodo-desc strong { color: var(--black); font-weight: 600; }
.card-brands { display: flex; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
.brand-tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 14px;
  border: 2px solid var(--black);
  color: var(--black);
}
.confirmation-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 28px;
  padding: 16px 18px;
  background: #fff8f8;
  border-left: 4px solid var(--red);
  font-size: 0.85rem;
  color: var(--gray-dark);
  line-height: 1.6;
}

/* ─── CARD MOCK ─── */
.metodo-visual { display: flex; flex-direction: column; gap: 20px; }
.card-mock {
  background: linear-gradient(135deg, var(--black) 0%, var(--gray-dark) 100%);
  border-radius: 12px;
  padding: 32px 28px;
  position: relative;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 20px 48px rgba(0,0,0,0.28);
}
.card-mock::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--red);
  border-radius: 12px 12px 0 0;
}
.card-mock-chip { width: 36px; height: 28px; background: linear-gradient(135deg, #d4af37, #f5d769); border-radius: 4px; }
.card-mock-number {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.7);
  margin-top: 24px;
}
.card-mock-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
.card-mock-name, .card-mock-exp {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
}
.card-mock-lock { position: absolute; bottom: 16px; right: 20px; font-size: 0.72rem; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; }
.security-badges { display: flex; gap: 12px; }
.sec-badge {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--white);
  border: 1px solid var(--gray-light);
  padding: 12px 16px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray-dark);
}

/* ─── MERCADOPAGO VISUAL ─── */
.mp-card { background: var(--black); overflow: hidden; box-shadow: 0 20px 48px rgba(0,0,0,0.18); }
.mp-card-header {
  background: var(--mp-blue);
  padding: 22px 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.mp-logo-icon { font-size: 2rem; }
.mp-card-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--white);
  line-height: 1.1;
}
.mp-card-sub { font-size: 0.75rem; color: rgba(255,255,255,0.7); letter-spacing: 0.04em; }
.mp-features-list { padding: 8px 0; }
.mp-feature {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.mp-feature:last-child { border-bottom: none; }
.mp-feature-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.mp-feature-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--white);
  margin-bottom: 4px;
}
.mp-feature-desc { font-size: 0.8rem; color: rgba(255,255,255,0.5); line-height: 1.55; }
.mp-badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
.mp-badge {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 12px;
  border: 1px solid var(--mp-blue);
  color: var(--mp-blue);
}
.mp-badge.green { border-color: var(--green); color: var(--green); }

/* ─── BANK VISUAL ─── */
.bank-card { background: var(--black); overflow: hidden; box-shadow: 0 20px 48px rgba(0,0,0,0.18); }
.bank-card-header {
  background: var(--red);
  padding: 20px 28px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.bank-icon { font-size: 1.6rem; }
.bank-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--white);
}
.bank-card-rows { padding: 8px 0; }
.bank-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.bank-row:last-child { border-bottom: none; }
.bank-row-label { font-size: 0.78rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.45); }
.bank-row-value { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 1rem; letter-spacing: 0.04em; color: var(--white); }
.iban-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px 18px;
  background: var(--off-white);
  border-left: 4px solid var(--gray-dark);
  font-size: 0.84rem;
  color: var(--gray-dark);
  line-height: 1.6;
}
.iban-note strong { color: var(--black); }

/* ─── SEGURIDAD STRIP ─── */
.seguridad-strip {
  background: var(--black);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 4px solid var(--red);
}
.seg-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 32px 28px;
  border-right: 1px solid rgba(255,255,255,0.07);
}
.seg-item:last-child { border-right: none; }
.seg-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
.seg-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--white);
  margin-bottom: 6px;
}
.seg-desc { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.65; }

/* ─── PAGOS INTERNACIONALES ─── */
.internacional-section {
  position: relative;
  padding: 80px 72px;
  overflow: hidden;
}
.internacional-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80');
  background-size: cover;
  background-position: center;
}
.internacional-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,30,0.96) 0%, rgba(0,20,60,0.92) 100%);
}
.internacional-content { position: relative; z-index: 2; }

.int-header { margin-bottom: 52px; }
.int-header .section-label    { color: rgba(255,255,255,0.5); }
.int-header .section-title    { color: var(--white); }
.int-header .section-subtitle { color: rgba(255,255,255,0.68); }
.int-header .section-subtitle strong { color: var(--white); }

.int-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.int-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 36px 32px;
  transition: background 0.2s;
}
.int-card:hover { background: rgba(255,255,255,0.08); }
.int-card.dlocal { border-top: 4px solid #00c853; }
.int-card.paypal { border-top: 4px solid #009cde; }

.int-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
.int-card-logo { font-size: 2rem; flex-shrink: 0; }
.int-card-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: var(--white);
  line-height: 1.1;
}
.int-card-sub { font-size: 0.75rem; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; }
.int-badge {
  margin-left: auto;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid rgba(0,200,83,0.5);
  color: #4ade80;
  flex-shrink: 0;
}
.int-badge.blue { border-color: rgba(0,156,222,0.5); color: #60c8f5; }

.int-card-desc {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.75;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.int-features { display: flex; flex-direction: column; gap: 16px; }
.int-feature { display: flex; align-items: flex-start; gap: 12px; }
.int-feature-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
.int-feature-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--white);
  margin-bottom: 3px;
}
.int-feature-desc { font-size: 0.8rem; color: rgba(255,255,255,0.5); line-height: 1.6; }

.pp-options { display: flex; flex-direction: column; gap: 12px; }
.pp-option {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 18px 20px;
  transition: background 0.2s;
}
.pp-option:hover { background: rgba(255,255,255,0.08); }
.pp-option.featured { border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.07); }
.pp-option-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.05rem;
  text-transform: uppercase;
  color: var(--white);
  margin-bottom: 6px;
}
.pp-option-desc { font-size: 0.82rem; color: rgba(255,255,255,0.55); line-height: 1.6; margin-bottom: 10px; }
.pp-badge-sm {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 3px 10px;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.65);
  border: 1px solid rgba(255,255,255,0.15);
}
.pp-badge-sm.green { background: rgba(22,163,74,0.15); color: #4ade80; border-color: rgba(22,163,74,0.35); }

.int-footer-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 28px;
  padding: 16px 20px;
  background: rgba(255,255,255,0.04);
  border-left: 4px solid rgba(255,255,255,0.2);
  font-size: 0.84rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.65;
}

/* ─── CTA ─── */
.cta-section { background: var(--off-white); text-align: center; }
.cta-buttons { display: flex; justify-content: center; gap: 16px; margin-top: 40px; flex-wrap: wrap; }
.cta-btn {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 32px;
  transition: background 0.2s, color 0.2s, transform 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.cta-btn:hover { transform: translateY(-2px); }
.cta-btn.primary { background: var(--red); color: var(--white); }
.cta-btn.primary:hover { background: var(--red-dark); }
.cta-btn.secondary { background: transparent; color: var(--black); border: 2px solid var(--black); }
.cta-btn.secondary:hover { background: var(--black); color: var(--white); }

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  .seguridad-strip { grid-template-columns: 1fr 1fr; }
  .seg-item:nth-child(2) { border-right: none; }
  .int-grid { grid-template-columns: 1fr; }
}
@media (max-width: 1024px) {
  section, .internacional-section { padding: 64px 28px; }
  .hero-content { padding: 48px 28px; }
  .metodos-strip { flex-direction: column; }
  .metodo-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .metodo-grid, .metodo-grid.reverse { grid-template-columns: 1fr; gap: 40px; direction: ltr; }
  .seguridad-strip { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .seguridad-strip { grid-template-columns: 1fr; }
  .seg-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .cta-buttons { flex-direction: column; align-items: center; }
}
</style>
