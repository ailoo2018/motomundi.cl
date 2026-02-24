<script setup lang="ts">

</script>

<template>
  <div class="account__content-block account__delete">
    <div class="account__content-block-header">
      <h2>
        Eliminar cuenta
      </h2>
    </div>
    <p>
      Esto eliminará todos tus datos personales, incluida la cuenta y los pedidos
      vinculados.
    </p>
    <div>
      <div class="delete-account-wrapper mt-4">
        <VBtn rounded="0" color="#000" class="button button-outline button--tiny">
          Eliminar cuenta
        </VBtn>
      </div>
      <div
        class="modal-wrapper delete-account-modal"
        style="display: none;"
      >
        <div class="modal-backdrop" />
        <div
          role="dialog"
          class="modal"
        >
          <div class="modal__close-cont">
            <button class="modal__close">
              <svg
                width="9"
                height="9"
                xmlns="http://www.w3.org/2000/svg"
                class="icon sprite-line-icons"
              >
                <use
                  href="/content/svg/motomundi.svg#i-icon-cross"
                  xlink:href="/content/svg/motomundi.svg#i-icon-cross"
                />
              </svg>
            </button>
          </div>
          <header class="modal-header">
            <div>
              <h1>
                ¿Seguro que quieres eliminar tu                cuenta?
              </h1>
            </div>
          </header>
          <section class="modal-body">
            <div class="container">
              <p>
                <strong>Esto eliminará todos tus datos personales, incluida la
                  cuenta y los pedidos vinculados.</strong>
              </p>
              <p>
                Si haces click en 'Eliminar cuenta' tu cuenta será
                eliminada, a no ser que vuelvas a iniciar sesión antes de 30 días.
              </p>
              <div class="buttons mt-4">
                <VBtn>
                  Cancelar
                </VBtn>
                <VBtn color="#000">
                  Eliminar cuenta
                </VBtn>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account__content-block .account__content-block-header h2 {
  font-size: 18px;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
  text-align: left;
}
.account__content-block .account__content-block-header h2 {
  font-size: 15px;
  font-weight: 700;
}
</style>
