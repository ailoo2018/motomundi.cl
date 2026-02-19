/* eslint-disable camelcase */
import { fileURLToPath } from 'node:url'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// nuxt.config.ts
const createCachedRoute = tag => ({
  swr: 3600,
  cache: {
    tags: [tag],
    varies: ['Accept-Language'],
    getKey: event => {
      const ua = getHeader(event, 'user-agent') || ''
      const deviceType = ua.match(/Mobile|Android|iPhone|iPad/) ? 'mobile' : 'desktop'
      const lang = (getHeader(event, 'accept-language') || 'default').split(',')[0]
      
      return `${tag}:${deviceType}:${lang}`
    },
  },
})

export default defineNuxtConfig({
  app: {
    baseURL: '/',
    head: {
      titleTemplate: '%s - Tu Mundo Sobre Las DOS Ruedas',
      title: 'Motomundi',
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon-2.png',
      }],
      noscript: [
        {
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-57TQSHJ"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          body: true, // This ensures it lands in the <body>, not the <head>
        },
      ],
      script: [
        {
          // Initialize gtag as a global function
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          type: 'text/javascript',
        },
        {
          hid: 'gtm-script', // Unique identifier
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-57TQSHJ');`,
          type: 'text/javascript',
          defer: true, // This ensures it stays put during hydration
        },
      ],
    },
  },

  devtools: { enabled: true },

  sourcemap: {
    server: true,
    client: true,
  },

  ssr: true,

  routeRules: {
    '/': createCachedRoute('homepage'),
    '/cafe-racer': createCachedRoute('cafe-racer'),
    '/motocross-enduro-trial': createCachedRoute('motocross'),
    '/ropa-casual': createCachedRoute('ropa-casual'),
    '/moto-blog': createCachedRoute('blog'),
  },

  runtimeConfig: {

    mercadopagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    webPayCommerceCode: process.env.WEBPAY_COMMERCE_CODE,
    webPayApiKey: process.env.WEBPAY_API_KEY,
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
    dlocalApiKey: process.env.NUXT_DLOCAL_GO_API_KEY,
    dlocalSecretKey: process.env.NUXT_DLOCAL_GO_SECRET_KEY,
    dlocalApiUrl: process.env.NUXT_DLOCAL_GO_BASE_URL,
    aaa: "----------------",
    nuxtdlocalApiKey: process.env.DLOCAL_GO_API_KEY,
    nuxtdlocalSecretKey: process.env.DLOCAL_GO_SECRET_KEY,
    nuxtdlocalApiUrl: process.env.DLOCAL_GO_BASE_URL,
    test: process.env.TEST,
    test2: process.env.NUXT_TEST,


    public: {
      baseUrl: process.env.NODE_ENV === 'production' ? "https://www.motomundi.cl" : "http://localhost:3000",
      geoBaseUrl: 'https://geo.ailoo.cl',
      cmsBaseUrl: process.env.NODE_ENV === 'production' ? 'https://betacms.ailoo.cl'
        : 'http://developer.cms.ailoo.cl:3050',
      productsBaseUrl: process.env.NODE_ENV === 'production' ? 'http://beta.products.ailoo.cl'
        : 'http://localhost:3011',
      w3BaseUrl: process.env.NODE_ENV === 'production' ? "https://w3.ailoo.cl" : "http://localhost:3080",
      testEnv: process.env.TEST_ENV,
    },
  },

  css: [
    '@core/scss/template/index.scss',
    '@styles/styles.scss',
    '@/plugins/iconify/icons.css',
  ],

  components: {
    dirs: [{
      path: '@/@core/components',
      pathPrefix: false,
    }, {
      path: '~/components/global',
      global: true,
    }, {
      path: '~/components',
      pathPrefix: false,
    }],
  },

  plugins: ['@/plugins/vuetify/index.js', '@/plugins/iconify/index.js'],

  imports: {
    dirs: ['./@core/utils', './@core/composable/', './plugins/*/composables/*'],
  },

  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'product-friendly-route',

        // Capture everything after the slash into a single param called 'slug'
        path: '/motocicleta/:slug+',
        file: '~/pages/products/detail/[id].vue',
      })
    },
  },
  experimental: {
    typedPages: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['../*'],
          '@themeConfig': ['../themeConfig.js'],
          '@layouts/*': ['../@layouts/*'],
          '@layouts': ['../@layouts'],
          '@core/*': ['../@core/*'],
          '@core': ['../@core'],
          '@images/*': ['../assets/images/*'],
          '@styles/*': ['../assets/styles/*'],
          '@validators': ['../@core/utils/validators'],
          '@db/*': ['../server/fake-db/*'],
          '@api-utils/*': ['../server/utils/*'],
        },
      },
    },
  },

  alias: {
    '@': fileURLToPath(new URL('.', import.meta.url)),
    '@themeConfig': fileURLToPath(new URL('./themeConfig.js', import.meta.url)),
    '@core': fileURLToPath(new URL('./@core', import.meta.url)),
    '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
    '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
    '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
    '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
    '@db': fileURLToPath(new URL('./server/fake-db/', import.meta.url)),
    '@api-utils': fileURLToPath(new URL('./server/utils/', import.meta.url)),
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
    },
  },

  vite: {
    define: { 'process.env': {} },

    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 5000,
    },

    // REMOVE this - not a valid option
    // server: {
    //   sourcemap: true,
    // },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@themeConfig': fileURLToPath(new URL('./themeConfig.js', import.meta.url)),
        '@core': fileURLToPath(new URL('./@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
        '@db': fileURLToPath(new URL('./server/fake-db/', import.meta.url)),
        '@api-utils': fileURLToPath(new URL('./server/utils/', import.meta.url)),
      },
    },

    optimizeDeps: {
      exclude: ['vuetify'],
      entries: ['./**/*.vue'],
    },

    plugins: [
      svgLoader(),
      vuetify({
        styles: {
          configFile: 'assets/styles/variables/_vuetify.scss',
        },
      }),
    ],

    server: {
      allowedHosts: [
        'subsequent-submissions-sys-writer.trycloudflare.com',
        '.trycloudflare.com', // Permite cualquier subdominio de ngrok
      ],
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      ignore: ['/guantes-para-moto'],
    },
  },

  compatibilityDate: '2025-07-15',


  modules: ['@vueuse/nuxt', '@nuxtjs/i18n', '@nuxtjs/device', '@pinia/nuxt', '@nuxtjs/sitemap', 'nuxt3-winston-log'],
  nuxt3WinstonLog: {
    infoLogPath: './logs',
    infoLogName: 'info.log',
    errorLogPath: './logs',
    errorLogName: 'error.log',
    // Optional: automatically log all server requests
    skipRequestMiddlewareHandler: true,
  },
  site: {
    url: 'https://www.motomundi.cl', // Replace with your actual production URL
    name: "Motomundi 2",
  },
  sitemap: {
    autoI18n: false,
    dynamicUrlsApiEndpoint: '/__sitemap__/urls',
    // Simple list of dynamic paths
    /*urls: [
      { loc: '/motocicleta/2993398-cascos-integrales-agv-k7', changefreq: 'daily' },
      '/blog/hello-world',
      '/blog/my-first-post',
    ],
*/
    // OR: Use a function to fetch from an API

    sources: [
      '/api/sitemap'
    ],
  },
})
