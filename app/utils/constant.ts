import type { Collections } from '@nuxt/content'

export const modifiersList = ['!', ':', '_', '__', '-', '@', '@@', '$', ';', ';;', '/', '//', 'none'] as const

export type Modifier = (typeof modifiersList)[number];

export type Modifiers = {
  start: Modifier
  end: Modifier
}

export type Snippet = Collections['snippets']

export type AICommand = Collections['aiCommands']

export type Model =
  | 'openai-gpt-4'
  | 'openai-gpt-4-turbo'
  | 'openai-gpt-4o'
  | 'openai-gpt-4o-mini'
  | 'anthropic-claude-haiku'
  | 'anthropic-claude-opus'
  | 'anthropic-claude-sonnet'
  | 'perplexity-llama-3-sonar-large-32k-online'
  | 'perplexity-llama-3-sonar-small-32k-online'
  | 'groq-llama-3.1-70b-versatile'
  | 'groq-llama-3.1-8b-instant'
  | 'groq-llama3-70b-8192'
  | 'groq-mixtral-8x7b-32768'
