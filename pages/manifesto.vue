<template>
  <article>
    <h1>Manifiesto</h1>
    <p>{{ config.public.appName }} es una red social centrada en las relaciones horizontales y compartir y guardar información.</p>
    <p>{{ config.public.appName }} no tendrá publicidad, ni contenidos patrocinados, ni marcas, ni algoritmos que decidan qué ves, ni seguimiento ni análisis de tu actividad.</p>
    <p>La plataforma favorecerá las relaciones horizontales simétricas, y aunque existirá la posibilidad de seguir a gente, ni podrás interactuar con ellos ni ellos tendrán manera de contar seguidores, likes, etc.
      <br />
      Vamos, que muerte al influencer.
    </p>
  </article>
</template>

<script setup>
const config = useRuntimeConfig()
</script>
