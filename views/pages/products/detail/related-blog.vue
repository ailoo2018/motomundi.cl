<script setup lang="ts">

</script>

<template>
  <div class="related-blog-content">
    <h2>Lee la review en nuestro blog</h2>
    <a aaahref="/$linkHelper.GetBlogEntryUrl($relatedBlogContent.title.ToString())">
      <div class="related-blog-post"><img
        aasrc="${relatedBlogContent.previewImage}"
        alt="${relatedBlogContent.title}"
      >
        <div class="related-blog-post__content">
          <h3>$relatedBlogContent.title</h3>
          <small>$relatedBlogContent.createDate.ToString("dd/MM/yy HH:mm") · <strong>Reviews y
            pruebas</strong></small>
          <p>
            $relatedBlogContent.previewText
          </p>
          <span>Lee la review completa &nbsp;
                    <img
                      src="data:image/svg+xml,%3csvg%20height='11'%20viewBox='0%200%206%2011'%20width='6'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m98%208%205%205%205-5'%20fill='none'%20stroke='%23eb0012'%20stroke-linecap='round'%20stroke-linejoin='round'%20transform='matrix(0%20-1%201%200%20-7.5%20108.5)'/%3e%3c/svg%3e"
                      alt="Angle icon"
                    ></span>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">

.related-blog-content {
  margin-bottom: 50px;
}

.related-blog-content a {
  color: #000;
  font-size: 10px;
  font-weight: 500;
  line-height: 21px;
}

.related-blog-content .related-blog-post {
  border: 1px solid #d8d8d8;
}

.related-blog-content a img {
  vertical-align: -2px;
}

.related-blog-content .related-blog-post__content {
  padding: 25px;
}

.related-blog-content h3 {
  font-size: 24px;
  font-weight: 900;
  line-height: 25px;
  margin-top: 0;
  margin-block-end: 1em;
}

.related-blog-content p, .related-blog-content small {
  line-height: 21px;
  margin-bottom: 15px;
}

.related-blog-content small {
  color: #acacac;
  display: block;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
}

.related-blog-content p {
  font-size: 14px;
}

.related-blog-content a span {
  color: #123456;
  text-transform: uppercase;
}

@media only screen and (max-width: 600px) {
  .related-blog-content {
    margin-top: 50px;
  }
}

@media only screen and (max-width: 600px) {
  .related-blog-content h2 {
    font-size: 18px;
    margin-top: 0;
  }
}
</style>
