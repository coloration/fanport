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
      <div class="md:grow md:pl-64 lg:pr-6 xl:pr-0">
        <div class="pt-16 md:pt-20 pb-8 md:pl-6 lg:pl-12">
          <!-- Page header -->
          <article class="flex xl:space-x-12">

            <!-- Main area -->
            <div class="layout-article-area">
              <h1 class="mb-6" v-if="page?.title">{{ page.title }}</h1>

              <slot></slot>

              <div class="pt-40 border-horizontal bottom w-full"></div>

              <div class="border-horizontal bottom sm:flex items-center justify-between py-8 space-y-6 sm:space-y-0 sm:space-x-4">
                <!-- Prev link -->
                <div v-if="prev" class="sm:w-1/2 sm:flex flex-col items-start">
                  <div>
                    <div class="text-xs font-[650] text-blue-600 uppercase mb-1">Prev</div>
                    <div>
                      <NuxtLink class="text-slate-800 font-[650] flex items-center dark:text-slate-200"
                        :to="prev._path">
                        <svg class="fill-slate-400 shrink-0 mr-2 rotate-180 dark:fill-slate-500" width="8" height="10"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 2 2.414.586 6.828 5 2.414 9.414 1 8l3-3z" />
                        </svg>
                        <span>{{ prev.title }}</span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                <!-- Next link -->
                <div v-if="next" class="sm:w-1/2 sm:flex flex-col items-end ml-auto">
                  <div>
                    <div class="text-xs font-[650] text-blue-600 uppercase mb-1 text-right">Next</div>
                    <div>
                      <NuxtLink class="text-slate-800 font-[650] flex items-center dark:text-slate-200"
                        :to="next._path">
                        <span>{{ next.title }}</span>
                        <svg class="fill-slate-400 shrink-0 ml-2 dark:fill-slate-500" width="8" height="10"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 2 2.414.586 6.828 5 2.414 9.414 1 8l3-3z" />
                        </svg>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
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

.layout-article-area {
  @apply min-w-0 min-h-100vh flex-1 pb-40;

  >div {
    @apply space-y-2 leading-6;

    & p {
      @apply space-x-1;
    }
  }
}
</style>
