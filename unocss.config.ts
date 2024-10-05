import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives
} from 'unocss'


export default defineConfig({
  theme: {
    extends: {
      aspekta: ['Aspekta', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    animation: {
      'endless': 'endless 20s linear infinite',
      'shine': 'shine 5s linear 500ms infinite',
      'float': 'float 2s ease-in-out infinite',
    },
    keyframes: {
      swing: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-100px)' },
      },
      endless: {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(-245px)' }
      },
      shine: {
        '0%': { top: '0', transform: 'translateY(-100%) scaleY(10)', opacity: '0' },
        '2%': { opacity: '.5' },
        '40%': { top: '100%', transform: 'translateY(0) scaleY(200)', opacity: '0' },
        '100%': { top: '100%', transform: 'translateY(0) scaleY(1)', opacity: '0' },
      },
      float: {
        '0%': { transform: 'translateY(3%)' },
        '50%': { transform: 'translateY(-3%)' },
        '100%': { transform: 'translateY(3%)' }
      },
    }
  },
  rules: [
    
    ['font-aspekta', { 'font-family':'aspekta'}],
    ['font-noto', { 'font-family':'noto'}],
    ['font-inter', { 'font-family':'inter'}],
    ['animate-endless', { 'animation': 'endless 20s linear infinite' }],
    ['animate-shine', { 'animation':'shine 5s linear 500ms infinite'}],
    ['animate-float', { 'animation':'float 2s ease-in-out infinite'}],

  ],
  
  shortcuts: [
  ],
  presets: [
    presetTypography(),
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives()
  ]
})
