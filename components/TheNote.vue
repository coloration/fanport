<script lang="ts" setup>

defineOptions({ name: 'the-note' })


</script>

<template>
<div class="the-note">
  <div class="flex items-center">
    <svg class="fill-purple-500 shrink-0 mr-4" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1Zm1-3H7V4h2v5Z" />
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

  & li {
    @apply list-none;
  }
}
</style>
