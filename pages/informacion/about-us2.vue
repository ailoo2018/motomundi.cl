<template>
  <div class="about-page">

    <!-- ═══════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════ -->
    <section class="hero-section">
      <v-container class="hero-container" fluid>
        <v-row align="center" no-gutters>
          <v-col cols="12" md="7" class="hero-left pa-8 pa-md-16">
            <div class="hero-eyebrow mb-4">
              <span class="eyebrow-line"></span>
              <span class="eyebrow-text">Nuestra Historia</span>
            </div>
            <h1 class="hero-headline">
              Cuando una puerta<br />
              se cierra,<br />
              <span class="hero-headline--accent">comienza la ruta.</span>
            </h1>
            <p class="hero-lead mt-6">
              Desde un rechazo laboral hasta medio millón de motociclistas.
              Esta es la historia de Motomundi.
            </p>
            <div class="hero-stats mt-10">
              <div class="stat-item">
                <span class="stat-number">2018</span>
                <span class="stat-label">Fundación</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">8</span>
                <span class="stat-label">Tiendas en Chile</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">500K+</span>
                <span class="stat-label">Suscriptores YouTube</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="hero-right pa-0 d-none d-md-flex">
            <div class="hero-image-placeholder">
              <i class="ti ti-photo placeholder-icon"></i>
              <span class="placeholder-label">Foto principal Motomundi</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="hero-accent-bar"></div>
    </section>

    <!-- ═══════════════════════════════════════════
         MISIÓN
    ═══════════════════════════════════════════ -->
    <section class="mission-section py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="9" lg="7" class="text-center">
            <p class="mission-statement">
              "Inspirar a la comunidad motociclista con
              productos excepcionales y un servicio
              que va más allá de la venta."
            </p>
            <div class="mission-divider mx-auto mt-8"></div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         HISTORIA — ACTO I
    ═══════════════════════════════════════════ -->
    <section class="story-section story-section--light py-0">
      <v-container fluid class="pa-0">
        <v-row no-gutters align="stretch">
          <v-col cols="12" md="6" order="2" order-md="1">
            <div class="story-image-placeholder story-image-placeholder--tall">
              <i class="ti ti-photo placeholder-icon"></i>
              <span class="placeholder-label">Juan Carlos en su primer viaje — 2018</span>
            </div>
          </v-col>
          <v-col cols="12" md="6" order="1" order-md="2" class="d-flex align-center">
            <div class="story-content pa-8 pa-md-14">
              <div class="act-badge mb-5">
                <span class="act-number">01</span>
                <span class="act-title">El Redireccionamiento</span>
              </div>
              <h2 class="story-heading mb-6">
                Un sueño distinto<br />despertó el verdadero.
              </h2>
              <p class="story-body mb-5">
                En 2018, Juan Carlos Fuentes perseguía una meta en Redmond:
                trabajar para Microsoft. Cuando la respuesta fue "no", volvió
                a Chile enfrentando un punto de inflexión personal.
              </p>
              <p class="story-body mb-5">
                Para despejar la mente, compró una motocicleta. No fue solo un
                pasatiempo; fue su terapia. Pero al buscar equipamiento de
                calidad, descubrió un vacío enorme en el mercado chileno.
              </p>
              <p class="story-body">
                Inspirado por el éxito digital de Revzilla en Estados Unidos,
                Juan Carlos encontró su camino: si no podía escribir código para
                Microsoft, construiría el mejor e-commerce de motociclismo en
                América Latina.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         HISTORIA — ACTO II
    ═══════════════════════════════════════════ -->
    <section class="story-section story-section--dark py-0">
      <v-container fluid class="pa-0">
        <v-row no-gutters align="stretch">
          <v-col cols="12" md="6" class="d-flex align-center">
            <div class="story-content story-content--dark pa-8 pa-md-14">
              <div class="act-badge act-badge--light mb-5">
                <span class="act-number">02</span>
                <span class="act-title">La Pequeña Tienda y el Gran Giro</span>
              </div>
              <h2 class="story-heading story-heading--light mb-6">
                El camino fue más<br />difícil de lo esperado.
              </h2>
              <p class="story-body story-body--light mb-5">
                Junto a Paulina Silva, Juan Carlos lanzó www.motomundi.cl y abrió
                una pequeña tienda física en la calle Bocaccio, en Las Condes.
                Vendían motos, ropa y accesorios: intentaban hacerlo todo.
              </p>
              <p class="story-body story-body--light mb-5">
                Seis meses después, Motomundi estaba al borde de desaparecer.
                Entonces llegó el punto de quiebre: Motolife los contactó para
                compartir su espacio de retail. Ese fue el "milagro" que
                necesitaban.
              </p>
              <p class="story-body story-body--light">
                Juan Carlos y Paulina tomaron la decisión estratégica de dejar
                de vender motos y enfocarse en lo que hacían mejor: equipamiento
                y accesorios de clase mundial, cuidadosamente seleccionados.
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="story-image-placeholder story-image-placeholder--tall story-image-placeholder--dark">
              <i class="ti ti-photo placeholder-icon"></i>
              <span class="placeholder-label">Tienda Bocaccio, Las Condes — 2018</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         HISTORIA — ACTO III
    ═══════════════════════════════════════════ -->
    <section class="story-section story-section--light py-0">
      <v-container fluid class="pa-0">
        <v-row no-gutters align="stretch">
          <v-col cols="12" md="6" order="2" order-md="1">
            <div class="story-image-placeholder story-image-placeholder--tall">
              <i class="ti ti-photo placeholder-icon"></i>
              <span class="placeholder-label">Comunidad Motomundi en ruta</span>
            </div>
          </v-col>
          <v-col cols="12" md="6" order="1" order-md="2" class="d-flex align-center">
            <div class="story-content pa-8 pa-md-14">
              <div class="act-badge mb-5">
                <span class="act-number">03</span>
                <span class="act-title">Construyendo una Comunidad</span>
              </div>
              <h2 class="story-heading mb-6">
                No vendemos productos.<br />Compartimos la ruta.
              </h2>
              <p class="story-body mb-5">
                Aprovechando el background tecnológico de Juan Carlos y una
                profunda pasión por contar historias, Motomundi apostó al
                contenido. Reviews honestas, bitácoras de viaje y guías técnicas
                convirtieron una tienda en una comunidad.
              </p>
              <p class="story-body">
                Hoy esa comunidad supera los <strong>500.000 suscriptores en
                YouTube</strong>, siendo el corazón latente de la marca y la
                voz más influyente del motociclismo en América Latina.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         FUNDADORES
    ═══════════════════════════════════════════ -->
    <section class="founders-section py-16 py-md-20">
      <v-container>
        <v-row justify="center" class="mb-12">
          <v-col cols="12" class="text-center">
            <h2 class="section-heading">Los que<br />encendieron el motor.</h2>
          </v-col>
        </v-row>
        <v-row justify="center" class="founders-row">

          <!-- Fundador 1 -->
          <v-col cols="12" sm="10" md="5" lg="4">
            <div class="founder-card">
              <div class="founder-image-placeholder">
                <i class="ti ti-user placeholder-icon placeholder-icon--sm"></i>
                <span class="placeholder-label">Foto Juan Carlos Fuentes</span>
              </div>
              <div class="founder-info pa-6">
                <h3 class="founder-name">Juan Carlos Fuentes</h3>
                <span class="founder-role">Co-Fundador & CEO</span>
                <p class="founder-bio mt-4">
                  Programador de corazón, motociclista por convicción. Después
                  de un "no" que cambió su vida, construyó el e-commerce de
                  motociclismo más importante de Chile, combinando tecnología
                  con una genuina pasión por el motociclismo.
                </p>
                <div class="founder-social mt-5">
                  <a href="https://www.youtube.com/@MotomundiTV" target="_blank" class="social-link" aria-label="YouTube">
                    <i class="ti ti-brand-youtube"></i>
                  </a>
                  <a href="https://www.instagram.com/motomundi" target="_blank" class="social-link" aria-label="Instagram">
                    <i class="ti ti-brand-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Fundadora 2 -->
          <v-col cols="12" sm="10" md="5" lg="4">
            <div class="founder-card">
              <div class="founder-image-placeholder">
                <i class="ti ti-user placeholder-icon placeholder-icon--sm"></i>
                <span class="placeholder-label">Foto Paulina Silva</span>
              </div>
              <div class="founder-info pa-6">
                <h3 class="founder-name">Paulina Silva</h3>
                <span class="founder-role">Co-Fundadora & COO</span>
                <p class="founder-bio mt-4">
                  La fuerza operacional detrás de Motomundi. Paulina transformó
                  una pequeña tienda en Las Condes en una red de 8 puntos de
                  venta, construyendo el estándar de servicio que hoy define a
                  la marca en toda América Latina.
                </p>
                <div class="founder-social mt-5">
                  <a href="https://www.instagram.com/motomundi" target="_blank" class="social-link" aria-label="Instagram">
                    <i class="ti ti-brand-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </v-col>

        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         YOUTUBE / COMUNIDAD
    ═══════════════════════════════════════════ -->
    <section class="youtube-section py-16 py-md-20">
      <v-container>
        <v-row justify="center" class="mb-10">
          <v-col cols="12" md="8" class="text-center">
            <div class="yt-eyebrow mb-4">
              <i class="ti ti-brand-youtube yt-icon"></i>
              <span>MotomundiTV</span>
            </div>
            <h2 class="section-heading section-heading--light">
              Medio millón de<br />razones para seguirnos.
            </h2>
            <p class="yt-description mt-5">
              Nuestro canal de YouTube es el espacio donde la comunidad
              Motomundi cobra vida. Reviews honestas, aventuras en ruta,
              guías técnicas y la voz más influyente del motociclismo en
              habla hispana.
            </p>
          </v-col>
        </v-row>

        <!-- Video embed -->
        <v-row justify="center" class="mb-10">
          <v-col cols="12" md="10" lg="8">
            <div class="video-wrapper">
              <!--
                REEMPLAZA "YOUTUBE_VIDEO_ID" con el ID real del video
                de celebración 100K suscriptores.
                Ejemplo: si la URL es https://www.youtube.com/watch?v=abc123
                reemplaza por: src="https://www.youtube.com/embed/abc123"
              -->
              <iframe
                class="video-iframe"
                src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
                title="Motomundi celebra 100.000 suscriptores en YouTube"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <p class="video-caption text-center mt-4">
              🎉 Celebrando 100.000 suscriptores — ¡Gracias por ser parte de la ruta!
            </p>
          </v-col>
        </v-row>

        <!-- CTA YouTube -->
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <a
              href="https://www.youtube.com/@MotomundiTV"
              target="_blank"
              class="yt-cta-btn"
            >
              <i class="ti ti-brand-youtube mr-2"></i>
              Suscríbete a MotomundiTV
            </a>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         VALORES
    ═══════════════════════════════════════════ -->
    <section class="values-section py-16 py-md-20">
      <v-container>
        <v-row justify="center" class="mb-12">
          <v-col cols="12" class="text-center">
            <h2 class="section-heading">Lo que nos mueve.</h2>
          </v-col>
        </v-row>
        <v-row justify="center">

          <v-col cols="12" sm="6" md="3">
            <div class="value-card text-center">
              <div class="value-icon-wrap mb-5">
                <i class="ti ti-shield-check value-icon"></i>
              </div>
              <h3 class="value-title mb-3">Honestidad Radical</h3>
              <p class="value-text">
                Reviews reales, sin filtros. Si un producto no está a la altura,
                te lo decimos. Tu seguridad depende de tu equipamiento.
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="value-card text-center">
              <div class="value-icon-wrap mb-5">
                <i class="ti ti-users value-icon"></i>
              </div>
              <h3 class="value-title mb-3">Comunidad Primero</h3>
              <p class="value-text">
                Somos motociclistas antes que vendedores. Cada decisión
                que tomamos busca fortalecer la comunidad que nos dio vida.
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="value-card text-center">
              <div class="value-icon-wrap mb-5">
                <i class="ti ti-rocket value-icon"></i>
              </div>
              <h3 class="value-title mb-3">Innovación Constante</h3>
              <p class="value-text">
                Nacimos en el mundo digital. Seguimos explorando cómo la
                tecnología puede hacer tu experiencia más fácil y tu ruta
                más segura.
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="value-card text-center">
              <div class="value-icon-wrap mb-5">
                <i class="ti ti-world value-icon"></i>
              </div>
              <h3 class="value-title mb-3">Excelencia Global</h3>
              <p class="value-text">
                Traemos las mejores marcas del mundo a Chile. Estándares
                globales, precios justos, y el conocimiento para orientarte
                bien.
              </p>
            </div>
          </v-col>

        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         HOY — EXPANSIÓN
    ═══════════════════════════════════════════ -->
    <section class="today-section py-0">
      <v-container fluid class="pa-0">
        <v-row no-gutters align="stretch">
          <v-col cols="12" md="5">
            <div class="today-image-grid">
              <div class="today-img-placeholder today-img-placeholder--large">
                <i class="ti ti-photo placeholder-icon placeholder-icon--sm"></i>
                <span class="placeholder-label">Tienda insignia Motomundi 2024</span>
              </div>
              <div class="today-img-placeholder today-img-placeholder--small">
                <i class="ti ti-photo placeholder-icon placeholder-icon--sm"></i>
                <span class="placeholder-label">Detalle de equipamiento</span>
              </div>
              <div class="today-img-placeholder today-img-placeholder--small">
                <i class="ti ti-photo placeholder-icon placeholder-icon--sm"></i>
                <span class="placeholder-label">El equipo Motomundi</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="7" class="d-flex align-center">
            <div class="today-content pa-8 pa-md-14">
              <div class="act-badge mb-5">
                <span class="act-number">Hoy</span>
                <span class="act-title">Una Visión Realizada</span>
              </div>
              <h2 class="story-heading mb-6">
                De una tienda en Las Condes<br />a 8 puntos en todo Chile.
              </h2>
              <p class="story-body mb-5">
                Lo que comenzó como una pequeña tienda en Las Condes se ha
                expandido a <strong>8 tiendas a lo largo de Chile</strong>, con
                un e-commerce que distribuye a todo el país y una reputación
                consolidada como la autoridad líder del motociclismo en América
                Latina.
              </p>
              <p class="story-body mb-8">
                Pero los números no son lo que más nos enorgullece. Lo que nos
                mueve es saber que cada persona que visita Motomundi —online o
                presencialmente— sale con el equipamiento correcto, el
                conocimiento necesario y las ganas de salir a rodar.
              </p>
              <div class="today-pillars">
                <div class="pillar-item">
                  <i class="ti ti-map-pin pillar-icon"></i>
                  <span>8 tiendas en Chile</span>
                </div>
                <div class="pillar-item">
                  <i class="ti ti-truck-delivery pillar-icon"></i>
                  <span>Envíos a todo el país</span>
                </div>
                <div class="pillar-item">
                  <i class="ti ti-package pillar-icon"></i>
                  <span>+6.000 productos disponibles</span>
                </div>
                <div class="pillar-item">
                  <i class="ti ti-star pillar-icon"></i>
                  <span>N°1 en equipamiento de moto en Chile</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ═══════════════════════════════════════════
         CIERRE / CTA
    ═══════════════════════════════════════════ -->
    <section class="closing-section py-20 text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <i class="ti ti-road closing-icon mb-6"></i>
            <h2 class="closing-headline mb-6">
              Únete a la<br />
              <span class="closing-headline--accent">comunidad Motomundi.</span>
            </h2>
            <p class="closing-body mb-10">
              Somos más que una tienda. Somos la comunidad motociclista más
              grande de Chile. Ven a visitarnos, escríbenos, síguenos en ruta.
            </p>
            <div class="closing-actions">
              <a href="/tiendas" class="closing-btn closing-btn--primary">
                <i class="ti ti-map-pin mr-2"></i>Encuentra tu tienda
              </a>
              <a href="/productos" class="closing-btn closing-btn--secondary">
                <i class="ti ti-helmet mr-2"></i>Ver productos
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

  </div>
</template>

<script setup>
// No external dependencies needed for this static page
</script>

<style scoped>

/* ══════════════════════════════════════
   CSS VARIABLES
══════════════════════════════════════ */
.about-page {
  --brand:        #B21915;
  --brand-dark:   #8a1210;
  --brand-light:  #f9e8e8;
  --ink:          #111111;
  --ink-muted:    #555555;
  --surface-dark: #0f0f0f;
  --surface-mid:  #1a1a1a;
  --border:       #e5e5e5;
  --white:        #ffffff;
}

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
.hero-section {
  position: relative;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.hero-container {
  min-height: 560px;
}

.hero-left {
  position: relative;
  z-index: 1;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
}

.eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 2px;
  background: var(--brand);
}

.eyebrow-text {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--brand);
}

.hero-headline {
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--ink);
  margin: 0;
}

.hero-headline--accent {
  color: var(--brand);
}

.hero-lead {
  font-size: 1.1rem;
  color: var(--ink-muted);
  max-width: 460px;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--brand);
  line-height: 1;
}

.stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

.hero-right {
  min-height: 480px;
}

.hero-image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 480px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.hero-accent-bar {
  height: 4px;
  background: var(--brand);
  width: 100%;
}

/* ══════════════════════════════════════
   PLACEHOLDERS (shared)
══════════════════════════════════════ */
.placeholder-icon {
  font-size: 2.5rem;
  color: #bbb;
}

.placeholder-icon--sm {
  font-size: 1.8rem;
}

.placeholder-label {
  font-size: 0.75rem;
  color: #999;
  letter-spacing: 0.05em;
  text-align: center;
  padding: 0 16px;
}

/* ══════════════════════════════════════
   MISSION
══════════════════════════════════════ */
.mission-section {
  background: var(--white);
}

.mission-statement {
  font-size: clamp(1.3rem, 2.5vw, 1.9rem);
  font-weight: 600;
  line-height: 1.5;
  color: var(--ink);
  font-style: italic;
  position: relative;
}

.mission-statement::before {
  content: '"';
  font-size: 5rem;
  color: var(--brand);
  opacity: 0.15;
  line-height: 0;
  position: absolute;
  top: 24px;
  left: -16px;
}

.mission-divider {
  width: 60px;
  height: 3px;
  background: var(--brand);
}

/* ══════════════════════════════════════
   STORY SECTIONS
══════════════════════════════════════ */
.story-section--light {
  background: var(--white);
}

.story-section--dark {
  background: var(--surface-dark);
}

.story-image-placeholder {
  width: 100%;
  background: #ebebeb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.story-image-placeholder--tall {
  min-height: 420px;
  height: 100%;
}

.story-image-placeholder--dark {
  background: #222;
}

.story-content {
  max-width: 580px;
}

.story-content--dark {
  max-width: 580px;
}

.act-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--brand-light);
  border-left: 3px solid var(--brand);
  padding: 6px 14px;
}

.act-badge--light {
  background: rgba(178, 25, 21, 0.15);
}

.act-number {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--brand);
  letter-spacing: 0.05em;
}

.act-title {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--brand);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.story-heading {
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--ink);
}

.story-heading--light {
  color: var(--white);
}

.story-body {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--ink-muted);
}

.story-body--light {
  color: rgba(255,255,255,0.72);
}

.story-body strong {
  color: var(--ink);
  font-weight: 700;
}

.story-body--light strong {
  color: var(--white);
}

/* ══════════════════════════════════════
   FUNDADORES
══════════════════════════════════════ */
.founders-section {
  background: #fafafa;
}

.section-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--ink);
}

.section-heading--light {
  color: var(--white);
}

.founders-row {
  gap: 24px 0;
}

.founder-card {
  background: var(--white);
  border: 1px solid var(--border);
  overflow: hidden;
  height: 100%;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.founder-card:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.10);
  transform: translateY(-4px);
}

.founder-image-placeholder {
  width: 100%;
  height: 260px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.founder-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
}

.founder-role {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand);
  margin-top: 4px;
}

.founder-bio {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--ink-muted);
}

.founder-social {
  display: flex;
  gap: 12px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  color: var(--ink-muted);
  text-decoration: none;
  font-size: 1.1rem;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.social-link:hover {
  background: var(--brand);
  color: var(--white);
  border-color: var(--brand);
}

/* ══════════════════════════════════════
   YOUTUBE SECTION
══════════════════════════════════════ */
.youtube-section {
  background: var(--surface-dark);
}

.yt-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--brand);
}

.yt-icon {
  font-size: 1.4rem;
  color: var(--brand);
}

.yt-description {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.65);
  max-width: 600px;
  margin: 0 auto;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  background: #000;
  border: 2px solid var(--brand);
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-caption {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
}

.yt-cta-btn {
  display: inline-flex;
  align-items: center;
  background: var(--brand);
  color: var(--white);
  text-decoration: none;
  padding: 14px 32px;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 2px solid var(--brand);
  transition: background 0.2s, color 0.2s;
}

.yt-cta-btn:hover {
  background: transparent;
  color: var(--brand);
}

/* ══════════════════════════════════════
   VALUES
══════════════════════════════════════ */
.values-section {
  background: var(--white);
}

.value-card {
  padding: 32px 24px;
  height: 100%;
  border-top: 3px solid transparent;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.value-card:hover {
  border-color: var(--brand);
  box-shadow: 0 8px 32px rgba(0,0,0,0.07);
}

.value-icon-wrap {
  width: 64px;
  height: 64px;
  background: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.value-icon {
  font-size: 1.8rem;
  color: var(--brand);
}

.value-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.value-text {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--ink-muted);
}

/* ══════════════════════════════════════
   TODAY
══════════════════════════════════════ */
.today-section {
  background: var(--white);
  border-top: 1px solid var(--border);
}

.today-image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  height: 100%;
  min-height: 480px;
  gap: 3px;
  background: #ddd;
}

.today-img-placeholder {
  background: #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
}

.today-img-placeholder--large {
  grid-column: 1 / -1;
  min-height: 240px;
}

.today-img-placeholder--small {
  min-height: 160px;
}

.today-content {
  max-width: 600px;
}

.today-pillars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pillar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ink);
}

.pillar-icon {
  font-size: 1.2rem;
  color: var(--brand);
  flex-shrink: 0;
}

/* ══════════════════════════════════════
   CLOSING
══════════════════════════════════════ */
.closing-section {
  background: var(--surface-dark);
}

.closing-icon {
  font-size: 3rem;
  color: var(--brand);
  display: block;
}

.closing-headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--white);
}

.closing-headline--accent {
  color: var(--brand);
}

.closing-body {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.65);
  max-width: 480px;
  margin: 0 auto;
}

.closing-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.closing-btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  padding: 14px 28px;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.closing-btn--primary {
  background: var(--brand);
  color: var(--white);
  border: 2px solid var(--brand);
}

.closing-btn--primary:hover {
  background: var(--brand-dark);
  border-color: var(--brand-dark);
}

.closing-btn--secondary {
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255,255,255,0.35);
}

.closing-btn--secondary:hover {
  border-color: var(--white);
}

/* ══════════════════════════════════════
   RESPONSIVE TWEAKS
══════════════════════════════════════ */
@media (max-width: 960px) {
  .hero-container {
    min-height: unset;
  }

  .story-image-placeholder--tall {
    min-height: 260px;
  }

  .today-image-grid {
    min-height: 280px;
  }

  .hero-stats {
    gap: 16px;
  }

  .stat-number {
    font-size: 1.3rem;
  }
}
</style>
