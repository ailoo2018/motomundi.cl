<script setup lang="ts">
const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

</script>

<template>

  <div id="home-seo-block" class="block-container">
    <aside class="text-block" >
      <div class="container">
        <div class="row">
          <div class="col s12 m10 offset-m1 l8 offset-l2">
            <h1>Tienda de cascos, ropa y accesorios de moto</h1>
            <div class="text">
              <p>En <strong>Motomundi.cl</strong> encontrarás el <strong>catálogo más completo</strong> en
                <strong>venta online</strong> de <strong>accesorios y equipamiento para
                  motociclistas</strong> en Chile. Trabajamos con las mejores marcas del mundo como <a
                  href="https://www.motomundi.cl/alpinestars">Alpinestars</a>, <a
                  href="https://www.motomundi.cl/arai">Arai</a>, <a
                  href="https://www.motomundi.cl/hjc">HJC</a>, <a href="https://www.motomundi.cl/fox">Fox</a>,
                <a href="https://www.motomundi.cl/givi">Givi</a>, <a href="https://www.motomundi.cl/leatt">Leatt</a>,
                <a href="https://www.motomundi.cl/shoei">Shoei</a>, <a
                  href="https://www.motomundi.cl/nolan">Nolan</a>, <a
                  href="https://www.motomundi.cl/dainese">Dainese</a> y muchas más, siempre con
                <strong>entrega rápida</strong>, <strong>excelente servicio</strong> y <strong>precios
                  garantizados</strong>.</p>

              <p>Tenemos todo lo que necesitas en <a
                href="https://www.motomundi.cl/equipacion-moto-carretera/cascos">cascos</a>, <a
                href="https://www.motomundi.cl/equipacion-moto-carretera/chaquetas">chaquetas</a>, <a
                href="https://www.motomundi.cl/equipacion-moto-carretera/guantes">guantes</a> y <a
                href="https://www.motomundi.cl/equipacion-moto-carretera/botas">botas</a> para <strong>carretera,
                ciudad</strong> o <strong>aventura</strong>. Y si buscas el máximo rendimiento, también
                contamos con <a href="https://www.motomundi.cl/equipacion-moto-carretera/trajes-y-monos">monos</a>
                y <a href="https://www.motomundi.cl/equipacion-moto-carretera/protecciones">protecciones</a>
                ideales para conducción <strong>deportiva</strong> o de <strong>circuito</strong>.</p>

              <p>Para los fanáticos del <strong>off-road</strong>, ofrecemos equipamiento completo de <a
                href="https://www.motomundi.cl/equipacion-motocross/botas">pies</a> a <a
                href="https://www.motomundi.cl/equipacion-motocross/cascos">cabeza</a>, incluyendo <a
                href="https://www.motomundi.cl/equipacion-motocross/camisetas-2">camisetas</a>, <a
                href="https://www.motomundi.cl/equipacion-motocross/guantes">guantes</a>, <a
                href="https://www.motomundi.cl/equipacion-motocross/pantalones-2">pantalones</a> y <a
                href="https://www.motomundi.cl/equipacion-motocross/protecciones">protecciones</a> para
                <strong>enduro, motocross y trail</strong>.</p>

              <p>En Motomundi también encontrarás una amplia gama de <strong>accesorios para tu moto</strong>,
                como <a href="https://www.motomundi.cl/accesorios-moto/maletas">maletas</a>, <a
                  href="https://www.motomundi.cl/accesorios-moto/bolsas">bolsas</a>, <a
                  href="https://www.motomundi.cl/accesorios-moto/electronica">electrónica</a>, <a
                  href="https://www.motomundi.cl/accesorios-moto/antirrobos">antirrobos</a> y mucho
                más. Y como la pasión no termina al bajarse de la moto, también tenemos <strong>ropa
                  casual</strong> y <strong>merchandising</strong> con estilo motero.</p>

              <p>Motomundi nació con la misión de acercar el mejor equipamiento del mundo a los motociclistas
                de Chile. Hoy contamos con <strong>6 tiendas físicas</strong> en ciudades como <strong>Santiago,
                  Viña del Mar, Antofagasta</strong> y <strong>Puerto Varas</strong>, y una <strong>plataforma
                  online que llega a todo el país</strong>.</p>

              <p>Porque la moto no es solo un medio de transporte: es una forma de vivir. En Motomundi
                trabajamos cada día para que vivas la ruta con <strong>seguridad, estilo y libertad</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped lang="scss">
#home-seo-block h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}

#home-seo-block .text {
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  transition: all .5s ease-in-out;
}

@media only screen and (min-width: 993px) {
  .row .col.offset-l2 {
    margin-left: 16.6666666667%;
  }
}

@media only screen and (min-width: 993px) {
  .row .col.l8 {
    width: 66.6666666667%;
  }
}

#home-seo-block h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
  margin-bottom: 30px;
  text-align: center;
}

p {
  margin: 0 0 1.5em;
}
</style>
