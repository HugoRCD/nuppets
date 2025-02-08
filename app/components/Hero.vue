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
      <UIcon name="simple-icons:nuxtdotjs" class="size-10" />
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
    </template>

    <StarsBg />
  </UPageHero>
</template>
