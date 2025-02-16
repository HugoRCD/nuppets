<script setup lang="ts">
const defaultItem = { label: 'Snippets', to: '/snippets' }
const cookieKey = 'last-item'
const lastItem = useCookie(cookieKey, {
  default: () => defaultItem
})
const selected = ref(lastItem.value)
const items = [
  { label: 'Snippets', to: '/snippets' },
  { label: 'AI Commands', to: '/ai-commands' }
]
const route = useRoute()

function updateSelectedFromRoute() {
  const found = items.find(item => item.to === route.path)
  selected.value = found || defaultItem
  lastItem.value = selected.value
}

watch(() => route.path, () => {
  updateSelectedFromRoute()
}, { immediate: true })

function selectItem(item: typeof selected.value) {
  selected.value = item
  lastItem.value = item
}
</script>

<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="items.map(item => ({ ...item, onSelect: () => selectItem(item) }))"
    :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-0' }"
    size="xs"
  >
    <UButton
      :label="selected.label"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      class="-mb-[6px] font-semibold rounded-full truncate"
      :class="[open && 'bg-[var(--ui-primary)]/15']"
      :ui="{ label: 'max-sm:hidden', trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ') }"
    />
  </UDropdownMenu>
</template>
