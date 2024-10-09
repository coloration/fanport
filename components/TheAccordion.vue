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
      class="the-accordion-head"
      @click.prevent="innerExpand = !innerExpand"
      :aria-expanded="innerExpand"
    >
      <div class="shrink-0 mr-2">
        <IconArrow :class="{ 'rotate-90': innerExpand }" />
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
  @apply;
}

.the-accordion-head {
  @apply 
    flex items-center 
    cursor-pointer 
    w-full 
    text-slate-800 
    font-medium 
    text-left 
    dark:text-slate-200
    
    ;
}

.the-accordion-title {
  @apply pl-1 py-.5 rounded transition-colors hover:bg-indigo-200/50 dark:hover:bg-indigo-800/40 flex-1;
}
</style>
