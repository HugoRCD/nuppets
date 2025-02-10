// Validate that each snippet has a 'keyword' and that the keyword is unique.
// If a snippet is missing a keyword, it is set to an empty string.
// Duplicate keywords will result in the snippet being excluded.

export function validateSnippets(
  snippets: Snippet[]
): Snippet[] {
  const seenKeywords = new Map<string, string>() // Maps keyword -> snippet id
  const duplicates: { keyword: string; snippetId: string }[] = []

  // First, ensure every snippet has a 'keyword'
  snippets.forEach(snippet => {
    if (!snippet.keyword) {
      console.warn(`Snippet with id ${snippet.id} has no keyword. Setting it to an empty string.`)
      snippet.keyword = ''
    }
  })

  // Check for unique keywords
  snippets.forEach(snippet => {
    const keyword = snippet.keyword.trim()
    // We consider empty keyword valid and not unique
    if (!keyword) return

    if (seenKeywords.has(keyword)) {
      duplicates.push({ keyword, snippetId: snippet.id })
    } else {
      seenKeywords.set(keyword, snippet.id)
    }
  })

  if (duplicates.length) {
    console.error(
      'Duplicate keywords found: ' +
      duplicates.map(d => `keyword "${d.keyword}" (in snippet ${d.snippetId})`).join(', ')
    )
    // Filter out snippets with duplicate keywords (keeping only the first occurrence)
    return snippets.filter(snippet => {
      const keyword = snippet.keyword.trim()
      if (!keyword) return true
      return seenKeywords.get(keyword) === snippet.id
    })
  }

  return snippets
}
