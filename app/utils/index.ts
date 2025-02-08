export function removeCodeFences(code: any) {
  let cleaned = code
  const startRegex = /^```[\w-]*\s*\n?/
  cleaned = cleaned.replace(startRegex, '')
  const endRegex = /\n?\s*```\s*$/
  cleaned = cleaned.replace(endRegex, '')

  return cleaned.trim()
}
