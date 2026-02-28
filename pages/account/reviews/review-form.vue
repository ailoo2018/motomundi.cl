<script setup lang="ts">
import { extractYoutubeId } from "@core/utils/formatters";
import {IconAlertTriangle} from "@tabler/icons-vue";

const props = defineProps({
  product: { type: Object, default: () => null },
  invoiceId: { type: Number, default: 0 },
  productItemId: { type: Number, default: () => null },
})

const emit = defineEmits(["on-cancel", "on-rated"])

// Form States
const refForm = ref() // Reference to VForm
const title = ref('')
const opinion = ref('')
const youtubeUrl = ref('')
const termsAccepted = ref(false)
const rating = ref(0)
const images = ref([])
const isSubmitting = ref(false)
const youtubeThumbnail = ref('')
const error = ref()
const showErrorSnackbar = ref(false)
const isRatingError = ref(false)

// Validation Rules
const rules = {
  required: (v: any) => !!v || 'Este campo es obligatorio',
  rating: (v: number) => v > 0 || 'Por favor, selecciona una puntuación',
  terms: (v: boolean) => !!v || 'Debes aceptar los términos y condiciones',
}

// Watchers
watch(youtubeUrl, (val) => {
  const id = extractYoutubeId(val)
  youtubeThumbnail.value = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
})

// Logic
const ratingLabels = ['Muy malo', 'Muy malo', 'Malo', 'Malo', 'Regular', 'Regular', 'Bueno', 'Bueno', '¡Excelente!', '¡Excelente!']
const fileInput = ref(null)

const triggerUpload = () => {
  const el = fileInput.value?.$el || fileInput.value
  const input = el?.querySelector('input')
  if (input) input.click()
}

const handleFileChange = (event: any) => {
  const files = Array.from(event.target.files) as File[]

  files.forEach(file => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Archivo muy grande. Máximo 2MB.")
      return
    }
    if (images.value.length < 10) {
      images.value.push({ file, url: URL.createObjectURL(file) })
    }
  })
  event.target.value = ''
}

const removeImage = (index: number) => {
  URL.revokeObjectURL(images.value[index].url)
  images.value.splice(index, 1)
}

const sendProductReviews = async () => {
  // Execute Vuetify Validation
  const { valid, errors } = await refForm.value.validate()

  isRatingError.value = false
  if(!(rating.value > 0)){
    const el = document.getElementById("rating-label")

    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'})
      el.focus()
    }

    error.value = 'Por favor, selecciona una puntuación'
    showErrorSnackbar.value = true
    isRatingError.value = true
    return;
  }

  if (!valid) {
    const firstErrorId = errors[0]?.id
    const el = document.getElementById(firstErrorId)

    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'})
      el.focus()
    }

    error.value = "Error de validación: " + errors[0]?.errorMessages
    showErrorSnackbar.value = true
    return
  }


  if (!valid) return

  isSubmitting.value = true

  try {
    const formData = new FormData()
    if (props.productItemId) formData.append('productItemId', props.productItemId)
    formData.append('productId', props.product.id)
    formData.append('invoiceId', props.invoiceId.toString())
    formData.append('rating', rating.value.toString())
    formData.append('title', title.value)
    formData.append('comment', opinion.value)
    formData.append('videoUrl', youtubeUrl.value)

    images.value.forEach((img) => formData.append(`images`, img.file))

    await $fetch('/api/reviews/add', { method: 'POST', body: formData })

    emit("on-rated", { productId: props.product?.id, productItemId: props.productItemId })
  //  navigateTo('/account/reviews-success')
  } catch (e) {
    console.error("Submission failed", e)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="review-form">
    <VForm
      ref="refForm"
      validate-on="submit"
      @submit.prevent="sendProductReviews"
    >
      <div class="rating-section mb-6">
        <label id="rating-label" class="form-label d-block mb-1">Tu puntuación</label>
        <VRating
          v-model="rating"
          :rules="[rules.rating]"
          half-increments
          color="primary"
          hover
        />
        <div v-if="!(rating > 0) && isRatingError" class="text-error text-caption mt-1">
          {{ rules.rating(rating) }}
        </div>
        <span class="text-caption ms-2" v-if="rating > 0">
          {{ ratingLabels[Math.round(rating * 2) - 1] }}
      </span>
      </div>

      <AppTextField
        v-model="title"
        label="Título de tu reseña"
        placeholder="Resume tu experiencia..."
        persistent-placeholder
        :rules="[rules.required]"
        counter="80"
        maxlength="80"
        class="mb-4"
      />

      <AppTextarea
        v-model="opinion"
        label="Tu reseña"
        placeholder="¿Qué te pareció el producto?"
        persistent-placeholder
        :rules="[rules.required]"
        counter="600"
        maxlength="600"
        rows="4"
        class="mb-4"
      />

      <AppTextField
        v-model="youtubeUrl"
        label="¿Video de YouTube/Instagram?"
        placeholder="https://..."
        prepend-inner-icon="tabler-brand-youtube"
        class="mb-4"
      />

      <!-- YouTube Thumbnail Preview -->
      <div v-if="youtubeThumbnail" class="youtube-thumbnail-preview mt-3 mb-3">
        <div class="thumbnail-wrapper">
          <img
            :src="youtubeThumbnail"
            alt="Vista previa del video"
            class="thumbnail-img"
          />
          <div class="thumbnail-play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48" width="68" height="48">
              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/>
              <path d="M45 24 27 14v20" fill="#fff"/>
            </svg>
          </div>
        </div>
        <p class="thumbnail-caption">Vista previa del video</p>
      </div>


      <div class="mb-6">
        <label class="form-label">Imágenes (Máx 10)</label>
        <VFileInput
          ref="fileInput"
          class="d-none"
          accept="image/*"
          multiple
          @change="handleFileChange"
        />
        <VRow class="mt-2">
          <VCol cols="6" md="3" v-for="(img, i) in images" :key="i" class="position-relative">
            <VBtn
              icon="tabler-x"
              size="x-small"
              color="error"
              class="delete-btn"
              @click="removeImage(i)"
            />
            <VImg :src="img.url" cover aspect-ratio="1" class="rounded border" />
          </VCol>
          <VCol v-if="images.length < 10" cols="6" md="3">
            <div class="upload-placeholder" @click="triggerUpload">
              <VIcon icon="tabler-camera-plus" size="32" />
            </div>
          </VCol>
        </VRow>
      </div>

      <VCheckbox
        v-model="termsAccepted"
        :rules="[rules.terms]"
        class="mb-6"
      >
        <template #label>
          <span class="text-body-2">
            Autorizo a Motomundi SPA a publicar mis opiniones y cedo derechos de imagen...
          </span>
        </template>
      </VCheckbox>

      <div class="d-flex gap-4">
        <VBtn variant="outlined" color="secondary" @click="emit('on-cancel')">
          Cancelar
        </VBtn>
        <VBtn
          type="submit"
          color="primary"
          :loading="isSubmitting"
        >
          Publicar reseña
        </VBtn>
      </div>
    </VForm>
  </div>

  <!-- Error snackbar -->
  <VSnackbar
    v-model="error"
    color="error"
    location="bottom right"
    :timeout="5000"
    rounded="lg"
  >
    <div class="d-flex align-center gap-2">
      <IconAlertTriangle :size="20" />
      <span><strong></strong> {{error}}</span>
    </div>
  </VSnackbar>
</template>

<style scoped>
.upload-placeholder {
  border: 2px dashed #ddd;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
}
.delete-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 10;
}
</style>
