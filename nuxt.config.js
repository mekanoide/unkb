// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /* ssr: false, */
  runtimeConfig: {
    metaUrl: process.env.META_ACCESS_TOKEN,
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
    'nuxt-security',
    '@vite-pwa/nuxt'
  ],
  pwa: {},
  vite: {
    define: {
      'process.env.DEBUG': true,
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
    options: {
      redirectOptions: {
        login: '/login',
        callback: '/',
        exclude: ['/register']
      }
    }
  },
  devtools: { enabled: false }
})