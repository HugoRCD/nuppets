<script setup lang="ts">
import type { Collections } from '@nuxt/content'

// Validate that each snippet has a 'keyword' and that the keyword is unique.
// If a snippet is missing a keyword, it is set to an empty string.
// Duplicate keywords will result in the snippet being excluded.
function validateSnippets(
  snippets: Collections['snippets'][]
): Collections['snippets'][] {
  const seenKeywords = new Map<string, string>() // Maps keyword -> snippet id
  const duplicates: { keyword: string; snippetId: string }[] = []

  // First, ensure every snippet has a 'keyword'
  snippets.forEach(snippet => {
    if (!snippet.keyword) {
      console.warn(`Snippet with id ${snippet.id} has no keyword. Setting it to an empty string.`)
      snippet.keyword = ''
    }
  })

  // Check for unique keywords
  snippets.forEach(snippet => {
    const keyword = snippet.keyword.trim()
    // We consider empty keyword valid and not unique
    if (!keyword) return

    if (seenKeywords.has(keyword)) {
      duplicates.push({ keyword, snippetId: snippet.id })
    } else {
      seenKeywords.set(keyword, snippet.id)
    }
  })

  if (duplicates.length) {
    console.error(
      'Duplicate keywords found: ' +
      duplicates.map(d => `keyword "${d.keyword}" (in snippet ${d.snippetId})`).join(', ')
    )
    // Filter out snippets with duplicate keywords (keeping only the first occurrence)
    return snippets.filter(snippet => {
      const keyword = snippet.keyword.trim()
      if (!keyword) return true
      return seenKeywords.get(keyword) === snippet.id
    })
  }

  return snippets
}

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('content').first()
})

const { data: rawSnippets } = await useAsyncData('snippets', () =>
  queryCollection('snippets').order('name', 'ASC').all()
)

// Validate and process snippets
const snippets = ref<Collections['snippets'][]>(
  validateSnippets(rawSnippets.value || [])
)

const active = ref('all')

// Safely derive tags from snippets. Avoid errors if tags is missing.
const tags = computed(() => {
  const allTags = snippets.value?.flatMap(snippet => snippet.tags || []) || []
  const uniqueTags = [...new Set(allTags)]
  return [
    'all',
    ...uniqueTags.map(tag =>
      tag.toLowerCase().replace(/^\w/, c => c.toUpperCase())
    )
  ]
})

const filteredSnippets = computed(() => {
  if (active.value === 'all') return snippets.value
  return snippets.value?.filter(snippet =>
    (snippet.tags || []).some(tag =>
      tag.toLowerCase() === active.value.toLowerCase()
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

const searchTerm = ref('')
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
  <div v-if="page" class="pb-12">
    <Hero v-bind="page" />
    <Teleport v-if="selectedSnippets.length" to="#action" defer>
      <ActionButton v-model="selectedSnippets" />
    </Teleport>
    <UContainer class="flex flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto w-full">
      <UModal>
        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide-search"
        />

        <template #content>
          <LazyUCommandPalette
            v-model="value"
            v-model:search-term="searchTerm"
            multiple
            placeholder="Search for a snippet"
            :groups
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
    <UContainer class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Snippet
        v-for="(snippet, index) in filteredSnippets"
        :key="index"
        :snippet
        :active="!!selectedSnippets.find(s => s.id === snippet.id)"
        @click="toggleSelectSnippet(snippet)"
      />
    </UContainer>
  </div>
</template>
