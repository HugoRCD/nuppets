<script setup lang="ts">
definePageMeta({
  title: 'AI Commands',
  description: 'Boost your productivity with powerful AI commands'
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
} = await useResourceCollection<AICommand>({
  collectionName: 'aiCommands',
  excludeId: 'aiCommands/ai-commands/index.yml',
})
</script>

<template>
  <div class="pb-12">
    <Hero />
    <Teleport v-if="selectedResources.length" to="#action" defer>
      <ActionButton v-model="selectedResources" resource-type="aiCommand" />
    </Teleport>

    <UContainer class="flex flex-wrap justify-center gap-4 mb-6 max-w-4xl mx-auto w-full">
      <UModal v-model:open="open">
        <UButton color="neutral" variant="soft" icon="i-lucide-search" />
        <template #content>
          <LazyUCommandPalette
            v-model="value"
            v-model:search-term="searchTerm"
            multiple
            close
            placeholder="Search for a AI command"
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
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AiCommand
          v-for="aiCommand in filteredResources"
          :key="aiCommand.id"
          :ai-command
          :active="!!selectedResources.find(s => s.id === aiCommand.id)"
          @click="toggleSelectResource(aiCommand)"
        />
      </div>
    </UContainer>
  </div>
</template>
