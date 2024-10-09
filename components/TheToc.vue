<script lang="ts" setup>

defineOptions({ name: 'the-toc' })

interface TocItem {
  id: string, depth: number, text: string, children?: TocItem[]
}

const titleHeight = 5 * 16
let screenRestHeight = 0
const { toc = [] } = defineProps<{
  toc: TocItem[]
}>()

const activeIds = ref<string[]>([])

const { y } = useWindowScroll({ behavior: 'smooth' }) 
const flatToc = computed(() => {
  const result: TocItem[] = []
  let tocRest: TocItem[] = toc.slice()

  while(tocRest.length > 0) {
    const head = tocRest.shift()
    if (head) {
      result.push(head)
      if (head.children) {
        tocRest = tocRest.concat(head.children)
      }
    }
  }
  
  return result
})

function getTargetTop(id: string) {
  const target = document.getElementById(id)
  if (!target) return -1

  return target.offsetTop - titleHeight
}


function handleClick(id: string) {
  const yOffset = getTargetTop(id)
  if (yOffset === -1) return 
  y.value = yOffset
}

function calcActiveTitle() {
  
  activeIds.value = flatToc.value.filter(item => {
    const titleDom = document.getElementById(item.id)
    const topDistance = titleDom?.offsetTop ?? 0
    return topDistance > y.value && topDistance < (y.value + screenRestHeight)
  })
  .map(item => item.id)
}

watchDebounced(y, calcActiveTitle, { debounce: 300, maxWait: 500 })

onMounted(() => {
  screenRestHeight = window.screen.availHeight - titleHeight
  calcActiveTitle()
})

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
              class="toc-link"
              :class="{ active: activeIds.includes(item.id) }">
              {{ item.text }}
            </span>
            <ul v-if="item.children" class="pl-4">
              <li v-for="(subItem, j) in item.children" :key="j"  class="toc-row">
                <span 
                  class="toc-link"
                  :class="{ active: activeIds.includes(subItem.id) }"
                  @click="handleClick(subItem.id)">
                  {{ subItem.text }}
                </span>
              </li>
            </ul>
          </li>
        </ul>
        <!-- <div class="toc-col-title">
          Community
        </div> -->
        <div v-show="y > 500" class="border-horizontal bottom my-4"></div>
        <button 
          v-show="y > 500" 
          @click="y = 0" 
          data-aos="fade-up"
          class="text-xs pt-3 cursor-pointer text-center px-4 text-slate-500 font-bold">
          BACK TOP
          <IconArrow class="-rotate-90 ml-1" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
.the-toc {
  @apply hidden xl:block w-48 shrink-0 bg-blur;
}

.anchor-top {
  @apply cursor-pointer;
}

.toc-link {
  @apply 
    relative 
    block 
    py-1.5 
    pl-4
    text-nowrap 
    transition-gpu
    text-slate-600
    cursor-pointer
    hover:no-underline
    dark:text-slate-400
    hover:text-slate-900
    dark:hover:text-slate-300;

    
    
}

.toc-link.active {
  @apply text-indigo-600 dark:text-indigo-400 font-bold
  before:content-empty
  before:absolute 
  before:left-0
  before:top-2 
  before:bottom-2 
  before:w-[0.2rem]
  before:bg-indigo-600
  dark:before:bg-indigo-400;
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
  @apply text-sm;
}
</style>
