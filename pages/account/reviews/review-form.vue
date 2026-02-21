<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    default: () => null,
  },
  invoiceId: {
    type: Number,
    default: () => 0,
  },
  productItemId: {
    type: Number,
    default: () => null
  },
})

const emit = defineEmits(["on-cancel"])

const title = ref('')
const opinion = ref('')
const youtubeUrl = ref('')
const termsAccepted = ref(false)
const rating = ref(0)
const images = ref([])
const isSubmitting = ref(false)


// --- Validation States ---
const productReviewError = ref(false)
const productFileReviewError = ref(false)
const termsError = ref(false)
const titleError = ref(false)
const opinionError = ref(false)



const triggerUpload = () => {
  const el = fileInput.value?.$el || fileInput.value
  const input = el?.querySelector('input')
  if (input) input.click()
}

const ratingLabels = ['Muy malo','Muy malo', 'Malo','Malo', 'Regular','Regular', 'Bueno','Bueno', '¡Excelente!', '¡Excelente!']

const fileInput = ref(null)

const onCancel = () => {
  emit("on-cancel")
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

    if(props.productItemId)
      formData.append('productItemId', props.productItemId)
    formData.append('productId', props.product.id)
    formData.append('invoiceId', props.invoiceId.toString())
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


</script>

<template>
  <div class="review-form">
    <div class="form-divider" />

    <VRow
      v-if="productReviewError"
      id="product-review-error"
    >
      <VCol>
        <div class="warning callout">
          <p><VIcon class="tabler-alert-square-rounded" size="md" />Por favor, puntúa algún producto haciendo click en las estrellas.</p>
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


    <!-- Star Rating -->
    <div class="rating-section mb-4">
      <label class="form-label">Tu puntuación</label>
      <div class="d-flex">
      <VRating
        v-model="rating"
        half-increments
        color="primary"
        hover
      />
      <span class="rating-label-text pt-1" v-if="rating"> {{ ratingLabels[rating * 2 - 1] }}</span>
      </div>
    </div>

    <!-- Title -->
    <div class="mb-4">
      <label class="form-label">Título de tu reseña</label>
      <input
        v-model="title"
        class="form-input"
        placeholder="Resume tu experiencia en una frase..."
        maxlength="80"
        :error="titleError"
      >
    </div>

    <!-- Body -->
    <div class="mb-5">
      <label class="form-label">Tu reseña</label>
      <textarea
        v-model="opinion"
        class="form-textarea"
        placeholder="¿Qué te pareció el producto? ¿Lo recomendarías?"
        rows="4"
        :error="opinionError"
        maxlength="600"
      />
      <div class="char-count">
        {{ (product.draftBody || '').length }}/600
      </div>
    </div>

    <div class="video-input-div mb-5">
      <label class="form-label" :for="`image-upload-${product.id}`">¿Te has animado a grabar un video? Déjanos el enlace a YouTube, Instagram o Tiktok aquí:</label>

      <AppTextField
        v-model="youtubeUrl"
        id="video-input"
        placeholder="https://www.youtube.com/watch?v=xxxxxxxxxx"
        prepend-inner-icon="tabler-brand-youtube"
        style="width:100%;"
      />
    </div>
    <div class="form-group mb-5">

      <label class="form-label" :for="`image-upload-${product.id}`">Añade tus imágenes a continuación</label>

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
              <div class="file-plus d-flex justify-content-center">
                <img
                  src="/content/images/new-image.png"
                  style="margin:auto"
                  alt="Add image"
                >
              </div>
            </div>
          </a>
        </VCol>
      </VRow>
    </div>

    <!-- Pros / Cons quick picks -->
    <div class="quick-tags mb-5">
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
    </div>
    <div class="d-none quick-tags mb-5">
      <div class="tags-col">
        <span class="tags-header pro">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
          Pros
        </span>
        <div class="tag-list">
          <button
            v-for="tag in proTags"
            :key="tag"
            class="tag-chip pro-chip"
            :class="{ selected: (product.selectedProTags || []).includes(tag) }"
            @click="toggleTag(product, 'selectedProTags', tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      <div class="tags-col">
        <span class="tags-header con">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M5 12l14 0" /></svg>
          Contras
        </span>
        <div class="tag-list">
          <button
            v-for="tag in conTags"
            :key="tag"
            class="tag-chip con-chip"
            :class="{ selected: (product.selectedConTags || []).includes(tag) }"
            @click="toggleTag(product, 'selectedConTags', tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <VBtn
        class="btn-cancel"
        rounded="0"
        color="secondary"
        variant="outlined"
        @click="onCancel"
      >
        Cancelar
      </VBtn>
      <VBtn
        prepend-icon="tabler-send"
        rounded="0"
        @click="sendProductReviews"
        >Publicar reseña</VBtn>

    </div>
  </div>
</template>


<style>
.video-input-div {
  position: relative;

  font-size: 16px
}

.file-plus img {
  width: 65px
}

.delete-file {
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


 .review-file-upload {
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
