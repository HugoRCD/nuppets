<script setup lang="ts">
definePageMeta({
  title: 'Snippets',
  description: 'A universal hub for Nuxt and Vue snippets - Available for Raycast and more coming soon'
})

const { data: rawSnippets } = await useAsyncData('snippets', () =>
  queryCollection('snippets')
    .order('name', 'ASC')
    .where('id', '<>', 'snippets/snippets/index.yml')
    .all()
)

const snippets = ref<Snippet[]>(validateSnippets(rawSnippets.value || []))
const active = ref('all')

const tags = computed(() => {
  const allTags = snippets.value.flatMap(snippet => snippet.tags || [])
  const uniqueTags = [...new Set(allTags)]
  return [
    'all',
    ...uniqueTags.map(tag => tag.toLowerCase().replace(/^\w/, c => c.toUpperCase()))
  ]
})

const filteredSnippets = computed(() => {
  if (active.value === 'all') return snippets.value
  return snippets.value.filter(snippet =>
    (snippet.tags || []).some(tag => tag.toLowerCase() === active.value.toLowerCase())
  )
})

const selectedSnippets = ref<Snippet[]>([])

function toggleSelectSnippet(snippet: Snippet) {
  if (selectedSnippets.value.find(s => s.id === snippet.id)) {
    selectedSnippets.value = selectedSnippets.value.filter(s => s.id !== snippet.id)
  } else {
    selectedSnippets.value.push(snippet)
  }
}

const searchTerm = ref('')
const open = ref(false)

defineShortcuts({
  meta_k: () => {
    open.value = !open.value
  }
})

const value = ref([])
const groups = ref([
  {
    id: 'snippets',
    label: 'Snippets',
    items: snippets.value?.map(snippet => ({
      label: snippet.name,
      suffix: snippet.description,
      icon: 'i-lucide-box',
      onSelect: () => toggleSelectSnippet(snippet)
    }))
  }
])
</script>

<template>
  <div class="pb-12">
    <Hero />
    <Teleport v-if="selectedSnippets.length" to="#action" defer>
      <ActionButton v-model="selectedSnippets" />
    </Teleport>

    <UContainer class="flex flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto w-full">
      <UModal v-model:open="open">
        <UButton color="neutral" variant="subtle" icon="i-lucide-search" />
        <template #content>
          <LazyUCommandPalette
            v-model="value"
            v-model:search-term="searchTerm"
            multiple
            close
            placeholder="Search for a snippet"
            :groups
            @update:open="open = $event"
          />
        </template>
      </UModal>
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

    <UContainer>
      <Transition name="cross-fade" mode="out-in">
        <div :key="active" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Snippet
            v-for="snippet in filteredSnippets"
            :key="snippet.id"
            :snippet
            :active="!!selectedSnippets.find(s => s.id === snippet.id)"
            @click="toggleSelectSnippet(snippet)"
          />
        </div>
      </Transition>
    </UContainer>
  </div>
</template>

<style scoped>
.cross-fade-enter-active,
.cross-fade-leave-active {
  transition: opacity 300ms ease;
}
.cross-fade-enter-from,
.cross-fade-leave-to {
  opacity: 0;
}
</style>
