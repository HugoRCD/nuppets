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
      }
    }
  },
  title: 'Nuppets',
  description: 'Never write the same code twice',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
