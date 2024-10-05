<script lang="ts" setup>
defineOptions({ name: 'the-title' })

const { level = 3 } =defineProps<{
  level?: number | string
}>()

</script>
<template>
<component :is="`h${level}`" class="the-title">
  <slot></slot>

  <slot name="rest"></slot>
</component>
</template>
<style lang="postcss">
.the-title {
  @apply flex justify-between items-center cursor-pointer p-1 rounded-sm hover:bg-violet-100 hover:dark:bg-violet-900
    transition;
}
</style>