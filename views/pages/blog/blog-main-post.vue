<script setup>

const post = ref({
  id: 121743,
  url: "/moto-blog/honda-xr190l-a-prueba-la-ruta-off-road-que-sorprendio-a-javier",
  image: "32373d2783dc48c0846100bc929f5554.png",
  imageUrl: "https://cdn.motomundi.cl/Content/uploads/1/_data/3/23/32373d2783dc48c0846100bc929f5554.png",
  title: "Honda XR190L a prueba: la ruta off-road que sorprendió a Javier",
})
</script>

<template>
  <div class="main-post-container">
    <div class="main-post">
      <NuxtLink :to="post.url">
        <div
          class="comparison type-comparison status-publish has-post-thumbnail hentry "
          role="article"
        >
          <VImg
            src="https://cdn.motomundi.cl/Content/uploads/1/_data/3/23/32373d2783dc48c0846100bc929f5554.png"
            class="image"
            cover
          />

        </div>
      </NuxtLink>
      <div class="title-container">
        <NuxtLink :to="post.url">
          <!--
            <img src="/Content/images/assets/icons/comparison-w.svg"
            class="lazyloaded" data-ll-status="loaded"> 
          -->
          <h1 class="page-title">{{post.title}}</h1>
        </NuxtLink>
        <p class="posts-date-category white">
          27 octubre, 2025 ●
          <span>
            <NuxtLink
              class="parent-category"
              :to="post.url"
            >
              Comparativas y rankings
            </NuxtLink>
            <NuxtLink
              class="child-category"
              :to="post.url"
            >
              <span class="category-slash"> &gt; </span>
              Guantes
            </NuxtLink>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<style>

#blog-wrapper .slider-featured-posts-container .slider-home {
  margin: 0 -18px;
  max-height: 290px;
  overflow: hidden;
}

#blog-wrapper .main-post {
  height: 420px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
}

#blog-wrapper .main-post .image {
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
}

#blog-wrapper .main-post .title-container {
  position: absolute;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 20%, black 100%);
  padding: 20px 20px 95px;
  width: 100%;
  font-weight: bold;
  bottom: 0;
  left: 0;
}

#blog-wrapper .main-post .title-container a {
  color: #FFF;
}

#blog-wrapper .main-post .posts-date-category {
  font-size: 12px;
  color: #989898;
}

#blog-wrapper .page-title {
  margin: 20px 0 0;
  line-height: 34px;
}



#blog-wrapper .main-post .title-container h1 {
  margin: 0 auto;
  max-width: 70%;
}

#blog-wrapper .main-post .title-container h1 {
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 0;
}

#blog-wrapper .main-post .posts-date-category.white a {
  color: #FFF;
}

.white {
  color: #fff
}

</style>

