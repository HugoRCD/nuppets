export function useModifiers() {
  const start = useCookie<Modifier>('start', { default: () => '!' })
  const end = useCookie<Modifier>('end', { default: () => 'none' })

  return {
    start,
    end
  }
}
