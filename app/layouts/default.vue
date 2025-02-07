<script setup lang="ts">

</script>

<template>
  <div>
    <UHeader>
      <template #title>
        <div class="flex items-center gap-2">
          <UIcon name="simple-icons:nuxtdotjs" class="size-8" />
          Nuppets
        </div>
      </template>
      <template #right>
        <Modifiers />
        <UContentSearchButton />
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <slot />
    </UMain>
    <USeparator />
    <UFooter>
      <template #left>
        <span class="text-xs font-mono italic tracking-tight text-neutral-500">
          © {{ new Date().getFullYear() }} - Made by <NuxtLink to="https://hrcd.fr/" class="text-neutral-400 hover:text-neutral-200">
            HugoRCD
          </NuxtLink>
        </span>
      </template>

      <template #right>
        <UButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          to="https://dub.sh/hrcd-x"
          target="_blank"
          aria-label="X"
        />
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://git.new/hugorcd"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </UFooter>
  </div>
</template>
