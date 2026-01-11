<script setup lang="ts">
const props = defineProps({

  isDesktop: {
    type: Boolean,
  },

})

//const loading = ref(false)

const emit = defineEmits(['next', 'prev'])
const isDesktop = props.isDesktop
const checkoutService = inject("checkoutService")
const currentStep = checkoutService.currentStep
const error = checkoutService.error
const loading = checkoutService.loading

const next = () => {
  console.log('SetpActions::next')
  checkoutService.next()

  //emit('next')
}

const prev = () => {
  checkoutService.prev()

  // emit('prev')
}
</script>

<template>
  <div
    class="actions-button "
    :class="{ 'steps__actions-button-desktop' : isDesktop}"
  >
    <div
      v-if="error"
      class="steps__errors"
    >
      {{ error }}
    </div>


    <div class="step__actions form-actions">
      <button
        v-if="currentStep > 1"
        class="button button--outline actions__back"
        @click="prev"
      >
        <span>Atrás</span>
      </button>
      <button
        type="submit"
        class="button actions__continue"
        :disabled="loading"
        @click="next"
      >
        <span>
          <span v-if="currentStep != 3">Continuar</span>
          <span v-if="currentStep == 3 && !loading">Pagar</span>
          <div
            v-if="currentStep == 3 && loading"
            class="spinner-container mc-spinner button-mode"
            style=""
          >
            <span
              class="message"
              style="display: none;"
            />
          </div>


          <svg
            v-if="!loading"
            width="13"
            height="13"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            class="icon sprite-line-icons"
          >
            <title>Continuar | Pagar</title>
            <use
              href="/svg/ailoo.svg#i-icon-arrow-right"
              xlink:href="/svg/ailoo.svg#i-icon-arrow-right"
            /></svg>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.button:disabled {
  cursor: not-allowed;
  opacity: .4;
}


.form-actions {
  margin: 0;

}


.actions-button .steps__errors {
  color: #f44a4a;
  font-size: 14px;
  line-height: 1.1em;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .form-actions {
    padding: 0;
  }
}


@media only screen and (min-width: 601px) {
  .actions-button .steps__errors {
    padding: 8px 15px;
  }
}
</style>
