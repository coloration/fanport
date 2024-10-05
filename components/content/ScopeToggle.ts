import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'ScopeToggle',
  inheritAttrs: false,
  props: {
    defaultValue: { type: Boolean, default: true },
  },
  setup(props, { slots }) {
    const val = ref(props.defaultValue)

    function toggle(nextVal: any) {
      val.value = (typeof nextVal === 'boolean') ? nextVal : !val.value
    }

    const data = reactive({
      value: val,
      toggle,
    })
    // 防止在最外层产生 DOM 节点
    return () => slots.default && slots.default(data)
  }
})