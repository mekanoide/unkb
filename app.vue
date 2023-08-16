<template>
  <NuxtLayout>
    <Loading v-if="loading" />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const nuxtApp = useNuxtApp()
const loading = ref(false)
const loadTimeout = ref(null)

nuxtApp.hook('page:start', () => {
  loadTimeout.value = setTimeout(() => {
    loading.value = true
  }, 250)
})
nuxtApp.hook('page:finish', () => {
  clearTimeout(loadTimeout.value)
  loading.value = false
})
</script>
