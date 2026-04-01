<script setup>
useHead({
  title: 'Nuestra Historia | Motomundi',
  meta: [
    {
      name: 'description',
      content: 'Conoce la historia de cómo una frustración personal se convirtió en la tienda de equipamiento premium más grande de Chile.',
    },
  ],
})

useSeoMeta({
  title: 'Nuestra Historia | Motomundi',
  description: 'Conoce la historia de cómo una frustración personal se convirtió en la tienda de equipamiento premium más grande de Chile.',

  // Open Graph (Used by Facebook, WhatsApp, LinkedIn, etc.)
  ogTitle: 'Nuestra Historia | Motomundi',
  ogDescription: 'Conoce la historia de cómo una frustración personal se convirtió en la tienda de equipamiento premium más grande de Chile.',
  ogImage: 'https://www.motomundi.cl/cms/about-us/nueva-tienda.png',

  // Twitter / X
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nuestra Historia | Motomundi',
  twitterDescription: 'La historia de cómo una frustración personal se convirtió en la tienda de equipamiento premium más grande de Chile.',
  twitterImage: 'https://www.motomundi.cl/cms/about-us/nueva-tienda.png',
})

const stats = [
  { number: '2018', label: 'Año de fundación' },
  { number: '#1', label: 'Retailer de equipamiento en Chile' },
  { number: '100+', label: 'Marcas premium disponibles' },
  { number: '18+', label: 'Años equipando riders' },
]

const pivotSteps = [
  {
    icon: 'tabler-heart-handshake',
    title: 'Alianza estratégica con Motolife',
    body: 'Reconocer que necesitábamos socios fuertes fue una señal de madurez, no de debilidad. La alianza con Motolife nos dio la base para seguir adelante cuando más lo necesitábamos.',
  },
  {
    icon: 'tabler-target',
    title: 'Foco total en ropa y accesorios premium',
    body: 'Dejar de vender motos fue difícil, pero fue liberador. Al especializarnos completamente en equipamiento, dejamos de ser una tienda más para convertirnos en el referente indiscutido del sector.',
  },
]

const brandBadges = [
  'Marcas líderes mundiales',
  'Asesoría especializada',
  'Comunidad de riders',
  'Envío a todo Chile',
]

const values = [
  {
    icon: 'tabler-shield-check',
    title: 'Seguridad primero',
    body: 'El equipamiento correcto salva vidas. No comercializamos productos que no cumplen los más altos estándares internacionales.',
  },
  {
    icon: 'tabler-star',
    title: 'Sin compromiso en calidad',
    body: 'Solo trabajamos con las marcas más reconocidas del mundo. Si no es lo mejor disponible, no está en nuestro catálogo.',
  },
  {
    icon: 'tabler-users',
    title: 'Riders que atienden riders',
    body: 'Nuestro equipo vive la moto. Conocemos los productos que vendemos porque los usamos nosotros mismos.',
  },
  {
    icon: 'tabler-map-pin',
    title: 'Comunidad en la ruta',
    body: 'Motomundi es más que una tienda. Somos parte del ecosistema motociclista chileno, su crecimiento es el nuestro.',
  },
]

const galleryImages = [
  { cols: 12, md: 6, size: 'medium', year: '2008', caption: 'La primera tienda en calle Bocaccio, Las Condes', image: "/cms/about-us/tienda-laura-de-noves.jpg" },
  { cols: 12, md: 6, size: 'medium', year: '2011', caption: 'Representantes oficiales de AGV en Chile', image: '/cms/about-us/agv.jpg' },
  { cols: 12, md: 4, size: 'medium', year: '2018', caption: 'Mega tienda de 350 mt2 en Las Condes', image: '/cms/about-us/nueva-tienda.png' },
  { cols: 12, md: 4, size: 'medium', year: '2020', caption: 'Auspicio WSBK de Maxi Scheib', image: '/cms/about-us/maxi.jpg' },
  { cols: 12, md: 4, size: 'medium', year: '2023', caption: 'Evento Moto Viajeros en Motomundi', image: '/cms/about-us/evento-influencers.jpg' },
  { cols: 12, md: 4, size: 'medium', year: '2024', caption: '100K suscriptores YouTube', image: '/cms/about-us/youtube-100k.png' },
  { cols: 12, md: 4, size: 'medium', year: '2026', caption: 'Primera tienda outlet Motomundi', image: 'https://cdn.motomundi.cl/Content/products/1/7/51/75190f7ffdcc4a599eb968b18636c9c3_org.jpeg' },
]
</script>


<template>
  <div class="about-page">
    <!--
      ═══════════════════════════════════════════════
      HERO — Headline cinematic con overlay rojo
      ═══════════════════════════════════════════════ 
    -->
    <section class="hero-section">
      <div class="hero-image-placeholder">

      </div>
      <div class="hero-overlay" />
      <div class="hero-content">
        <p class="hero-eyebrow">
          Nuestra Historia
        </p>
        <h1 class="hero-headline">
          Nacimos de la<br>
          <em>carretera,</em><br>
          no de un escritorio.
        </h1>
        <div class="hero-rule" />
        <p class="hero-sub">
          La historia de cómo una frustración personal se convirtió<br class="d-none d-md-block">
          en la tienda de equipamiento premium más grande de Chile.
        </p>
      </div>
      <div class="hero-scroll-hint">
        <VIcon
          icon="mdi-chevron-down"
          size="28"
          color="white"
          class="bounce"
        />
      </div>
    </section>

    <!--
      ═══════════════════════════════════════════════
      STAT BAR
      ═══════════════════════════════════════════════ 
    -->
    <section class="stat-bar">
      <VContainer
        fluid
        class="pa-0"
      >
        <VRow no-gutters>
          <VCol
            v-for="(stat, i) in stats"
            :key="i"
            cols="6"
            md="3"
            class="stat-item"
            :class="{ 'stat-item--red': i % 2 === 0 }"
          >
            <div class="stat-number">
              {{ stat.number }}
            </div>
            <div class="stat-label">
              {{ stat.label }}
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!--
      ═══════════════════════════════════════════════
      ACTO I — El Inicio
      ═══════════════════════════════════════════════ 
    -->
    <section class="chapter-section chapter-section--light">
      <VContainer>
        <VRow
          align="center"
          class="chapter-row"
        >
          <VCol
            cols="12"
            md="6"
            order-md="2"
          >
            <div class="chapter-image-wrap">
              <VImg
                src="/cms/about-us/eicma-2010.png"
                cover
              />
              <div class="chapter-image-badge">
                EICMA 2019
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="6"
            order-md="1"
          >
            <div class="chapter-content">
              <div class="chapter-act-label">
                <span class="act-number">01</span>
                <span class="act-divider" />
                <span class="act-title">El Inicio</span>
              </div>
              <h2 class="chapter-heading">
                Cuando una puerta<br>
                se cierra,
                <span class="text-brand">comienza la ruta.</span>
              </h2>

              <p class="chapter-body">
                En 2018, Juan Carlos Fuentes perseguía una meta en Redmond: trabajar para Microsoft. Cuando la respuesta fue "no", volvió a Chile enfrentando un punto de inflexión personal.
              </p>
              <p class="chapter-body">
                Para despejar la mente, compró una motocicleta. No fue solo un pasatiempo; fue su terapia. Pero al buscar equipamiento de calidad, descubrió un vacío enorme en el mercado chileno.
              </p>
              <p class="chapter-body">
                Inspirado por el éxito digital de Revzilla en Estados Unidos, Juan Carlos encontró su camino: si no podía escribir código para Microsoft, construiría el mejor e-commerce de motociclismo en América Latina.
              </p>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!--
      ═══════════════════════════════════════════════
      ACTO II — El Golpe de Realidad
      ═══════════════════════════════════════════════ 
    -->
    <section class="chapter-section chapter-section--dark">
      <VContainer>
        <VRow
          align="center"
          class="chapter-row"
        >
          <VCol
            cols="12"
            md="6"
          >
            <div class="chapter-image-wrap">
              <VImg
                src="/cms/about-us/tienda-laura-de-noves.jpg"
                cover
              />
              <div class="chapter-image-badge">
                PRIMERA TIENDA
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <div class="chapter-content">
              <div class="chapter-act-label chapter-act-label--light">
                <span class="act-number">02</span>
                <span class="act-divider act-divider--light" />
                <span class="act-title">La Prueba de Fuego</span>
              </div>
              <h2 class="chapter-heading chapter-heading--light">
                Seis meses después,<br>
                <span class="text-brand">casi todo se terminó.</span>
              </h2>
              <p class="chapter-body chapter-body--light">
                Junto a Paulina Silva, Juan Carlos lanzó www.motomundi.cl y abrió una pequeña tienda física en la calle Bocaccio, en Las Condes. Vendían motos, ropa y accesorios: intentaban hacerlo todo.
              </p>
              <p class="chapter-body chapter-body--light">
                Seis meses después, Motomundi estaba al borde de desaparecer. Entonces llegó el punto de quiebre: la empresa Motolife los contactó para compartir su espacio de retail. Ese fue el "milagro" que necesitaban.
              </p>
              <p class="chapter-body chapter-body--light">
                Juan Carlos y Paulina tomaron la decisión estratégica de dejar de vender motos y enfocarse en lo que hacían mejor: equipamiento y accesorios de clase mundial, cuidadosamente seleccionados.
              </p>
              <div class="crisis-callout">
                <VIcon
                  icon="tabler-alert-circle-outline"
                  size="20"
                  color="#B21915"
                />
                <span>6 meses de apertura. 1 decisión que lo cambió todo.</span>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>


    <!--
      ═══════════════════════════════════════════════
      ACTO I — El Inicio
      ═══════════════════════════════════════════════
    -->
    <section class="chapter-section chapter-section--light">
      <VContainer>
        <VRow
          align="center"
          class="chapter-row"
        >
          <VCol
            cols="12"
            md="6"
            order-md="2"
          >
            <div class="chapter-image-wrap">
              <div style="width: 170px; height: 700px;">
                <iframe
                  class="video-iframe"
                  src="https://www.youtube.com/embed/9bxuxHH6n-E"
                  title="Motomundi celebra 100.000 suscriptores en YouTube"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>
              <div class="chapter-image-badge">
                100K YouTube
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="6"
            order-md="1"
          >
            <div class="chapter-content">
              <div class="chapter-act-label">
                <span class="act-number">03</span>
                <span class="act-divider" />
                <span class="act-title">Construyendo una Comunidad</span>
              </div>
              <h2 class="chapter-heading">
                No vendemos productos. Compartimos la ruta.
              </h2>

              <p class="chapter-body">
                Aprovechando el background tecnológico de Juan Carlos y una profunda pasión por contar historias, Motomundi apostó al contenido. Reviews honestas, bitácoras de viaje y guías técnicas convirtieron una tienda en una comunidad.
              </p>
              <p class="chapter-body">
                Hoy esa comunidad supera los 500.000 suscriptores en YouTube, siendo el corazón latente de la marca y la voz más influyente del motociclismo en América Latina.
              </p>
              <div class="quote-block">
                <p class="quote-text">
                  "Inspirar a la comunidad motociclista con productos excepcionales y un servicio que va más allá de la venta."
                </p>
                <p class="quote-attribution">
                  — Juan Carlos Fuentes, Co-fundador
                </p>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>


    <!--
      ═══════════════════════════════════════════════
      FOUNDERS SECTION
      ═══════════════════════════════════════════════ 
    -->
    <section class="founders-section">
      <VContainer>
        <div class="section-label">
          Las Personas Detrás de Motomundi
        </div>
        <h2 class="section-heading">
          Riders que entienden<br>a los riders.
        </h2>
        <VRow
          justify="center"
          class="mt-10"
        >
          <VCol
            cols="12"
            sm="10"
            md="5"
            class="founder-col"
          >
            <div class="founder-card">
              <div class="founder-avatar-placeholder">
                <VImg
                  src="/cms/about-us/jcf.png"
                  style="width: 100%;"
                />
              </div>
              <div class="founder-info">
                <h3 class="founder-name">
                  Juan Carlos Fuentes
                </h3>
                <p class="founder-role">
                  Co-fundador & CEO
                </p>
                <p class="founder-bio">
                  Programador de corazón, motociclista por convicción. Después
                  de un "no" que cambió su vida, construyó el e-commerce de
                  motociclismo más importante de Chile, combinando tecnología
                  con una genuina pasión por el motociclismo.
                </p>
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="10"
            md="5"
            class="founder-col"
          >
            <div class="founder-card">
              <div class="founder-avatar-placeholder">
                <VImg
                  src="/cms/about-us/paulina.jpeg"
                  style="width: 100%;"
                />
              </div>
              <div class="founder-info">
                <h3 class="founder-name">
                  Paulina Silva
                </h3>
                <p class="founder-role">
                  Co-fundadora & Directora de Operaciones
                </p>
                <p class="founder-bio">
                  La fuerza operacional detrás de Motomundi. Paulina transformó
                  una pequeña tienda en Las Condes en una red de 8 puntos de
                  venta, construyendo el estándar de servicio que hoy define a
                  la marca en toda América Latina.
                </p>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!--
      ═══════════════════════════════════════════
      YOUTUBE / COMUNIDAD
      ═══════════════════════════════════════════ 
    -->
    <section class="youtube-section py-16 py-md-20">
      <VContainer>
        <VRow
          justify="center"
          class="mb-10"
        >
          <VCol
            cols="12"
            md="8"
            class="text-center"
          >
            <div class="yt-eyebrow mb-4">
              <i class="ti ti-brand-youtube yt-icon" />
              <span>MotomundiTV</span>
            </div>
            <h2 class="section-heading section-heading--light">
              Medio millón de<br>razones para seguirnos.
            </h2>
            <p class="yt-description mt-5">
              Nuestro canal de YouTube es el espacio donde la comunidad
              Motomundi cobra vida. Reviews honestas, aventuras en ruta,
              guías técnicas y la voz más influyente del motociclismo en
              habla hispana.
            </p>
          </VCol>
        </VRow>

        <!-- Video embed -->
        <VRow
          justify="center"
          class="mb-10"
        >
          <VCol
            cols="12"
            md="10"
            lg="8"
          >
            <div class="video-wrapper">
              <!--
                REEMPLAZA "YOUTUBE_VIDEO_ID" con el ID real del video
                de celebración 100K suscriptores.
                Ejemplo: si la URL es https://www.youtube.com/watch?v=abc123
                reemplaza por: src="https://www.youtube.com/embed/abc123"
              -->

              <iframe
                src="https://drive.google.com/file/d/1AQEyjiADscoi-d-MlzzO5Xxu6I0hdelB/preview"
                class="video-iframe"
                allow="autoplay"
                allowfullscreen
              />
              <!--
                <iframe
                class="video-iframe"
                src="https://www.youtube.com/embed/gpicwQMKRD0"
                title="Motomundi celebra 100.000 suscriptores en YouTube"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                />
              -->
            </div>
            <p class="video-caption text-center mt-4">
              🎉 Celebrando 500.000 suscriptores — ¡Gracias por ser parte de la ruta!
            </p>
          </VCol>
        </VRow>

        <!-- CTA YouTube -->
        <VRow justify="center">
          <VCol
            cols="12"
            class="text-center"
          >
            <a
              href="https://www.youtube.com/@MotomundiTV"
              target="_blank"
              class="yt-cta-btn"
            >
              <i class="ti ti-brand-youtube mr-2" />
              Suscríbete a MotomundiTV
            </a>
          </VCol>
        </VRow>
      </VContainer>
    </section>


    <!--
      ═══════════════════════════════════════════════
      VALORES
      ═══════════════════════════════════════════════ 
    -->
    <section
      class="values-section"
      style="display:none;"
    >
      <VContainer>
        <div class="section-label section-label--light">
          Lo Que Nos Mueve
        </div>
        <h2 class="section-heading section-heading--light">
          Nuestros valores<br>no son decoración.
        </h2>
        <VRow class="mt-10">
          <VCol
            v-for="(value, i) in values"
            :key="i"
            cols="12"
            sm="6"
            lg="3"
          >
            <div class="value-card">
              <div class="value-icon-wrap">
                <VIcon
                  :icon="value.icon"
                  size="32"
                  color="#B21915"
                />
              </div>
              <h3 class="value-title">
                {{ value.title }}
              </h3>
              <p class="value-body">
                {{ value.body }}
              </p>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!--
      ═══════════════════════════════════════════════
      MANIFESTO / CIERRE
      ═══════════════════════════════════════════════ 
    -->
    <section class="manifesto-section">
      <div
        class="manifesto-image-placeholder"
        style="background-image: url('/cms/about-us/bg.jpg'); top: -100px;"
      />

      <div class="manifesto-overlay" />
      <div
        class="manifesto-content"
        astyle="background-image: url('/cms/about-us/bg.jpg');"
      >
        <VContainer>
          <p class="manifesto-eyebrow">
            Por Qué Existimos
          </p>
          <h2 class="manifesto-heading">
            No vendemos ropa.<br>
            Vendemos la confianza<br>
            de <em>salir a rodar.</em>
          </h2>
          <p class="manifesto-body">
            Aprendimos temprano que para ser los mejores, hay que enfocarse. Somos riders que atienden riders. Hemos vivido los baches y las curvas de la carretera — igual que tú. Y por eso sabemos exactamente qué necesitas cuando subes a tu moto.
          </p>
          <VBtn
            color="#B21915"
            size="large"
            class="manifesto-cta"
            elevation="0"
            rounded="0"
            href="/"
          >
            <VIcon
              icon="mdi-store-outline"
              class="mr-2"
            />
            Conoce Nuestros Productos
          </VBtn>
        </VContainer>
      </div>
    </section>

    <!--
      ═══════════════════════════════════════════════
      GALERÍA DE HISTORIA
      ═══════════════════════════════════════════════ 
    -->
    <section class="gallery-section">
      <VContainer>
        <div class="section-label">
          Nuestra Trayectoria en Imágenes
        </div>
        <h2 class="section-heading">
          Desde Bocaccio<br>al liderazgo nacional.
        </h2>
        <VRow class="mt-8 gallery-grid">
          <VCol
            v-for="(img, i) in galleryImages"
            :key="i"
            :cols="img.cols"
            :md="img.md"
          >
            <div
              class="gallery-item"
              :class="`gallery-item--${img.size}`"
            >
              <VImg
                :src="img.image"
                style="width: 100%"
                cover
              />
              <div class="gallery-caption">
                {{ img.year }} — {{ img.caption }}
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!--
      ═══════════════════════════════════════════════
      CTA FINAL
      ═══════════════════════════════════════════════ 
    -->
    <section class="cta-section">
      <VContainer>
        <VRow
          align="center"
          justify="space-between"
        >
          <VCol
            cols="12"
            md="7"
          >
            <p class="cta-eyebrow">
              Únete a la Comunidad
            </p>
            <h2 class="cta-heading">
              ¿Eres rider?<br><span class="text-brand">Este es tu lugar.</span>
            </h2>
            <p class="cta-body">
              Más de 18 años llevamos equipando a la comunidad motociclista de Chile con los mejores productos del mundo. Tu próxima aventura merece el mejor equipamiento.
            </p>
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="text-center text-md-right"
          >
            <VBtn
              color="#B21915"
              size="x-large"
              class="cta-btn"
              elevation="0"
              rounded="0"
              block
              href="/tiendas"
            >
              <VIcon
                icon="tabler-helmet"
                class="mr-2"
              />
              Ver Tiendas
            </VBtn>
            <VBtn
              variant="outlined"
              color="#B21915"
              size="x-large"
              class="cta-btn mt-3"
              elevation="0"
              rounded="0"
              block
              href="/contacto"
            >
              <VIcon
                icon="tabler-phone"
                class="mr-2"
              />
              Contáctanos
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>


<style lang="scss">
:root {
  --brand: #B21915;
  --brand-dark: #8a120e;
  --black: #0d0d0d;
  --dark: #1a1a1a;
  --mid: #2e2e2e;
  --grey-light: #f5f5f5;
  --grey-border: #e0e0e0;
  --white: #ffffff;
  --radius: 0px;
  --surface-dark: #0f0f0f;
}
</style>

<style scoped>
.v-container {
  margin: 0 auto;
  width: 100%;
}
/* ─── Design Tokens ─────────────────────────────── */

/* ─── Global ─────────────────────────────────────── */
.about-page {
  background: #ffffff;
  color: var(--black);
  overflow-x: hidden;
}
.text-brand { color: #B21915; }

/* ─── Hero ───────────────────────────────────────── */
.hero-section {
  position: relative;
  height: min(90vh, 720px);

  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;

  @media (max-width: 900px){
    height: 480px;
  }

}



.hero-image-placeholder {
  position: absolute;
  inset: 0;
  background: #1c1c1c;
  display: flex;
  align-items: flex-end;


  background-image: url('/cms/about-us/nueva-tienda.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;


}



.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(178,25,21,0.85) 0%,
    rgba(13,13,13,0.78) 50%,
    rgba(13,13,13,0.55) 100%
  );
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 48px;
  max-width: 780px;
}
@media (max-width: 600px) {
  .hero-content { padding: 0 24px; }
}
.hero-eyebrow {
  color: rgba(255,255,255,0.65);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin: 0 0 16px;
  font-weight: 600;
}
.hero-headline {
  color: #ffffff;
  font-size: clamp(2.4rem, 5.5vw, 4.2rem);
  line-height: 1.08;
  font-weight: 800;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}
.hero-headline em {
  font-style: italic;
  color: #ffffff;
}
.hero-rule {
  width: 60px;
  height: 3px;
  background: #B21915;
  margin-bottom: 20px;
}
.hero-sub {
  color: rgba(255,255,255,0.80);
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  line-height: 1.65;
  margin: 0;
}
.hero-scroll-hint {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}
.bounce {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* ─── Stat Bar ───────────────────────────────────── */
.stat-bar {
  background: var(--black);
}
.stat-item {
  padding: 32px 24px;
  border-right: 1px solid rgba(255,255,255,0.08);
  text-align: center;
}
.stat-item--red {
  background: #B21915;
}
.stat-number {
  margin-left: 4px;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 6px;
  letter-spacing: -0.03em;
}
.stat-label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.65);
  font-weight: 500;
}

/* ─── Chapter Sections ───────────────────────────── */
.chapter-section { padding: 96px 0; }
.chapter-section--light { background: #ffffff; }
.chapter-section--dark { background: var(--dark); }
.chapter-row { gap: 0; }

.chapter-image-wrap {
  position: relative;
  margin-bottom: 24px;
}
.chapter-image-placeholder {
  aspect-ratio: 4/3;
  background: #e8e8e8;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  border: 2px dashed #cccccc;
}
.chapter-image-placeholder--dark {
  background: #2a2a2a;
  border-color: #444;
}
.chapter-image-badge {
  position: absolute;
  bottom: -16px;
  right: 24px;
  background: #B21915;
  color: #fff;
  font-size: 1rem;
  font-weight: 800;
  padding: 8px 20px;
  letter-spacing: 0.1em;
}
.chapter-image-badge--alt {
  background: var(--black);
}
.chapter-content {
  padding: 0 48px;
}
@media (max-width: 960px) {
  .chapter-content { padding: 24px 0 0; }
}

.chapter-act-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.chapter-act-label--light .act-number,
.chapter-act-label--light .act-title {
  color: rgba(255,255,255,0.55);
}
.act-number {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #B21915;
}
.act-divider {
  flex: 0 0 32px;
  height: 1px;
  background: #cccccc;
}
.act-divider--light { background: rgba(255,255,255,0.25); }
.act-title {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #888;
  font-weight: 600;
}

.chapter-heading {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 24px;
  letter-spacing: -0.02em;
  color: var(--black);
}
.chapter-heading--light { color: #ffffff; }
.chapter-body {
  font-size: 1rem;
  line-height: 1.75;
  color: #444;
  margin-bottom: 16px;
}
.chapter-body--light { color: rgba(255,255,255,0.72); }

.quote-block {
  margin-top: 28px;
  padding: 20px 24px;
  border-left: 3px solid #B21915;
  background: #fafafa;
}
.quote-text {
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--black);
  margin: 8px 0 6px;
  font-weight: 500;
}
.quote-attribution {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: #888;
  text-transform: uppercase;
  margin: 0;
  font-weight: 600;
}

.crisis-callout {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  padding: 14px 20px;
  border: 1px solid rgba(178,25,21,0.35);
  background: rgba(178,25,21,0.08);
  color: rgba(255,255,255,0.85);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* ─── Pivot Section ──────────────────────────────── */
.pivot-section {
  background: var(--grey-light);
  padding: 96px 0;
}
.pivot-header {
  text-align: center;
  margin-bottom: 64px;
}
.pivot-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #B21915;
  font-weight: 700;
  margin-bottom: 12px;
}
.pivot-heading {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--black);
  letter-spacing: -0.02em;
}

.pivot-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}
.pivot-step {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 24px;
  width: 100%;
  position: relative;
  padding-bottom: 0;
}
.pivot-step-icon-wrap {
  width: 60px;
  height: 60px;
  background: #B21915;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
.pivot-connector {
  position: absolute;
  left: 30px;
  top: 60px;
  width: 1px;
  height: 48px;
  background: #B21915;
  transform: translateX(-50%);
  z-index: 1;
}
.pivot-step-content {
  padding: 8px 0 48px;
}
.pivot-step-number {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #B21915;
  font-weight: 700;
  margin-bottom: 6px;
}
.pivot-step-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}
.pivot-step-body {
  font-size: 0.97rem;
  line-height: 1.7;
  color: #555;
}

/* ─── Brand Badges ───────────────────────────────── */
.brand-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}
.brand-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #333;
  background: #f5f5f5;
  padding: 6px 14px;
  border: 1px solid #e0e0e0;
}

/* ─── Founders ───────────────────────────────────── */
.founders-section {
  padding: 96px 0;
  background: #ffffff;
  text-align: center;
}
.section-label {
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #B21915;
  font-weight: 700;
  margin-bottom: 12px;
}
.section-label--light { color: rgba(255,255,255,0.6); }
.section-heading {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--black);
  letter-spacing: -0.02em;
}
.section-heading--light { color: #ffffff; }

.founder-col { display: flex; }
.founder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 32px;
  border: 1px solid var(--grey-border);
  background: #fafafa;
  flex: 1;
  transition: box-shadow 0.25s ease;
}
.founder-card:hover {
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
}
.founder-avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f0f0f0;
  border: 2px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  overflow: hidden;
  position: relative;
}
.founder-name {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: 4px;
  letter-spacing: -0.01em;
}
.founder-role {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #B21915;
  font-weight: 600;
  margin-bottom: 16px;
}
.founder-bio {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
}

/* ─── Values ─────────────────────────────────────── */
.values-section {
  padding: 96px 0;
  background: var(--dark);
  text-align: center;
}
.value-card {
  padding: 36px 24px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  height: 100%;
  text-align: left;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.value-card:hover {
  border-color: rgba(178,25,21,0.5);
  background: rgba(178,25,21,0.05);
}
.value-icon-wrap {
  margin-bottom: 20px;
}
.value-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}
.value-body {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.6);
}

/* ─── Manifesto ──────────────────────────────────── */
.manifesto-section {
  position: relative;
  padding: 112px 0;
  overflow: hidden;
}
.manifesto-image-placeholder {
  position: absolute;
  inset: 0;
  background: #222;
  display: flex;
  align-items: flex-end;
  padding: 16px;
}
.manifesto-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(13,13,13,0.92) 0%,
    rgba(13,13,13,0.75) 55%,
    rgba(13,13,13,0.45) 100%
  );
}
.manifesto-content {
  position: relative;
  z-index: 2;
}
.manifesto-eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  font-weight: 600;
  margin-bottom: 16px;
}
.manifesto-heading {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-bottom: 24px;
}
.manifesto-heading em {
  color: #B21915;
  font-style: italic;
}
.manifesto-body {
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.72);
  max-width: 520px;
  margin-bottom: 36px;
}
.manifesto-cta {
  font-weight: 700;
  letter-spacing: 0.08em;
  font-size: 0.88rem;
  height: 52px;
  padding: 0 32px;
}

/* ─── Gallery ────────────────────────────────────── */
.gallery-section {
  padding: 96px 0;
  background: #ffffff;
}
.gallery-grid { gap: 0; }
.gallery-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.gallery-item--tall .gallery-placeholder { aspect-ratio: 4/3; }
.gallery-item--medium .gallery-placeholder { aspect-ratio: 4/3; }

.gallery-placeholder {
  background: #ebebeb;
  border: 2px dashed #d0d0d0;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  transition: background 0.2s ease;
}
.gallery-item:hover .gallery-placeholder { background: #e0e0e0; }
.gallery-caption {
  padding: 12px 4px 4px;
  font-size: 0.78rem;
  color: #888;
  letter-spacing: 0.05em;
  font-weight: 500;
}

/* ─── Placeholder Labels ─────────────────────────── */
.placeholder-label {
  font-size: 0.72rem;
  color: rgba(120,120,120,0.85);
  font-style: italic;
  line-height: 1.4;
  text-align: center;
  padding: 4px 8px;
  background: rgba(255,255,255,0.6);
  border-radius: 2px;
}

/* ─── CTA Final ──────────────────────────────────── */
.cta-section {
  padding: 96px 0;
  border-top: 4px solid #B21915;
  background: #fafafa;
}
.cta-eyebrow {
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #B21915;
  font-weight: 700;
  margin-bottom: 10px;
}
.cta-heading {
  font-size: clamp(2rem, 3.8vw, 3rem);
  font-weight: 800;
  line-height: 1.12;
  color: var(--black);
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.cta-body {
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  max-width: 480px;
}
.cta-btn {
  font-weight: 700;
  letter-spacing: 0.06em;
  font-size: 0.88rem;
  height: 52px;
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
</style>
