<script setup lang="ts">
import { Toaster } from 'vue-sonner'

useScriptPlausibleAnalytics({
  domain: 'nuppets.dev',
  scriptInput: {
    src: 'https://analytics.hrcd.fr/js/script.js',
  }
})

const {
  title,
  description,
  link
} = useAppConfig()

useHead({
  title,
  titleTemplate: '%s | Nuxt and Vue snippets collection',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'charset', content: 'utf-8' },
    { name: 'color-scheme', content: 'light dark' },
  ],
  link: link,
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://nuppets.dev/og.png',
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  twitterImage: 'https://nuppets.dev/og.png',
  ogUrl: 'https://nuppets.dev',
})
</script>

<template>
  <Html lang="en" class="font-geist">
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <!--      <Visitors />-->
      <Toaster />
    </UApp>
  </Html>
</template>
