const modifiersList = ['!', '@', '@@', 'none']

export function useModifiers() {
  const modifiers = useState('modifiers', () => {
    return {
      start: '!',
      end: ''
    }
  })

  return {
    modifiers
  }
}
