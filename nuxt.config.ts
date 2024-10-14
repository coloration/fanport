

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
      toc: { depth: 3, searchDepth: 3,  },
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
      },
      langs: [
        'bash',
        'ts',
        'js',
        'css',
        'html',
        'xml',
        'yaml',
        'toml',
        'lua',
        'java',
        'json',
        'c',
        'cpp',
        'csharp',
        'dart',
        'sql',
        'python',
        'rust',
        'diff',
        'mermaid',
        'scss',
        'tsx',
        'jsx'
      ]
    }
  }
})
