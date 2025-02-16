export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'neutral'
    }
  },
  uiPro: {
    prose: {
      pre: {
        slots: {
          root: 'my-0 size-full',
          base: 'size-full text-xs'
        }
      },
      p: {
        slots: {
          root: 'my-0'
        }
      }
    }
  },
  title: 'Nuppets',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
