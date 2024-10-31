<script lang="ts" setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useEventListener } from '@vueuse/core';
import type { NavItem } from '@nuxt/content';

const props = defineProps<{
  id?: string
  searchId?: string
  modalOpen?: boolean
}>();

const emit = defineEmits<{
  (e: 'close-modal'): void
  (e: 'open-modal'): void
}>();


const { navigation } = useContent()

const router = useRouter()
const modalContent = ref<HTMLDivElement>()
const searchInput = ref<HTMLInputElement>()
const search = ref('')
const filterMetadata = ref<any[]>([])
const selectIndex = ref(0)
// close on click outside
const clickHandler = ({ target }: any) => {
  if (!props.modalOpen || modalContent.value?.contains(target)) return
  emit('close-modal')
}

// close if the esc key is pressed
const keyHandler = (event: KeyboardEvent) => {
  if (props.modalOpen) {
    if (event.key === 'Escape') {
      emit('close-modal')
    }
    else if (event.key === 'ArrowDown') {
      selectIndex.value = (selectIndex.value + 1) % filterMetadata.value.length
    }
    else if (event.key === 'ArrowUp') {
      selectIndex.value = (selectIndex.value - 1 + filterMetadata.value.length) % filterMetadata.value.length
    }
    else if (event.key === 'Enter') {
      event.preventDefault()
      const targetLink = filterMetadata.value[selectIndex.value]
      if (!targetLink) return
      handleJump(targetLink)
    }
  }

  if (!props.modalOpen && event.key === '/') {
    event.preventDefault()
    emit('open-modal')
  }
}


const meta = computed(() => {
  // 3层路由展平
  return navigation.value.reduce((flattenNav, topGroup: NavItem) => {

    return (topGroup.children ?? []).reduce((flattenNav, middleGroup: NavItem) => {

      return (middleGroup.children ?? []).reduce((flattenNav, navItem: NavItem) => {
        return flattenNav.concat({
          path: navItem._path,
          title: navItem.title,
          tag: `${topGroup.title}.${middleGroup.title}`
        })
      }, flattenNav)
    }, flattenNav)
  }, [])
})


function handleJump(link: any) {
  router.push(link.path)
  emit('close-modal')
  clear()
}

function clear() {
  setTimeout(() => {
    search.value = ''
    filterMetadata.value = []
    selectIndex.value = 0
  }, 200)
}

useEventListener(document, 'click', clickHandler)
useEventListener(document, 'keydown', keyHandler)

onMounted(() => {
  // meta.value = metadata.reduce((acc: any[], category: any, cIndex: number) => {
  //   const links = category.children.reduce((acclinks: any[], group: any, gIndex: number) => {
  //     const subLinks = group.children.map((item: any, index: number) => {
  //       return {
  //         ...item,
  //         search: (category.name + group.name + item.name).toLowerCase(),
  //         category: category.name,
  //         group: group.name,
  //         cIndex,
  //         gIndex,
  //         index
  //       }
  //     })
  //     return acclinks.concat(subLinks)
  //   }, [] as any[])
    
  //   return acc.concat(links)
  // }, [] as any[])
})



watch(() => props.modalOpen, (open) => {
  if (open) {
    nextTick(() => searchInput.value?.focus())
  }
  else {
    clear();
  }
})

watch(search, (s) => {
  filterMetadata.value = s === '' ? [] : meta.value.filter((nav: any) => {
    return nav.path.indexOf(s) >= 0 || nav.title.indexOf(s) >= 0
  })
  // console.log(filterMetadata.value)
})
</script>
<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="modalOpen" class="fixed inset-0 bg-slate-900 bg-opacity-20 z-50 transition-opacity" aria-hidden="true"></div>
  </transition>
  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-show="modalOpen" :id="id" class="fixed inset-0 z-50 overflow-hidden flex items-start top-20 md:top-28 mb-4 justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
      <div ref="modalContent" class="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg dark:bg-slate-800">
        <!-- Search form -->
        <form class="border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center">
            <label :for="searchId">
              <span class="sr-only">Search</span>
              <svg class="w-4 h-4 fill-slate-500 shrink-0 ml-4 dark:fill-slate-400" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z" />
              </svg>
            </label>
            <input v-model="search" :id="searchId" class="text-sm w-full bg-white border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-2 pr-4 dark:bg-slate-800 dark:placeholder:text-slate-500" type="search" placeholder="Search for anything…" ref="searchInput" />
          </div>
        </form>
        <div class="py-4 px-2 space-y-4">
          <!-- Popular -->
          <div>
            <div class="text-sm font-medium text-slate-500 px-2 mb-2 dark:text-slate-400">Page</div>
            <div v-if="(filterMetadata.length > 0)">
              <div
                :key="i"
                @click="handleJump(link)"
                :to="'/' + link.value"
                v-for="(link, i) in filterMetadata"
                :class="{'bg-slate-100 dark:bg-slate-700': i === selectIndex }"
                class="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded dark:text-slate-200 dark:hover:bg-slate-700" 
              >
                <svg class="w-3 h-3 fill-slate-400 shrink-0 mr-3 dark:fill-slate-500" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z" />
                </svg>
                <div class="flex justify-between flex-1">
                  <span>{{ link.title }}</span>
                  <span class="text-indigo-400 text-xs px-1 py-[2px] rounded-sm">{{ link.tag }}</span>
                </div>
              </div>
            </div>
            <div v-else class="text-sm font-medium text-slate-400 px-2 mb-2 dark:text-slate-500 uppercase">
              input keyword
            </div>
          </div>
          <!-- Actions -->
          <div>
            <div class="text-sm font-medium text-slate-500 px-2 mb-2">Actions</div>
            <ul>
              <li class="list-none">
                <NuxtLink class="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded dark:text-slate-200 dark:hover:bg-slate-700" to="#0" @click="$emit('close-modal')">
                  <svg class="w-3 h-3 fill-blue-600 shrink-0 mr-3" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.854.146a.5.5 0 0 0-.525-.116l-11 4a.5.5 0 0 0-.015.934l4.8 1.921 1.921 4.8A.5.5 0 0 0 7.5 12h.008a.5.5 0 0 0 .462-.329l4-11a.5.5 0 0 0-.116-.525Z" />
                  </svg>
                  <span class="font-medium">Contact support</span>
                </NuxtLink>
              </li>
              <li class="list-none">
                <NuxtLink class="flex items-center px-2 py-1 leading-6 text-sm text-slate-800 hover:bg-slate-100 rounded dark:text-slate-200 dark:hover:bg-slate-700" to="#0" @click="$emit('close-modal')">
                  <svg class="w-3 h-3 fill-purple-500 shrink-0 mr-3" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0C2.691 0 0 2.362 0 5.267c0 2.905 2.691 5.266 6 5.266a6.8 6.8 0 0 0 1.036-.079l2.725 1.485a.5.5 0 0 0 .739-.439V8.711A4.893 4.893 0 0 0 12 5.267C12 2.362 9.309 0 6 0Z" />
                  </svg>
                  <span class="font-medium">Submit feedback</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

