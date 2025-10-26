<script setup lang="ts">
import type { Collections } from '@nuxt/content'

defineProps<{
  aiCommand: Collections['aiCommands']
  active?: boolean
}>()
</script>

<template>
  <div
    class="select-none cursor-pointer flex flex-col justify-between gap-1 border-2 hover:border-primary rounded-md p-4 transition-colors duration-200 hover:bg-green-50/40 dark:hover:bg-green-950/40"
    :class="[active ? 'border-primary bg-green-50/40 dark:bg-green-950/40' : 'border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900']"
  >
    <MDC
      :value="aiCommand.prompt"
      class="size-full overflow-y-auto max-h-[250px] *:my-0"
    />
    <div class="size-full flex flex-col gap-4 mt-2">
      <div class="flex flex-col">
        <span class="font-semibold">
          {{ aiCommand.name }}
        </span>
        <MDC :value="aiCommand.description" class="text-xs text-neutral-500" />
      </div>
    </div>
  </div>
</template>
