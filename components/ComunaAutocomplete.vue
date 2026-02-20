<script setup>
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

// Props and emits
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'Comuna',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
  },
  showLabel: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue'])
const isMenuOpen = ref(false)

console.log("Props ComunaAutocomplete: ", props)

// State
const selectedValue = ref(props.modelValue)
const searchInput = ref('')
const items = ref([])
const isLoading = ref(false)
const config = useRuntimeConfig()

// Watch for v-model changes
watch(selectedValue, newValue => {
  emit('update:modelValue', newValue)
})

watch(props, newValue => {
  selectedValue.value = newValue.modelValue
})




// Mock API call - replace with your actual API
const searchAPI = async term => {
  const baseUrl = config.public.geoBaseUrl
  var response = await fetch(baseUrl + '/comunas/search?a=1&sword=' + term, {
    method: 'POST',
  })

  const data = await response.json()

  return data
}

// Debounced search function
const performSearch = useDebounceFn(async term => {
  if (!term) {
    items.value = []

    return
  }

  isLoading.value = true
  try {
    const results = await searchAPI(term)

    items.value = results
    if (results.length > 0 ) {
      if(selectedValue.value && results.length === 1 ) {
        if(searchInput.value !== results[0].name) {
          isMenuOpen.value = true
        }
      }else {
        isMenuOpen.value = true
      }
    }
  } catch (error) {
    console.error('Search failed:', error)
    items.value = []
  } finally {
    isLoading.value = false
  }
}, 300)

// Watch search input
watch(searchInput, newValue => {

  if (newValue && newValue.length > 0 && selectedValue.value && newValue !== selectedValue.value.name) {
    selectedValue.value = null
  }
  performSearch(newValue)
})
</script>
<template>
  <div>

    <VLabel
      v-if="label && showLabel"
      :for="elementId"
      class="mb-1 text-body-2 text-wrap"
      style="line-height: 15px;"
      :text="label"
    />

    <VAutocomplete
      v-model="selectedValue"
      v-model:menu="isMenuOpen"
      v-model:search="searchInput"
      :items="items"
      :loading="isLoading"
      item-title="name"
      item-value="id"
      :rules="rules"
      :variant="variant"
      label="Comuna"
      placeholder="Buscar comuna..."
      rouned="0"
      hide-no-data
      hide-selected
      return-object
      no-filter
    >
      <template #prepend-item>
        <VListItem v-if="isLoading">
          <template #prepend>
            <VProgressCircular
              indeterminate
              size="12"
            />
          </template>
          <VListItemTitle>
            Buscando comuna...
          </VListItemTitle>
        </VListItem>
      </template>
    </VAutocomplete>
  </div>
</template>

