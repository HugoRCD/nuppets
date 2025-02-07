import { defineCollection, z } from '@nuxt/content'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])

const baseSchema = {
  title: z.string().nonempty(),
  description: z.string().nonempty()
}

const linkSchema = z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional(),
  size: sizeEnum,
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum,
  variant: variantEnum
})

const sectionSchema = z.object({
  headline: z.string().optional(),
  ...baseSchema
})

const sectionWithLinksSchema = sectionSchema.extend({
  links: z.array(linkSchema)
})

export const collections = {
  snippets: defineCollection({
    type: 'data',
    source: 'snippets/*.yml',
    schema: z.object({
      name: z.string().nonempty(),
      content: z.string().nonempty(),
      description: z.string().nonempty(),
      keyword: z.string().nonempty(),
      tags: z.array(z.string().nonempty()).optional(),
    })
  }),
  content: defineCollection({
    source: 'index.yml',
    type: 'data',
    schema: z.object({
      ...baseSchema,
      hero: sectionWithLinksSchema,
      features: sectionSchema,
      sections: z.array(
        sectionSchema.extend({
          links: z.array(linkSchema),
          reverse: z.boolean().optional(),
          code: z.string().optional()
        })
      ),
      cta: sectionWithLinksSchema,
      faq: sectionSchema.extend({
        items: z.array(z.object({
          label: z.string().nonempty(),
          content: z.string().nonempty(),
          defaultOpen: z.boolean().optional()
        }))
      })
    })
  })
}
