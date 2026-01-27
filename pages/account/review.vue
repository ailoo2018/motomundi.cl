<script setup lang="ts">
// --- Refs for Form Data ---

definePageMeta({
  alias: '/cuenta/evaluaciones',
  layout: 'account',
  middleware: 'auth', // Must match the filename (auth.ts)
})

const title = ref('')
const opinion = ref('')
const youtubeUrl = ref('')
const termsAccepted = ref(false)
const rating = ref(0)
const isSubmitting = ref(false)

// --- Validation States ---
const productReviewError = ref(false)
const productFileReviewError = ref(false)
const termsError = ref(false)
const titleError = ref(false)
const opinionError = ref(false)

const route = useRoute()
const product = ref()
const images = ref([])
const productItemId = route.query.productItemId ? parseInt(route.query.productItemId as string) : null
const productId = route.query.productId ? parseInt(route.query.productId as string) : null
const invoiceId = parseInt(route.query.invoiceId as string)
const fileInput = ref(null)


const triggerUpload = () => {
  const el = fileInput.value?.$el || fileInput.value
  const input = el?.querySelector('input')
  if (input) input.click()
}

const handleFileChange = (event: any) => {
  const files = Array.from(event.target.files) as File[]
  productFileReviewError.value = false

  files.forEach(file => {
    // 2MB Limit Validation
    if (file.size > 2 * 1024 * 1024) {
      productFileReviewError.value = true
      return
    }

    if (images.value.length < 10) {
      images.value.push({
        file: file,
        url: URL.createObjectURL(file),
      })
    }
  })
  event.target.value = ''
}

const removeImage = (index: number) => {
  URL.revokeObjectURL(images.value[index].url)
  images.value.splice(index, 1)
}

const sendProductReviews = async () => {
  // Reset Errors
  productReviewError.value = false
  titleError.value = false
  opinionError.value = false
  termsError.value = false

  // Basic Validations
  if (rating.value === 0) {
    productReviewError.value = true
    return
  }

  if (!title.value.trim()) {
    titleError.value = true
    return
  }

  if (!opinion.value.trim()) {
    opinionError.value = true
    return
  }

  if (!termsAccepted.value) {
    termsError.value = true
    return
  }

  isSubmitting.value = true

  try {
    // We use FormData for file uploads
    const formData = new FormData()

    if(productItemId)
      formData.append('productItemId', productItemId)
    if(productId)
      formData.append('productId', productId)
    formData.append('invoiceId', invoiceId.toString())
    formData.append('rating', rating.value.toString())
    formData.append('title', title.value)
    formData.append('comment', opinion.value)
    formData.append('videoUrl', youtubeUrl.value)

    // Append images
    images.value.forEach((img, index) => {
      formData.append(`images`, img.file)
    })

    const response = await $fetch('/api/reviews/add', {
      method: 'POST',
      body: formData,
    })

    // Success Handling (e.g., redirect or show message)
    navigateTo('/account/reviews-success')
  } catch (e) {
    console.error("Submission failed", e)
    alert("Hubo un error al enviar tu reseña. Por favor intenta más tarde.")
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  if(productItemId) {
    product.value = await $fetch("/api/product/find-by-pit?id=" + productItemId)
  }else{
    product.value = await $fetch("/api/product/" + productId)
  }
})
</script>
<template>
  <div
    v-if="product"
    class="col s12 m9 l9 account__content service-rating"
  >
    <hr>
    <div
      id="product-review"
      style="padding-right: 40px;"
    >
      <VRow>
        <VCol>
          <h1>Valora los artículos que compraste</h1>
          <h3>Si a ti te ayudó, ¡también a los demás!</h3>
          <p>Danos tu opinión sobre los productos que adquiriste en $domain.Party.TradeName. Así todos nos beneficiaremos de una mayor información a la hora de comprarlos.</p>
        </VCol>
      </VRow>

      <VRow
        v-if="productReviewError"
        id="product-review-error"
      >
        <VCol>
          <div class="warning callout">
            <p><VIcon class="tabler-alert-square-rounded" size="sm" />Por favor, puntúa algún producto haciendo click en las estrellas.</p>
          </div>
        </VCol>
      </VRow>
      <VRow
        v-if="titleError"
        id="title-error"
      >
        <VCol>
          <div class="warning callout">
            <p><VIcon class="tabler-alert-square-rounded" />Por favor, ingresa un título para tu review.</p>
          </div>
        </VCol>
      </VRow>
      <VRow
        v-if="opinionError"
        id="opinion-error"
      >
        <VCol>
          <div class="warning callout">
            <p><VIcon class="tabler-alert-square-rounded" />Por favor, ingresa tu opinión sobre el producto.</p>
          </div>
        </VCol>
      </VRow>
      <VRow
        v-if="productFileReviewError"
        id="product-review-error-size"
        class="row ng-hide"
      >
        <VCol>
          <div class="warning callout">
            <p><VIcon class="tabler-alert-square-rounded" />Archivo muy grande El tamaño máximo permitido es de 2MB</p>
          </div>
        </VCol>
      </VRow>
      <VRow v-if="termsError" class="row">
        <VCol cols="12">
          <div class="warning callout">
            <p><VIcon class="tabler-alert-square-rounded" />Debes aceptar los términos y condiciones para continuar.</p>
          </div>
        </VCol>
      </VRow>

      <VRow>
        <VCol
          cols="2"
          sm="12"
          md="2"
        >
          <img
            :src="getImageUrl(product.image, 300, getDomainId())"
            :alt="product.fullName"
            style="width: 90px;"
          >
        </VCol>
        <VCol
          cols="10"
          lg="10"
          md="10"
          sm="12"
        >
          <h4>{{ product.fullName }}</h4>
          <div class="ratings">
            <VRating
              v-model="rating"
              half-increments
              hover
            />
          </div>

          <label for="review-title ">Título del review:</label>
          <VTextField
            v-model="title"
            id="review-title"
            placeholder="Eje: ¡Feliz con mi compra! o No cumplio las expectativas"
            style="width:100%;"
            name="review-title"
            type="text"
            :error="titleError"
            class="ng-pristine ng-untouched ng-valid ng-empty"
          />

          <label for="review-opinion">Opinión:</label>
          <VTextarea
            v-model="opinion"
            id="review-opinion"
            style="width: 100%;"
            ng-model="products[$product.Id].review"
            placeholder="Por favor, escribe aquí tu opinión sobre este producto."
            ng-init="products[$product.Id].review = &#39;&#39;"
            :error="opinionError"
            class="ng-pristine ng-untouched ng-valid ng-empty"
          />
          <label for="video-input">¿Te has animado a grabar un video? Déjanos el enlace a YouTube aquí:</label>
          <div class="video-input-div">
            <AppTextField
              v-model="youtubeUrl"
              id="video-input"
              placeholder="https://www.youtube.com/watch?v=xxxxxxxxxx"
              prepend-inner-icon="tabler-brand-youtube"
              style="width:100%;"
            />
          </div>
          <div class="form-group">
            <label :for="`image-upload-${product.id}`">Añade tus imágenes a continuación</label>

            <VFileInput
              ref="fileInput"
              class="image-upload d-none"
              accept="image/x-png,image/gif,image/jpeg"
              multiple
              @change="handleFileChange"
            />

            <VRow>
              <VCol
                v-for="(image, index) in images"
                :key="index"
                cols="3"
                sm="6"
                md="3"
                class="mr-5"
              >
                <a
                  class="delete-file"
                  @click="removeImage(index)"
                >
                  <VIcon
                    class="tabler-x"
                    size="sm"
                  />
                </a>

                <div
                  class="review-file-upload"
                  :style="{ backgroundImage: `url(${image.url})` }"
                />
              </VCol>

              <VCol
                v-if="images.length < 10"
                cols="3"
                sm="6"
                md="3"

              >
                <a
                  href="javascript:void(0);"
                  @click="triggerUpload"
                >
                  <div class="review-file-upload">
                    <div class="file-plus">
                      <img
                        src="/content/images/new-image.png"
                        alt="Add image"
                      >
                    </div>
                  </div>
                </a>
              </VCol>
            </VRow>
          </div>
        </VCol>
      </VRow>

      <VRow class="mb-10">
        <VCol
          cols="12"
          class="legal"
        >
          <VCheckbox
            v-model="termsAccepted"
            id="gdpr-legal-accept-products"
            type="checkbox"
            name="gdpr-legal-accept-products"
            ng-model="termsAccepted.productReview"
          >
            <template #label>
              <p>
                Autorizo a Motomundi SPA a publicar mis opiniones en su página web y cedo los derechos de las imágenes que adjunto a los únicos
                fines de complementar mis comentarios
                para ayudar a otros usuarios en su proceso de compra.
                <a>Más información</a>
              </p>
            </template>
          </VCheckbox>
        </VCol>
        <VCol cols="12">
          <VBtn
            :loading="isSubmitting"
            :disabled="isSubmitting"
            color="#41a334"
            rounded="0"
            @click="sendProductReviews"
          >
            Enviar
          </VBtn>
        </VCol>
      </VRow>
    </div>
  </div>
</template>
<style >


.service-rating label {
  margin-bottom: 0px;
  margin-top: 20px;
  font-weight: 700;
  color: #444;
  display: block;
}
.service-rating .video-input-div input {
  text-indent: 45px;
}

.icon-youtube-play:before {
  content: "\68";
}

.service-rating .video-input-icon {
  position: absolute;
  top: 6px;
  font-size: 27px;
  left: 10px;
}
.service-rating .video-input-div {
  position: relative;
  color: red;
  font-size: 16px;
}

.service-rating {
  min-height: 500px
}

.service-rating h1 {
  font-size: 2.1em;
  margin-bottom: 30px
}

.service-rating h1,.service-rating h3 {
  font-weight: 900;
  text-transform: uppercase
}

.service-rating h3 {
  color: #444;
  font-size: 17px;
  margin-bottom: 10px
}

.service-rating h4 {
  color: #444;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 800
}


.service-rating button {
  margin: 0 0 60px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0
}

.service-rating img {
  width: 100%;
  max-height: 150px;
  padding: 15px
}

.service-rating p {
  margin-bottom: 10px
}

.service-rating .mc-checkbox-label {
  font-weight: 300;
  font-style: italic;
  font-size: .9em
}

.service-rating .legal {
  margin-top: 30px
}

.service-rating .video-input-div {
  position: relative;
  color: red;
  font-size: 16px
}

.service-rating .video-input-div input {
  text-indent: 45px
}


.service-rating .review-file-upload {
  background-size: cover;
  background-position: 50%;
  position: relative;
  overflow: hidden;
  border: 1px solid #bdbdbd;
  height: 145px;
  width: 145px;
  text-align: center;
  border-radius: 3px;
  margin-bottom: 20px
}

.service-rating .image-upload {
  display: none
}

.service-rating .file-plus {
  font-size: 36px;
  margin-top: 30%;
  margin-left: 5%;
  display: block
}

.service-rating .file-plus img {
  width: 65px
}

.service-rating .delete-file {
  position: absolute;
  margin-top: -5px;
  margin-left: 115px;
  border: 1px solid #c74044;
  background-color: #c74044;
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  font-weight: 900;
  text-align: center;
  z-index: 60
}


.service-rating .checkbox-block {
  vertical-align: bottom
}

.service-rating-services-list {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-weight: 600
}

.service-rating-block {
  border-radius: 3px;
  background-color: #f8f8f8;
  margin-bottom: .2rem;
  padding: .8rem
}

.service-rating-block .col:first-child {
  text-transform: uppercase;
  color: #646464
}

.service-rating-block .ratings {
  float: right
}



.button {
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 1rem;
  padding: .85em 1em;
  -webkit-appearance: none;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: background-color .25s ease-out,color .25s ease-out;
  font-size: .9rem;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  background-color: #dfdfdf;
  color: #484848;
}
.button.plain-green {
  background-color: #41a334;
  border-color: #41a334;
  color: #fff;
}



.service-rating button.button span {
  float: unset;
  height: unset;
  padding: 0 0 0 0px;
  font: unset;

  /* text-align: center; */
  /* white-space: nowrap; */
  /* color: #fff; */
  /* text-transform: uppercase; */
}






.callout.warning {
  background-color: #ffe8b8;
  color: #7a5400;
}
.callout.warning {
  background-color: #fff3d9;
  color: #0a0a0a;
}
.callout {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding-top: .5rem;
  padding-bottom: .5rem;
}
.callout {
  border-radius: 3px;
  text-align: center;
}
.callout {
  position: relative;
  margin: 0 0 1rem;
  padding: 1rem;
  border: 0;
  border-radius: 0;
  background-color: #fff;
  color: #0a0a0a;
}
</style>
