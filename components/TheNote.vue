<script lang="ts" setup>

defineOptions({ name: 'the-note' })


</script>

<template>
<div class="the-note">
  <div class="flex items-center">
    <svg class="fill-teal-500 shrink-0 mr-4" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8ZM7 11.4 3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4Z" />
    </svg>
    <p>
      <slot></slot>
    </p>
  </div>
</div>
</template>

<style lang="postcss">
.the-note {
  @apply text-sm p-4 bg-slate-50 border border-slate-200 rounded dark:bg-slate-800 dark:border-slate-700;
}
</style>
