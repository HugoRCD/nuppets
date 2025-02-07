<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="relative h-96 flex flex-col items-center justify-center">
    <StarsBg />
    <UIcon name="simple-icons:nuxtdotjs" class="size-10" />
    <h1 class="text-4xl sm:text-5xl">
      {{ title }}
    </h1>
    <p class="max-w-lg text-center text-xs sm:text-base">
      {{ description }}
    </p>
  </div>
</template>
