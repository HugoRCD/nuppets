<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <UPageHero :title :description icon="simple-icons:nuxtdotjs" :ui="{ description: 'italic before:content-[open-quote] after:content-[close-quote]', headline: 'mb-0' }">
    <template #headline>
      <UIcon name="simple-icons:nuxtdotjs" class="size-10" />
    </template>

    <StarsBg />
  </UPageHero>
</template>
