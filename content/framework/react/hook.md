``` ts
import { useCallback, useEffect, useRef, useState } from "react"

export function useDocumentTitle (
  defaultTitle?: string, 
  options?: {
    template?: string
  }
) {
  const [title, setTitle] = useState(defaultTitle ?? document.title ?? null)
  const [formatTitle, setFormatTitle] = useState(defaultTitle ?? '')

  useEffect(() => {
    const tem = options?.template ?? '%s'
    setFormatTitle(tem.replace('%s', title))
  }, [options?.template, title])

  useEffect(() => {
    if (formatTitle === document.title) return
    document.title = formatTitle
  }, [formatTitle])

  return { title, formatTitle, setTitle, setFormatTitle }
}

export function useEventListener (
  el: Element | null | typeof globalThis, 
  eventName: string, 
  fn: EventListenerOrEventListenerObject, 
  deps?: any[]) {

  useEffect(() => {
    if (!el) return
    el.addEventListener(eventName, fn)
    return () => {
      el.removeEventListener(eventName, fn)
    }
  }, [el, eventName, fn, ...(deps ?? [])])

}

export type DebounceOption = number | {
  ms?: number
}

export type ThrottleOption = DebounceOption

export function useDebounceCallback (fn: Function, option: DebounceOption = 200, deps: any[]) {

  const ms = typeof option === 'number' ? option : option.ms ?? 200
  const delay = useRef<number>(ms < 0 ? 0 : ms)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const updater = useCallback((...args) => {
    timer.current && clearTimeout(timer.current)

    return new Promise((resolve) => {
      timer.current = setTimeout(() => {
        resolve(fn(...args))
      }, delay.current)
    })
  }, [fn, ...deps])

  const cancel = useCallback(() => {
    clearTimeout(timer.current)
  }, [])

  return [updater, cancel] as [typeof updater, typeof cancel]
}



export function useDebounce<T> (value: T, options: DebounceOption = 200) {
  const [debounced, setDebounced] = useState(value)
  const [updater, cancel] = useDebounceCallback(setDebounced, options, [])

  return [debounced, updater, cancel] as [T, typeof updater, typeof cancel ]
}

export function useThrottleCallback (fn: Function, option: ThrottleOption = 200, deps: any[]) {
  const ms = typeof option === 'number' ? option : option.ms ?? 200
  const delay = useRef<number>(ms < 0 ? 0 : ms)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const updater = useCallback((...args) => {
    if (timer.current !== undefined) return
    return new Promise((resolve) => {
      timer.current = setTimeout(() => {
        timer.current = undefined
        resolve(fn(...args))
      }, delay.current)
    })
  }, [fn, ...deps])

  const cancel = useCallback(() => {
    timer.current && clearTimeout(timer.current)
  }, [])

  return [updater, cancel] as [typeof updater, typeof cancel]
  
}

export function useThrottle<T> (value: T, option: ThrottleOption = 200) {
  
  const [throttle, setThrottle] = useState(value)
  const [updater, cancel] = useThrottleCallback(setThrottle, option, [])

  return [throttle, updater, cancel] as [T, typeof updater, typeof cancel]
}

export function useInvoke<T = any> (FunctionComponent: FC<T>, defaultProps?: T) {

  const [cmpProps, setCmpProps] = useState<T | undefined>(defaultProps)
 
  const invoke = useCallback((props: T, merge = true) => {
    setCmpProps(merge ? Object.assign({}, cmpProps, props) : props)
  }, [cmpProps])

  const functionComponent = useMemo(() => {
    if (!cmpProps) return 
    return <FunctionComponent {...cmpProps} />
  }, [cmpProps])

  return [functionComponent, invoke] as [typeof functionComponent, typeof invoke]
}
```