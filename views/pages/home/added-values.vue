<script setup>

const props = defineProps({
  widget: {
    type: Object,
  }
})

</script>

<template>
  <div
    :id="`home-block-${widget.id}`"
    class="block-container hide-on-small-and-down"
    ng-non-bindable=""
  >
    <section
      block-id="10"
      block-name="addedValues"
      section="home"
      class="added-values-block"
    >
      <div class="container">
        <div class="row">
          <div>
            <ul class="added-values__container">
              <li>
                <a
                  href="/gastos-de-envio"
                  data-dr="true"
                  rel="nofollow"
                  class="mtc-link"
                >
                  <svg
                    width="14"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  ><title>
                     &lt;strong&gt;Envío gratis&lt;/strong&gt;&lt;br&gt;</title>
                    <use
                      href="/content/svg/motomundi.svg#i-av-free-shipping"
                      xlink:href="/content/svg/motomundi.svg#i-av-free-shipping"
                    />
                  </svg>
                  <span><strong>Envío gratis </strong><br> a partir de $150.000</span></a>
              </li>
              <li>
                <a
                  href="/devoluciones"
                  data-dr="true"
                  class="mtc-link"
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  ><title>
                     Cambio &lt;br&gt;de talla gratis *</title>
                    <use
                      href="/content/svg/motomundi.svg#i-av-free-size-change"
                      xlink:href="/content/svg/motomundi.svg#i-av-free-size-change"
                    />
                  </svg>
                  <span>Cambio <br>de talla gratis *</span></a>
              </li>
              <li>
                <a
                  href="/terminos-y-condiciones-precio-minimo-garantizado"
                  data-dr="true"
                  class="mtc-link"
                >
                  <svg
                    width="15"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  ><title>
                     Precio mínimo &lt;br&gt;garantizado *</title>
                    <use
                      href="/content/svg/motomundi.svg#i-av-minimum-price"
                      xlink:href="/content/svg/motomundi.svg#i-av-minimum-price"
                    />
                  </svg>
                  <span>Precio mínimo <br>garantizado *</span></a>
              </li>
              <li>
                <a
                  href="/devoluciones"
                  data-dr="true"
                  rel="nofollow"
                  class="mtc-link"
                >
                  <svg
                    width="13"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  ><title>
                     Garantía de&lt;br&gt; devolución y
                     cambio</title>
                    <use
                      href="/content/svg/motomundi.svg#i-av-change-warranty"
                      xlink:href="/content/svg/motomundi.svg#i-av-change-warranty"
                    />
                  </svg>
                  <span>Garantía de<br> devolución y cambio</span></a>
              </li>
              <li>
                <a
                  href="/devoluciones"
                  data-dr="true"
                  rel="nofollow"
                  class="mtc-link"
                >
                  <svg
                    width="14"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon sprite-line-icons"
                  ><title>
                     Devolución&lt;br&gt; gratuita en
                     tienda</title>
                    <use
                      href="/content/svg/motomundi.svg#i-av-shop-return"
                      xlink:href="/content/svg/motomundi.svg#i-av-shop-return"
                    />
                  </svg>
                  <span>Devolución<br> gratuita en tienda</span></a>
              </li>
              <li>
                <a
                  href="/iniciativas"
                  data-dr="true"
                  class="mtc-link"
                >
                  <svg
                    width="15"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="1 0 15 14"
                    class="icon sprite-line-icons"
                  ><title>Envío climáticamente&lt;br&gt;
                     neutral</title>
                    <use
                      href="/content/svg/motomundi.svg#i-av-climate-neutral-shipping"
                      xlink:href="/content/svg/motomundi.svg#i-av-climate-neutral-shipping"
                    />
                  </svg>
                  <span>Envío climáticamente<br> neutral</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.added-values-block {
  background-color: #0f0f0f;
  color: #fff;
  padding: 25px 0;
}

.added-values__container {
  align-items: center;
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.added-values__container li {
  box-sizing: border-box;
  font-size: 11px;
  font-weight: 600;
  line-height: 11px;
  padding-left: 25px;
  position: relative;
  text-transform: uppercase;
}

.added-values__container li a {
  color: #fff;
}

.added-values__container li svg {
  left: 0;
  margin-right: 2px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%) scale(1.6);
  transform: translateY(-50%) scale(1.6);
  vertical-align: -3px;
}

.added-values__container li svg use {
  stroke-width: .8;
  stroke: #41a334;
}

.sprite-line-icons use {
  fill-rule: evenodd;
  fill: none;
  stroke: #2a2a2a;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
