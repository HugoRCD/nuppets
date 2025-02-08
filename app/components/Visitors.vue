<script setup lang="ts">
import NumberFlow from '@number-flow/vue'

const { visitors } = useVisitors()
</script>

<template>
  <div class="fixed z-[999] flex items-center justify-center bottom-2 w-full">
    <NuxtLink
      to="https://github.com/HugoRCD/nuxt-visitors"
      target="_blank"
      class="text-neutral-500 text-xs w-fit flex justify-center items-center gap-2 cursor-pointer hover:text-neutral-200 transition-colors duration-300"
    >
      <span class="relative flex size-2">
        <span
          class="absolute bg-green-50 inline-flex size-full animate-ping rounded-full opacity-75"
        />
        <span
          class="relative bg-green-500 inline-flex size-2 scale-90 rounded-full"
        />
      </span>
      <span class="sm:flex hidden">
        Active visitors:
      </span>
      <NumberFlow
        class="text-sm font-bold font-mono"
        :value="visitors ?? 0"
        continuous
        will-change
      />
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
