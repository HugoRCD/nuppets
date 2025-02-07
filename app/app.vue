<script setup lang="ts">
useScriptPlausibleAnalytics({
  domain: 'nuppets.hrcd.fr',
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
  titleTemplate: `%s | ${title}`,
  link: link,
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <Html lang="en">
    <UApp>
      <NuxtPage />
    </UApp>
  </Html>
</template>
