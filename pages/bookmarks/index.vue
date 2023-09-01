<script setup>
const config = useRuntimeConfig()

/* Middleware */
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <h1>Guardados!!!</h1>
  <p>
    El guardado y categorización de contenido guardado va a ser una parte clave
    de
    {{ config.public.appName }}.
  </p>
  <p>Habrá colecciones, etiquetas y toda la vaina.</p>
</template>
