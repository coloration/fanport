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
    <TheSection class="bg-red">
      <TheSidebar />
      <div class="md:grow md:pl-64 lg:pr-6 xl:pr-0 bg-red">
        <div class="pt-16 md:pt-20 pb-8 md:pl-6 lg:pl-12">
          <!-- Page header -->
          <article class="flex xl:space-x-12">

            <!-- Main area -->
            <div class="layout-article-area">
              <h1 class="mb-6" v-if="page?.title">{{ page.title }}4</h1>

              <slot></slot>

              123
              <br>
              {{ prev }}
              {{ next }}
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

  > div {
    @apply space-y-2 leading-6;

    & p {
      @apply space-x-1;
    }
  }
}


</style>
