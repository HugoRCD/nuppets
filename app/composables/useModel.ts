type Model = {
  id: string
  name: string
  description: string
  requires_better_ai: boolean
}

async function getAvailableAiModels() {
  const res = await fetch('https://raycast.com/api/v1/ai/models')
  const models = await res.json()
  return models.models
}

export function useModels() {
  const model = useCookie<string>('ai-model', { default: () => 'openai-gpt-4o-mini' })

  const modelsCache = useState<Model[]>('ai-models-cache', () => [])

  const { data, status, error } = useAsyncData<Model[]>('ai-models', async () => {
    if (modelsCache.value && modelsCache.value.length > 0) {
      return modelsCache.value
    }
    const models = await getAvailableAiModels()
    modelsCache.value = models
    console.log(models)
    return models
  })

  const availableModels = computed(() =>
    data.value?.map((m) => ({
      label: m.name,
      value: m.id,
      description: m.description ?? '',
      pro: m.requires_better_ai
    })) ?? []
  )

  const isLoading = computed(() => status.value === 'pending')

  return {
    model,
    availableModels,
    isLoading,
    error
  }
}
