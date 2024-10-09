<template>
  <TheAccordion :expand="open" :title="title">
  <!-- 3rd level -->
    <ul class="mb-3 border-l border-slate-200 dark:border-slate-800">
      <slot />
    </ul>
</TheAccordion>
</template>
<script>
export default {
  name: 'SidebarLinkSubgroup',
  props: ['title', 'open'],
}
</script>