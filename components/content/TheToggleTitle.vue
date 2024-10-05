<script lang="ts" setup>
defineOptions({ name: 'the-toggle-title' })

const { level = 3, expand = false } = defineProps<{
  title?: string,
  level?: number | string,
  expand?: boolean
}>()

const [innerExpand, toggleExpand] = useToggle(expand)

</script>
<template>
<div class="the-toggle-title">
  <TheTitle 
    @click="toggleExpand()" 
    :level="level">{{ title }}</TheTitle>

  <div v-show="innerExpand">
    <slot></slot>
  </div>
</div>
</template>
<style lang="postcss">
.the-toggle-title {
  @apply;
}
</style>