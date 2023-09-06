// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /* ssr: false, */
  runtimeConfig: {
    public: {
      appName: 'UNKB',
      baseUrl: process.env.BASE_URL || 'http://localhost:3006'
    }
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-security'
  ],
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
