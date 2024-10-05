<script lang="ts" setup>
import type { NuxtLinkProps } from '#app';
import { defineOptions } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({ name: 'the-link' })

const currentRoute = useRoute()

const props = withDefaults(defineProps<{
  activeMatchLevel?: number
  to: string
} & NuxtLinkProps>(), {
  activeMatchLevel: 0
})


const { route, isExactActive } = useLink(props)

const isActive = computed(() => {
  if (props.activeMatchLevel === 0) return isExactActive.value
  const currentPaths = currentRoute.path.split('/')
  const paths = route.value.path.split('/')
  let matched = true

  for(let i = 1; i <= props.activeMatchLevel; i++) {
    if (currentPaths[i] === paths[i]) continue
    if (currentPaths[i].startsWith(':')) continue
    matched = false
    break
  }

  return matched
})

</script>
<template>
  <NuxtLink
    v-bind="props"
    custom
    v-slot="{ href, navigate, isExactActive, route }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? 'the-link-active' : isExactActive ? 'the-link-exact-active' : ''"
    >
      <slot v-bind="{ href, navigate, isExactActive, route, isActive }" />
    </a>
  </NuxtLink>
</template>