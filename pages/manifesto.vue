<script setup>
const config = useRuntimeConfig()
</script>

<template>
  <h1>Manifiesto</h1>
  <p>
    No me gusta el devenir que han tomado las redes sociales e internet en
    general. De redes de intercambio y descubrimiento (muy imperfectas, sí)
    hemos pasado a plataformas que apenas pueden llamarse sociales, son puro
    consumo de contenido y publicidad. La tele, vamos.
  </p>
  <p>
    {{ config.public.appName }} es una red social minimalista centrada en las
    relaciones horizontales, y compartir y guardar información.
  </p>
  <p>
    {{ config.public.appName }} no tendrá publicidad, ni contenidos
    patrocinados, ni marcas, ni algoritmos que decidan qué ves, ni seguimiento
    ni análisis de tus datos ni de tu actividad.
  </p>
  <p>
    La plataforma pretende servir a las relaciones horizontales simétricas, y
    aunque existirá la posibilidad de seguir a gente, la persona seguidora no
    podrá interactuar de ninguna manera con el individuo seguido. Tampoco estos
    tendrán manera de contar seguidores, likes (porque no existen), etc. Vamos,
    que muerte al influencer.
  </p>
  <p>
    En parte por esto, en parte por puro espíritu punki, me estoy planteando que
    no se pueda subir ningún contenido que no sea texto.
  </p>
</template>
