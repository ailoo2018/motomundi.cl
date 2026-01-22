<script setup>
const emit = defineEmits(['on-menu-change'])

const loadMenu = () => {
  console.log("loadMenu")
  emit('on-menu-change', "hey")
}
</script>

<template>
  <nav class="menu-mobile__nav"  >
    <ul class="menu-mobile__grid-nav">
      <li>
        <button @click="loadMenu('cascos', 'Cascos', '/cascos-para-moto')">
          <img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/128-motos-cascos.svg"
            alt="Cascos"
          >
          <span>Cascos</span>
        </button>
      </li>
      <li>
        <button ng-click="loadMenu('calle', 'Equipación carretera', '/ropa-calle-para-moto')">
          <img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/130-moto-equipacion-carretera.svg"
            alt="Equipación carretera"
          > <span>Equipación carretera</span>
        </button>
      </li>
      <li ng-click="loadMenu('offroad', 'Off-road', '/motocross-enduro-trial')">
        <button>
          <img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/131-moto-equipacion-offroad.svg"
            alt="Off-road"
          > <span>Off-road</span>
        </button>
      </li>
      <li ng-click="loadMenu('accesorios', 'Accesorios y recambios', '/accesorios-para-motos')">
        <button>
          <img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/132-moto-accesorios.svg"
            alt="Accesorios y recambios"
          > <span>Accesorios y recambios</span>
        </button>
      </li>
      <li>
        <button ng-click="loadMenu('lifestyle', 'Ropa casual', '/ropa-casual')">
          <img
            width="40"
            height="40"
            src="/content/assets/images/mobile-menu/categories/133-moto-ropa-casual.svg"
            alt="Ropa casual"
          > <span>Ropa casual</span>
        </button>
      </li>
      <li>
        <button
          aaang-click="loadMenu('mujer', 'Mujer', '/ropa-moto-mujer')"
          onclick="window.location='/equipacion-mujer';"
        >
          <img
            width="40"
            height="40"
            src="/content/images/mobile-menu/categories/142-mujer.svg"
            alt="Mujer"
          > <span>Mujer</span>
        </button>
      </li>
      <li>
        <button
          ang-click="loadMenu('outlet', 'Outlet', '/outlet')"
          onclick="window.location='/outlet';"
        >
          <img
            width="40"
            height="40"
            src="/content/images/mobile-menu/categories/137-outlet.svg"
            alt="Outlet"
          > <span>Outlet</span>
        </button>
      </li>
      <li>
        <button ng-click="loadMenu('marcas', 'Marcas', '#')">
          <img
            width="40"
            height="40"
            src="/content/images/mobile-menu/categories/134-marcas.svg"
            alt="Marcas"
          > <span>Marcas</span>
        </button>
      </li>
    </ul>
    <h2 class="menu-mobile__divider">
      Estilo de piloto
    </h2>
    <ul class="menu-mobile__list-nav">
      <li>
        <a
          href="/"
          data-dr="true"
          class="mtc-link"
        >
          <img 
            src="/content/assets/menu/mobile-menu__seg-racing.svg"
            alt="Tienda Motomundi"
          >
          <span>Sport / Racing</span>
        </a>
      </li>


      <li>
        <a
          href="/"
          class="mtc-link blog-link"
        >
          <img 
            src="/content/assets/menu/mobile-menu__seg-touring.svg"
            alt="Motomundi blog"
          > <span>Touring</span>
        </a>
      </li>
      <li>
        <a
          href="/"
          data-dr="true"
          class="mtc-link"
        >
          <img 
            src="/content/assets/menu/mobile-menu__seg-trail.svg"
            alt="Motomundi contact"
          >
          <span>Trail / Adventure</span>
        </a>
      </li>
      <li>
        <a
          href="/"
          data-dr="true"
          class="mtc-link"
        >
          <img 
            src="/content/assets/menu/mobile-menu__seg-urban.svg"
            alt="Motomundi help"
          > <span>Scooter / Urban</span></a>
      </li>
      <li>
        <a
          href="/cafe-racer"
          data-dr="true"
          class="mtc-link"
        >
          <img 
            src="/content/assets/menu/mobile-menu__seg-caferacer.svg"
            alt="Motomundi help"
          > <span>Café Racer / Vintage</span></a>
      </li>
      <li>
        <a
          href="/motocross-enduro-trial"
          data-dr="true"
          class="mtc-link"
        >
          <img 
            src="/content/assets/menu/mobile-menu__seg-offroad.svg"
            alt="Motomundi help"
          > <span>Motocross / Enduro</span></a>
      </li>
    </ul>

    <h2 class="menu-mobile__divider">
      Otras opciones
    </h2>
    <ul class="menu-mobile__list-nav">
      <li>
        <a
          href="/tiendas"
          data-dr="true"
          class="mtc-link"
        ><img 
          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQwIiB3aWR0aD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjEuMTIiPjxwYXRoIGQ9Im0yOC4xMjggMTguMDY0YzAgNi4yNzItOC4wNjQgMTEuNjQ4LTguMDY0IDExLjY0OHMtOC4wNjQtNS4zNzYtOC4wNjQtMTEuNjQ4YTguMDY0IDguMDY0IDAgMCAxIDE2LjEyOCAwczAgMCAwIDB6Ii8+PGNpcmNsZSBjeD0iMjAuMDY0IiBjeT0iMTguMDY0IiByPSIyLjY4OCIvPjwvZz48L3N2Zz4="
          alt="Tienda Motomundi"
        > <span>Tiendas</span></a>
      </li>
      <li>
        <a
          href="/cuenta/club-mi-motomundi"
          data-dr="true"
          class="mtc-link"
          rel="nofollow"
        >
          <img
            style="width:40px;height:40px;"
            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKIHdpZHRoPSIxNjcuMDAwMDAwcHQiIGhlaWdodD0iMTY3LjAwMDAwMHB0IiB2aWV3Qm94PSIwIDAgMTY3LjAwMDAwMCAxNjcuMDAwMDAwIgogcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+CjxtZXRhZGF0YT4KQ3JlYXRlZCBieSBwb3RyYWNlIDEuMTYsIHdyaXR0ZW4gYnkgUGV0ZXIgU2VsaW5nZXIgMjAwMS0yMDE5CjwvbWV0YWRhdGE+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDE2Ny4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiCmZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0zNTUgMTEwOSBjLTY5IC05IC05NyAtMjIgLTE0NSAtNjUgLTcwIC02MyAtODYgLTExMSAtMTMwIC0zODYgLTE5Ci0xMTYgLTIwIC0xMjkgLTYgLTE1NyAyNiAtNDkgNTIgLTYxIDEzNSAtNjEgNDEgMCA5MCA1IDEwOCAxMiAyNyAxMCAzOCAxMCA1MwowIDI5IC0xOCAxNjQgLTE1IDIwMCAzIDI3IDE0IDMzIDE0IDYwIDAgNDAgLTIxIDMzOCAtMjIgMzc4IC0xIDIzIDEyIDMxIDEyCjUyIDAgMzQgLTE4IDE2NyAtMTggMjAzIDEgMjUgMTMgMzIgMTMgNTcgMCAzMyAtMTcgMTQ1IC0yMCAxODQgLTUgMTYgNiAyNiAxNwoyNiAzMCAwIDEzIDcgMjAgMjAgMjAgMTEgMCAyMCAxIDIwIDMgMCAyIDkgNTIgMjAgMTEzIDQ5IDI2NCA1MSAzMDEgMjIgMzY2Ci0yMSA0OSAtNjYgOTEgLTEyMSAxMTQgLTI4IDEyIC01OCAxNCAtMTMxIDEwIC01MiAtMyAtMTA2IC01IC0xMjAgLTQgLTE0IDEKLTc0IDIgLTEzNSAyIC0xMTAgMSAtMTI2IC0zIC0xOTIgLTQ1IC0yMCAtMTIgLTI2IC0xMiAtNDUgMCAtNzUgNDggLTkzIDUyCi0yNDYgNTAgLTgxIDAgLTE2MyAxIC0xODIgMyAtMTkgMiAtNTcgMCAtODUgLTN6IG0xNzEgLTkyIGMyNiAtMTQgMzIgLTEzIDU5CjEgMjAgMTEgNTQgMTcgMTAwIDE2IDg3IDAgMTMwIC0yMiAxNjQgLTgzIDI1IC00NiAyNSAtNTggLTkgLTIzMSAtNSAtMjUgLTE0Ci03NCAtMjEgLTExMCAtNiAtMzYgLTE2IC03MSAtMjIgLTc3IC0xMSAtMTUgLTEzMyAtMTggLTE0MiAtNCAtMyA2IDYgNzIgMTkKMTQ4IDE0IDc2IDI2IDE1NiAyOCAxNzggbDMgNDAgLTQyIDMgYy00MSAzIC00MiAyIC01MiAtMzUgLTEwIC0zOCAtMjMgLTExMAotNDIgLTIzMyAtMTYgLTEwOCAtMTggLTExMCAtOTMgLTExMCAtNjMgMCAtOTYgMTYgLTgxIDM5IDMgNiAxMCAzNyAxNiA2OCA1MAoyOTQgNTAgMjczIDAgMjczIC0yMSAwIC00MyAtNiAtNDggLTEyIC02IC03IC0yMyAtODcgLTM4IC0xNzggLTE1IC05MSAtMzIKLTE3MSAtMzggLTE3NyAtMTQgLTE5IC0xMzYgLTE3IC0xNDMgMSAtNyAxOCA1MyAzNDYgNzEgMzg4IDIwIDQ4IDY4IDg5IDEyMgoxMDQgNTcgMTYgMTQ5IDEyIDE4OSAtOXogbTY3MCA3IGM0MyAtMTUgNTIgLTE0IDEwNyAxIDExNyAzMyAyMjQgLTggMjQ3IC05NAo2IC0yMiA2IC01OSAwIC05NiAtMTggLTEyNCAtNDIgLTI1MSAtNTEgLTI4MiAtMTEgLTMzIC0xMSAtMzMgLTc5IC0zMyAtNDYgMAotNjkgNCAtNzMgMTMgLTQgMTIgMyA2MSAzNSAyMzIgNiAzMyAxMiA3NiAxMiA5NSAxIDM0IDAgMzUgLTQxIDM4IC00MSAzIC00MgoyIC01MiAtMzUgLTUgLTIxIC0xOSAtOTUgLTMxIC0xNjUgLTMwIC0xODUgLTI1IC0xNzggLTExMCAtMTc4IC04NCAwIC04MSAtMTQKLTQ1IDE4NiAxNCA3NiAyNSAxNTEgMjUgMTY3IDAgMjUgLTMgMjcgLTQwIDI3IC01MCAwIC00OSAyIC04NCAtMjAwIC0xNSAtODUKLTMyIC0xNjAgLTM4IC0xNjcgLTEyIC0xNSAtMTM0IC0xOCAtMTQzIC0zIC0xMSAxNyA1NyAzNjUgNzkgNDA5IDQ1IDg1IDE3MQoxMjMgMjgyIDg1eiIvPgo8L2c+Cjwvc3ZnPgo="
            alt="Club Motomundi"
          >
          <span>MiMotomundi</span></a>
      </li>

      <li>
        <a
          href="/calendario"
          data-dr="true"
          class="mtc-link"
          rel="nofollow"
        >
          <div style="width: 40px; height: 40px;margin:auto;margin-top:2px;padding-top:5px;">
            <svg
              xmlns="https://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style="width: 28px; height:30px;color: #333;"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <line
                x1="16"
                y1="2"
                x2="16"
                y2="6"
              />
              <line
                x1="8"
                y1="2"
                x2="8"
                y2="6"
              />
              <line
                x1="3"
                y1="10"
                x2="21"
                y2="10"
              />
            </svg>
          </div>
          <span>Eventos</span>
        </a>
      </li>

      <li>
        <a
          href="/moto-blog"
          class="mtc-link blog-link"
        ><img 
          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiIHdpZHRoPSI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHlsZT0ic3Ryb2tlOiMwMDA7c3Ryb2tlLXdpZHRoOi43NTtmaWxsOm5vbmU7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5IDEwKSI+PHBhdGggZD0ibTExIDAtMTEgNS41IDExIDUuNSAxMS01LjV6Ii8+PHBhdGggZD0ibTAgMTYgMTEgNSAxMS01Ii8+PHBhdGggZD0ibTAgMTAgMTEgNiAxMS02Ii8+PC9nPjwvc3ZnPg=="
          alt="Motomundi blog"
        > <span>Blog</span>
        </a>
      </li>
      <li>
        <a
          href="/10757-contactenos"
          data-dr="true"
          class="mtc-link"
        ><img 
           src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiIHdpZHRoPSI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHlsZT0ic3Ryb2tlOiMwMDA7c3Ryb2tlLXdpZHRoOi44O2ZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkgMTEpIj48cGF0aCBkPSJtMi4yIDBoMTcuNmMxLjIxIDAgMi4yLjk2NzY1NjI1IDIuMiAyLjE0ODQzNzV2MTIuODkwNjI1YzAgMS4xODI1LS45OSAyLjE0ODQzNzUtMi4yIDIuMTQ4NDM3NWgtMTcuNmMtMS4yMSAwLTIuMi0uOTY3NjU2My0yLjItMi4xNDg0Mzc1di0xMi44OTA2MjVjMC0xLjE4MjUuOTktMi4xNDg0Mzc1IDIuMi0yLjE0ODQzNzV6Ii8+PHBhdGggZD0ibTIyIDIuMi0xMSA3LjctMTEtNy43Ii8+PC9nPjwvc3ZnPg=="
           alt="Motomundi contact"
         >
          <span>Contacto</span>
        </a>
      </li>
      <li>
        <a
          href="/ayuda"
          data-dr="true"
          class="mtc-link"
        ><img 
          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQwIiB3aWR0aD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS41IDEwKSI+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjEwLjUiIHI9IjEwLjUiLz48Y2lyY2xlIGN4PSIxMC41IiBjeT0iMTAuNSIgcj0iNC4yIi8+PHBhdGggZD0ibTMuMDc3IDMuMDc3IDQuNDUyIDQuNDUybTUuOTQzIDUuOTQzIDQuNDUyIDQuNDUybS00LjQ1Mi0xMC4zOTUgNC40NTItNC40NTJtLTQuNDUyIDQuNDUyIDMuNzA2LTMuNzA3bS0xNC4xMDEgMTQuMTAyIDQuNDUyLTQuNDUyIi8+PC9nPjwvc3ZnPg=="
          alt="Motomundi help"
        > <span>Ayuda</span></a>
      </li>
    </ul>
  </nav>
</template>


