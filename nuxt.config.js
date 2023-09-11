// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /* ssr: false, */
  app: {
    head: {
      title: 'UNKB',
      meta: [
        { name: 'robots', content: 'none' },
        { property: 'og:title', content: 'UNKB' },        
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_ES' },
        { property: 'og:description', content: 'Esto es una red social' }
      ],
      link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]
    }
  },
  runtimeConfig: {
    public: {
      appName: 'UNKB',
      baseUrl: process.env.BASE_URL || 'http://localhost:3006'
    }
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-security'
  ],
  robots: {
    UserAgent: '*',
    Disallow: '*'
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    esbuild: {
      drop: ['console']
    }
  },
  css: [
    '@/styles/fonts.css',
    '@/styles/reset.css',
    '@/styles/tokens.css',
    '@/styles/global.css'
  ],
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/',
      exclude: ['/register', '/post/*', '/manifesto']
    }
  },
  devtools: { enabled: false }
})
