<script lang="ts" setup>
defineOptions({ name: 'the-page-container' })

const { y } = useWindowScroll({ behavior: 'smooth' }) 

</script>

<template>
  <div class="the-page-container">
    <!-- <DecoWave  /> -->
    <DecoSpotlight />
    <!-- -->
    <TheHeader />
    <slot></slot>
    <TheFooter />
  </div>
</template>

<style lang="postcss">
.the-page-container {
  @apply relative;
}


</style>
