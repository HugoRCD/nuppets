<script setup lang="ts">
const { model, availableModels, isLoading } = useModels()
</script>

<template>
  <USelect v-model="model" :items="availableModels" class="sm:w-48" :loading="isLoading">
    <template #item-trailing="{ item }">
      <UBadge v-if="item.pro" color="neutral" variant="subtle" size="sm" class="rounded-full">
        Pro
      </UBadge>
    </template>
  </USelect>
</template>
