

<template>
  <nav class="footer-nav">
    <div class="footer-nav__block">
      <div class="footer-nav__menu">
        <span class="h3">INFORMACIÓN DE PEDIDOS</span>
        <ul>
          <li>

            <NuxtLink
              to="/informacion/gastos-de-envio"
              rel="nofollow"
              class="mtc-link"
            >
              Gastos de envío
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/plazos-de-entrega"
              rel="nofollow"
              class="mtc-link"
            >
              Plazos de entrega
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/formas-de-pago"
              rel="nofollow"
              class="mtc-link"
            >
              Formas de pago
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/cambios-y-devoluciones"
              class="mtc-link"
            >
              Cambios, devoluciones y garantías
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/informacion/politica-de-precios"
              rel="nofollow"
              class="mtc-link"
            >
              Política de precios
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/guia-de-tallas"
              class="mtc-link"
            >
              Guías de tallas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/envios-internacionales"
              class="mtc-link"
            >
              Envíos Internacionales
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contactenos"
              class="mtc-link"
            >
              Contacto
            </NuxtLink>
          </li>

        </ul>
      </div>
    </div>
    <div class="footer-nav__block">
      <div class="footer-nav__menu">
        <span class="h3">ACERCA DE Motomundi</span>
        <ul>
          <li>
            <NuxtLink
              to="/informacion/quienes-somos"
              class="mtc-link"
            >
              Quiénes somos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/calendario"
              class="mtc-link"
            >
              Eventos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/tiendas"
              class="mtc-link"
            >
              Tiendas
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contactenos"
              class="mtc-link"
            >
              Contáctanos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/afiliados"
              class="mtc-link"
            >
              Programa de Afiliados
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/trabaja-con-nosotros"
              class="mtc-link"
            >
              Trabaja con nosotros
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/embajadores"
              rel="nofollow"
              class="mtc-link"
            >
              Embajadores
            </NuxtLink>
          </li>
          <!--                  <li>
                              <NuxtLink
                                to="/account/club-mi-motomundi"
                                rel="nofollow"
                                class="mtc-link"
                              >
                                Club MyMotomundi
                              </NuxtLink>
                            </li>-->
          <li>
            <NuxtLink
              to="/account/invita-tus-amigxs"
              class="mtc-link"
            >
              Invita a tus amigxs
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-nav__block">
      <div class="footer-nav__menu">
        <span class="h3">SERVICIOS</span>
        <ul>
          <li>
            <NuxtLink
              to="/informacion/politica-de-precios"
              rel="nofollow"
              class="mtc-link"
            >
              Precio mínimo garantizado
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/login"
              rel="nofollow"
              class="mtc-link"
            >
              Registro de usuarios
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/informacion/tarjeta-regalo"
              class="mtc-link"
            >
              Tarjeta regalo
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/ayuda"
              class="mtc-link"
            >
              Ayuda
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style >

.footer-nav {
  display: flex;
  flex: 0 0 60%;
  justify-content: space-between;
  /*margin-top: 20px;*/
}

.footer-nav {
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  -webkit-column-gap: 20px;
  -moz-column-gap: 20px;
  column-gap: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  row-gap: 30px;
}


.footer-nav span.h3 {
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 10px;
  text-transform: uppercase;
}

.footer-nav__block .footer-nav__menu {
  margin-top: 15px;
}

.footer-nav span.h3 {
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 10px;
  text-transform: uppercase;
}

.footer-nav .mtc-link {
  color: #a3a3a3;
  font-size: 12px;
  line-height: unset;
  text-transform: unset;
  font-weight: normal;
}
</style>
