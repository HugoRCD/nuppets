<script setup lang="ts">
import { modifiersList } from '~/utils/constant'

const { modifiers } = useModifiers()

const items = ref(modifiersList.map(modifier => ({
  label: modifier,
  value: modifier
})))
</script>

<template>
  <UModal title="Configure modifiers" description="Modifiers are used as prefixes and suffixes for your snippets keyword. If you wish to customize them, you can do so below.">
    <UButton label="Modifiers" color="neutral" />

    <template #body>
      <div class="flex items-center justify-between gap-2">
        <UFormField label="Start modifier" class="flex items-center gap-2">
          <USelect v-model="modifiers.start" :items />
        </UFormField>
        <UFormField label="End modifier" class="flex items-center gap-2">
          <USelect v-model="modifiers.end" :items />
        </UFormField>
      </div>
    </template>
  </UModal>
</template>
