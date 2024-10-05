<template>
  <li class="mt-3">
    <TheAccordion :expand="open" :title="title">
    <!-- 3rd level -->
      <ul class="mb-3 ml-1 border-l border-slate-200 dark:border-slate-800">
        <slot />
      </ul>
  </TheAccordion>
  </li>
</template>
<script>
export default {
  name: 'SidebarLinkSubgroup',
  props: ['title', 'open'],
}
</script>