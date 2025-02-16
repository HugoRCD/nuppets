import { defineCollection, z } from '@nuxt/content'

export const collections = {
  snippets: defineCollection({
    type: 'data',
    source: 'snippets/*.yml',
    schema: z.object({
      name: z.string().nonempty(),
      code: z.object({}),
      description: z.string().nonempty(),
      keyword: z.string().nonempty(),
      tags: z.array(z.string().nonempty()).optional(),
    })
  }),
  aiCommands: defineCollection({
    type: 'data',
    source: 'ai-commands/*.yml',
    schema: z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      prompt: z.object({}),
      model: z.string().optional(),
      icon: z.string().optional(),
      creativity: z.string().optional(),
      tags: z.array(z.string().nonempty()).optional(),
    })
  }),
  content: defineCollection({
    type: 'data',
    source: '**/*.yml',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      about: z.object({}),
    })
  })
}
