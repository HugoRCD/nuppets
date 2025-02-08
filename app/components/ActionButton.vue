<script setup lang="ts">
const selectedSnippets = defineModel<Snippet[]>({ required: true })

const { exportToRaycast } = useRaycast()

const handleExport = () => {
  exportToRaycast(selectedSnippets.value)
}

const generateSnippetsJson = () => {
  return selectedSnippets.value.map(snippet => ({
    name: snippet.name,
    text: removeCodeFences(snippet.code),
    keyword: snippet.keyword
  }))
}

const handleDownload = () => {
  const jsonData = JSON.stringify(generateSnippetsJson(), null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `nuxt-snippets-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const { copy, isSupported } = useClipboard()

const handleCopy = async () => {
  const jsonData = JSON.stringify(generateSnippetsJson(), null, 2)

  if (isSupported.value) {
    await copy(jsonData)
    toast.success('Snippets copied to clipboard')
  } else {
    toast.error('Clipboard not supported')
  }
}

const items = [
  {
    label: 'Download JSON',
    icon: 'i-heroicons-arrow-down-tray',
    onSelect: handleDownload
  },
  {
    label: 'Copy JSON',
    icon: 'i-heroicons-clipboard-document',
    onSelect: handleCopy
  }
]
</script>

<template>
  <UButtonGroup>
    <UButton
      :label="`Add ${selectedSnippets.length} snippet${selectedSnippets.length > 1 ? 's' : ''} to Raycast`"
      icon="custom:raycast"
      color="neutral"
      variant="soft"
      @click="handleExport"
    />
    <UDropdownMenu :items>
      <UButton
        color="neutral"
        variant="soft"
        icon="i-lucide-chevron-down"
      />
    </UDropdownMenu>
  </UButtonGroup>
</template>
