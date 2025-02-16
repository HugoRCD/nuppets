<script setup lang="ts">
const { data: rawSnippets } = await useAsyncData('snippets', () =>
  queryCollection('snippets').order('name', 'ASC').all()
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
    <NuxtLink to="/snippets">
      Snippets
    </NuxtLink>
    <NuxtLink to="/ai-commands">
      AI Commands
    </NuxtLink>
  </div>
</template>
