<script setup>
import BlogNavigation from "@/layouts/blog/blog-navigation.vue"
import BlogFollowUsContainer from "@/layouts/blog/blog-follow-us-container.vue"

const ret = ref({ products: null })

const mostViewed= ref([])

const { data: featured } = await useFetch("/api/blog/featured-posts?limit=4", {
  key: "blog-featured-4",
})
</script>

<template>
  <div class="right-content">
    <div class="menu-newsletter-conteiner">
      <BlogNavigation />
      <BlogFollowUsContainer />

    </div>


<!--
    <div
      v-if="false"
      class="recommended-most-viewed-container single-post"
    >
      <div class="related-products sidebar-block">
        <div class="header">
          <p class="sidebar-title">
            Productos relacionados de Motomundi.cl
          </p>
        </div>
        <div class="related-products-lists">
          <div
            v-if="ret.products"
            class="product"
          >
            <a href="/$linkHelper.GetUrl($p)">
              <div class="image"><img
                aasrc="$imageHelper.GetUrl($p, 300)"
                class="lazyloaded"
                data-ll-status="loaded"
              >
              </div>
              <div class="product-details">
                #if($p.HasDiscount)
                <div class="discount">Oferta ${p.TotalDiscountPercent}%</div>
                #end
                <div class="name">$p.brand $p.product</div>
                <div class="star-rating"><i class="blog-icon-star" /><i class="blog-icon-star" /><i class="blog-icon-star" /><i class="blog-icon-star" /><i class="blog-icon-star" />
                </div>
                <div class="price">$formatHelper.FormatMoney( $p.Price.FinalPrice )</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="recommended-most-viewed-container">
      <div class="recommended-posts mini-posts-container sidebar-block">
        <p class="sidebar-title">
          Te recomendamos
        </p>
        <div class="posts">
          <div
            v-for="r in entries"
            class="post-container"
          >
            <a href="$r.friendlyUrl">
              <div class="image-container">
                <div
                  class="image rocket-lazyload lazyloaded"
                  style="background-image: url(&quot;https://www.motomundi.cl$r.previewImage&quot;);"
                  data-ll-status="loaded"
                />
              </div>
              <div class="text-container">
                <div class="title">{{ r.title }}</div>
                <div class="date">{{ r.createDate }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="recommended-posts mini-posts-container sidebar-block">
        <p class="sidebar-title">
          Los más leídos
        </p>
        <div class="posts">
          <div
            v-for="r in mostViewed"
            class="post-container"
          >
            <a href="/$linkHelper.GetUrl($r)">
              <div class="image-container">
                <div
                  class="image rocket-lazyload lazyloaded"
                  style="background-image: url(&quot;https://www.motomundi.cl$r.Value('preview-image')&quot;);"
                  data-ll-status="loaded"
                />
              </div>
              <div class="text-container">
                <div class="title">$r.Name</div>
                <div class="date">$!r.CreateDate.ToString("dd/MM/yyyy")</div>
              </div>
            </a>
          </div>
          #end
        </div>
      </div>
      <div class="social-media-container">
        <div class="social-media-sidebar sidebar-block">
          <p class="sidebar-title">
            Social media
          </p>
          <div class="social-media-content">
            <a
              href="https://www.youtube.com/user/motomunditv?sub_confirmation=1 "
              target="_blank"
            >
              <img
                class="large lazyloaded"
                src="/content/images/assets/img/blog-social-yt.png"
                data-ll-status="loaded"
              >
            </a> <a
              href="https://www.youtube.com/user/motomunditv?sub_confirmation=1 "
              target="_blank"
            >
              <img
                class="small"
                src="/content/images/assets/img/blog-social-yt-mobile.png"
                data-lazy-src="/content/images/assets/img/blog-social-yt-mobile.png"
              >
            </a> <a
              href="https://www.facebook.com/motomundi.la"
              target="_blank"
            >
              <img
                class="large lazyloaded"
                src="/content/images/assets/img/blog-social-fb.png"
                data-ll-status="loaded"
              >
            </a> <a
              href="https://www.facebook.com/motomundi.la"
              target="_blank"
            >
              <img
                class="small"
                src="/content/images/assets/img/blog-social-fb-mobile.png"
                data-lazy-src="/content/images/assets/img/blog-social-fb-mobile.png"
              >
            </a> <a
              href="https://twitter.com/motomundi"
              target="_blank"
            ><img
              class="large lazyloaded"
              src="/content/images/assets/img/blog-social-tw.png"
              data-ll-status="loaded"
            >
            </a> <a
              href="https://twitter.com/motomundi"
              target="_blank"
            >
              <img
                class="small"
                src="/content/images/assets/img/blog-social-tw-mobile.png"
                data-lazy-src="/content/images/assets/img/blog-social-tw-mobile.png"
              >
            </a>
            <a
              href="https://www.instagram.com/motomundi/"
              target="_blank"
            >
              <img
                class="large"
                src="/content/images/assets/img/blog-social-ig.png"
                data-lazy-src="/content/images/assets/img/blog-social-ig.png"
              >

            </a> <a
              href="https://www.instagram.com/motocardstore/"
              target="_blank"
            ><img
              style="margin-top: 5px;"
              class="small"
              src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E"
              data-lazy-src="/content/images/assets/img/blog-social-ig-mobile.png"
            >

            </a>
          </div>
        </div>
      </div>
    </div>
-->
  </div>
</template>
<style>
#blog-wrapper, #blog-wrapper * {
  box-sizing: border-box;
}


#blog-wrapper .right-content {
  width: 30%;
  float: right;
  padding-right: 33px;
}

#blog-wrapper .archive .right-content, #blog-wrapper .post-content .right-content, #blog-wrapper.paged .right-content {
  margin-top: 10px;
}
</style>

