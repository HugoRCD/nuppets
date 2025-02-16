import type { Collections } from '@nuxt/content'

export const modifiersList = ['!', ':', '_', '__', '-', '@', '@@', '$', ';', ';;', '/', '//', 'none'] as const

export type Modifier = (typeof modifiersList)[number];

export type Modifiers = {
  start: Modifier
  end: Modifier
}

export type Snippet = Collections['snippets']

export type AICommand = Collections['aiCommands']
