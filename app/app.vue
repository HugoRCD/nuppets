<script setup lang="ts">
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
  titleTemplate: `%s | ${title}`,
  link: link,
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  ogUrl: 'https://nuppets.hrcd.fr',
})
const searchTerm = ref('')

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('snippets'), {
  server: false
})
</script>

<template>
  <Html lang="en" class="font-geist">
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ClientOnly>
        <LazyUContentSearch
          v-model:search-term="searchTerm"
          :files
          shortcut="meta_k"
          :fuse="{ resultLimit: 42 }"
        />
      </ClientOnly>
    </UApp>
  </Html>
</template>
