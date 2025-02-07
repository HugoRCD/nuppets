<script setup lang="ts">
const { data: snippets } = await useAsyncData('snippets', () =>
  queryCollection('snippets').all()
)
</script>

<template>
  <UMain>
    <UPage>
      <div class="p-8 flex flex-col items-center justify-center">
        <UIcon name="simple-icons:nuxt-dot-js" class="size-10" />
        <h1 class="mt-8 mb-2 text-4xl sm:text-5xl">
          Nuppets
        </h1>
        <p class="max-w-lg text-center text-xs sm:text-base">
          Discover the story behind the project, its origins, and the journey to where we are today.
        </p>
      </div>

      <UContainer v-if="snippets" class="grid grid-cols-3 gap-4">
        <Snippet
          v-for="(snippet, index) in snippets"
          :key="index"
          :snippet
        />
      </UContainer>
    </UPage>
  </UMain>
</template>
