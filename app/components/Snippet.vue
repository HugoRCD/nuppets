<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  snippet: Collections['snippets']
}>()
</script>

<template>
  <UPageCard variant="soft" class="flex flex-col gap-1">
    <span>{{ snippet.name }}</span>
    <MDC :value="snippet.content" />
    <div>
      <UBadge variant="soft">
        {{ snippet.keyword }}
      </UBadge>
    </div>
  </UPageCard>
</template>
