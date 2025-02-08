import type { Modifiers } from '~/utils/constant'

export function useModifiers() {
  const start = useCookie('start', { default: () => '!' })
  const end = useCookie('end', { default: () => 'none' })

  return {
    start,
    end
  }
}
