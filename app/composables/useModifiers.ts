import type { Modifiers } from '~/utils/constant'

export function useModifiers() {
  const modifiers = useState<Modifiers>('modifiers', () => {
    return {
      start: '!',
      end: 'none'
    }
  })

  return {
    modifiers
  }
}
