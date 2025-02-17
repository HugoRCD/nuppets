<script setup lang="ts">
const route = useRoute()
const items = [
  { label: 'Snippets', to: '/snippets' },
  { label: 'AI Commands', to: '/ai-commands' }
]
</script>

<template>
  <UHeader>
    <template #title>
      <span class="font-grotesque text-2xl font-bold">
        Nuppets
      </span>
    </template>

    <UNavigationMenu :items variant="link" />

    <template #right>
      <Modifiers v-if="route.path === '/snippets'" />
      <Models v-if="route.path === '/ai-commands'" />
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items variant="link" orientation="vertical" />
    </template>
  </UHeader>
</template>
