<template>
  <div
    id="home-block-2"
    class="block-container"
  >
    <div
      class="promo-categories-ls promo-categories__container"
      style="background-color: #d6001c; background-repeat: repeat;background-size:unset;
         background-image: url('/content/images/assets/img/ls.jpg');"
    >
      <div class="container">
        <div class="row">
          <div class="col s12 m12 l12">
            <div class="promo-categories__header">
              <div class="promo-categories__countdown" />
            </div>
            <div class="promo-categories">
              <a
                href="/jockey-para-moto"
                class="mtc-link"
              ><img
                 src="/content/assets/menu/categories/51-moto-casual-gorras.svg"
                 alt="Cascos"
               >
                <h2 style="color:#fff;">Jockeys</h2></a><a
                href="/poleras-para-moto"

                class="mtc-link"
              ><img
                 src="/content/assets/menu/categories/46-moto-casual-camisetas.svg"
                 alt="Chaquetas"
               >
                <h2 style="color:#fff;">Poleras</h2></a><a
                href="/sweaters-y-polerones"
                class="mtc-link"
              ><img
                 src="/content/assets/menu/categories/57-moto-casual-sudaderas.svg"
                 alt="Guantes"
               >
                <h2 style="color:#fff;">Polerones</h2></a><a
                href="/mochilas"
                class="mtc-link"
              ><img
                 src="/content/assets/menu/categories/45-moto-casual-bolsas.svg"
                 alt="Botas"
               >
                <h2 style="color:#fff;">Mochilas</h2></a><a
                href="/chaquetas-casual"
                class="mtc-link"
              ><img
                 src="/content/assets/menu/categories/48-moto-casual-chaquetas.svg"
                 alt="Pantalones"
               >
                <h2 style="color:#fff;">Chaquetas</h2></a><a
                href="/gorros"

                class="mtc-link"
              ><img
                 src="/content/assets/menu/categories/52-moto-casual-gorros.svg"
                 alt="Off-Road"
               >
                <h2 style="color:#fff;">Gorros</h2></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

.promo-categories a.mtc-link{
  background-color: darkgrey;
  background-image: none;
  box-shadow: 0 0 0 #000;
  border: 1px solid #fff;
}


.promo-categories .mtc-link svg {
  align-self: center;
  display: block;
  height: 58px;
  justify-self: center;
  margin: 0 auto 15px;
  width: auto;
  /* stroke: #262626; */
  stroke: #fff;
}

.promo-categories .mtc-link h2 {
  color: #fff;
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

