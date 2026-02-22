<script setup>
import LoginRegisterRecoverForms from "@/views/pages/login/login-register-recover-forms.vue"

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})


const emit = defineEmits([
  'closed',
  'userLoggedIn',
  'update:isDialogVisible',
])

const isVisible = computed({
  get: () => props.isDialogVisible,
  set: (value) => {
    if (!value) emit('closed') // Keep your closed event if needed
    emit('update:isDialogVisible', value)
  }
})

const username = ref('')
const password = ref('')
const error = ref('')
const errors = ref('')
const isLoading = ref(false)
const config = useRuntimeConfig()

const isDialogVisible = ref(props.isDialogVisible)

watch(props,  props => {
  isDialogVisible.value = props.isDialogVisible
})

const showRegister = ref(false)

const onRegister = async () => {
  showRegister.value = true
}

const closeDialog = async () => {
  isDialogVisible.value = false
  emit("closed")
}

const onLoggedIn = data => {
  console.log("LoginDialog::onLoggedId")
  emit("userLoggedIn", data)
}
</script>

<template>
  <VDialog
    v-model="isVisible"
    max-width="700px"
  >
    <VCard>
      <VCardText>
        <LoginRegisterRecoverForms @on-logged-in="onLoggedIn" />
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.input__group input:not([type]):focus + label, .input__group input:not([type]):not(:placeholder-shown) + label, .input__group input[type=date]:not(.browser-default):focus + label, .input__group input[type=date]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=datetime-local]:not(.browser-default):focus + label, .input__group input[type=datetime-local]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=datetime]:not(.browser-default):focus + label, .input__group input[type=datetime]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=email]:not(.browser-default):focus + label, .input__group input[type=email]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=number]:not(.browser-default):focus + label, .input__group input[type=number]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=password]:not(.browser-default):focus + label, .input__group input[type=password]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=search]:not(.browser-default):focus + label, .input__group input[type=search]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=tel]:not(.browser-default):focus + label, .input__group input[type=tel]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=text]:not(.browser-default):focus + label, .input__group input[type=text]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=time]:not(.browser-default):focus + label, .input__group input[type=time]:not(.browser-default):not(:placeholder-shown) + label, .input__group input[type=url]:not(.browser-default):focus + label, .input__group input[type=url]:not(.browser-default):not(:placeholder-shown) + label, .input__group textarea:focus + label, .input__group textarea:not(:placeholder-shown) + label {
  font-size: 12px;
  left: 7px;
  padding: 0 5px;
  top: 1px;
  -webkit-transform: translate(0);
  transform: translate(0);
}
</style>
