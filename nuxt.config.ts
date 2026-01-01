import { fileURLToPath } from 'node:url'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  app: {
    baseURL: '/',
    head: {
      titleTemplate: '%s - Tu Mundo Sobre Las DOS Ruedas',
      title: 'Vuexy',
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: process.env.NUXT_APP_BASE_URL+'/favicon.ico',
      }],
    },
  },

  devtools: { enabled: true },

  sourcemap: {
    server: true,
    client: true,
  },

  ssr: true,

  routeRules: {
    '/motocicleta/:id(\\d+)-**': { proxy: '/products/detail/:id' },
  },

  runtimeConfig: {
    public: {
      cmsBaseUrl: process.env.NODE_ENV === 'production'
        ? 'http://beta.cms.ailoo.cl'

        // : 'http://beta.cms.ailoo.cl',
        : 'http://developer.cms.ailoo.cl:3050', 
      productsBaseUrl: process.env.NODE_ENV === 'production'
        ? 'http://beta.products.ailoo.cl'

      // : 'http://beta.products.ailoo.cl',
      
        : 'http://developer.products.ailoo.cl:3011',
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

  hooks: {},

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
  modules: ['@vueuse/nuxt', '@nuxtjs/i18n', '@nuxtjs/device', '@pinia/nuxt'],
})
