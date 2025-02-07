<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('content').first()
})

const { data: snippets } = await useAsyncData('snippets', () =>
  queryCollection('snippets').all()
)
</script>

<template>
  <div v-if="page">
    <Hero v-bind="page" />
    <UContainer v-if="snippets" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Snippet
        v-for="(snippet, index) in snippets"
        :key="index"
        :snippet
      />
    </UContainer>
  </div>
</template>
