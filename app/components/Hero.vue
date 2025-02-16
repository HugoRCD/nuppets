<script setup lang="ts">
import { withoutLeadingSlash } from 'ufo'

const open = ref(false)
const route = useRoute()
const { data: page } = await useAsyncData(`hero-${route.path}`, () =>
  queryCollection('content').where('stem', '=', `${withoutLeadingSlash(route.path)}/index`).first()
)
</script>

<template>
  <UPageHero
    v-if="page"
    :title="page.title"
    :description="page.description"
    icon="simple-icons:nuxtdotjs"
    :ui="{
      description: 'italic before:content-[open-quote] after:content-[close-quote]',
      headline: 'mb-0',
      links: 'mt-4' }"
  >
    <template #headline>
      <div class="flex items-center justify-center gap-2">
        <UIcon name="simple-icons:nuxtdotjs" class="size-10" />
        <USeparator orientation="vertical" class="h-10 w-2" />
        <UIcon name="simple-icons:vuedotjs" class="h-10 w-8" />
      </div>
    </template>

    <template #links>
      <UModal v-if="page.about" v-model:open="open" :ui="{ content: 'sm:max-w-3xl' }">
        <UButton label="About" icon="i-lucide-info" />

        <template #content>
          <UCard class="overflow-y-auto">
            <template #header>
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-info" />
                  <h3 class=" font-semibold">
                    About
                  </h3>
                </div>
                <UButton
                  icon="i-lucide-x"
                  variant="ghost"
                  size="sm"
                  color="neutral"
                  @click="open = false"
                />
              </div>
            </template>
            <MDC :value="page.about" />
          </UCard>
        </template>
      </UModal>
      <UButton
        label="Contribute"
        icon="i-simple-icons-github"
        color="neutral"
        variant="subtle"
        to="https://github.com/hugorcd/nuppets"
        target="_blank"
      />
    </template>

    <StarsBg />
  </UPageHero>
</template>
