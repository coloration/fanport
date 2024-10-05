<script lang="ts" setup>

defineOptions({ name: 'the-toc' })

interface TocItem {
  id: string, depth: number, text: string, children?: TocItem[]
}

const { toc = [] } = defineProps<{
  toc: TocItem[]
}>()

const activeIds = ref<string[]>([])

const { y } = useWindowScroll({ behavior: 'smooth' }) 

function getTargetTop(id: string) {
  const target = document.getElementById(id)
  if (!target) return -1

  return target.offsetTop - 5 * 16
}


function handleClick(id: string) {
  const yOffset = getTargetTop(id)
  if (yOffset === -1) return 
  y.value = yOffset
}


watchDebounced(y, () => { 
  toc.flat()
  console.log('changed!', toc) 
}, { debounce: 300, maxWait: 500 },
)


</script>

<template>
  <nav class="the-toc">
    <div class="fixed bottom-0 h-[calc(100vh-4rem)] w-48 overflow-y-auto pt-32 pb-8 no-scrollbar">
      <div class="border-vertical left">
        <div class="toc-col-title">
          Table of Contents
        </div>
        <ul class="toc-col-list">
          <li v-for="(item, i) in toc" :key="i" class="toc-row">
            <!-- The data-scrollspy-link attribute makes the scrollspy work -->
            <span
              @click="handleClick(item.id)"
              class="toc-link">
              {{ item.text }}
            </span>
            <ul v-if="item.children" class="pl-2">
              <li v-for="(subItem, j) in item.children" :key="j"  class="toc-row">
                <a 
                  data-scrollspy-link 
                  class="toc-link"
                  :href="`#${subItem.id}`">
                  {{ subItem.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- <div class="toc-col-title">
          Community
        </div> -->
        <div class="toc-divider"></div>
        <div class="pl-4" v-show="y > 500">
          <button @click="y = 0" class="cursor-pointer text-center px-4 text-slate-500 border-1 border-solid border-slate-200 rounded text-sm">
            Go Top
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
.the-toc {
  @apply hidden xl:block w-48 shrink-0;
}

.anchor-top {
  @apply cursor-pointer;
}

.toc-link {
  @apply 
    relative 
    block 
    py-1.5 
    text-nowrap 
    transition-gpu
    text-slate-600
    cursor-pointer
    dark:text-slate-400
    hover:text-slate-900
    dark:hover:text-slate-300 


    before:absolute 
    before:-left-px 
    before:top-2 
    before:bottom-2 
    before:w-0.5 
    hover:no-underline;
}

.toc-row {
  @apply list-none mt-0!;
}

.toc-col-title {
  @apply 
    text-xs 
    font-bold 
    uppercase 
    pl-4 
    py-1.5 
    text-slate-500 
    dark:text-slate-400;
}

.toc-divider {
  @apply border-b border-b-dashed border-slate-200 my-4 ml-4;
}

.toc-col-list {
  @apply text-sm ml-4;
}
</style>
