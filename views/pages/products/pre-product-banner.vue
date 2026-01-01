

<template>
  <!-- pre product banners -->
  <div
    class="row"
    style="margin-bottom: 8px;"
  >
    <div class="col s12">
      <span
                
        data-dr="true"
        class="countdown-with-banner mtc-link"
        data-promotion-id="bannerProduct"
      >
        <div
                  
          class="countdown-banner banner__theme--light"
          style="height: 110px;"
        >
          <a
            href="https://www.youtube.com/MotoMundiTv"
            target="_blank"
          >
            <img
                      
              src="/content/images/banners/mm.png"
              alt="Promo banner"
              loading="lazy"
              class="banner__background"
            >
          </a>
        </div>

      </span>
    </div>
  </div>
  <!-- /pre product banners -->
</template>

<style scoped lang="scss">
.countdown-with-banner .countdown-banner {
  align-items: center;
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  gap: 5px;
  height: 80px;
  justify-content: center;
  padding: 5px 0;
  position: relative;
}

.countdown-with-banner .countdown-banner .banner__background {
  height: 100%;
  left: 0;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center center;
  object-position: center center;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
