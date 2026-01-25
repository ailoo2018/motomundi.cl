<script setup lang="ts">

</script>

<template>
  <nav id="blognav">
    <ul class="categories-menu">
      <li>
        <form
          role="search"
          method="get"
          class="search-form blog-search-form"
        >
          <VSelect />
          <input
            type="submit"
            class="search-submit submit button button--primary"
            value="Buscar"
          >
        </form>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/reviews/"
        >
          <div class="icon-container">
            <img
              src="/content/images/assets/icons/review.svg"
            >
          </div>
          <div class="text-container"><p>Reviews y pruebas</p>
            <span>Conoce al detalle lo que buscas.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/comparativas-y-rankings/"
        >
          <div class="icon-container"><img
            src="/content/images/assets/icons/comparison.svg"
          >
          </div>
          <div class="text-container"><p>Comparativas y rankings</p><span>¿Dudas entre varios productos? Te ayudamos.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/tutoriales/"
        >
          <div class="icon-container"><img
            src="/content/images/assets/icons/tutorial.svg"
          >
          </div>
          <div class="text-container"><p>Tutoriales y tecnología</p><span>Conviértete en un experto de la equipación.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/guias-de-compra/"
        >
          <div class="icon-container"><img
            src="/content/images/assets/icons/shopping-guide.svg"
          >
          </div>
          <div class="text-container"><p>Guías de compra</p>
            <span>Todo lo que debes saber antes de decidirte.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/noticias/"
        >
          <div class="icon-container"><img
            src="/content/assets/icons/news.png"
          >
          </div>
          <div class="text-container"><p>Tendencias y novedades</p>
            <span>La evolución del mercado de motocicletas en Chile.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/planeta-motero/"
        >
          <div class="icon-container">
            <img src="/content/images/assets/icons/planet-biker.svg">
          </div>
          <div class="text-container"><p>Planeta motero</p><span>Adéntrate en el mundo de la moto.</span>
          </div>
        </a>
      </li>
      <li class="submenu-content">
        <a
          class="main-category"
          href="/moto-blog/videos/"
        >
          <div class="icon-container">
            <img
              src="/content/images/assets/icons/video.svg"
            >
          </div>
          <div class="text-container"><p>Nuestros vídeos</p>
            <span>Disfruta de nuestros mejores vídeos.</span>
          </div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
#blog-wrapper .categories-menu .icon-container img {
  height: 24px;
  width: 23px;
}

#blog-wrapper .categories-menu .main-category .icon-container {
  margin-right: 8px;
}

#blog-wrapper .categories-menu li {
  border-bottom: solid 1px #ddd;
  padding: 10px 0 8px;
}

#blog-wrapper .categories-menu li {
  padding: 15px 0 12px !important;
}

#blog-wrapper .categories-menu .main-category {
  display: flex;
}
#blog-wrapper .categories-menu .text-container {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 35px);
}

#blog-wrapper .categories-menu .text-container p {
  font-size: 17px;
  line-height: 14px;
  font-weight: 800;
  color: #373737;
  margin-bottom: 0;
  text-transform: uppercase;
  display: block;
}

#blog-wrapper .categories-menu .main-category .text-container p {
  color: #000;
  margin: 0;
}
#blog-wrapper .categories-menu .text-container span {
  font-size: 12px;
  color: #646464;
  display: block;
}
</style>
