<script setup lang="ts">

</script>

<template>
  <section class="profile__club">
    <h1>Club Motomundi</h1>
    <p>
      Tu pasión por las motos convertida en <strong>descuentos, ventajas y
      experiencias únicas</strong>.
    </p>
    <div class="motocoins-card">
      <div class="motocoins-card__header">
        <img
          style="width: 95%"
          src="/content/images/club-motomundi-card-name.png"
          alt="Club Motomundi"
          class="motocoins-card__name"
        >
        <p>
          Tu saldo
        </p>
      </div>
      <div class="motocoins-card__info">
        <strong>
          <span class="motocoins-quantity">$229</span>
          mundipesos</strong>
        <span class="motocoins-conversion">(229)</span>
      </div>
    </div>
    <a
      href="/cuenta/club-mi-motomundi"
      data-dr="true"
      class="button button--filled mtc-link"
      rel="nofollow"
    ><span>Aprovecha las ventajas</span></a>
  </section>
</template>

<style lang="scss">

.profile__club {
  margin: 25px 0;
  text-align: center;
}


@media only screen and (min-width: 601px) {
  .profile__club {
    margin: 0;
    text-align: left;
  }
}


@media only screen and (min-width: 601px) {
  .profile .profile__avatar-container {
    order: 1;
    width: 50%;
  }
}

.motocoins-card .motocoins-card__info span {
  font-size: 1em;
  font-weight: 600;
}

@media only screen and (min-width: 993px) {
  .motocoins-card {
    margin: 20px 0;
  }
}


@media only screen and (min-width: 601px) {
  .profile .profile__club {
    order: 2;
    width: 50%;
  }
}

.motocoins-card {
  align-items: flex-start;
  aspect-ratio: 9/5;
  background: #d6001c url(/content/images/club-motomundi-card-bg.png) no-repeat 50%;
  background-size: cover;
  border-radius: 18px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  gap: 16px;
  height: auto;
  justify-content: space-between;
  margin: 20px auto;
  max-width: 350px;
  min-height: 140px;
  padding: 25px 20px 20px;
  text-align: left;
  width: 95%;
}

@media only screen and (min-width: 601px) {
  .profile .profile__club {
    order: 2;
    width: 50%;
  }
}
</style>
