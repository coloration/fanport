<template>
  <TheAccordion :expand="open" :title="title">
  <!-- 3rd level -->
    <ul class="mb-2 pl-2 border-vertical left">
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