export default defineNuxtConfig({

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    'nuxt-visitors',
  ],

  content: {
    database: {
      type: 'postgres',
      url: process.env.DATABASE_URL!
    },
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  imports: {
    presets: [
      {
        from: 'vue-sonner',
        imports: ['toast'],
      },
    ],
  },

  routeRules: {
    '/': { isr: true, prerender: true },
  },

  nitro: {
    experimental: {
      websocket: true,
    },
    prerender: {
      crawlLinks: true,
    },
  },

  experimental: {
    viewTransition: true,
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: 'iconify',
  },

  future: {
    compatibilityVersion: 4
  }
})
