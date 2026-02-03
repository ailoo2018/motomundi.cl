<script setup lang="ts">
const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    :id="`home-block-${widget.id}`"
    class="block-container"
    ng-non-bindable=""
  >
    <div

      class="promo-categories__container"
      style="background-color: rgb(239, 239, 239); background-repeat: repeat;background-size:unset;
        background-image: url('/content/images/assets/img/road.webp');"
    >
      <div class="container">
        <div class="col s12 m12 l12">
          <div class="promo-categories__header">
            <div class="promo-categories__countdown" />
          </div>
          <div class="promo-categories">
            <a
              href="/cascos-para-moto"
              class="mtc-link"
              style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;"
            >
              <svg
                class="svg-icon"
                viewBox="-10 0 120 90"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use xlink:href="/content/assets/menu/categories/blouz.svg#img-casque-integral" />
              </svg>
              <h2 style="color:#fff;">Cascos</h2>
            </a>
            <a
              href="/chaquetas-para-moto"
              class="mtc-link"
              style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;"
            >
              <svg
                class="svg-icon"
                viewBox="-30 0 150 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use xlink:href="/content/assets/menu/categories/blouz.svg#img-blouson-et-veste" />
              </svg>
              <h2 style="color:#fff;">Chaquetas</h2></a>
            <a
              href="/guantes-para-moto"
              class="mtc-link"
              style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;"
            >
              <svg
                class="svg-icon"
                viewBox="-35 0 150 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use xlink:href="/content/assets/menu/categories/blouz.svg#img-gants-moto" />
              </svg>
              <h2 style="color:#fff;">Guantes</h2>
            </a>
            <a
              href="/botas-para-moto"
              class="mtc-link"
              style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;"
            >
              <svg
                class="svg-icon"
                viewBox="-35 0 390 280"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use xlink:href="/content/assets/menu/categories/blouz.svg#img-bottes-et-chaussures-moto-femme" />
              </svg>
              <h2 style="color:#fff;">Botas</h2>
            </a>
            <a
              href="/Pantalones-para-moto"
              class="mtc-link"
              style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;"
            >
              <svg
                class="svg-icon"
                viewBox="-35 0 150 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use xlink:href="/content/assets/menu/categories/blouz.svg#img-pantalon-moto" />
              </svg>
              <h2 style="color:#fff;">Pantalones</h2></a>
            <a
              href="/ropa-mx-para-moto"
              class="mtc-link"
              style="background-color:#333;background-image:none;box-shadow:0 0 0 #000;border:1px solid #fff;"
            >
              <svg
                class="svg-icon"
                viewBox="-10 0 150 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use xlink:href="/content/assets/menu/categories/blouz.svg#img-casque-cross" />
              </svg>
              <h2 style="color:#fff;">Off-Road</h2>
            </a>
          </div>
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

@media only screen and (max-width: 600px) {
  .promo-categories .mtc-link {
    flex: 0 0 45%;
  }
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  .promo-categories .mtc-link {
    flex: 0 0 32%;
    justify-content: center;
    padding: 20px 0;
  }
}
@media only screen and (max-width: 600px) {
  .promo-categories {
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
}
</style>
