<template>
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
        to="https://github.com/hugorcd/nuppets"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>
