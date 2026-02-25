<script setup lang="ts">
import { ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

// Props & Emits
const emit = defineEmits(['cropped'])

// State
const fileInput = ref<HTMLInputElement | null>(null)
const isDialogOpen = ref(false)
const imageSrc = ref<string | null>(null)
const cropperRef = ref<any>(null)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    // Create a URL for the cropper to display
    imageSrc.value = URL.createObjectURL(file)
    isDialogOpen.value = true

    // Reset input so user can pick the same file again if they cancel/retry
    target.value = ''
  }
}

const saveCrop = () => {
  const { canvas } = cropperRef.value.getResult()
  if (canvas) {
    // Convert to Data URL (or .toBlob() if you need to upload to a server)
    const croppedImage = canvas.toDataURL()

    emit('cropped', croppedImage)
    closeDialog()
  }
}

const closeDialog = () => {
  isDialogOpen.value = false
  imageSrc.value = null
}
</script>

<template>
  <VDialog v-model="isDialogOpen" max-width="500">
    <VCard>
      <VCardTitle class="pa-4">Crop Your Image</VCardTitle>

      <VCardText class="pa-0 bg-grey-lighten-4">
        <div class="cropper-container">
          <Cropper
            ref="cropperRef"
            class="cropper"
            :src="imageSrc"
            :stencil-props="{ aspectRatio: 1/1 }"
          />
        </div>
      </VCardText>

      <VCardActions class="pa-4">
        <VSpacer />
        <VBtn variant="text" @click="closeDialog">Cancel</VBtn>
        <VBtn color="primary" @click="saveCrop">Apply Crop</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <div class="cropper-wrapper">
    <div class="edit-user-avatar">
      <div class="upload-image" @click="triggerUpload">
        <input
          ref="fileInput"
          type="file"
          name="file"
          accept="image/*"
          class="d-none"
          @change="handleFileChange"
        >
        <VIcon icon="tabler-upload" size="16"/>
      </div>
      <div class="delete-image">
        <VIcon icon="tabler-x" color="#fff" size="9" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cropper-container {
  height: 400px;
  width: 100%;
  overflow: hidden;
}

.cropper {
  height: 100%;
  background: #ddd;
}

.upload-image {
  cursor: pointer;
}
</style>
