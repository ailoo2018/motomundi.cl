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
})

const emit = defineEmits(['update:modelValue'])

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
  } catch (error) {
    console.error('Search failed:', error)
    items.value = []
  } finally {
    isLoading.value = false
  }
}, 300)

// Watch search input
watch(searchInput, newValue => {
  performSearch(newValue)
})
</script>
<template>
  <div>
    <VAutocomplete
      v-model="selectedValue"
      v-model:search="searchInput"
      :items="items"

      :loading="isLoading"
      item-title="name"
      item-value="id"
      :rules="rules"
      label="Comuna"
      variant="filled"
      placeholder="Buscar comuna..."
      hide-no-data
      hide-selected
      return-object
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

