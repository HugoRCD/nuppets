<script setup lang="ts">
definePageMeta({
  title: 'Snippets',
  description: 'A universal hub for Nuxt and Vue snippets - Available for Raycast and more coming soon'
})

defineShortcuts({
  meta_k: () => {
    open.value = !open.value
  }
})

const value = ref([])
const open = ref(false)
const searchTerm = ref('')

const {
  active,
  tags,
  filteredResources,
  selectedResources,
  toggleSelectResource,
  groups,
} = await useResourceCollection<Snippet>({
  collectionName: 'snippets',
  excludeId: 'snippets/snippets/index.yml',
  validator: validateSnippets,
})
</script>

<template>
  <div class="pb-12">
    <Hero />
    <Teleport v-if="selectedResources.length" to="#action" defer>
      <ActionButton v-model="selectedResources" />
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
            v-for="snippet in filteredResources"
            :key="snippet.id"
            :snippet
            :active="!!selectedResources.find(s => s.id === snippet.id)"
            @click="toggleSelectResource(snippet)"
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
