

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true }
  },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],
  
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      autoprefixer: {},
      cssnano: {}
    }
  },
  content: {
    documentDriven: true,
    markdown: {
      toc: { depth: 3, searchDepth: 3 }
    },
    highlight: {
      langs: [
        'bash',
        'ts',
        'js',
        'css',
        'html',
        'java',
        'json',
        'sql',
      ]
    }
  }
})
