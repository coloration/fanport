<script lang="ts" setup>
defineOptions({ name: 'the-section' })


</script>

<template>
  <div class="the-section">
    <!-- -->
    <slot></slot>
  </div>
</template>

<style lang="postcss">
.the-section {
  @apply max-w-7xl mx-auto px-4 sm:px-6;
}
</style>
