<script setup lang="ts">

</script>

<template>
  <div id="headermenu">
    <div class="headermenucontent d-flex justify-space-between">
      <div>
        <div class="hmnuentry"><i class="fa fa-phone"></i> <a href="tel:26660690"> (2)26660690</a></div>

        <div class="hmnuentry"><i class="fa fa-home"></i> <a href="https://www.motomundi.cl/tiendas">Tiendas y
          horarios</a></div>
        <div class="hmnuentry">
          <i class="fa fa-shopping-cart"></i> <a href="/cart">Carro de
          compra</a>
        </div>
        <div class="hmnuentry"><a href="https://www.motomundi.cl/10757-contactenos">Contáctenos</a></div>
        <div class="hmnuentry">
          <a href="/cuenta/perfil"> Su cuenta </a>
        </div>
      </div>
      <div id="community_links" class="d-flex gap-2 pt-2">
        <a href="https://www.youtube.com/MotoMundiTV" target="_blank" rel="noopener noreferrer"
           title="MotoMundi en YouTube">
          <VIcon icon="tabler-brand-youtube" size="24"  />
        </a>
        <a href="https://www.instagram.com/motomundi/" target="_blank" rel="noopener noreferrer"
           title="MotoMundi en Instagram">
          <VIcon icon="tabler-brand-instagram" size="24" />
        </a>
        <a href="https://www.facebook.com/motomundi.la" target="_blank" rel="noopener noreferrer"
           title="Facebook">
          <VIcon icon="tabler-brand-facebook" size="24" />
        </a>
        <a href="https://www.tiktok.com/@motomundicl" target="_blank" rel="noopener noreferrer"
           title="@motomundi en Twitter">
          <VIcon icon="tabler-brand-tiktok" size="24" />
        </a>
      </div>


    </div>
  </div>
</template>

<style scoped lang="scss">
#headermenu {
  width: 100%;
  top: 0px;
  height: 40px;
  font-size: 13px;
  color: rgb(217, 217, 217);
  background: rgb(38, 38, 38);
  border-bottom: 1px solid rgb(0, 0, 0);
}

#headermenu a {
  color: white;
}

#headermenu .headermenucontent {
  max-width: 1300px;
  width: 90%;
  margin: 0px auto;
}

#headermenu .headermenucontent .hmnuentry {
  float: left;
  margin-top: 0px;
  font-weight: 400;
  height: 18px;
  box-sizing: content-box;
  display: inline-block;
  border-color: rgb(1, 1, 1) rgb(1, 1, 1) rgb(79, 79, 79) rgb(79, 79, 79);
  border-style: solid;
  border-width: 0px 1px;
  padding: 10px 8px 8px;
}

#headermenu .headermenucontent .hmnuentry:first-child {
  border-left: 0px;
}
#community_links li {
  width: 30px;
}

#community_links {
  color: white;
}

</style>
