<script setup>
const config = useRuntimeConfig()
</script>

<template>
  <h1>Manifiesto</h1>
  <p>
    {{ config.public.appName }} es una red social centrada en las relaciones
    horizontales y compartir y guardar información.
  </p>
  <p>
    {{ config.public.appName }} no tendrá publicidad, ni contenidos
    patrocinados, ni marcas, ni algoritmos que decidan qué ves, ni seguimiento
    ni análisis de tu actividad.
  </p>
  <p>
    La plataforma favorecerá las relaciones horizontales simétricas, y aunque
    existirá la posibilidad de seguir a gente, la persona seguidora no podrá
    interactuar de ninguna manera con el individuo seguido. Tampoco estos
    tendrán manera de contar seguidores, likes (porque no existen), etc. Vamos,
    que muerte al influencer.
  </p>
  <p>
    Precisamente por esto, me estoy planteando que tampoco se pueda subir
    contenido multimedia, para que no se convierta en otra pieza más de la orgía
    de exhibicionismo (en el mal sentido) y consumo embrutecido en que se han
    convertido buena parte de las plataformas sociales.
  </p>
</template>
