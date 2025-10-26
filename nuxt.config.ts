export default defineNuxtConfig({

  compatibilityDate: '2025-10-26',

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/scripts',
    '@vueuse/nuxt'
  ],

  content: {
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
    '/snippets': { isr: true, prerender: true },
    '/ai-commands': { isr: true, prerender: true },
    '/': { redirect: { statusCode: 301, to: '/snippets' } },
  },

  nitro: {
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
  }
})
