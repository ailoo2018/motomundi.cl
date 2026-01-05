<script setup lang="ts">
const props = defineProps({
  widget: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div id="home-block-{{widget.id}}" class="block-container" ng-non-bindable="">
    <div :block-id="widget.id" block-name="Categorias MOTO" section="home" class="promo-categories__container" style="background-color: rgb(239, 239, 239); background-image: url(&quot;&quot;);">
      <div class="container">

        <div class="col s12 m12 l12">
          <div class="promo-categories__header">
            <div class="promo-categories__countdown"></div>
          </div>
          <div class="promo-categories">
            <a href="/cascos-para-moto" data-dr="true" class="mtc-link" style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;">
              <img src="/content/images/categories/rebajas-cascos.svg" alt="Cascos">
              <h2 style="color:#fff;">Cascos</h2>
            </a>
            <a href="/chaquetas-para-moto" data-dr="true" class="mtc-link" style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;"><img src="/content/images/categories/rebajas-chaquetas.svg" alt="Chaquetas">
              <h2 style="color:#fff;">Chaquetas</h2></a>
            <a href="/guantes-para-moto" data-dr="true" class="mtc-link" style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;">
              <img src="/content/images/categories/rebajas-guantes.svg" alt="Guantes">
              <h2 style="color:#fff;">Guantes</h2>
            </a>
            <a href="/botas-para-moto" data-dr="true" class="mtc-link" style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;">
              <img src="/content/images/categories/rebajas-botas.svg" alt="Botas">
              <h2 style="color:#fff;">Botas</h2>
            </a>
            <a href="/Pantalones-para-moto" data-dr="true" class="mtc-link" style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;">
              <img src="/content/images/categories/rebajas-pantalones.svg" alt="Pantalones">
              <h2 style="color:#fff;">Pantalones</h2></a>
            <a href="/ropa-mx-para-moto" data-dr="true" class="mtc-link" style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;">
              <img src="/content/images/categories/rebajas-offroad.svg" alt="Off-Road">
              <h2 style="color:#fff;">Off-Road</h2>
            </a>
          </div> <!---->
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.container {
  margin: 0 auto;
  max-width: 1280px;
  width: 95%;
}
.block-container {
  background-color: #f5f5f5;
}

.promo-categories__container {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 45px 0 40px;
}
.promo-categories__header {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  max-height: 79px;
}

.promo-categories {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 40px;
}

.promo-categories .mtc-link {
  align-items: center;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px 5px;
  transition: all .65s ease-out;
}

.promo-categories .mtc-link img {
  align-self: center;
  display: block;
  height: 58px;
  justify-self: center;
  margin: 0 auto 15px;
  width: auto;
}

.promo-categories .mtc-link h2 {
  display: block;
  font-size: 12px;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  margin: 0px;
}
</style>
