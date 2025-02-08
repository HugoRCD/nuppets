<script setup lang="ts">
defineProps<{
  title: string
  description: string
  about: any
}>()
</script>

<template>
  <UPageHero
    :title
    :description
    icon="simple-icons:nuxtdotjs"
    :ui="{ description: 'italic before:content-[open-quote] after:content-[close-quote]', headline: 'mb-0', links: 'mt-4' }"
  >
    <template #headline>
      <div class="flex items-center justify-center gap-2">
        <UIcon name="simple-icons:nuxtdotjs" class="size-10" />
        <USeparator orientation="vertical" class="h-10 w-2" />
        <UIcon name="simple-icons:vuedotjs" class="h-10 w-8" />
      </div>
    </template>

    <template #links>
      <UModal :ui="{ content: 'sm:max-w-3xl' }">
        <UButton label="About" icon="i-lucide-info" />

        <template #content>
          <UCard class="overflow-y-auto">
            <MDC :value="about.content" />
          </UCard>
        </template>
      </UModal>
      <UButton
        label="Contribute"
        icon="i-simple-icons-github"
        color="neutral"
        variant="subtle"
        to="https://github.com/hugorcd/nuppets"
        target="_blank"
      />
    </template>

    <StarsBg />
  </UPageHero>
</template>
