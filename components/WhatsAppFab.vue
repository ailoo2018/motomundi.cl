<script setup lang="ts">

</script>

<template>
  <a style="z-index: 1000;" href="https://api.whatsapp.com/send?phone=15558366927&amp;text=¡Hola!" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
    <VIcon class="tabler-brand-whatsapp" size="md"></VIcon>
  </a>
</template>

<style>
.whatsapp-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.3s;
}

.whatsapp-fab:hover {
  background-color: #128C7E;
}

a.whatsapp-fab:hover{
  color: white;
}
a.whatsapp-fab:visited{
  color: white;
}

.whatsapp-fab svg {
  width: 32px;
  height: 32px;
}
</style>
