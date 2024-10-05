<script lang="ts" setup>
defineOptions({ name: 'accordion' })

const { expand = false } = defineProps<{
  title: string
  expand?: boolean
}>()

const innerExpand = ref(expand)

</script>
<template>
  <div class="the-accordion">
    <button
      class="flex items-center cursor-pointer w-full text-slate-800 font-medium text-left dark:text-slate-200"
      @click.prevent="innerExpand = !innerExpand"
      :aria-expanded="innerExpand"
    >
      <div class="shrink-0 mr-3">
        <svg class="fill-slate-400 dark:fill-slate-500" :class="{ 'rotate-90': innerExpand }" xmlns="http://www.w3.org/2000/svg" width="8" height="12">
          <path d="m4.586 6-4-4L2 .586 7.414 6 2 11.414.586 10z" />
        </svg>
      </div>
      <span class="the-accordion-title">{{title}}</span>      
    </button>
    <div
      :class="{ 'hidden': !innerExpand }"
    >
      <div class="pl-5 mt-2 space-y-4">
        <slot></slot>
      </div>
    </div>    
  </div>
</template>
<style lang="postcss">
.the-accordion {
  @apply mt-3;
}
</style>
