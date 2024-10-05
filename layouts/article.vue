<script lang="ts" setup>

defineOptions({ name: 'layout-article' })


const {
  // Global references
  globals,
  navigation,
  surround,
  page,
  // Computed properties from `page` key
  excerpt,
  toc,
  type,
  layout,
  // Computed properties from `surround` key
  next,
  prev
} = useContent()

</script>

<template>
  <ThePageContainer>
    <TheSection>
      <TheSidebar />
      <!-- <div class="border-vertical right fixed left-0 top-0 bottom-0 w-64 h-screen border-r border-slate-200 md:left-auto md:shrink-0 z-10 md:!opacity-100 md:!block dark:border-slate-800 dark:bg-slate-900">
        <div v-for="(item, i) in navigation" :key="i">
          <div>
            {{ item.title }}
          </div>
          <div class="pl-4" v-for="(sub, j) in item.children" :key="j">
            <TheAccordion :title="sub.title" expand class="mt-1! space-y-1!">
              <div v-for="(deepSub, k) in sub.children" :key="k" class="mt-0!">
                <NuxtLink :to="deepSub._path">{{ deepSub.title }}</NuxtLink>
              </div>
            </TheAccordion>
          </div>
        </div>
      </div> -->
      <div class="md:grow md:pl-64 lg:pr-6 xl:pr-0">
        <div class="pt-16 md:pt-20 pb-8 md:pl-6 lg:pl-12">
          <!-- Page header -->
          <article class="flex xl:space-x-12">

            <!-- Main area -->
            <div class="min-w-0 min-h-100vh flex-1 pb-40">
              <h1 class="mb-6" v-if="page?.title">{{ page.title }}</h1>

              <slot></slot>
            </div>
            <!-- Secondary navigation -->
            <TheToc v-if="toc?.links" :toc="toc.links" />
          </article>
        </div>
      </div>
    </TheSection>
  </ThePageContainer>
</template>

<style lang="postcss">
.layout-article {
  @apply;
}
</style>
