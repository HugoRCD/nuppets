<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{
  snippet: Collections['snippets']
  active?: boolean
}>()

const { start, end } = useModifiers()

const keyword = computed(() => {
  return `${start.value}${props.snippet.keyword}${end.value === 'none' ? '' : end.value}`
})
</script>

<template>
  <div
    class="cursor-pointer flex flex-col justify-between gap-1 border-2 hover:border-green-400 rounded-md p-4 transition-colors duration-200 hover:bg-green-50/40 dark:hover:bg-green-950/40"
    :class="[active ? 'border-green-400 bg-green-50/40 dark:bg-green-950/40' : 'border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900']"
  >
    <MDC :value="snippet.code" class="size-full" />
    <div class="flex flex-col gap-4 mt-2">
      <div class="flex flex-col">
        <span class="font-semibold">
          {{ snippet.name }}
        </span>
        <p class="text-xs text-neutral-500">
          {{ snippet.description }}
        </p>
      </div>
      <div>
        <UBadge variant="soft" size="lg" class="px-3 py-0.5">
          {{ keyword }}
        </UBadge>
      </div>
    </div>
  </div>
</template>
