<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  snippet: Collections['snippets']
}>()

const { modifiers } = useModifiers()

const keyword = computed(() => {
  return `${modifiers.value.start}${props.snippet.keyword}${modifiers.value.end}`
})
</script>

<template>
  <UPageCard variant="soft" class="flex flex-col gap-1">
    <span>{{ snippet.name }}</span>
    <MDC :value="snippet.content" />
    <div>
      <UBadge variant="soft">
        {{ keyword }}
      </UBadge>
    </div>
  </UPageCard>
</template>
