<script setup lang="ts">
import { Toaster } from 'vue-sonner'

useScriptPlausibleAnalytics({
  domain: 'nuppets.dev',
  scriptInput: {
    src: 'https://analytics.hrcd.fr/js/script.js',
  }
})

const {
  title: appTitle,
  link
} = useAppConfig()

const route = useRoute()
const title = computed(() => `${appTitle} | ${route.meta.title}`)

useHead({
  title,
  titleTemplate: title.value,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'charset', content: 'utf-8' },
    { name: 'color-scheme', content: 'light dark' },
  ],
  link,
})

useSeoMeta({
  title,
  description: route.meta.description as string,
  ogTitle: title,
  ogDescription: route.meta.description as string,
  ogImage: 'https://nuppets.dev/og.png',
  twitterTitle: title,
  twitterDescription: route.meta.description as string,
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
