import type { AICommand } from '~/utils/constant'

export const useRaycast = () => {
  const RAYCAST_PROTOCOL = 'raycast://'
  const { start, end } = useModifiers()
  const { model } = useModels()

  const generateSnippetQuery = (snippet: Snippet): string => {
    const keyword = `${start.value}${snippet.keyword}${end.value === 'none' ? '' : end.value}`
    const snippetData = {
      name: snippet.name,
      text: removeCodeFences(snippet.code),
      keyword
    }
    return encodeURIComponent(JSON.stringify(snippetData))
  }

  const generateAICommandQuery = (aiCommand: AICommand): string => {
    const commandData = {
      title: aiCommand.name,
      prompt: removeCodeFences(aiCommand.prompt),
      model: model.value,
    }
    console.log(commandData)
    return encodeURIComponent(JSON.stringify(commandData))
  }

  function exportToRaycast(resources: any[], resourceType: 'snippet' | 'aiCommand') {
    let query = ''
    for (const resource of resources) {
      if (resourceType === 'snippet') {
        query += `&snippet=${generateSnippetQuery(resource)}`
      } else {
        query += `&prompts=${generateAICommandQuery(resource)}`
      }
    }
    const type = resourceType === 'snippet' ? 'snippets' : 'prompts'
    window.open(`${RAYCAST_PROTOCOL}${type}/import?${query}`)
  }

  return {
    generateSnippetQuery,
    generateAICommandQuery,
    exportToRaycast,
  }
}
