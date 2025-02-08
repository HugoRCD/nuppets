import type { Snippet } from '~/utils/constant'

export const useRaycast = () => {
  const RAYCAST_PROTOCOL = 'raycast://'
  const { start, end } = useModifiers()

  const generateSnippetQuery = (snippet: Snippet): string => {
    const keyword = `${start.value}${snippet.keyword}${end.value === 'none' ? '' : end.value}`

    const snippetData = {
      name: snippet.name,
      text: removeCodeFences(snippet.code),
      keyword
    }

    return encodeURIComponent(JSON.stringify(snippetData))
  }

  function exportToRaycast(snippets: Snippet[]) {
    let query = ''
    for (const snippet of snippets) {
      query += `&snippet=${generateSnippetQuery(snippet)}`
    }
    window.open(`${RAYCAST_PROTOCOL}snippets/import?${query}`)
  }

  return {
    generateSnippetQuery,
    exportToRaycast
  }
}
