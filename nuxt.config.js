// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3006'
    },
  },
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    }
  },
  css: [
    '@/styles/fonts.css',
    '@/styles/reset.css',
    '@/styles/tokens.css',
    '@/styles/global.css'
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  devtools: { enabled: true }
})