<script lang="ts" setup>
import { ref } from 'vue'

const searchModalOpen = ref(false);
</script>
<template>
<div class="search">
  <button
    class="search-container"
    :class="{ 'bg-slate-200': searchModalOpen }"
    @click.stop="searchModalOpen = true"
    aria-controls="search-modal"                
  >
    <div class="flex items-center justify-center">
      <!-- search icon -->
      <svg class="w-4 h-4 fill-slate-500 mr-3 shrink-0 dark:fill-slate-400" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z" />
      </svg>
      <span>Search<span class="hidden sm:inline"> for anything</span>…</span>
    </div>
    <div class="search-shortcut">/</div>
  </button>
  <div>
    <!-- Search modal -->
    <SearchModal 
      id="search-modal"
      searchId="search"
      :modalOpen="searchModalOpen"
      @open-modal="searchModalOpen = true" 
      @close-modal="searchModalOpen = false" />
  </div>
</div>
</template>
<style lang="postcss">
.search {
  @apply;
}

.search-container {
  font-family: lobster;
  @apply w-full sm:w-[380px] text-[15px] bg-white text-slate-400 inline-flex items-center justify-between leading-5 pl-3 pr-2 py-[7px] rounded border border-slate-200 hover:border-slate-300 shadow-sm whitespace-nowrap dark:text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600;
}

.search-shortcut {
  @apply flex items-center justify-center h-5 w-5 font-medium text-slate-500 rounded border border-slate-200 shadow-sm ml-3 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600;
}
</style>