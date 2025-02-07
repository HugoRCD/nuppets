import type { Snippet } from '~/utils/constant'

export const useRaycast = () => {
  const RAYCAST_PROTOCOL = 'raycast://'
  const { modifiers } = useModifiers()

  const generateSnippetQuery = (snippet: Snippet): string => {
    const keyword = `${modifiers.value.start}${snippet.keyword}${modifiers.value.end === 'none' ? '' : modifiers.value.end}`

    const snippetData = {
      name: snippet.name,
      text: snippet.content,
      keyword
    }

    return encodeURIComponent(JSON.stringify(snippetData))
  }

  function exportToRaycast(snippets: Snippet[]) {
    let query = ''
    for (const snippet of snippets) {
      query += `&snippet=${generateSnippetQuery(snippet)}`
    }
    console.log(query)
    window.open(`${RAYCAST_PROTOCOL}snippets/import?${query}`)
  }

  return {
    generateSnippetQuery,
    exportToRaycast
  }
}
