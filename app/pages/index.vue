<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('content').first()
})

const { data: snippets } = await useAsyncData('snippets', () =>
  queryCollection('snippets').all()
)

const active = ref('all')

const tags = computed(() => {
  const allTags = snippets.value?.flatMap(snippet => snippet.tags) || []
  const uniqueTags = [...new Set(allTags)]
  return [
    'all',
    ...uniqueTags.map(tag =>
      tag!.toLowerCase().replace(/^\w/, c => c.toUpperCase())
    )
  ]
})

const filteredSnippets = computed(() => {
  if (active.value === 'all') return snippets.value
  return snippets.value?.filter(snippet =>
    snippet.tags?.some(tag =>
      tag!.toLowerCase() === active.value.toLowerCase()
    )
  )
})

const selectedSnippets = ref<Collections['snippets'][]>([])

function toggleSelectSnippet(snippet: Collections['snippets']) {
  if (selectedSnippets.value.find(s => s.id === snippet.id)) {
    selectedSnippets.value = selectedSnippets.value.filter(s => s.id !== snippet.id)
  } else {
    selectedSnippets.value.push(snippet)
  }
}

</script>

<template>
  <div v-if="page">
    <Hero v-bind="page" />
    <Teleport v-if="selectedSnippets.length" to="#action" defer>
      <ActionButton v-model="selectedSnippets" />
    </Teleport>
    <UContainer class="flex flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto w-full">
      <UButton
        v-for="tag of tags"
        :key="tag"
        size="sm"
        color="neutral"
        :label="tag === 'all' ? 'All' : tag"
        :variant="active === tag ? 'solid' : 'soft'"
        class="transition-all duration-200 capitalize"
        @click="active = tag"
      />
    </UContainer>
    <UContainer class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Snippet
        v-for="(snippet, index) in filteredSnippets"
        :key="index"
        :snippet
        :active="!!selectedSnippets.find(s => s.id === snippet.id)"
        @click.prevent="toggleSelectSnippet(snippet)"
      />
    </UContainer>
  </div>
</template>
