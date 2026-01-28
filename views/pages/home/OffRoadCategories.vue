<script setup lang="ts">

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <div id="home-block-2" class="block-container">
    <div class="custom-block" block-id="1055"
         section="offroad"
         style="background-image: url('/content/assets/images/cat_offroad.jpg');background-repeat: repeat;background-size:unset;"
         content="">

      <div>
        <section class="offroad-categories" style="background: transparent;">
          <div class="offroad-categories__container container px-6">
            <a href="/cascos-motocross" class="offroad-categories__item">
              <img src="/content/assets/images/offroad/offroad-cascos.svg" alt="Cascos">
              <small>Cascos</small></a>
            <a href="/protecciones-mx-para-moto" class="offroad-categories__item">
              <img src="/content/assets/images/offroad/offroad-protecciones.svg"
                   alt="Protecciones">
              <small>Protecciones</small></a>
            <a href="/botas-mx-enduro-para-moto" class="offroad-categories__item">
              <img src="/content/assets/images/offroad/offroad-botas.svg" alt="Botas">
              <small>Botas</small></a>
            <a href="/jerseys-para-moto"
               class="offroad-categories__item">
              <img src="/content/assets/images/offroad/offroad-camisetas.svg"
                   alt="Camisetas">
              <small>Camisetas</small></a>
            <a href="/Pantalones-para-moto" class="offroad-categories__item">
              <img src="/content/assets/images/offroad/offroad-pantalones.svg"
                   alt="Pantalones">
              <small>Pantalones</small></a>
            <a href="/guantes-offroad-para-moto" class="offroad-categories__item">
              <img src="/content/assets/images/offroad/offroad-guantes.svg" alt="Guantes">
              <small>Guantes</small></a>
          </div>
        </section>
      </div>
    </div>
  </div>


</template>

<style scoped lang="scss">

.offroad-categories {
  background: #fff;
}

.offroad-categories__container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  padding: 96px 0;
}

.offroad-categories__item {
  display: block;
  box-sizing: border-box;
  background: #f7d9c1;
  padding: 40px 5px;
  width: 100%;
  text-align: center;
}

.offroad-categories__item img {
  display: block;
  width: auto;
  height: 58px;
  margin: 0 auto 15px auto;
}

.offroad-categories__item small {
  font-size: 12px;
  font-weight: 900;
  display: block;
  text-align: center;
  text-transform: uppercase;
  color: #795536;
}

.offroad-categories__item:hover {
  background-size: 110% auto;
}

.offroad-categories__item strong {
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
}

@media only screen and (max-width: 600px) {
  .offroad-categories__container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .offroad-categories__item strong {
    font-size: 28px;
  }
}</style>
