<script lang="ts" setup>

defineOptions({ name: 'deco-cube' })

const { color = 'indigo' } = defineProps<{
  color?: 'rose' | 'pink' | 'fuchsia' | 'purple' | 'violet' | 'indigo' | 'blue' | 'sky' | 'cyan' | 'teal' | 'emerald' | 'green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'red'
}>()

// 

</script>

<template>
  
  <svg   class="deco-cube" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path :class="`fill-${color}-400`" d="M19.888 7.804a.88.88 0 0 0-.314-.328l-7.11-4.346a.889.889 0 0 0-.927 0L4.426 7.476a.88.88 0 0 0-.314.328L12 12.624l7.888-4.82Z" />
    <path class="fill-white dark:fill-slate-800" d="M4.112 7.804a.889.889 0 0 0-.112.43v7.892c0 .31.161.597.426.758l7.11 4.346c.14.085.3.13.464.13v-8.736l-7.888-4.82Z" />
    <path :class="`fill-${color}-600`" d="M19.888 7.804c.073.132.112.28.112.43v7.892c0 .31-.161.597-.426.758l-7.11 4.346c-.14.085-.3.13-.464.13v-8.736l7.888-4.82Z" />
  </svg>
  <!-- 
    fill-rose-400 fill-rose-600
    fill-pink-400 fill-pink-600
    fill-fuchsia-400 fill-fuchsia-600
    fill-purple-400 fill-purple-600
    fill-violet-400 fill-violet-600
    fill-indigo-400 fill-indigo-600
    fill-blue-400 fill-blue-600
    fill-sky-400 fill-sky-600
    fill-cyan-400 fill-cyan-600
    fill-teal-400 fill-teal-600
    fill-emerald-400 fill-emerald-600
    fill-green-400 fill-green-600
    fill-lime-400 fill-lime-600
    fill-yellow-400 fill-yellow-600
    fill-amber-400 fill-amber-600
    fill-orange-400 fill-orange-600
    fill-red-400 fill-red-600
    fill-indigo-400
    fill-pink-400 fill-pink-600
   -->
</template>

<style lang="postcss">
.deco-cube {
  @apply shrink-0;
}
</style>
