<script setup lang="ts">

</script>

<template>
  <VCard
    variant="plain"
    elevation="0"
    color="surface"
    class="mt-5 mb-10"
  >
    <VCardText class="pa-0">
      <h3>Acciones</h3>
      <div class="">
        <VBtn
          rounded="0"
          color="#000"
          @click="startReturn"
        >
          CAMBIO O DEVOLUCIÓN
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped lang="scss">
h3 {
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 700;
  margin: 4px 0 16px;
  padding-bottom: 8px;
  text-transform: uppercase;
}

</style>
