<script setup lang="ts">
const { resourceType = 'snippet' } = defineProps<{ resourceType?: 'snippet' | 'aiCommand' }>()
const selectedResources = defineModel<any[]>({ required: true })

const { exportToRaycast } = useRaycast()

const handleExport = () => {
  exportToRaycast(selectedResources.value, resourceType)
  selectedResources.value = []
}

const generateResourcesJson = () => {
  return selectedResources.value.map(resource => ({
    name: resource.name,
    text: resourceType === 'snippet' ? removeCodeFences(resource.code) : removeCodeFences(resource.prompt),
    keyword: resource.keyword
  }))
}

const handleDownload = () => {
  const jsonData = JSON.stringify(generateResourcesJson(), null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `nuxt-${resourceType === 'snippet' ? 'snippets' : 'ai-commands'}-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  selectedResources.value = []
}

const { copy, isSupported } = useClipboard()

const handleCopy = async () => {
  const jsonData = JSON.stringify(generateResourcesJson(), null, 2)
  if (isSupported.value) {
    await copy(jsonData)
    toast.success(resourceType === 'snippet' ? 'Snippets copied to clipboard' : 'AI Commands copied to clipboard')
  } else {
    toast.error('Clipboard not supported')
  }
  selectedResources.value = []
}

const items = [
  [
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
  ],
  [
    {
      label: 'Clear selection',
      icon: 'i-lucide-x',
      color: 'error' as const,
      onSelect: () => selectedResources.value = []
    }
  ]
]
</script>

<template>
  <UButtonGroup>
    <UButton
      :label="`Add ${selectedResources.length} ${resourceType === 'snippet' ? 'snippet' : 'AI Command'}${selectedResources.length > 1 ? 's' : ''} to Raycast`"
      icon="custom:raycast"
      color="neutral"
      variant="soft"
      @click="handleExport"
    />
    <UDropdownMenu :items>
      <UButton color="neutral" variant="soft" icon="i-lucide-chevron-down" />
    </UDropdownMenu>
  </UButtonGroup>
</template>
