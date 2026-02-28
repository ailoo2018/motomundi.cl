<script setup lang="ts">
import Widget from "@/views/pages/home/widget.vue";
import BlogArticleProducts from "@/views/pages/blog/blog-article-products.vue";
import BlogBreadcrumbs from "@/views/pages/blog/blog-breadcrumbs.vue";
import BlogArticleShare from "@/views/pages/blog/blog-article-share.vue";

const props = defineProps({ id: { type: Number } })

const showMessage = ref(false)
const title = ref({ name: "", description: "" })

useSeoMeta({
  title: () =>  title.value?.name || 'Loading Product...',
  ogTitle: () => title.value?.name,
  description: () => title.value?.description,
  ogDescription: () => title.value?.description,
})


const { data: entry } = await useFetch(`/api/blog/articles/${props.id}`,
  {
    key: "blog-article-" + props.id,
  })

if(entry.value){
  title.value.name = entry.value.name
  if(entry.value?.configuration && entry.value?.configuration["preview-text"]){
    title.value.description = entry.value?.configuration["preview-text"]
  }
}

function extractVideoID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  
  return (match && match[7].length === 11) ? match[7] : null
}

const youtubeVideo = computed(() => {
  if(entry.value && entry.value.configuration && entry.value.configuration["youtube-video"]){
    return "https://www.youtube.com/embed/" + extractVideoID( entry.value.configuration["youtube-video"] )
  }
  
  return null
})

const previewText = computed( () => {
  if(entry.value && entry.value.config && entry.value.configuration["preview-text"]) {
    return entry.value.config["preview-text"]
  }
  
  return ""
})

const previewImage = computed( () => {
  if(entry.value && entry.value.configuration && entry.value.configuration["preview-image"]) {
    return getBaseCDN() + entry.value.configuration["preview-image"]
  }
  
  return ""
})

const savingComment = ref(false)

const commentForm = ref({

})
const ret = ref({ products: [] })
</script>

<template>
  <div>
    <BlogBreadcrumbs />

    <article>

      <header class="article-header">
        <h1
          class="entry-title single-title"
          itemprop="headline"
        >
           {{ entry.name }}
        </h1>
        <div class="entry-date-category-share">
          <p class="posts-date-category single">
            <img
              src="/content/images/assets/icons/planet-biker-g.svg"
              class="lazyloaded"
              data-ll-status="loaded"
            >
            <a
              class="parent-category"
              href="/moto-blog/planeta-motero/"
            >
              Planeta motero </a>
            <span class="date">
              <span class="bull">●</span> {{ entry.createDate }}
            </span>
          </p>
          <BlogArticleShare :entry="entry" />

        </div>
      </header>
      <div class="post-content-container">
        <main
          id="main"
          role="main"
        >
          <div
            :id="`post-${entry.id}`"
            class="post-36197 planet-biker type-planet-biker status-publish has-post-thumbnail hentry category-rutas"
            role="article"
          >
            <section
              class="entry-content"
              itemprop="articleBody"
            >
              <div
                v-if="youtubeVideo"
                class="youtube-video-container"
              >
                <iframe
                  loading="lazy"
                  class="youtube-video lazyloaded"
                  :src="youtubeVideo"
                  allowfullscreen=""
                />
              </div>

              <div
                v-else
                class="featured-image"
              >
                <img
                  class="attachment-full size-full wp-post-image "
                  :src="previewImage"
                  data-ll-status="loaded"
                >
              </div>


                <Widget
                  v-for="widget in entry.widgets"
                  :key="widget.id"
                  :widget="widget"
                />


            </section>
          </div>
        </main>
      </div>
    </article>

    <BlogArticleProducts :article="entry" />


    <div
      id="comments"
      class="comments-area ng-cloak"
      ng-controller="BlogCommentsCtrl"
      ng-init="commentForm.postId= $page.Id"
    >
      <span
        id="comment-post-id"
        data-post-id="$page.Id"
      />

      <div
        class="message-box-container"
        v-if="showMessage"
        :class="{'show': showMessage}"
      >
        <div class="message-box">
          ¡Gracias por su comentario! Será publicado en breve.
        </div>
      </div>


      <div class="comments-title">
        <img
          class="image"
          src="/content/images/assets/icons/comments.svg"
          data-lazy-src="/content/images/assets/icons/comments.svg"
        >
        <noscript><img class="image"
          src="/content/images/assets/icons/comments.svg"
          >
        </noscript>
        <span>Comentarios</span>
      </div>
      <div
        id="respond"
        class="comment-respond"
      >
        <p
          id="reply-title"
          class="comment-reply-title"
        >
          Deja un comentario
          <small>
            <a
              id="cancel-comment-reply-link"
              rel="nofollow"
              href="#respond"
              style="display:none;"
            >Cancelar
              respuesta</a>
          </small>
        </p>
        <form
          name="myForm"
          ng-submit="sendComment();"
          class="comment-form"
          novalidate
        >

          <div class="small-12 textarea-container">
            <VTextarea
              id="comment"
              name="comment"
              v-model="commentForm.comment"
              placeholder="Deja un comentario*"
              required="required"
            />

            <div
              class="error"
              ng-show="myForm.comment.$error.required  && myForm.comment.$touched"
            >
              Escribe un mensaje por favor.
            </div>
          </div>
          <input
            name="wpml_language_code"
            type="hidden"
            value="es"
          >
          <div class="row">
            <div class="comment-form-author large-12 columns">
              <input
                id="author"
                name="author"
                ng-model="commentForm.author"
                type="text"
                value=""
                maxlength="245"
                required="required"
                placeholder="Nombre*"
              >

              <div
                class="error"
                ng-show="myForm.author.$error.required && myForm.author.$touched"
              >
                Escribe tu nombre por favor.
              </div>
            </div>
          </div>
          <div class="row">
            <div class="comment-form-email large-12 columns">
              <input
                id="email"
                ng-model="commentForm.email"
                type="email"
                name="email"
                value=""
                maxlength="100"
                required="required"
                placeholder="Correo electrónico*"
              >

              <div
                class="error"
                ng-show="myForm.email.$error.required && myForm.email.$touched"
              >
                Escribe un email válido por favor.
              </div>
            </div>
          </div>
          <p class="comment-notes">
            <span id="email-notes">Tu dirección de correo electrónico no será publicada.</span>
            Los campos obligatorios están marcados con <span class="required">*</span>
          </p>
          <div class="gdpr-legal-comment">
            <VCheckbox
              id="gdpr-legal-accept-blog-comment"
              type="checkbox"
              v-model="commentForm.accept"
              name="gdpr-legal-accept"
              class="mc-checkbox"
              required="required"
            />
            <label
              class="mc-checkbox-label sidebar-gdrp gdrp-comments"
              for="gdpr-legal-accept-blog-comment"
            > <span class="checkbox-block" />Autorizo a MOTOMUNDI SPA a
              publicar mis opiniones en su página web para ayudar a otros usuarios en
              su proceso de compra.<a gdpr-more-info=""> Más información</a>
              <div class="error-gdpr hidden">
                Debes aceptar las condiciones antes de continuar
              </div>
            </label>
          </div>
          <p class="form-submit">
            <VBtn
              :disabled="false"
              :loading="savingComment"
            >
              Enviar

            </VBtn>
          </p>
        </form>
      </div>
      <CommentTree
        comments="comments"
        depth="1"
      />
    </div>
  </div>
</template>
<style >

#blog-wrapper .entry-content p {
  margin: 20px 0px;
}
#blog-wrapper .entry-content  p {
  color: #000;
}
#blog-wrapper .entry-content  p {
  padding: 0 25px;
  font-size: 15px;
  line-height: 1.8;
}

#blog-wrapper  .comment-reply-title {
  padding: 0;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  text-transform: uppercase;
  justify-content: space-between;
}
</style>

