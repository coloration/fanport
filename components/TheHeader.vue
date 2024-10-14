<script lang="ts" setup>

defineOptions({ name: 'the-header' })


</script>

<template>
  <div class="the-header">
    <!-- -->
    <div class="the-header-bg border-horizontal bottom" aria-hidden="true"></div>

    <TheSection class="the-header-content">
      <div class="the-header-logo">
        <a href="/">
          <img src="~/assets/images/logo.svg" width="32" height="32" alt="Docs" />
        </a>
      </div>
      <div class="flex-1">
        <Search />
      </div>
      <!-- <ul class="the-header-nav">
        <li>
          <NuxtLink to="/language/javascript/ecmascript-features">Markdown Demo</NuxtLink>
        </li>
      </ul> -->
      <button @click="toggleDark()" i="carbon-sun dark:carbon-moon"></button>
    </TheSection>
  </div>
</template>

<style lang="postcss">
.the-header {
  @apply h-24 sticky top-0 z-20;
}

.the-header-bg {
  @apply 
    absolute 
    inset-0 
    backdrop-blur 
    -z-10 
    bg-indigo-400/10 
    dark:bg-indigo-800/10 

}

.the-header-logo {
  @apply mr-4;
}

.the-header-nav {
  @apply flex-1;
}

.the-header-content {
  @apply flex justify-between items-center h-full;
}
</style>
