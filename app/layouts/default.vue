<script setup lang="ts">

</script>

<template>
  <div>
    <UHeader>
      <template #title>
        Nuppets
      </template>
      <template #right>
        <UContentSearchButton />
        <UColorModeButton />
      </template>
    </UHeader>
    <UMain>
      <slot />
    </UMain>
  </div>
</template>
