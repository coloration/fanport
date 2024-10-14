
### inject


``` ts
// provider

// <div class="sk-theme-provider" :class="classes">
//   <slot></slot>
// </div>

import { defineComponent, provide, ref, computed, ComputedRef } from '@vue/composition-api'
import { ThemeType, ThemeConfigure, themeDefaultConfig, themeBreathConfig, themeHackConfig } from './type'

const themeConfigMap = new Map<ThemeType, ThemeConfigure>([
  [ThemeType.default, themeDefaultConfig],
  [ThemeType.breath, themeBreathConfig],
  [ThemeType.hack, themeHackConfig],
])


export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: String,
      required: false,
      default: ThemeType.default
    },
    config: {
      type: Object,
    }
  },

  setup (props) {
    const theme = ref<ThemeType>(props.theme as ThemeType)

    const themeConfig = computed(() => {
      return props.config 
        ? props.config 
        : (themeConfigMap.get(theme.value) || themeDefaultConfig)
    })

    function updateTheme (type: ThemeType) {
      theme.value = type
    }

    const classes = computed(() => {
      return [theme.value]
    })

    provide<ThemeType>('theme', theme.value)
    provide<ThemeConfigure>('themeConfig', themeConfig.value as any)
    provide('setTheme', updateTheme)

    return {
      classes
    }
  }
})s

// component 
import { ThemeConfigure } from '../../provider/ThemeProvider/type'
import { computed, defineComponent, inject } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Array,
      default: () => []
    },
    category: {
      type: Array,
      default: () => []
    },
  },

  setup (props) {
    const themeConfig: ThemeConfigure = inject('themeConfig') as any
    
    const max = computed(() => {
      return Math.max(...props.value as number[]) * 1.2
    })

    const displayValue = computed(() => {
      return (props.value as number[]).map((v) => v / max.value * 100 + '%')
    })

    return {
      theme: themeConfig,
      max,
      displayValue
    }
  }
})
```