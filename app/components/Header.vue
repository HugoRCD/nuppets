<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <Logo class="w-auto h-6" />
      </NuxtLink>
      <TemplateMenu />
    </template>

    <div id="action" />

    <template #right>
      <Modifiers v-if="route.path === '/snippets'" />
      <Models v-if="route.path === '/ai-commands'" />
      <UColorModeButton />
    </template>
  </UHeader>
</template>
