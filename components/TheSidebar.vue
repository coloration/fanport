<script lang="ts" setup>

defineOptions({ name: 'the-sidebar' })

const { sidebarOpen = true } = defineProps<{
  sidebarOpen?: boolean
}>()

const emits = defineEmits<{
  'close-sidebar': []
}>()

const { navigation } = useContent()

const sidebar = ref<any>(null)
const currentRoute = useRouter().currentRoute.value

// close on click outside
const clickHandler = ({ target }: Event) => {
  if (!sidebar.value) return
  if (
    !sidebarOpen ||
    sidebar.value.contains(target)
  ) return
  emits('close-sidebar')
}

// close if the esc key is pressed
const keyHandler = ({ keyCode }: KeyboardEvent) => {
  if (!sidebarOpen || keyCode !== 27) return
  emits('close-sidebar')
} 

onMounted(() => {
  document.addEventListener('click', clickHandler)
  document.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
  document.removeEventListener('keydown', keyHandler)
})

</script>
<template>
  <div class="the-sidebar">
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-out duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >            
      <div v-show="sidebarOpen" class="md:hidden fixed inset-0 z-10 bg-slate-900 bg-opacity-20 transition-opacity" aria-hidden="true"></div>
    </transition>
  
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <aside
        id="sidebar"
        class="border-vertical right fixed left-0 top-0 bottom-0 w-64 h-screen bg-gradient-to-l from-indigo-400/10 dark:from-indigo-600/10 via-transparent to-transparent md:left-auto md:shrink-0 z-10 md:!opacity-100 md:!block"
        ref="sidebar"
        v-show="sidebarOpen"
      >
        <!-- Gradient bg displaying on light layout only -->
        <div class="absolute inset-0 -left-[9999px]  pointer-events-none -z-10 dark:hidden" aria-hidden="true"></div>
  
        <div class="fixed top-0 bottom-0 w-64 px-4 sm:px-6 md:pl-0 md:pr-8 overflow-y-auto no-scrollbar">
          <div class="pt-24 md:pt-28 pb-8">
  
            <!-- Docs nav -->
            <nav class="md:block text-sm">
              <div v-for="(level1Nav, i) in navigation" :key="i">
                <SidebarLinkGroup v-if="level1Nav.children" v-slot="parentLink" :activeCondition="currentRoute.fullPath.includes(level1Nav._path)">
                  <a
                    class="the-sidebar-level-1"
                    :class="{ 'before:hidden': !currentRoute.fullPath.includes(level1Nav._path) }"
                    href="#0"
                    @click.prevent="parentLink.handleClick()"
                  >
                    <DecoCube color="purple" class="mr-1" />
                    <span>{{ level1Nav.title }}</span>
                  </a>
                  <ul 
                    class="border-vertical left mb-3 ml-1 pl-4 border-l border-slate-200 dark:border-slate-800" 
                    :class="{ 'hidden': !parentLink.expanded }">              
                    <li class="mt-1!" v-for="(level2Nav, j) in level1Nav.children" :key="j">
                  
                      <SidebarLinkSubgroup 
                        v-if="!!level2Nav.children" 
                        :title="level2Nav.title" 
                        :open="currentRoute.fullPath.includes(level2Nav._path)">
                          <li class="mb-1" v-for="(level3Nav, k) in level2Nav.children" :key="k">
                            <NuxtLink 
                              :to="level3Nav._path" 
                              custom 
                              v-slot="{ href, navigate, isExactActive }">
                         
                              <a 
                                class="flex items-center font-bold text-xs text-nowrap" 
                                :class="isExactActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'" 
                                :href="href" 
                                @click="navigate"
                                v-bind="$attrs"
                                >
                              {{ level3Nav.title }}
                            </a>
                            </NuxtLink>
                          </li>
                      </SidebarLinkSubgroup>
                      <NuxtLink v-else :to="level2Nav._path" custom v-slot="{ href, navigate, isExactActive }">
                        <a 
                          class="flex items-center space-x-3 font-medium text-nowrap" 
                          :class="isExactActive ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200'" 
                          :href="href" 
                          @click="navigate"
                          v-bind="$attrs"
                        >
                          {{ level2Nav.title }}
                        </a>
                      </NuxtLink>
                    </li>
                  </ul>
                </SidebarLinkGroup>
                <li class="mb-1" v-else>
                  <NuxtLink
                    class="the-sidebar-level-1"
                    :class="{ 'before:hidden': !currentRoute.fullPath.includes(level1Nav._path) }"
                    :to="level1Nav._path"
                  >
                    <DecoCube color="green" class="mr-1" />
                    <span>{{ level1Nav.title }}</span>
                  </NuxtLink>
                </li>
              </div>
            </nav>
          </div>
        </div>
  
      </aside>
    </transition>
  </div>
</template>
<style lang="postcss">
.the-sidebar {
  @apply;
}

.the-sidebar li {
  @apply list-none;
}

.the-sidebar a {
  @apply hover:no-underline;
}

.the-sidebar .the-accordion-title {
  @apply font-bold text-slate-600 dark:text-slate-300;
}

.the-sidebar-level-1 {
  @apply 
    relative 
    flex 
    items-center 
    font-bold 
    text-slate-600 
    p-1 
    before:content-empty
    before:absolute 
    before:inset-0 
    before:rounded 
    before:bg-gradient-to-tr 
    before:from-blue-400 
    before:to-purple-500 
    before:opacity-20 
    before:-z-10 
    before:pointer-events-none 
    dark:text-slate-300
    ;

}
</style>
