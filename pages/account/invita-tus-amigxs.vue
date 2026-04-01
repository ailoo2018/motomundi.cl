<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})


// ── State ──────────────────────────────────────────────────────────────────
const userCode   = ref('')
const generating = ref(false)
const copied     = ref(false)
const snackbar   = ref({ show: false, color: '', text: '', icon: '' })

// ── Mock friends data ──────────────────────────────────────────────────────
const friends = ref([
 /* { id: 1, name: 'Camila Rodríguez', date: '12 Mar 2025', status: 'Acreditado',  earned: 20000 },
  { id: 2, name: 'Sebastián Muñoz',  date: '28 Feb 2025', status: 'Acreditado',  earned: 20000 },
  { id: 3, name: 'Felipe Torres',    date: '05 Abr 2025', status: 'En proceso',  earned: 0     },*/
])

const totalEarned = computed(() =>
  friends.value.filter(f => f.status === 'Acreditado').reduce((s, f) => s + f.earned, 0),
)

// ── Generate code ──────────────────────────────────────────────────────────
async function generateCode() {
  generating.value = true
  await new Promise(r => setTimeout(r, 1200))

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

  userCode.value = 'MOTO' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  generating.value = false
  showSnack('¡Tu cupón ha sido creado con éxito!', 'success', 'tabler-sparkles')
}

// ── Copy ───────────────────────────────────────────────────────────────────
async function copyCode() {
  try {
    await navigator.clipboard.writeText(userCode.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2500)
  } catch {
    showSnack('No se pudo copiar el cupón', 'error', 'tabler-alert-circle')
  }
}

// ── Share ──────────────────────────────────────────────────────────────────
const shareChannels = [
  { label: 'WhatsApp',  icon: 'tabler-brand-whatsapp', color: '#25D366',
    url: c => `https://wa.me/?text=${encodeURIComponent(`¡Usa mi cupón ${c} en Motomundi y obtén $10.000 de descuento en tu primera compra! 🏍️ www.motomundi.cl`)}` },
  { label: 'Instagram', icon: 'tabler-brand-instagram', color: '#E1306C',
    url: () => null },
  { label: 'Copiar link', icon: 'tabler-link', color: '#B21915',
    url: c => `https://www.motomundi.cl/?coupon=${c}` },
]

function share(channel) {
  const url = channel.url(userCode.value)
  if (channel.label === 'Copiar link') {
    navigator.clipboard.writeText(url)
    showSnack('¡Link copiado!', 'success', 'tabler-link')
  } else if (url) {
    window.open(url, '_blank')
  } else {
    showSnack('Copia tu código y compártelo en Instagram', 'info', 'tabler-brand-instagram')
  }
}

function showSnack(text, color, icon) {
  snackbar.value = { show: true, text, color, icon }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function formatCLP(n) {
  return '$' + n.toLocaleString('es-CL')
}

// ── Content ────────────────────────────────────────────────────────────────
const steps = [
  { icon: 'tabler-ticket',    title: 'Crea tu cupón',     desc: 'Genera tu código personal único con un solo clic.' },
  { icon: 'tabler-send',      title: 'Comparte con amigos', desc: 'Envíalo por WhatsApp, redes sociales o el medio que prefieras.' },
  { icon: 'tabler-pig-money', title: 'Gana recompensas',  desc: 'Cuando tu amigo compra, tú recibes $20.000 de descuento.' },
]

const faq = [
  {
    q: '¿Cuándo vence mi cupón personalizado?',
    a: 'Tu cupón personalizado no tiene fecha de vencimiento; puedes compartirlo cuando quieras. ¡Compártelo y difunde nuestra pasión por las motos!',
  },
  {
    q: '¿Con quién puedo compartir mi cupón?',
    a: 'Puedes compartir tu cupón con cualquier amigo, familiar, compañero de trabajo o seguidor en redes sociales que no haya comprado anteriormente en Motomundi. Si la persona ya ha comprado en Motomundi, no podrá utilizar el cupón.',
  },
  {
    q: '¿A cuántos amigos puedo enviar mi cupón?',
    a: 'Comparte tu cupón con todas las personas que quieras. No hay límite.',
  },
  {
    q: '¿Cuándo recibiré el descuento cuando alguien use mi cupón?',
    a: 'Recibirás $20.000 de descuento cuando alguien realice su primera compra en Motomundi usando tu cupón. Te enviaremos un correo electrónico con tu cupón de descuento.',
  },
  {
    q: '¿Puedo usar varios cupones de descuento a la vez?',
    a: 'No. Solo puedes aplicar un cupón de descuento en cada compra que realices en Motomundi.',
  },
  {
    q: '¿Cuándo puedo usar mi cupón de descuento?',
    a: 'Puedes usarlo en el momento en que recibas el correo electrónico con tu cupón de recompensa. Podrás utilizarlo en tu próxima compra realizada dentro de los 15 días siguientes a partir de que recibas el correo.',
  },
  {
    q: '¿Puedo usar mi cupón en una tienda física de Motomundi?',
    a: 'Si eres la persona que recibe el cupón para realizar tu primera compra, solo podrás canjearlo en nuestra web. Sin embargo, el cupón que recibes cuando tu amigo se une al club y realiza una compra puede utilizarse tanto en tiendas físicas como en nuestra web.',
  },
]
</script>

<template>
  <div class="invite-page">
    <!-- ── HERO BANNER ── -->
    <section class="hero-section">
      <div class="hero-bg-pattern" />
      <VContainer class="hero-content py-10 py-md-16">
        <VRow
          align="center"
          justify="center"
        >
          <VCol
            cols="12"
            md="6"
            class="text-center text-md-left"
          >
            <div class="hero-eyebrow mb-3">
              <i
                class="ti tabler-motorcycle"
                style="font-size:1.1rem"
              />
              <span class="ms-2">Programa de Referidos</span>
            </div>
            <h1 class="hero-title mb-4">
              Invita a un amigo<br>
              <span class="hero-title--accent">y ganen juntos</span>
            </h1>
            <p class="hero-subtitle mb-0">
              Comparte tu pasión por las motos y obtén recompensas exclusivas cada vez que
              un amigo hace su primera compra en Motomundi.
            </p>
          </VCol>
          <VCol
            cols="12"
            md="6"
            class="d-flex justify-center justify-md-end mt-8 mt-md-0"
          >
            <div class="rewards-cards-stack">
              <!-- Friend card -->
              <div class="reward-card reward-card--friend">
                <div class="reward-card__icon-wrap">
                  <i class="ti tabler-user-plus" />
                </div>
                <div>
                  <div class="reward-card__label">
                    Tu amigo recibe
                  </div>
                  <div class="reward-card__amount">
                    $10.000
                  </div>
                  <div class="reward-card__sub">
                    en su primera compra desde $100.000
                  </div>
                </div>
              </div>
              <!-- You card -->
              <div class="reward-card reward-card--you">
                <div class="reward-card__icon-wrap">
                  <i class="ti tabler-wallet" />
                </div>
                <div>
                  <div class="reward-card__label">
                    Tú recibes
                  </div>
                  <div class="reward-card__amount">
                    $20.000
                  </div>
                  <div class="reward-card__sub">
                    cuando tu amigo compra
                  </div>
                </div>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VContainer class="mt-n4 pb-16">
      <!-- ── HOW IT WORKS ── -->
      <VRow
        justify="center"
        class="mb-12"
      >
        <VCol cols="12">
          <div class="section-label d-flex justify-center mt-6 mb-8">
            <span>¿Cómo funciona?</span>
          </div>
          <VRow
            justify="center"
            class="steps-row"
          >
            <VCol
              v-for="(step, i) in steps"
              cols="12"
              :key="i"
              sm="4"
              class="text-center"
            >
              <div class="step-bubble mx-auto mb-4">
                <i :class="`ti ${step.icon}`" />
                <span class="step-number">{{ i + 1 }}</span>
              </div>
              <h3 class="step-title mb-2">
                {{ step.title }}
              </h3>
              <p class="step-desc">
                {{ step.desc }}
              </p>

            </VCol>
          </VRow>
        </VCol>
      </VRow>

      <!-- ── COUPON BOX ── -->
      <VRow
        justify="center"
        class="mb-12"
      >
        <VCol
          cols="12"
          md="8"
          lg="7"
        >
          <div class="coupon-box">
            <div class="coupon-box__header">
              <i class="ti tabler-ticket me-2" />
              Tu cupón personal
            </div>

            <!-- State: no code yet -->
            <div
              v-if="!userCode"
              class="coupon-box__empty"
            >
              <i class="ti tabler-qrcode coupon-box__empty-icon" />
              <p class="mb-6">
                Aún no tienes un cupón generado.<br>Presiona el botón para crear el tuyo.
              </p>
              <VBtn
                color="#B21915"
                size="large"
                rounded="0"
                :loading="generating"
                class="generate-btn"
                @click="generateCode"
              >
                <i class="tabler-sparkles me-2" />
                Crear Cupón
              </VBtn>
            </div>

            <!-- State: code generated -->
            <div
              v-else
              class="coupon-box__code-wrap"
            >
              <div class="coupon-dashes">
                <span
                  v-for="n in 4"
                  :key="n"
                  class="coupon-dash"
                />
              </div>
              <div class="coupon-code-display">
                <span class="coupon-code-text">{{ userCode }}</span>
                <VBtn
                  :icon="copied ? 'mdi-check' : undefined"
                  variant="text"
                  size="small"
                  class="copy-btn"
                  :color="copied ? 'success' : '#B21915'"
                  @click="copyCode"
                >
                  <i
                    v-if="!copied"
                    class="ti tabler-copy"
                    style="font-size:1.2rem"
                  />
                  <i
                    v-else
                    class="ti tabler-check"
                    style="font-size:1.2rem"
                  />
                </VBtn>
              </div>
              <div class="coupon-dashes">
                <span
                  v-for="n in 4"
                  :key="n"
                  class="coupon-dash"
                />
              </div>

              <VSlideYTransition>
                <div
                  v-if="copied"
                  class="copied-feedback mt-2"
                >
                  <i class="ti tabler-circle-check me-1" />
                  ¡Copiado al portapapeles!
                </div>
              </VSlideYTransition>

              <div class="share-section mt-6">
                <p class="share-label mb-3">
                  Comparte tu cupón
                </p>
                <div class="share-buttons">
                  <VBtn
                    v-for="channel in shareChannels"
                    :key="channel.label"
                    variant="outlined"
                    rounded="lg"
                    size="small"
                    class="share-btn me-2 mb-2"
                    :style="`--ch-color: ${channel.color}`"
                    @click="share(channel)"
                  >
                    <i :class="`ti ${channel.icon} me-1`" />
                    {{ channel.label }}
                  </VBtn>
                </div>
              </div>
            </div>
          </div>
        </VCol>
      </VRow>

      <!-- ── FRIENDS LIST ── -->
      <VRow
        justify="center"
        class="mb-12"
      >
        <VCol
          cols="12"
          md="10"
          lg="9"
        >
          <div class="section-label mb-6">
            <span>Mis amigos referidos</span>
          </div>

          <div
            v-if="friends.length === 0"
            class="empty-friends"
          >
            <i class="ti tabler-users empty-friends__icon" />
            <p>Aún ninguno de tus amigos ha usado tu cupón.<br>¡Compártelo y empieza a ganar!</p>
          </div>

          <div v-else>
            <div class="friends-summary mb-6">
              <div class="friends-summary__stat">
                <i class="ti tabler-users me-2" />
                <span>{{ friends.length }} amigos referidos</span>
              </div>
              <div class="friends-summary__stat friends-summary__stat--earned">
                <i class="ti tabler-coin me-2" />
                <span>{{ formatCLP(totalEarned) }} ganados</span>
              </div>
            </div>

            <VTable class="friends-table">
              <thead>
                <tr>
                  <th>Amigo</th>
                  <th>Fecha de compra</th>
                  <th>Estado</th>
                  <th class="text-right">
                    Crédito obtenido
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="friend in friends"
                  :key="friend.id"
                >
                  <td>
                    <div class="friend-name-cell">
                      <div class="friend-avatar">
                        {{ friend.name[0] }}
                      </div>
                      <span>{{ friend.name }}</span>
                    </div>
                  </td>
                  <td class="text-medium-emphasis">
                    {{ friend.date }}
                  </td>
                  <td>
                    <VChip
                      size="small"
                      :color="friend.status === 'Acreditado' ? 'success' : 'warning'"
                      variant="tonal"
                      rounded="lg"
                    >
                      <i
                        :class="`ti ${friend.status === 'Acreditado' ? 'tabler-circle-check' : 'tabler-clock'} me-1`"
                        style="font-size:.85rem"
                      />
                      {{ friend.status }}
                    </VChip>
                  </td>
                  <td class="text-right">
                    <span :class="friend.status === 'Acreditado' ? 'earned-amount' : 'text-medium-emphasis'">
                      {{ friend.status === 'Acreditado' ? formatCLP(friend.earned) : '—' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </VTable>
          </div>
        </VCol>
      </VRow>

      <!-- ── FAQ ── -->
      <VRow justify="center">
        <VCol
          cols="12"
          md="10"
          lg="8"
        >
          <div class="section-label mb-6">
            <span>Preguntas frecuentes</span>
          </div>
          <VExpansionPanels
            variant="accordion"
            class="faq-panels"
          >
            <VExpansionPanel
              v-for="(item, i) in faq"
              :key="i"
              class="faq-panel"
              rounded="lg"
            >
              <VExpansionPanelTitle class="faq-question">
                <div class="d-flex align-center">
                  <span class="faq-q-icon me-3"><i class="ti tabler-help-circle" /></span>
                  {{ item.q }}
                </div>
              </VExpansionPanelTitle>
              <VExpansionPanelText class="faq-answer">
                {{ item.a }}
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </VContainer>

    <!-- ── SNACKBAR ── -->
    <VSnackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      rounded="lg"
      timeout="3000"
      location="bottom right"
    >
      <i :class="`ti ${snackbar.icon} me-2`" />
      {{ snackbar.text }}
    </VSnackbar>
  </div>
</template>


<style scoped>

.v-container {
  width: 100%;
}
/* ── PAGE BASE ─────────────────────────────────────────────────────────── */
.invite-page {
  --brand:       #B21915;
  --brand-dark:  #8a100d;
  --brand-light: rgba(178, 25, 21, 0.08);
  color: #1a1a1a;
  overflow-x: hidden;
}

/* ── HERO ──────────────────────────────────────────────────────────────── */
.hero-section {
  background: #1a1a1a;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 28px,
      rgba(255,255,255,.025) 28px,
      rgba(255,255,255,.025) 30px
    );
  pointer-events: none;
}

.hero-bg-pattern::after {
  content: '';
  position: absolute;
  right: -120px;
  top: -80px;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(178,25,21,.35) 0%, transparent 70%);
  pointer-events: none;
}

.hero-content { position: relative; z-index: 1; }

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  background: rgba(178,25,21,.2);
  border: 1px solid rgba(178,25,21,.5);
  color: #f87171;
  padding: 5px 14px;
  border-radius: 100px;
  font-size: .82rem;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.15;
  color: #fff;
}

.hero-title--accent {
  color: var(--brand);
}

.hero-subtitle {
  font-size: 1.05rem;
  color: rgba(255,255,255,.72);
  max-width: 440px;
  line-height: 1.65;
}

/* ── REWARD CARDS ──────────────────────────────────────────────────────── */
.rewards-cards-stack {
  position: relative;
  width: 300px;
}

.reward-card {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  padding: 20px 24px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.12);
  transition: transform .25s;
}

.reward-card:hover { transform: translateY(-3px); }

.reward-card--friend {
  background: rgba(255,255,255,.1);
  margin-bottom: -16px;
  margin-left: 24px;
  position: relative;
  z-index: 1;
}

.reward-card--you {
  background: var(--brand);
  position: relative;
  z-index: 2;
  margin-right: 24px;
  box-shadow: 0 16px 48px rgba(178,25,21,.45);
}

.reward-card__icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255,255,255,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.4rem;
  color: #fff;
}

.reward-card__label {
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: rgba(255,255,255,.75);
}

.reward-card__amount {
  font-size: 1.75rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.reward-card__sub {
  font-size: .75rem;
  color: rgba(255,255,255,.7);
  margin-top: 2px;
}

/* ── SECTION LABEL ─────────────────────────────────────────────────────── */
.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-label span {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
}

.section-label::before,
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e5e5;
}

.text-center.section-label::before,
.text-center.section-label::after {
  max-width: 80px;
}

/* ── STEPS ─────────────────────────────────────────────────────────────── */
.steps-row { position: relative; }

.step-bubble {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--brand-light);
  border: 2px solid var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 1.6rem;
  color: var(--brand);
  transition: background .2s, box-shadow .2s;
}

.step-bubble:hover {
  background: var(--brand);
  color: #fff;
  box-shadow: 0 8px 24px rgba(178,25,21,.3);
}

.step-number {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  font-size: .7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  pointer-events: none;
}

.step-bubble:hover .step-number {
  background: #fff;
  color: var(--brand);
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111;
}

.step-desc {
  font-size: .9rem;
  color: #555;
  line-height: 1.55;
}

.step-connector {
  position: absolute;
  top: 36px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--brand), transparent);
  pointer-events: none;
}

/* ── COUPON BOX ─────────────────────────────────────────────────────────── */
.coupon-box {
  border-radius: 0px;
  border: 2px solid #ebebeb;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 32px rgba(0,0,0,.06);
}

.coupon-box__header {
  background: #222;
  color: #fff;
  padding: 14px 24px;
  font-weight: 700;
  font-size: .95rem;
  display: flex;
  align-items: center;
  letter-spacing: .02em;
}

.coupon-box__header i { font-size: 1.15rem; color: var(--brand); }

.coupon-box__empty {
  padding: 48px 32px;
  text-align: center;
  color: #666;
  line-height: 1.6;
}

.coupon-box__empty-icon {
  font-size: 4rem;
  color: #d0d0d0;
  display: block;
  margin: 0 auto 20px;
}

.generate-btn {
  font-weight: 700 !important;
  letter-spacing: .04em !important;
  text-transform: uppercase !important;
  padding: 0 32px !important;
}

.coupon-box__code-wrap {
  padding: 32px;
  text-align: center;
}

/* Dashed cut line */
.coupon-dashes {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 8px 0;
}
.coupon-dash {
  width: 28px;
  height: 3px;
  border-radius: 2px;
  background: #e0e0e0;
}

.coupon-code-display {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--brand-light);
  border: 2px dashed var(--brand);
  border-radius: 12px;
  padding: 14px 28px;
  margin: 12px 0;
}

.coupon-code-text {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: .18em;
  color: var(--brand);
}

.copy-btn {
  border-radius: 8px !important;
}

.copied-feedback {
  color: #16a34a;
  font-size: .85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.share-label {
  font-size: .85rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: .06em;
}

.share-btn {
  border-color: var(--ch-color) !important;
  color: var(--ch-color) !important;
  font-weight: 600 !important;
  font-size: .82rem !important;
}

.share-btn:hover {
  background: color-mix(in srgb, var(--ch-color) 10%, transparent) !important;
}

/* ── FRIENDS ─────────────────────────────────────────────────────────────── */
.empty-friends {
  text-align: center;
  padding: 48px 24px;
  border-radius: 16px;
  border: 2px dashed #e0e0e0;
  color: #999;
  line-height: 1.65;
}

.empty-friends__icon {
  font-size: 3.5rem;
  display: block;
  margin: 0 auto 16px;
  color: #ccc;
}

.friends-summary {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.friends-summary__stat {
  display: inline-flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: .9rem;
  color: #444;
}

.friends-summary__stat--earned {
  background: var(--brand-light);
  color: var(--brand);
  border: 1px solid rgba(178,25,21,.2);
}

.friends-table {
  border-radius: 14px !important;
  overflow: hidden;
  border: 1px solid #ebebeb !important;
}

.friends-table th {
  background: #f9f9f9 !important;
  font-weight: 700 !important;
  font-size: .8rem !important;
  letter-spacing: .05em !important;
  text-transform: uppercase !important;
  color: #777 !important;
  padding: 14px 16px !important;
}

.friends-table td {
  padding: 14px 16px !important;
  border-bottom: 1px solid #f0f0f0 !important;
  font-size: .92rem !important;
}

.friend-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.friend-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  font-weight: 700;
  font-size: .9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.earned-amount {
  font-weight: 700;
  color: #16a34a;
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
.faq-panels {
  gap: 8px;
  display: flex;
  flex-direction: column;
}

.faq-panel {
  border: 1px solid #e8e8e8 !important;
  box-shadow: none !important;
  margin-bottom: 0 !important;
}

.faq-panel::before { display: none !important; }

.faq-question {
  font-weight: 600 !important;
  font-size: .95rem !important;
  color: #111 !important;
  min-height: 60px !important;
}

.faq-q-icon {
  color: var(--brand);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.faq-answer :deep(.v-expansion-panel-text__wrapper) {
  padding-top: 0 !important;
}

.faq-answer {
  color: #555 !important;
  font-size: .92rem !important;
  line-height: 1.7 !important;
  padding-left: calc(16px + 1.1rem + 12px) !important; /* align with question text */
}
</style>
