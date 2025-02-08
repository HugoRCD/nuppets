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
  titleTemplate: '',
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
      <Visitors />
      <Toaster />
    </UApp>
  </Html>
</template>
