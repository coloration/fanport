import Aos from 'aos'

export function useAos() {
  Aos.init({
    once: true,
    duration: 600,
    // easing: 'ease-out-sine',
  })
}