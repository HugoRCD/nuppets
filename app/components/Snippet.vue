<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const RAYCAST_PROTOCOL = 'raycast://'

const props = defineProps<{
  snippet: Collections['snippets']
}>()

const { modifiers } = useModifiers()

const keyword = computed(() => {
  return `${modifiers.value.start}${props.snippet.keyword}${modifiers.value.end === 'none' ? '' : modifiers.value.end}`
})

const deeplink = computed(() => {
  const snippetData = {
    name: props.snippet.name,
    text: props.snippet.content,
    keyword: keyword.value
  }

  return `${RAYCAST_PROTOCOL}snippets/import?snippet=${encodeURIComponent(JSON.stringify(snippetData))}`
})
</script>

<template>
  <NuxtLink :to="deeplink" class="cursor-pointer flex flex-col justify-between gap-1 border-2 border-transparent hover:border-green-400 rounded-md p-4 transition-colors duration-200 bg-neutral-900 hover:bg-green-950/40">
    <MDC :value="snippet.content" />
    <div class="flex flex-col gap-2">
      <span class="text-lg font-semibold">
        {{ snippet.name }}
      </span>
      <div>
        <UBadge variant="soft" size="lg" class="px-3 py-0.5">
          {{ keyword }}
        </UBadge>
      </div>
    </div>
  </NuxtLink>
</template>
