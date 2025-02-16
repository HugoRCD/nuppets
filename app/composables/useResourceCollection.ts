export async function useResourceCollection<T>(options: {
  collectionName: 'snippets' | 'aiCommands'
  order?: 'ASC' | 'DESC'
  excludeId?: string
  validator?: (data: any[]) => T[]
}) {
  const { collectionName, order = 'ASC', excludeId, validator } = options

  const { data: rawData } = await useAsyncData(collectionName, () => {
    let q = queryCollection(collectionName).order('name', order)
    if (excludeId) {
      q = q.where('id', '<>', excludeId)
    }
    return q.all()
  })

  const resources = ref<T[]>(validator ? validator(rawData.value || []) as T[] : rawData.value as T[])
  const active = ref('all')

  const tags = computed(() => {
    const allTags = resources.value.flatMap((resource: any) => resource.tags || [])
    const uniqueTags = [...new Set(allTags)]
    return ['all', ...uniqueTags.map((tag: string) => tag.toLowerCase().replace(/^\w/, c => c.toUpperCase()))]
  })

  const filteredResources = computed(() => {
    if (active.value === 'all') return resources.value
    return resources.value.filter((resource: any) =>
      (resource.tags || []).some((tag: string) => tag.toLowerCase() === active.value.toLowerCase())
    )
  })

  const selectedResources = ref<T[]>([])

  function toggleSelectResource(resource: any) {
    const exists = selectedResources.value.find((s: any) => s.id === resource.id)
    if (exists) {
      selectedResources.value = selectedResources.value.filter((s: any) => s.id !== resource.id)
    } else {
      selectedResources.value.push(resource)
    }
  }

  const groups = computed(() => [
    {
      id: collectionName,
      label: collectionName[0]?.toUpperCase() + collectionName.slice(1),
      items: resources.value.map((resource: any) => ({
        label: resource.name,
        suffix: resource.description,
        icon: collectionName === 'snippets' ? 'i-lucide-box' : 'i-lucide-command',
        onSelect: () => toggleSelectResource(resource),
      })),
    },
  ])

  return {
    resources,
    active,
    tags,
    filteredResources,
    selectedResources,
    toggleSelectResource,
    groups,
  }
}
